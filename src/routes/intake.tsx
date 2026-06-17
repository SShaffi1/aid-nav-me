import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/SiteChrome";
import { initialAnswers, detectEmergency, type IntakeAnswers } from "@/lib/intake";
import {
  LANGUAGES, STORAGE_LANG, getStoredLang, getLangConfig,
  t as translate, type LangCode, type IntakeFieldKey,
} from "@/lib/i18n";
import { ui } from "@/lib/ui-i18n";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/intake")({
  head: () => ({
    meta: [
      { title: "Start intake | AEDNAV" },
      {
        name: "description",
        content:
          "A guided, multilingual intake to help you organize symptoms before your appointment.",
      },
      { property: "og:title", content: "Start intake | AEDNAV" },
      {
        property: "og:description",
        content: "Multilingual pre-appointment intake. Generates a doctor-ready English summary.",
      },
    ],
  }),
  component: IntakePage,
});

const FIELD_ORDER: IntakeFieldKey[] = [
  "concern", "duration", "severity", "pattern",
  "medications", "allergies", "history", "goal",
];

type Phase = "language" | "intro" | "chat" | "review";

type AiMessageKind =
  | { kind: "prompt"; field: IntakeFieldKey }
  | { kind: "thankYou" }
  | { kind: "emergency" };

type Message =
  | ({ id: string; role: "ai" } & AiMessageKind)
  | { id: string; role: "user"; text: string };

function resolveAiText(
  msg: Extract<Message, { role: "ai" }>,
  tr: ReturnType<typeof translate>,
): string {
  switch (msg.kind) {
    case "prompt":
      return tr.prompts[msg.field];
    case "thankYou":
      return tr.thankYou;
    case "emergency":
      return tr.emergencyBanner.body;
  }
}


function IntakePage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [lang, setLang] = useState<LangCode>("en");
  const [langDialogOpen, setLangDialogOpen] = useState(false);

  // Always use the language already selected from the homepage gate or top-right
  // switcher. Never re-prompt for language at the start of intake.
  useEffect(() => {
    setLang(getStoredLang());
    setPhase("intro");
  }, []);

  // React to language changes made elsewhere (e.g. top-right switcher in another tab).
  useEffect(() => {
    function sync() { setLang(getStoredLang()); }
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  function openLangPicker() {
    setLangDialogOpen(true);
  }

  function chooseLang(code: LangCode) {
    setLang(code);
    sessionStorage.setItem(STORAGE_LANG, code);
    sessionStorage.setItem("aednav.langPicked", "1");
    window.dispatchEvent(new CustomEvent("aednav:lang-change", { detail: code }));
    setLangDialogOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <IntroScreen
            key="intro"
            lang={lang}
            onChangeLang={openLangPicker}
            onStart={() => setPhase("chat")}
          />
        )}
        {phase === "chat" && (
          <ChatScreen
            lang={lang}
            onChangeLang={openLangPicker}
            onComplete={() => setPhase("review")}
          />
        )}
        {phase === "review" && <ReviewScreen key="review" lang={lang} onChangeLang={openLangPicker} />}
      </AnimatePresence>

      <LanguageDialog
        open={langDialogOpen}
        current={lang}
        onPick={chooseLang}
        onOpenChange={setLangDialogOpen}
      />
    </div>
  );
}

/* ---------------- Language dialog ---------------- */

