// Mock multilingual content for AEDNAV MVP.
// NOTE: Demo translations only, not professional medical translation.

export type LangCode = "en" | "fr" | "es" | "zh" | "pa" | "ur" | "ar";

export type LangConfig = {
  code: LangCode;
  label: string;       // English label
  native: string;      // Native label
  direction: "ltr" | "rtl";
};

export const LANGUAGES: LangConfig[] = [
  { code: "en", label: "English",  native: "English",   direction: "ltr" },
  { code: "fr", label: "French",   native: "Français",  direction: "ltr" },
  { code: "es", label: "Spanish",  native: "Español",   direction: "ltr" },
  { code: "zh", label: "Mandarin", native: "中文",       direction: "ltr" },
  { code: "pa", label: "Punjabi",  native: "ਪੰਜਾਬੀ",     direction: "ltr" },
  { code: "ur", label: "Urdu",     native: "اردو",      direction: "rtl" },
  { code: "ar", label: "Arabic",   native: "العربية",   direction: "rtl" },
];

export const STORAGE_LANG = "aednav.language";

export function getStoredLang(): LangCode {
  if (typeof window === "undefined") return "en";
  const v = sessionStorage.getItem(STORAGE_LANG) as LangCode | null;
  return v && LANGUAGES.some((l) => l.code === v) ? v : "en";
}

