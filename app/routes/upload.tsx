import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { ArrowRightIcon, CheckIcon, CircleNotchIcon, LightbulbIcon, WarningCircleIcon } from "@phosphor-icons/react";
import type { Route } from "./+types/upload";
import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import FileUploader from "@/components/FileUploader";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePuterStore } from "@/lib/puter";
import { convertPdfToImage } from "@/lib/pdf2img";
import { cn, generateUUID } from "@/lib/utils";
import { metaDictionary, useI18n } from "@/lib/i18n";
import { privateMeta } from "@/lib/seo";
import { useRequireAuth } from "@/lib/use-require-auth";
import { prepareInstructions } from "../../constants";

export function meta({ matches }: Route.MetaArgs) {
  return privateMeta(metaDictionary(matches).meta.uploadTitle);
}

const STEPS = ["upload", "convert", "uploadImage", "prepare", "analyze", "done"] as const;
type Step = (typeof STEPS)[number];
type ErrorKey = "upload" | "convert" | "uploadImage" | "analyze" | "parse";

/** The model sometimes wraps JSON in ``` fences; strip them before parsing. */
function parseFeedback(text: string): Feedback | null {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  try {
    return JSON.parse(cleaned) as Feedback;
  } catch {
    return null;
  }
}

export default function Upload() {
  const { fs, ai, kv } = usePuterStore();
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  useRequireAuth();

  const [file, setFile] = useState<File | null>(null);
  const [showFileError, setShowFileError] = useState(false);
  const [step, setStep] = useState<Step | null>(null);
  const [error, setError] = useState<ErrorKey | null>(null);

  const u = t.upload;

  const analyze = async (input: { companyName: string; jobTitle: string; jobDescription: string; file: File }) => {
    setError(null);
    // Puter calls reject (e.g. "Model not found", network errors) instead of
    // returning undefined, so every step is guarded and maps to its own message.
    let current: ErrorKey = "upload";
    const run = async <T,>(key: ErrorKey, step: Step, fn: () => Promise<T>): Promise<NonNullable<T>> => {
      current = key;
      setStep(step);
      const result = await fn();
      if (!result) throw new Error(`${key} returned nothing`);
      return result;
    };

    try {
      const uploadedFile = await run("upload", "upload", () => fs.upload([input.file]));

      const image = await run("convert", "convert", () => convertPdfToImage(input.file));
      if (!image.file) throw new Error(image.error ?? "convert failed");
      const imageFile = image.file;

      const uploadedImage = await run("uploadImage", "uploadImage", () => fs.upload([imageFile]));

      setStep("prepare");
      const id = generateUUID();
      const instructions = prepareInstructions({
        jobTitle: input.jobTitle,
        jobDescription: input.jobDescription,
        lang,
      });

      const response = await run("analyze", "analyze", () => ai.feedback(uploadedFile.path, instructions));
      const content = response.message.content;
      const text = typeof content === "string" ? content : content?.[0]?.text ?? "";

      current = "parse";
      const feedback = parseFeedback(text);
      if (!feedback) throw new Error("unparseable AI response");

      // Only persist complete analyses, so failed attempts never show up in the dashboard.
      await kv.set(
        `resume:${id}`,
        JSON.stringify({
          id,
          resumePath: uploadedFile.path,
          imagePath: uploadedImage.path,
          companyName: input.companyName,
          jobTitle: input.jobTitle,
          jobDescription: input.jobDescription,
          feedback,
        })
      );
      setStep("done");
      navigate(`/resume/${id}`);
    } catch (err) {
      console.error(`[upload] ${current} failed`, err);
      setError(current);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setShowFileError(true);
      return;
    }
    const form = new FormData(e.currentTarget);
    analyze({
      companyName: String(form.get("company_name") ?? "").trim(),
      jobTitle: String(form.get("job_title") ?? "").trim(),
      jobDescription: String(form.get("job_description") ?? "").trim(),
      file,
    });
  };

  const processing = step !== null;
  const currentIndex = step ? STEPS.indexOf(step) : -1;

  return (
    <>
      <Navbar />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {processing ? (
          <section className="mx-auto max-w-lg py-8" aria-live="polite">
            <p className="font-mono text-xs uppercase tracking-wider text-brand-text">{u.eyebrow}</p>
            <h1 className="font-display mt-3 text-5xl">{u.processingTitle}</h1>
            <p className="mt-3 text-muted-foreground">{u.processingBody}</p>

            <ol className="mt-10 space-y-1">
              {STEPS.map((s, i) => {
                const isDone = i < currentIndex || step === "done";
                const isCurrent = i === currentIndex && step !== "done";
                const isFailed = isCurrent && !!error;
                return (
                  <li
                    key={s}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors",
                      isCurrent && !isFailed && "bg-card border",
                      isFailed && "border border-destructive/40 bg-danger-soft",
                      !isDone && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    <span className="grid size-6 shrink-0 place-items-center">
                      {isFailed ? (
                        <WarningCircleIcon className="size-5 text-destructive" weight="fill" />
                      ) : isDone ? (
                        <span className="grid size-5 place-items-center rounded-full bg-foreground text-background">
                          <CheckIcon className="size-3" weight="bold" />
                        </span>
                      ) : isCurrent ? (
                        <CircleNotchIcon className="size-5 animate-spin text-brand" />
                      ) : (
                        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                      )}
                    </span>
                    {u.steps[s]}
                  </li>
                );
              })}
            </ol>

            {error && (
              <div role="alert" className="mt-6 rounded-xl border border-destructive/40 p-4">
                <p className="text-sm text-destructive">{u.errors[error]}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setStep(null);
                    setError(null);
                  }}
                >
                  {u.retry}
                </Button>
              </div>
            )}
          </section>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
            <section>
              <p className="font-mono text-xs uppercase tracking-wider text-brand-text">{u.eyebrow}</p>
              <h1 className="font-display mt-3 max-w-xl text-5xl text-balance">{u.title}</h1>
              <p className="mt-3 text-muted-foreground">{u.subtitle}</p>

              <form onSubmit={handleSubmit} className="mt-10 max-w-xl" noValidate>
                <FieldGroup>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="company-name">{u.company}</FieldLabel>
                      <Input id="company-name" name="company_name" placeholder={u.companyPlaceholder} autoComplete="organization" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="job-title">{u.jobTitle}</FieldLabel>
                      <Input id="job-title" name="job_title" placeholder={u.jobTitlePlaceholder} autoComplete="organization-title" />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="job-description" className="flex w-full justify-between">
                      {u.jobDescription}
                      <span className="font-normal text-muted-foreground">{u.optional}</span>
                    </FieldLabel>
                    <Textarea
                      id="job-description"
                      name="job_description"
                      rows={6}
                      placeholder={u.jobDescriptionPlaceholder}
                      className="min-h-36"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="resume-file">{u.resume}</FieldLabel>
                    <FileUploader
                      id="resume-file"
                      invalid={showFileError && !file}
                      onFileSelect={(f) => {
                        setFile(f);
                        if (f) setShowFileError(false);
                      }}
                    />
                    {showFileError && !file && (
                      <p role="alert" className="text-sm text-destructive">
                        {u.fileRequired}
                      </p>
                    )}
                  </Field>
                  <Button type="submit" size="lg" className="h-12 w-full text-[15px] sm:w-auto sm:px-8">
                    {u.submit}
                    <ArrowRightIcon />
                  </Button>
                </FieldGroup>
              </form>
            </section>

            <aside className="lg:pt-24">
              <div className="rounded-2xl border bg-card p-6">
                <div className="flex items-center gap-2">
                  <LightbulbIcon className="size-5 text-brand-text" weight="duotone" />
                  <h2 className="font-medium">{u.tips.title}</h2>
                </div>
                <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
                  {u.tips.items.map((tip, i) => (
                    <li key={tip} className="flex gap-3">
                      <span className="font-mono text-xs text-foreground tabular">{String(i + 1).padStart(2, "0")}</span>
                      {tip}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        )}
      </main>
      <FooterSection />
    </>
  );
}