function LanguageDialog({
  open, current, onPick, onOpenChange,
}: {
  open: boolean;
  current: LangCode;
  onPick: (c: LangCode) => void;
  onOpenChange: (v: boolean) => void;
}) {
  const u = ui(current);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle dir="auto">{u.langGate.title}</DialogTitle>
          <DialogDescription dir="auto">{u.langGate.intakeSubtitle}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 sm:grid-cols-2">
          {LANGUAGES.map((l) => {
            const active = l.code === current;
            return (
              <button
                key={l.code}
                onClick={() => onPick(l.code)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-150 hover:bg-surface-elevated active:scale-[0.99] ${
                  active ? "border-primary/50 bg-primary-soft" : "border-border bg-surface"
                }`}
              >
                <span>
                  <span dir="auto" className="block text-sm font-medium text-foreground">{l.native}</span>
                  <span className="block text-[11px] text-muted-foreground">{l.label}</span>
                </span>
                {active && (
                  <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                )}
              </button>
            );
          })}
        </div>
        <p dir="auto" className="text-[11px] leading-relaxed text-muted-foreground">
          {u.langGate.demoNote}
        </p>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Language screen ---------------- */

function LanguageScreen({
  current, onPick,
}: { current: LangCode; onPick: (c: LangCode) => void }) {
  const u = ui(current);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen flex-col"
    >
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-2.5" dir="ltr">
          <Link to="/" aria-label="AEDNAV home" className="flex items-center">
            <Logo className="h-6 md:h-7" />
          </Link>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            {u.chrome.exit}
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl rounded-2xl border border-border bg-surface p-7 shadow-soft md:p-10"
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
            {u.chrome.stepLabel(1, 3)}
          </p>
          <h1 dir="auto" className="font-display mt-3 text-3xl leading-tight text-foreground md:text-4xl">
            {u.langGate.title}
          </h1>
          <p dir="auto" className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {u.langGate.intakeSubtitle}
          </p>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            {LANGUAGES.map((l) => {
              const active = l.code === current;
              return (
                <button
                  key={l.code}
                  onClick={() => onPick(l.code)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-150 hover:bg-surface-elevated active:scale-[0.99] ${
                    active ? "border-primary/50 bg-primary-soft" : "border-border bg-surface"
                  }`}
                >
                  <span>
                    <span dir="auto" className="block text-sm font-medium text-foreground">{l.native}</span>
                    <span className="block text-[11px] text-muted-foreground">{l.label}</span>
                  </span>
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              );
            })}
          </div>

          <p dir="auto" className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
            {u.langGate.demoNote}
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}

/* ---------------- Intro screen ---------------- */

function IntroScreen({
  lang, onStart, onChangeLang,
}: { lang: LangCode; onStart: () => void; onChangeLang: () => void }) {
  const tr = translate(lang);
  const u = ui(lang);
  const dir = getLangConfig(lang).direction;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen flex-col"
    >
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-2.5">
          <Link to="/" aria-label="AEDNAV home" className="flex items-center">
            <Logo className="h-6 md:h-7" />
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={onChangeLang}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {getLangConfig(lang).native} · {u.chrome.change}
            </button>
            <ExitButton lang={lang} />
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl rounded-2xl border border-border bg-surface p-7 shadow-soft md:p-10"
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
            {tr.intro.eyebrow}
          </p>
          <h1 className="font-display mt-3 text-3xl leading-tight text-foreground md:text-4xl">
            {tr.intro.title}
          </h1>

          <ul className="mt-7 space-y-5">
            {tr.intro.bullets.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: dir === "rtl" ? 6 : -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="flex gap-3 text-[15px] leading-relaxed text-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {t}
              </motion.li>
            ))}
          </ul>

          <button
            onClick={onStart}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
          >
            {tr.intro.cta}
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            {tr.intro.note}
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
}

/* ---------------- Chat screen ---------------- */

