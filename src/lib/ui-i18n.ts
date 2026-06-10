// Site-wide UI translations (chrome, landing, summary chrome).
// Demo translations only. Not professional medical translation.
import type { LangCode } from "./i18n";

export type UIStrings = {
  nav: { how: string; features: string; faq: string; startIntake: string; changeLang: string };
  chrome: {
    exit: string;
    change: string;
    stepLabel: (n: number, total: number) => string;
    progressOf: (n: number, total: number) => string;
  };
  langGate: {
    title: string;
    subtitle: string;
    continue: string;
    note: string;
    intakeSubtitle: string;
    demoNote: string;
  };
  dashboard: {
    windowLabel: string;
    chat1: string;
    chat2: string;
    chat3: string;
    visitSummary: string;
    pending: string;
    concernValue: string;
    durationValue: string;
    patternValue: string;
    careOption: string;
    careValue: string;
    careNote: string;
    labels: { concern: string; duration: string; pattern: string; severity: string; medications: string };
  };
  hero: {
    eyebrow: string; title1: string; title2: string; sub: string;
    primary: string; secondary: string; note: string;
  };
  sectionTitles: {
    featuresEyebrow: string; featuresTitle: string;
    howEyebrow: string; howTitle: string;
    dualEyebrow: string; dualTitle: string; dualBody: string;
    whoEyebrow: string; whoTitle: string;
    safetyEyebrow: string; safetyTitle: string;
    faq: string; ctaTitle: string; ctaBody: string; ctaButton: string;
  };
  footer: { disclaimerLabel: string; disclaimer: string; rights: string; tagline: string };
  summary: {
    backToIntake: string; edit: string; cancel: string; save: string;
    copyPatient: string; copyProvider: string; copyBoth: string; copySummary: string;
    copied: string; printSummary: string; printPatient: string; printProvider: string; printBoth: string;
    patientTab: string; providerTab: string; preparing: string;
    translationDisclaimer: string; summaryDisclaimer: string;
    generalDisclaimer: string; emergencyDisclaimer: string;
  };
};

const EN: UIStrings = {
  nav: { how: "How it works", features: "Features", faq: "FAQ", startIntake: "Start intake", changeLang: "Language" },
  langGate: {
    title: "Choose your language",
    subtitle: "Pick the language you're most comfortable with. You can change it anytime.",
    continue: "Continue",
    note: "Used across the site. Stored only in this browser session.",
  },
  hero: {
    eyebrow: "Pre-appointment preparation",
    title1: "Prepare for your",
    title2: "appointment.",
    sub: "AEDNAV helps patients organize their health concerns before care, with multilingual support for families who are more comfortable in another language.",
    primary: "Start intake",
    secondary: "See how it works",
    note: "Built for clear communication in any language.",
  },
  sectionTitles: {
    featuresEyebrow: "What it does",
    featuresTitle: "Organized concerns. Clearer visits.",
    howEyebrow: "How it works",
    howTitle: "Five steps. About three minutes.",
    dualEyebrow: "Built for clear communication in any language",
    dualTitle: "Explain in your language. Share in English.",
    dualBody: "Patients can complete intake in their preferred language. Providers receive a clear English summary they can read in seconds.",
    whoEyebrow: "Who AEDNAV helps",
    whoTitle: "Built for the people who do the explaining.",
    safetyEyebrow: "Safety",
    safetyTitle: "Built for preparation, not diagnosis.",
    faq: "Frequently asked",
    ctaTitle: "Ready for your next visit?",
    ctaBody: "About three minutes in your language. A clearer conversation in English.",
    ctaButton: "Start intake",
  },
  footer: {
    disclaimerLabel: "Medical disclaimer.",
    disclaimer: "AEDNAV is not a diagnostic tool and does not replace consultation with a licensed healthcare professional. In a medical emergency, call 911.",
    rights: "© {year} AEDNAV",
    tagline: "Built for clarity, not diagnosis.",
  },
  summary: {
    backToIntake: "← Start a new intake",
    edit: "Edit summary",
    cancel: "Cancel",
    save: "Save changes",
    copyPatient: "Copy patient summary",
    copyProvider: "Copy provider summary",
    copyBoth: "Copy both",
    copySummary: "Copy summary",
    copied: "Copied",
    printSummary: "Print / Save as PDF",
    printPatient: "Print patient summary",
    printProvider: "Print provider summary",
    printBoth: "Print both",
    patientTab: "Patient summary",
    providerTab: "Provider summary",
    preparing: "Preparing your summary…",
    translationDisclaimer: "Translations may contain errors and do not replace professional medical interpretation.",
    summaryDisclaimer: "This summary is for preparation and communication support only. It may contain errors and does not replace medical advice, diagnosis, or treatment.",
    generalDisclaimer: "AEDNAV helps organize information before care. It does not diagnose, treat, or replace healthcare professionals.",
    emergencyDisclaimer: "AEDNAV is not for emergencies. If this may be urgent, call 911 or seek immediate help.",
  },
};

