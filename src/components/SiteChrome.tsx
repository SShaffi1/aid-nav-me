import { Link, useRouter } from "@tanstack/react-router";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SiteHeader() {
  const router = useRouter();

  function handleAnchor(e: React.MouseEvent, id: string) {
    e.preventDefault();
    if (router.state.location.pathname !== "/") {
      router.navigate({ to: "/" }).then(() => {
        // wait for route to mount
        requestAnimationFrame(() => requestAnimationFrame(() => smoothScrollTo(id)));
      });
    } else {
      smoothScrollTo(id);
      history.replaceState(null, "", `#${id}`);
    }
  }

  const navLinkClass =
    "transition-colors hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-6 md:py-3.5">
        <Link to="/" aria-label="AEDNAV home" className="flex items-center">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
          <a href="/#how" onClick={(e) => handleAnchor(e, "how")} className={navLinkClass}>How it works</a>
          <a href="/#features" onClick={(e) => handleAnchor(e, "features")} className={navLinkClass}>Features</a>
          <a href="/#faq" onClick={(e) => handleAnchor(e, "faq")} className={navLinkClass}>FAQ</a>
        </nav>
        <Link
          to="/intake"
          className="rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Start intake
        </Link>
      </div>
    </header>
  );
}

/** Wordmark — typographic AEDNAV brand with a small mark */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-background md:h-9 md:w-9"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[18px] md:w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h4l2-5 4 10 2-5h6" />
        </svg>
      </span>
      <span className="font-display text-[20px] font-semibold tracking-[-0.01em] text-foreground md:text-[22px]">
        AEDNAV
      </span>
    </span>
  );
}

/** Backward-compatible Logo export. Now renders the wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return <Wordmark className={className} />;
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Wordmark />
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Medical disclaimer.</span> AEDNAV is not a
            diagnostic tool and does not replace consultation with a licensed healthcare
            professional. In a medical emergency, call 911.
          </p>
        </div>
        <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} AEDNAV</span>
          <span>Built for clarity, not diagnosis.</span>
        </div>
      </div>
    </footer>
  );
}

