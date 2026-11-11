import { Link } from "react-router";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n";

const GITHUB_URL = "https://github.com/ingfranciscastillo/ai-resume-analyzer";

export default function FooterSection() {
  const { t } = useI18n();

  const columns = [
    {
      title: t.footer.product,
      links: [
        { to: "/#how-it-works", label: t.nav.howItWorks },
        { to: "/#features", label: t.nav.features },
        { to: "/upload", label: t.nav.analyze },
        { to: "/about", label: t.nav.about },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { to: "/dashboard", label: t.nav.dashboard },
        { to: "/wipe", label: t.footer.deleteData },
      ],
    },
  ];

  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">{t.footer.tagline}</p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubLogoIcon className="size-5" />
            GitHub
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{col.title}</h2>
            <ul className="mt-4 space-y-1">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="inline-block py-1.5 text-sm transition-colors hover:text-brand-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          {t.footer.rights(new Date().getFullYear())}
        </div>
      </div>
    </footer>
  );
}
