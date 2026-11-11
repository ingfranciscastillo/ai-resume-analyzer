import { Link } from "react-router";
import { CoffeeIcon, GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n";

const socials = [
  { href: "https://github.com/ingfranciscastillo/ai-resume-analyzer", label: "GitHub", Icon: GithubLogoIcon },
  { href: "https://x.com/ingfranciscas", label: "X", Icon: XLogoIcon },
  { href: "https://www.linkedin.com/in/ingfranciscastillo/", label: "LinkedIn", Icon: LinkedinLogoIcon },
  { href: "https://www.instagram.com/ingfranciscastillo/", label: "Instagram", Icon: InstagramLogoIcon },
  { href: "https://www.buymeacoffee.com/ingfranciscastillo", label: "Buy me a coffee", Icon: CoffeeIcon },
];

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
          <ul className="flex gap-1 pt-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
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
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <span>{t.footer.rights(new Date().getFullYear())}</span>
          <span>{t.footer.madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
