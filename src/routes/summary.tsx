import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "@/components/SiteChrome";
import { initialAnswers, recommendCare, type CareSetting, type IntakeAnswers } from "@/lib/intake";
import { getStoredLang, getLangConfig, t as translate, type LangCode } from "@/lib/i18n";

export const Route = createFileRoute("/summary")({
  head: () => ({
    meta: [
      { title: "Visit summary — AEDNAV" },
      { name: "description", content: "A patient summary in your language and a doctor-ready English summary." },
      { property: "og:title", content: "Visit summary — AEDNAV" },
      { property: "og:description", content: "Dual-language pre-appointment visit summary." },
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

type Tab = "patient" | "provider";

function SummaryPage() {
  const [lang, setLang] = useState<LangCode>("en");
  const [answers, setAnswers] = useState<IntakeAnswers>(MOCK);
  const [draft, setDraft] = useState<IntakeAnswers>(MOCK);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("patient");
  const [copied, setCopied] = useState<string | null>(null);
  const isEnglish = lang === "en";

  useEffect(() => {
    setLang(getStoredLang());
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
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const tr = useMemo(() => translate(lang), [lang]);
  const dir = getLangConfig(lang).direction;
  const generatedAt = new Date().toLocaleDateString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const generatedAtEn = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const recommendation = recommendCare(answers);
  const patientText = formatPatientText(answers, generatedAt, tr, lang);
  const providerText = formatProviderText(answers, generatedAtEn, recommendation);

  function copyOne(which: "patient" | "provider" | "both") {
    const text =
      which === "patient" ? patientText :
      which === "provider" ? providerText :
      `${patientText}\n\n— — —\n\n${providerText}`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(which);
      setTimeout(() => setCopied(null), 1800);
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
        <div className="mx-auto max-w-5xl px-4 py-2.5 md:px-5">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" aria-label="AEDNAV home" className="flex items-center">
              <Logo className="h-6 md:h-7" />
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {getLangConfig(lang).native} → English
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ActionButton onClick={startEdit} hidden={editing} icon="edit">Edit summary</ActionButton>
            {editing && (
              <>
                <ActionButton onClick={cancelEdit}>Cancel</ActionButton>
                <ActionButton primary onClick={saveEdit}>Save changes</ActionButton>
              </>
            )}
            {isEnglish ? (
              <>
                <ActionButton disabled={editing} onClick={() => copyOne("provider")} icon="copy">
                  {copied === "provider" ? "Copied" : "Copy summary"}
                </ActionButton>
                <ActionButton primary disabled={editing} onClick={downloadPdf} icon="print">
                  Print / Save as PDF
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton disabled={editing} onClick={() => copyOne("patient")} icon="copy">
                  {copied === "patient" ? "Copied" : "Copy patient"}
                </ActionButton>
                <ActionButton disabled={editing} onClick={() => copyOne("provider")} icon="copy">
                  {copied === "provider" ? "Copied" : "Copy provider"}
                </ActionButton>
                <ActionButton disabled={editing} onClick={() => copyOne("both")} icon="copy">
                  {copied === "both" ? "Copied" : "Copy both"}
                </ActionButton>
                <ActionButton primary disabled={editing} onClick={downloadPdf} icon="print">
                  Print / Save as PDF
                </ActionButton>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-5 md:py-10 print:px-0 print:py-0">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="rounded-2xl border border-border bg-surface p-10 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[0, 0.15, 0.3].map((d) => (
                    <motion.span key={d}
                      animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: d }}
                      className="h-1.5 w-1.5 rounded-full bg-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Preparing your summaries…</p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tabs (hidden for English: single unified view) */}
              {!isEnglish && (
                <div className="print:hidden flex w-full items-center gap-1 rounded-full border border-border bg-surface p-1 sm:w-fit">
                  <TabButton active={tab === "patient"} onClick={() => setTab("patient")}>
                    Patient summary
                  </TabButton>
                  <TabButton active={tab === "provider"} onClick={() => setTab("provider")}>
                    Provider summary
                  </TabButton>
                </div>
              )}

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground print:hidden">
                {tr.patientSummary.disclaimer}
              </p>

              {/* Cards */}
              <div className="mt-5 print:mt-0">
                {isEnglish ? (
                  <ProviderCard
                    answers={editing ? draft : answers}
                    editing={editing}
                    onChange={updateField}
                    generatedAt={generatedAtEn}
                    recommendation={recommendation}
                  />
                ) : (
                  <>
                    <div className={tab === "patient" ? "" : "hidden print:block"}>
                      <PatientCard
                        answers={editing ? draft : answers}
                        editing={editing}
                        onChange={updateField}
                        tr={tr}
                        dir={dir}
                        generatedAt={generatedAt}
                        lang={lang}
                      />
                    </div>
                    <div className={tab === "provider" ? "mt-0" : "hidden print:block print:mt-8"}>
                      <ProviderCard
                        answers={editing ? draft : answers}
                        editing={editing}
                        onChange={updateField}
                        generatedAt={generatedAtEn}
                        recommendation={recommendation}
                      />
                    </div>
                  </>
                )}
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

/* ---------- Tab + buttons ---------- */

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-full px-4 py-2 text-xs font-medium transition-colors duration-150 sm:flex-none ${
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ActionButton({
  children, onClick, primary, disabled, hidden, icon,
}: {
  children: React.ReactNode; onClick?: () => void;
  primary?: boolean; disabled?: boolean; hidden?: boolean;
  icon?: "edit" | "copy" | "print";
}) {
  if (hidden) return null;
  const cls = primary
    ? "inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-40"
    : "inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-150 hover:bg-surface-elevated active:scale-[0.98] disabled:opacity-40";
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {icon === "edit" && <Icon path="M12 20h9 M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z" />}
      {icon === "copy" && <Icon path="M9 9h13v13H9z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />}
      {icon === "print" && <Icon path="M6 9V2h12v7 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v8H6z" />}
      {children}
    </button>
  );
}

function Icon({ path }: { path: string }) {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

/* ---------- Patient card (selected language) ---------- */

function PatientCard({
  answers, editing, onChange, tr, dir, generatedAt, lang,
}: {
  answers: IntakeAnswers; editing: boolean;
  onChange: (f: keyof IntakeAnswers, v: string) => void;
  tr: ReturnType<typeof translate>; dir: "ltr" | "rtl";
  generatedAt: string; lang: LangCode;
}) {
  return (
    <div
      dir={dir}
      className="rounded-2xl border border-border bg-surface shadow-soft print:rounded-none print:border-0 print:shadow-none"
    >
      <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-6 md:px-10 md:py-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
            {tr.patientSummary.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-2xl text-foreground md:text-3xl">{tr.patientSummary.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {tr.patientSummary.generated} {generatedAt} · {getLangConfig(lang).native}
          </p>
        </div>
        <Logo className="h-6 print:h-5" />
      </div>

      <div className="space-y-8 px-6 py-7 md:space-y-9 md:px-10 md:py-9">
        <Section title={tr.patientSummary.sections.keyDetails}>
          <div className="overflow-hidden rounded-xl border border-border bg-surface-elevated">
            <KeyRow label={tr.patientSummary.keyDetailLabels.concern} value={answers.concern} />
            <KeyRow label={tr.patientSummary.keyDetailLabels.duration} value={answers.duration} />
            <KeyRow label={tr.patientSummary.keyDetailLabels.severity} value={answers.severity} />
            <KeyRow label={tr.patientSummary.keyDetailLabels.pattern} value={answers.pattern} />
            <KeyRow label={tr.patientSummary.keyDetailLabels.medications} value={answers.medications} />
            <KeyRow label={tr.patientSummary.keyDetailLabels.allergies} value={answers.allergies} last />
          </div>
        </Section>

        <Section title={tr.patientSummary.sections.mainConcern}>
          <Editable editing={editing} value={answers.concern} onChange={(v) => onChange("concern", v)} multiline />
        </Section>

        <Section title={tr.patientSummary.sections.timeline}>
          <div className="space-y-3">
            <Field label={tr.fieldLabels.duration} value={answers.duration} editing={editing} onChange={(v) => onChange("duration", v)} />
            <Field label={tr.fieldLabels.severity} value={answers.severity} editing={editing} onChange={(v) => onChange("severity", v)} />
            <Field label={tr.fieldLabels.pattern} value={answers.pattern} editing={editing} onChange={(v) => onChange("pattern", v)} />
          </div>
        </Section>

        <Section title={tr.patientSummary.sections.meds}>
          <div className="space-y-3">
            <Field label={tr.fieldLabels.medications} value={answers.medications} editing={editing} onChange={(v) => onChange("medications", v)} />
            <Field label={tr.fieldLabels.allergies} value={answers.allergies} editing={editing} onChange={(v) => onChange("allergies", v)} />
          </div>
        </Section>

        <Section title={tr.patientSummary.sections.history}>
          <Editable editing={editing} value={answers.history} onChange={(v) => onChange("history", v)} multiline />
        </Section>

        <Section title={tr.patientSummary.sections.questions}>
          <ul className="space-y-2.5">
            {tr.patientSummary.questions(shortConcern(answers.concern)).map((q, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {q}
              </li>
            ))}
          </ul>
        </Section>

        <Section title={tr.patientSummary.sections.goal}>
          <Editable editing={editing} value={answers.goal} onChange={(v) => onChange("goal", v)} multiline />
        </Section>
      </div>

      <div className="border-t border-border px-6 py-5 md:px-10">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          {tr.patientSummary.disclaimer}
        </p>
      </div>
    </div>
  );
}

/* ---------- Provider card (English, structured) ---------- */

const CARE_OPTIONS: { setting: CareSetting; description: string }[] = [
  { setting: "Family Doctor",   description: "Non-urgent or ongoing concerns" },
  { setting: "Walk-in Clinic",  description: "Minor issues, no family doctor available soon" },
  { setting: "Urgent Care",     description: "Time-sensitive, not life-threatening" },
  { setting: "Emergency Room",  description: "Severe, sudden, or red-flag symptoms" },
];

function ProviderCard({
  answers, editing, onChange, generatedAt, recommendation,
}: {
  answers: IntakeAnswers; editing: boolean;
  onChange: (f: keyof IntakeAnswers, v: string) => void;
  generatedAt: string;
  recommendation: { setting: CareSetting; reason: string; isEmergency: boolean };
}) {
  return (
    <div
      dir="ltr"
      className="rounded-2xl border border-border bg-surface shadow-soft print:rounded-none print:border-0 print:shadow-none"
    >
      <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-6 md:px-10 md:py-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
            Provider summary · English
          </p>
          <h2 className="font-display mt-2 text-2xl text-foreground md:text-3xl">Pre-appointment briefing</h2>
          <p className="mt-2 text-sm text-muted-foreground">Generated {generatedAt}</p>
        </div>
        <Logo className="h-6 print:h-5" />
      </div>

      <div className="space-y-8 px-6 py-7 md:space-y-9 md:px-10 md:py-9">
        <Section title="Main concern">
          <Editable editing={editing} value={answers.concern} onChange={(v) => onChange("concern", v)} multiline />
        </Section>

        <Section title="Timeline & severity">
          <div className="space-y-3">
            <Field label="Duration" value={answers.duration} editing={editing} onChange={(v) => onChange("duration", v)} />
            <Field label="Severity (self-reported)" value={answers.severity} editing={editing} onChange={(v) => onChange("severity", v)} />
            <Field label="Pattern & triggers" value={answers.pattern} editing={editing} onChange={(v) => onChange("pattern", v)} />
          </div>
        </Section>

        <Section title="Medications & allergies">
          <div className="space-y-3">
            <Field label="Current medications" value={answers.medications} editing={editing} onChange={(v) => onChange("medications", v)} />
            <Field label="Known allergies" value={answers.allergies} editing={editing} onChange={(v) => onChange("allergies", v)} />
          </div>
        </Section>

        <Section title="Relevant history">
          <Editable editing={editing} value={answers.history} onChange={(v) => onChange("history", v)} multiline />
        </Section>

        <Section title="Questions raised by patient">
          <ul className="space-y-2.5">
            {[
              `What might be causing the ${shortConcern(answers.concern)}?`,
              "Are there tests or assessments that would help clarify this?",
              "What can be done at home in the meantime?",
              "When should the patient follow up, and what warning signs warrant earlier review?",
            ].map((q, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {q}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Patient goal for visit">
          <Editable editing={editing} value={answers.goal} onChange={(v) => onChange("goal", v)} multiline />
        </Section>

        <Section title="Care option to consider">
          <p className="-mt-1 mb-4 text-xs leading-relaxed text-muted-foreground">
            Informational guidance only. AEDNAV cannot determine the right care setting for the patient.
          </p>
          <div className="space-y-4">
            <div
              className={`rounded-2xl border p-4 ${
                recommendation.isEmergency
                  ? "border-destructive/40 bg-destructive/5"
                  : "border-border bg-surface-elevated"
              }`}
            >
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Why this option?</p>
              <p className="mt-1.5 text-sm font-semibold text-foreground">
                Based on the answers, this may be a care option to consider: {recommendation.setting}.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {recommendation.reason}
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {CARE_OPTIONS.map((opt) => {
                const active = opt.setting === recommendation.setting;
                return (
                  <div
                    key={opt.setting}
                    className={`rounded-lg border px-3.5 py-3 transition-colors duration-200 ${
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
                        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                          recommendation.isEmergency
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-foreground text-background"
                        }`}>
                          Highlighted
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{opt.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </div>

      <div className="border-t border-border px-6 py-5 md:px-10">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Disclaimer.</span> This summary is for
          preparation and communication support only. It may contain errors and does not replace
          professional medical interpretation, medical advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  );
}

/* ---------- Shared primitives ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function KeyRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`grid gap-1 px-4 py-3 sm:grid-cols-[200px_1fr] sm:items-baseline ${last ? "" : "border-b border-border"}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-[14.5px] leading-relaxed text-foreground">{value}</span>
    </div>
  );
}

function Field({
  label, value, editing, onChange,
}: { label: string; value: string; editing?: boolean; onChange?: (v: string) => void; }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[200px_1fr] sm:items-start">
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

function shortConcern(c: string) {
  return c.toLowerCase().replace(/^i('| ha)?ve had?\s+/, "").split(/[,.]/)[0].slice(0, 50) || "symptoms";
}

/* ---------- Plain text formatters ---------- */

function formatPatientText(a: IntakeAnswers, date: string, tr: ReturnType<typeof translate>, lang: LangCode) {
  const L = tr.patientSummary;
  return `AEDNAV — ${L.title}
${L.generated} ${date} · ${getLangConfig(lang).native}

${L.sections.keyDetails.toUpperCase()}
${L.keyDetailLabels.concern}: ${a.concern}
${L.keyDetailLabels.duration}: ${a.duration}
${L.keyDetailLabels.severity}: ${a.severity}
${L.keyDetailLabels.pattern}: ${a.pattern}
${L.keyDetailLabels.medications}: ${a.medications}
${L.keyDetailLabels.allergies}: ${a.allergies}

${L.sections.history.toUpperCase()}
${a.history}

${L.sections.goal.toUpperCase()}
${a.goal}

— ${L.disclaimer}`;
}

function formatProviderText(
  a: IntakeAnswers, date: string,
  rec: { setting: CareSetting; reason: string; isEmergency: boolean },
) {
  return `AEDNAV — Provider Summary (English)
Generated ${date}

MAIN CONCERN
${a.concern}

TIMELINE & SEVERITY
Duration: ${a.duration}
Severity (self-reported): ${a.severity}
Pattern & triggers: ${a.pattern}

MEDICATIONS & ALLERGIES
Current medications: ${a.medications}
Known allergies: ${a.allergies}

RELEVANT HISTORY
${a.history}

PATIENT GOAL FOR VISIT
${a.goal}

CARE OPTION TO CONSIDER (informational guidance only)
${rec.setting} — ${rec.reason}

— Prepared by AEDNAV. For preparation and communication support only. Not medical advice.`;
}
