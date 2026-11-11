import { CaretDownIcon } from "@phosphor-icons/react";
import { ScoreLabel, ScoreValue, TipIcon } from "@/components/score";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { CATEGORY_KEYS } from "./Summary";

type Tip = { type: "good" | "improve"; tip: string; explanation: string };

export default function Details({ feedback }: { feedback: Feedback }) {
  const { t } = useI18n();
  const r = t.resume;

  return (
    <section>
      <h2 className="font-display text-3xl">{r.detailsTitle}</h2>
      <div className="mt-6 divide-y overflow-hidden rounded-2xl border bg-card">
        {CATEGORY_KEYS.map((key, i) => {
          const category = feedback[key];
          if (!category) return null;
          return (
            <details key={key} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 transition-colors hover:bg-accent/50 [&::-webkit-details-marker]:hidden">
                <span className="flex-1 font-medium">{r.categories[key]}</span>
                <ScoreLabel score={category.score} className="hidden sm:inline-flex" />
                <ScoreValue score={category.score} className="text-sm" />
                <CaretDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <ul className="space-y-3 px-6 pb-6">
                {(category.tips as Tip[]).map((tip, j) => (
                  <li
                    key={j}
                    className={cn(
                      "rounded-xl border p-4",
                      tip.type === "good" ? "border-success/25 bg-success-soft/50" : "border-warning/25 bg-warning-soft/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <TipIcon type={tip.type} />
                      <div className="min-w-0">
                        <p className="font-medium text-pretty">
                          <span className="sr-only">{tip.type === "good" ? r.good : r.improve}: </span>
                          {tip.tip}
                        </p>
                        {tip.explanation && (
                          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                            {tip.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </section>
  );
}
