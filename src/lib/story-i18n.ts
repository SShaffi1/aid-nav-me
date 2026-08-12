// Scroll-story (landing page scene) translations for AEDNAV.
// Demo translations only. Not professional medical translation.
import type { LangCode } from "./i18n";

export type StoryContent = {
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    sub: string;
    primary: string;
    secondary: string;
    note: string;
  };
  problem: {
    title: string;
    sub: string;
    lines: [string, string, string];
    closeTitle: string;
    closeSub: string;
  };
  conversation: {
    title: string;
    sub: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
  };
  languages: {
    title: string;
    sub: string;
    finalPill: string;
    note: string;
  };
  summaries: {
    title: string;
    sub: string;
    patientLabel: string;
    patientTitle: string;
    patient: { label: string; value: string }[];
    suggested: string;
    providerLabel: string;
    providerTitle: string;
    provider: { label: string; value: string }[];
    providerNote: string;
    foot: string;
  };
  features: {
    title: string;
    sub: string;
    items: { title: string; body: string }[];
  };
  audience: {
    title: string;
    sub: string;
    items: { t: string; b: string }[];
  };
  roadmap: {
    title: string;
    sub: string;
    comingSoon: string;
    trust: { t: string; b: string }[];
    soon: { t: string; b: string }[];
  };
  mission: {
    quote: string;
    attribution: string;
    stats: { n: string; l: string }[];
  };
  cta: { title: string; sub: string; button: string; note: string };
  faqTitle: string;
};

const EN: StoryContent = {
  hero: {
    eyebrow: "Pre-appointment intake · 3 minutes · 7 languages",
    title1: "Walk into your appointment",
    title2: "ready for anything.",
    sub: "AEDNAV guides you through your symptoms before you see a doctor, so you remember what to say, nothing gets missed, and your doctor gets a clear picture from the moment you walk in.",
    primary: "Prepare for my appointment",
    secondary: "See how it works",
    note: "Not a diagnostic tool. Always consult a healthcare professional.",
  },
  problem: {
    title: "You know something is wrong.",
    sub: "But when the doctor asks, the words don't come out right.",
    lines: [
      "You forget half of what you wanted to say.",
      "You leave out details that mattered.",
      "You walk out wondering if they got the full picture.",
    ],
    closeTitle: "Most appointments start underprepared.",
    closeSub: "AEDNAV changes that, for everyone.",
  },
  conversation: {
    title: "It starts with a conversation.",
    sub: "8 guided questions. Plain language. No medical jargon. Takes about 3 minutes.",
    q1: "What's been on your mind before this appointment?",
    a1: "I've had really bad headaches for 3 days now. Way worse in the afternoons.",
    q2: "How would you rate the pain from 1 to 10?",
    a2: "Probably a 6. Painkillers aren't touching it.",
  },
  languages: {
    title: "And you can answer in any language.",
    sub: "Because struggling with English shouldn't mean struggling to explain your health. AEDNAV supports 7 languages.",
    finalPill: "I've had a headache for 3 days, worse in the afternoon.",
    note: "AEDNAV understands every language. Your doctor only sees English.",
  },
  summaries: {
    title: "Then you both get exactly what you need.",
    sub: "One intake session. Two tailored summaries. Zero confusion.",
    patientLabel: "Your summary",
    patientTitle: "Ready for your appointment",
    patient: [
      { label: "Main concern", value: "Recurring headaches, 3 days" },
      { label: "Severity", value: "6 out of 10" },
      { label: "Medications tried", value: "OTC painkillers (not effective)" },
      { label: "Your question", value: "Could this be stress related?" },
    ],
    suggested: "Suggested: Family doctor visit",
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    provider: [
      { label: "Chief complaint", value: "Recurring headaches × 3 days, afternoon onset" },
      { label: "Severity", value: "6/10 (self-reported)" },
      { label: "Current medications", value: "OTC analgesics (ineffective)" },
      { label: "Patient goal", value: "Understand potential cause" },
      { label: "Allergies", value: "None reported" },
    ],
    providerNote: "Generated in English regardless of the patient's selected language.",
    foot: "Your summary in your language. Their summary in theirs.",
  },
  features: {
    title: "Everything you need. Nothing you don't.",
    sub: "AEDNAV is built around one goal: getting you prepared before you walk through that door.",
    items: [
      {
        title: "Guided symptom intake",
        body: "8 carefully chosen questions that surface what your doctor needs to know: duration, severity, patterns, medications, allergies, history, and your goals for the visit. Nothing is missed.",
      },
      {
        title: "7 languages, fully supported",
        body: "English, French, Spanish, Mandarin, Punjabi, Urdu, Arabic. Answer every question in the language that feels most natural to you. Switch languages at any point without losing your progress.",
      },
      {
        title: "Dual summaries, instantly",
        body: "The moment you finish, you get a patient summary in your language and a structured clinical English summary ready to hand to your provider. No waiting, no manual translation.",
      },
      {
        title: "Private by design",
        body: "No account required for the demo. No data sold. No ads. Your health information belongs to you, and AEDNAV never monetizes it.",
      },
    ],
  },
  audience: {
    title: "For anyone heading into a healthcare appointment.",
    sub: "Not just for people with language barriers. For anyone who wants to walk in prepared.",
    items: [
      { t: "First-time patients", b: "Not sure what to expect from a doctor's appointment? AEDNAV walks you through exactly what to share and how to share it." },
      { t: "Newcomers to Canada", b: "Navigating a new healthcare system is hard enough. AEDNAV helps you prepare in your own language and arrive knowing your next steps." },
      { t: "Complex medical histories", b: "Multiple conditions, a long medication list, previous diagnoses? Organize everything clearly so your doctor gets the full picture in minutes." },
      { t: "Parents and caregivers", b: "Preparing for someone else's appointment? AEDNAV guides you through every detail so nothing gets left out when it matters most." },
    ],
  },
  roadmap: {
    title: "Built to grow with you.",
    sub: "AEDNAV today is a working demo. Here is where it is going.",
    comingSoon: "Coming soon",
    trust: [
      { t: "Private by design.", b: "No data sold. No ads. Your health information is yours, always." },
      { t: "No account required for the demo.", b: "Try the full intake experience right now, no sign-up, no commitment." },
      { t: "Built for Canadian healthcare.", b: "Designed with Canadian patients and healthcare privacy principles in mind." },
    ],
    soon: [
      { t: "Patient accounts", b: "Save your intake history, track symptoms over time, and bring context to every appointment." },
      { t: "Clinic integration", b: "Link directly with your clinic so your provider receives your summary before you arrive." },
      { t: "Appointment booking", b: "Book follow-ups and referrals right from your summary screen." },
    ],
  },
  mission: {
    quote: "\"Healthcare is stressful enough. Walking in unprepared shouldn't be part of the experience.\"",
    attribution: "The belief behind AEDNAV",
    stats: [
      { n: "3 min", l: "Average intake time" },
      { n: "7", l: "Languages supported" },
      { n: "2", l: "Summaries generated per intake" },
    ],
  },
  cta: {
    title: "Ready to prepare for your next appointment?",
    sub: "Takes 3 minutes. Works in 7 languages. No sign-up needed.",
    button: "Prepare for my appointment →",
    note: "Not a diagnostic tool. Always consult a healthcare professional.",
  },
  faqTitle: "Common questions",
};

