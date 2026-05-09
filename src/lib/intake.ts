// Mock intake script — placeholder for real AI integration
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

export const intakeSteps: IntakeStep[] = [
  {
    id: "concern",
    field: "concern",
    prompt: () =>
      "Hi — I'm AEDNAV. I'll help you organize what you're experiencing before your appointment. To start, what's been on your mind?",
    placeholder: "e.g. I've had headaches for 3 days...",
  },
  {
    id: "duration",
    field: "duration",
    prompt: (a) => `Thanks for sharing. How long has this been going on?`,
    placeholder: "e.g. About 3 days",
    suggestions: ["A few hours", "1–3 days", "About a week", "Several weeks", "Months"],
  },
  {
    id: "severity",
    field: "severity",
    prompt: () =>
      "On a scale of 1 to 10, how would you describe it at its worst — where 10 is the most intense you can imagine?",
    placeholder: "e.g. About a 6",
    suggestions: ["1–3 (mild)", "4–6 (moderate)", "7–8 (severe)", "9–10 (very severe)"],
  },
  {
    id: "pattern",
    field: "pattern",
    prompt: () =>
      "Does anything make it better or worse? Any patterns you've noticed — time of day, activity, food, sleep?",
    placeholder: "e.g. Worse in the afternoon, better after rest",
  },
  {
    id: "medications",
    field: "medications",
    prompt: () =>
      "Are you currently taking any medications, supplements, or treatments for this or anything else?",
    placeholder: "e.g. Ibuprofen as needed, daily vitamin D",
    suggestions: ["None", "Over-the-counter only", "Prescription medication"],
  },
  {
    id: "allergies",
    field: "allergies",
    prompt: () => "Any known allergies — medications, foods, or environmental?",
    placeholder: "e.g. Penicillin, peanuts",
    suggestions: ["None known"],
  },
  {
    id: "history",
    field: "history",
    prompt: () =>
      "Anything in your medical history that feels relevant — past conditions, surgeries, or family history?",
    placeholder: "e.g. Migraine in family history",
    suggestions: ["Nothing relevant"],
  },
  {
    id: "goal",
    field: "goal",
    prompt: () =>
      "Last one — what would make this appointment feel successful to you? What do you hope to walk away with?",
    placeholder: "e.g. Understand what's causing this and a plan",
  },
];

// Emergency keyword detection
const EMERGENCY_PATTERNS: { keywords: string[]; reason: string }[] = [
  { keywords: ["chest pain", "chest pressure", "crushing chest"], reason: "Possible cardiac symptoms" },
  { keywords: ["suicid", "kill myself", "end my life", "self harm", "hurt myself"], reason: "Mental health crisis" },
  { keywords: ["can't breathe", "cant breathe", "trouble breathing", "shortness of breath severe"], reason: "Breathing difficulty" },
  { keywords: ["stroke", "face drooping", "slurred speech", "numb on one side", "sudden weakness"], reason: "Possible stroke symptoms" },
  { keywords: ["bleeding heavily", "won't stop bleeding"], reason: "Severe bleeding" },
  { keywords: ["overdose", "poisoned"], reason: "Poisoning or overdose" },
];

export function detectEmergency(text: string): string | null {
  const lower = text.toLowerCase();
  for (const p of EMERGENCY_PATTERNS) {
    if (p.keywords.some((k) => lower.includes(k))) return p.reason;
  }
  return null;
}
