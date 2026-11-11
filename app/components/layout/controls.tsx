import { DesktopIcon, MoonIcon, SunIcon, TranslateIcon, CheckIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, type Theme } from "@/components/theme-provider";
import { LANGS, useI18n } from "@/lib/i18n";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  const options: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
    { value: "light", label: t.theme.light, Icon: SunIcon },
    { value: "dark", label: t.theme.dark, Icon: MoonIcon },
    { value: "system", label: t.theme.system, Icon: DesktopIcon },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t.theme.label} className="relative">
          <SunIcon className="size-[18px] scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute size-[18px] scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {options.map(({ value, label, Icon }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)} className="gap-2">
            <Icon className="size-4" />
            <span className="flex-1">{label}</span>
            {theme === value && <CheckIcon className="size-3.5" weight="bold" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={t.language.label} className="gap-1.5 px-2.5 font-mono text-xs uppercase">
          <TranslateIcon className="size-4" />
          {lang}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {LANGS.map((code) => (
          <DropdownMenuItem key={code} onClick={() => setLang(code)} className="gap-2" lang={code}>
            <span className="w-6 font-mono text-xs uppercase text-muted-foreground">{code}</span>
            <span className="flex-1">{t.language[code]}</span>
            {lang === code && <CheckIcon className="size-3.5" weight="bold" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