const FR: StoryContent = {
  hero: {
    eyebrow: "Préparation avant le rendez-vous · 3 minutes · 7 langues",
    title1: "Arrivez à votre rendez-vous",
    title2: "prêt à tout expliquer.",
    sub: "AEDNAV vous guide à travers vos symptômes avant de voir un médecin, pour que vous vous souveniez de tout, que rien ne soit oublié et que votre médecin comprenne la situation dès votre arrivée.",
    primary: "Préparer mon rendez-vous",
    secondary: "Voir comment ça fonctionne",
    note: "Ce n'est pas un outil de diagnostic. Consultez toujours un professionnel de la santé.",
  },
  problem: {
    title: "Vous sentez que quelque chose ne va pas.",
    sub: "Mais quand le médecin pose la question, les mots ne viennent pas.",
    lines: [
      "Vous oubliez la moitié de ce que vous vouliez dire.",
      "Vous omettez des détails importants.",
      "Vous repartez en vous demandant si tout a été compris.",
    ],
    closeTitle: "La plupart des rendez-vous commencent mal préparés.",
    closeSub: "AEDNAV change cela, pour tout le monde.",
  },
  conversation: {
    title: "Tout commence par une conversation.",
    sub: "8 questions guidées. Langage simple. Sans jargon médical. Environ 3 minutes.",
    q1: "Qu'est-ce qui vous préoccupe avant ce rendez-vous ?",
    a1: "J'ai de fortes migraines depuis 3 jours. C'est bien pire l'après-midi.",
    q2: "Comment évaluez-vous la douleur de 1 à 10 ?",
    a2: "Environ 6. Les analgésiques ne font rien.",
  },
  languages: {
    title: "Et vous pouvez répondre dans votre langue.",
    sub: "Parce que la difficulté avec l'anglais ne devrait pas empêcher d'expliquer sa santé. AEDNAV prend en charge 7 langues.",
    finalPill: "J'ai mal à la tête depuis 3 jours, pire l'après-midi.",
    note: "AEDNAV comprend toutes les langues. Votre médecin ne voit que l'anglais.",
  },
  summaries: {
    title: "Ensuite, chacun obtient ce dont il a besoin.",
    sub: "Une seule session. Deux résumés adaptés. Aucune confusion.",
    patientLabel: "Votre résumé",
    patientTitle: "Prêt pour votre rendez-vous",
    patient: [
      { label: "Préoccupation principale", value: "Maux de tête récurrents, 3 jours" },
      { label: "Intensité", value: "6 sur 10" },
      { label: "Médicaments essayés", value: "Analgésiques en vente libre (sans effet)" },
      { label: "Votre question", value: "Est-ce que cela peut être lié au stress ?" },
    ],
    suggested: "Suggestion : consultation chez le médecin de famille",
    providerLabel: "Résumé pour le soignant",
    providerTitle: "Anglais prêt pour le médecin",
    provider: [
      { label: "Chief complaint", value: "Recurring headaches × 3 days, afternoon onset" },
      { label: "Severity", value: "6/10 (self-reported)" },
      { label: "Current medications", value: "OTC analgesics (ineffective)" },
      { label: "Patient goal", value: "Understand potential cause" },
      { label: "Allergies", value: "None reported" },
    ],
    providerNote: "Généré en anglais, quelle que soit la langue choisie par le patient.",
    foot: "Votre résumé dans votre langue. Le leur dans la leur.",
  },
  features: {
    title: "Tout ce qu'il vous faut. Rien de superflu.",
    sub: "AEDNAV poursuit un seul objectif : vous préparer avant de franchir la porte.",
    items: [
      { title: "Questionnaire guidé des symptômes", body: "8 questions choisies pour révéler ce que votre médecin doit savoir : durée, intensité, tendances, médicaments, allergies, antécédents et objectifs de la visite. Rien n'est oublié." },
      { title: "7 langues prises en charge", body: "Anglais, français, espagnol, mandarin, pendjabi, ourdou, arabe. Répondez dans la langue qui vous vient naturellement. Changez de langue à tout moment sans perdre votre progression." },
      { title: "Deux résumés, immédiatement", body: "Dès la fin, vous obtenez un résumé patient dans votre langue et un résumé clinique structuré en anglais à remettre à votre soignant. Sans attente, sans traduction manuelle." },
      { title: "Confidentiel par conception", body: "Aucun compte requis pour la démo. Aucune donnée vendue. Aucune publicité. Vos informations de santé vous appartiennent." },
    ],
  },
  audience: {
    title: "Pour toute personne qui se prépare à un rendez-vous.",
    sub: "Pas seulement en cas de barrière linguistique. Pour quiconque veut arriver préparé.",
    items: [
      { t: "Premier rendez-vous", b: "Vous ne savez pas à quoi vous attendre ? AEDNAV vous indique quoi partager et comment le formuler." },
      { t: "Nouveaux arrivants au Canada", b: "Un nouveau système de santé est déjà complexe. Préparez-vous dans votre langue et arrivez en connaissant les prochaines étapes." },
      { t: "Antécédents médicaux complexes", b: "Plusieurs conditions, une longue liste de médicaments, des diagnostics antérieurs ? Organisez tout clairement en quelques minutes." },
      { t: "Parents et proches aidants", b: "Vous préparez le rendez-vous de quelqu'un d'autre ? AEDNAV vous guide pour que rien ne soit oublié." },
    ],
  },
  roadmap: {
    title: "Conçu pour évoluer avec vous.",
    sub: "AEDNAV est aujourd'hui une démo fonctionnelle. Voici la suite.",
    comingSoon: "Bientôt",
    trust: [
      { t: "Confidentiel par conception.", b: "Aucune donnée vendue. Aucune publicité. Vos informations de santé restent les vôtres." },
      { t: "Aucun compte requis pour la démo.", b: "Essayez l'expérience complète maintenant, sans inscription, sans engagement." },
      { t: "Pensé pour le système de santé canadien.", b: "Conçu avec les patients canadiens et les principes de confidentialité en santé." },
    ],
    soon: [
      { t: "Comptes patients", b: "Conservez votre historique, suivez vos symptômes et gardez le contexte d'un rendez-vous à l'autre." },
      { t: "Intégration en clinique", b: "Reliez-vous à votre clinique pour que votre soignant reçoive le résumé avant votre arrivée." },
      { t: "Prise de rendez-vous", b: "Planifiez suivis et références directement depuis votre résumé." },
    ],
  },
  mission: {
    quote: "« Les soins de santé sont déjà stressants. Arriver mal préparé ne devrait pas en faire partie. »",
    attribution: "La conviction derrière AEDNAV",
    stats: [
      { n: "3 min", l: "Durée moyenne de préparation" },
      { n: "7", l: "Langues prises en charge" },
      { n: "2", l: "Résumés générés par session" },
    ],
  },
  cta: {
    title: "Prêt à préparer votre prochain rendez-vous ?",
    sub: "3 minutes. 7 langues. Sans inscription.",
    button: "Préparer mon rendez-vous →",
    note: "Ce n'est pas un outil de diagnostic. Consultez toujours un professionnel de la santé.",
  },
  faqTitle: "Questions fréquentes",
};

