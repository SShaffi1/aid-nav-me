// Scroll-scrubbed video sequence for the landing page.
// The videos are never played: scroll position seeks currentTime frame by frame.
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useEffect, useRef, type ReactNode, type RefObject } from "react";

const GRADIENT =
  "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.05) 100%)";

const VIDEOS = [
  "/videos/hospital-corridor.mp4",
  "/videos/doctor-consultation.mp4",
  "/videos/patient-alone.mp4",
];

function vh(base: number, mobile: boolean) {
  return `${mobile ? Math.round(base * 0.6) : base}vh`;
}

function useP(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return scrollYProgress;
}

function ScrubVideo({
  src,
  poster,
  preload,
  progress,
  alt,
}: {
  src: string;
  poster: string;
  preload: "auto" | "metadata";
  progress: MotionValue<number>;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useMotionValueEvent(progress, "change", (v) => {
    const video = ref.current;
    if (!video || !video.duration) return;
    video.currentTime = Math.min(Math.max(v, 0), 1) * video.duration;
  });

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload={preload}
      aria-label={alt}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
      }}
    />
  );
}

function StaticVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      loop
      aria-label={alt}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center center",
      }}
    />
  );
}

function Gradient() {
  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none", background: GRADIENT }}
    />
  );
}

function TextBlock({
  eyebrow,
  headline,
  subtext,
  mobile,
}: {
  eyebrow: string;
  headline: string;
  subtext: string;
  mobile: boolean;
}) {
  return (
    <>
      <p dir="auto" className="text-sm font-medium uppercase tracking-widest text-white/60">
        {eyebrow}
      </p>
      <h2
        dir="auto"
        className={`font-display mt-4 leading-[1.05] text-white ${mobile ? "text-3xl" : "text-5xl md:text-7xl"}`}
      >
        {headline}
      </h2>
      <p dir="auto" className={`mt-4 max-w-sm text-white/70 ${mobile ? "text-base" : "text-lg"}`}>
        {subtext}
      </p>
    </>
  );
}

function Overlay({ opacity, children }: { opacity?: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div
      style={{ position: "absolute", bottom: "10%", left: "8%", right: "8%", maxWidth: 640, opacity }}
    >
      {children}
    </motion.div>
  );
}

const COPY = {
  one: {
    eyebrow: "Every day across Canada",
    headline: "Patients walk into appointments",
    subtext: "To clinics, walk-in centres, and hospitals. Hoping to be understood.",
  },
  two: {
    eyebrow: "The appointment begins",
    headline: "The doctor asks. The patient tries to remember.",
    subtext: "When did it start? How severe? Any allergies? Any medications?",
  },
  three: {
    eyebrow: "Something important gets lost",
    headline: "Not because they did not know,",
    subtext: "but because no one helped them prepare.",
  },
  four: {
    eyebrow: "There is a better way",
    headline: "What if they could prepare, in their own language, before they walked in?",
    subtext: "That is exactly what AEDNAV does.",
  },
  card: {
    title: "Ready to see how it works?",
    note: "3 minutes. 7 languages. No sign-up needed.",
    cta: "Prepare for my appointment",
  },
};

/* ----------------------------------------------------------------- scenes */

