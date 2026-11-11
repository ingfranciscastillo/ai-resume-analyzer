import { Link } from "react-router";
import { cn } from "@/lib/utils";

/** Editorial wordmark: "Resume" upright, "Sense" in italic, coral full stop. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[28px] leading-none whitespace-nowrap", className)}>
      Resume<em>Sense</em>
      <span className="text-brand">.</span>
    </span>
  );
}

export function Logo({ to = "/", className }: { to?: string; className?: string }) {
  return (
    <Link to={to} aria-label="ResumeSense" className={cn("inline-flex items-center rounded-md outline-offset-4", className)}>
      <Wordmark />
    </Link>
  );
}