const ES: StoryContent = {
  hero: {
    eyebrow: "Preparación previa a la cita · 3 minutos · 7 idiomas",
    title1: "Llegue a su cita",
    title2: "preparado para todo.",
    sub: "AEDNAV le guía por sus síntomas antes de ver al médico, para que recuerde lo que quiere decir, no se omita nada y su médico entienda la situación desde el primer momento.",
    primary: "Preparar mi cita",
    secondary: "Ver cómo funciona",
    note: "No es una herramienta de diagnóstico. Consulte siempre a un profesional de la salud.",
  },
  problem: {
    title: "Usted sabe que algo no está bien.",
    sub: "Pero cuando el médico pregunta, las palabras no salen.",
    lines: [
      "Olvida la mitad de lo que quería decir.",
      "Deja fuera detalles importantes.",
      "Sale de la consulta dudando si entendieron todo.",
    ],
    closeTitle: "La mayoría de las citas empiezan sin preparación.",
    closeSub: "AEDNAV cambia eso, para todos.",
  },
  conversation: {
    title: "Todo empieza con una conversación.",
    sub: "8 preguntas guiadas. Lenguaje sencillo. Sin jerga médica. Unos 3 minutos.",
    q1: "¿Qué le preocupa antes de esta cita?",
    a1: "Tengo dolores de cabeza fuertes desde hace 3 días. Empeoran por la tarde.",
    q2: "¿Cómo calificaría el dolor del 1 al 10?",
    a2: "Como un 6. Los analgésicos no hacen efecto.",
  },
  languages: {
    title: "Y puede responder en su idioma.",
    sub: "Porque la dificultad con el inglés no debería impedirle explicar su salud. AEDNAV admite 7 idiomas.",
    finalPill: "Tengo dolor de cabeza desde hace 3 días, peor por la tarde.",
    note: "AEDNAV entiende todos los idiomas. Su médico solo ve inglés.",
  },
  summaries: {
    title: "Después, cada uno recibe lo que necesita.",
    sub: "Una sesión. Dos resúmenes adaptados. Sin confusión.",
    patientLabel: "Su resumen",
    patientTitle: "Listo para su cita",
    patient: [
      { label: "Preocupación principal", value: "Dolores de cabeza recurrentes, 3 días" },
      { label: "Intensidad", value: "6 de 10" },
      { label: "Medicamentos probados", value: "Analgésicos de venta libre (sin efecto)" },
      { label: "Su pregunta", value: "¿Podría estar relacionado con el estrés?" },
    ],
    suggested: "Sugerencia: consulta con el médico de familia",
    providerLabel: "Resumen para el profesional",
    providerTitle: "Inglés listo para el médico",
    provider: [
      { label: "Chief complaint", value: "Recurring headaches × 3 days, afternoon onset" },
      { label: "Severity", value: "6/10 (self-reported)" },
      { label: "Current medications", value: "OTC analgesics (ineffective)" },
      { label: "Patient goal", value: "Understand potential cause" },
      { label: "Allergies", value: "None reported" },
    ],
    providerNote: "Se genera en inglés sin importar el idioma elegido por el paciente.",
    foot: "Su resumen en su idioma. El de ellos en el suyo.",
  },
  features: {
    title: "Todo lo necesario. Nada de más.",
    sub: "AEDNAV tiene un solo objetivo: que llegue preparado antes de cruzar esa puerta.",
    items: [
      { title: "Registro guiado de síntomas", body: "8 preguntas elegidas para mostrar lo que su médico necesita saber: duración, intensidad, patrones, medicamentos, alergias, antecedentes y objetivos de la visita." },
      { title: "7 idiomas, totalmente compatibles", body: "Inglés, francés, español, mandarín, punyabí, urdu y árabe. Responda en el idioma que le resulte natural y cambie de idioma cuando quiera sin perder su progreso." },
      { title: "Dos resúmenes, al instante", body: "Al terminar recibe un resumen para usted en su idioma y un resumen clínico estructurado en inglés para su profesional de salud. Sin esperas ni traducción manual." },
      { title: "Privado por diseño", body: "No se requiere cuenta para la demo. No se venden datos. Sin publicidad. Su información de salud es suya." },
    ],
  },
  audience: {
    title: "Para cualquier persona con una cita médica.",
    sub: "No solo para quienes enfrentan barreras de idioma. Para quien quiera llegar preparado.",
    items: [
      { t: "Pacientes por primera vez", b: "¿No sabe qué esperar de una cita médica? AEDNAV le indica qué contar y cómo contarlo." },
      { t: "Recién llegados a Canadá", b: "Un sistema de salud nuevo ya es difícil. Prepárese en su idioma y llegue sabiendo los próximos pasos." },
      { t: "Historiales médicos complejos", b: "¿Varias condiciones, una lista larga de medicamentos, diagnósticos previos? Organícelo todo con claridad en minutos." },
      { t: "Padres y cuidadores", b: "¿Prepara la cita de otra persona? AEDNAV le guía por cada detalle para que no falte nada." },
    ],
  },
  roadmap: {
    title: "Creado para crecer con usted.",
    sub: "Hoy AEDNAV es una demo funcional. Esto es lo que viene.",
    comingSoon: "Próximamente",
    trust: [
      { t: "Privado por diseño.", b: "No se venden datos. Sin publicidad. Su información de salud siempre es suya." },
      { t: "Sin cuenta para la demo.", b: "Pruebe la experiencia completa ahora, sin registro ni compromiso." },
      { t: "Pensado para la sanidad canadiense.", b: "Diseñado con pacientes canadienses y principios de privacidad en salud." },
    ],
    soon: [
      { t: "Cuentas de paciente", b: "Guarde su historial, siga sus síntomas y conserve el contexto en cada cita." },
      { t: "Integración con clínicas", b: "Conéctese con su clínica para que su profesional reciba el resumen antes de su llegada." },
      { t: "Reserva de citas", b: "Agende seguimientos y derivaciones desde la pantalla del resumen." },
    ],
  },
  mission: {
    quote: "«La atención médica ya es estresante. Llegar sin preparación no debería ser parte de la experiencia.»",
    attribution: "La convicción detrás de AEDNAV",
    stats: [
      { n: "3 min", l: "Tiempo medio de preparación" },
      { n: "7", l: "Idiomas admitidos" },
      { n: "2", l: "Resúmenes por sesión" },
    ],
  },
  cta: {
    title: "¿Listo para preparar su próxima cita?",
    sub: "3 minutos. 7 idiomas. Sin registro.",
    button: "Preparar mi cita →",
    note: "No es una herramienta de diagnóstico. Consulte siempre a un profesional de la salud.",
  },
  faqTitle: "Preguntas frecuentes",
};

