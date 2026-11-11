import { FilePdfIcon } from "@phosphor-icons/react";
import { ScoreBar, ScoreRing, TipIcon } from "@/components/score";
import { useI18n } from "@/lib/i18n";

/** Decorative, static preview of a report. Hidden from assistive tech. */
export function ReportMockup() {
  const { t } = useI18n();
  const m = t.landing.mockup;
  const categories = [
    { label: t.resume.categories.toneAndStyle, score: 84 },
    { label: t.resume.categories.content, score: 72 },
    { label: t.resume.categories.structure, score: 88 },
    { label: t.resume.categories.skills, score: 46 },
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[520px] select-none">
      {/* Resume sheet being scanned */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-[0_1px_0_rgb(0_0_0/0.04),0_24px_48px_-24px_rgb(0_0_0/0.25)] sm:p-8">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="grid size-9 place-items-center rounded-lg bg-brand-soft text-brand-text">
            <FilePdfIcon className="size-5" weight="duotone" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-mono text-xs">{m.file}</p>
            <p className="truncate text-xs text-muted-foreground">{m.role}</p>
          </div>
        </div>

        <div className="relative mt-5 space-y-2.5 [--scan-distance:150px]">
          <div className="h-3 w-2/5 rounded bg-foreground/80" />
          <div className="h-2 w-3/5 rounded bg-muted-foreground/30" />
          <div className="h-2 w-full rounded bg-muted-foreground/15" />
          <div className="h-2 w-11/12 rounded bg-muted-foreground/15" />
          <div className="h-2 w-4/5 rounded bg-muted-foreground/15" />
          <div className="pt-2" />
          <div className="h-2.5 w-1/3 rounded bg-foreground/70" />
          <div className="h-2 w-full rounded bg-muted-foreground/15" />
          <div className="h-2 w-10/12 rounded bg-brand/35" />
          <div className="h-2 w-9/12 rounded bg-muted-foreground/15" />
          <div className="pointer-events-none absolute inset-x-0 -top-1 h-8 animate-scan bg-gradient-to-b from-transparent via-brand/15 to-transparent">
            <div className="absolute inset-x-0 bottom-1/2 h-px bg-brand/70" />
          </div>
        </div>
      </div>

      {/* Floating report card */}
      <div className="relative -mt-10 ml-auto w-[92%] rounded-2xl border bg-popover p-5 shadow-[0_32px_64px_-24px_rgb(0_0_0/0.35)] sm:-mt-16 sm:w-[86%] sm:p-6">
        <div className="flex items-center gap-4">
          <ScoreRing score={78} size={72} stroke={6} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">{m.overall}</p>
            <p className="font-display text-3xl">78<span className="text-muted-foreground">/100</span></p>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-xs text-muted-foreground">{m.ats}</p>
            <p className="font-mono text-sm tabular text-success">91</p>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {categories.map((c) => (
            <li key={c.label} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-xs">
              <span className="truncate text-muted-foreground">{c.label}</span>
              <ScoreBar score={c.score} />
              <span className="text-right font-mono tabular">{c.score}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 space-y-2 border-t pt-4 text-xs">
          <li className="flex items-start gap-2">
            <TipIcon type="good" className="size-4" />
            <span>{m.tipGood}</span>
          </li>
          <li className="flex items-start gap-2">
            <TipIcon type="improve" className="size-4" />
            <span>{m.tipImprove}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
