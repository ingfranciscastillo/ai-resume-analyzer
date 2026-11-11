import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRevalidator } from "react-router";
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  dictionaries,
  negotiateLang,
  readLangCookie,
  type Dictionary,
  type Lang,
} from "./dictionaries";

export * from "./dictionaries";

type I18nState = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nState | null>(null);

export function I18nProvider({ initialLang, children }: { initialLang?: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang ?? DEFAULT_LANG);
  const revalidator = useRevalidator();

  // Unmatched URLs (404) render without root loader data, so detect on the client.
  useEffect(() => {
    if (initialLang) return;
    setLangState(readLangCookie(document.cookie) ?? negotiateLang(navigator.languages));
  }, [initialLang]);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      // One year; read by the root loader so SSR renders in the right language.
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      // Re-run loaders so route `meta` (page titles) switch language too.
      revalidator.revalidate();
    },
    [revalidator]
  );

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** For `meta` exports: they run outside React, so they read the root loader data. */
export function metaDictionary(matches: readonly unknown[]): Dictionary {
  const root = (matches as { id?: string; loaderData?: { lang?: Lang } }[]).find((m) => m?.id === "root");
  return dictionaries[root?.loaderData?.lang ?? DEFAULT_LANG];
}
