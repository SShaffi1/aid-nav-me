import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageGate";
import { ui } from "@/lib/ui-i18n";

export function DashboardPreview() {
  const lang = useLang();
  const d = ui(lang).dashboard;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-20 max-w-5xl"
    >
      <div className="absolute -inset-x-20 -top-10 -bottom-10 -z-10 bg-radial-fade" />

      <div className="relative rounded-2xl border border-border bg-surface shadow-soft">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.05_30)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.88_0.07_85)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.08_150)]" />
          <span className="ml-3 text-[11px] text-muted-foreground">{d.windowLabel}</span>
        </div>

        <div className="grid gap-0 md:grid-cols-[1fr_320px]">
          <div className="space-y-4 p-6 md:p-8">
            <ChatBubble role="ai">{d.chat1}</ChatBubble>
            <ChatBubble role="user">{d.chat2}</ChatBubble>
            <ChatBubble role="ai">{d.chat3}</ChatBubble>
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

          <div className="border-t border-border bg-surface-elevated p-6 md:border-l md:border-t-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {d.visitSummary}
            </p>
            <div className="mt-4 space-y-3">
              <SummaryRow label={d.labels.concern} value={d.concernValue} />
              <SummaryRow label={d.labels.duration} value={d.durationValue} />
              <SummaryRow label={d.labels.pattern} value={d.patternValue} />
              <SummaryRow label={d.labels.severity} value={d.pending} muted />
              <SummaryRow label={d.labels.medications} value={d.pending} muted />
            </div>

            <div className="mt-6 rounded-xl border border-border bg-surface p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {d.careOption}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{d.careValue}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {d.careNote}
              </p>
            </div>
          </div>
        </div>
      </div>
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
        dir="auto"
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
      <span className={muted ? "text-muted-foreground/60" : "font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}
