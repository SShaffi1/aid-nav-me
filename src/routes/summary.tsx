import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/SiteChrome";
import { initialAnswers, recommendCare, type CareSetting, type IntakeAnswers } from "@/lib/intake";

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
  const [loading, setLoading] = useState(true);

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
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
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
  function downloadPdf() { window.print(); }
  function startEdit() { setDraft(answers); setEditing(true); }
  function cancelEdit() { setDraft(answers); setEditing(false); }
  function saveEdit() {
    setAnswers(draft);
    try { sessionStorage.setItem("aednav.answers", JSON.stringify(draft)); } catch {}
    setEditing(false);
  }
  function updateField(field: keyof IntakeAnswers, value: string) {
    setDraft((d) => ({ ...d, [field]: value }));
  }

  return (
    <div className="min-h-screen bg-background print:bg-white">
      {/* Top bar */}
      <header className="border-b border-border bg-surface print:hidden">
        <div className="mx-auto max-w-4xl px-4 py-2.5 md:px-5">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" aria-label="AEDNAV home" className="flex items-center">
              <Logo className="h-6 md:h-7" />
            </Link>
            <div className="hidden items-center gap-2 sm:flex">
              <ActionButtons
                editing={editing}
                copied={copied}
                onStartEdit={startEdit}
                onCancel={cancelEdit}
                onSave={saveEdit}
                onCopy={copy}
                onPdf={downloadPdf}
              />
            </div>
          </div>
          {/* Mobile action row stacked */}
          <div className="mt-2.5 flex flex-wrap gap-2 sm:hidden">
            <ActionButtons
              editing={editing}
              copied={copied}
              onStartEdit={startEdit}
              onCancel={cancelEdit}
              onSave={saveEdit}
              onCopy={copy}
              onPdf={downloadPdf}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 md:px-5 md:py-10 print:px-0 print:py-0">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-border bg-surface p-10 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: d }}
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Organizing your visit summary…</p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-border bg-surface shadow-soft print:rounded-none print:border-0 print:shadow-none"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-6 md:px-12 md:py-9">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-primary">Pre-appointment summary</p>
                  <h1 className="font-display mt-2 text-3xl text-foreground md:text-4xl">Visit summary</h1>
                  <p className="mt-2 text-sm text-muted-foreground">Generated {generatedAt}</p>
                </div>
                <Logo className="h-6 print:h-5" />
              </div>

              {/* Body */}
              <div className="space-y-9 px-6 py-7 md:space-y-10 md:px-12 md:py-10">
                {/* Key details — quick-skim block */}
                <RevealSection delay={0} title="Key details">
                  <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated">
                    <KeyRow label="Main concern" value={answers.concern} />
                    <KeyRow label="Started" value={answers.duration} />
                    <KeyRow label="Severity" value={answers.severity} />
                    <KeyRow label="Pattern" value={answers.pattern} />
                    <KeyRow label="Current medications" value={answers.medications} />
                    <KeyRow label="Allergies" value={answers.allergies} last />
                  </div>
                </RevealSection>

                <RevealSection delay={0.05} title="Main concern">
                  <Editable
                    editing={editing}
                    value={editing ? draft.concern : answers.concern}
                    onChange={(v) => updateField("concern", v)}
                    multiline
                  />
                </RevealSection>

                <RevealSection delay={0.1} title="Symptom timeline">
                  <div className="space-y-3">
                    <Field label="Duration" value={editing ? draft.duration : answers.duration} editing={editing} onChange={(v) => updateField("duration", v)} />
                    <Field label="Severity" value={editing ? draft.severity : answers.severity} editing={editing} onChange={(v) => updateField("severity", v)} />
                    <Field label="Pattern & triggers" value={editing ? draft.pattern : answers.pattern} editing={editing} onChange={(v) => updateField("pattern", v)} />
                  </div>
                </RevealSection>

                <RevealSection delay={0.15} title="Medications & allergies">
                  <div className="space-y-3">
                    <Field label="Current medications" value={editing ? draft.medications : answers.medications} editing={editing} onChange={(v) => updateField("medications", v)} />
                    <Field label="Known allergies" value={editing ? draft.allergies : answers.allergies} editing={editing} onChange={(v) => updateField("allergies", v)} />
                  </div>
                </RevealSection>

                <RevealSection delay={0.2} title="Relevant history">
                  <Editable
                    editing={editing}
                    value={editing ? draft.history : answers.history}
                    onChange={(v) => updateField("history", v)}
                    multiline
                  />
                </RevealSection>

                <RevealSection delay={0.25} title="Questions to ask your provider">
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
                </RevealSection>

                <RevealSection delay={0.3} title="Care option to consider">
                  <p className="-mt-1 mb-4 text-xs leading-relaxed text-muted-foreground">
                    Informational guidance only. AEDNAV cannot determine the right care setting for you.
                  </p>
                  <CareOptionsBlock recommendation={recommendCare(answers)} />
                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                    For non-urgent concerns, many people start by contacting a family doctor,
                    walk-in clinic, or primary care provider. If symptoms become severe, sudden,
                    worsening, or concerning, seek urgent care or emergency support.
                  </p>
                </RevealSection>

                <RevealSection delay={0.35} title="What you hope to walk away with">
                  <Editable
                    editing={editing}
                    value={editing ? draft.goal : answers.goal}
                    onChange={(v) => updateField("goal", v)}
                    multiline
                  />
                </RevealSection>
              </div>

              {/* Footer */}
              <div className="border-t border-border px-6 py-5 md:px-12">
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Disclaimer.</span> This summary was
                  prepared by AEDNAV based on what you described. AEDNAV is not a diagnostic tool and
                  does not replace consultation with a licensed healthcare provider. In an emergency,
                  call your local emergency number.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center print:hidden">
          <Link to="/intake" className="text-sm text-muted-foreground hover:text-foreground">
            ← Start a new intake
          </Link>
        </div>
      </main>
    </div>
  );
}

