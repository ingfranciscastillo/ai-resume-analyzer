import type { MetaDescriptor } from "react-router";
import { DEFAULT_LANG, type Lang } from "@/lib/i18n";

type RootData = { lang?: Lang; origin?: string };

function rootData(matches: readonly unknown[]): RootData {
  const root = (matches as { id?: string; loaderData?: RootData }[]).find((m) => m?.id === "root");
  return root?.loaderData ?? {};
}

/** Meta tags for public, indexable pages: canonical URL, Open Graph and Twitter card. */
export function publicMeta(
  matches: readonly unknown[],
  { title, description, path }: { title: string; description: string; path: string }
): MetaDescriptor[] {
  const { origin = "", lang = DEFAULT_LANG } = rootData(matches);
  const url = `${origin}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "ResumeSense" },
    { property: "og:locale", content: lang === "es" ? "es_ES" : "en_US" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

/** Meta tags for signed-in or utility pages that shouldn't appear in search results. */
export function privateMeta(title: string): MetaDescriptor[] {
  return [{ title }, { name: "robots", content: "noindex, nofollow" }];
}

/** Routes listed in sitemap.xml. Keep in sync with the public routes in app/routes.ts. */
export const PUBLIC_PATHS = ["/", "/about"] as const;

/** Routes search engines should skip. */
export const PRIVATE_PATHS = ["/auth", "/dashboard", "/upload", "/resume/", "/wipe"] as const;
