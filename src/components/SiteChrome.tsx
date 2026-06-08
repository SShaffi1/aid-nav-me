import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoUrl from "@/assets/aednav-logo.svg";
import { LANGUAGES, STORAGE_LANG, getLangConfig, type LangCode } from "@/lib/i18n";
import { ui } from "@/lib/ui-i18n";
import { useLang } from "@/components/LanguageGate";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const router = useRouter();
  const lang = useLang();
  const tr = ui(lang);

  function handleAnchor(e: React.MouseEvent, id: string) {
    e.preventDefault();
    if (router.state.location.pathname !== "/") {
      router.navigate({ to: "/" }).then(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => smoothScrollTo(id)));
      });
    } else {
      smoothScrollTo(id);
      history.replaceState(null, "", `#${id}`);
    }
  }

  const navLinkClass = "transition-colors hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5 md:px-6 md:py-3">
        <Link to="/" aria-label="AEDNAV home" className="flex items-center" dir="ltr">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          <a href="/#how" onClick={(e) => handleAnchor(e, "how")} className={navLinkClass}>{tr.nav.how}</a>
          <a href="/#features" onClick={(e) => handleAnchor(e, "features")} className={navLinkClass}>{tr.nav.features}</a>
          <a href="/#faq" onClick={(e) => handleAnchor(e, "faq")} className={navLinkClass}>{tr.nav.faq}</a>
        </nav>
        <div className="flex items-center gap-2" dir="ltr">
          <LanguageSwitcher current={lang} />
          <Link
            to="/intake"
            className="rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            {tr.nav.startIntake}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function LanguageSwitcher({ current }: { current: LangCode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cfg = getLangConfig(current);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function pick(code: LangCode) {
    sessionStorage.setItem(STORAGE_LANG, code);
    sessionStorage.setItem("aednav.langPicked", "1");
    setOpen(false);
    window.dispatchEvent(new CustomEvent("aednav:lang-change", { detail: code }));
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-surface-elevated"
      >
        <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="max-w-[6rem] truncate">{cfg.native}</span>
        <svg className="h-3 w-3 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-50 w-56 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-soft"
        >
          {LANGUAGES.map((l) => {
            const active = l.code === current;
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={active}
                onClick={() => pick(l.code)}
                dir={l.direction}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  active ? "bg-surface-elevated text-foreground" : "text-foreground hover:bg-surface-elevated"
                }`}
              >
                <span>
                  <span className="block text-sm">{l.native}</span>
                  <span className="block text-[11px] text-muted-foreground">{l.label}</span>
                </span>
                {active && (
                  <svg className="h-3.5 w-3.5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Wordmark, uses the brand SVG, sized appropriately for header/footer. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="AEDNAV"
      className={`h-7 w-auto select-none md:h-9 ${className}`}
      draggable={false}
    />
  );
}

/** Backward-compatible Logo export. */
export function Logo({ className = "" }: { className?: string }) {
  return <Wordmark className={className} />;
}

export function SiteFooter() {
  const lang = useLang();
  const tr = ui(lang);
  const dir = getLangConfig(lang).direction;
  return (
    <footer className="mt-32 border-t border-border" dir={dir}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Wordmark className="h-6 md:h-7" />
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">{tr.footer.disclaimerLabel}</span>{" "}
            {tr.footer.disclaimer}
          </p>
        </div>
        <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>{tr.footer.rights.replace("{year}", String(new Date().getFullYear()))}</span>
          <span>{tr.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
