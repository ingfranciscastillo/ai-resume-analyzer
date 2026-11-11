import { Link } from "react-router";
import {
  ArrowRightIcon,
  ChartBarIcon,
  CheckIcon,
  ClockCounterClockwiseIcon,
  GaugeIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  TargetIcon,
} from "@phosphor-icons/react";
import type { Route } from "./+types/home";
import Navbar from "@/components/layout/navbar";
import FooterSection from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ReportMockup } from "@/components/landing/ReportMockup";
import { metaDictionary, useI18n } from "@/lib/i18n";
import { publicMeta } from "@/lib/seo";
import { usePuterStore } from "@/lib/puter";

export function meta({ matches }: Route.MetaArgs) {
  const t = metaDictionary(matches);
  return [
    ...publicMeta(matches, { title: t.meta.homeTitle, description: t.meta.homeDescription, path: "/" }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "ResumeSense",
        description: t.meta.homeDescription,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
  ];
}

const featureIcons = [GaugeIcon, TargetIcon, ChartBarIcon, LightbulbIcon, ClockCounterClockwiseIcon, ShieldCheckIcon];

export default function Home() {
  const { t } = useI18n();
  const { auth } = usePuterStore();
  const l = t.landing;
  const primaryHref = auth.isAuthenticated ? "/upload" : "/auth?next=/upload";

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pt-12 pb-20 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-28">
            <div className="animate-rise">
              <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-brand" />
                {l.eyebrow}
              </p>
              <h1 className="font-display mt-6 text-[clamp(2.75rem,7vw,5.25rem)] text-balance">
                {l.titleA} <em className="text-brand">{l.titleAccent}</em> {l.titleB}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{l.subtitle}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6 text-[15px]">
                  <Link to={primaryHref}>
                    {l.ctaPrimary}
                    <ArrowRightIcon />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-[15px]">
                  <a href="#how-it-works">{l.ctaSecondary}</a>
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {l.trust.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-brand-text" weight="bold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-rise [animation-delay:150ms]">
              <ReportMockup />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 border-t">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading eyebrow={l.howEyebrow} title={l.howTitle} />
            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-3">
              {l.steps.map((step, i) => (
                <li key={step.title} className="bg-background p-8">
                  <span className="font-display text-5xl text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20 border-t bg-card">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading eyebrow={l.featuresEyebrow} title={l.featuresTitle} />
            <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {l.features.map((feature, i) => {
                const Icon = featureIcons[i];
                return (
                  <li key={feature.title}>
                    <div className="grid size-11 place-items-center rounded-xl border bg-background">
                      <Icon className="size-[22px] text-brand-text" weight="duotone" />
                    </div>
                    <h3 className="mt-5 font-medium">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 sm:px-6 md:py-28">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-background sm:px-12 md:py-20">
            <div className="absolute -top-24 -right-24 size-72 rounded-full bg-brand/30 blur-3xl" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-4xl text-balance md:text-6xl">{l.ctaTitle}</h2>
              <p className="mt-4 text-lg opacity-70">{l.ctaBody}</p>
              <Button asChild size="lg" className="mt-8 h-12 bg-brand px-6 text-[15px] text-brand-foreground hover:bg-brand/90">
                <Link to={primaryHref}>
                  {l.ctaPrimary}
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-wider text-brand-text">{eyebrow}</p>
      <h2 className="font-display mt-4 text-4xl text-balance md:text-5xl">{title}</h2>
    </div>
  );
}
