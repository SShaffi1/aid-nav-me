// Photo-driven Ken Burns scrollytelling block for the landing page.
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode, type RefObject } from "react";

const PHOTOS = {
  a: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=85&fit=crop",
  b: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=85&fit=crop",
  c: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1920&q=85&fit=crop",
  d: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=85&fit=crop",
  e: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&q=85&fit=crop",
};

const GRADIENT =
  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)";

function vh(base: number, mobile: boolean) {
  return `${mobile ? Math.round(base * 0.65) : base}vh`;
}

/** Reduce zoom amplitude by 30% on small screens. */
function zoom(values: number[], mobile: boolean) {
  if (!mobile) return values;
  const start = values[0];
  return values.map((v) => start + (v - start) * 0.7);
}

function useP(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return scrollYProgress;
}

function Photo({
  src,
  alt,
  eager,
  scale,
  x,
  y,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  scale?: MotionValue<number>;
  x?: MotionValue<string>;
  y?: MotionValue<string>;
}) {
  return (
    <motion.div style={{ position: "absolute", inset: 0, scale, x, y }}>
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
    </motion.div>
  );
}

function Copy({
  eyebrow,
  headline,
  subtext,
  mobile,
}: {
  eyebrow: string;
  headline: string;
  subtext?: string;
  mobile: boolean;
}) {
  return (
    <>
      <p dir="auto" className="text-sm font-medium text-white/60">
        {eyebrow}
      </p>
      <h2
        dir="auto"
        className={`font-display mt-3 leading-tight text-white ${mobile ? "text-3xl" : "text-4xl md:text-6xl"}`}
      >
        {headline}
      </h2>
      {subtext && (
        <p
          dir="auto"
          className={`mt-4 max-w-md text-white/70 ${mobile ? "text-base" : "text-lg"}`}
        >
          {subtext}
        </p>
      )}
    </>
  );
}

function Overlay({ opacity, children }: { opacity?: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div
      style={{ position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 8%", opacity }}
    >
      {children}
    </motion.div>
  );
}

function StaticScene({
  src,
  alt,
  eager,
  mobile,
  children,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  mobile: boolean;
  children: ReactNode;
}) {
  return (
    <section style={{ margin: 0, padding: 0, backgroundColor: "#000000" }} className="w-full">
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <Photo src={src} alt={alt} eager={eager} />
        <div style={{ position: "absolute", inset: 0, background: GRADIENT }} />
        <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, padding: "0 8%" }}>
          {children}
        </div>
      </div>
    </section>
  );
}

const COPY = {
  a: {
    eyebrow: "Every day, thousands of patients",
    headline: "Walk into a healthcare appointment...",
  },
  b: {
    eyebrow: "Without a plan",
    headline: "...not sure what to say, what to share, or where to begin.",
  },
  c1: {
    eyebrow: "The doctor asks questions",
    headline: "The patient tries to remember.",
    subtext: "When did it start? How bad is it? Any medications? Any allergies?",
  },
  c2: {
    eyebrow: "Critical details get missed",
    headline: "Not because patients do not know,",
    subtext: "but because no one helped them prepare.",
  },
  d: {
    eyebrow: "The gap between knowing and saying",
    headline: "There is so much they wanted to tell their doctor.",
    subtext:
      "But appointments are short. Medical language is hard. And sometimes English is not even their first language.",
    card: "What if they could prepare, in their own language, before they walked in?",
    cardNote: "That is AEDNAV.",
  },
  e: {
    eyebrow: "When patients arrive prepared",
    headline: "The whole appointment changes.",
    subtext:
      "The doctor gets a clear picture instantly. The patient feels heard. And nothing gets missed.",
  },
};

const ALT = {
  a: "Empty hospital corridor with light coming through the windows",
  b: "Nurse reviewing a patient chart",
  c: "Doctor and patient talking during a consultation",
  d: "Patient sitting quietly, looking thoughtful and worried",
  e: "Doctor writing notes after an appointment",
};

/* ------------------------------------------------------------- scene A */

