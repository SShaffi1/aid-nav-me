// Mock intake script, placeholder for real AI integration
export type IntakeStep = {
  id: string;
  field: keyof IntakeAnswers;
  prompt: (a: IntakeAnswers) => string;
  placeholder: string;
  suggestions?: string[];
};

export type IntakeAnswers = {
  concern: string;
  duration: string;
  severity: string;
  pattern: string;
  medications: string;
  allergies: string;
  history: string;
  goal: string;
};

export const initialAnswers: IntakeAnswers = {
  concern: "",
  duration: "",
  severity: "",
  pattern: "",
  medications: "",
  allergies: "",
  history: "",
  goal: "",
};

const QUICK = ["I'm not sure", "Skip for now"];

export const intakeSteps: IntakeStep[] = [
  {
    id: "concern",
    field: "concern",
    prompt: () =>
      "Hi, I'm AEDNAV. I'll help you organize what you're experiencing before your appointment. To start, what's been on your mind?",
    placeholder: "e.g. I've had headaches for 3 days...",
  },
  {
    id: "duration",
    field: "duration",
    prompt: () => "Thanks for sharing. How long has this been going on?",
    placeholder: "e.g. About 3 days",
    suggestions: ["A few hours", "1–3 days", "About a week", "Several weeks", "Months", ...QUICK],
  },
  {
    id: "severity",
    field: "severity",
    prompt: () =>
      "On a scale of 1 to 10, how would you describe it at its worst, where 10 is the most intense you can imagine?",
    placeholder: "e.g. About a 6",
    suggestions: ["1–3 (mild)", "4–6 (moderate)", "7–8 (severe)", "9–10 (very severe)", ...QUICK],
  },
  {
    id: "pattern",
    field: "pattern",
    prompt: () =>
      "Does anything make it better or worse? Any patterns you've noticed, time of day, activity, food, sleep?",
    placeholder: "e.g. Worse in the afternoon, better after rest",
    suggestions: ["No clear pattern", ...QUICK],
  },
  {
    id: "medications",
    field: "medications",
    prompt: () =>
      "Are you currently taking any medications, supplements, or treatments for this or anything else?",
    placeholder: "e.g. Ibuprofen as needed, daily vitamin D",
    suggestions: ["None", "Over-the-counter only", "Prescription medication", "Not applicable", ...QUICK],
  },
  {
    id: "allergies",
    field: "allergies",
    prompt: () => "Any known allergies, medications, foods, or environmental?",
    placeholder: "e.g. Penicillin, peanuts",
    suggestions: ["None known", "Not applicable", ...QUICK],
  },
  {
    id: "history",
    field: "history",
    prompt: () =>
      "Anything in your medical history that feels relevant, past conditions, surgeries, or family history?",
    placeholder: "e.g. Migraine in family history",
    suggestions: ["Nothing relevant", "Not applicable", ...QUICK],
  },
  {
    id: "goal",
    field: "goal",
    prompt: () =>
      "Last one, what would make this appointment feel successful to you? What do you hope to walk away with?",
    placeholder: "e.g. Understand what's causing this and a plan",
    suggestions: ["A clear plan", "Better understanding", "I'm not sure", "Skip for now"],
  },
];

// Emergency keyword detection
const EMERGENCY_PATTERNS: { keywords: string[]; reason: string }[] = [
  { keywords: ["chest pain", "chest pressure", "crushing chest"], reason: "Possible cardiac symptoms" },
  { keywords: ["suicid", "kill myself", "end my life", "self harm", "self-harm", "hurt myself"], reason: "Mental health crisis" },
  { keywords: ["can't breathe", "cant breathe", "trouble breathing", "difficulty breathing", "short of breath", "shortness of breath"], reason: "Breathing difficulty" },
  { keywords: ["stroke", "face drooping", "slurred speech", "numb on one side", "sudden weakness"], reason: "Possible stroke symptoms" },
  { keywords: ["bleeding heavily", "won't stop bleeding", "severe bleeding"], reason: "Severe bleeding" },
  { keywords: ["overdose", "poisoned"], reason: "Poisoning or overdose" },
  { keywords: ["passed out", "loss of consciousness", "unconscious", "fainted"], reason: "Loss of consciousness" },
  { keywords: ["allergic reaction", "anaphylaxis", "throat closing", "swelling tongue"], reason: "Possible severe allergic reaction" },
  { keywords: ["worst headache"], reason: "Sudden severe headache" },
];