const ZH: StoryContent = {
  hero: {
    eyebrow: "就诊前准备 · 3 分钟 · 7 种语言",
    title1: "走进诊室时",
    title2: "准备充分。",
    sub: "AEDNAV 在您就诊前引导您梳理症状，让您记得要说的内容，不遗漏细节，医生一开始就能了解全貌。",
    primary: "开始准备我的就诊",
    secondary: "了解使用方式",
    note: "本工具不用于诊断。请始终咨询专业医护人员。",
  },
  problem: {
    title: "您知道身体出了问题。",
    sub: "但医生问起时，话却说不清楚。",
    lines: [
      "您忘了一半想说的话。",
      "您漏掉了重要的细节。",
      "离开时还在想医生是否真的了解情况。",
    ],
    closeTitle: "大多数就诊都在准备不足中开始。",
    closeSub: "AEDNAV 为每个人改变这一点。",
  },
  conversation: {
    title: "一切从一次对话开始。",
    sub: "8 个引导式问题。通俗表达，没有医学术语。大约 3 分钟。",
    q1: "这次就诊前，您最担心什么？",
    a1: "我头痛得很厉害，已经 3 天了，下午更严重。",
    q2: "如果用 1 到 10 来评分，疼痛有多严重？",
    a2: "大概 6 分。止痛药没有效果。",
  },
  languages: {
    title: "您可以用任何语言作答。",
    sub: "英语不流利，不应该妨碍您说清自己的健康状况。AEDNAV 支持 7 种语言。",
    finalPill: "我头痛已经 3 天了，下午更严重。",
    note: "AEDNAV 理解每种语言。医生看到的始终是英文。",
  },
  summaries: {
    title: "然后，双方都得到所需的内容。",
    sub: "一次填写，两份摘要，清晰明了。",
    patientLabel: "您的摘要",
    patientTitle: "就诊准备已完成",
    patient: [
      { label: "主要问题", value: "反复头痛，持续 3 天" },
      { label: "严重程度", value: "10 分中的 6 分" },
      { label: "已尝试的药物", value: "非处方止痛药（无效）" },
      { label: "您的问题", value: "这可能与压力有关吗？" },
    ],
    suggested: "建议：家庭医生就诊",
    providerLabel: "医护摘要",
    providerTitle: "可直接交给医生的英文摘要",
    provider: [
      { label: "Chief complaint", value: "Recurring headaches × 3 days, afternoon onset" },
      { label: "Severity", value: "6/10 (self-reported)" },
      { label: "Current medications", value: "OTC analgesics (ineffective)" },
      { label: "Patient goal", value: "Understand potential cause" },
      { label: "Allergies", value: "None reported" },
    ],
    providerNote: "无论患者选择哪种语言，都以英文生成。",
    foot: "您的摘要用您的语言，医生的摘要用英文。",
  },
  features: {
    title: "所需皆有，多余全无。",
    sub: "AEDNAV 只为一个目标：让您在推开诊室门之前就已准备好。",
    items: [
      { title: "引导式症状记录", body: "8 个精心设计的问题，涵盖医生需要了解的内容：持续时间、严重程度、规律、用药、过敏、既往史以及您的就诊目标。" },
      { title: "全面支持 7 种语言", body: "英语、法语、西班牙语、普通话、旁遮普语、乌尔都语、阿拉伯语。用最自然的语言作答，随时切换而不会丢失进度。" },
      { title: "即时生成两份摘要", body: "完成后立即获得您语言的患者摘要，以及结构化的英文临床摘要，可直接交给医护人员。" },
      { title: "隐私优先", body: "演示无需注册账号。不出售数据，无广告。您的健康信息属于您自己。" },
    ],
  },
  audience: {
    title: "适合每一位即将就诊的人。",
    sub: "不只是面向有语言障碍的人，而是所有希望做好准备的人。",
    items: [
      { t: "首次就诊者", b: "不确定就诊流程？AEDNAV 会告诉您该说什么、怎么说。" },
      { t: "加拿大新移民", b: "适应新的医疗体系本就不易。用母语准备，并清楚接下来的步骤。" },
      { t: "病史复杂的患者", b: "多种疾病、长长的用药清单、既往诊断？几分钟内条理清晰地整理好。" },
      { t: "父母与照护者", b: "为他人准备就诊？AEDNAV 逐项引导，重要信息不遗漏。" },
    ],
  },
  roadmap: {
    title: "与您一同成长。",
    sub: "AEDNAV 目前是可用的演示版本。接下来的方向如下。",
    comingSoon: "即将推出",
    trust: [
      { t: "隐私优先设计。", b: "不出售数据，无广告。您的健康信息始终属于您。" },
      { t: "演示无需注册。", b: "现在即可体验完整流程，无需注册，没有任何承诺。" },
      { t: "面向加拿大医疗体系。", b: "结合加拿大患者需求与医疗隐私原则设计。" },
    ],
    soon: [
      { t: "患者账户", b: "保存记录，长期追踪症状，为每次就诊提供背景信息。" },
      { t: "诊所对接", b: "与诊所连接，让医生在您到达前就收到摘要。" },
      { t: "预约功能", b: "直接在摘要页面预约复诊与转诊。" },
    ],
  },
  mission: {
    quote: "「看病已经够有压力了，准备不足不该再成为负担。」",
    attribution: "AEDNAV 的初衷",
    stats: [
      { n: "3 分钟", l: "平均准备时间" },
      { n: "7", l: "支持的语言" },
      { n: "2", l: "每次生成的摘要数" },
    ],
  },
  cta: {
    title: "准备好迎接下一次就诊了吗？",
    sub: "3 分钟完成，支持 7 种语言，无需注册。",
    button: "开始准备我的就诊 →",
    note: "本工具不用于诊断。请始终咨询专业医护人员。",
  },
  faqTitle: "常见问题",
};

