import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-6 pt-4">
        <div className="glass-panel flex items-center justify-between rounded-full px-5 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              AEDNAV
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
            <a href="/#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="/#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="/#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Link
            to="/intake"
            className="rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Start intake
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative grid h-7 w-7 place-items-center rounded-md bg-primary ${className}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 L12 21 M3 12 L21 12" />
      </svg>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-sm font-semibold text-foreground">AEDNAV</span>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Medical disclaimer.</span> AEDNAV is not a
            diagnostic tool and does not replace consultation with a licensed healthcare
            professional. In case of a medical emergency, call your local emergency number
            immediately.
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