function ChatScreen({
  lang, onComplete, onChangeLang,
}: { lang: LangCode; onComplete: () => void; onChangeLang: () => void }) {
  const [tr, setTr] = useState(() => translate(lang));
  const [u, setU] = useState(() => ui(lang));

  useEffect(() => {
    setTr(translate(lang));
    setU(ui(lang));
  }, [lang]);

  const [answers, setAnswers] = useState<IntakeAnswers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [aiThinking, setAiThinking] = useState(false);
  const [emergency, setEmergency] = useState<string | null>(null);
  const [emergencyAcknowledged, setEmergencyAcknowledged] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setAiThinking(true);
    const timer = setTimeout(() => {
      setAiThinking(false);
      setMessages([{ id: "ai-0", role: "ai", kind: "prompt", field: FIELD_ORDER[0] }]);
    }, 700);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, aiThinking]);

  // Auto-resize textarea as user types, capped at 160px
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, 160);
    el.style.height = `${next}px`;
  }, [input]);

  const currentField = FIELD_ORDER[stepIndex];
  const progress = Math.round((stepIndex / FIELD_ORDER.length) * 100);
  const isLast = stepIndex >= FIELD_ORDER.length;
  const blocked = !!emergency && !emergencyAcknowledged;

  function submit(value?: string) {
    const text = (value ?? input).trim();
    if (!text || aiThinking || isLast || blocked) return;

    const emergencyReason = detectEmergency(text);

    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
    setInput("");

    const updated = { ...answers, [currentField]: text };
    setAnswers(updated);

    if (emergencyReason) {
      setEmergency(emergencyReason);
      setEmergencyAcknowledged(false);
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setMessages((m) => [
          ...m,
          { id: `ai-em-${Date.now()}`, role: "ai", kind: "emergency" },
        ]);
      }, 600);
      return;
    }



    advance(updated, stepIndex + 1);
  }

  function advance(updated: IntakeAnswers, next: number) {
    setStepIndex(next);
    if (next < FIELD_ORDER.length) {
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setMessages((m) => [
          ...m,
          { id: `ai-${next}`, role: "ai", kind: "prompt", field: FIELD_ORDER[next] },
        ]);
      }, 800 + Math.random() * 350);
    } else {
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setMessages((m) => [
          ...m,
          { id: "ai-final", role: "ai", kind: "thankYou" },
        ]);
        sessionStorage.setItem("aednav.answers", JSON.stringify(updated));
        setTimeout(() => onComplete(), 1100);
      }, 800);
    }
  }


  function acknowledgeAndContinue() {
    setEmergencyAcknowledged(true);
    advance(answers, stepIndex + 1);
    setTimeout(() => setEmergency(null), 3000);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  const suggestions = !isLast
    ? Array.from(new Set([
        ...(tr.suggestions[currentField] ?? []),
        ...(currentField === "concern" ? [] : tr.quickOptions ?? []),
      ]))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen flex-col"
    >
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto max-w-3xl px-5 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" aria-label="AEDNAV home" className="flex items-center">
              <Logo className="h-6 md:h-7" />
            </Link>
            <span className="text-xs text-muted-foreground">
              {u.chrome.progressOf(Math.min(stepIndex, FIELD_ORDER.length), FIELD_ORDER.length)}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onChangeLang}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {getLangConfig(lang).native} · {u.chrome.change}
              </button>
              <ExitButton lang={lang} />
            </div>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        <div className="border-t border-border bg-warning/10">
          <div className="mx-auto max-w-3xl px-5 py-2 text-center text-[11.5px] text-warning-foreground" dir="auto">
            {tr.emergencyBanner.disclaimer}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {emergency && (
          <motion.div
            role="alert" aria-live="assertive"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-destructive/30 bg-destructive/10"
          >
            <div className="mx-auto max-w-3xl px-5 py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-destructive text-destructive-foreground">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{tr.emergencyBanner.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{tr.emergencyBanner.body}</p>
                  {lang !== "en" && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground" dir="ltr">
                      <span className="font-medium text-foreground">English:</span>{" "}
                      This may need urgent attention. AEDNAV is not designed for emergencies, please contact emergency services or go to your nearest emergency department.
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="tel:911" className="rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground">{tr.emergencyBanner.call} 911</a>
                    <a href="tel:988" className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">{tr.emergencyBanner.call} 988</a>
                    <a href="sms:988" className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">{tr.emergencyBanner.text} 988</a>
                    {!emergencyAcknowledged && (
                      <button
                        onClick={acknowledgeAndContinue}
                        className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-elevated"
                      >
                        {tr.emergencyBanner.safe}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-5 px-5 py-8 md:py-10">
          <AnimatePresence initial={false}>
            {messages.map((m) => (<MessageBubble key={m.id} message={m} tr={tr} />))}
          </AnimatePresence>
          {aiThinking && <TypingIndicator />}
        </div>
      </div>

      <div className="border-t border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 py-3 md:px-5 md:py-4">
          {!isLast && suggestions.length > 0 && messages.length > 0 && !aiThinking && !blocked && (
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground transition-all duration-150 hover:bg-surface-elevated active:scale-[0.98]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2 shadow-soft transition-all duration-200 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              dir="auto"
              disabled={isLast || blocked}
              placeholder={
                blocked
                  ? tr.composer.blocked
                  : isLast
                  ? tr.composer.generating
                  : tr.placeholders[currentField] ?? tr.composer.placeholderFallback
              }
              className="max-h-[160px] min-h-[2.5rem] flex-1 resize-none overflow-y-auto bg-transparent px-3 py-2 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => submit()}
              disabled={!input.trim() || aiThinking || isLast || blocked}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-95 disabled:opacity-30"
              aria-label={tr.composer.sendAria}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground/80">
            {tr.composer.privacyNote}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MessageBubble({
  message,
  tr,
}: {
  message: Message;
  tr: ReturnType<typeof translate>;
}) {
  const isAi = message.role === "ai";
  const text = isAi ? resolveAiText(message, tr) : message.text;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${isAi ? "" : "flex-row-reverse"}`}
    >
      {isAi && (
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18"/></svg>
        </div>
      )}
      <div
        dir="auto"
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${
          isAi
            ? "rounded-bl-md border border-border bg-surface-elevated text-foreground"
            : "rounded-br-md bg-primary text-primary-foreground"
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
}


function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-end gap-2.5"
      aria-label="AEDNAV is typing"
    >
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary">
        <svg className="h-3.5 w-3.5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18"/></svg>
      </div>
      <div className="rounded-2xl rounded-bl-md border border-border bg-surface-elevated px-4 py-3">
        <div className="flex items-center gap-1">
          {[0, 0.15, 0.3].map((d) => (
            <motion.span
              key={d}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: d }}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Review screen ---------------- */

function ReviewScreen({ lang, onChangeLang }: { lang: LangCode; onChangeLang: () => void }) {
  const tr = translate(lang);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<IntakeAnswers>(initialAnswers);
  const [editing, setEditing] = useState<IntakeFieldKey | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("aednav.answers");
      if (stored) setAnswers(JSON.parse(stored));
    } catch {}
  }, []);

  function startEdit(f: IntakeFieldKey) { setDraft(answers[f]); setEditing(f); }
  function saveEdit() {
    if (!editing) return;
    const updated = { ...answers, [editing]: draft };
    setAnswers(updated);
    sessionStorage.setItem("aednav.answers", JSON.stringify(updated));
    setEditing(null);
  }
  function generate() {
    sessionStorage.setItem("aednav.answers", JSON.stringify(answers));
    navigate({ to: "/summary" });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen flex-col"
    >
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-2.5">
          <Link to="/" aria-label="AEDNAV home" className="flex items-center">
            <Logo className="h-6 md:h-7" />
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={onChangeLang} className="text-xs text-muted-foreground hover:text-foreground">
              {getLangConfig(lang).native} · {ui(lang).chrome.change}
            </button>
            <ExitButton lang={lang} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-primary">{tr.review.eyebrow}</p>
          <h1 className="font-display mt-3 text-3xl leading-tight text-foreground md:text-4xl">{tr.review.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{tr.review.body}</p>
        </motion.div>

        <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
          {FIELD_ORDER.map((field, i) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 + i * 0.04 }}
              className="grid gap-2 px-5 py-4 sm:grid-cols-[200px_1fr_auto] sm:items-start"
            >
              <span className="pt-1 text-[13px] text-muted-foreground">{tr.fieldLabels[field]}</span>
              {editing === field ? (
                <textarea
                  dir="auto"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={2}
                  className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-[14.5px] leading-relaxed text-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15"
                />
              ) : (
                <p className="text-[14.5px] leading-relaxed text-foreground">
                  {answers[field] || <span className="italic text-muted-foreground">{tr.review.notProvided}</span>}
                </p>
              )}
              <div className="flex gap-2 sm:justify-end">
                {editing === field ? (
                  <>
                    <button onClick={() => setEditing(null)} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-foreground hover:bg-surface-elevated">{tr.review.cancelEdit}</button>
                    <button onClick={saveEdit} className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">{tr.review.save}</button>
                  </>
                ) : (
                  <button onClick={() => startEdit(field)} className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-foreground hover:bg-surface-elevated">{tr.review.edit}</button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link to="/" className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated">
            {tr.review.cancel}
          </Link>
          <button
            onClick={generate}
            disabled={!!editing}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.99] disabled:opacity-40"
          >
            {tr.review.generate}
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
        </div>
      </main>
    </motion.div>
  );
}

/* ---------------- Exit confirmation ---------------- */

function ExitButton({ lang }: { lang: LangCode }) {
  const navigate = useNavigate();
  const u = ui(lang);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        {u.chrome.exit}
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle dir="auto">{u.chrome.exitConfirm.title}</AlertDialogTitle>
            <AlertDialogDescription dir="auto">
              {u.chrome.exitConfirm.body}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{u.chrome.exitConfirm.stay}</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate({ to: "/" })}>
              {u.chrome.exitConfirm.leave}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
