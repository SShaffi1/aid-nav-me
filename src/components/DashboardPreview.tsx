import { motion } from "framer-motion";

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-20 max-w-5xl"
    >
      {/* glow */}
      <div className="absolute -inset-x-20 -top-10 -bottom-10 -z-10 bg-radial-fade" />

      <div className="relative rounded-2xl border border-border bg-surface shadow-elevated">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.05_30)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.88_0.07_85)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.08_150)]" />
          <span className="ml-3 text-[11px] text-muted-foreground">aednav.app / intake</span>
        </div>

        <div className="grid gap-0 md:grid-cols-[1fr_320px]">
          {/* chat */}
          <div className="space-y-4 p-6 md:p-8">
            <ChatBubble role="ai">
              Hi — I'm here to help you get ready for your appointment. What's been on your mind?
            </ChatBubble>
            <ChatBubble role="user">
              I've had a dull headache for three days, mostly in the afternoon.
            </ChatBubble>
            <ChatBubble role="ai">
              Thanks for sharing. On a scale of 1–10, how would you describe the intensity at its worst?
            </ChatBubble>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-1.5 pl-1 text-muted-foreground"
            >
              <Dot delay={0} />
              <Dot delay={0.15} />
              <Dot delay={0.3} />
            </motion.div>
          </div>

          {/* side */}
          <div className="border-t border-border bg-surface-elevated p-6 md:border-l md:border-t-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Visit summary
            </p>
            <div className="mt-4 space-y-3">
              <SummaryRow label="Concern" value="Recurring headache" />
              <SummaryRow label="Duration" value="3 days" />
              <SummaryRow label="Pattern" value="Afternoons" />
              <SummaryRow label="Severity" value="Pending" muted />
              <SummaryRow label="Medications" value="Pending" muted />
            </div>

            <div className="mt-6 rounded-xl border border-border bg-surface p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Suggested setting
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">Family doctor</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Non-urgent. Schedule within the week.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* floating cards */}
      <FloatingCard
        className="absolute -left-6 top-32 hidden md:block"
        delay={0.6}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-success/15 grid place-items-center">
            <svg className="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Intake progress</p>
            <p className="text-sm font-semibold text-foreground">4 of 7 questions</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard
        className="absolute -right-6 bottom-24 hidden md:block"
        delay={0.8}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary-soft grid place-items-center">
            <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Ready in</p>
            <p className="text-sm font-semibold text-foreground">~2 minutes</p>
          </div>
        </div>
      </FloatingCard>
    </motion.div>
  );
}

function ChatBubble({ role, children }: { role: "ai" | "user"; children: React.ReactNode }) {
  const isAi = role === "ai";
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: isAi ? 0.5 : 0.9 }}
      className={`flex ${isAi ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
          isAi
            ? "bg-surface-elevated text-foreground border border-border"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.2, repeat: Infinity, delay }}
      className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
    />
  );
}

function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[13px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "text-muted-foreground/60 italic" : "font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}

function FloatingCard({
  className = "",
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-panel rounded-xl px-4 py-3 shadow-elevated ${className}`}
    >
      {children}
    </motion.div>
  );
}
