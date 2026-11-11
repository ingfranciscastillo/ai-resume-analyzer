import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ListIcon, SignOutIcon, SquaresFourIcon, XIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitch, ThemeToggle } from "@/components/layout/controls";
import { usePuterStore } from "@/lib/puter";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { auth, puterReady, isLoading } = usePuterStore();
  // Avoid flashing "Sign in" while Puter is still checking the session.
  const authKnown = puterReady && !isLoading;
  const { t } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/#how-it-works", label: t.nav.howItWorks },
    { to: "/#features", label: t.nav.features },
    { to: "/about", label: t.nav.about },
  ];

  const username = auth.user?.username ?? "";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled || open
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Logo />

        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-md px-3 py-2 text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            <LanguageSwitch />
            <ThemeToggle />
          </div>

          <div className="ml-2 hidden items-center gap-2 lg:flex">
            {!authKnown ? (
              <div aria-hidden className="h-8 w-44 animate-pulse rounded-md bg-muted" />
            ) : auth.isAuthenticated ? (
              <>
                <Button asChild variant="ghost" size="sm">
                  <NavLink to="/dashboard">
                    <SquaresFourIcon />
                    {t.nav.dashboard}
                  </NavLink>
                </Button>
                <Button asChild size="sm">
                  <Link to="/upload">{t.nav.analyze}</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label={t.nav.account}
                      className="ml-1 grid size-8 cursor-pointer place-items-center rounded-full bg-foreground font-mono text-xs font-medium uppercase text-background outline-offset-2"
                    >
                      {username.slice(0, 1) || "·"}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-52">
                    <DropdownMenuLabel className="font-normal">
                      <span className="block text-xs text-muted-foreground">{t.nav.signedInAs}</span>
                      <span className="block truncate font-medium">{username}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="gap-2">
                      <Link to="/dashboard">
                        <SquaresFourIcon className="size-4" />
                        {t.nav.dashboard}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={auth.signOut} className="gap-2">
                      <SignOutIcon className="size-4" />
                      {t.nav.signOut}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth?next=/dashboard">{t.nav.signIn}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/upload">
                    {t.nav.analyze}
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon className="size-5" /> : <ListIcon className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {auth.isAuthenticated && (
              <Link to="/dashboard" className="rounded-md px-3 py-3 text-base font-medium hover:bg-accent">
                {t.nav.dashboard}
              </Link>
            )}
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-3 text-base text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-1 border-t pt-3 sm:hidden">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
            <div className="mt-3 grid gap-2">
              <Button asChild size="lg">
                <Link to="/upload">{t.nav.analyze}</Link>
              </Button>
              {auth.isAuthenticated ? (
                <Button variant="outline" size="lg" onClick={auth.signOut}>
                  <SignOutIcon />
                  {t.nav.signOut}
                </Button>
              ) : (
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth?next=/dashboard">{t.nav.signIn}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
