import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/about", "routes/about.tsx"),
  route("/upload", "routes/upload.tsx"),
  route("/resume/:id", "routes/resume.tsx"),
  route("/wipe", "routes/wipe.tsx"),
  route("/robots.txt", "routes/robots[.]txt.ts"),
  route("/sitemap.xml", "routes/sitemap[.]xml.ts"),
] satisfies RouteConfig;