export function getLangConfig(code: LangCode): LangConfig {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export type IntakeFieldKey =
  | "concern" | "duration" | "severity" | "pattern"
  | "medications" | "allergies" | "history" | "goal";

export type IntakePromptSet = {
  intro: {
    eyebrow: string;
    title: string;
    bullets: string[];
    cta: string;
    note: string;
  };
  prompts: Record<IntakeFieldKey, string>;
  placeholders: Record<IntakeFieldKey, string>;
  suggestions: Record<IntakeFieldKey, string[]>;
  quickOptions: string[];
  composer: {
    placeholderFallback: string;
    sendAria: string;
    privacyNote: string;
    blocked: string;
    generating: string;
  };
  thankYou: string;
  emergencyBanner: {
    title: string;
    body: string;
    safe: string;
    disclaimer: string;
    call: string;
    text: string;
  };
  review: {
    eyebrow: string;
    title: string;
    body: string;
    cancel: string;
    generate: string;
    edit: string;
    save: string;
    cancelEdit: string;
    notProvided: string;
  };
  fieldLabels: Record<IntakeFieldKey, string>;
  patientSummary: {
    eyebrow: string;
    title: string;
    generated: string;
    sections: {
      keyDetails: string;
      mainConcern: string;
      timeline: string;
      meds: string;
      history: string;
      questions: string;
      careOption: string;
      goal: string;
    };
    keyDetailLabels: Record<"concern" | "duration" | "severity" | "pattern" | "medications" | "allergies", string>;
    questions: (concernShort: string) => string[];
    disclaimer: string;
    careInfoOnly: string;
  };
};


const EN: IntakePromptSet = {
  intro: {
    eyebrow: "Before you start",
    title: "A few things to know",
    bullets: [
      "AEDNAV helps organize your concerns before a healthcare visit.",
      "AEDNAV does not diagnose, treat, or replace a healthcare professional.",
      "If this is urgent or you may be in danger, call 911.",
    ],
    cta: "I understand, start intake",
    note: "Takes about 3 minutes. Your responses stay in this browser session.",
  },
  prompts: {
    concern: "Hi, I'm AEDNAV. I'll help you organize what you're experiencing before your appointment. To start, what's been on your mind?",
    duration: "Thanks for sharing. How long has this been going on?",
    severity: "On a scale of 1 to 10, how would you describe it at its worst, where 10 is the most intense you can imagine?",
    pattern: "Does anything make it better or worse? Any patterns you've noticed, time of day, activity, food, sleep?",
    medications: "Are you currently taking any medications, supplements, or treatments for this or anything else?",
    allergies: "Any known allergies, medications, foods, or environmental?",
    history: "Anything in your medical history that feels relevant, past conditions, surgeries, or family history?",
    goal: "Last one, what would make this appointment feel successful to you? What do you hope to walk away with?",
  },
  placeholders: {
    concern: "e.g. I've had headaches for 3 days...",
    duration: "e.g. About 3 days",
    severity: "e.g. About a 6",
    pattern: "e.g. Worse in the afternoon, better after rest",
    medications: "e.g. Ibuprofen as needed, daily vitamin D",
    allergies: "e.g. Penicillin, peanuts",
    history: "e.g. Migraine in family history",
    goal: "e.g. Understand what's causing this and a plan",
  },
  suggestions: {
    concern: [],
    duration: ["A few hours", "1 to 3 days", "About a week", "Several weeks", "Months"],
    severity: ["1 to 3 (mild)", "4 to 6 (moderate)", "7 to 8 (severe)", "9 to 10 (very severe)"],
    pattern: ["No clear pattern"],
    medications: ["Over-the-counter only", "Prescription medication"],
    allergies: ["None known"],
    history: ["Nothing relevant"],
    goal: ["A clear plan", "Better understanding"],
  },
  quickOptions: ["I am not sure", "None", "Not applicable", "Skip for now"],
  composer: {
    placeholderFallback: "Type a message...",
    sendAria: "Send",
    privacyNote: "Responses stay in this browser session. Press Enter to send.",
    blocked: "Please acknowledge the warning above to continue",
    generating: "Generating your summary...",
  },
  thankYou: "Thank you. Let's review your answers before I organize everything into a visit summary.",
  emergencyBanner: {
    title: "This may need urgent attention.",
    body: "AEDNAV is not designed for emergencies. Please contact emergency services or go to your nearest emergency department right away.",
    safe: "I'm safe, continue intake",
    disclaimer: "AEDNAV is not for emergencies. If this may be urgent, call 911 or seek immediate help.",
    call: "Call",
    text: "Text",
  },
  review: {
    eyebrow: "Review your answers",
    title: "Does this look right?",
    body: "You can edit anything before AEDNAV organizes it into a visit summary.",
    cancel: "Cancel",
    generate: "Generate visit summary",
    edit: "Edit",
    save: "Save",
    cancelEdit: "Cancel",
    notProvided: "Not provided",
  },
  fieldLabels: {
    concern: "Main concern",
    duration: "Duration",
    severity: "Severity",
    pattern: "Pattern & triggers",
    medications: "Current medications",
    allergies: "Known allergies",
    history: "Relevant history",
    goal: "Appointment goal",
  },
  patientSummary: {
    eyebrow: "Patient summary",
    title: "Your visit summary",
    generated: "Generated",
    sections: {
      keyDetails: "Key details",
      mainConcern: "Main concern",
      timeline: "Symptom timeline",
      meds: "Medications & allergies",
      history: "Relevant history",
      questions: "Questions to ask your provider",
      careOption: "Care option to consider",
      goal: "What you hope to walk away with",
    },
    keyDetailLabels: {
      concern: "Main concern",
      duration: "Started",
      severity: "Severity",
      pattern: "Pattern",
      medications: "Current medications",
      allergies: "Allergies",
    },
    questions: (c) => [
      `What might be causing my ${c}?`,
      "Are there tests or assessments that would help clarify this?",
      "What can I do at home in the meantime?",
      "When should I follow up, and what warning signs would mean I should come back sooner?",
    ],
    disclaimer:
      "This summary is for preparation and communication support only. It may contain errors and does not replace professional medical interpretation, medical advice, diagnosis, or treatment.",
    careInfoOnly:
      "Informational guidance only. AEDNAV cannot determine the right care setting for you.",
  },
};

const FR: IntakePromptSet = {
  intro: {
    eyebrow: "Avant de commencer",
    title: "Quelques points importants",
    bullets: [
      "AEDNAV aide à organiser vos préoccupations avant une consultation médicale.",
      "AEDNAV ne diagnostique pas, ne traite pas et ne remplace pas un professionnel de santé.",
      "Si la situation est urgente ou si vous êtes en danger, appelez le 911.",
    ],
    cta: "J'ai compris, commencer",
    note: "Environ 3 minutes. Vos réponses restent dans cette session.",
  },
  prompts: {
    concern: "Bonjour, je suis AEDNAV. Je vais vous aider à organiser ce que vous ressentez avant votre rendez-vous. Pour commencer, qu'est-ce qui vous préoccupe ?",
    duration: "Merci. Depuis combien de temps cela dure-t-il ?",
    severity: "Sur une échelle de 1 à 10, comment décririez-vous l'intensité au pire moment ?",
    pattern: "Y a-t-il des choses qui aggravent ou améliorent les symptômes ? Des moments de la journée, activités, alimentation, sommeil ?",
    medications: "Prenez-vous actuellement des médicaments, suppléments ou traitements ?",
    allergies: "Avez-vous des allergies connues, médicaments, aliments, environnement ?",
    history: "Y a-t-il des éléments médicaux pertinents, antécédents, chirurgies, histoire familiale ?",
    goal: "Dernière question, qu'attendez-vous de ce rendez-vous ?",
  },
  placeholders: {
    concern: "ex. J'ai des maux de tête depuis 3 jours...",
    duration: "ex. Environ 3 jours",
    severity: "ex. Environ 6",
    pattern: "ex. Pire l'après-midi, mieux après le repos",
    medications: "ex. Ibuprofène au besoin",
    allergies: "ex. Pénicilline, arachides",
    history: "ex. Migraines dans la famille",
    goal: "ex. Comprendre la cause et avoir un plan",
  },
  suggestions: {
    concern: [],
    duration: ["Quelques heures", "1 à 3 jours", "Environ une semaine", "Plusieurs semaines", "Des mois"],
    severity: ["1 à 3 (léger)", "4 à 6 (modéré)", "7 à 8 (sévère)", "9 à 10 (très sévère)"],
    pattern: ["Pas de schéma clair"],
    medications: ["En vente libre seulement", "Médicaments prescrits"],
    allergies: ["Aucune connue"],
    history: ["Rien de pertinent"],
    goal: ["Un plan clair", "Mieux comprendre"],
  },
  quickOptions: ["Je ne suis pas sûr·e", "Aucun(e)", "Non applicable", "Passer"],
  composer: {
    placeholderFallback: "Tapez un message...",
    sendAria: "Envoyer",
    privacyNote: "Vos réponses restent dans cette session. Appuyez sur Entrée pour envoyer.",
    blocked: "Veuillez confirmer l'avertissement ci-dessus pour continuer",
    generating: "Génération de votre résumé...",
  },
  thankYou: "Merci. Vérifions vos réponses avant d'organiser tout cela en résumé de visite.",
  emergencyBanner: {
    title: "Cela peut nécessiter une attention urgente.",
    body: "AEDNAV n'est pas conçu pour les urgences. Veuillez contacter les services d'urgence ou vous rendre immédiatement aux urgences.",
    safe: "Je suis en sécurité, continuer",
    disclaimer: "AEDNAV n'est pas conçu pour les urgences. En cas d'urgence, appelez le 911.",
    call: "Appeler",
    text: "Texter",
  },
  review: {
    eyebrow: "Vérifiez vos réponses",
    title: "Est-ce que cela vous semble juste ?",
    body: "Vous pouvez modifier vos réponses avant qu'AEDNAV ne génère le résumé.",
    cancel: "Annuler",
    generate: "Générer le résumé",
    edit: "Modifier",
    save: "Enregistrer",
    cancelEdit: "Annuler",
    notProvided: "Non renseigné",
  },
  fieldLabels: {
    concern: "Préoccupation principale",
    duration: "Durée",
    severity: "Intensité",
    pattern: "Schéma et déclencheurs",
    medications: "Médicaments actuels",
    allergies: "Allergies connues",
    history: "Antécédents pertinents",
    goal: "Objectif du rendez-vous",
  },
  patientSummary: {
    eyebrow: "Résumé patient",
    title: "Votre résumé de visite",
    generated: "Généré le",
    sections: {
      keyDetails: "Informations clés",
      mainConcern: "Préoccupation principale",
      timeline: "Chronologie des symptômes",
      meds: "Médicaments et allergies",
      history: "Antécédents pertinents",
      questions: "Questions à poser au professionnel",
      careOption: "Option de soins à considérer",
      goal: "Ce que vous espérez obtenir",
    },
    keyDetailLabels: {
      concern: "Préoccupation",
      duration: "Depuis",
      severity: "Intensité",
      pattern: "Schéma",
      medications: "Médicaments",
      allergies: "Allergies",
    },
    questions: (c) => [
      `Qu'est-ce qui pourrait causer mes ${c} ?`,
      "Y a-t-il des examens qui aideraient à clarifier la situation ?",
      "Que puis-je faire à la maison en attendant ?",
      "Quand devrais-je faire un suivi, et quels signes devraient m'inquiéter ?",
    ],
    disclaimer:
      "Ce résumé sert uniquement à la préparation et à la communication. Il peut contenir des erreurs et ne remplace pas l'interprétation médicale professionnelle, un avis médical, un diagnostic ou un traitement.",
    careInfoOnly:
      "Information à titre indicatif seulement. AEDNAV ne peut pas déterminer le bon cadre de soins pour vous.",
  },
};

const ES: IntakePromptSet = {
  intro: {
    eyebrow: "Antes de comenzar",
    title: "Algunas cosas importantes",
    bullets: [
      "AEDNAV ayuda a organizar tus inquietudes antes de una consulta médica.",
      "AEDNAV no diagnostica, no trata, ni reemplaza a un profesional de salud.",
      "Si es urgente o puedes estar en peligro, llama al 911.",
    ],
    cta: "Entiendo, comenzar",
    note: "Toma unos 3 minutos. Tus respuestas quedan en esta sesión del navegador.",
  },
  prompts: {
    concern: "Hola, soy AEDNAV. Te ayudaré a organizar lo que sientes antes de tu cita. Para empezar, ¿qué te preocupa?",
    duration: "Gracias por compartir. ¿Cuánto tiempo lleva ocurriendo esto?",
    severity: "En una escala del 1 al 10, ¿cómo describirías la intensidad en su peor momento?",
    pattern: "¿Algo lo mejora o lo empeora? ¿Algún patrón, hora del día, actividad, comida, sueño?",
    medications: "¿Estás tomando medicamentos, suplementos o tratamientos actualmente?",
    allergies: "¿Tienes alergias conocidas, medicamentos, alimentos o ambientales?",
    history: "¿Algo relevante en tu historia médica, condiciones, cirugías, antecedentes familiares?",
    goal: "Última, ¿qué te haría sentir que esta cita fue exitosa?",
  },
  placeholders: {
    concern: "ej. Tengo dolores de cabeza desde hace 3 días...",
    duration: "ej. Unos 3 días",
    severity: "ej. Como un 6",
    pattern: "ej. Peor por la tarde, mejor con descanso",
    medications: "ej. Ibuprofeno cuando lo necesito",
    allergies: "ej. Penicilina, maní",
    history: "ej. Migraña en la familia",
    goal: "ej. Entender la causa y tener un plan",
  },
  suggestions: {
    concern: [],
    duration: ["Unas horas", "1 a 3 días", "Una semana", "Varias semanas", "Meses"],
    severity: ["1 a 3 (leve)", "4 a 6 (moderado)", "7 a 8 (severo)", "9 a 10 (muy severo)"],
    pattern: ["Sin patrón claro"],
    medications: ["Solo de venta libre", "Medicamentos recetados"],
    allergies: ["Ninguna conocida"],
    history: ["Nada relevante"],
    goal: ["Un plan claro", "Mejor comprensión"],
  },
  quickOptions: ["No estoy seguro/a", "Ninguno", "No aplica", "Saltar"],
  composer: {
    placeholderFallback: "Escribe un mensaje...",
    sendAria: "Enviar",
    privacyNote: "Tus respuestas quedan en esta sesión. Presiona Enter para enviar.",
    blocked: "Por favor reconoce la advertencia para continuar",
    generating: "Generando tu resumen...",
  },
  thankYou: "Gracias. Revisemos tus respuestas antes de organizar el resumen.",
  emergencyBanner: {
    title: "Esto podría necesitar atención urgente.",
    body: "AEDNAV no está diseñado para emergencias. Por favor contacta servicios de emergencia o ve al departamento de emergencias más cercano.",
    safe: "Estoy a salvo, continuar",
    disclaimer: "AEDNAV no es para emergencias. Si es urgente, llama al 911.",
  },
  review: {
    eyebrow: "Revisa tus respuestas",
    title: "¿Esto se ve correcto?",
    body: "Puedes editar antes de que AEDNAV organice tu resumen.",
    cancel: "Cancelar",
    generate: "Generar resumen",
    edit: "Editar",
    save: "Guardar",
    cancelEdit: "Cancelar",
    notProvided: "No proporcionado",
  },
  fieldLabels: {
    concern: "Motivo principal",
    duration: "Duración",
    severity: "Intensidad",
    pattern: "Patrón y desencadenantes",
    medications: "Medicamentos actuales",
    allergies: "Alergias conocidas",
    history: "Historia relevante",
    goal: "Objetivo de la cita",
  },
  patientSummary: {
    eyebrow: "Resumen del paciente",
    title: "Tu resumen de visita",
    generated: "Generado",
    sections: {
      keyDetails: "Detalles clave",
      mainConcern: "Motivo principal",
      timeline: "Cronología de los síntomas",
      meds: "Medicamentos y alergias",
      history: "Historia relevante",
      questions: "Preguntas para tu profesional",
      careOption: "Opción de atención a considerar",
      goal: "Lo que esperas obtener",
    },
    keyDetailLabels: {
      concern: "Motivo",
      duration: "Desde",
      severity: "Intensidad",
      pattern: "Patrón",
      medications: "Medicamentos",
      allergies: "Alergias",
    },
    questions: (c) => [
      `¿Qué podría estar causando mis ${c}?`,
      "¿Hay exámenes que ayudarían a aclarar esto?",
      "¿Qué puedo hacer en casa mientras tanto?",
      "¿Cuándo debería volver a consultar y qué señales serían preocupantes?",
    ],
    disclaimer:
      "Este resumen es solo para preparación y apoyo a la comunicación. Puede contener errores y no reemplaza la interpretación médica profesional, el consejo médico, el diagnóstico ni el tratamiento.",
    careInfoOnly:
      "Información orientativa solamente. AEDNAV no puede determinar el entorno de atención adecuado para ti.",
  },
};

const ZH: IntakePromptSet = {
  intro: {
    eyebrow: "开始之前",
    title: "请先了解几点",
    bullets: [
      "AEDNAV 帮助您在就医前整理健康问题。",
      "AEDNAV 不进行诊断或治疗,也不能替代医疗专业人员。",
      "如果情况紧急或您可能处于危险中,请拨打 911。",
    ],
    cta: "我已了解, 开始",
    note: "大约 3 分钟。您的回答仅保存在此浏览器会话中。",
  },
  prompts: {
    concern: "您好, 我是 AEDNAV。我会帮您在就诊前整理您的情况。请先告诉我:您最近有什么不适?",
    duration: "谢谢。这种情况持续多久了?",
    severity: "1 到 10 分,最严重时您会打几分?(10 分最严重)",
    pattern: "什么会让症状加重或减轻?有规律吗, 时间、活动、饮食、睡眠?",
    medications: "您目前在服用任何药物、补充剂或治疗吗?",
    allergies: "您有已知的过敏吗, 药物、食物或环境?",
    history: "您的病史中有相关的情况吗, 既往疾病、手术、家族史?",
    goal: "最后一个问题, 您希望从这次就诊中获得什么?",
  },
  placeholders: {
    concern: "例如:头痛已经 3 天了...",
    duration: "例如:约 3 天",
    severity: "例如:大约 6 分",
    pattern: "例如:下午加重,休息后好转",
    medications: "例如:必要时服用布洛芬",
    allergies: "例如:青霉素、花生",
    history: "例如:家族有偏头痛史",
    goal: "例如:了解原因并获得方案",
  },
  suggestions: {
    concern: [],
    duration: ["几小时", "1 到 3 天", "约一周", "几周", "几个月"],
    severity: ["1 到 3(轻)", "4 到 6(中)", "7 到 8(重)", "9 到 10(非常严重)"],
    pattern: ["没有明显规律"],
    medications: ["仅非处方药", "处方药"],
    allergies: ["无已知过敏"],
    history: ["无相关情况"],
    goal: ["明确的方案", "更好的理解"],
  },
  quickOptions: ["我不确定", "无", "不适用", "跳过"],
  composer: {
    placeholderFallback: "输入消息...",
    sendAria: "发送",
    privacyNote: "回答仅保存在此会话中。按 Enter 发送。",
    blocked: "请先确认上方提示以继续",
    generating: "正在生成摘要...",
  },
  thankYou: "谢谢。我们先核对一下您的回答,再生成就诊摘要。",
  emergencyBanner: {
    title: "这可能需要紧急关注。",
    body: "AEDNAV 不适用于紧急情况。请联系紧急服务或立即前往最近的急诊。",
    safe: "我很安全, 继续",
    disclaimer: "AEDNAV 不适用于紧急情况。如有紧急情况,请拨打 911。",
  },
  review: {
    eyebrow: "核对您的回答",
    title: "这些信息正确吗?",
    body: "在生成摘要前,您可以修改任何内容。",
    cancel: "取消",
    generate: "生成就诊摘要",
    edit: "编辑",
    save: "保存",
    cancelEdit: "取消",
    notProvided: "未提供",
  },
  fieldLabels: {
    concern: "主要问题",
    duration: "持续时间",
    severity: "严重程度",
    pattern: "规律与诱因",
    medications: "目前用药",
    allergies: "已知过敏",
    history: "相关病史",
    goal: "就诊目标",
  },
  patientSummary: {
    eyebrow: "患者摘要",
    title: "您的就诊摘要",
    generated: "生成于",
    sections: {
      keyDetails: "关键信息",
      mainConcern: "主要问题",
      timeline: "症状时间线",
      meds: "药物与过敏",
      history: "相关病史",
      questions: "可向医生提出的问题",
      careOption: "可考虑的就医选项",
      goal: "您希望达成的目标",
    },
    keyDetailLabels: {
      concern: "主要问题",
      duration: "起始",
      severity: "严重程度",
      pattern: "规律",
      medications: "用药",
      allergies: "过敏",
    },
    questions: (c) => [
      `我的${c}可能是什么原因引起的?`,
      "是否有检查或评估可以帮助明确情况?",
      "在此期间我在家可以做什么?",
      "我应该何时复诊?出现什么症状需要尽早就医?",
    ],
    disclaimer:
      "此摘要仅用于准备和沟通支持。可能包含错误,不能替代专业医疗翻译、医疗建议、诊断或治疗。",
    careInfoOnly: "仅供参考。AEDNAV 无法为您确定合适的就医方式。",
  },
};

const PA: IntakePromptSet = {
  intro: {
    eyebrow: "ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ",
    title: "ਕੁਝ ਜਾਣਨ ਵਾਲੀਆਂ ਗੱਲਾਂ",
    bullets: [
      "AEDNAV ਡਾਕਟਰ ਕੋਲ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਡੀਆਂ ਚਿੰਤਾਵਾਂ ਨੂੰ ਵਿਵਸਥਿਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
      "AEDNAV ਜਾਂਚ ਜਾਂ ਇਲਾਜ ਨਹੀਂ ਕਰਦਾ ਅਤੇ ਡਾਕਟਰੀ ਮਾਹਰ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ।",
      "ਜੇ ਇਹ ਜ਼ਰੂਰੀ ਹੈ ਜਾਂ ਤੁਸੀਂ ਖ਼ਤਰੇ ਵਿੱਚ ਹੋ ਸਕਦੇ ਹੋ, 911 ਤੇ ਕਾਲ ਕਰੋ।",
    ],
    cta: "ਮੈਂ ਸਮਝ ਲਿਆ, ਸ਼ੁਰੂ ਕਰੋ",
    note: "ਲਗਭਗ 3 ਮਿੰਟ। ਤੁਹਾਡੇ ਜਵਾਬ ਇਸੇ ਸੈਸ਼ਨ ਵਿੱਚ ਰਹਿੰਦੇ ਹਨ।",
  },
  prompts: {
    concern: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ AEDNAV ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਮੁਲਾਕਾਤ ਤੋਂ ਪਹਿਲਾਂ ਚੀਜ਼ਾਂ ਨੂੰ ਵਿਵਸਥਿਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗਾ। ਸ਼ੁਰੂ ਕਰੀਏ, ਤੁਹਾਨੂੰ ਕੀ ਪਰੇਸ਼ਾਨੀ ਹੈ?",
    duration: "ਧੰਨਵਾਦ। ਇਹ ਕਿੰਨੇ ਸਮੇਂ ਤੋਂ ਹੋ ਰਿਹਾ ਹੈ?",
    severity: "1 ਤੋਂ 10 ਦੇ ਪੈਮਾਨੇ ਤੇ, ਸਭ ਤੋਂ ਵੱਧ ਤੀਬਰਤਾ ਕਿੰਨੀ ਸੀ?",
    pattern: "ਕੀ ਕੁਝ ਇਸਨੂੰ ਵਧਾਉਂਦਾ ਜਾਂ ਘਟਾਉਂਦਾ ਹੈ? ਕੋਈ ਸਮੇਂ, ਗਤੀਵਿਧੀ, ਖਾਣੇ, ਨੀਂਦ ਨਾਲ ਸਬੰਧ?",
    medications: "ਕੀ ਤੁਸੀਂ ਇਸ ਸਮੇਂ ਕੋਈ ਦਵਾਈਆਂ ਜਾਂ ਇਲਾਜ ਲੈ ਰਹੇ ਹੋ?",
    allergies: "ਕੋਈ ਜਾਣੀ ਅਲਰਜੀ, ਦਵਾਈਆਂ, ਖਾਣਾ, ਜਾਂ ਵਾਤਾਵਰਣ?",
    history: "ਤੁਹਾਡੀ ਡਾਕਟਰੀ ਇਤਿਹਾਸ ਵਿੱਚ ਕੋਈ ਸਬੰਧਿਤ ਗੱਲ, ਪਿਛਲੇ ਰੋਗ, ਸਰਜਰੀ, ਪਰਿਵਾਰਕ ਇਤਿਹਾਸ?",
    goal: "ਆਖਰੀ ਸਵਾਲ, ਤੁਸੀਂ ਇਸ ਮੁਲਾਕਾਤ ਤੋਂ ਕੀ ਚਾਹੁੰਦੇ ਹੋ?",
  },
  placeholders: {
    concern: "ਜਿਵੇਂ: 3 ਦਿਨਾਂ ਤੋਂ ਸਿਰ ਦਰਦ ਹੈ...",
    duration: "ਜਿਵੇਂ: ਲਗਭਗ 3 ਦਿਨ",
    severity: "ਜਿਵੇਂ: ਲਗਭਗ 6",
    pattern: "ਜਿਵੇਂ: ਦੁਪਹਿਰ ਨੂੰ ਜ਼ਿਆਦਾ, ਆਰਾਮ ਨਾਲ ਘੱਟ",
    medications: "ਜਿਵੇਂ: ਲੋੜ ਪੈਣ 'ਤੇ ਆਈਬਿਊਪ੍ਰੋਫਿਨ",
    allergies: "ਜਿਵੇਂ: ਪੈਨਿਸਿਲਿਨ, ਮੂੰਗਫਲੀ",
    history: "ਜਿਵੇਂ: ਪਰਿਵਾਰ ਵਿੱਚ ਮਾਈਗ੍ਰੇਨ",
    goal: "ਜਿਵੇਂ: ਕਾਰਨ ਸਮਝਣਾ ਅਤੇ ਯੋਜਨਾ",
  },
  suggestions: {
    concern: [],
    duration: ["ਕੁਝ ਘੰਟੇ", "1 ਤੋਂ 3 ਦਿਨ", "ਲਗਭਗ ਇੱਕ ਹਫ਼ਤਾ", "ਕਈ ਹਫ਼ਤੇ", "ਮਹੀਨੇ"],
    severity: ["1 ਤੋਂ 3 (ਹਲਕਾ)", "4 ਤੋਂ 6 (ਮੱਧਮ)", "7 ਤੋਂ 8 (ਗੰਭੀਰ)", "9 ਤੋਂ 10 (ਬਹੁਤ ਗੰਭੀਰ)"],
    pattern: ["ਕੋਈ ਸਪਸ਼ਟ ਨਮੂਨਾ ਨਹੀਂ"],
    medications: ["ਸਿਰਫ਼ ਓਟੀਸੀ", "ਡਾਕਟਰੀ ਨੁਸਖ਼ਾ"],
    allergies: ["ਕੋਈ ਜਾਣੀ ਨਹੀਂ"],
    history: ["ਕੁਝ ਸਬੰਧਿਤ ਨਹੀਂ"],
    goal: ["ਸਪੱਸ਼ਟ ਯੋਜਨਾ", "ਬਿਹਤਰ ਸਮਝ"],
  },
  quickOptions: ["ਮੈਨੂੰ ਪਤਾ ਨਹੀਂ", "ਕੋਈ ਨਹੀਂ", "ਲਾਗੂ ਨਹੀਂ", "ਛੱਡੋ"],
  composer: {
    placeholderFallback: "ਸੁਨੇਹਾ ਲਿਖੋ...",
    sendAria: "ਭੇਜੋ",
    privacyNote: "ਜਵਾਬ ਇਸੇ ਸੈਸ਼ਨ ਵਿੱਚ ਰਹਿੰਦੇ ਹਨ। ਭੇਜਣ ਲਈ Enter ਦਬਾਓ।",
    blocked: "ਜਾਰੀ ਰੱਖਣ ਲਈ ਉਪਰਲੀ ਚੇਤਾਵਨੀ ਨੂੰ ਮੰਨੋ",
    generating: "ਤੁਹਾਡਾ ਸਾਰ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
  },
  thankYou: "ਧੰਨਵਾਦ। ਸਾਰ ਤਿਆਰ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੇ ਜਵਾਬਾਂ ਦੀ ਸਮੀਖਿਆ ਕਰੀਏ।",
  emergencyBanner: {
    title: "ਇਸ ਨੂੰ ਤੁਰੰਤ ਧਿਆਨ ਦੀ ਲੋੜ ਹੋ ਸਕਦੀ ਹੈ।",
    body: "AEDNAV ਐਮਰਜੈਂਸੀ ਲਈ ਨਹੀਂ ਬਣਾਇਆ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    safe: "ਮੈਂ ਠੀਕ ਹਾਂ, ਜਾਰੀ ਰੱਖੋ",
    disclaimer: "AEDNAV ਐਮਰਜੈਂਸੀ ਲਈ ਨਹੀਂ ਹੈ। ਜੇ ਜ਼ਰੂਰੀ ਹੋਵੇ, 911 ਤੇ ਕਾਲ ਕਰੋ।",
  },
  review: {
    eyebrow: "ਆਪਣੇ ਜਵਾਬਾਂ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
    title: "ਕੀ ਇਹ ਠੀਕ ਲੱਗਦਾ ਹੈ?",
    body: "ਸਾਰ ਤਿਆਰ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਸੀਂ ਕੁਝ ਵੀ ਬਦਲ ਸਕਦੇ ਹੋ।",
    cancel: "ਰੱਦ ਕਰੋ",
    generate: "ਮੁਲਾਕਾਤ ਸਾਰ ਤਿਆਰ ਕਰੋ",
    edit: "ਸੋਧੋ",
    save: "ਸੰਭਾਲੋ",
    cancelEdit: "ਰੱਦ ਕਰੋ",
    notProvided: "ਨਹੀਂ ਦਿੱਤਾ",
  },
  fieldLabels: {
    concern: "ਮੁੱਖ ਚਿੰਤਾ",
    duration: "ਮਿਆਦ",
    severity: "ਤੀਬਰਤਾ",
    pattern: "ਨਮੂਨਾ ਅਤੇ ਟਰਿੱਗਰ",
    medications: "ਮੌਜੂਦਾ ਦਵਾਈਆਂ",
    allergies: "ਜਾਣੀਆਂ ਅਲਰਜੀਆਂ",
    history: "ਸਬੰਧਿਤ ਇਤਿਹਾਸ",
    goal: "ਮੁਲਾਕਾਤ ਦਾ ਮਕਸਦ",
  },
  patientSummary: {
    eyebrow: "ਮਰੀਜ਼ ਦਾ ਸਾਰ",
    title: "ਤੁਹਾਡਾ ਮੁਲਾਕਾਤ ਸਾਰ",
    generated: "ਤਿਆਰ ਕੀਤਾ ਗਿਆ",
    sections: {
      keyDetails: "ਮੁੱਖ ਜਾਣਕਾਰੀ",
      mainConcern: "ਮੁੱਖ ਚਿੰਤਾ",
      timeline: "ਲੱਛਣਾਂ ਦਾ ਸਮਾਂ",
      meds: "ਦਵਾਈਆਂ ਅਤੇ ਅਲਰਜੀਆਂ",
      history: "ਸਬੰਧਿਤ ਇਤਿਹਾਸ",
      questions: "ਡਾਕਟਰ ਨੂੰ ਪੁੱਛਣ ਵਾਲੇ ਸਵਾਲ",
      careOption: "ਵਿਚਾਰਨ ਲਈ ਦੇਖਭਾਲ ਵਿਕਲਪ",
      goal: "ਤੁਸੀਂ ਕੀ ਪ੍ਰਾਪਤ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ",
    },
    keyDetailLabels: {
      concern: "ਚਿੰਤਾ",
      duration: "ਸ਼ੁਰੂਆਤ",
      severity: "ਤੀਬਰਤਾ",
      pattern: "ਨਮੂਨਾ",
      medications: "ਦਵਾਈਆਂ",
      allergies: "ਅਲਰਜੀਆਂ",
    },
    questions: (c) => [
      `ਮੇਰੇ ${c} ਦਾ ਕੀ ਕਾਰਨ ਹੋ ਸਕਦਾ ਹੈ?`,
      "ਕੀ ਕੋਈ ਟੈਸਟ ਇਸਨੂੰ ਸਪੱਸ਼ਟ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ?",
      "ਉਦੋਂ ਤੱਕ ਮੈਂ ਘਰ ਵਿੱਚ ਕੀ ਕਰ ਸਕਦਾ ਹਾਂ?",
      "ਮੈਨੂੰ ਫਾਲੋ-ਅੱਪ ਕਦੋਂ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ ਅਤੇ ਕਿਹੜੇ ਚਿੰਨ੍ਹ ਚਿੰਤਾ ਵਾਲੇ ਹਨ?",
    ],
    disclaimer:
      "ਇਹ ਸਾਰ ਸਿਰਫ਼ ਤਿਆਰੀ ਅਤੇ ਸੰਚਾਰ ਲਈ ਹੈ। ਇਸ ਵਿੱਚ ਗਲਤੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ ਅਤੇ ਇਹ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਅਨੁਵਾਦ, ਸਲਾਹ, ਜਾਂਚ ਜਾਂ ਇਲਾਜ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ।",
    careInfoOnly: "ਸਿਰਫ਼ ਜਾਣਕਾਰੀ ਲਈ। AEDNAV ਤੁਹਾਡੇ ਲਈ ਸਹੀ ਦੇਖਭਾਲ ਸੈਟਿੰਗ ਨਿਰਧਾਰਤ ਨਹੀਂ ਕਰ ਸਕਦਾ।",
  },
};

const AR: IntakePromptSet = {
  intro: {
    eyebrow: "قبل أن تبدأ",
    title: "بضعة أمور يجب معرفتها",
    bullets: [
      "يساعدك AEDNAV على تنظيم مخاوفك الصحية قبل زيارة الطبيب.",
      "AEDNAV لا يُشخّص ولا يُعالج ولا يحل محل المختصين الصحيين.",
      "إذا كان الأمر عاجلاً أو كنت في خطر، اتصل بـ 911.",
    ],
    cta: "فهمت, ابدأ",
    note: "حوالي 3 دقائق. تبقى إجاباتك في هذه الجلسة فقط.",
  },
  prompts: {
    concern: "مرحباً, أنا AEDNAV. سأساعدك على تنظيم ما تشعر به قبل موعدك. للبدء: ما الذي يقلقك؟",
    duration: "شكراً لمشاركتك. منذ متى وأنت تعاني من هذا؟",
    severity: "على مقياس من 1 إلى 10، كيف تصف الشدة في أسوأ حالاتها؟",
    pattern: "هل هناك ما يخفف الأعراض أو يزيدها؟ أي نمط, وقت اليوم، النشاط، الطعام، النوم؟",
    medications: "هل تتناول حالياً أي أدوية أو مكملات أو علاجات؟",
    allergies: "هل لديك حساسية معروفة, أدوية أو أطعمة أو بيئية؟",
    history: "هل في تاريخك الطبي شيء مهم, أمراض سابقة، عمليات، تاريخ عائلي؟",
    goal: "السؤال الأخير, ماذا تتمنى أن تحصل عليه من هذا الموعد؟",
  },
  placeholders: {
    concern: "مثال: أعاني من الصداع منذ 3 أيام...",
    duration: "مثال: حوالي 3 أيام",
    severity: "مثال: حوالي 6",
    pattern: "مثال: يزداد بعد الظهر، يخف بعد الراحة",
    medications: "مثال: إيبوبروفين عند الحاجة",
    allergies: "مثال: البنسلين، الفول السوداني",
    history: "مثال: تاريخ عائلي للصداع النصفي",
    goal: "مثال: فهم السبب ووضع خطة",
  },
  suggestions: {
    concern: [],
    duration: ["بضع ساعات", "1 إلى 3 أيام", "حوالي أسبوع", "عدة أسابيع", "أشهر"],
    severity: ["1 إلى 3 (خفيف)", "4 إلى 6 (متوسط)", "7 إلى 8 (شديد)", "9 إلى 10 (شديد جداً)"],
    pattern: ["لا يوجد نمط واضح"],
    medications: ["بدون وصفة فقط", "أدوية موصوفة"],
    allergies: ["لا توجد"],
    history: ["لا شيء ذو صلة"],
    goal: ["خطة واضحة", "فهم أفضل"],
  },
  quickOptions: ["لست متأكداً", "لا شيء", "غير منطبق", "تخطي"],
  composer: {
    placeholderFallback: "اكتب رسالة...",
    sendAria: "إرسال",
    privacyNote: "تبقى الإجابات في هذه الجلسة فقط. اضغط Enter للإرسال.",
    blocked: "يرجى الإقرار بالتحذير أعلاه للمتابعة",
    generating: "جارٍ إنشاء ملخصك...",
  },
  thankYou: "شكراً. لنراجع إجاباتك قبل تنظيم ملخص الزيارة.",
  emergencyBanner: {
    title: "قد يحتاج هذا إلى اهتمام عاجل.",
    body: "AEDNAV غير مصمم للحالات الطارئة. يرجى الاتصال بخدمات الطوارئ أو الذهاب فوراً إلى أقرب قسم طوارئ.",
    safe: "أنا بأمان, تابع",
    disclaimer: "AEDNAV ليس للحالات الطارئة. إن كان الأمر عاجلاً، اتصل بـ 911.",
  },
  review: {
    eyebrow: "راجع إجاباتك",
    title: "هل يبدو هذا صحيحاً؟",
    body: "يمكنك تعديل أي شيء قبل أن ينظم AEDNAV ملخص الزيارة.",
    cancel: "إلغاء",
    generate: "إنشاء ملخص الزيارة",
    edit: "تعديل",
    save: "حفظ",
    cancelEdit: "إلغاء",
    notProvided: "غير مذكور",
  },
  fieldLabels: {
    concern: "الشكوى الرئيسية",
    duration: "المدة",
    severity: "الشدة",
    pattern: "النمط والمحفزات",
    medications: "الأدوية الحالية",
    allergies: "الحساسية المعروفة",
    history: "التاريخ ذو الصلة",
    goal: "هدف الموعد",
  },
  patientSummary: {
    eyebrow: "ملخص المريض",
    title: "ملخص زيارتك",
    generated: "تم الإنشاء في",
    sections: {
      keyDetails: "التفاصيل الأساسية",
      mainConcern: "الشكوى الرئيسية",
      timeline: "تسلسل الأعراض",
      meds: "الأدوية والحساسية",
      history: "التاريخ ذو الصلة",
      questions: "أسئلة لطرحها على الطبيب",
      careOption: "خيار رعاية للنظر فيه",
      goal: "ما تأمل في الحصول عليه",
    },
    keyDetailLabels: {
      concern: "الشكوى",
      duration: "بدأت",
      severity: "الشدة",
      pattern: "النمط",
      medications: "الأدوية",
      allergies: "الحساسية",
    },
    questions: (c) => [
      `ما الذي قد يسبب ${c}؟`,
      "هل هناك فحوصات يمكن أن تساعد في توضيح الأمر؟",
      "ماذا يمكنني فعله في المنزل في الوقت الحالي؟",
      "متى يجب أن أعود للمتابعة، وما العلامات التي تستدعي القلق؟",
    ],
    disclaimer:
      "هذا الملخص لأغراض التحضير ودعم التواصل فقط. قد يحتوي على أخطاء ولا يحل محل الترجمة الطبية المتخصصة أو المشورة أو التشخيص أو العلاج.",
    careInfoOnly: "إرشادات معلوماتية فقط. لا يستطيع AEDNAV تحديد إعداد الرعاية المناسب لك.",
  },
};

const UR: IntakePromptSet = {
  intro: {
    eyebrow: "شروع کرنے سے پہلے",
    title: "چند اہم باتیں",
    bullets: [
      "AEDNAV آپ کو صحت کی ملاقات سے پہلے اپنی پریشانیوں کو منظم کرنے میں مدد کرتا ہے۔",
      "AEDNAV تشخیص یا علاج نہیں کرتا اور صحت کے پیشہ ور افراد کا متبادل نہیں ہے۔",
      "اگر یہ ضروری ہے یا آپ خطرے میں ہو سکتے ہیں، 911 پر کال کریں۔",
    ],
    cta: "میں سمجھ گیا, شروع کریں",
    note: "تقریباً 3 منٹ۔ آپ کے جوابات صرف اس سیشن میں محفوظ ہیں۔",
  },
  prompts: {
    concern: "السلام علیکم, میں AEDNAV ہوں۔ میں آپ کی ملاقات سے پہلے آپ کی صورتحال کو منظم کرنے میں مدد کروں گا۔ شروع میں, آپ کو کیا پریشانی ہے؟",
    duration: "شکریہ۔ یہ کب سے ہو رہا ہے؟",
    severity: "1 سے 10 کے پیمانے پر، بدترین حالت میں شدت کیا تھی؟",
    pattern: "کیا کوئی چیز اسے بہتر یا بدتر بناتی ہے؟ کوئی پیٹرن, وقت، سرگرمی، کھانا، نیند؟",
    medications: "کیا آپ فی الحال کوئی دوائیں، سپلیمنٹس یا علاج لے رہے ہیں؟",
    allergies: "کوئی معروف الرجی, دوائیں، کھانے یا ماحولیاتی؟",
    history: "آپ کی طبی تاریخ میں کوئی متعلقہ بات, ماضی کی بیماریاں، سرجری، خاندانی تاریخ؟",
    goal: "آخری سوال, آپ اس ملاقات سے کیا حاصل کرنا چاہتے ہیں؟",
  },
  placeholders: {
    concern: "مثال: 3 دن سے سر درد ہے...",
    duration: "مثال: تقریباً 3 دن",
    severity: "مثال: تقریباً 6",
    pattern: "مثال: دوپہر میں بدتر، آرام سے بہتر",
    medications: "مثال: ضرورت پر آئبوپروفن",
    allergies: "مثال: پینسلین، مونگ پھلی",
    history: "مثال: خاندان میں مائگرین کی تاریخ",
    goal: "مثال: وجہ سمجھنا اور منصوبہ",
  },
  suggestions: {
    concern: [],
    duration: ["چند گھنٹے", "1 سے 3 دن", "تقریباً ایک ہفتہ", "کئی ہفتے", "مہینے"],
    severity: ["1 سے 3 (ہلکا)", "4 سے 6 (درمیانہ)", "7 سے 8 (شدید)", "9 سے 10 (بہت شدید)"],
    pattern: ["کوئی واضح پیٹرن نہیں"],
    medications: ["صرف OTC", "نسخہ شدہ دوا"],
    allergies: ["کوئی معلوم نہیں"],
    history: ["کوئی متعلقہ نہیں"],
    goal: ["واضح منصوبہ", "بہتر سمجھ"],
  },
  quickOptions: ["مجھے یقین نہیں", "کوئی نہیں", "لاگو نہیں", "چھوڑ دیں"],
  composer: {
    placeholderFallback: "پیغام لکھیں...",
    sendAria: "بھیجیں",
    privacyNote: "جوابات اس سیشن میں رہتے ہیں۔ بھیجنے کے لیے Enter دبائیں۔",
    blocked: "جاری رکھنے کے لیے اوپر کی انتباہ کو تسلیم کریں",
    generating: "آپ کا خلاصہ تیار کیا جا رہا ہے...",
  },
  thankYou: "شکریہ۔ خلاصہ تیار کرنے سے پہلے آپ کے جوابات کا جائزہ لیتے ہیں۔",
  emergencyBanner: {
    title: "اس کو فوری توجہ کی ضرورت ہو سکتی ہے۔",
    body: "AEDNAV ایمرجنسی کے لیے نہیں بنایا گیا۔ براہ کرم ایمرجنسی خدمات سے رابطہ کریں یا قریبی ایمرجنسی روم میں جائیں۔",
    safe: "میں محفوظ ہوں, جاری رکھیں",
    disclaimer: "AEDNAV ایمرجنسی کے لیے نہیں ہے۔ اگر یہ ضروری ہو تو 911 پر کال کریں۔",
  },
  review: {
    eyebrow: "اپنے جوابات کا جائزہ لیں",
    title: "کیا یہ صحیح لگتا ہے؟",
    body: "خلاصہ تیار ہونے سے پہلے آپ کوئی بھی چیز تبدیل کر سکتے ہیں۔",
    cancel: "منسوخ کریں",
    generate: "ملاقات کا خلاصہ تیار کریں",
    edit: "ترمیم",
    save: "محفوظ کریں",
    cancelEdit: "منسوخ کریں",
    notProvided: "فراہم نہیں کیا گیا",
  },
  fieldLabels: {
    concern: "بنیادی شکایت",
    duration: "مدت",
    severity: "شدت",
    pattern: "پیٹرن اور محرکات",
    medications: "موجودہ دوائیں",
    allergies: "معروف الرجیاں",
    history: "متعلقہ تاریخ",
    goal: "ملاقات کا مقصد",
  },
  patientSummary: {
    eyebrow: "مریض کا خلاصہ",
    title: "آپ کا ملاقات کا خلاصہ",
    generated: "تیار کیا گیا",
    sections: {
      keyDetails: "اہم تفصیلات",
      mainConcern: "بنیادی شکایت",
      timeline: "علامات کا سلسلہ",
      meds: "دوائیں اور الرجیاں",
      history: "متعلقہ تاریخ",
      questions: "ڈاکٹر سے پوچھنے کے سوالات",
      careOption: "غور کرنے کے لیے دیکھ بھال کا اختیار",
      goal: "آپ کیا حاصل کرنا چاہتے ہیں",
    },
    keyDetailLabels: {
      concern: "شکایت",
      duration: "شروع",
      severity: "شدت",
      pattern: "پیٹرن",
      medications: "دوائیں",
      allergies: "الرجیاں",
    },
    questions: (c) => [
      `میرے ${c} کی کیا وجہ ہو سکتی ہے؟`,
      "کیا کوئی ٹیسٹ اس کو واضح کرنے میں مدد کر سکتے ہیں؟",
      "اس دوران میں گھر میں کیا کر سکتا ہوں؟",
      "مجھے کب فالو اپ کرنا چاہیے، اور کن علامات پر فکر کرنی چاہیے؟",
    ],
    disclaimer:
      "یہ خلاصہ صرف تیاری اور رابطے کی مدد کے لیے ہے۔ اس میں غلطیاں ہو سکتی ہیں اور یہ پیشہ ورانہ طبی ترجمانی، طبی مشورے، تشخیص یا علاج کا متبادل نہیں ہے۔",
    careInfoOnly: "صرف معلوماتی رہنمائی۔ AEDNAV آپ کے لیے صحیح دیکھ بھال کی ترتیب کا تعین نہیں کر سکتا۔",
  },
};

export const TRANSLATIONS: Record<LangCode, IntakePromptSet> = {
  en: EN, fr: FR, es: ES, zh: ZH, pa: PA, ur: UR, ar: AR,
};

export function t(lang: LangCode): IntakePromptSet {
  return TRANSLATIONS[lang] ?? EN;
}