const FR: UIStrings = {
  nav: { how: "Comment ça marche", features: "Fonctionnalités", faq: "FAQ", startIntake: "Commencer", changeLang: "Langue" },
  langGate: {
    title: "Choisissez votre langue",
    subtitle: "Sélectionnez la langue qui vous convient le mieux. Vous pouvez la changer à tout moment.",
    continue: "Continuer",
    note: "Utilisée sur tout le site. Conservée uniquement dans cette session.",
  },
  hero: {
    eyebrow: "Préparation avant rendez-vous",
    title1: "Préparez votre",
    title2: "rendez-vous.",
    sub: "AEDNAV aide les patients à organiser leurs préoccupations de santé avant la consultation, avec un soutien multilingue pour les familles plus à l'aise dans une autre langue.",
    primary: "Commencer",
    secondary: "Voir comment ça marche",
    note: "Conçu pour une communication claire dans n'importe quelle langue.",
  },
  sectionTitles: {
    featuresEyebrow: "Ce qu'il fait",
    featuresTitle: "Préoccupations organisées. Visites plus claires.",
    howEyebrow: "Comment ça marche",
    howTitle: "Cinq étapes. Environ trois minutes.",
    dualEyebrow: "Conçu pour une communication claire dans n'importe quelle langue",
    dualTitle: "Expliquez dans votre langue. Partagez en anglais.",
    dualBody: "Les patients complètent l'intake dans leur langue préférée. Les soignants reçoivent un résumé clair en anglais.",
    whoEyebrow: "Pour qui AEDNAV est conçu",
    whoTitle: "Pour celles et ceux qui doivent expliquer.",
    safetyEyebrow: "Sécurité",
    safetyTitle: "Conçu pour la préparation, pas le diagnostic.",
    faq: "Questions fréquentes",
    ctaTitle: "Prêt·e pour votre prochaine visite ?",
    ctaBody: "Environ trois minutes dans votre langue. Une conversation plus claire en anglais.",
    ctaButton: "Commencer",
  },
  footer: {
    disclaimerLabel: "Avis médical.",
    disclaimer: "AEDNAV n'est pas un outil de diagnostic et ne remplace pas une consultation avec un professionnel de santé. En cas d'urgence, appelez le 911.",
    rights: "© {year} AEDNAV",
    tagline: "Conçu pour la clarté, pas le diagnostic.",
  },
  summary: {
    backToIntake: "← Commencer un nouvel intake",
    edit: "Modifier le résumé",
    cancel: "Annuler",
    save: "Enregistrer",
    copyPatient: "Copier le résumé patient",
    copyProvider: "Copier le résumé pour le médecin",
    copyBoth: "Copier les deux",
    copySummary: "Copier le résumé",
    copied: "Copié",
    printSummary: "Imprimer / PDF",
    printPatient: "Imprimer le résumé patient",
    printProvider: "Imprimer le résumé médecin",
    printBoth: "Imprimer les deux",
    patientTab: "Résumé patient",
    providerTab: "Résumé médecin",
    preparing: "Préparation de votre résumé…",
    translationDisclaimer: "Les traductions peuvent contenir des erreurs et ne remplacent pas l'interprétation médicale professionnelle.",
    summaryDisclaimer: "Ce résumé sert uniquement à la préparation et à la communication. Il peut contenir des erreurs et ne remplace pas un avis médical, un diagnostic ou un traitement.",
    generalDisclaimer: "AEDNAV aide à organiser l'information avant les soins. Il ne diagnostique pas et ne remplace pas un professionnel de santé.",
    emergencyDisclaimer: "AEDNAV n'est pas conçu pour les urgences. En cas d'urgence, appelez le 911.",
  },
};