const PA: StoryContent = {
  hero: {
    eyebrow: "ਮੁਲਾਕਾਤ ਤੋਂ ਪਹਿਲਾਂ ਤਿਆਰੀ · 3 ਮਿੰਟ · 7 ਭਾਸ਼ਾਵਾਂ",
    title1: "ਆਪਣੀ ਮੁਲਾਕਾਤ ਵਿੱਚ ਜਾਓ",
    title2: "ਪੂਰੀ ਤਿਆਰੀ ਨਾਲ।",
    sub: "AEDNAV ਡਾਕਟਰ ਨੂੰ ਮਿਲਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਬਾਰੇ ਤੁਹਾਡੀ ਅਗਵਾਈ ਕਰਦਾ ਹੈ, ਤਾਂ ਜੋ ਤੁਹਾਨੂੰ ਸਭ ਕੁਝ ਯਾਦ ਰਹੇ, ਕੁਝ ਵੀ ਛੁੱਟੇ ਨਾ, ਅਤੇ ਡਾਕਟਰ ਨੂੰ ਸ਼ੁਰੂ ਤੋਂ ਹੀ ਪੂਰੀ ਤਸਵੀਰ ਮਿਲੇ।",
    primary: "ਮੇਰੀ ਮੁਲਾਕਾਤ ਦੀ ਤਿਆਰੀ ਕਰੋ",
    secondary: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    note: "ਇਹ ਨਿਦਾਨ ਦਾ ਸਾਧਨ ਨਹੀਂ ਹੈ। ਹਮੇਸ਼ਾ ਸਿਹਤ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।",
  },
  problem: {
    title: "ਤੁਹਾਨੂੰ ਪਤਾ ਹੈ ਕਿ ਕੁਝ ਠੀਕ ਨਹੀਂ ਹੈ।",
    sub: "ਪਰ ਜਦੋਂ ਡਾਕਟਰ ਪੁੱਛਦਾ ਹੈ, ਸ਼ਬਦ ਨਹੀਂ ਨਿਕਲਦੇ।",
    lines: [
      "ਤੁਸੀਂ ਅੱਧੀਆਂ ਗੱਲਾਂ ਭੁੱਲ ਜਾਂਦੇ ਹੋ।",
      "ਜ਼ਰੂਰੀ ਵੇਰਵੇ ਰਹਿ ਜਾਂਦੇ ਹਨ।",
      "ਬਾਹਰ ਆ ਕੇ ਸੋਚਦੇ ਹੋ ਕਿ ਕੀ ਡਾਕਟਰ ਨੂੰ ਸਭ ਸਮਝ ਆਇਆ।",
    ],
    closeTitle: "ਬਹੁਤੀਆਂ ਮੁਲਾਕਾਤਾਂ ਬਿਨਾਂ ਤਿਆਰੀ ਸ਼ੁਰੂ ਹੁੰਦੀਆਂ ਹਨ।",
    closeSub: "AEDNAV ਇਹ ਹਰ ਕਿਸੇ ਲਈ ਬਦਲਦਾ ਹੈ।",
  },
  conversation: {
    title: "ਸ਼ੁਰੂਆਤ ਇੱਕ ਗੱਲਬਾਤ ਨਾਲ ਹੁੰਦੀ ਹੈ।",
    sub: "8 ਸਾਧਾਰਨ ਸਵਾਲ। ਸਾਦੀ ਭਾਸ਼ਾ। ਕੋਈ ਡਾਕਟਰੀ ਸ਼ਬਦਾਵਲੀ ਨਹੀਂ। ਲਗਭਗ 3 ਮਿੰਟ।",
    q1: "ਇਸ ਮੁਲਾਕਾਤ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਕੀ ਪਰੇਸ਼ਾਨ ਕਰ ਰਿਹਾ ਹੈ?",
    a1: "ਮੈਨੂੰ 3 ਦਿਨਾਂ ਤੋਂ ਬਹੁਤ ਤੇਜ਼ ਸਿਰ ਦਰਦ ਹੈ। ਦੁਪਹਿਰ ਬਾਅਦ ਹੋਰ ਵਧ ਜਾਂਦਾ ਹੈ।",
    q2: "1 ਤੋਂ 10 ਵਿੱਚ ਦਰਦ ਕਿੰਨਾ ਹੈ?",
    a2: "ਲਗਭਗ 6। ਦਰਦ ਦੀਆਂ ਗੋਲੀਆਂ ਅਸਰ ਨਹੀਂ ਕਰ ਰਹੀਆਂ।",
  },
  languages: {
    title: "ਅਤੇ ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਦੇ ਸਕਦੇ ਹੋ।",
    sub: "ਅੰਗਰੇਜ਼ੀ ਦੀ ਮੁਸ਼ਕਲ ਤੁਹਾਡੀ ਸਿਹਤ ਸਮਝਾਉਣ ਵਿੱਚ ਰੁਕਾਵਟ ਨਹੀਂ ਬਣਨੀ ਚਾਹੀਦੀ। AEDNAV 7 ਭਾਸ਼ਾਵਾਂ ਸਮਰਥਿਤ ਕਰਦਾ ਹੈ।",
    finalPill: "ਮੈਨੂੰ 3 ਦਿਨਾਂ ਤੋਂ ਸਿਰ ਦਰਦ ਹੈ, ਦੁਪਹਿਰ ਬਾਅਦ ਵੱਧ।",
    note: "AEDNAV ਹਰ ਭਾਸ਼ਾ ਸਮਝਦਾ ਹੈ। ਡਾਕਟਰ ਨੂੰ ਸਿਰਫ਼ ਅੰਗਰੇਜ਼ੀ ਦਿਖਦੀ ਹੈ।",
  },
  summaries: {
    title: "ਫਿਰ ਦੋਹਾਂ ਨੂੰ ਲੋੜੀਂਦਾ ਮਿਲਦਾ ਹੈ।",
    sub: "ਇੱਕ ਸੈਸ਼ਨ। ਦੋ ਸਾਰਾਂਸ਼। ਕੋਈ ਉਲਝਣ ਨਹੀਂ।",
    patientLabel: "ਤੁਹਾਡਾ ਸਾਰਾਂਸ਼",
    patientTitle: "ਮੁਲਾਕਾਤ ਲਈ ਤਿਆਰ",
    patient: [
      { label: "ਮੁੱਖ ਸਮੱਸਿਆ", value: "ਵਾਰ-ਵਾਰ ਸਿਰ ਦਰਦ, 3 ਦਿਨ" },
      { label: "ਗੰਭੀਰਤਾ", value: "10 ਵਿੱਚੋਂ 6" },
      { label: "ਲਈਆਂ ਦਵਾਈਆਂ", value: "ਬਿਨਾਂ ਨੁਸਖ਼ੇ ਦੀਆਂ ਦਰਦ ਗੋਲੀਆਂ (ਅਸਰ ਨਹੀਂ)" },
      { label: "ਤੁਹਾਡਾ ਸਵਾਲ", value: "ਕੀ ਇਹ ਤਣਾਅ ਨਾਲ ਜੁੜਿਆ ਹੋ ਸਕਦਾ ਹੈ?" },
    ],
    suggested: "ਸੁਝਾਅ: ਫੈਮਿਲੀ ਡਾਕਟਰ ਕੋਲ ਜਾਓ",
    providerLabel: "ਡਾਕਟਰ ਲਈ ਸਾਰਾਂਸ਼",
    providerTitle: "ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਤਿਆਰ",
    provider: [
      { label: "Chief complaint", value: "Recurring headaches × 3 days, afternoon onset" },
      { label: "Severity", value: "6/10 (self-reported)" },
      { label: "Current medications", value: "OTC analgesics (ineffective)" },
      { label: "Patient goal", value: "Understand potential cause" },
      { label: "Allergies", value: "None reported" },
    ],
    providerNote: "ਮਰੀਜ਼ ਦੀ ਚੁਣੀ ਭਾਸ਼ਾ ਭਾਵੇਂ ਕੋਈ ਵੀ ਹੋਵੇ, ਇਹ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਬਣਦਾ ਹੈ।",
    foot: "ਤੁਹਾਡਾ ਸਾਰਾਂਸ਼ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ। ਡਾਕਟਰ ਦਾ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ।",
  },
  features: {
    title: "ਜੋ ਲੋੜੀਂਦਾ ਹੈ, ਬਸ ਉਹੀ।",
    sub: "AEDNAV ਦਾ ਇੱਕੋ ਮਕਸਦ ਹੈ: ਦਰਵਾਜ਼ੇ ਅੰਦਰ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਤੁਹਾਨੂੰ ਤਿਆਰ ਕਰਨਾ।",
    items: [
      { title: "ਲੱਛਣਾਂ ਬਾਰੇ ਅਗਵਾਈ", body: "8 ਚੁਣੇ ਹੋਏ ਸਵਾਲ ਜੋ ਡਾਕਟਰ ਲਈ ਜ਼ਰੂਰੀ ਗੱਲਾਂ ਸਾਹਮਣੇ ਲਿਆਉਂਦੇ ਹਨ: ਸਮਾਂ, ਗੰਭੀਰਤਾ, ਪੈਟਰਨ, ਦਵਾਈਆਂ, ਐਲਰਜੀ, ਇਤਿਹਾਸ ਅਤੇ ਤੁਹਾਡੇ ਟੀਚੇ।" },
      { title: "7 ਭਾਸ਼ਾਵਾਂ ਦਾ ਸਮਰਥਨ", body: "ਅੰਗਰੇਜ਼ੀ, ਫ਼੍ਰੈਂਚ, ਸਪੈਨਿਸ਼, ਮੈਂਡਰਿਨ, ਪੰਜਾਬੀ, ਉਰਦੂ, ਅਰਬੀ। ਆਪਣੀ ਸੌਖੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਦਿਓ ਅਤੇ ਕਿਸੇ ਵੇਲੇ ਵੀ ਭਾਸ਼ਾ ਬਦਲੋ।" },
      { title: "ਦੋ ਸਾਰਾਂਸ਼, ਤੁਰੰਤ", body: "ਪੂਰਾ ਹੁੰਦੇ ਹੀ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਮਰੀਜ਼ ਸਾਰਾਂਸ਼ ਅਤੇ ਡਾਕਟਰ ਲਈ ਅੰਗਰੇਜ਼ੀ ਸਾਰਾਂਸ਼ ਮਿਲਦਾ ਹੈ।" },
      { title: "ਨਿੱਜਤਾ ਪਹਿਲਾਂ", body: "ਡੈਮੋ ਲਈ ਖਾਤਾ ਨਹੀਂ ਚਾਹੀਦਾ। ਡਾਟਾ ਨਹੀਂ ਵੇਚਿਆ ਜਾਂਦਾ। ਕੋਈ ਇਸ਼ਤਿਹਾਰ ਨਹੀਂ।" },
    ],
  },
  audience: {
    title: "ਹਰ ਉਸ ਵਿਅਕਤੀ ਲਈ ਜੋ ਡਾਕਟਰ ਕੋਲ ਜਾ ਰਿਹਾ ਹੈ।",
    sub: "ਸਿਰਫ਼ ਭਾਸ਼ਾ ਦੀ ਰੁਕਾਵਟ ਵਾਲਿਆਂ ਲਈ ਨਹੀਂ। ਹਰ ਉਸ ਲਈ ਜੋ ਤਿਆਰ ਹੋ ਕੇ ਜਾਣਾ ਚਾਹੁੰਦਾ ਹੈ।",
    items: [
      { t: "ਪਹਿਲੀ ਵਾਰ ਮਰੀਜ਼", b: "ਪਤਾ ਨਹੀਂ ਕੀ ਉਮੀਦ ਕਰਨੀ ਹੈ? AEDNAV ਦੱਸਦਾ ਹੈ ਕੀ ਸਾਂਝਾ ਕਰਨਾ ਹੈ ਅਤੇ ਕਿਵੇਂ।" },
      { t: "ਕੈਨੇਡਾ ਵਿੱਚ ਨਵੇਂ ਆਏ ਲੋਕ", b: "ਨਵਾਂ ਸਿਹਤ ਸਿਸਟਮ ਪਹਿਲਾਂ ਹੀ ਔਖਾ ਹੈ। ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਤਿਆਰੀ ਕਰੋ।" },
      { t: "ਗੁੰਝਲਦਾਰ ਮੈਡੀਕਲ ਇਤਿਹਾਸ", b: "ਕਈ ਬਿਮਾਰੀਆਂ, ਲੰਮੀ ਦਵਾਈ ਸੂਚੀ, ਪੁਰਾਣੇ ਨਿਦਾਨ? ਸਭ ਕੁਝ ਸਾਫ਼ ਤਰੀਕੇ ਨਾਲ ਵਿਵਸਥਿਤ ਕਰੋ।" },
      { t: "ਮਾਪੇ ਅਤੇ ਸੰਭਾਲ ਕਰਨ ਵਾਲੇ", b: "ਕਿਸੇ ਹੋਰ ਦੀ ਮੁਲਾਕਾਤ ਦੀ ਤਿਆਰੀ? AEDNAV ਹਰ ਵੇਰਵੇ ਵਿੱਚ ਅਗਵਾਈ ਕਰਦਾ ਹੈ।" },
    ],
  },
  roadmap: {
    title: "ਤੁਹਾਡੇ ਨਾਲ ਵਧਣ ਲਈ ਬਣਾਇਆ ਗਿਆ।",
    sub: "ਅੱਜ AEDNAV ਇੱਕ ਕੰਮ ਕਰਦਾ ਡੈਮੋ ਹੈ। ਅੱਗੇ ਇਹ ਆ ਰਿਹਾ ਹੈ।",
    comingSoon: "ਜਲਦੀ ਆ ਰਿਹਾ",
    trust: [
      { t: "ਨਿੱਜਤਾ ਪਹਿਲਾਂ।", b: "ਡਾਟਾ ਨਹੀਂ ਵੇਚਿਆ ਜਾਂਦਾ। ਕੋਈ ਇਸ਼ਤਿਹਾਰ ਨਹੀਂ। ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਤੁਹਾਡੀ ਹੈ।" },
      { t: "ਡੈਮੋ ਲਈ ਖਾਤਾ ਨਹੀਂ ਚਾਹੀਦਾ।", b: "ਪੂਰਾ ਤਜਰਬਾ ਹੁਣੇ ਅਜ਼ਮਾਓ, ਬਿਨਾਂ ਸਾਈਨ-ਅੱਪ।" },
      { t: "ਕੈਨੇਡੀਅਨ ਸਿਹਤ ਸੇਵਾ ਲਈ।", b: "ਕੈਨੇਡੀਅਨ ਮਰੀਜ਼ਾਂ ਅਤੇ ਨਿੱਜਤਾ ਸਿਧਾਂਤਾਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ ਬਣਾਇਆ।" },
    ],
    soon: [
      { t: "ਮਰੀਜ਼ ਖਾਤੇ", b: "ਆਪਣਾ ਇਤਿਹਾਸ ਸੰਭਾਲੋ, ਲੱਛਣ ਟਰੈਕ ਕਰੋ ਅਤੇ ਹਰ ਮੁਲਾਕਾਤ ਵਿੱਚ ਸੰਦਰਭ ਰੱਖੋ।" },
      { t: "ਕਲੀਨਿਕ ਨਾਲ ਜੋੜ", b: "ਕਲੀਨਿਕ ਨਾਲ ਜੁੜੋ ਤਾਂ ਜੋ ਡਾਕਟਰ ਨੂੰ ਪਹਿਲਾਂ ਹੀ ਸਾਰਾਂਸ਼ ਮਿਲ ਜਾਵੇ।" },
      { t: "ਮੁਲਾਕਾਤ ਬੁਕਿੰਗ", b: "ਸਾਰਾਂਸ਼ ਸਕ੍ਰੀਨ ਤੋਂ ਹੀ ਅਗਲੀ ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ।" },
    ],
  },
  mission: {
    quote: "\"ਸਿਹਤ ਸੰਭਾਲ ਪਹਿਲਾਂ ਹੀ ਤਣਾਅ ਭਰੀ ਹੈ। ਬਿਨਾਂ ਤਿਆਰੀ ਜਾਣਾ ਇਸ ਦਾ ਹਿੱਸਾ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ।\"",
    attribution: "AEDNAV ਪਿੱਛੇ ਸੋਚ",
    stats: [
      { n: "3 ਮਿੰਟ", l: "ਔਸਤ ਸਮਾਂ" },
      { n: "7", l: "ਸਮਰਥਿਤ ਭਾਸ਼ਾਵਾਂ" },
      { n: "2", l: "ਹਰ ਸੈਸ਼ਨ ਦੇ ਸਾਰਾਂਸ਼" },
    ],
  },
  cta: {
    title: "ਅਗਲੀ ਮੁਲਾਕਾਤ ਦੀ ਤਿਆਰੀ ਕਰੀਏ?",
    sub: "3 ਮਿੰਟ। 7 ਭਾਸ਼ਾਵਾਂ। ਸਾਈਨ-ਅੱਪ ਦੀ ਲੋੜ ਨਹੀਂ।",
    button: "ਮੇਰੀ ਮੁਲਾਕਾਤ ਦੀ ਤਿਆਰੀ ਕਰੋ →",
    note: "ਇਹ ਨਿਦਾਨ ਦਾ ਸਾਧਨ ਨਹੀਂ ਹੈ। ਹਮੇਸ਼ਾ ਸਿਹਤ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।",
  },
  faqTitle: "ਆਮ ਸਵਾਲ",
};

