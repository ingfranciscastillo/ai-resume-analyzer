import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router";
import { useEffect } from "react";
import { IconContext } from "@phosphor-icons/react";

import type { Route } from "./+types/root";
import "@fontsource-variable/geist/index.css";
import "@fontsource-variable/geist-mono/index.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./app.css";
import { usePuterStore } from "@/lib/puter";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { I18nProvider, dictionaries, negotiateLang, readLangCookie, useI18n, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function loader({ request }: Route.LoaderArgs) {
  const lang =
    readLangCookie(request.headers.get("Cookie")) ?? negotiateLang(request.headers.get("Accept-Language"));
  // Used by routes to build absolute canonical / Open Graph URLs.
  const origin = new URL(request.url).origin;
  return { lang, origin };
}

/**
 * Baseline security headers for every document response. A Content-Security-Policy
 * is left to the host: Puter.js loads remote code and opens auth popups, so a strict
 * policy needs testing in report-only mode first.
 */
export function headers(_: Route.HeadersArgs) {
  return {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "X-Frame-Options": "SAMEORIGIN",
  };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://js.puter.com" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  // Missing on unmatched URLs (404); I18nProvider then detects the language on the client.
  const lang: Lang = data?.lang ?? "es";

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
        <script src="https://js.puter.com/v2/" defer />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider initialLang={data?.lang}>
            <IconContext.Provider value={{ weight: "regular", size: 18 }}>
              <HtmlLang />
              <SkipLink />
              {children}
            </IconContext.Provider>
          </I18nProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/** Lets keyboard users jump past the header (WCAG 2.4.1). Pages mark their <main id="main-content">. */
function SkipLink() {
  const { lang } = useI18n();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
    >
      {dictionaries[lang].nav.skipToContent}
    </a>
  );
}

/** Keeps <html lang> in sync when the user switches language on the client. */
function HtmlLang() {
  const { lang } = useI18n();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

export default function App() {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const t = useI18n().t.errors;

  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <main id="main-content" className="bg-grid flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <title>{`${notFound ? t.notFoundTitle : t.genericTitle} | ResumeSense`}</title>
      <meta name="robots" content="noindex" />
      <p className="font-mono text-sm text-brand-text tabular">{status}</p>
      <h1 className="font-display mt-4 text-5xl md:text-6xl">
        {notFound ? t.notFoundTitle : t.genericTitle}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">{notFound ? t.notFoundBody : t.genericBody}</p>
      <Button asChild className="mt-8">
        <Link to="/">{t.home}</Link>
      </Button>
      {stack && (
        <pre className="mt-12 w-full max-w-3xl overflow-x-auto rounded-lg border bg-card p-4 text-left text-xs">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
