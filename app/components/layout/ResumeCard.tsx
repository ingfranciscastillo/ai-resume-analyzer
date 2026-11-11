import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRightIcon, FileTextIcon } from "@phosphor-icons/react";
import { ScoreLabel, ScoreRing } from "@/components/score";
import { usePuterStore } from "@/lib/puter";
import { useI18n } from "@/lib/i18n";

export default function ResumeCard({ resume }: { resume: Resume }) {
  const { fs } = usePuterStore();
  const { t } = useI18n();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let url = "";
    let cancelled = false;
    (async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob || cancelled) return;
      url = URL.createObjectURL(blob);
      setImageUrl(url);
    })();
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [resume.imagePath, fs]);

  const score = resume.feedback?.overallScore ?? 0;
  const title = resume.companyName || resume.jobTitle || t.dashboard.untitled;
  const subtitle = resume.companyName ? resume.jobTitle : undefined;

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] animate-in fade-in"
          />
        ) : (
          <div className="grid size-full place-items-center">
            <FileTextIcon className="size-10 text-muted-foreground/40" weight="thin" />
          </div>
        )}
      </div>
      <div className="flex flex-1 items-center gap-4 p-5">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium">{title}</h3>
          {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-3 flex items-center gap-2">
            <ScoreLabel score={score} />
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {t.dashboard.viewReport}
              <ArrowRightIcon className="size-3" />
            </span>
          </div>
        </div>
        <ScoreRing score={score} size={60} stroke={5} label={t.dashboard.overall} />
      </div>
    </Link>
  );
}
