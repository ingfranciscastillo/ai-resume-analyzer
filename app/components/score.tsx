import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ScoreTone = "strong" | "good" | "weak";

export function scoreTone(score: number): ScoreTone {
  if (score > 69) return "strong";
  if (score > 49) return "good";
  return "weak";
}

const toneText: Record<ScoreTone, string> = {
  strong: "text-success",
  good: "text-warning",
  weak: "text-danger",
};

const toneStroke: Record<ScoreTone, string> = {
  strong: "stroke-success",
  good: "stroke-warning",
  weak: "stroke-brand",
};

const toneBg: Record<ScoreTone, string> = {
  strong: "bg-success",
  good: "bg-warning",
  weak: "bg-brand",
};

const toneSoft: Record<ScoreTone, string> = {
  strong: "bg-success-soft text-success",
  good: "bg-warning-soft text-warning",
  weak: "bg-danger-soft text-danger",
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n || 0)));

/** Circular score with the number in the middle. */
export function ScoreRing({
  score,
  size = 88,
  stroke = 7,
  className,
  label,
}: {
  score: number;
  size?: number;
  stroke?: number;
  className?: string;
  label?: string;
}) {
  const value = clamp(score);
  const tone = scoreTone(value);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label ? label + ": " : ""}${value}/100`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-border" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / 100)}
          className={cn(toneStroke[tone], "transition-[stroke-dashoffset] duration-700 ease-out")}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono font-medium tabular" style={{ fontSize: Math.round(size * 0.26) }}>
          {value}
        </span>
      </div>
    </div>
  );
}

/** Thin horizontal bar used for category scores. */
export function ScoreBar({ score, className }: { score: number; className?: string }) {
  const value = clamp(score);
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-border", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", toneBg[scoreTone(value)])}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/** "Strong / Good start / Needs work" pill. */
export function ScoreLabel({ score, className }: { score: number; className?: string }) {
  const { t } = useI18n();
  const tone = scoreTone(score);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        toneSoft[tone],
        className
      )}
    >
      {t.resume.labels[tone]}
    </span>
  );
}

export function ScoreValue({ score, className }: { score: number; className?: string }) {
  const value = clamp(score);
  return (
    <span className={cn("font-mono tabular", className)}>
      <span className={toneText[scoreTone(value)]}>{value}</span>
      <span className="text-muted-foreground">/100</span>
    </span>
  );
}

/** Check / warning marker for a tip. */
export function TipIcon({ type, className }: { type: "good" | "improve"; className?: string }) {
  return type === "good" ? (
    <CheckCircleIcon weight="fill" className={cn("size-5 shrink-0 text-success", className)} aria-hidden />
  ) : (
    <WarningCircleIcon weight="fill" className={cn("size-5 shrink-0 text-warning", className)} aria-hidden />
  );
}
