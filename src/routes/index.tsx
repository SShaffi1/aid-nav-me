import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { DashboardPreview } from "@/components/DashboardPreview";
import { LanguageGate, useLang } from "@/components/LanguageGate";
import { ui } from "@/lib/ui-i18n";
import { getLangConfig } from "@/lib/i18n";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AEDNAV — Prepare for care in any language" },
      {
        name: "description",
        content:
          "AEDNAV helps patients organize health concerns in their own language and generate a clear English visit summary for healthcare providers. Not a diagnostic tool.",
      },
      { property: "og:title", content: "AEDNAV — Prepare for care in any language" },
      {
        property: "og:description",
        content:
          "Multilingual pre-appointment intake. Get a patient summary in your language and a doctor-ready English summary.",
      },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    title: "Multilingual intake",
    body: "Describe what you're experiencing in English, French, Spanish, Mandarin, Punjabi, or Arabic — without translating in your head.",
    icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  },
  {
    title: "Dual-language visit summary",
    body: "Receive two synced summaries: one in your language to read, and one in English to share with your provider.",
    icon: <><rect x="3" y="4" width="8" height="16" rx="1.5" /><rect x="13" y="4" width="8" height="16" rx="1.5" /></>,
  },
  {
    title: "Doctor-ready English summary",
    body: "Concerns, timeline, medications, allergies, and questions — organized in clinical-style English you can show your provider.",
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>,
  },
  {
    title: "Appointment preparation",
    body: "Walk in knowing what you want to ask, what to mention first, and what to bring along.",
    icon: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  },
];

const steps = [
  { n: "01", title: "Choose your language",       body: "Pick the language you're most comfortable describing your health in." },
  { n: "02", title: "Describe your concern",      body: "Share what's been on your mind in your own words. No forms, no jargon." },
  { n: "03", title: "Answer guided questions",    body: "Short follow-ups about timing, severity, medications, allergies, and history." },
  { n: "04", title: "Review your answers",        body: "See everything in one place and edit anything before generating the summary." },
  { n: "05", title: "Get both summaries",         body: "A patient summary in your language and an English summary for your provider." },
];

const audiences = [
  { title: "Newcomers to Canada",        body: "Prepare for an appointment in your strongest language and bring an English summary." },
  { title: "Families supporting relatives", body: "Help a parent, grandparent, or partner organize what to bring to a visit." },
  { title: "Students preparing for appointments", body: "Get clear on what to say before a campus or community clinic visit." },
  { title: "Patients more comfortable in another language", body: "Skip the live translation pressure — describe symptoms calmly first." },
  { title: "Anyone who forgets what to say in the room", body: "Walk in with a written summary, not a blank mind." },
];

const safetyPoints = [
  "AEDNAV does not diagnose or treat conditions.",
  "AEDNAV does not replace healthcare professionals.",
  "AEDNAV does not replace professional medical interpreters.",
  "AEDNAV helps you organize information before care.",
];

const faqs = [
  {
    q: "Is AEDNAV a diagnostic tool?",
    a: "No. AEDNAV does not diagnose conditions or recommend treatments. It helps you organize what you're experiencing so you can communicate clearly with a licensed healthcare provider.",
  },
  {
    q: "Are the translations clinical-grade?",
    a: "No. AEDNAV provides demo translations to support communication and preparation. It is not a substitute for a professional medical interpreter.",
  },
  {
    q: "Will my information be shared?",
    a: "Your intake stays in your browser session. You decide whether to copy, print, or share your visit summary with a provider.",
  },
  {
    q: "What if I'm experiencing an emergency?",
    a: "AEDNAV is not for emergencies. If you have chest pain, difficulty breathing, stroke symptoms, or thoughts of self-harm, contact local emergency services immediately.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-20 md:pt-28">
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-5xl leading-[1.05] text-foreground md:text-6xl"
          >
            Prepare for care<br />
            <span className="text-primary">in any language.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            AEDNAV helps patients organize health concerns in their own language and
            generate a clear English visit summary for healthcare providers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/intake"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start intake
              <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#how"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("how"); }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
            >
              See how it works
            </a>
          </motion.div>

          <p className="mt-6 text-xs text-muted-foreground">
            Built for patients and families who may feel more comfortable explaining health
            concerns in a language other than English.
          </p>
        </div>

        <DashboardPreview />
      </section>

      {/* Features */}
      <section id="features" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">What it does</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            From your language<br />to a doctor-ready summary.
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface p-7 transition-colors duration-200 hover:bg-surface-elevated"
            >
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary-soft text-primary">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">How it works</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            Five steps. About three minutes.
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-t border-border pt-5"
            >
              <span className="text-[11px] font-medium tracking-wider text-muted-foreground">{s.n}</span>
              <h3 className="mt-2 text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dual-language summary preview */}
      <section id="dual" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Dual-language visit summary</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            One conversation.<br />Two summaries.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Read your visit summary in your language. Show the English version to your healthcare
            provider. Both are generated from the same intake.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Patient (Arabic sample) */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8" dir="rtl">
            <div className="flex items-center justify-between" dir="ltr">
              <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Patient summary</p>
              <span className="text-[11px] text-muted-foreground">العربية</span>
            </div>
            <h3 className="font-display mt-2 text-xl text-foreground" dir="ltr">In your selected language</h3>

            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-foreground">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">الشكوى الرئيسية</p>
                <p className="mt-1">صداع متكرر منذ 3 أيام، يزداد بعد الظهر.</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">المدة والشدة</p>
                <p className="mt-1">حوالي 3 أيام · شدة 6 من 10 في أسوأ حالاتها.</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">أسئلة لطرحها على الطبيب</p>
                <ul className="mt-1.5 space-y-1.5">
                  <li>ما الذي قد يسبب هذا الصداع؟</li>
                  <li>هل توجد فحوصات يمكن أن تساعد؟</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Provider (English) */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Provider summary</p>
              <span className="text-[11px] text-muted-foreground">English</span>
            </div>
            <h3 className="font-display mt-2 text-xl text-foreground">Doctor-ready English</h3>

            <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-foreground">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Main concern</p>
                <p className="mt-1">Recurring headaches for 3 days, worse in the afternoon.</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Timeline & severity</p>
                <p className="mt-1">Duration ~3 days · 6/10 at worst (self-reported).</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Patient questions</p>
                <ul className="mt-1.5 space-y-1.5">
                  <li>What might be causing the headaches?</li>
                  <li>Are there tests that would help clarify this?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          For preparation and communication support only. Not a diagnosis.
        </p>
      </section>

      {/* Who it helps */}
      <section id="who" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Who AEDNAV helps</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            Built for the people<br />who do the explaining.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-base font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety / trust */}
      <section className="mx-auto mt-32 max-w-4xl px-6">
        <div className="rounded-2xl border border-border bg-surface p-10 shadow-soft md:p-12">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Safety</p>
          <h2 className="font-display mt-3 text-2xl leading-snug text-foreground md:text-3xl">
            Built for preparation, not diagnosis.
          </h2>
          <ul className="mt-7 space-y-4">
            {safetyPoints.map((p, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-32 max-w-3xl px-6 scroll-mt-24">
        <h2 className="font-display text-center text-4xl leading-tight text-foreground md:text-5xl">
          Frequently asked
        </h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-32 max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-primary px-8 py-14 text-center shadow-soft md:px-16">
          <h2 className="font-display relative text-4xl text-primary-foreground md:text-5xl">
            Ready for your next visit?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm text-primary-foreground/80">
            Three minutes in your language. A clearer conversation in English.
          </p>
          <Link
            to="/intake"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            Start intake
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
