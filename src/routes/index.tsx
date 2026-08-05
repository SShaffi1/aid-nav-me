import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { DashboardPreview } from "@/components/DashboardPreview";
import { LanguageGate, useLang } from "@/components/LanguageGate";
import { ui } from "@/lib/ui-i18n";
import { landing } from "@/lib/landing-i18n";
import { getLangConfig } from "@/lib/i18n";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AEDNAV: Prepare for care in any language" },
      {
        name: "description",
        content:
          "AEDNAV helps patients organize health concerns in their own language and generate a clear English visit summary for healthcare providers. Not a diagnostic tool.",
      },
      { property: "og:title", content: "AEDNAV: Prepare for care in any language" },
      {
        property: "og:description",
        content:
          "Multilingual pre-appointment intake. Get a patient summary in your language and a doctor-ready English summary.",
      },
    ],
  }),
  component: LandingPage,
});

const featureIcons = [
  <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  <><rect x="3" y="4" width="8" height="16" rx="1.5" /><rect x="13" y="4" width="8" height="16" rx="1.5" /></>,
  <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>,
  <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
];

const eyebrowClass = "text-sm font-medium text-primary";

function LandingPage() {
  const lang = useLang();
  const tr = ui(lang);
  const lc = landing(lang);
  return (
    <div className="min-h-screen bg-background">
      <LanguageGate />
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-20 pb-16 md:pt-40 md:pb-32">
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={eyebrowClass}
          >
            {tr.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance mt-5 text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-8xl md:leading-[1.02]"
          >
            {tr.hero.title1}<br />
            <span style={{ color: "var(--primary)" }}>{tr.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {tr.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              to="/intake"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: "var(--primary)", minHeight: "44px" }}
            >
              {tr.hero.primary}
              <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#how"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("how"); }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-surface sm:w-auto"
              style={{ borderColor: "var(--border)", minHeight: "44px" }}
            >
              {tr.hero.secondary}
            </a>
          </motion.div>

          <p className="mt-8 text-xs text-muted-foreground">
            {tr.hero.note}
          </p>
        </div>

        <DashboardPreview />
      </section>

      {/* Features */}
      <section id="features" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className={eyebrowClass}>{tr.sectionTitles.featuresEyebrow}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            {tr.sectionTitles.featuresTitle}
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {lc.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-5 sm:p-8 md:p-10"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {featureIcons[i]}
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className={eyebrowClass}>{tr.sectionTitles.howEyebrow}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            {tr.sectionTitles.howTitle}
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {lc.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-t pt-5"
             
            >
              <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dual-language summary preview */}
      <section id="dual" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className={eyebrowClass}>{tr.sectionTitles.dualEyebrow}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            {tr.sectionTitles.dualTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {lc.dual.sectionBody}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Patient (selected language) — white with border */}
          <div className="rounded-2xl bg-card p-5 sm:p-8 md:p-10 border">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{lc.dual.patientLabel}</p>
              <span className="text-xs text-muted-foreground">{getLangConfig(lang).native}</span>
            </div>
            <h3 className="font-display mt-2 text-xl text-foreground">{lc.dual.patientTitle}</h3>

            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-foreground">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{lc.dual.patientFields.concern}</p>
                <p className="mt-1">{lc.dual.patientConcern}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{lc.dual.patientFields.timeline}</p>
                <p className="mt-1">{lc.dual.patientTimeline}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">{lc.dual.patientFields.questions}</p>
                <ul className="mt-1.5 space-y-1.5">
                  {lc.dual.patientQuestions.map((q) => <li key={q}>{q}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Provider (always English) — surface */}
          <div className="rounded-2xl p-5 sm:p-8 md:p-10" style={{ backgroundColor: "var(--surface)" }}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Provider summary</p>
              <span className="text-xs text-muted-foreground">English</span>
            </div>
            <h3 className="font-display mt-2 text-xl text-foreground">Doctor-ready English</h3>

            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-foreground">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Main concern</p>
                <p className="mt-1">Recurring headaches for 3 days, worse in the afternoon.</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Timeline & severity</p>
                <p className="mt-1">Duration ~3 days · 6/10 at worst (self-reported).</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Patient questions</p>
                <ul className="mt-1.5 space-y-1.5">
                  <li>What might be causing the headaches?</li>
                  <li>Are there tests that would help clarify this?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          {lc.dual.note}
        </p>
      </section>

      {/* Who it helps */}
      <section id="who" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className={eyebrowClass}>{tr.sectionTitles.whoEyebrow}</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            {tr.sectionTitles.whoTitle}
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lc.audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl p-5 sm:p-8"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <h3 className="text-base font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety / trust */}
      <section className="mx-auto mt-32 max-w-4xl px-6">
        <div className="rounded-2xl p-5 sm:p-10 md:p-12" style={{ backgroundColor: "var(--surface)" }}>
          <p className={eyebrowClass}>{tr.sectionTitles.safetyEyebrow}</p>
          <h2 className="font-display mt-3 text-2xl leading-snug text-foreground md:text-3xl">
            {tr.sectionTitles.safetyTitle}
          </h2>
          <ul className="mt-7 space-y-4">
            {lc.safety.map((p, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-32 max-w-3xl px-6 scroll-mt-24">
        <h2 className="font-display text-center text-4xl leading-tight text-foreground md:text-5xl">
          {tr.sectionTitles.faq}
        </h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {lc.faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-32 mb-24 max-w-4xl px-6">
        <div
          className="relative overflow-hidden px-5 py-12 text-center sm:px-8 sm:py-16 md:px-16"
          style={{ backgroundColor: "var(--primary)", borderRadius: "20px" }}
        >
          <h2 className="font-display relative text-3xl text-primary-foreground sm:text-4xl md:text-5xl">
            {tr.sectionTitles.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base text-primary-foreground/85">
            {tr.sectionTitles.ctaBody}
          </p>
          <Link
            to="/intake"
            className="relative mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-opacity hover:opacity-90 sm:w-auto"
            style={{ minHeight: "44px" }}
          >
            {tr.sectionTitles.ctaButton}
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-3 text-left"
      >
        <span className="text-base font-medium text-foreground">{question}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 pr-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