const ES: UIStrings = {
  nav: { how: "Cómo funciona", features: "Funciones", faq: "Preguntas", startIntake: "Comenzar", changeLang: "Idioma" },
  langGate: {
    title: "Elige tu idioma",
    subtitle: "Selecciona el idioma con el que te sientes más cómodo/a. Puedes cambiarlo en cualquier momento.",
    continue: "Continuar",
    note: "Se usa en todo el sitio. Guardado solo en esta sesión del navegador.",
  },
  hero: {
    eyebrow: "Preparación previa a la cita",
    title1: "Prepárate para",
    title2: "tu cita.",
    sub: "AEDNAV ayuda a los pacientes a organizar sus inquietudes de salud antes de la atención, con soporte multilingüe para las familias que prefieren otro idioma.",
    primary: "Comenzar",
    secondary: "Ver cómo funciona",
    note: "Diseñado para una comunicación clara en cualquier idioma.",
  },
  sectionTitles: {
    featuresEyebrow: "Qué hace",
    featuresTitle: "Inquietudes organizadas. Visitas más claras.",
    howEyebrow: "Cómo funciona",
    howTitle: "Cinco pasos. Unos tres minutos.",
    dualEyebrow: "Diseñado para una comunicación clara en cualquier idioma",
    dualTitle: "Explica en tu idioma. Comparte en inglés.",
    dualBody: "Los pacientes completan el intake en su idioma preferido. Los profesionales reciben un resumen claro en inglés.",
    whoEyebrow: "A quién ayuda AEDNAV",
    whoTitle: "Para las personas que tienen que explicar.",
    safetyEyebrow: "Seguridad",
    safetyTitle: "Hecho para la preparación, no para diagnosticar.",
    faq: "Preguntas frecuentes",
    ctaTitle: "¿Listo/a para tu próxima visita?",
    ctaBody: "Unos tres minutos en tu idioma. Una conversación más clara en inglés.",
    ctaButton: "Comenzar",
  },
  footer: {
    disclaimerLabel: "Aviso médico.",
    disclaimer: "AEDNAV no es una herramienta de diagnóstico y no reemplaza la consulta con un profesional de salud. En una emergencia, llama al 911.",
    rights: "© {year} AEDNAV",
    tagline: "Hecho para la claridad, no para el diagnóstico.",
  },
  summary: {
    backToIntake: "← Iniciar un nuevo intake",
    edit: "Editar resumen",
    cancel: "Cancelar",
    save: "Guardar",
    copyPatient: "Copiar resumen del paciente",
    copyProvider: "Copiar resumen del médico",
    copyBoth: "Copiar ambos",
    copySummary: "Copiar resumen",
    copied: "Copiado",
    printSummary: "Imprimir / Guardar PDF",
    printPatient: "Imprimir resumen del paciente",
    printProvider: "Imprimir resumen del médico",
    printBoth: "Imprimir ambos",
    patientTab: "Resumen del paciente",
    providerTab: "Resumen del médico",
    preparing: "Preparando tu resumen…",
    translationDisclaimer: "Las traducciones pueden contener errores y no reemplazan la interpretación médica profesional.",
    summaryDisclaimer: "Este resumen es solo para preparación y apoyo a la comunicación. Puede contener errores y no reemplaza el consejo, diagnóstico ni tratamiento médico.",
    generalDisclaimer: "AEDNAV ayuda a organizar información antes de la atención. No diagnostica ni reemplaza a profesionales de salud.",
    emergencyDisclaimer: "AEDNAV no es para emergencias. Si es urgente, llama al 911.",
  },
};

