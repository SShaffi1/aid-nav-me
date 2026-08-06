import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { LanguageGate, useLang } from "@/components/LanguageGate";
import { useIsMobile } from "@/hooks/use-mobile";
import { ui } from "@/lib/ui-i18n";
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

/* ---------------------------------------------------------------- helpers */

/** Scene heights: 30% shorter on mobile. */
function sceneHeight(base: number, mobile: boolean) {
  return `${mobile ? Math.round(base * 0.7) : base}vh`;
}

/** Wraps useTransform so reduced-motion users get a constant value. */
function useMaybe(
  progress: MotionValue<number>,
  input: number[],
  output: number[],
  still: number,
  reduced: boolean,
) {
  const value = useTransform(progress, input, output);
  const flat = useTransform(progress, [0, 1], [still, still]);
  return reduced ? flat : value;
}

/* ------------------------------------------------------------------ page */

function LandingPage() {
  const lang = useLang();
  const tr = ui(lang);
  const lc = landing(lang);
  const mobile = useIsMobile();
  const reduced = !!useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      <LanguageGate />
      <SiteHeader />

      <Scene1Hero reduced={reduced} mobile={mobile} tr={tr} />
      <Scene2Language reduced={reduced} mobile={mobile} />
      <Scene3Chat reduced={reduced} mobile={mobile} />
      <Scene4Transformation reduced={reduced} mobile={mobile} />
      <Scene5Audience reduced={reduced} mobile={mobile} />

      {/* SCENE 6 — Final CTA (static) */}
      <section className="mx-auto mt-10 max-w-4xl px-6">
        <div
          className="px-5 py-16 text-center sm:px-8 sm:py-20 md:px-16"
          style={{ backgroundColor: "var(--primary)", borderRadius: "20px" }}
        >
          <h2 className="font-display text-3xl text-primary-foreground sm:text-4xl md:text-5xl">
            {tr.sectionTitles.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-primary-foreground/85">
            {tr.sectionTitles.ctaBody}
          </p>
          <Link
            to="/intake"
            className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-opacity hover:opacity-90 sm:w-auto"
            style={{ minHeight: "44px" }}
          >
            {tr.sectionTitles.ctaButton}
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto mt-32 max-w-3xl px-6 scroll-mt-24">
        <h2 className="font-display text-center text-4xl leading-tight text-foreground md:text-5xl">
          {tr.sectionTitles.faq}
        </h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {lc.faqs.map((f) => (
            <FaqItem key={f.q} question={f.q} answer={f.a} />
          ))}
        </div>
      </section>

      <div className="mt-32">
        <SiteFooter />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- scene 1 */

function Scene1Hero({
  reduced,
  mobile,
  tr,
}: {
  reduced: boolean;
  mobile: boolean;
  tr: ReturnType<typeof ui>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headScale = useMaybe(scrollYProgress, [0.5, 1], [1, 1.04], 1, reduced);
  const headOpacity = useMaybe(scrollYProgress, [0.5, 1], [1, 0], 1, reduced);
  const ctaOpacity = useMaybe(scrollYProgress, [0.3, 0.6], [1, 0], 1, reduced);

  return (
    <div ref={ref} className="relative" style={{ height: sceneHeight(150, mobile) }}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: headOpacity, scale: headScale }}
          className="mx-auto max-w-4xl px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-7xl md:leading-[1.02]"
          >
            Healthcare shouldn't get lost in translation.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            AEDNAV helps every patient describe what's wrong, in their language, before they even see a doctor.
          </motion.p>

          <motion.div style={{ opacity: ctaOpacity }} className="mt-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            >
              <Link
                to="/intake"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
                style={{ backgroundColor: "var(--primary)", minHeight: "44px" }}
              >
                {tr.hero.primary}
              </Link>
              <a
                href="#faq"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-surface sm:w-auto"
                style={{ borderColor: "var(--border)", minHeight: "44px" }}
              >
                See how it works
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- scene 2 */

type FloatWord = { text: string; x: number; y: number };

const WORDS: FloatWord[] = [
  { text: "Headache", x: -30, y: -26 },
  { text: "Dolor de cabeza", x: 28, y: -18 },
  { text: "صداع", x: -26, y: 20 },
  { text: "头痛", x: 30, y: 24 },
  { text: "ਸਿਰ ਦਰਦ", x: -6, y: -34 },
  { text: "سر درد", x: 8, y: 34 },
];

function Scene2Language({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const titleOpacity = useMaybe(scrollYProgress, [0, 0.2, 0.6, 0.75], [0, 1, 1, 0], 1, reduced);
  const drift = useMaybe(scrollYProgress, [0, 0.4, 0.5, 0.8], [0, 1, 1, 0], 1, reduced);
  const wordScale = useMaybe(scrollYProgress, [0.5, 0.8], [1, 0], 1, reduced);
  const wordOpacity = useMaybe(scrollYProgress, [0, 0.15, 0.75, 0.82], [0, 1, 1, 0], 1, reduced);
  const sentenceOpacity = useMaybe(scrollYProgress, [0.8, 0.92], [0, 1], 1, reduced);
  const sentenceY = useMaybe(scrollYProgress, [0.8, 0.95], [20, 0], 0, reduced);

  const words = mobile ? WORDS.slice(0, 4) : WORDS;

  return (
    <div ref={ref} className="relative" style={{ height: sceneHeight(300, mobile) }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative flex h-full items-center justify-center px-6">
          <motion.h2
            style={{ opacity: titleOpacity }}
            className="font-display text-center text-5xl text-foreground md:text-7xl"
          >
            Just talk.
          </motion.h2>

          {words.map((w) => (
            <FloatingWord key={w.text} word={w} drift={drift} scale={wordScale} opacity={wordOpacity} />
          ))}

          <motion.p
            style={{ opacity: sentenceOpacity, y: sentenceY }}
            className="absolute mx-auto max-w-xl px-6 text-center text-xl leading-relaxed text-foreground md:text-3xl"
          >
            "I've had a headache for 3 days, getting worse in the afternoon."
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function FloatingWord({
  word,
  drift,
  scale,
  opacity,
}: {
  word: FloatWord;
  drift: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  const x = useTransform(drift, [0, 1], ["0%", `${word.x}vw`]);
  const y = useTransform(drift, [0, 1], ["0%", `${word.y}vh`]);
  return (
    <motion.div
      style={{ x, y, scale, opacity, backgroundColor: "var(--surface)" }}
      className="pointer-events-none absolute rounded-full px-4 py-2 text-sm font-medium text-foreground md:text-base"
    >
      <span dir="auto" className="inline-block text-left">{word.text}</span>
    </motion.div>
  );
}

/* --------------------------------------------------------------- scene 3 */

function Scene3Chat({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const phoneScale = useMaybe(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.8], 1, reduced);
  const phoneOpacity = useMaybe(scrollYProgress, [0, 0.08, 0.8, 1], [0, 1, 1, 0], 1, reduced);

  const b1 = useMaybe(scrollYProgress, [0.2, 0.28], [0, 1], 1, reduced);
  const b1y = useMaybe(scrollYProgress, [0.2, 0.28], [14, 0], 0, reduced);
  const b2 = useMaybe(scrollYProgress, [0.4, 0.48], [0, 1], 1, reduced);
  const b2y = useMaybe(scrollYProgress, [0.4, 0.48], [14, 0], 0, reduced);
  const b3 = useMaybe(scrollYProgress, [0.6, 0.68], [0, 1], 1, reduced);
  const b3y = useMaybe(scrollYProgress, [0.6, 0.68], [14, 0], 0, reduced);

  const captionOpacity = useMaybe(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0, 1, 1, 0], 1, reduced);

  return (
    <div ref={ref} className="relative" style={{ height: sceneHeight(300, mobile) }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full flex-col items-center justify-center gap-6 px-6">
          <motion.div
            style={{ scale: phoneScale, opacity: phoneOpacity }}
            className="w-full max-w-[320px] rounded-[36px] border bg-card p-4 shadow-soft"
          >
            <div className="mx-auto mb-4 h-1.5 w-16 rounded-full" style={{ backgroundColor: "var(--border)" }} />
            <div className="flex h-[52vh] max-h-[440px] flex-col gap-3 overflow-hidden py-2">
              <motion.div
                style={{ opacity: b1, y: b1y, backgroundColor: "var(--surface)", borderRadius: 18 }}
                className="max-w-[85%] self-start px-4 py-2.5 text-sm text-foreground"
              >
                What's been on your mind?
              </motion.div>
              <motion.div
                style={{ opacity: b2, y: b2y, backgroundColor: "var(--primary)", borderRadius: 18 }}
                className="max-w-[85%] self-end px-4 py-2.5 text-sm text-primary-foreground"
              >
                Me duele la cabeza desde hace 3 días
              </motion.div>
              <motion.div
                style={{ opacity: b3, y: b3y, backgroundColor: "var(--surface)", borderRadius: 18 }}
                className="max-w-[85%] self-start px-4 py-2.5 text-sm text-foreground"
              >
                Understood. How severe is the pain?
              </motion.div>
            </div>
          </motion.div>

          <motion.p style={{ opacity: captionOpacity }} className="text-sm text-muted-foreground">
            Any language. No medical jargon.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- scene 4 */

function Scene4Transformation({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useMaybe(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0, 1, 1, 0], 1, reduced);

  const leftX = useMaybe(scrollYProgress, [0.1, 0.4], [-80, 0], 0, reduced);
  const leftOpacity = useMaybe(scrollYProgress, [0.1, 0.4, 0.7, 1], [0, 1, 1, 0], 1, reduced);
  const rightX = useMaybe(scrollYProgress, [0.2, 0.5], [80, 0], 0, reduced);
  const rightOpacity = useMaybe(scrollYProgress, [0.2, 0.5, 0.7, 1], [0, 1, 1, 0], 1, reduced);

  const arrowScale = useMaybe(scrollYProgress, [0.45, 0.5, 0.55], [1, 1.5, 1], 1, reduced);
  const arrowOpacity = useMaybe(scrollYProgress, [0.35, 0.45, 0.7, 0.9], [0, 1, 1, 0], 1, reduced);

  return (
    <div ref={ref} className="relative" style={{ height: sceneHeight(250, mobile) }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center gap-10 px-6">
          <motion.h2
            style={{ opacity: headOpacity }}
            className="font-display text-center text-3xl text-foreground md:text-5xl"
          >
            Confusion becomes clarity.
          </motion.h2>

          <div className="grid w-full items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
            <motion.div
              style={{ x: leftX, opacity: leftOpacity, backgroundColor: "var(--surface)" }}
              className="rounded-2xl p-5 sm:p-8"
            >
              <p className="text-xs font-medium text-muted-foreground">Tu resumen</p>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                Dolor de cabeza por 3 días, peor en la tarde.
              </p>
            </motion.div>

            <motion.div
              style={{ scale: arrowScale, opacity: arrowOpacity }}
              className="mx-auto grid h-10 w-10 place-items-center"
            >
              <svg
                viewBox="0 0 24 24" className="h-6 w-6 rotate-90 md:rotate-0"
                fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </motion.div>

            <motion.div
              style={{ x: rightX, opacity: rightOpacity }}
              className="rounded-2xl border bg-card p-5 sm:p-8"
            >
              <p className="text-xs font-medium text-muted-foreground">Provider summary</p>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground">
                Recurring headaches, 3 days, worse in the afternoon. Self-reported severity: 6/10.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- scene 5 */

const AUDIENCE = [
  { emoji: "🌍", label: "Newcomers to Canada" },
  { emoji: "💬", label: "Non-English speakers" },
  { emoji: "👴", label: "Elderly patients" },
  { emoji: "👨‍👩‍👧", label: "Busy families" },
];

function Scene5Audience({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const headOpacity = useMaybe(scrollYProgress, [0, 0.2, 0.8, 0.95], [0, 1, 1, 0], 1, reduced);

  const c0 = useMaybe(scrollYProgress, [0.15, 0.25, 0.7, 0.85], [0, 1, 1, 0], 1, reduced);
  const c0y = useMaybe(scrollYProgress, [0.15, 0.25], [40, 0], 0, reduced);
  const c1 = useMaybe(scrollYProgress, [0.25, 0.35, 0.7, 0.88], [0, 1, 1, 0], 1, reduced);
  const c1y = useMaybe(scrollYProgress, [0.25, 0.35], [40, 0], 0, reduced);
  const c2 = useMaybe(scrollYProgress, [0.35, 0.45, 0.7, 0.92], [0, 1, 1, 0], 1, reduced);
  const c2y = useMaybe(scrollYProgress, [0.35, 0.45], [40, 0], 0, reduced);
  const c3 = useMaybe(scrollYProgress, [0.45, 0.55, 0.7, 0.96], [0, 1, 1, 0], 1, reduced);
  const c3y = useMaybe(scrollYProgress, [0.45, 0.55], [40, 0], 0, reduced);

  const opacities = [c0, c1, c2, c3];
  const ys = [c0y, c1y, c2y, c3y];

  return (
    <div ref={ref} className="relative" style={{ height: sceneHeight(250, mobile) }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center gap-10 px-6">
          <motion.h2
            style={{ opacity: headOpacity }}
            className="font-display text-center text-4xl text-foreground md:text-6xl"
          >
            For everyone.
          </motion.h2>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map((a, i) => (
              <motion.div
                key={a.label}
                style={{ opacity: opacities[i], y: ys[i], backgroundColor: "var(--surface)" }}
                className="rounded-2xl p-5 sm:p-6"
              >
                <div className="text-3xl" aria-hidden="true">{a.emoji}</div>
                <p className="mt-3 text-sm font-medium text-foreground">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
