import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { DashboardPreview } from "@/components/DashboardPreview";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AEDNAV — Navigate healthcare with confidence" },
      {
        name: "description",
        content:
          "AEDNAV helps you organize symptoms, prepare for appointments, and communicate clearly before seeing a healthcare provider. Not a diagnostic tool.",
      },
      { property: "og:title", content: "AEDNAV — Navigate healthcare with confidence" },
      {
        property: "og:description",
        content:
          "AI-powered pre-appointment assistant. Organize symptoms and prepare for your visit.",
      },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    title: "AI intake guidance",
    body: "A calm, structured conversation that helps you describe what you're experiencing, without jumping to conclusions.",
    icon: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  },
  {
    title: "Structured visit summaries",
    body: "Your concerns, timeline, and history, organized into a clear document you can share or print.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </>
    ),
  },
  {
    title: "Appointment preparation",
    body: "Know what questions to ask. Walk in feeling prepared, not overwhelmed.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    title: "Healthcare navigation",
    body: "Get clarity on whether to book a family doctor, walk-in clinic, urgent care, or seek emergency help.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4-4-4 4M12 16V8" />
      </>
    ),
  },
];

const steps = [
  { n: "01", title: "Describe your concerns", body: "Share what you're experiencing in your own words. No forms, no jargon." },
  { n: "02", title: "Answer guided questions", body: "AEDNAV asks structured follow-ups about timing, severity, and history." },
  { n: "03", title: "Receive a summary", body: "A clear, printable document organizing everything for your provider." },
  { n: "04", title: "Walk in prepared", body: "Arrive at your appointment with clarity, questions, and confidence." },
];

const faqs = [
  {
    q: "Is AEDNAV a diagnostic tool?",
    a: "No. AEDNAV does not diagnose conditions or recommend treatments. It helps you organize what you're experiencing so you can communicate clearly with a licensed healthcare provider.",
  },
  {
    q: "Will my information be shared?",
    a: "Your intake stays in your session. You decide whether to download, copy, or share your visit summary with a provider.",
  },
  {
    q: "What if I'm experiencing an emergency?",
    a: "AEDNAV is not for emergencies. If you have chest pain, difficulty breathing, stroke symptoms, or thoughts of self-harm, contact local emergency services immediately.",
  },
  {
    q: "Does it replace seeing a doctor?",
    a: "Not at all. AEDNAV is a preparation tool. It helps the time you spend with your provider go further.",
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
            Walk into your appointment<br />
            <span className="text-primary">already prepared.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            AEDNAV helps you organize symptoms, prepare questions, and communicate
            clearly with your healthcare provider. It is not a diagnostic tool.
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
              Learn more
            </a>
          </motion.div>
        </div>

        <DashboardPreview />
      </section>

      {/* Features */}
      <section id="features" className="mx-auto mt-32 max-w-6xl px-6 scroll-mt-24">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">What it does</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-foreground md:text-5xl">
            Built around the moments<br />before your appointment.
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
            Four steps. About three minutes.
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Trust strip */}
      <section className="mx-auto mt-32 max-w-4xl px-6">
        <div className="rounded-2xl border border-border bg-surface p-10 shadow-soft md:p-12">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Why it matters</p>
          <p className="font-display mt-3 text-2xl leading-snug text-foreground md:text-3xl">
            Appointments can feel short. AEDNAV helps you arrive with your concerns organized,
            so you can use your time more clearly.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-32 max-w-3xl px-6 scroll-mt-24">
        <h2 className="font-display text-center text-4xl leading-tight text-foreground md:text-5xl">
          Frequently asked
        </h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} defaultOpen={i === -1} />
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
            Three minutes now. A clearer conversation later.
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

function FaqItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
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
