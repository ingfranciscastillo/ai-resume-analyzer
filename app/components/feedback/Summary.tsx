import { ScoreBar, ScoreLabel, ScoreRing, ScoreValue } from "@/components/score";
import { useI18n } from "@/lib/i18n";

export const CATEGORY_KEYS = ["toneAndStyle", "content", "structure", "skills"] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export default function Summary({ feedback }: { feedback: Feedback }) {
  const { t } = useI18n();
  const r = t.resume;

  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
        <ScoreRing score={feedback.overallScore} size={112} stroke={8} label={r.summaryTitle} />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-3xl">{r.summaryTitle}</h2>
            <ScoreLabel score={feedback.overallScore} />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{r.summaryBody}</p>
        </div>
      </div>
      <ul className="divide-y border-t">
        {CATEGORY_KEYS.map((key) => {
          const score = feedback[key]?.score ?? 0;
          return (
            <li key={key} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 px-6 py-4 sm:grid-cols-[10rem_1fr_auto]">
              <span className="text-sm font-medium">{r.categories[key]}</span>
              <ScoreBar score={score} className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto" />
              <ScoreValue score={score} className="text-sm" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