function ActionButtons({
  editing, copied, onStartEdit, onCancel, onSave, onCopy, onPdf,
}: {
  editing: boolean; copied: boolean;
  onStartEdit: () => void; onCancel: () => void; onSave: () => void;
  onCopy: () => void; onPdf: () => void;
}) {
  const btn = "inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:bg-surface-elevated active:scale-[0.98]";
  const primary = "inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-40";
  return (
    <>
      {!editing ? (
        <button onClick={onStartEdit} className={btn}>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Edit summary
        </button>
      ) : (
        <>
          <button onClick={onCancel} className={btn}>Cancel</button>
          <button onClick={onSave} className={primary}>Save changes</button>
        </>
      )}
      <button onClick={onCopy} disabled={editing} className={`${btn} disabled:opacity-40`}>
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        {copied ? "Copied" : "Copy"}
      </button>
      <button onClick={onPdf} disabled={editing} className={primary}>
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print / PDF
      </button>
    </>
  );
}

function RevealSection({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </motion.section>
  );
}

function KeyRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr] sm:items-baseline ${last ? "" : "border-b border-border"}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-[14.5px] leading-relaxed text-foreground">{value}</span>
    </div>
  );
}

function Field({
  label, value, editing, onChange,
}: { label: string; value: string; editing?: boolean; onChange?: (v: string) => void; }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[180px_1fr] sm:items-start">
      <span className="pt-1.5 text-sm text-muted-foreground">{label}</span>
      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-[15px] leading-relaxed text-foreground transition-all duration-150 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
        />
      ) : (
        <span className="text-[15px] leading-relaxed text-foreground">{value}</span>
      )}
    </div>
  );
}

function Editable({
  editing, value, onChange, multiline,
}: { editing: boolean; value: string; onChange: (v: string) => void; multiline?: boolean; }) {
  if (!editing) return <p className="text-[15px] leading-relaxed text-foreground">{value}</p>;
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-[15px] leading-relaxed text-foreground transition-all duration-150 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
      />
    );
  }
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-[15px] leading-relaxed text-foreground transition-all duration-150 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
    />
  );
}

const CARE_OPTIONS: { setting: CareSetting; description: string }[] = [
  { setting: "Family Doctor", description: "Non-urgent or ongoing concerns" },
  { setting: "Walk-in Clinic", description: "Minor issues, no family doctor available soon" },
  { setting: "Urgent Care", description: "Time-sensitive, not life-threatening" },
  { setting: "Emergency Room", description: "Severe, sudden, or red-flag symptoms" },
];

function CareOptionsBlock({
  recommendation,
}: {
  recommendation: { setting: CareSetting; reason: string; isEmergency: boolean };
}) {
  return (
    <div className="space-y-4">
      <div
        className={`rounded-2xl border p-4 ${
          recommendation.isEmergency
            ? "border-destructive/40 bg-destructive/5"
            : "border-border bg-surface-elevated"
        }`}
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Why this option?
        </p>
        <p className="mt-1.5 text-sm font-semibold text-foreground">
          Based on your answers, this may be a care option to consider: {recommendation.setting}.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {recommendation.reason}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {CARE_OPTIONS.map((opt) => {
          const active = opt.setting === recommendation.setting;
          return (
            <motion.div
              key={opt.setting}
              animate={
                active
                  ? { y: -2, boxShadow: "0 6px 20px -8px oklch(0.18 0.03 250 / 0.12)" }
                  : { y: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-lg border px-3.5 py-3 text-left transition-colors duration-200 ${
                active
                  ? recommendation.isEmergency
                    ? "border-destructive/50 bg-destructive/10"
                    : "border-foreground/30 bg-surface"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{opt.setting}</span>
                {active && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                      recommendation.isEmergency
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-foreground text-background"
                    }`}
                  >
                    Highlighted
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {opt.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function shortConcern(c: string) {
  return c.toLowerCase().replace(/^i('| ha)?ve had?\s+/, "").split(/[,.]/)[0].slice(0, 50) || "symptoms";
}

function formatSummaryText(a: IntakeAnswers, date: string) {
  return `AEDNAV — Visit Summary
Generated ${date}

KEY DETAILS
Main concern: ${a.concern}
Started: ${a.duration}
Severity: ${a.severity}
Pattern: ${a.pattern}
Current medications: ${a.medications}
Allergies: ${a.allergies}

RELEVANT HISTORY
${a.history}

GOAL FOR APPOINTMENT
${a.goal}

— Prepared by AEDNAV. Not a diagnostic tool.`;
}