const ZH: UIStrings = {
  nav: { how: "如何使用", features: "功能", faq: "常见问题", startIntake: "开始", changeLang: "语言" },
  langGate: {
    title: "选择您的语言",
    subtitle: "选择您最熟悉的语言。您可以随时更改。",
    continue: "继续",
    note: "在整个网站使用。仅保存在此浏览器会话中。",
  },
  hero: {
    eyebrow: "就诊前准备",
    title1: "为就诊",
    title2: "做好准备。",
    sub: "AEDNAV 帮助患者在就医前整理健康问题,并为更习惯使用其他语言的家庭提供多语言支持。",
    primary: "开始",
    secondary: "了解如何使用",
    note: "为任何语言下的清晰沟通而设计。",
  },
  sectionTitles: {
    featuresEyebrow: "它能做什么",
    featuresTitle: "有条理的问题。更清晰的就诊。",
    howEyebrow: "如何使用",
    howTitle: "五个步骤,约三分钟。",
    dualEyebrow: "为任何语言下的清晰沟通而设计",
    dualTitle: "用您的语言说明。用英文分享。",
    dualBody: "患者用首选语言完成信息收集。医生收到一份清晰的英文摘要。",
    whoEyebrow: "AEDNAV 帮助谁",
    whoTitle: "为需要说明病情的人而做。",
    safetyEyebrow: "安全",
    safetyTitle: "用于准备,不用于诊断。",
    faq: "常见问题",
    ctaTitle: "准备好下一次就诊了吗?",
    ctaBody: "用您的语言约三分钟。用英文进行更清晰的对话。",
    ctaButton: "开始",
  },
  footer: {
    disclaimerLabel: "医疗免责声明。",
    disclaimer: "AEDNAV 不是诊断工具,不能替代专业医疗咨询。如有医疗紧急情况,请拨打 911。",
    rights: "© {year} AEDNAV",
    tagline: "为清晰而设,不为诊断。",
  },
  summary: {
    backToIntake: "← 开始新的信息收集",
    edit: "编辑摘要",
    cancel: "取消",
    save: "保存",
    copyPatient: "复制患者摘要",
    copyProvider: "复制医生摘要",
    copyBoth: "全部复制",
    copySummary: "复制摘要",
    copied: "已复制",
    printSummary: "打印 / 另存为 PDF",
    printPatient: "打印患者摘要",
    printProvider: "打印医生摘要",
    printBoth: "全部打印",
    patientTab: "患者摘要",
    providerTab: "医生摘要",
    preparing: "正在准备您的摘要…",
    translationDisclaimer: "翻译可能存在错误,不能替代专业医疗翻译。",
    summaryDisclaimer: "本摘要仅用于准备和沟通支持。可能存在错误,不能替代医疗建议、诊断或治疗。",
    generalDisclaimer: "AEDNAV 帮助在就医前整理信息。不进行诊断,也不能替代医疗专业人员。",
    emergencyDisclaimer: "AEDNAV 不适用于紧急情况。如有紧急情况,请拨打 911。",
  },
};