export function detectEmergency(text: string): string | null {
  const lower = text.toLowerCase();
  for (const p of EMERGENCY_PATTERNS) {
    if (p.keywords.some((k) => lower.includes(k))) return p.reason;
  }
  return null;
}

// ---- Care setting recommendation (rule-based, non-diagnostic) ----

export type CareSetting =
  | "Family Doctor"
  | "Walk-in Clinic"
  | "Urgent Care"
  | "Emergency Room";

export type CareRecommendation = {
  setting: CareSetting;
  reason: string;
  isEmergency: boolean;
};

const RED_FLAGS = [
  "chest pain", "chest pressure",
  "trouble breathing", "difficulty breathing", "can't breathe", "cant breathe", "short of breath", "shortness of breath",
  "stroke", "face drooping", "slurred speech", "numb on one side", "sudden weakness",
  "suicid", "self harm", "self-harm", "kill myself", "end my life", "hurt myself",
  "severe bleeding", "bleeding heavily", "won't stop bleeding",
  "passed out", "loss of consciousness", "unconscious", "fainted",
  "allergic reaction", "anaphylaxis", "throat closing", "swelling tongue",
  "worst headache",
];

const URGENT = [
  "high fever", "fever of 103", "fever 104", "fever",
  "dehydrat",
  "vomiting repeatedly", "persistent vomit", "vomiting", "can't keep", "cant keep",
  "injury", "injured", "fall", "sprain", "possible broken", "broken bone", "broken",
  "infection", "infected",
  "worsening pain", "getting worse", "rapidly worse", "worse quickly",
  "dizziness", "dizzy",
  "fainting",
  "severe pain",
  "wheezing",
];

const WALKIN = [
  "sore throat", "cough", "cold symptom", "cold ", "flu symptom", "flu ",
  "rash",
  "ear pain", "ear ache", "earache",
  "pink eye",
  "minor pain", "small cut",
  "prescription refill", "refill",
  "mild infection",
];

const FAMILY = [
  "headache", "headaches", "migraine",
  "fatigue", "tired",
  "chronic", "recurring", "ongoing",
  "medication question",
  "follow-up", "follow up",
  "general health", "general", "checkup", "check up", "check-up",
];

function joined(a: IntakeAnswers): string {
  return Object.values(a).join(" ").toLowerCase();
}

function hitList(text: string, list: string[]): string | null {
  for (const k of list) if (text.includes(k)) return k;
  return null;
}

export function recommendCare(a: IntakeAnswers): CareRecommendation {
  const text = joined(a);

  const red = hitList(text, RED_FLAGS);
  if (red) {
    return {
      setting: "Emergency Room",
      reason: `You mentioned something that can be a red-flag symptom (e.g. "${red}"). For severe, sudden, or worsening symptoms, emergency care is the safest place to be evaluated. Informational guidance only, AEDNAV cannot determine the right care setting for you.`,
      isEmergency: true,
    };
  }

  const urgent = hitList(text, URGENT);
  if (urgent) {
    return {
      setting: "Urgent Care",
      reason: `Your description includes signs that often need same-day attention (e.g. "${urgent}"). Urgent care may be a care option to consider. Informational guidance only.`,
      isEmergency: false,
    };
  }

  const walkin = hitList(text, WALKIN);
  if (walkin) {
    return {
      setting: "Walk-in Clinic",
      reason: `What you described (e.g. "${walkin}") is something many people bring to a walk-in clinic, especially when a family doctor isn't available soon. Informational guidance only.`,
      isEmergency: false,
    };
  }

  const fam = hitList(text, FAMILY);
  if (fam) {
    return {
      setting: "Family Doctor",
      reason: `Your concerns sound non-urgent. Many people start with a family doctor or primary care provider for ongoing or recurring concerns. Informational guidance only.`,
      isEmergency: false,
    };
  }

  return {
    setting: "Family Doctor",
    reason: `No clear emergency keywords were detected in your answers. For non-urgent or ongoing concerns, many people start by contacting a family doctor, walk-in clinic, or primary care provider. If symptoms become severe, sudden, worsening, or concerning, seek urgent care or emergency support.`,
    isEmergency: false,
  };
}
