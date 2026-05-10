import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/SiteChrome";
import {
  intakeSteps,
  initialAnswers,
  detectEmergency,
  type IntakeAnswers,
} from "@/lib/intake";

export const Route = createFileRoute("/intake")({
  head: () => ({
    meta: [
      { title: "Start intake — AEDNAV" },
      {
        name: "description",
        content:
          "A guided, conversational intake to help you organize symptoms before your appointment.",
      },
      { property: "og:title", content: "Start intake — AEDNAV" },
      {
        property: "og:description",
        content: "A guided conversational intake before your healthcare appointment.",
      },
    ],
  }),
  component: IntakePage,
});

type Message =
  | { id: string; role: "ai"; text: string; typing?: boolean }
  | { id: string; role: "user"; text: string };

function IntakePage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<IntakeAnswers>(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [aiThinking, setAiThinking] = useState(false);
  const [emergency, setEmergency] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Bootstrap first AI message
  useEffect(() => {
    setAiThinking(true);
    const t = setTimeout(() => {
      setAiThinking(false);
      setMessages([
        { id: "ai-0", role: "ai", text: intakeSteps[0].prompt(initialAnswers) },
      ]);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, aiThinking]);

  const currentStep = intakeSteps[stepIndex];
  const progress = Math.round((stepIndex / intakeSteps.length) * 100);
  const isLast = stepIndex >= intakeSteps.length;

  function submit(value?: string) {
    const text = (value ?? input).trim();
    if (!text || aiThinking || isLast) return;

    const emergencyReason = detectEmergency(text);

    // user message
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }]);
    setInput("");

    // store answer
    const field = currentStep.field;
    const updated = { ...answers, [field]: text };
    setAnswers(updated);

    if (emergencyReason) {
      setEmergency(emergencyReason);
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setMessages((m) => [
          ...m,
          {
            id: `ai-em-${Date.now()}`,
            role: "ai",
            text:
              "Some of what you described may need urgent attention. Please consider reaching out to emergency services or going to the nearest emergency room. I'll wait while you make sure you're safe.",
          },
        ]);
      }, 600);
      return;
    }

    const next = stepIndex + 1;
    setStepIndex(next);

    if (next < intakeSteps.length) {
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setMessages((m) => [
          ...m,
          { id: `ai-${next}`, role: "ai", text: intakeSteps[next].prompt(updated) },
        ]);
      }, 850 + Math.random() * 400);
    } else {
      // finished
      setAiThinking(true);
      setTimeout(() => {
        setAiThinking(false);
        setMessages((m) => [
          ...m,
          {
            id: "ai-final",
            role: "ai",
            text:
              "Thank you. I've organized everything into a visit summary you can review, share, or bring to your appointment.",
          },
        ]);
        sessionStorage.setItem("aednav.answers", JSON.stringify(updated));
        setTimeout(() => navigate({ to: "/summary" }), 1400);
      }, 900);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <Link to="/" aria-label="AEDNAV home" className="flex items-center">
            <Logo className="h-5 w-auto" />
          </Link>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-xs text-muted-foreground">
              {Math.min(stepIndex, intakeSteps.length)} of {intakeSteps.length}
            </span>
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            Exit
          </Link>
        </div>
        {/* Disclaimer banner */}
        <div className="border-t border-border bg-warning/10">
          <div className="mx-auto max-w-3xl px-5 py-2 text-center text-[11.5px] text-warning-foreground">
            AEDNAV does not provide medical diagnoses or emergency medical services.
          </div>
        </div>
      </header>

      {/* Emergency banner */}
      <AnimatePresence>
        {emergency && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-b border-destructive/30 bg-destructive/10"
          >
            <div className="mx-auto max-w-3xl px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-destructive text-destructive-foreground">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    This may need urgent attention: {emergency.toLowerCase()}.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    AEDNAV is not designed for emergencies. Please contact emergency services or
                    go to your nearest emergency department right away.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="tel:911" className="rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground">Call 911</a>
                    <a href="tel:988" className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground">Call or text 988</a>
                  </div>
                </div>
                <button
                  onClick={() => setEmergency(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                  aria-label="Dismiss"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl space-y-5 px-5 py-10">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </AnimatePresence>
          {aiThinking && <TypingIndicator />}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-5 py-4">
          {!isLast && currentStep?.suggestions && messages.length > 0 && !aiThinking && (
            <div className="mb-3 flex flex-wrap gap-2">
              {currentStep.suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-surface-elevated"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2 shadow-soft focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              disabled={isLast}
              placeholder={isLast ? "Generating your summary..." : currentStep?.placeholder ?? "Type a message..."}
              className="max-h-40 min-h-[2.25rem] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => submit()}
              disabled={!input.trim() || aiThinking || isLast}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
              aria-label="Send"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Press Enter to send. Shift+Enter for a new line.
          </p>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground/80">
            Demo privacy note: Your responses are stored only in this browser session and are not
            sent to a medical provider.
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isAi = message.role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${isAi ? "" : "flex-row-reverse"}`}
    >
      {isAi && (
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary">
          <svg className="h-3.5 w-3.5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18"/></svg>
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${
          isAi
            ? "bg-surface-elevated text-foreground border border-border rounded-bl-md"
            : "bg-primary text-primary-foreground rounded-br-md"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-2.5"
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