const PA: UIStrings = {
  nav: { how: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ", features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ", faq: "ਸਵਾਲ", startIntake: "ਸ਼ੁਰੂ ਕਰੋ", changeLang: "ਭਾਸ਼ਾ" },
  langGate: {
    title: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    subtitle: "ਉਹ ਭਾਸ਼ਾ ਚੁਣੋ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਸਭ ਤੋਂ ਅਰਾਮਦਾਇਕ ਹੋ। ਤੁਸੀਂ ਇਸਨੂੰ ਕਿਸੇ ਵੀ ਸਮੇਂ ਬਦਲ ਸਕਦੇ ਹੋ।",
    continue: "ਜਾਰੀ ਰੱਖੋ",
    note: "ਪੂਰੀ ਸਾਈਟ 'ਤੇ ਵਰਤੀ ਜਾਂਦੀ ਹੈ। ਸਿਰਫ਼ ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਸੈਸ਼ਨ ਵਿੱਚ ਸਟੋਰ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
  },
  hero: {
    eyebrow: "ਮੁਲਾਕਾਤ ਤੋਂ ਪਹਿਲਾਂ ਦੀ ਤਿਆਰੀ",
    title1: "ਆਪਣੀ ਮੁਲਾਕਾਤ ਲਈ",
    title2: "ਤਿਆਰੀ ਕਰੋ।",
    sub: "AEDNAV ਮਰੀਜ਼ਾਂ ਨੂੰ ਦੇਖਭਾਲ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣੀਆਂ ਚਿੰਤਾਵਾਂ ਨੂੰ ਵਿਵਸਥਿਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ, ਅਤੇ ਉਹਨਾਂ ਪਰਿਵਾਰਾਂ ਲਈ ਬਹੁ-ਭਾਸ਼ੀ ਸਹਾਇਤਾ ਦਿੰਦਾ ਹੈ ਜੋ ਕਿਸੇ ਹੋਰ ਭਾਸ਼ਾ ਵਿੱਚ ਵਧੇਰੇ ਅਰਾਮਦਾਇਕ ਹਨ।",
    primary: "ਸ਼ੁਰੂ ਕਰੋ",
    secondary: "ਦੇਖੋ ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    note: "ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਪਸ਼ਟ ਸੰਚਾਰ ਲਈ ਬਣਾਇਆ ਗਿਆ।",
  },
  sectionTitles: {
    featuresEyebrow: "ਇਹ ਕੀ ਕਰਦਾ ਹੈ",
    featuresTitle: "ਵਿਵਸਥਿਤ ਚਿੰਤਾਵਾਂ। ਸਾਫ਼ ਮੁਲਾਕਾਤਾਂ।",
    howEyebrow: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    howTitle: "ਪੰਜ ਕਦਮ। ਲਗਭਗ ਤਿੰਨ ਮਿੰਟ।",
    dualEyebrow: "ਕਿਸੇ ਵੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਪਸ਼ਟ ਸੰਚਾਰ ਲਈ",
    dualTitle: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮਝਾਓ। ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਸਾਂਝਾ ਕਰੋ।",
    dualBody: "ਮਰੀਜ਼ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਵਿੱਚ ਜਾਣਕਾਰੀ ਪੂਰੀ ਕਰਦੇ ਹਨ। ਡਾਕਟਰ ਨੂੰ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਸਾਫ਼ ਸਾਰ ਮਿਲਦਾ ਹੈ।",
    whoEyebrow: "AEDNAV ਕਿਸ ਦੀ ਮਦਦ ਕਰਦਾ ਹੈ",
    whoTitle: "ਉਨ੍ਹਾਂ ਲਈ ਜੋ ਸਮਝਾਉਂਦੇ ਹਨ।",
    safetyEyebrow: "ਸੁਰੱਖਿਆ",
    safetyTitle: "ਤਿਆਰੀ ਲਈ, ਜਾਂਚ ਲਈ ਨਹੀਂ।",
    faq: "ਆਮ ਸਵਾਲ",
    ctaTitle: "ਆਪਣੀ ਅਗਲੀ ਮੁਲਾਕਾਤ ਲਈ ਤਿਆਰ?",
    ctaBody: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲਗਭਗ ਤਿੰਨ ਮਿੰਟ। ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਇੱਕ ਸਾਫ਼ ਗੱਲਬਾਤ।",
    ctaButton: "ਸ਼ੁਰੂ ਕਰੋ",
  },
  footer: {
    disclaimerLabel: "ਡਾਕਟਰੀ ਚੇਤਾਵਨੀ।",
    disclaimer: "AEDNAV ਜਾਂਚ ਦਾ ਸਾਧਨ ਨਹੀਂ ਹੈ ਅਤੇ ਡਾਕਟਰੀ ਮਾਹਰ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ। ਡਾਕਟਰੀ ਐਮਰਜੈਂਸੀ ਵਿੱਚ 911 ਤੇ ਕਾਲ ਕਰੋ।",
    rights: "© {year} AEDNAV",
    tagline: "ਸਪਸ਼ਟਤਾ ਲਈ, ਜਾਂਚ ਲਈ ਨਹੀਂ।",
  },
  summary: {
    backToIntake: "← ਨਵੀਂ ਜਾਣਕਾਰੀ ਸ਼ੁਰੂ ਕਰੋ",
    edit: "ਸਾਰ ਸੋਧੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    save: "ਸੰਭਾਲੋ",
    copyPatient: "ਮਰੀਜ਼ ਦਾ ਸਾਰ ਕਾਪੀ ਕਰੋ",
    copyProvider: "ਡਾਕਟਰ ਦਾ ਸਾਰ ਕਾਪੀ ਕਰੋ",
    copyBoth: "ਦੋਵੇਂ ਕਾਪੀ ਕਰੋ",
    copySummary: "ਸਾਰ ਕਾਪੀ ਕਰੋ",
    copied: "ਕਾਪੀ ਹੋਇਆ",
    printSummary: "ਪ੍ਰਿੰਟ / PDF",
    printPatient: "ਮਰੀਜ਼ ਸਾਰ ਪ੍ਰਿੰਟ ਕਰੋ",
    printProvider: "ਡਾਕਟਰ ਸਾਰ ਪ੍ਰਿੰਟ ਕਰੋ",
    printBoth: "ਦੋਵੇਂ ਪ੍ਰਿੰਟ ਕਰੋ",
    patientTab: "ਮਰੀਜ਼ ਸਾਰ",
    providerTab: "ਡਾਕਟਰ ਸਾਰ",
    preparing: "ਤੁਹਾਡਾ ਸਾਰ ਤਿਆਰ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ…",
    translationDisclaimer: "ਅਨੁਵਾਦਾਂ ਵਿੱਚ ਗਲਤੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ ਅਤੇ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਅਨੁਵਾਦ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦੇ।",
    summaryDisclaimer: "ਇਹ ਸਾਰ ਸਿਰਫ਼ ਤਿਆਰੀ ਅਤੇ ਸੰਚਾਰ ਲਈ ਹੈ। ਇਸ ਵਿੱਚ ਗਲਤੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ ਅਤੇ ਇਹ ਡਾਕਟਰੀ ਸਲਾਹ, ਜਾਂਚ ਜਾਂ ਇਲਾਜ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ।",
    generalDisclaimer: "AEDNAV ਦੇਖਭਾਲ ਤੋਂ ਪਹਿਲਾਂ ਜਾਣਕਾਰੀ ਨੂੰ ਵਿਵਸਥਿਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ। ਇਹ ਜਾਂਚ ਨਹੀਂ ਕਰਦਾ ਅਤੇ ਡਾਕਟਰੀ ਮਾਹਰ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ।",
    emergencyDisclaimer: "AEDNAV ਐਮਰਜੈਂਸੀ ਲਈ ਨਹੀਂ ਹੈ। ਜੇ ਜ਼ਰੂਰੀ ਹੋਵੇ, 911 ਤੇ ਕਾਲ ਕਰੋ।",
  },
};

