import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon, ArrowSquareOutIcon, FileTextIcon } from "@phosphor-icons/react";
import type { Route } from "./+types/resume";
import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import Summary from "@/components/feedback/Summary";
import ATS from "@/components/feedback/ATS";
import Details from "@/components/feedback/Details";
import { Button } from "@/components/ui/button";
import { usePuterStore } from "@/lib/puter";
import { metaDictionary, useI18n } from "@/lib/i18n";
import { privateMeta } from "@/lib/seo";
import { useRequireAuth } from "@/lib/use-require-auth";

export function meta({ matches }: Route.MetaArgs) {
  return privateMeta(metaDictionary(matches).meta.resumeTitle);
}

type ResumeData = Resume & { jobDescription?: string };

export default function ResumePage() {
  const { fs, kv } = usePuterStore();
  const { t } = useI18n();
  const { id } = useParams();
  const { ready } = useRequireAuth();

  const [data, setData] = useState<ResumeData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (!ready || !id) return;
    const urls: string[] = [];
    (async () => {
      const raw = await kv.get(`resume:${id}`);
      if (!raw) return setNotFound(true);
      let parsed: ResumeData;
      try {
        parsed = JSON.parse(raw);
      } catch {
        return setNotFound(true);
      }
      setData(parsed);

      const pdf = await fs.read(parsed.resumePath);
      if (pdf) {
        const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
        urls.push(url);
        setPdfUrl(url);
      }
      const img = await fs.read(parsed.imagePath);
      if (img) {
        const url = URL.createObjectURL(img);
        urls.push(url);
        setImageUrl(url);
      }
    })();
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [ready, id, kv, fs]);

  const r = t.resume;
  const feedback = data?.feedback && typeof data.feedback === "object" ? data.feedback : null;
  const heading = [data?.companyName, data?.jobTitle].filter(Boolean).join(" · ");

  return (
    <>
      <Navbar />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <Button asChild variant="ghost" size="sm" className="-ml-2">
          <Link to="/dashboard">
            <ArrowLeftIcon />
            {r.back}
          </Link>
        </Button>

        {notFound ? (
          <div className="flex flex-col items-center py-24 text-center">
            <FileTextIcon className="size-12 text-muted-foreground" weight="thin" />
            <h1 className="font-display mt-6 text-4xl">{r.notFound}</h1>
            <Button asChild className="mt-8">
              <Link to="/dashboard">{r.notFoundCta}</Link>
            </Button>
          </div>
        ) : (
          <>
            <header className="mt-6 border-b pb-8">
              <p className="font-mono text-xs uppercase tracking-wider text-brand-text">{r.eyebrow}</p>
              <h1 className="font-display mt-3 text-5xl text-balance">{heading || r.title}</h1>
            </header>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
              {/* Preview */}
              <aside className="order-last mx-auto w-full max-w-sm lg:order-none lg:sticky lg:top-24 lg:max-w-none lg:self-start">
                <div className="overflow-hidden rounded-2xl border bg-card">
                  <div className="aspect-[1/1.294] bg-muted">
                    {imageUrl ? (
                      <img src={imageUrl} alt={r.preview} className="size-full object-cover object-top animate-in fade-in" />
                    ) : (
                      <div className="size-full animate-pulse" />
                    )}
                  </div>
                </div>
                {pdfUrl && (
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      {r.openPdf}
                      <ArrowSquareOutIcon />
                    </a>
                  </Button>
                )}
              </aside>

              {/* Report */}
              <div className="min-w-0 space-y-8">
                {feedback ? (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <Summary feedback={feedback} />
                    <ATS score={feedback.ATS?.score ?? 0} suggestions={feedback.ATS?.tips ?? []} />
                    <Details feedback={feedback} />
                  </div>
                ) : (
                  <div aria-busy="true" aria-label={r.loading} className="space-y-6">
                    <div className="h-64 animate-pulse rounded-2xl border bg-card" />
                    <div className="h-48 animate-pulse rounded-2xl border bg-card" />
                    <div className="h-72 animate-pulse rounded-2xl border bg-card" />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      <FooterSection />
    </>
  );
}
