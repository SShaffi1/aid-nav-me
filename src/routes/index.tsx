import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { LanguageGate, useLang } from "@/components/LanguageGate";
import { useIsMobile } from "@/hooks/use-mobile";
import { landing } from "@/lib/landing-i18n";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

/* --------------------------------------------------------------- helpers */

const SPRING = { stiffness: 90, damping: 22, mass: 0.6 } as const;
const BOUNCY = { stiffness: 160, damping: 14, mass: 0.7 } as const;

function h(base: number, mobile: boolean) {
  return `${mobile ? Math.round(base * 0.65) : base}vh`;
}

/** Scroll-mapped value with optional spring smoothing. */
function useV(
  p: MotionValue<number>,
  input: number[],
  output: number[],
  still: number,
  reduced: boolean,
  bouncy = false,
) {
  const raw = useTransform(p, input, output);
  const flat = useTransform(p, [0, 1], [still, still]);
  const smooth = useSpring(raw, bouncy ? BOUNCY : SPRING);
  return reduced ? flat : smooth;
}

function Scene({
  refEl,
  height,
  bg,
  children,
  reduced,
}: {
  refEl: React.RefObject<HTMLDivElement | null>;
  height: string;
  bg?: string | MotionValue<string>;
  children: ReactNode;
  reduced: boolean;
}) {
  if (reduced) {
    return (
      <section className="px-6 py-24" style={{ backgroundColor: (bg as string) ?? "var(--background)" }}>
        <div className="mx-auto max-w-5xl">{children}</div>
      </section>
    );
  }
  return (
    <section ref={refEl} className="relative m-0 p-0" style={{ height }}>
      <motion.div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: bg ?? "var(--background)" }}
      >
        <div className="flex h-full items-center justify-center px-6">
          <div className="w-full max-w-5xl">{children}</div>
        </div>
      </motion.div>
    </section>
  );
}


/* ------------------------------------------------------------------ page */

