import { Link, useRouter } from "@tanstack/react-router";
import logoUrl from "@/assets/aednav-logo.svg";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-6 md:py-3">
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
          className="rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          Start intake
        </Link>
      </div>
    </header>
  );
}

/** Wordmark — uses the brand SVG, sized appropriately for header/footer. */
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
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Wordmark className="h-6 md:h-7" />
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