const UR: UIStrings = {
  nav: { how: "یہ کیسے کام کرتا ہے", features: "خصوصیات", faq: "سوالات", startIntake: "شروع کریں", changeLang: "زبان" },
  langGate: {
    title: "اپنی زبان منتخب کریں",
    subtitle: "وہ زبان منتخب کریں جس میں آپ سب سے زیادہ آرام دہ ہیں۔ آپ اسے کسی بھی وقت تبدیل کر سکتے ہیں۔",
    continue: "جاری رکھیں",
    note: "پوری سائٹ پر استعمال ہوتی ہے۔ صرف اس براؤزر سیشن میں محفوظ ہوتی ہے۔",
  },
  hero: {
    eyebrow: "ملاقات سے پہلے کی تیاری",
    title1: "اپنی ملاقات کی",
    title2: "تیاری کریں۔",
    sub: "AEDNAV مریضوں کو دیکھ بھال سے پہلے اپنی صحت کی پریشانیوں کو منظم کرنے میں مدد کرتا ہے، ان خاندانوں کے لیے کثیر لسانی مدد کے ساتھ جو دوسری زبان میں زیادہ آرام دہ ہیں۔",
    primary: "شروع کریں",
    secondary: "دیکھیں یہ کیسے کام کرتا ہے",
    note: "کسی بھی زبان میں واضح بات چیت کے لیے بنایا گیا۔",
  },
  sectionTitles: {
    featuresEyebrow: "یہ کیا کرتا ہے",
    featuresTitle: "منظم پریشانیاں۔ واضح ملاقاتیں۔",
    howEyebrow: "یہ کیسے کام کرتا ہے",
    howTitle: "پانچ مراحل۔ تقریباً تین منٹ۔",
    dualEyebrow: "کسی بھی زبان میں واضح بات چیت کے لیے",
    dualTitle: "اپنی زبان میں سمجھائیں۔ انگریزی میں شیئر کریں۔",
    dualBody: "مریض اپنی پسندیدہ زبان میں معلومات مکمل کرتے ہیں۔ ڈاکٹروں کو انگریزی میں واضح خلاصہ ملتا ہے۔",
    whoEyebrow: "AEDNAV کس کی مدد کرتا ہے",
    whoTitle: "ان کے لیے جنہیں سمجھانا پڑتا ہے۔",
    safetyEyebrow: "حفاظت",
    safetyTitle: "تیاری کے لیے، تشخیص کے لیے نہیں۔",
    faq: "عام سوالات",
    ctaTitle: "اپنی اگلی ملاقات کے لیے تیار؟",
    ctaBody: "آپ کی زبان میں تقریباً تین منٹ۔ انگریزی میں ایک واضح گفتگو۔",
    ctaButton: "شروع کریں",
  },
  footer: {
    disclaimerLabel: "طبی انتباہ۔",
    disclaimer: "AEDNAV تشخیصی آلہ نہیں ہے اور صحت کے پیشہ ور سے مشاورت کا متبادل نہیں ہے۔ طبی ایمرجنسی میں 911 پر کال کریں۔",
    rights: "© {year} AEDNAV",
    tagline: "وضاحت کے لیے، تشخیص کے لیے نہیں۔",
  },
  summary: {
    backToIntake: "← نئی معلومات شروع کریں",
    edit: "خلاصہ میں ترمیم کریں",
    cancel: "منسوخ کریں",
    save: "محفوظ کریں",
    copyPatient: "مریض کا خلاصہ کاپی کریں",
    copyProvider: "ڈاکٹر کا خلاصہ کاپی کریں",
    copyBoth: "دونوں کاپی کریں",
    copySummary: "خلاصہ کاپی کریں",
    copied: "کاپی ہوگیا",
    printSummary: "پرنٹ / PDF محفوظ کریں",
    printPatient: "مریض کا خلاصہ پرنٹ کریں",
    printProvider: "ڈاکٹر کا خلاصہ پرنٹ کریں",
    printBoth: "دونوں پرنٹ کریں",
    patientTab: "مریض کا خلاصہ",
    providerTab: "ڈاکٹر کا خلاصہ",
    preparing: "آپ کا خلاصہ تیار کیا جا رہا ہے…",
    translationDisclaimer: "ترجمے میں غلطیاں ہو سکتی ہیں اور یہ پیشہ ورانہ طبی ترجمانی کا متبادل نہیں ہیں۔",
    summaryDisclaimer: "یہ خلاصہ صرف تیاری اور رابطے کی مدد کے لیے ہے۔ اس میں غلطیاں ہو سکتی ہیں اور یہ طبی مشورے، تشخیص، یا علاج کا متبادل نہیں ہے۔",
    generalDisclaimer: "AEDNAV دیکھ بھال سے پہلے معلومات کو منظم کرنے میں مدد کرتا ہے۔ یہ تشخیص نہیں کرتا اور صحت کے پیشہ ور افراد کا متبادل نہیں ہے۔",
    emergencyDisclaimer: "AEDNAV ایمرجنسی کے لیے نہیں ہے۔ اگر یہ ضروری ہو تو 911 پر کال کریں۔",
  },
};

