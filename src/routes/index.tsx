import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ReactNode, type RefObject } from "react";
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

/* --------------------------------------------------------------- tokens */

const PAGE = "var(--background)";
const SURFACE = "var(--surface)";
const DARK = "#1C1C1E";
const BLUE = "#0A84FF";

const SOFT = { stiffness: 70, damping: 26, mass: 0.7 } as const;
const SETTLE = { stiffness: 140, damping: 16, mass: 1.3 } as const;
const BOUNCY = { stiffness: 220, damping: 12, mass: 1 } as const;
const POP = { stiffness: 160, damping: 14, mass: 1.2 } as const;

function h(base: number, mobile: boolean) {
  return `${mobile ? Math.round(base * 0.6) : base}vh`;
}

/** Scroll-mapped value; flat (visible) when reduced motion is on. */
function useV(
  p: MotionValue<number>,
  input: number[],
  output: number[],
  still: number,
  reduced: boolean,
  spring: typeof SOFT | typeof SETTLE | typeof BOUNCY | typeof POP = SOFT,
) {
  const raw = useTransform(p, input, output);
  const smooth = useSpring(raw, spring);
  const flat = useMotionValue(still);
  return reduced ? flat : smooth;
}

function useProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return scrollYProgress;
}

/* --------------------------------------------------------------- shells */

