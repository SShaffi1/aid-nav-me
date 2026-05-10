import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/SiteChrome";
import { initialAnswers, type IntakeAnswers } from "@/lib/intake";

export const Route = createFileRoute("/summary")({
  head: () => ({
    meta: [
      { title: "Visit summary — AEDNAV" },
      { name: "description", content: "Your structured pre-appointment visit summary." },
      { property: "og:title", content: "Visit summary — AEDNAV" },
      { property: "og:description", content: "A structured summary to bring to your appointment." },
    ],
  }),
  component: SummaryPage,
});

const MOCK: IntakeAnswers = {
  concern: "Recurring headaches, mostly in the afternoon",
  duration: "About 3 days",
  severity: "6 out of 10 at the worst",
  pattern: "Worse in the afternoon, slightly relieved by rest and water",
  medications: "Ibuprofen 400mg as needed (twice in the past 3 days)",
  allergies: "None known",
  history: "Family history of migraine; no recent injuries",
  goal: "Understand what's likely causing this and a plan to manage it",
};

function SummaryPage() {
  const [answers, setAnswers] = useState<IntakeAnswers>(MOCK);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<IntakeAnswers>(MOCK);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("aednav.answers");
      if (stored) {
        const parsed = JSON.parse(stored) as IntakeAnswers;
        const merged = { ...MOCK, ...initialAnswers, ...parsed };
        for (const k of Object.keys(merged) as (keyof IntakeAnswers)[]) {
          if (!merged[k]) merged[k] = MOCK[k];
        }
        setAnswers(merged);
        setDraft(merged);
      }
    } catch {}
  }, []);

  const generatedAt = new Date().toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const summaryText = formatSummaryText(answers, generatedAt);

  function copy() {
    navigator.clipboard?.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadPdf() {
    window.print();
  }

  function startEdit() {
    setDraft(answers);
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(answers);
    setEditing(false);
  }

  function saveEdit() {
    setAnswers(draft);
    try {
      sessionStorage.setItem("aednav.answers", JSON.stringify(draft));
    } catch {}
    setEditing(false);
  }

  function updateField(field: keyof IntakeAnswers, value: string) {
    setDraft((d) => ({ ...d, [field]: value }));
  }

  return (
    <div className="min-h-screen bg-background print:bg-white">
      {/* Top bar */}
      <header className="border-b border-border bg-surface print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3">
          <Link to="/" aria-label="AEDNAV home" className="flex items-center">
            <Logo className="h-5 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            {!editing ? (
              <button onClick={startEdit} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>
                Edit summary
              </button>
            ) : (
              <>
                <button onClick={cancelEdit} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated">
                  Cancel
                </button>
                <button onClick={saveEdit} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
                  Save changes
                </button>
              </>
            )}
            <button onClick={copy} disabled={editing} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated disabled:opacity-40">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              {copied ? "Copied" : "Copy"}
            </button>
            <button onClick={downloadPdf} disabled={editing} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print / Save as PDF
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 print:px-0 print:py-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-surface shadow-elevated print:rounded-none print:border-0 print:shadow-none"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-6 border-b border-border px-8 py-7 md:px-12 md:py-9">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Pre-appointment summary</p>
              <h1 className="font-display mt-2 text-3xl text-foreground md:text-4xl">Visit summary</h1>
              <p className="mt-2 text-sm text-muted-foreground">Generated {generatedAt}</p>
            </div>
            <Logo className="h-6 w-auto print:h-5" />
          </div>

          {/* Body */}
          <div className="space-y-10 px-8 py-9 md:px-12 md:py-12">
            <Section title="Main concern">
              <Editable
                editing={editing}
                value={editing ? draft.concern : answers.concern}
                onChange={(v) => updateField("concern", v)}
                multiline
              />
            </Section>

            <Section title="Symptom timeline">
              <div className="space-y-3">
                <Field label="Duration" value={editing ? draft.duration : answers.duration} editing={editing} onChange={(v) => updateField("duration", v)} />
                <Field label="Severity" value={editing ? draft.severity : answers.severity} editing={editing} onChange={(v) => updateField("severity", v)} />
                <Field label="Pattern & triggers" value={editing ? draft.pattern : answers.pattern} editing={editing} onChange={(v) => updateField("pattern", v)} />
              </div>
            </Section>

            <Section title="Medications & allergies">
              <div className="space-y-3">
                <Field label="Current medications" value={editing ? draft.medications : answers.medications} editing={editing} onChange={(v) => updateField("medications", v)} />
                <Field label="Known allergies" value={editing ? draft.allergies : answers.allergies} editing={editing} onChange={(v) => updateField("allergies", v)} />
              </div>
            </Section>

            <Section title="Relevant history">
              <Editable
                editing={editing}
                value={editing ? draft.history : answers.history}
                onChange={(v) => updateField("history", v)}
                multiline
              />
            </Section>

            <Section title="Questions to ask your provider">
              <ul className="space-y-2.5">
                {[
                  `What might be causing my ${shortConcern(answers.concern)}?`,
                  "Are there tests or assessments that would help clarify this?",
                  "What can I do at home in the meantime?",
                  "When should I follow up — and what warning signs would mean I should come back sooner?",
                ].map((q, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {q}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Appointment preparation checklist">
              <ul className="space-y-2.5">
                {[
                  "Bring a list of your current medications and dosages",
                  "Note when symptoms started and how they've changed",
                  "Write down any questions you don't want to forget",
                  "Bring your ID, insurance card, and a notebook",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] text-foreground">
                    <span className="grid h-5 w-5 place-items-center rounded border border-border text-muted-foreground">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Suggested care setting">
              <div className="rounded-2xl border border-border bg-surface-elevated p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5z"/></svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">Family doctor (non-urgent)</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Based on what you described, a routine visit with your primary care provider
                      is a reasonable starting point. Consider booking when you're able, and contact
                      a clinician sooner if symptoms change or worsen.
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-2 text-xs sm:grid-cols-4">
                  <CareOption label="Family doctor" active />
                  <CareOption label="Walk-in clinic" />
                  <CareOption label="Urgent care" />
                  <CareOption label="Emergency room" />
                </div>
                <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                  Informational guidance only, not a medical recommendation. If symptoms worsen,
                  become severe, or you feel unsafe, seek care right away.
                </p>
              </div>
            </Section>

            <Section title="What you hope to walk away with">
              <Editable
                editing={editing}
                value={editing ? draft.goal : answers.goal}
                onChange={(v) => updateField("goal", v)}
                multiline
              />
            </Section>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-8 py-5 md:px-12">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Disclaimer.</span> This summary was
              prepared by AEDNAV based on what you described. AEDNAV is not a diagnostic tool and
              does not replace consultation with a licensed healthcare provider. In an emergency,
              call your local emergency number.
            </p>
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center print:hidden">
          <Link to="/intake" className="text-sm text-muted-foreground hover:text-foreground">
            ← Start a new intake
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[180px_1fr]">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-[15px] leading-relaxed text-foreground">{value}</span>
    </div>
  );
}

function CareOption({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center transition-colors ${
        active
          ? "border-primary/40 bg-primary text-primary-foreground"
          : "border-border bg-surface text-muted-foreground"
      }`}
    >
      {label}
    </div>
  );
}

function shortConcern(c: string) {
  return c.toLowerCase().replace(/^i('| ha)?ve had?\s+/, "").split(/[,.]/)[0].slice(0, 50) || "symptoms";
}

function formatSummaryText(a: IntakeAnswers, date: string) {
  return `AEDNAV — Visit Summary
Generated ${date}

MAIN CONCERN
${a.concern}

SYMPTOM TIMELINE
Duration: ${a.duration}
Severity: ${a.severity}
Pattern & triggers: ${a.pattern}

MEDICATIONS & ALLERGIES
Current medications: ${a.medications}
Known allergies: ${a.allergies}

RELEVANT HISTORY
${a.history}

GOAL FOR APPOINTMENT
${a.goal}

— Prepared by AEDNAV. Not a diagnostic tool.`;
}
