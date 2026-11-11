import { Link } from "react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <rect x="2" y="2" width="28" height="28" rx="8" className="fill-foreground" />
      <path
        d="M9 11h9M9 16h14M9 21h7"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        className="stroke-background"
      />
      <circle cx="22" cy="11" r="3" className="fill-brand" />
    </svg>
  );
}

export function Logo({ to = "/", className }: { to?: string; className?: string }) {
  return (
    <Link
      to={to}
      aria-label="ResumeSense"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md text-[17px] font-semibold tracking-tight outline-offset-4",
        className
      )}
    >
      <LogoMark />
      <span>
        Resume<span className="font-display text-[21px] italic">Sense</span>
      </span>
    </Link>
  );
}
