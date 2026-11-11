import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";
type Resolved = "light" | "dark";

export const THEME_STORAGE_KEY = "resumesense-theme";

/**
 * Runs before React hydrates (inlined in <head>) so the right theme is painted
 * on the first frame, with no light/dark flash.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t==="dark"||((!t||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

type ThemeState = {
  theme: Theme;
  resolvedTheme: Resolved;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

function systemTheme(): Resolved {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolved] = useState<Resolved>("light");

  // Load the saved preference after hydration.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "system") setThemeState(stored);
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Resolve "system" and follow OS changes live.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setResolved(theme === "system" ? systemTheme() : theme);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  // The <html> class is owned here (not by React's className prop) so
  // re-renders and hydration can never strip it.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