const UR: StoryContent = {
  hero: {
    eyebrow: "ملاقات سے پہلے تیاری · 3 منٹ · 7 زبانیں",
    title1: "اپنی ملاقات میں جائیں",
    title2: "پوری تیاری کے ساتھ۔",
    sub: "AEDNAV ڈاکٹر سے ملنے سے پہلے آپ کی علامات کو ترتیب دینے میں رہنمائی کرتا ہے، تاکہ آپ کو سب یاد رہے، کوئی بات نہ چھوٹے، اور ڈاکٹر کو شروع ہی سے پوری صورتحال معلوم ہو۔",
    primary: "میری ملاقات کی تیاری کریں",
    secondary: "یہ کیسے کام کرتا ہے",
    note: "یہ تشخیصی ذریعہ نہیں ہے۔ ہمیشہ کسی ہیلتھ پروفیشنل سے رجوع کریں۔",
  },
  problem: {
    title: "آپ کو معلوم ہے کہ کچھ ٹھیک نہیں۔",
    sub: "لیکن جب ڈاکٹر پوچھتا ہے تو الفاظ نہیں نکلتے۔",
    lines: [
      "آپ آدھی باتیں بھول جاتے ہیں۔",
      "اہم تفصیلات رہ جاتی ہیں۔",
      "باہر آ کر سوچتے ہیں کہ کیا سب کچھ سمجھ آیا۔",
    ],
    closeTitle: "زیادہ تر ملاقاتیں بغیر تیاری شروع ہوتی ہیں۔",
    closeSub: "AEDNAV یہ سب کے لیے بدلتا ہے۔",
  },
  conversation: {
    title: "آغاز ایک گفتگو سے ہوتا ہے۔",
    sub: "8 آسان سوالات۔ سادہ زبان۔ کوئی طبی اصطلاح نہیں۔ تقریباً 3 منٹ۔",
    q1: "اس ملاقات سے پہلے آپ کو کیا پریشانی ہے؟",
    a1: "مجھے 3 دن سے شدید سر درد ہے۔ دوپہر کے بعد زیادہ بڑھ جاتا ہے۔",
    q2: "1 سے 10 میں درد کتنا ہے؟",
    a2: "تقریباً 6۔ درد کی گولیاں اثر نہیں کر رہیں۔",
  },
  languages: {
    title: "اور آپ کسی بھی زبان میں جواب دے سکتے ہیں۔",
    sub: "انگریزی کی دشواری آپ کی صحت بیان کرنے میں رکاوٹ نہیں بننی چاہیے۔ AEDNAV 7 زبانوں کو سپورٹ کرتا ہے۔",
    finalPill: "مجھے 3 دن سے سر درد ہے، دوپہر کے بعد زیادہ۔",
    note: "AEDNAV ہر زبان سمجھتا ہے۔ ڈاکٹر کو صرف انگریزی نظر آتی ہے۔",
  },
  summaries: {
    title: "پھر دونوں کو وہی ملتا ہے جو درکار ہے۔",
    sub: "ایک سیشن۔ دو خلاصے۔ کوئی الجھن نہیں۔",
    patientLabel: "آپ کا خلاصہ",
    patientTitle: "ملاقات کے لیے تیار",
    patient: [
      { label: "بنیادی مسئلہ", value: "بار بار سر درد، 3 دن" },
      { label: "شدت", value: "10 میں سے 6" },
      { label: "استعمال کی گئی ادویات", value: "بغیر نسخے کی درد کش گولیاں (بے اثر)" },
      { label: "آپ کا سوال", value: "کیا یہ ذہنی دباؤ سے متعلق ہو سکتا ہے؟" },
    ],
    suggested: "تجویز: فیملی ڈاکٹر سے ملاقات",
    providerLabel: "ڈاکٹر کے لیے خلاصہ",
    providerTitle: "انگریزی میں تیار",
    provider: [
      { label: "Chief complaint", value: "Recurring headaches × 3 days, afternoon onset" },
      { label: "Severity", value: "6/10 (self-reported)" },
      { label: "Current medications", value: "OTC analgesics (ineffective)" },
      { label: "Patient goal", value: "Understand potential cause" },
      { label: "Allergies", value: "None reported" },
    ],
    providerNote: "مریض کی منتخب زبان کچھ بھی ہو، یہ انگریزی میں تیار ہوتا ہے۔",
    foot: "آپ کا خلاصہ آپ کی زبان میں۔ ڈاکٹر کا انگریزی میں۔",
  },
  features: {
    title: "جو ضروری ہے، بس وہی۔",
    sub: "AEDNAV کا ایک ہی مقصد ہے: دروازے میں داخل ہونے سے پہلے آپ کو تیار کرنا۔",
    items: [
      { title: "رہنمائی کے ساتھ علامات", body: "8 منتخب سوالات جو ڈاکٹر کے لیے ضروری معلومات سامنے لاتے ہیں: دورانیہ، شدت، انداز، ادویات، الرجی، تاریخ اور آپ کے مقاصد۔" },
      { title: "7 زبانوں کی مکمل سپورٹ", body: "انگریزی، فرانسیسی، ہسپانوی، مینڈرن، پنجابی، اردو، عربی۔ اپنی آسان زبان میں جواب دیں اور کسی بھی وقت زبان بدلیں۔" },
      { title: "دو خلاصے، فوراً", body: "مکمل ہوتے ہی آپ کی زبان میں مریض خلاصہ اور ڈاکٹر کے لیے منظم انگریزی خلاصہ مل جاتا ہے۔" },
      { title: "پرائیویسی پہلے", body: "ڈیمو کے لیے اکاؤنٹ ضروری نہیں۔ ڈیٹا فروخت نہیں ہوتا۔ کوئی اشتہار نہیں۔" },
    ],
  },
  audience: {
    title: "ہر اس شخص کے لیے جو ڈاکٹر کے پاس جا رہا ہے۔",
    sub: "صرف زبان کی رکاوٹ والوں کے لیے نہیں۔ ہر اس شخص کے لیے جو تیار جانا چاہتا ہے۔",
    items: [
      { t: "پہلی بار مریض", b: "معلوم نہیں کیا توقع کریں؟ AEDNAV بتاتا ہے کیا بتانا ہے اور کیسے۔" },
      { t: "کینیڈا میں نئے آنے والے", b: "نیا نظامِ صحت پہلے ہی مشکل ہے۔ اپنی زبان میں تیاری کریں اور اگلے مراحل جانیں۔" },
      { t: "پیچیدہ طبی تاریخ", b: "کئی بیماریاں، طویل فہرستِ ادویات، پرانی تشخیص؟ سب کچھ منٹوں میں واضح کریں۔" },
      { t: "والدین اور نگہداشت کرنے والے", b: "کسی اور کی ملاقات کی تیاری؟ AEDNAV ہر تفصیل میں رہنمائی کرتا ہے۔" },
    ],
  },
  roadmap: {
    title: "آپ کے ساتھ بڑھنے کے لیے بنایا گیا۔",
    sub: "آج AEDNAV ایک کام کرتا ڈیمو ہے۔ آگے یہ آ رہا ہے۔",
    comingSoon: "جلد آ رہا ہے",
    trust: [
      { t: "پرائیویسی پہلے۔", b: "ڈیٹا فروخت نہیں ہوتا۔ کوئی اشتہار نہیں۔ آپ کی معلومات آپ کی ہیں۔" },
      { t: "ڈیمو کے لیے اکاؤنٹ ضروری نہیں۔", b: "پورا تجربہ ابھی آزمائیں، بغیر سائن اپ۔" },
      { t: "کینیڈین نظامِ صحت کے لیے۔", b: "کینیڈین مریضوں اور پرائیویسی اصولوں کو مدنظر رکھ کر بنایا گیا۔" },
    ],
    soon: [
      { t: "مریض اکاؤنٹس", b: "اپنی تاریخ محفوظ کریں، علامات ٹریک کریں اور ہر ملاقات میں سیاق رکھیں۔" },
      { t: "کلینک انضمام", b: "کلینک سے جڑیں تاکہ ڈاکٹر کو پہلے ہی خلاصہ مل جائے۔" },
      { t: "ملاقات کی بکنگ", b: "خلاصے کی اسکرین سے ہی اگلی ملاقات بک کریں۔" },
    ],
  },
  mission: {
    quote: "\"صحت کی دیکھ بھال پہلے ہی دباؤ کا باعث ہے۔ بغیر تیاری جانا اس کا حصہ نہیں ہونا چاہیے۔\"",
    attribution: "AEDNAV کے پیچھے سوچ",
    stats: [
      { n: "3 منٹ", l: "اوسط وقت" },
      { n: "7", l: "معاون زبانیں" },
      { n: "2", l: "فی سیشن خلاصے" },
    ],
  },
  cta: {
    title: "اگلی ملاقات کی تیاری کریں؟",
    sub: "3 منٹ۔ 7 زبانیں۔ سائن اپ کی ضرورت نہیں۔",
    button: "میری ملاقات کی تیاری کریں →",
    note: "یہ تشخیصی ذریعہ نہیں ہے۔ ہمیشہ کسی ہیلتھ پروفیشنل سے رجوع کریں۔",
  },
  faqTitle: "عام سوالات",
};

