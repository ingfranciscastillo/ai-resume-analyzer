import type { Route } from "./+types/sitemap[.]xml";
import { PUBLIC_PATHS } from "@/lib/seo";

export function loader({ request }: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;
  const urls = PUBLIC_PATHS.map((path) => `  <url>\n    <loc>${origin}${path}</loc>\n  </url>`).join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