const AR: UIStrings = {
  nav: { how: "كيف يعمل", features: "الميزات", faq: "الأسئلة", startIntake: "ابدأ", changeLang: "اللغة" },
  langGate: {
    title: "اختر لغتك",
    subtitle: "اختر اللغة التي تشعر بالراحة معها أكثر. يمكنك تغييرها في أي وقت.",
    continue: "متابعة",
    note: "تُستخدم في جميع أنحاء الموقع. مخزّنة في جلسة المتصفح فقط.",
  },
  hero: {
    eyebrow: "التحضير قبل الموعد",
    title1: "حضّر",
    title2: "موعدك.",
    sub: "يساعد AEDNAV المرضى على تنظيم مخاوفهم الصحية قبل تلقي الرعاية، مع دعم متعدد اللغات للعائلات التي تفضل لغة أخرى.",
    primary: "ابدأ",
    secondary: "انظر كيف يعمل",
    note: "مصمم للتواصل الواضح بأي لغة.",
  },
  sectionTitles: {
    featuresEyebrow: "ماذا يفعل",
    featuresTitle: "مخاوف منظمة. زيارات أوضح.",
    howEyebrow: "كيف يعمل",
    howTitle: "خمس خطوات. حوالي ثلاث دقائق.",
    dualEyebrow: "مصمم للتواصل الواضح بأي لغة",
    dualTitle: "اشرح بلغتك. شارك بالإنجليزية.",
    dualBody: "يكمل المرضى المعلومات بلغتهم المفضلة. يتلقى الأطباء ملخصًا واضحًا بالإنجليزية.",
    whoEyebrow: "من يساعده AEDNAV",
    whoTitle: "للأشخاص الذين يقومون بالشرح.",
    safetyEyebrow: "السلامة",
    safetyTitle: "للتحضير، وليس للتشخيص.",
    faq: "الأسئلة الشائعة",
    ctaTitle: "جاهز لزيارتك القادمة؟",
    ctaBody: "حوالي ثلاث دقائق بلغتك. محادثة أوضح بالإنجليزية.",
    ctaButton: "ابدأ",
  },
  footer: {
    disclaimerLabel: "إخلاء طبي.",
    disclaimer: "AEDNAV ليس أداة تشخيص ولا يحل محل استشارة المختصين الصحيين. في حالة الطوارئ، اتصل بـ 911.",
    rights: "© {year} AEDNAV",
    tagline: "للوضوح، وليس للتشخيص.",
  },
  summary: {
    backToIntake: "← ابدأ معلومات جديدة",
    edit: "تعديل الملخص",
    cancel: "إلغاء",
    save: "حفظ",
    copyPatient: "نسخ ملخص المريض",
    copyProvider: "نسخ ملخص الطبيب",
    copyBoth: "نسخ كليهما",
    copySummary: "نسخ الملخص",
    copied: "تم النسخ",
    printSummary: "طباعة / حفظ PDF",
    printPatient: "طباعة ملخص المريض",
    printProvider: "طباعة ملخص الطبيب",
    printBoth: "طباعة كليهما",
    patientTab: "ملخص المريض",
    providerTab: "ملخص الطبيب",
    preparing: "جارٍ تحضير ملخصك…",
    translationDisclaimer: "قد تحتوي الترجمات على أخطاء ولا تحل محل الترجمة الطبية المتخصصة.",
    summaryDisclaimer: "هذا الملخص لأغراض التحضير والتواصل فقط. قد يحتوي على أخطاء ولا يحل محل المشورة أو التشخيص أو العلاج الطبي.",
    generalDisclaimer: "يساعد AEDNAV على تنظيم المعلومات قبل الرعاية. لا يُشخّص ولا يحل محل المختصين الصحيين.",
    emergencyDisclaimer: "AEDNAV ليس للحالات الطارئة. إن كان الأمر عاجلاً، اتصل بـ 911.",
  },
};

export const UI_TRANSLATIONS: Record<LangCode, UIStrings> = {
  en: EN, fr: FR, es: ES, zh: ZH, pa: PA, ur: UR, ar: AR,
};

export function ui(lang: LangCode): UIStrings {
  return UI_TRANSLATIONS[lang] ?? EN;
}

// ---- Mock translation of user-provided text into English ----
// Demo only. Replace with Claude/OpenAI later.
export function translateToEnglish(text: string, sourceLang: LangCode): string {
  if (!text) return "";
  if (sourceLang === "en") return text;
  // Demo behavior: prefix with [Translated from X] so the UX flow is demonstrable.
  // A real implementation would call an LLM.
  const langName = ({
    fr: "French", es: "Spanish", zh: "Mandarin", pa: "Punjabi",
    ur: "Urdu", ar: "Arabic", en: "English",
  } as Record<LangCode, string>)[sourceLang];
  return `[Translated from ${langName}] ${text}`;
}