const AR: StoryContent = {
  hero: {
    eyebrow: "تحضير قبل الموعد · 3 دقائق · 7 لغات",
    title1: "ادخل إلى موعدك",
    title2: "مستعدًا تمامًا.",
    sub: "يرشدك AEDNAV عبر أعراضك قبل زيارة الطبيب، لتتذكر ما تريد قوله، ولا تفوتك أي تفصيلة، وليحصل طبيبك على صورة واضحة منذ اللحظة الأولى.",
    primary: "تحضير موعدي",
    secondary: "كيف يعمل",
    note: "ليست أداة تشخيص. استشر دائمًا مختصًا في الرعاية الصحية.",
  },
  problem: {
    title: "تشعر أن هناك شيئًا غير طبيعي.",
    sub: "لكن حين يسأل الطبيب، لا تخرج الكلمات كما ينبغي.",
    lines: [
      "تنسى نصف ما أردت قوله.",
      "تغفل تفاصيل مهمة.",
      "تخرج وأنت تتساءل إن كانت الصورة قد وصلت كاملة.",
    ],
    closeTitle: "معظم المواعيد تبدأ دون تحضير.",
    closeSub: "AEDNAV يغيّر ذلك، للجميع.",
  },
  conversation: {
    title: "يبدأ الأمر بمحادثة.",
    sub: "8 أسئلة موجهة. لغة بسيطة. بلا مصطلحات طبية. نحو 3 دقائق.",
    q1: "ما الذي يشغل بالك قبل هذا الموعد؟",
    a1: "أعاني من صداع شديد منذ 3 أيام، ويزداد سوءًا بعد الظهر.",
    q2: "كيف تقيّم الألم من 1 إلى 10؟",
    a2: "حوالي 6. المسكنات لا تفيد.",
  },
  languages: {
    title: "ويمكنك الإجابة بأي لغة.",
    sub: "صعوبة الإنجليزية يجب ألا تمنعك من شرح حالتك الصحية. يدعم AEDNAV 7 لغات.",
    finalPill: "أعاني من صداع منذ 3 أيام، ويزداد بعد الظهر.",
    note: "يفهم AEDNAV كل اللغات. طبيبك يرى الإنجليزية فقط.",
  },
  summaries: {
    title: "ثم يحصل كل طرف على ما يحتاجه.",
    sub: "جلسة واحدة. ملخصان مخصصان. دون التباس.",
    patientLabel: "ملخصك",
    patientTitle: "جاهز لموعدك",
    patient: [
      { label: "الشكوى الرئيسية", value: "صداع متكرر منذ 3 أيام" },
      { label: "الشدة", value: "6 من 10" },
      { label: "الأدوية المستخدمة", value: "مسكنات بدون وصفة (بلا فائدة)" },
      { label: "سؤالك", value: "هل يمكن أن يكون السبب التوتر؟" },
    ],
    suggested: "اقتراح: زيارة طبيب الأسرة",
    providerLabel: "ملخص لمقدم الرعاية",
    providerTitle: "إنجليزية جاهزة للطبيب",
    provider: [
      { label: "Chief complaint", value: "Recurring headaches × 3 days, afternoon onset" },
      { label: "Severity", value: "6/10 (self-reported)" },
      { label: "Current medications", value: "OTC analgesics (ineffective)" },
      { label: "Patient goal", value: "Understand potential cause" },
      { label: "Allergies", value: "None reported" },
    ],
    providerNote: "يُنشأ بالإنجليزية مهما كانت لغة المريض المختارة.",
    foot: "ملخصك بلغتك. وملخصهم بلغتهم.",
  },
  features: {
    title: "كل ما تحتاجه، دون زيادة.",
    sub: "لدى AEDNAV هدف واحد: أن تكون مستعدًا قبل أن تدخل من ذلك الباب.",
    items: [
      { title: "استبيان موجه للأعراض", body: "8 أسئلة مختارة تكشف ما يحتاج طبيبك لمعرفته: المدة، الشدة، النمط، الأدوية، الحساسية، التاريخ الطبي وأهدافك من الزيارة." },
      { title: "دعم كامل لسبع لغات", body: "الإنجليزية والفرنسية والإسبانية والصينية والبنجابية والأردية والعربية. أجب باللغة الأقرب إليك وبدّل اللغة في أي وقت دون فقدان تقدمك." },
      { title: "ملخصان فوريان", body: "بمجرد الانتهاء تحصل على ملخص للمريض بلغتك وملخص سريري منظم بالإنجليزية لتسليمه لمقدم الرعاية." },
      { title: "الخصوصية أولًا", body: "لا حاجة لحساب في النسخة التجريبية. لا بيع للبيانات. لا إعلانات. معلوماتك الصحية ملك لك." },
    ],
  },
  audience: {
    title: "لكل من يستعد لموعد طبي.",
    sub: "ليس فقط لمن يواجه حاجز اللغة، بل لكل من يريد الحضور مستعدًا.",
    items: [
      { t: "المرضى لأول مرة", b: "لا تعرف ما المتوقع؟ يوضح لك AEDNAV ما تقوله وكيف تقوله." },
      { t: "القادمون الجدد إلى كندا", b: "التعامل مع نظام صحي جديد صعب بما يكفي. استعد بلغتك واعرف خطواتك التالية." },
      { t: "تاريخ طبي معقد", b: "حالات متعددة وقائمة أدوية طويلة وتشخيصات سابقة؟ نظّم كل شيء بوضوح خلال دقائق." },
      { t: "الآباء ومقدمو الرعاية", b: "تحضّر لموعد شخص آخر؟ يرشدك AEDNAV عبر كل تفصيلة حتى لا يُغفل شيء." },
    ],
  },
  roadmap: {
    title: "مصمم لينمو معك.",
    sub: "AEDNAV اليوم نسخة تجريبية عاملة. وهذا ما هو قادم.",
    comingSoon: "قريبًا",
    trust: [
      { t: "الخصوصية أولًا.", b: "لا بيع للبيانات. لا إعلانات. معلوماتك الصحية تبقى لك دائمًا." },
      { t: "لا حاجة لحساب في النسخة التجريبية.", b: "جرّب التجربة الكاملة الآن، دون تسجيل ودون التزام." },
      { t: "مصمم للرعاية الصحية الكندية.", b: "صُمم مع مراعاة المرضى في كندا ومبادئ خصوصية البيانات الصحية." },
    ],
    soon: [
      { t: "حسابات المرضى", b: "احفظ سجلك، وتابع الأعراض مع الوقت، واحتفظ بالسياق في كل موعد." },
      { t: "الربط مع العيادات", b: "اربط حسابك بعيادتك ليصل الملخص إلى مقدم الرعاية قبل وصولك." },
      { t: "حجز المواعيد", b: "احجز المتابعات والإحالات مباشرة من شاشة الملخص." },
    ],
  },
  mission: {
    quote: "«الرعاية الصحية مرهقة بما يكفي. الحضور دون استعداد لا ينبغي أن يكون جزءًا من التجربة.»",
    attribution: "الفكرة وراء AEDNAV",
    stats: [
      { n: "3 دقائق", l: "متوسط وقت التحضير" },
      { n: "7", l: "لغات مدعومة" },
      { n: "2", l: "ملخصان لكل جلسة" },
    ],
  },
  cta: {
    title: "هل أنت مستعد لتحضير موعدك القادم؟",
    sub: "3 دقائق. 7 لغات. دون تسجيل.",
    button: "تحضير موعدي →",
    note: "ليست أداة تشخيص. استشر دائمًا مختصًا في الرعاية الصحية.",
  },
  faqTitle: "أسئلة شائعة",
};

const ALL: Record<LangCode, StoryContent> = {
  en: EN,
  fr: FR,
  es: ES,
  zh: ZH,
  pa: PA,
  ur: UR,
  ar: AR,
};

export function story(lang: LangCode): StoryContent {
  return ALL[lang] ?? EN;
}
