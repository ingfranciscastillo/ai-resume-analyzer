import { RobotIcon } from "@phosphor-icons/react";
import { ScoreLabel, ScoreValue, TipIcon } from "@/components/score";
import { useI18n } from "@/lib/i18n";

export default function ATS({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) {
  const { t } = useI18n();
  const r = t.resume;

  return (
    <section className="rounded-2xl border bg-card p-6">
      <div className="flex items-start gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-muted">
          <RobotIcon className="size-6" weight="duotone" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-medium">{r.atsTitle}</h2>
            <ScoreValue score={score} className="text-lg" />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <ScoreLabel score={score} />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{r.atsBody}</p>
        </div>
      </div>

      {suggestions.length > 0 && (
        <ul className="mt-6 space-y-3 border-t pt-6">
          {suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <TipIcon type={s.type} />
              <span className="sr-only">{s.type === "good" ? r.good : r.improve}:</span>
              <span>{s.tip}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-sm text-muted-foreground">{r.atsFooter}</p>
    </section>
  );
}
