import { useEffect, useState } from "react";

export type Theme = "light" | "dark";
export const STORAGE_THEME = "aednav.theme";

function systemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

let transitionTimer: ReturnType<typeof setTimeout> | undefined;

/** Applies the theme with a brief cross-fade, using the View Transitions API when available. */
export function applyThemeAnimated(theme: Theme) {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    applyTheme(theme);
    return;
  }

  const startViewTransition = (
    document as Document & { startViewTransition?: (cb: () => void) => unknown }
  ).startViewTransition?.bind(document);

  if (startViewTransition) {
    startViewTransition(() => applyTheme(theme));
    return;
  }

  root.classList.add("theme-transition");
  if (transitionTimer) clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => root.classList.remove("theme-transition"), 300);
  applyTheme(theme);
}



export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_THEME) as Theme | null;
    const initial = stored === "dark" || stored === "light" ? stored : systemTheme();
    setTheme(initial);
    applyTheme(initial);
    setReady(true);

    function onChange(e: Event) {
      const next = (e as CustomEvent<Theme>).detail;
      setTheme(next);
    }
    window.addEventListener("aednav:theme-change", onChange);
    return () => window.removeEventListener("aednav:theme-change", onChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_THEME, next);
    applyThemeAnimated(next);
    setTheme(next);
    window.dispatchEvent(new CustomEvent("aednav:theme-change", { detail: next }));
  }

  return { theme, toggle, ready };
}

/** Compact pill toggle that matches the language switcher chrome. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, ready } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-elevated ${className}`}
    >
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
      {ready && isDark ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      )}
    </button>
  );
}