function SceneCorridor({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useP(ref);
  const text = useTransform(p, [0.08, 0.22, 0.7, 0.88], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      style={{ height: vh(600, mobile), margin: 0, padding: 0, backgroundColor: "#000000" }}
      className="w-full"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        <ScrubVideo
          src="/videos/hospital-corridor.mp4"
          poster="/videos/hospital-corridor-poster.jpg"
          preload="auto"
          progress={p}
          alt="Walking down a hospital corridor"
        />
        <Gradient />
        <Overlay opacity={text}>
          <TextBlock {...COPY.one} mobile={mobile} />
        </Overlay>
      </div>
    </section>
  );
}

function SceneConsultation({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useP(ref);
  const one = useTransform(p, [0.08, 0.22, 0.4, 0.52], [0, 1, 1, 0]);
  const two = useTransform(p, [0.52, 0.64, 0.78, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      style={{ height: vh(600, mobile), margin: 0, padding: 0, backgroundColor: "#000000" }}
      className="w-full"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        <ScrubVideo
          src="/videos/doctor-consultation.mp4"
          poster="/videos/doctor-consultation-poster.jpg"
          preload="metadata"
          progress={p}
          alt="Doctor speaking with a patient during a consultation"
        />
        <Gradient />
        <Overlay opacity={one}>
          <TextBlock {...COPY.two} mobile={mobile} />
        </Overlay>
        <Overlay opacity={two}>
          <TextBlock {...COPY.three} mobile={mobile} />
        </Overlay>
      </div>
    </section>
  );
}

function CtaCard({ mobile }: { mobile: boolean }) {
  return (
    <div
      className={`shadow-soft max-w-md rounded-2xl bg-white p-6 sm:p-8 ${mobile ? "mx-4" : ""}`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <p dir="auto" className="text-xl font-semibold" style={{ color: "#1C1C1E" }}>
        {COPY.card.title}
      </p>
      <p dir="auto" className="mt-1 text-sm" style={{ color: "#6B6B70" }}>
        {COPY.card.note}
      </p>
      <Link
        to="/intake"
        className="mt-4 flex w-full items-center justify-center rounded-full px-6 py-3 text-base font-medium text-white"
        style={{ backgroundColor: "#0A84FF", minHeight: 44 }}
      >
        {COPY.card.cta} →
      </Link>
    </div>
  );
}

function SceneRealization({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useP(ref);
  const text = useTransform(p, [0.08, 0.22, 0.55, 0.7], [0, 1, 1, 0]);
  const cardOpacity = useTransform(p, [0.56, 0.68], [0, 1]);
  const cardY = useTransform(p, [0.56, 0.68], [40, 0]);
  const white = useTransform(p, [0.82, 1], [0, 1]);

  return (
    <section
      ref={ref}
      style={{ height: vh(600, mobile), margin: 0, padding: 0, backgroundColor: "#000000" }}
      className="w-full"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        <ScrubVideo
          src="/videos/patient-alone.mp4"
          poster="/videos/patient-alone-poster.jpg"
          preload="metadata"
          progress={p}
          alt="Healthcare workers walking through a hospital hallway"
        />
        <Gradient />
        <Overlay opacity={text}>
          <TextBlock {...COPY.four} mobile={mobile} />
        </Overlay>
        <motion.div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "8%",
            right: "8%",
            opacity: cardOpacity,
            y: cardY,
          }}
        >
          <CtaCard mobile={mobile} />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none"
          style={{ position: "absolute", inset: 0, backgroundColor: "#FFFFFF", opacity: white }}
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ block */

function StaticScene({
  src,
  poster,
  alt,
  mobile,
  children,
}: {
  src: string;
  poster: string;
  alt: string;
  mobile: boolean;
  children: ReactNode;
}) {
  return (
    <section style={{ margin: 0, padding: 0, backgroundColor: "#000000" }} className="w-full">
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <StaticVideo src={src} poster={poster} alt={alt} />
        <Gradient />
        <div
          style={{ position: "absolute", bottom: "10%", left: "8%", right: "8%", maxWidth: 640 }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export function VideoStory({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  useEffect(() => {
    const links = VIDEOS.map((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = url;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach((l) => l.remove());
  }, []);

  return (
    <div style={{ position: "relative", backgroundColor: "#000000" }}>
      {reduced ? (
        <>
          <StaticScene
            src="/videos/hospital-corridor.mp4"
            poster="/videos/hospital-corridor-poster.jpg"
            alt="Walking down a hospital corridor"
            mobile={mobile}
          >
            <TextBlock {...COPY.one} mobile={mobile} />
          </StaticScene>
          <StaticScene
            src="/videos/doctor-consultation.mp4"
            poster="/videos/doctor-consultation-poster.jpg"
            alt="Doctor speaking with a patient during a consultation"
            mobile={mobile}
          >
            <TextBlock {...COPY.two} mobile={mobile} />
            <div className="mt-8">
              <TextBlock {...COPY.three} mobile={mobile} />
            </div>
          </StaticScene>
          <StaticScene
            src="/videos/patient-alone.mp4"
            poster="/videos/patient-alone-poster.jpg"
            alt="Healthcare workers walking through a hospital hallway"
            mobile={mobile}
          >
            <TextBlock {...COPY.four} mobile={mobile} />
            <div className="mt-6">
              <CtaCard mobile={mobile} />
            </div>
          </StaticScene>
        </>
      ) : (
        <>
          <SceneCorridor mobile={mobile} />
          <SceneConsultation mobile={mobile} />
          <SceneRealization mobile={mobile} />
        </>
      )}
      <p
        style={{
          position: "absolute",
          bottom: 8,
          right: 12,
          fontSize: 10,
          color: "rgba(255,255,255,0.4)",
          pointerEvents: "none",
        }}
      >
        Videos: Pexels
      </p>
    </div>
  );
}
