import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FilePlusIcon, PlusIcon } from "@phosphor-icons/react";
import type { Route } from "./+types/dashboard";
import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import ResumeCard from "@/components/layout/ResumeCard";
import { Button } from "@/components/ui/button";
import { usePuterStore } from "@/lib/puter";
import { metaDictionary, useI18n } from "@/lib/i18n";
import { privateMeta } from "@/lib/seo";
import { useRequireAuth } from "@/lib/use-require-auth";

export function meta({ matches }: Route.MetaArgs) {
  return privateMeta(metaDictionary(matches).meta.dashboardTitle);
}

export default function Dashboard() {
  const { kv } = usePuterStore();
  const { t } = useI18n();
  const { ready } = useRequireAuth();
  const [resumes, setResumes] = useState<Resume[] | null>(null);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      const items = ((await kv.list("resume:*", true)) as KVItem[] | undefined) ?? [];
      const parsed = items
        .map((item) => {
          try {
            return JSON.parse(item.value) as Resume;
          } catch {
            return null;
          }
        })
        .filter((r): r is Resume => !!r && !!r.feedback && typeof r.feedback === "object");
      setResumes(parsed);
    })();
  }, [ready, kv]);

  const d = t.dashboard;

  return (
    <>
      <Navbar />
      <main id="main-content" className="mx-auto min-h-[70svh] max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-brand-text">{d.eyebrow}</p>
            <h1 className="font-display mt-3 text-5xl">{d.title}</h1>
            <p className="mt-2 text-muted-foreground">
              {resumes && resumes.length > 0 ? d.count(resumes.length) : d.subtitle}
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/upload">
              <PlusIcon weight="bold" />
              {d.newAnalysis}
            </Link>
          </Button>
        </div>

        {resumes === null ? (
          <div aria-busy="true" aria-label={d.loading} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border bg-card">
                <div className="aspect-[4/3] animate-pulse bg-muted" />
                <div className="space-y-2 p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed px-6 py-20 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand-text">
              <FilePlusIcon className="size-7" weight="duotone" />
            </div>
            <h2 className="font-display mt-6 text-3xl">{d.emptyTitle}</h2>
            <p className="mt-3 max-w-md text-muted-foreground">{d.emptyBody}</p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/upload">{d.emptyCta}</Link>
            </Button>
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <li key={resume.id}>
                <ResumeCard resume={resume} />
              </li>
            ))}
          </ul>
        )}
      </main>
      <FooterSection />
    </>
  );
}