function LandingPage() {
  const lang = useLang();
  const lc = landing(lang);
  const mobile = useIsMobile();
  const reduced = !!useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      <LanguageGate />
      <SiteHeader />

      <SceneHero reduced={reduced} mobile={mobile} />
      <SceneProblem reduced={reduced} mobile={mobile} />
      <SceneConversation reduced={reduced} mobile={mobile} />
      <SceneLanguages reduced={reduced} mobile={mobile} />
      <SceneSummaries reduced={reduced} mobile={mobile} />
      <SceneFeatures reduced={reduced} mobile={mobile} />
      <SceneAudience reduced={reduced} mobile={mobile} />
      <SceneTrust reduced={reduced} mobile={mobile} />
      <SceneCta reduced={reduced} mobile={mobile} />

      <section id="faq" className="mx-auto mt-24 max-w-3xl px-6 scroll-mt-24">
        <h2 className="font-display text-center text-4xl leading-tight text-foreground md:text-5xl">
          Common questions
        </h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {lc.faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </div>
      </section>

      <div className="mt-24">
        <SiteFooter />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- scene 1 */

function SceneHero({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useV(scrollYProgress, [0.5, 0.85], [1, 1.05], 1, reduced);
  const opacity = useV(scrollYProgress, [0.5, 0.85], [1, 0], 1, reduced);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <Scene refEl={ref} height={h(300, mobile)} reduced={reduced}>
      <motion.div style={{ opacity, scale }} className="mx-auto max-w-3xl text-center">
        <motion.p
          {...rise(0)}
          className="text-sm font-medium"
          style={{ color: "var(--primary)" }}
        >
          Pre-appointment intake
        </motion.p>
        <motion.h1
          {...rise(0.08)}
          className="font-display mt-4 text-balance text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl md:leading-[1.02]"
        >
          Walk into your appointment
          <br />
          ready for anything.
        </motion.h1>
        <motion.p
          {...rise(0.18)}
          className="text-balance mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          AEDNAV guides you through your symptoms before you see a doctor, so you remember
          what to say, nothing gets missed, and your doctor gets a clear picture fast.
        </motion.p>
        <motion.div
          {...rise(0.28)}
          className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <Link
            to="/intake"
            className="inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: "var(--primary)", minHeight: 44 }}
          >
            Prepare for my appointment
          </Link>
          <a
            href="#faq"
            className="inline-flex w-full items-center justify-center rounded-full border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-surface sm:w-auto"
            style={{ borderColor: "var(--border)", minHeight: 44 }}
          >
            See how it works
          </a>
        </motion.div>
        <motion.p {...rise(0.36)} className="mt-7 text-xs text-muted-foreground">
          Not a diagnostic tool. Always consult a healthcare professional.
        </motion.p>
      </motion.div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 2 */

const PROBLEM_LINES = [
  "You forget half of what you wanted to say.",
  "You leave out details that mattered.",
  "You walk out wondering if they got the full picture.",
];

function SceneProblem({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const bg = useTransform(scrollYProgress, [0.85, 1], ["#1C1C1E", "#FFFFFF"]);

  const aOpacity = useV(scrollYProgress, [0, 0.12, 0.24, 0.32], [0, 1, 1, 0], 1, reduced);
  const aY = useV(scrollYProgress, [0, 0.18], [40, 0], 0, reduced, true);
  const aSub = useV(scrollYProgress, [0.1, 0.22, 0.26, 0.32], [0, 1, 1, 0], 1, reduced);

  const l0 = useV(scrollYProgress, [0.28, 0.38, 0.5, 0.56], [0, 1, 1, 0], 1, reduced);
  const l0x = useV(scrollYProgress, [0.28, 0.4], [-60, 0], 0, reduced, true);
  const l1 = useV(scrollYProgress, [0.34, 0.44, 0.5, 0.57], [0, 1, 1, 0], 1, reduced);
  const l1x = useV(scrollYProgress, [0.34, 0.46], [-60, 0], 0, reduced, true);
  const l2 = useV(scrollYProgress, [0.4, 0.5, 0.5, 0.58], [0, 1, 1, 0], 1, reduced);
  const l2x = useV(scrollYProgress, [0.4, 0.52], [-60, 0], 0, reduced, true);

  const cOpacity = useV(scrollYProgress, [0.56, 0.68, 0.86, 0.95], [0, 1, 1, 0], 1, reduced);
  const cScale = useV(scrollYProgress, [0.56, 0.72], [0.88, 1], 1, reduced, true);
  const cSub = useV(scrollYProgress, [0.66, 0.76, 0.86, 0.95], [0, 1, 1, 0], 1, reduced);

  const ops = [l0, l1, l2];
  const xs = [l0x, l1x, l2x];

  if (reduced) {
    return (
      <section className="px-6 py-24" style={{ backgroundColor: "#1C1C1E" }}>
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h2 className="font-display text-4xl" style={{ color: "#FFFFFF" }}>
            You know something's wrong.
          </h2>
          <p className="text-lg" style={{ color: "#FFFFFFB3" }}>
            But when the doctor asks, the words don't come out right.
          </p>
          {PROBLEM_LINES.map((t) => (
            <p key={t} className="text-xl" style={{ color: "#FFFFFF" }}>
              {t}
            </p>
          ))}
          <h3 className="font-display text-3xl" style={{ color: "#FFFFFF" }}>
            Most appointments start underprepared.
          </h3>
          <p style={{ color: "#FFFFFFB3" }}>AEDNAV changes that.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: h(400, mobile) }}>
      <motion.div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: bg }}>
        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <motion.div style={{ opacity: aOpacity, y: aY }} className="absolute max-w-3xl">
            <h2
              className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl"
              style={{ color: "#FFFFFF" }}
            >
              You know something's wrong.
            </h2>
            <motion.p
              style={{ opacity: aSub }}
              className="mt-6 text-lg"
              // eslint-disable-next-line
            >
              <span style={{ color: "#FFFFFFB3" }}>
                But when the doctor asks, the words don't come out right.
              </span>
            </motion.p>
          </motion.div>

          <div className="absolute w-full max-w-2xl space-y-6 text-left">
            {PROBLEM_LINES.map((t, i) => (
              <motion.p
                key={t}
                style={{ opacity: ops[i], x: xs[i], color: "#FFFFFF" }}
                className="text-xl leading-snug sm:text-2xl md:text-3xl"
              >
                {t}
              </motion.p>
            ))}
          </div>

          <motion.div style={{ opacity: cOpacity, scale: cScale }} className="absolute max-w-3xl">
            <h3
              className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl"
              style={{ color: "#FFFFFF" }}
            >
              Most appointments start underprepared.
            </h3>
            <motion.p style={{ opacity: cSub }} className="mt-6 text-lg">
              <span style={{ color: "#FFFFFFB3" }}>AEDNAV changes that.</span>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------- scene 3 */

type Bubble = { from: "ai" | "user"; text: string; at: number };

const BUBBLES: Bubble[] = [
  { from: "ai", text: "What's been on your mind before this appointment?", at: 0.28 },
  { from: "user", text: "I've had headaches for 3 days. Worse in the afternoons.", at: 0.4 },
  { from: "ai", text: "How severe would you rate the pain, 1 to 10?", at: 0.52 },
  { from: "user", text: "About a 6. Painkillers aren't really helping.", at: 0.63 },
];

function SceneConversation({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useV(scrollYProgress, [0, 0.12, 0.78, 0.92], [0, 1, 1, 0], 1, reduced);
  const headY = useV(scrollYProgress, [0, 0.14], [24, 0], 0, reduced, true);
  const subOpacity = useV(scrollYProgress, [0.08, 0.2, 0.78, 0.92], [0, 1, 1, 0], 1, reduced);

  const phoneScale = useV(scrollYProgress, [0.05, 0.35, 0.78, 1], [0.72, 1, 1, 0.85], 1, reduced, true);
  const phoneOpacity = useV(scrollYProgress, [0.02, 0.15, 0.8, 1], [0, 1, 1, 0], 1, reduced);

  const b0 = useV(scrollYProgress, [0.28, 0.36], [0, 1], 1, reduced);
  const b0x = useV(scrollYProgress, [0.28, 0.38], [-40, 0], 0, reduced, true);
  const b1 = useV(scrollYProgress, [0.4, 0.48], [0, 1], 1, reduced);
  const b1x = useV(scrollYProgress, [0.4, 0.5], [40, 0], 0, reduced, true);
  const b2 = useV(scrollYProgress, [0.52, 0.6], [0, 1], 1, reduced);
  const b2x = useV(scrollYProgress, [0.52, 0.62], [-40, 0], 0, reduced, true);
  const b3 = useV(scrollYProgress, [0.63, 0.71], [0, 1], 1, reduced);
  const b3x = useV(scrollYProgress, [0.63, 0.73], [40, 0], 0, reduced, true);

  const typing = useV(scrollYProgress, [0.2, 0.24, 0.28, 0.3], [0, 1, 1, 0], 0, reduced);

  const ops = [b0, b1, b2, b3];
  const xs = [b0x, b1x, b2x, b3x];

  return (
    <Scene refEl={ref} height={h(400, mobile)} reduced={reduced}>
      <div className="flex flex-col items-center gap-8 text-center">
        <div>
          <motion.h2
            style={{ opacity: headOpacity, y: headY }}
            className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl"
          >
            It starts with a conversation.
          </motion.h2>
          <motion.p style={{ opacity: subOpacity }} className="mt-4 text-base text-muted-foreground">
            8 guided questions. Plain language. Takes about 3 minutes.
          </motion.p>
        </div>

        <motion.div
          style={{
            scale: phoneScale,
            opacity: phoneOpacity,
            width: mobile ? 230 : 280,
            height: mobile ? 400 : 500,
            borderRadius: 36,
            borderWidth: 2,
            borderColor: "var(--border)",
          }}
          className="bg-card p-4 shadow-soft"
        >
          <div className="mx-auto mb-3 h-1.5 w-14 rounded-full" style={{ backgroundColor: "var(--border)" }} />
          <div className="flex h-[calc(100%-2rem)] flex-col gap-2.5 overflow-hidden text-left">
            {BUBBLES.map((b, i) => (
              <motion.div
                key={b.text}
                style={{
                  opacity: ops[i],
                  x: xs[i],
                  backgroundColor: b.from === "ai" ? "var(--surface)" : "var(--primary)",
                }}
                className={`max-w-[88%] px-3.5 py-2.5 text-[13px] leading-snug ${
                  b.from === "ai"
                    ? "self-start rounded-[18px] rounded-tl-[4px] text-foreground"
                    : "self-end rounded-[18px] rounded-tr-[4px] text-primary-foreground"
                }`}
              >
                {b.text}
              </motion.div>
            ))}
            <motion.div
              style={{ opacity: typing, backgroundColor: "var(--surface)" }}
              className="flex max-w-[60px] items-center gap-1 self-start rounded-[18px] rounded-tl-[4px] px-3 py-3"
              aria-hidden="true"
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground pulse"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 4 */

const PILLS = [
  { text: "Headache", x: -32, y: -24, rtl: false },
  { text: "Dolor de cabeza", x: 30, y: -18, rtl: false },
  { text: "صداع", x: -28, y: 22, rtl: true },
  { text: "头痛", x: 32, y: 26, rtl: false },
  { text: "ਸਿਰ ਦਰਦ", x: -8, y: -34, rtl: false },
  { text: "سر درد", x: 10, y: 34, rtl: true },
  { text: "Mal de tête", x: 36, y: 4, rtl: false },
];

function SceneLanguages({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useV(scrollYProgress, [0, 0.12, 0.83, 0.95], [0, 1, 1, 0], 1, reduced);
  const headY = useV(scrollYProgress, [0, 0.14], [28, 0], 0, reduced, true);
  const subOpacity = useV(scrollYProgress, [0.08, 0.2, 0.5, 0.6], [0, 1, 1, 0], 1, reduced);

  const spread = useV(scrollYProgress, [0.1, 0.45, 0.55, 0.72], [0, 1, 1, 0], 1, reduced, true);
  const pillScale = useV(scrollYProgress, [0.1, 0.3, 0.55, 0.72], [0.4, 1, 1, 0.2], 1, reduced, true);
  const pillOpacity = useV(scrollYProgress, [0.1, 0.28, 0.58, 0.72], [0, 1, 1, 0], 1, reduced);

  const finalOpacity = useV(scrollYProgress, [0.68, 0.78, 0.9, 1], [0, 1, 1, 0], 1, reduced);
  const finalScale = useV(scrollYProgress, [0.68, 0.8], [0.8, 1], 1, reduced, true);
  const finalSub = useV(scrollYProgress, [0.74, 0.84, 0.9, 1], [0, 1, 1, 0], 1, reduced);

  const pills = mobile ? PILLS.slice(0, 4) : PILLS;

  return (
    <Scene refEl={ref} height={h(400, mobile)} reduced={reduced}>
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <motion.h2
          style={{ opacity: headOpacity, y: headY }}
          className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl"
        >
          And it works in any language.
        </motion.h2>
        <motion.p
          style={{ opacity: subOpacity }}
          className="mx-auto mt-4 max-w-xl text-base text-muted-foreground"
        >
          Because struggling with English shouldn't mean struggling to explain your health.
        </motion.p>

        <div className="relative mt-10 h-[42vh] w-full">
          {pills.map((p) => (
            <LanguagePill
              key={p.text}
              pill={p}
              spread={spread}
              scale={pillScale}
              opacity={pillOpacity}
              mobile={mobile}
            />
          ))}

          <motion.div
            style={{ opacity: finalOpacity, scale: finalScale }}
            className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <p
              className="mx-auto rounded-full border bg-card px-6 py-3.5 text-base font-medium text-foreground sm:text-lg"
              style={{ borderColor: "var(--border)" }}
            >
              I've had a headache for 3 days, worse in the afternoon.
            </p>
            <motion.p style={{ opacity: finalSub }} className="mt-5 text-sm text-muted-foreground">
              AEDNAV understands it, and translates it for your doctor.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Scene>
  );
}

function LanguagePill({
  pill,
  spread,
  scale,
  opacity,
  mobile,
}: {
  pill: (typeof PILLS)[number];
  spread: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  mobile: boolean;
}) {
  const f = mobile ? 0.6 : 1;
  const x = useTransform(spread, [0, 1], ["0vw", `${pill.x * f}vw`]);
  const y = useTransform(spread, [0, 1], ["0vh", `${pill.y * f * 0.5}vh`]);
  return (
    <motion.div
      style={{ x, y, scale, opacity, backgroundColor: "var(--surface)" }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 text-sm font-medium text-foreground md:text-base"
    >
      <span dir={pill.rtl ? "rtl" : "ltr"} className="inline-block">
        {pill.text}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------- scene 5 */

const PATIENT_FIELDS = [
  "Main concern: Recurring headaches, 3 days",
  "Severity: 6 out of 10",
  "Medications tried: Over-the-counter painkillers",
  "Your question for the doctor: Could this be stress-related?",
];

const PROVIDER_FIELDS = [
  "Chief complaint: Recurring headaches x 3 days, afternoon onset",
  "Self-reported severity: 6/10",
  "Current medications: OTC analgesics (ineffective)",
  "Patient goal: Understand potential cause",
];

function SceneSummaries({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useV(scrollYProgress, [0, 0.12, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const headY = useV(scrollYProgress, [0, 0.14], [28, 0], 0, reduced, true);
  const subOpacity = useV(scrollYProgress, [0.08, 0.2, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);

  const leftX = useV(scrollYProgress, [0.15, 0.42], [-100, 0], 0, reduced, true);
  const leftOpacity = useV(scrollYProgress, [0.15, 0.32, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const rightX = useV(scrollYProgress, [0.25, 0.52], [100, 0], 0, reduced, true);
  const rightOpacity = useV(scrollYProgress, [0.25, 0.42, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);

  const arrowScale = useV(scrollYProgress, [0.35, 0.4, 0.46], [1, 1.3, 1], 1, reduced, true);
  const arrowOpacity = useV(scrollYProgress, [0.3, 0.42, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const noteOpacity = useV(scrollYProgress, [0.4, 0.55, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);

  return (
    <Scene refEl={ref} height={h(400, mobile)} reduced={reduced}>
      <div className="text-center">
        <motion.h2
          style={{ opacity: headOpacity, y: headY }}
          className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl"
        >
          Then you get this.
        </motion.h2>
        <motion.p style={{ opacity: subOpacity }} className="mt-4 text-base text-muted-foreground">
          One intake. Two summaries. Built for both sides of the appointment.
        </motion.p>

        <div className="mt-10 grid items-stretch gap-5 text-left md:grid-cols-[1fr_auto_1fr]">
          <motion.div
            style={{ x: leftX, opacity: leftOpacity, borderColor: "var(--border)" }}
            className="rounded-2xl border bg-card p-6 sm:p-8"
          >
            <p className="text-xs font-medium text-muted-foreground">Your summary</p>
            <p className="mt-1 text-lg font-semibold text-foreground">Ready for your appointment</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
              {PATIENT_FIELDS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p
              className="mt-5 inline-block rounded-full px-3 py-1.5 text-xs font-medium"
              style={{ backgroundColor: "color-mix(in oklab, #30D158 18%, transparent)", color: "#1f8f45" }}
            >
              Suggested next step: Family doctor
            </p>
          </motion.div>

          <motion.div
            style={{ scale: arrowScale, opacity: arrowOpacity }}
            className="mx-auto grid h-10 w-10 place-items-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 rotate-90 md:rotate-0"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </motion.div>

          <motion.div
            style={{ x: rightX, opacity: rightOpacity, backgroundColor: "var(--surface)" }}
            className="rounded-2xl p-6 sm:p-8"
          >
            <p className="text-xs font-medium text-muted-foreground">Provider summary</p>
            <p className="mt-1 text-lg font-semibold text-foreground">Doctor-ready English</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
              {PROVIDER_FIELDS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p style={{ opacity: noteOpacity }} className="mt-8 text-sm text-muted-foreground">
          Available in 7 languages. Always in English for your doctor.
        </motion.p>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 6 */

const FEATURES = [
  {
    icon: "✦",
    title: "Guided symptom intake",
    body: "8 questions that surface the details your doctor needs: duration, severity, patterns, medications, and more.",
  },
  {
    icon: "🌐",
    title: "7 languages supported",
    body: "English, French, Spanish, Mandarin, Punjabi, Urdu, Arabic. Answer in whatever feels natural.",
  },
  {
    icon: "📋",
    title: "Dual-language summaries",
    body: "A patient summary in your language. A clinical English summary for your provider. Generated instantly.",
  },
  {
    icon: "🔒",
    title: "Private by design",
    body: "No account required. No data sold. Your answers stay yours.",
  },
];

function SceneFeatures({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useV(scrollYProgress, [0, 0.14, 0.75, 0.92], [0, 1, 1, 0], 1, reduced);
  const headScale = useV(scrollYProgress, [0, 0.2], [0.92, 1], 1, reduced, true);

  const f0 = useV(scrollYProgress, [0.18, 0.34, 0.75, 0.9], [0, 1, 1, 0], 1, reduced);
  const f0y = useV(scrollYProgress, [0.18, 0.36], [70, 0], 0, reduced, true);
  const f1 = useV(scrollYProgress, [0.26, 0.42, 0.75, 0.92], [0, 1, 1, 0], 1, reduced);
  const f1y = useV(scrollYProgress, [0.26, 0.44], [70, 0], 0, reduced, true);
  const f2 = useV(scrollYProgress, [0.34, 0.5, 0.75, 0.94], [0, 1, 1, 0], 1, reduced);
  const f2y = useV(scrollYProgress, [0.34, 0.52], [70, 0], 0, reduced, true);
  const f3 = useV(scrollYProgress, [0.42, 0.58, 0.75, 0.96], [0, 1, 1, 0], 1, reduced);
  const f3y = useV(scrollYProgress, [0.42, 0.6], [70, 0], 0, reduced, true);

  const ops = [f0, f1, f2, f3];
  const ys = [f0y, f1y, f2y, f3y];
  const sceneBg = useTransform(scrollYProgress, [0.85, 1], ["#F2F2F7", "#FFFFFF"]);

  return (
    <Scene refEl={ref} height={h(350, mobile)} bg={reduced ? "var(--surface)" : sceneBg} reduced={reduced}>

      <div className="text-center">
        <motion.h2
          style={{ opacity: headOpacity, scale: headScale }}
          className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl"
        >
          Everything you need before you walk in.
        </motion.h2>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              style={{ opacity: ops[i], y: ys[i], borderColor: "var(--border)" }}
              className="rounded-2xl border bg-card p-6"
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-lg text-primary-foreground"
                style={{ backgroundColor: "var(--primary)" }}
                aria-hidden="true"
              >
                {f.icon}
              </div>
              <p className="mt-4 text-base font-semibold text-foreground">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 7 */

const AUDIENCE = [
  {
    title: "First-time patients",
    body: "New to the healthcare system and not sure what to expect? AEDNAV walks you through it.",
  },
  {
    title: "Newcomers to Canada",
    body: "Navigate a new healthcare system in your own language, with confidence.",
  },
  {
    title: "Patients with complex histories",
    body: "Multiple conditions, medications, allergies: organize it all in one place before your visit.",
  },
  {
    title: "Busy parents and caregivers",
    body: "Preparing for someone else's appointment? AEDNAV guides you through every detail.",
  },
];

function SceneAudience({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useV(scrollYProgress, [0, 0.14, 0.78, 0.92], [0, 1, 1, 0], 1, reduced);
  const headY = useV(scrollYProgress, [0, 0.16], [28, 0], 0, reduced, true);
  const subOpacity = useV(scrollYProgress, [0.1, 0.24, 0.78, 0.92], [0, 1, 1, 0], 1, reduced);

  const a0 = useV(scrollYProgress, [0.18, 0.34, 0.78, 0.9], [0, 1, 1, 0], 1, reduced);
  const a0y = useV(scrollYProgress, [0.18, 0.36], [60, 0], 0, reduced, true);
  const a1 = useV(scrollYProgress, [0.28, 0.44, 0.78, 0.92], [0, 1, 1, 0], 1, reduced);
  const a1y = useV(scrollYProgress, [0.28, 0.46], [60, 0], 0, reduced, true);
  const a2 = useV(scrollYProgress, [0.38, 0.54, 0.78, 0.94], [0, 1, 1, 0], 1, reduced);
  const a2y = useV(scrollYProgress, [0.38, 0.56], [60, 0], 0, reduced, true);
  const a3 = useV(scrollYProgress, [0.48, 0.64, 0.78, 0.96], [0, 1, 1, 0], 1, reduced);
  const a3y = useV(scrollYProgress, [0.48, 0.66], [60, 0], 0, reduced, true);

  const ops = [a0, a1, a2, a3];
  const ys = [a0y, a1y, a2y, a3y];

  return (
    <Scene refEl={ref} height={h(300, mobile)} reduced={reduced}>
      <div className="text-center">
        <motion.h2
          style={{ opacity: headOpacity, y: headY }}
          className="font-display text-3xl text-foreground sm:text-4xl md:text-5xl"
        >
          For anyone heading into a healthcare appointment.
        </motion.h2>
        <motion.p
          style={{ opacity: subOpacity }}
          className="mx-auto mt-4 max-w-xl text-base text-muted-foreground"
        >
          Not just for people with language barriers, for anyone who wants to walk in prepared.
        </motion.p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a, i) => (
            <motion.div
              key={a.title}
              style={{ opacity: ops[i], y: ys[i], backgroundColor: "var(--surface)" }}
              className="rounded-2xl p-6"
            >
              <p className="text-base font-semibold text-foreground">{a.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 8 */

const TRUST = [
  {
    title: "No data sold, ever.",
    body: "AEDNAV doesn't sell, share, or monetize your health information. Full stop.",
  },
  {
    title: "No account required for the demo.",
    body: "Experience the full intake right now: no email, no sign-up, no commitment.",
  },
  {
    title: "Designed for Canadian healthcare.",
    body: "Built with Canadian patients and healthcare privacy principles in mind.",
  },
];

function SceneTrust({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useV(scrollYProgress, [0, 0.14, 0.75, 0.92], [0, 1, 1, 0], 1, reduced);
  const headY = useV(scrollYProgress, [0, 0.16], [24, 0], 0, reduced, true);

  const t0 = useV(scrollYProgress, [0.2, 0.36, 0.75, 0.9], [0, 1, 1, 0], 1, reduced);
  const t0x = useV(scrollYProgress, [0.2, 0.38], [-80, 0], 0, reduced, true);
  const t1 = useV(scrollYProgress, [0.32, 0.48, 0.75, 0.92], [0, 1, 1, 0], 1, reduced);
  const t1x = useV(scrollYProgress, [0.32, 0.5], [-80, 0], 0, reduced, true);
  const t2 = useV(scrollYProgress, [0.44, 0.6, 0.75, 0.94], [0, 1, 1, 0], 1, reduced);
  const t2x = useV(scrollYProgress, [0.44, 0.62], [-80, 0], 0, reduced, true);

  const ops = [t0, t1, t2];
  const xs = [t0x, t1x, t2x];

  return (
    <Scene refEl={ref} height={h(250, mobile)} reduced={reduced}>
      <div className="mx-auto max-w-3xl">
        <motion.h2
          style={{ opacity: headOpacity, y: headY }}
          className="font-display text-center text-3xl text-foreground sm:text-4xl md:text-5xl"
        >
          Built around your privacy.
        </motion.h2>

        <div className="mt-10 space-y-6">
          {TRUST.map((t, i) => (
            <motion.div key={t.title} style={{ opacity: ops[i], x: xs[i] }} className="flex gap-4">
              <span
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: "#30D158" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">{t.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 9 */

function SceneCta({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const bg = useTransform(scrollYProgress, [0, 0.45], ["var(--background)", "#0A84FF"]);
  const opacity = useV(scrollYProgress, [0.2, 0.45], [0, 1], 1, reduced);
  const scale = useV(scrollYProgress, [0.2, 0.5], [0.8, 1], 1, reduced, true);

  const content = (
    <div className="mx-auto max-w-2xl text-center">
      <h2
        className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl"
        style={{ color: "#FFFFFF" }}
      >
        Ready to prepare for your next appointment?
      </h2>
      <p className="mt-5 text-base" style={{ color: "#FFFFFFCC" }}>
        Takes 3 minutes. Works in 7 languages. No sign-up needed.
      </p>
      <Link
        to="/intake"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-opacity hover:opacity-90 sm:w-auto"
        style={{ backgroundColor: "#FFFFFF", color: "#0A84FF", minHeight: 44 }}
      >
        Prepare now →
      </Link>
      <p className="mt-7 text-xs" style={{ color: "#FFFFFFB3" }}>
        Not a diagnostic tool. Always consult a healthcare professional.
      </p>
    </div>
  );

  if (reduced) {
    return (
      <section className="px-6 py-24" style={{ backgroundColor: "#0A84FF" }}>
        {content}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: h(200, mobile) }}>
      <motion.div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: bg }}>
        <div className="flex h-full items-center justify-center px-6">
          <motion.div style={{ opacity, scale }} className="w-full">
            {content}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------- faq */

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
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
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
