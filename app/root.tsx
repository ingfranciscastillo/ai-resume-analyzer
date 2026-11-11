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
import "./app.css";
import { usePuterStore } from "@/lib/puter";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { I18nProvider, dictionaries, negotiateLang, readLangCookie, useI18n, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function loader({ request }: Route.LoaderArgs) {
  const lang =
    readLangCookie(request.headers.get("Cookie")) ?? negotiateLang(request.headers.get("Accept-Language"));
  return { lang };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400..600&family=Instrument+Serif:ital@0;1&display=swap",
  },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
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
          <I18nProvider initialLang={lang}>
            <IconContext.Provider value={{ weight: "regular", size: 18 }}>
              <HtmlLang />
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
  const data = useRouteLoaderData<typeof loader>("root");
  const t = dictionaries[data?.lang ?? "es"].errors;

  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const status = isRouteErrorResponse(error) ? error.status : 500;
  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <main className="bg-grid flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
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
