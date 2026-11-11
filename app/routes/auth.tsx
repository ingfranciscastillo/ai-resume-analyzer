import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CircleNotchIcon, QuotesIcon } from "@phosphor-icons/react";
import type { Route } from "./+types/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitch, ThemeToggle } from "@/components/layout/controls";
import { ScoreRing } from "@/components/score";
import { usePuterStore } from "@/lib/puter";
import { metaDictionary, useI18n } from "@/lib/i18n";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: metaDictionary(matches).meta.authTitle }];
}

/** Only allow same-site relative paths as redirect targets. */
function safeNext(value: string | null) {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/dashboard";
}

export default function LoginPage() {
  const { isLoading, auth } = usePuterStore();
  const { t } = useI18n();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const navigate = useNavigate();
  const a = t.auth;

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next, { replace: true });
  }, [auth.isAuthenticated, next, navigate]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-foreground text-background lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand/30 blur-3xl" />
        <Logo className="relative" />
        <figure className="relative max-w-md">
          <QuotesIcon className="size-10 text-brand" weight="fill" aria-hidden />
          <blockquote className="font-display mt-6 text-5xl leading-[1.05]">{a.quote}</blockquote>
        </figure>
        <div className="relative flex items-center gap-4 rounded-2xl border border-background/15 bg-background/5 p-4 backdrop-blur" aria-hidden>
          <ScoreRing score={86} size={56} stroke={5} className="[&_circle:first-child]:stroke-background/15" />
          <div className="space-y-2">
            <div className="h-2 w-40 rounded bg-background/40" />
            <div className="h-2 w-28 rounded bg-background/20" />
          </div>
        </div>
      </aside>

      {/* Sign-in */}
      <main className="flex flex-col px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link to="/">
              <ArrowLeftIcon />
              {a.back}
            </Link>
          </Button>
          <div className="flex items-center gap-1">
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-16">
          <Logo className="mb-10 lg:hidden" />
          <p className="font-mono text-xs uppercase tracking-wider text-brand-text">{a.eyebrow}</p>
          <h1 className="font-display mt-3 text-5xl text-balance">
            {auth.isAuthenticated ? a.signedIn : a.title}
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{a.body}</p>

          <div className="mt-8">
            {isLoading ? (
              <Button size="lg" className="h-12 w-full" disabled>
                <CircleNotchIcon className="animate-spin" />
                {a.signingIn}
              </Button>
            ) : auth.isAuthenticated ? (
              <div className="grid gap-2">
                <Button asChild size="lg" className="h-12 w-full">
                  <Link to={next}>
                    {a.goDashboard}
                    <ArrowRightIcon />
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" onClick={auth.signOut}>
                  {a.signOut}
                </Button>
              </div>
            ) : (
              <Button size="lg" className="h-12 w-full text-[15px]" onClick={auth.signIn}>
                {a.signIn}
                <ArrowRightIcon />
              </Button>
            )}
          </div>

          <ul className="mt-10 space-y-3 border-t pt-8 text-sm text-muted-foreground">
            {a.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand-text" weight="bold" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
