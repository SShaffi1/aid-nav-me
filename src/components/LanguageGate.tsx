import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES, STORAGE_LANG, type LangCode } from "@/lib/i18n";

const STORAGE_PICKED = "aednav.langPicked";

export function LanguageGate() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LangCode>("en");

  useEffect(() => {
    const picked = sessionStorage.getItem(STORAGE_PICKED);
    if (!picked) {
      setOpen(true);
    }
  }, []);

  function confirm(code: LangCode) {
    sessionStorage.setItem(STORAGE_LANG, code);
    sessionStorage.setItem(STORAGE_PICKED, "1");
    setOpen(false);
    // Force re-render of language-aware UI by reloading lightly via an event.
    window.dispatchEvent(new CustomEvent("aednav:lang-change", { detail: code }));
  }

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] grid place-items-center bg-foreground/30 px-4 backdrop-blur-sm"
        role="dialog" aria-modal="true" aria-labelledby="lang-gate-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-soft md:p-8"
        >
          <h2 id="lang-gate-title" className="font-display text-2xl text-foreground md:text-3xl">
            Choose your language
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            AEDNAV will translate the interface and let you complete intake in the language you pick.
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {LANGUAGES.map((l) => {
              const active = l.code === selected;
              return (
                <button
                  key={l.code}
                  onClick={() => setSelected(l.code)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-150 active:scale-[0.99] ${
                    active
                      ? "border-foreground/40 bg-surface-elevated"
                      : "border-border bg-surface hover:bg-surface-elevated"
                  }`}
                >
                  <span>
                    <span dir="auto" className="block text-base font-medium text-foreground">{l.native}</span>
                    <span className="block text-[11px] text-muted-foreground">{l.label}</span>
                  </span>
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-full border ${
                      active ? "border-foreground bg-foreground" : "border-border"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-background" />}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => confirm(selected)}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            You can change the language anytime from the top-right of the page.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Hook: get current language and re-render when it changes. */
export function useLang(): LangCode {
  const [lang, setLang] = useState<LangCode>("en");
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_LANG) as LangCode | null;
    if (stored) setLang(stored);
    function onChange(e: Event) {
      const code = (e as CustomEvent<LangCode>).detail;
      if (code) setLang(code);
    }
    window.addEventListener("aednav:lang-change", onChange);
    return () => window.removeEventListener("aednav:lang-change", onChange);
  }, []);
  return lang;
}