function Scene({
  sceneRef,
  height,
  bg,
  children,
  reduced,
  overlay,
}: {
  sceneRef: RefObject<HTMLElement | null>;
  height: string;
  bg: string;
  children: ReactNode;
  reduced: boolean;
  /** optional cross-fade layer painted above the base background */
  overlay?: { color: string; opacity: MotionValue<number> };
}) {
  if (reduced) {
    return (
      <section
        ref={sceneRef as RefObject<HTMLElement>}
        style={{ backgroundColor: bg, margin: 0, padding: 0 }}
        className="w-full"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-24">{children}</div>
      </section>
    );
  }

  return (
    <section
      ref={sceneRef as RefObject<HTMLElement>}
      style={{ height, backgroundColor: bg, margin: 0, padding: 0 }}
      className="w-full"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: bg,
        }}
        className="flex items-center justify-center"
      >
        {overlay && (
          <motion.div
            aria-hidden
            style={{ backgroundColor: overlay.color, opacity: overlay.opacity }}
            className="pointer-events-none absolute inset-0"
          />
        )}
        <div className="relative z-10 w-full">{children}</div>
      </div>
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
    <div className="min-h-screen" style={{ backgroundColor: PAGE }}>
      <LanguageGate />
      <SiteHeader />

      <div style={{ display: "flex", flexDirection: "column", margin: 0, padding: 0 }}>
        <SceneHero reduced={reduced} mobile={mobile} />
        <SceneProblem reduced={reduced} mobile={mobile} />
        <SceneConversation reduced={reduced} mobile={mobile} />
        <SceneLanguages reduced={reduced} mobile={mobile} />
        <SceneSummaries reduced={reduced} mobile={mobile} />
        <SceneFeatures reduced={reduced} mobile={mobile} />
        <SceneAudience reduced={reduced} mobile={mobile} />
        <SceneRoadmap reduced={reduced} mobile={mobile} />
        <SceneMission reduced={reduced} mobile={mobile} />
        <SceneCta reduced={reduced} mobile={mobile} />
      </div>

      <section id="faq" className="mx-auto pt-24 max-w-3xl px-6 scroll-mt-24">
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
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);
  const scale = useV(p, [0.55, 0.9], [1, 1.04], 1, reduced);
  const opacity = useV(p, [0.55, 0.9], [1, 0], 1, reduced);

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <Scene sceneRef={ref} height={h(300, mobile)} bg={PAGE} reduced={reduced}>
      <motion.div style={{ scale, opacity }} className="mx-auto max-w-3xl px-6 text-center">
        <motion.span
          {...item(0)}
          className="inline-block rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
          style={{ backgroundColor: SURFACE }}
        >
          Pre-appointment intake · 3 minutes · 7 languages
        </motion.span>

        <motion.h1
          {...item(0.1)}
          dir="auto"
          className="mt-7 font-display text-5xl leading-[1.05] text-foreground md:text-7xl"
        >
          Walk into your appointment
          <br />
          <span style={{ color: BLUE }}>ready for anything.</span>
        </motion.h1>

        <motion.p
          {...item(0.22)}
          dir="auto"
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          AEDNAV guides you through your symptoms before you see a doctor, so you remember what to
          say, nothing gets missed, and your doctor gets a clear picture from the moment you walk in.
        </motion.p>

        <motion.div {...item(0.34)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/intake"
            className="inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: BLUE }}
          >
            Prepare for my appointment
          </Link>
          <a
            href="#faq"
            className="inline-flex w-full items-center justify-center rounded-full border border-border bg-surface-elevated px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
          >
            See how it works
          </a>
        </motion.div>

        <motion.p {...item(0.44)} className="mt-6 text-xs text-muted-foreground">
          Not a diagnostic tool. Always consult a healthcare professional.
        </motion.p>
      </motion.div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 2 */

function SceneProblem({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const aOp = useV(p, [0.02, 0.16, 0.32, 0.42], [0, 1, 1, 0], 1, reduced);
  const aY = useV(p, [0.02, 0.16], [30, 0], 0, reduced);
  const bOp = useV(p, [0.38, 0.48, 0.56, 0.66], [0, 1, 1, 0], 1, reduced);
  const cOp = useV(p, [0.62, 0.72, 0.82, 0.95], [0, 1, 1, 0], 1, reduced);
  const cScale = useV(p, [0.62, 0.74], [0.82, 1], 1, reduced, POP);
  const toWhite = useV(p, [0.88, 1], [0, 1], 0, reduced);

  const lines = [
    "You forget half of what you wanted to say.",
    "You leave out details that mattered.",
    "You walk out wondering if they got the full picture.",
  ];

  if (reduced) {
    return (
      <Scene sceneRef={ref} height={h(600, mobile)} bg={DARK} reduced>
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          <h2 className="font-display text-4xl text-white md:text-5xl">You know something is wrong.</h2>
          <p className="text-xl text-[#8E8E93]">But when the doctor asks, the words don't come out right.</p>
          <div className="space-y-3 text-left">
            {lines.map((l) => (
              <p key={l} className="text-2xl font-medium text-white">{l}</p>
            ))}
          </div>
          <h3 className="font-display text-4xl text-white md:text-5xl">Most appointments start underprepared.</h3>
          <p className="text-xl" style={{ color: BLUE }}>AEDNAV changes that, for everyone.</p>
        </div>
      </Scene>
    );
  }

  return (
    <Scene
      sceneRef={ref}
      height={h(600, mobile)}
      bg={DARK}
      reduced={reduced}
      overlay={{ color: PAGE, opacity: toWhite }}
    >
      <div className="relative mx-auto h-[70vh] w-full max-w-3xl px-6">
        {/* Act A */}
        <motion.div
          style={{ opacity: aOp, y: aY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h2 className="font-display text-5xl leading-tight text-white md:text-6xl">
            You know something is wrong.
          </h2>
          <p className="mt-6 max-w-md text-xl leading-relaxed text-[#8E8E93]">
            But when the doctor asks, the words don't come out right.
          </p>
        </motion.div>

        {/* Act B */}
        <motion.div style={{ opacity: bOp }} className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-lg space-y-6">
            {lines.map((line, i) => (
              <ActLine key={line} p={p} i={i} reduced={reduced} text={line} />
            ))}
          </div>
        </motion.div>

        {/* Act C */}
        <motion.div
          style={{ opacity: cOp, scale: cScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h3 className="font-display text-5xl leading-tight text-white md:text-6xl">
            Most appointments start underprepared.
          </h3>
          <p className="mt-6 text-xl" style={{ color: BLUE }}>
            AEDNAV changes that, for everyone.
          </p>
        </motion.div>
      </div>
    </Scene>
  );
}

function ActLine({
  p,
  i,
  text,
  reduced,
}: {
  p: MotionValue<number>;
  i: number;
  text: string;
  reduced: boolean;
}) {
  const start = 0.4 + i * 0.03;
  const x = useV(p, [start, start + 0.06], [-80, 0], 0, reduced, SETTLE);
  const o = useV(p, [start, start + 0.05], [0, 1], 1, reduced);
  return (
    <motion.p style={{ x, opacity: o }} className="text-2xl font-medium leading-snug text-white">
      {text}
    </motion.p>
  );
}

/* ------------------------------------------------------------- scene 3 */

function SceneConversation({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const headOp = useV(p, [0.02, 0.12, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const headY = useV(p, [0.02, 0.14], [30, 0], 0, reduced);
  const subOp = useV(p, [0.06, 0.18, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const phoneScale = useV(p, [0.04, 0.32, 0.8, 1], [0.82, 1, 1, 0.88], 1, reduced, POP);
  const phoneOp = useV(p, [0.04, 0.24, 0.86, 1], [0, 1, 1, 0], 1, reduced);
  const dotsOp = useV(p, [0.38, 0.4, 0.42, 0.44], [0, 1, 1, 0], 0, reduced);

  const w = mobile ? 230 : 290;
  const ht = mobile ? 400 : 520;

  return (
    <Scene sceneRef={ref} height={h(600, mobile)} bg={PAGE} reduced={reduced}>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.h2
          style={{ opacity: headOp, y: headY }}
          className="font-display text-4xl leading-tight text-foreground md:text-6xl"
        >
          It starts with a conversation.
        </motion.h2>
        <motion.p style={{ opacity: subOp }} className="mt-4 max-w-md text-base text-muted-foreground">
          8 guided questions. Plain language. No medical jargon. Takes about 3 minutes.
        </motion.p>

        <motion.div
          style={{
            scale: phoneScale,
            opacity: phoneOp,
            width: w,
            height: ht,
            border: "2px solid var(--border)",
            backgroundColor: "var(--card)",
            borderRadius: 38,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
          className="mt-8 flex flex-col gap-3 overflow-hidden p-4 text-left"
        >
          <Bubble p={p} at={0.28} side="ai" reduced={reduced} text="What's been on your mind before this appointment?" />
          <motion.div style={{ opacity: dotsOp }} className="flex w-fit items-center gap-1 rounded-full px-3 py-2" >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={reduced ? {} : { y: [0, -3, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
              />
            ))}
          </motion.div>
          <Bubble
            p={p}
            at={0.42}
            side="user"
            reduced={reduced}
            text="I've had really bad headaches for 3 days now. Way worse in the afternoons."
          />
          <Bubble p={p} at={0.54} side="ai" reduced={reduced} text="How would you rate the pain from 1 to 10?" />
          <Bubble p={p} at={0.66} side="user" reduced={reduced} text="Probably a 6. Painkillers aren't touching it." />
        </motion.div>
      </div>
    </Scene>
  );
}

function Bubble({
  p,
  at,
  side,
  text,
  reduced,
}: {
  p: MotionValue<number>;
  at: number;
  side: "ai" | "user";
  text: string;
  reduced: boolean;
}) {
  const from = side === "ai" ? -70 : 70;
  const x = useV(p, [at, at + 0.06], [from, 0], 0, reduced, SETTLE);
  const o = useV(p, [at, at + 0.05], [0, 1], 1, reduced);
  const ai = side === "ai";
  return (
    <motion.div
      style={{ x, opacity: o, backgroundColor: ai ? SURFACE : BLUE }}
      className={`max-w-[85%] px-4 py-3 text-[13px] leading-snug ${
        ai
          ? "self-start rounded-[18px] rounded-tl-[4px] text-foreground"
          : "self-end rounded-[18px] rounded-tr-[4px] text-white"
      }`}
    >
      {text}
    </motion.div>
  );
}

/* ------------------------------------------------------------- scene 4 */

const PILLS = [
  { t: "Headache", fx: -60, fy: -50, lx: -28, ly: -20, rtl: false, m: true },
  { t: "Dolor de cabeza", fx: 70, fy: -10, lx: 30, ly: -6, rtl: false, m: true },
  { t: "صداع", fx: 10, fy: 70, lx: 24, ly: 18, rtl: true, m: true },
  { t: "头痛", fx: -70, fy: 10, lx: -32, ly: 8, rtl: false, m: true },
  { t: "ਸਿਰ ਦਰਦ", fx: 55, fy: -60, lx: 2, ly: -24, rtl: false, m: false },
  { t: "سر درد", fx: -60, fy: 60, lx: -22, ly: 22, rtl: true, m: false },
  { t: "Mal de tête", fx: 65, fy: 60, lx: 26, ly: 6, rtl: false, m: false },
];

function SceneLanguages({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const headOp = useV(p, [0.02, 0.12, 0.85, 1], [0, 1, 1, 0], 1, reduced);
  const headY = useV(p, [0.02, 0.14], [30, 0], 0, reduced);
  const subOp = useV(p, [0.06, 0.18, 0.85, 1], [0, 1, 1, 0], 1, reduced);
  const finalScale = useV(p, [0.7, 0.8], [0.82, 1], 1, reduced, POP);
  const finalOp = useV(p, [0.7, 0.78, 0.9, 1], [0, 1, 1, 0], 1, reduced);
  const noteOp = useV(p, [0.74, 0.82, 0.9, 1], [0, 1, 1, 0], 1, reduced);

  const pills = mobile ? PILLS.filter((x) => x.m) : PILLS;

  return (
    <Scene sceneRef={ref} height={h(600, mobile)} bg={PAGE} reduced={reduced}>
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.h2
          style={{ opacity: headOp, y: headY }}
          className="font-display text-4xl leading-tight text-foreground md:text-6xl"
        >
          And you can answer in any language.
        </motion.h2>
        <motion.p style={{ opacity: subOp }} className="mt-4 max-w-lg text-base text-muted-foreground">
          Because struggling with English shouldn't mean struggling to explain your health. AEDNAV
          supports 7 languages.
        </motion.p>

        <div className="relative mt-10 h-[42vh] w-full">
          {pills.map((pill, i) => (
            <LangPill key={pill.t} p={p} pill={pill} i={i} reduced={reduced} />
          ))}

          <motion.div
            style={{ opacity: finalOp, scale: finalScale }}
            className="absolute left-1/2 top-1/2 w-[min(90%,540px)] -translate-x-1/2 -translate-y-1/2"
          >
            <span className="inline-block rounded-full border border-border bg-surface-elevated px-6 py-3 text-base font-medium text-foreground md:text-lg">
              I've had a headache for 3 days, worse in the afternoon.
            </span>
            <motion.p style={{ opacity: noteOp }} className="mt-5 text-sm text-muted-foreground">
              AEDNAV understands every language. Your doctor only sees English.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Scene>
  );
}

function LangPill({
  p,
  pill,
  i,
  reduced,
}: {
  p: MotionValue<number>;
  pill: (typeof PILLS)[number];
  i: number;
  reduced: boolean;
}) {
  const start = 0.12 + i * 0.04;
  const land = start + 0.14;
  const x = useV(p, [start, land, 0.56, 0.72], [pill.fx * 12, pill.lx * 12, pill.lx * 12, 0], 0, reduced, SETTLE);
  const y = useV(p, [start, land, 0.56, 0.72], [pill.fy * 6, pill.ly * 6, pill.ly * 6, 0], 0, reduced, SETTLE);
  const o = useV(p, [start, start + 0.06, 0.56, 0.7], [0, 1, 1, 0], 1, reduced);
  const s = useV(p, [0.56, 0.72], [1, 0.15], 1, reduced);

  return (
    <motion.div
      style={{ x, y, opacity: o, scale: s, backgroundColor: SURFACE }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-5 py-2.5 text-base font-medium text-foreground"
    >
      <span dir={pill.rtl ? "rtl" : "auto"}>{pill.t}</span>
    </motion.div>
  );
}

/* ------------------------------------------------------------- scene 5 */

function SceneSummaries({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const headOp = useV(p, [0.02, 0.14, 0.78, 0.95], [0, 1, 1, 0], 1, reduced);
  const headY = useV(p, [0.02, 0.16], [30, 0], 0, reduced);
  const subOp = useV(p, [0.06, 0.2, 0.78, 0.95], [0, 1, 1, 0], 1, reduced);
  const lx = useV(p, [0.16, 0.45], [-120, 0], 0, reduced, SETTLE);
  const rx = useV(p, [0.16, 0.45], [120, 0], 0, reduced, SETTLE);
  const cardOp = useV(p, [0.16, 0.36, 0.78, 0.98], [0, 1, 1, 0], 1, reduced);
  const arrow = useV(p, [0.36, 0.42, 0.48], [1, 1.25, 1], 1, reduced);
  const footOp = useV(p, [0.42, 0.54, 0.78, 0.95], [0, 1, 1, 0], 1, reduced);

  return (
    <Scene sceneRef={ref} height={h(600, mobile)} bg={PAGE} reduced={reduced}>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          style={{ opacity: headOp, y: headY }}
          className="font-display text-4xl leading-tight text-foreground md:text-6xl"
        >
          Then you both get exactly what you need.
        </motion.h2>
        <motion.p style={{ opacity: subOp }} className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
          One intake session. Two tailored summaries. Zero confusion.
        </motion.p>

        <div className="mt-10 grid gap-5 text-left md:grid-cols-2">
          <motion.div
            style={{ x: lx, opacity: cardOp }}
            className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8"
          >
            <p className="text-xs font-medium text-muted-foreground">Your summary</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">Ready for your appointment</h3>
            <div className="my-4 h-px" style={{ backgroundColor: SURFACE }} />
            <Field label="Main concern" value="Recurring headaches, 3 days" />
            <Field label="Severity" value="6 out of 10" />
            <Field label="Medications tried" value="OTC painkillers (not effective)" />
            <Field label="Your question" value="Could this be stress related?" />
            <span
              className="mt-5 inline-block rounded-full px-3.5 py-1.5 text-xs font-medium text-white"
              style={{ backgroundColor: "#30D158" }}
            >
              Suggested: Family doctor visit
            </span>
          </motion.div>

          <motion.div
            style={{ x: rx, opacity: cardOp, backgroundColor: SURFACE }}
            className="rounded-2xl p-6 md:p-8"
          >
            <p className="text-xs font-medium text-muted-foreground">Provider summary</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">Doctor-ready English</h3>
            <div className="my-4 h-px bg-border" />
            <Field label="Chief complaint" value="Recurring headaches × 3 days, afternoon onset" />
            <Field label="Severity" value="6/10 (self-reported)" />
            <Field label="Current medications" value="OTC analgesics (ineffective)" />
            <Field label="Patient goal" value="Understand potential cause" />
            <Field label="Allergies" value="None reported" />
            <p className="mt-5 text-xs text-muted-foreground">
              Generated in English regardless of the patient's selected language.
            </p>
          </motion.div>
        </div>

        <motion.div style={{ opacity: footOp }} className="mt-7 flex flex-col items-center gap-2">
          <motion.svg
            style={{ scale: arrow, color: BLUE }}
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 7h13M8 7l3-3M8 7l3 3M16 17H3m13 0l-3-3m3 3l-3 3" />
          </motion.svg>
          <p className="text-sm text-muted-foreground">
            Your summary in your language. Their summary in theirs.
          </p>
        </motion.div>
      </div>
    </Scene>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  );
}

/* ------------------------------------------------------------- scene 6 */

const FEATURES = [
  {
    icon: "clipboard",
    title: "Guided symptom intake",
    body: "8 carefully chosen questions that surface what your doctor needs to know: duration, severity, patterns, medications, allergies, history, and your goals for the visit. Nothing is missed.",
  },
  {
    icon: "globe",
    title: "7 languages, fully supported",
    body: "English, French, Spanish, Mandarin, Punjabi, Urdu, Arabic. Answer every question in the language that feels most natural to you. Switch languages at any point without losing your progress.",
  },
  {
    icon: "docs",
    title: "Dual summaries, instantly",
    body: "The moment you finish, you get a patient summary in your language and a structured clinical English summary ready to hand to your provider. No waiting, no manual translation.",
  },
  {
    icon: "shield",
    title: "Private by design",
    body: "No account required for the demo. No data sold. No ads. Your health information belongs to you, and AEDNAV never monetizes it.",
  },
] as const;

function FeatureIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };
  if (name === "clipboard")
    return (
      <svg {...common}>
        <rect x="8" y="3" width="8" height="4" rx="1" />
        <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2M9 14l2 2 4-4" />
      </svg>
    );
  if (name === "globe")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z" />
      </svg>
    );
  if (name === "docs")
    return (
      <svg {...common}>
        <rect x="4" y="3" width="11" height="14" rx="2" />
        <path d="M8 21h9a2 2 0 0 0 2-2V8" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function SceneFeatures({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const headScale = useV(p, [0.02, 0.16], [0.82, 1], 1, reduced, POP);
  const headOp = useV(p, [0.02, 0.14, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const subOp = useV(p, [0.06, 0.2, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const toPage = useV(p, [0.8, 1], [0, 1], 0, reduced);

  return (
    <Scene
      sceneRef={ref}
      height={h(600, mobile)}
      bg={SURFACE}
      reduced={reduced}
      overlay={{ color: PAGE, opacity: toPage }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          style={{ opacity: headOp, scale: headScale }}
          className="font-display text-4xl leading-tight text-foreground md:text-6xl"
        >
          Everything you need. Nothing you don't.
        </motion.h2>
        <motion.p style={{ opacity: subOp }} className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
          AEDNAV is built around one goal: getting you prepared before you walk through that door.
        </motion.p>

        <div className="mt-10 grid gap-5 text-left md:grid-cols-2">
          {FEATURES.map((f, i) => (
            <PopCard key={f.title} p={p} start={0.18 + i * 0.1} reduced={reduced}>
              <div className="h-full rounded-2xl border border-border bg-surface-elevated p-6 md:p-7">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ backgroundColor: BLUE }}
                >
                  <FeatureIcon name={f.icon} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </PopCard>
          ))}
        </div>
      </div>
    </Scene>
  );
}

function PopCard({
  p,
  start,
  reduced,
  children,
}: {
  p: MotionValue<number>;
  start: number;
  reduced: boolean;
  children: ReactNode;
}) {
  const y = useV(p, [start, start + 0.12], [80, 0], 0, reduced, BOUNCY);
  const o = useV(p, [start, start + 0.1, 0.82, 0.98], [0, 1, 1, 0], 1, reduced);
  return (
    <motion.div style={{ y, opacity: o }}>{children}</motion.div>
  );
}

/* ------------------------------------------------------------- scene 7 */

const AUDIENCE = [
  {
    e: "🏥",
    t: "First-time patients",
    b: "Not sure what to expect from a doctor's appointment? AEDNAV walks you through exactly what to share and how to share it.",
  },
  {
    e: "🌍",
    t: "Newcomers to Canada",
    b: "Navigating a new healthcare system is hard enough. AEDNAV helps you prepare in your own language and arrive knowing your next steps.",
  },
  {
    e: "📋",
    t: "Complex medical histories",
    b: "Multiple conditions, a long medication list, previous diagnoses? Organize everything clearly so your doctor gets the full picture in minutes.",
  },
  {
    e: "👨‍👩‍👧",
    t: "Parents and caregivers",
    b: "Preparing for someone else's appointment? AEDNAV guides you through every detail so nothing gets left out when it matters most.",
  },
] as const;

function SceneAudience({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const headOp = useV(p, [0.02, 0.14, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const headY = useV(p, [0.02, 0.16], [30, 0], 0, reduced);
  const subOp = useV(p, [0.06, 0.2, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);

  return (
    <Scene sceneRef={ref} height={h(500, mobile)} bg={PAGE} reduced={reduced}>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          style={{ opacity: headOp, y: headY }}
          className="font-display text-4xl leading-tight text-foreground md:text-6xl"
        >
          For anyone heading into a healthcare appointment.
        </motion.h2>
        <motion.p style={{ opacity: subOp }} className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
          Not just for people with language barriers. For anyone who wants to walk in prepared.
        </motion.p>

        <div className="mt-10 grid gap-5 text-left md:grid-cols-2">
          {AUDIENCE.map((a, i) => (
            <SlideCard key={a.t} p={p} start={0.2 + i * 0.1} from={i % 2 === 0 ? -110 : 110} reduced={reduced}>
              <div className="h-full rounded-2xl p-6" style={{ backgroundColor: SURFACE }}>
                <span className="text-2xl">{a.e}</span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{a.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.b}</p>
              </div>
            </SlideCard>
          ))}
        </div>
      </div>
    </Scene>
  );
}

function SlideCard({
  p,
  start,
  from,
  reduced,
  children,
}: {
  p: MotionValue<number>;
  start: number;
  from: number;
  reduced: boolean;
  children: ReactNode;
}) {
  const x = useV(p, [start, start + 0.14], [from, 0], 0, reduced, SETTLE);
  const o = useV(p, [start, start + 0.1, 0.82, 0.98], [0, 1, 1, 0], 1, reduced);
  return <motion.div style={{ x, opacity: o }}>{children}</motion.div>;
}

/* ------------------------------------------------------------- scene 8 */

const TRUST = [
  { t: "Private by design.", b: "No data sold. No ads. Your health information is yours, always." },
  { t: "No account required for the demo.", b: "Try the full intake experience right now, no sign-up, no commitment." },
  { t: "Built for Canadian healthcare.", b: "Designed with Canadian patients and healthcare privacy principles in mind." },
] as const;

const SOON = [
  { t: "Patient accounts", b: "Save your intake history, track symptoms over time, and bring context to every appointment." },
  { t: "Clinic integration", b: "Link directly with your clinic so your provider receives your summary before you arrive." },
  { t: "Appointment booking", b: "Book follow-ups and referrals right from your summary screen." },
] as const;

function SceneRoadmap({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const headOp = useV(p, [0.02, 0.14, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const headY = useV(p, [0.02, 0.16], [30, 0], 0, reduced);
  const subOp = useV(p, [0.06, 0.2, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);

  return (
    <Scene sceneRef={ref} height={h(400, mobile)} bg={PAGE} reduced={reduced}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <motion.h2
            style={{ opacity: headOp, y: headY }}
            className="font-display text-4xl leading-tight text-foreground md:text-6xl"
          >
            Built to grow with you.
          </motion.h2>
          <motion.p style={{ opacity: subOp }} className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            AEDNAV today is a working demo. Here is where it is going.
          </motion.p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            {TRUST.map((t, i) => (
              <SlideCard key={t.t} p={p} start={0.18 + i * 0.1} from={-110} reduced={reduced}>
                <div className="flex gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: "#30D158" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <p className="text-base font-semibold text-foreground">{t.t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.b}</p>
                  </div>
                </div>
              </SlideCard>
            ))}
          </div>

          <div className="space-y-4">
            {SOON.map((s, i) => (
              <SlideCard key={s.t} p={p} start={0.18 + i * 0.1} from={110} reduced={reduced}>
                <div className="relative rounded-xl p-5" style={{ backgroundColor: SURFACE }}>
                  <span
                    className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-medium"
                    style={{ backgroundColor: "#EBF4FF", color: BLUE }}
                  >
                    Coming soon
                  </span>
                  <div className="flex gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: BLUE }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    <div className="pr-20">
                      <p className="text-base font-semibold text-foreground">{s.t}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
                    </div>
                  </div>
                </div>
              </SlideCard>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ------------------------------------------------------------- scene 9 */

const STATS = [
  { n: "3 min", l: "Average intake time" },
  { n: "7", l: "Languages supported" },
  { n: "2", l: "Summaries generated per intake" },
] as const;

function SceneMission({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const qOp = useV(p, [0.02, 0.16, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const qY = useV(p, [0.02, 0.18], [30, 0], 0, reduced);
  const bOp = useV(p, [0.08, 0.22, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  const toBlue = useV(p, [0.8, 1], [0, 1], 0, reduced);

  return (
    <Scene
      sceneRef={ref}
      height={h(300, mobile)}
      bg={SURFACE}
      reduced={reduced}
      overlay={{ color: BLUE, opacity: toBlue }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.p
          style={{ opacity: qOp, y: qY }}
          className="font-display text-3xl italic leading-snug text-foreground md:text-4xl"
        >
          "Healthcare is stressful enough. Walking in unprepared shouldn't be part of the experience."
        </motion.p>
        <motion.p style={{ opacity: bOp }} className="mt-4 text-sm text-muted-foreground">
          The belief behind AEDNAV
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <StatPill key={s.n} p={p} start={0.3 + i * 0.12} reduced={reduced} n={s.n} l={s.l} />
          ))}
        </div>
      </div>
    </Scene>
  );
}

function StatPill({
  p,
  start,
  reduced,
  n,
  l,
}: {
  p: MotionValue<number>;
  start: number;
  reduced: boolean;
  n: string;
  l: string;
}) {
  const s = useV(p, [start, start + 0.12], [0.82, 1], 1, reduced, POP);
  const o = useV(p, [start, start + 0.1, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);
  return (
    <motion.div
      style={{ scale: s, opacity: o }}
      className="rounded-2xl border border-border bg-surface-elevated p-5"
    >
      <p className="text-2xl font-bold" style={{ color: BLUE }}>{n}</p>
      <p className="mt-1 text-xs text-muted-foreground">{l}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------ scene 10 */

function SceneCta({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useProgress(ref);

  const s = useV(p, [0.1, 0.28], [0.82, 1], 1, reduced, POP);
  const o = useV(p, [0.06, 0.24], [0, 1], 1, reduced);
  const btn = useV(p, [0.14, 0.34], [0.82, 1], 1, reduced, BOUNCY);

  return (
    <Scene sceneRef={ref} height={h(300, mobile)} bg={BLUE} reduced={reduced}>
      <motion.div style={{ opacity: o, scale: s }} className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-4xl leading-tight text-white md:text-6xl">
          Ready to prepare for your next appointment?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base text-white/80">
          Takes 3 minutes. Works in 7 languages. No sign-up needed.
        </p>
        <motion.div style={{ scale: btn }} className="mt-8">
          <Link
            to="/intake"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ color: BLUE }}
          >
            Prepare for my appointment →
          </Link>
        </motion.div>
        <p className="mt-6 text-xs text-white/60">
          Not a diagnostic tool. Always consult a healthcare professional.
        </p>
      </motion.div>
    </Scene>
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