function PhotoCorridor({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useP(ref);
  const scale = useTransform(p, [0, 1], zoom([1.0, 1.18], mobile));
  const x = useTransform(p, [0, 1], ["0%", "-3%"]);
  const y = useTransform(p, [0, 1], ["0%", "-2%"]);
  const text = useTransform(p, [0.15, 0.28, 0.72, 0.88], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      style={{ height: vh(500, mobile), margin: 0, padding: 0, backgroundColor: "#000000" }}
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
        <Photo src={PHOTOS.a} alt={ALT.a} eager scale={scale} x={x} y={y} />
        <div style={{ position: "absolute", inset: 0, background: GRADIENT }} />
        <Overlay opacity={text}>
          <Copy {...COPY.a} mobile={mobile} />
        </Overlay>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- scene B */

function PhotoNurse({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useP(ref);
  const scale = useTransform(p, [0, 1], zoom([1.08, 1.22], mobile));
  const x = useTransform(p, [0, 1], ["2%", "-2%"]);
  const y = useTransform(p, [0, 1], ["-1%", "1%"]);
  const fade = useTransform(p, [0, 0.2], [0, 1]);
  const text = useTransform(p, [0.2, 0.32, 0.75, 0.9], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      style={{ height: vh(500, mobile), margin: 0, padding: 0, backgroundColor: "#000000" }}
      className="w-full"
    >
      <motion.div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#000000",
          opacity: fade,
        }}
      >
        <Photo src={PHOTOS.b} alt={ALT.b} scale={scale} x={x} y={y} />
        <div style={{ position: "absolute", inset: 0, background: GRADIENT }} />
        <Overlay opacity={text}>
          <Copy {...COPY.b} mobile={mobile} />
        </Overlay>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------- scene C */

function PhotoConsult({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useP(ref);
  const scale = useTransform(p, [0, 0.4, 1], zoom([1.0, 1.1, 1.25], mobile));
  const x = useTransform(p, [0, 0.5, 1], ["5%", "0%", "-4%"]);
  const y = useTransform(p, [0, 1], ["0%", "-3%"]);
  const one = useTransform(p, [0.1, 0.2, 0.42, 0.52], [0, 1, 1, 0]);
  const two = useTransform(p, [0.5, 0.6, 0.85, 0.95], [0, 1, 1, 0]);

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
        <Photo src={PHOTOS.c} alt={ALT.c} scale={scale} x={x} y={y} />
        <div style={{ position: "absolute", inset: 0, background: GRADIENT }} />
        <Overlay opacity={one}>
          <Copy {...COPY.c1} mobile={mobile} />
        </Overlay>
        <Overlay opacity={two}>
          <Copy {...COPY.c2} mobile={mobile} />
        </Overlay>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- scene D */

function PhotoPatient({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useP(ref);
  const scale = useTransform(p, [0, 1], zoom([1.12, 1.28], mobile));
  const x = useTransform(p, [0, 1], ["-3%", "3%"]);
  const y = useTransform(p, [0, 1], ["2%", "-2%"]);
  const text = useTransform(p, [0.15, 0.28, 0.78, 0.92], [0, 1, 1, 0]);
  const cardOpacity = useTransform(p, [0.72, 0.9], [0, 1]);
  const cardY = useTransform(p, [0.72, 0.9], [40, 0]);

  return (
    <section
      ref={ref}
      style={{ height: vh(500, mobile), margin: 0, padding: 0, backgroundColor: "#000000" }}
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
        <Photo src={PHOTOS.d} alt={ALT.d} scale={scale} x={x} y={y} />
        <div style={{ position: "absolute", inset: 0, background: GRADIENT }} />
        <Overlay opacity={text}>
          <Copy {...COPY.d} mobile={mobile} />
        </Overlay>
        <motion.div
          style={{
            position: "absolute",
            bottom: "8%",
            left: 0,
            right: 0,
            padding: mobile ? "0 1rem" : "0 8%",
            opacity: cardOpacity,
            y: cardY,
          }}
        >
          <div
            className={mobile ? "mx-4 rounded-2xl p-4" : "max-w-xl rounded-2xl p-5"}
            style={{ backgroundColor: "rgba(255,255,255,0.94)", borderRadius: 16 }}
          >
            <p dir="auto" className="text-base font-medium" style={{ color: "#1C1C1E" }}>
              {COPY.d.card}
            </p>
            <p dir="auto" className="mt-2 text-sm font-medium" style={{ color: "#0A84FF" }}>
              {COPY.d.cardNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- scene E */

function PhotoResolution({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useP(ref);
  const scale = useTransform(p, [0, 1], zoom([1.15, 1.05], mobile));
  const x = useTransform(p, [0, 1], ["4%", "0%"]);
  const y = useTransform(p, [0, 1], ["-2%", "0%"]);
  const text = useTransform(p, [0.12, 0.25, 0.6, 0.75], [0, 1, 1, 0]);
  const white = useTransform(p, [0.6, 1], [0, 1]);

  return (
    <section
      ref={ref}
      style={{ height: vh(400, mobile), margin: 0, padding: 0, backgroundColor: "#000000" }}
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
        <Photo src={PHOTOS.e} alt={ALT.e} scale={scale} x={x} y={y} />
        <div style={{ position: "absolute", inset: 0, background: GRADIENT }} />
        <Overlay opacity={text}>
          <Copy {...COPY.e} mobile={mobile} />
        </Overlay>
        <motion.div
          aria-hidden
          className="pointer-events-none"
          style={{ position: "absolute", inset: 0, backgroundColor: "#FFFFFF", opacity: white }}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- block */

export function PhotoStory({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  if (reduced) {
    return (
      <>
        <StaticScene src={PHOTOS.a} alt={ALT.a} eager mobile={mobile}>
          <Copy {...COPY.a} mobile={mobile} />
        </StaticScene>
        <StaticScene src={PHOTOS.b} alt={ALT.b} mobile={mobile}>
          <Copy {...COPY.b} mobile={mobile} />
        </StaticScene>
        <StaticScene src={PHOTOS.c} alt={ALT.c} mobile={mobile}>
          <Copy {...COPY.c1} mobile={mobile} />
          <div className="mt-8">
            <Copy {...COPY.c2} mobile={mobile} />
          </div>
        </StaticScene>
        <StaticScene src={PHOTOS.d} alt={ALT.d} mobile={mobile}>
          <Copy {...COPY.d} mobile={mobile} />
          <div
            className="mt-6 max-w-xl p-5"
            style={{ backgroundColor: "rgba(255,255,255,0.94)", borderRadius: 16 }}
          >
            <p className="text-base font-medium" style={{ color: "#1C1C1E" }}>
              {COPY.d.card}
            </p>
            <p className="mt-2 text-sm font-medium" style={{ color: "#0A84FF" }}>
              {COPY.d.cardNote}
            </p>
          </div>
        </StaticScene>
        <StaticScene src={PHOTOS.e} alt={ALT.e} mobile={mobile}>
          <Copy {...COPY.e} mobile={mobile} />
        </StaticScene>
      </>
    );
  }

  return (
    <>
      <PhotoCorridor mobile={mobile} />
      <PhotoNurse mobile={mobile} />
      <PhotoConsult mobile={mobile} />
      <PhotoPatient mobile={mobile} />
      <PhotoResolution mobile={mobile} />
    </>
  );
}
