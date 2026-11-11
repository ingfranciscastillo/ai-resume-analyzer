import { Link } from "react-router";
import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react";
import type { Route } from "./+types/about";
import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { metaDictionary, useI18n } from "@/lib/i18n";
import { publicMeta } from "@/lib/seo";

export function meta({ matches }: Route.MetaArgs) {
  const t = metaDictionary(matches);
  return publicMeta(matches, { title: t.meta.aboutTitle, description: t.about.body, path: "/about" });
}

export default function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <>
      <Navbar />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand-text">{a.eyebrow}</p>
          <h1 className="font-display mt-4 text-5xl text-balance md:text-7xl">{a.title}</h1>
          <p className="mt-8 text-xl leading-relaxed text-pretty text-muted-foreground">{a.body}</p>
          <p className="mt-6 text-sm">{a.madeBy}</p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
          {t.landing.steps.map((step, i) => (
            <li key={step.title} className="bg-background p-8">
              <span className="font-display text-4xl text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 font-medium">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-8 rounded-2xl border bg-card p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-3xl">{a.stackTitle}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{a.stack}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/ingfranciscastillo/ai-resume-analyzer" target="_blank" rel="noopener noreferrer">
                <GithubLogoIcon />
                {a.github}
              </a>
            </Button>
            <Button asChild size="lg">
              <Link to="/upload">
                {t.nav.analyze}
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
