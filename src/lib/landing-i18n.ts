// Landing-page content translations for AEDNAV.
// Keeps the long arrays out of ui-i18n.ts.
import type { LangCode } from "./i18n";

export type LandingContent = {
  steps: { n: string; title: string; body: string }[];
  audiences: { title: string; body: string }[];
  safety: string[];
  faqs: { q: string; a: string }[];
  features: { title: string; body: string }[];
  dual: {
    sectionBody: string;
    patientLabel: string;
    patientTitle: string;
    patientLangLabel: string;
    patientFields: { concern: string; timeline: string; questions: string };
    patientConcern: string;
    patientTimeline: string;
    patientQuestions: string[];
    providerLabel: string;
    providerTitle: string;
    providerFields: { concern: string; timeline: string; questions: string };
    providerConcern: string;
    providerTimeline: string;
    providerQuestions: string[];
    note: string;
  };
};

const EN: LandingContent = {
  steps: [
    { n: "01", title: "Choose your language", body: "Pick the language you're most comfortable describing your health in." },
    { n: "02", title: "Describe your concern", body: "Share what's been on your mind in your own words. No forms, no jargon." },
    { n: "03", title: "Answer guided questions", body: "Short follow-ups about timing, severity, medications, allergies, and history." },
    { n: "04", title: "Review your answers", body: "See everything in one place and edit anything before generating the summary." },
    { n: "05", title: "Create a summary for your appointment", body: "A patient summary in your language and an English summary for your provider, ready to share." },
  ],
  audiences: [
    { title: "Newcomers to Canada", body: "Prepare for an appointment in your strongest language and bring an English summary." },
    { title: "Families supporting relatives", body: "Help a parent, grandparent, or partner organize what to bring to a visit." },
    { title: "Students preparing for appointments", body: "Get clear on what to say before a campus or community clinic visit." },
    { title: "Patients more comfortable in another language", body: "Skip the live translation pressure, describe symptoms calmly first." },
    { title: "Anyone who forgets what to say in the room", body: "Walk in with a written summary, not a blank mind." },
  ],
  safety: [
    "AEDNAV does not diagnose or treat conditions.",
    "AEDNAV does not replace healthcare professionals.",
    "AEDNAV does not replace professional medical interpreters.",
    "AEDNAV helps you organize information before care.",
  ],
  faqs: [
    { q: "Is AEDNAV a diagnostic tool?", a: "No. AEDNAV does not diagnose conditions or recommend treatments. It helps you organize what you're experiencing so you can communicate clearly with a licensed healthcare provider." },
    { q: "Are the translations clinical-grade?", a: "No. AEDNAV provides demo translations to support communication and preparation. It is not a substitute for a professional medical interpreter." },
    { q: "Will my information be shared?", a: "Your intake stays in your browser session. You decide whether to copy, print, or share your visit summary with a provider." },
    { q: "What if I'm experiencing an emergency?", a: "AEDNAV is not for emergencies. If you have chest pain, difficulty breathing, stroke symptoms, or thoughts of self-harm, contact local emergency services immediately." },
  ],
  features: [
    { title: "Multilingual intake", body: "Describe what you're experiencing in your own language, no translating in your head." },
    { title: "Dual-language visit summary", body: "Two synced summaries: one in your language, one in English to share with your provider." },
    { title: "Doctor-ready English summary", body: "Concerns, timeline, medications, allergies, and questions, organized in clinical-style English." },
    { title: "Appointment preparation", body: "Walk in knowing what to ask, what to mention first, and what to bring along." },
  ],
  dual: {
    sectionBody: "Read your visit summary in your language. Show the English version to your healthcare provider. Both come from the same intake.",
    patientLabel: "Patient summary",
    patientTitle: "In your selected language",
    patientLangLabel: "In your language",
    patientFields: { concern: "Main concern", timeline: "Duration & severity", questions: "Questions to ask the doctor" },
    patientConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    patientTimeline: "About 3 days · 6/10 at worst.",
    patientQuestions: ["What might be causing these headaches?", "Are there tests that would help?"],
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    providerFields: { concern: "Main concern", timeline: "Timeline & severity", questions: "Patient questions" },
    providerConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    providerTimeline: "Duration ~3 days · 6/10 at worst (self-reported).",
    providerQuestions: ["What might be causing the headaches?", "Are there tests that would help clarify this?"],
    note: "For preparation and communication support only. Not a diagnosis.",
  },
};

const FR: LandingContent = {
  steps: [
    { n: "01", title: "Choisissez votre langue", body: "Sélectionnez la langue dans laquelle vous décrivez le mieux votre santé." },
    { n: "02", title: "Décrivez votre préoccupation", body: "Partagez ce qui vous préoccupe dans vos propres mots. Sans formulaires, sans jargon." },
    { n: "03", title: "Répondez aux questions guidées", body: "De courtes questions sur la durée, l'intensité, les médicaments, allergies et antécédents." },
    { n: "04", title: "Vérifiez vos réponses", body: "Voyez tout au même endroit et modifiez ce qui doit l'être avant de générer le résumé." },
    { n: "05", title: "Recevez les deux résumés", body: "Un résumé patient dans votre langue et un résumé en anglais pour votre soignant." },
  ],
  audiences: [
    { title: "Nouveaux arrivants au Canada", body: "Préparez votre rendez-vous dans votre langue forte et apportez un résumé en anglais." },
    { title: "Familles qui aident leurs proches", body: "Aidez un parent, un grand-parent ou un conjoint à organiser ce qu'il faut apporter." },
    { title: "Étudiant·e·s avant un rendez-vous", body: "Soyez clair sur ce que vous voulez dire avant une visite à la clinique." },
    { title: "Patient·e·s plus à l'aise dans une autre langue", body: "Évitez la pression de la traduction en direct, décrivez d'abord vos symptômes calmement." },
    { title: "Toute personne qui oublie quoi dire", body: "Entrez avec un résumé écrit, pas l'esprit vide." },
  ],
  safety: [
    "AEDNAV ne pose pas de diagnostic et ne traite pas.",
    "AEDNAV ne remplace pas les professionnels de santé.",
    "AEDNAV ne remplace pas un interprète médical professionnel.",
    "AEDNAV vous aide à organiser l'information avant les soins.",
  ],
  faqs: [
    { q: "AEDNAV est-il un outil de diagnostic ?", a: "Non. AEDNAV ne diagnostique pas et ne recommande pas de traitements. Il vous aide à organiser ce que vous vivez pour mieux communiquer avec un professionnel de santé." },
    { q: "Les traductions sont-elles de niveau clinique ?", a: "Non. AEDNAV fournit des traductions de démonstration pour soutenir la communication et la préparation. Elles ne remplacent pas un interprète médical professionnel." },
    { q: "Mes informations seront-elles partagées ?", a: "Vos réponses restent dans cette session. Vous décidez de copier, imprimer ou partager votre résumé." },
    { q: "Et en cas d'urgence ?", a: "AEDNAV n'est pas conçu pour les urgences. En cas de douleur thoracique, difficulté à respirer, symptômes d'AVC ou pensées suicidaires, appelez immédiatement les services d'urgence." },
  ],
  features: [
    { title: "Intake multilingue", body: "Décrivez ce que vous ressentez dans votre langue, sans traduire dans votre tête." },
    { title: "Résumé de visite bilingue", body: "Deux résumés synchronisés : un dans votre langue, un en anglais pour votre soignant." },
    { title: "Résumé en anglais pour le médecin", body: "Préoccupations, chronologie, médicaments, allergies et questions, organisés en anglais clinique." },
    { title: "Préparation au rendez-vous", body: "Entrez en sachant quoi demander, quoi mentionner en premier, quoi apporter." },
  ],
  dual: {
    sectionBody: "Lisez votre résumé dans votre langue. Montrez la version anglaise à votre soignant. Les deux proviennent du même intake.",
    patientLabel: "Résumé patient",
    patientTitle: "Dans votre langue",
    patientLangLabel: "Dans votre langue",
    patientFields: { concern: "Préoccupation principale", timeline: "Durée et intensité", questions: "Questions à poser" },
    patientConcern: "Maux de tête récurrents depuis 3 jours, pires l'après-midi.",
    patientTimeline: "Environ 3 jours · 6/10 au pire.",
    patientQuestions: ["Qu'est-ce qui pourrait causer ces maux de tête ?", "Y a-t-il des examens utiles ?"],
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    providerFields: { concern: "Main concern", timeline: "Timeline & severity", questions: "Patient questions" },
    providerConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    providerTimeline: "Duration ~3 days · 6/10 at worst (self-reported).",
    providerQuestions: ["What might be causing the headaches?", "Are there tests that would help clarify this?"],
    note: "Pour la préparation et la communication uniquement. Pas un diagnostic.",
  },
};

const ES: LandingContent = {
  steps: [
    { n: "01", title: "Elige tu idioma", body: "Selecciona el idioma en el que describes mejor tu salud." },
    { n: "02", title: "Describe tu inquietud", body: "Comparte lo que te preocupa con tus propias palabras. Sin formularios, sin jerga." },
    { n: "03", title: "Responde preguntas guiadas", body: "Preguntas breves sobre duración, intensidad, medicamentos, alergias e historia." },
    { n: "04", title: "Revisa tus respuestas", body: "Ve todo en un solo lugar y edita lo que necesites antes de generar el resumen." },
    { n: "05", title: "Recibe ambos resúmenes", body: "Un resumen del paciente en tu idioma y uno en inglés para tu profesional." },
  ],
  audiences: [
    { title: "Recién llegados a Canadá", body: "Prepara la cita en tu idioma fuerte y lleva un resumen en inglés." },
    { title: "Familias que apoyan a familiares", body: "Ayuda a un padre, abuelo/a o pareja a organizar lo que llevará a la visita." },
    { title: "Estudiantes antes de citas", body: "Aclara lo que quieres decir antes de una visita a la clínica." },
    { title: "Pacientes más cómodos en otro idioma", body: "Evita la presión de traducir en vivo, describe los síntomas con calma primero." },
    { title: "Quien olvida qué decir en consulta", body: "Entra con un resumen escrito, no con la mente en blanco." },
  ],
  safety: [
    "AEDNAV no diagnostica ni trata condiciones.",
    "AEDNAV no reemplaza a profesionales de salud.",
    "AEDNAV no reemplaza a intérpretes médicos profesionales.",
    "AEDNAV te ayuda a organizar información antes de la atención.",
  ],
  faqs: [
    { q: "¿AEDNAV es una herramienta de diagnóstico?", a: "No. AEDNAV no diagnostica ni recomienda tratamientos. Te ayuda a organizar lo que sientes para comunicarte mejor con un profesional." },
    { q: "¿Las traducciones son de grado clínico?", a: "No. AEDNAV ofrece traducciones de demostración para apoyar la comunicación. No sustituyen a un intérprete médico profesional." },
    { q: "¿Se compartirá mi información?", a: "Tu intake queda en esta sesión del navegador. Tú decides copiar, imprimir o compartir el resumen." },
    { q: "¿Y si tengo una emergencia?", a: "AEDNAV no es para emergencias. Ante dolor en el pecho, dificultad para respirar, síntomas de derrame o pensamientos de autolesión, contacta inmediatamente a servicios de emergencia." },
  ],
  features: [
    { title: "Intake multilingüe", body: "Describe lo que sientes en tu idioma, sin traducir mentalmente." },
    { title: "Resumen bilingüe de la visita", body: "Dos resúmenes sincronizados: uno en tu idioma, otro en inglés para tu médico." },
    { title: "Resumen en inglés para el médico", body: "Inquietudes, cronología, medicamentos, alergias y preguntas, en inglés clínico." },
    { title: "Preparación para la cita", body: "Entra sabiendo qué preguntar, qué mencionar primero y qué llevar." },
  ],
  dual: {
    sectionBody: "Lee tu resumen en tu idioma. Muestra la versión en inglés a tu médico. Ambos vienen del mismo intake.",
    patientLabel: "Resumen del paciente",
    patientTitle: "En tu idioma",
    patientLangLabel: "En tu idioma",
    patientFields: { concern: "Motivo principal", timeline: "Duración e intensidad", questions: "Preguntas para el médico" },
    patientConcern: "Dolores de cabeza recurrentes por 3 días, peores por la tarde.",
    patientTimeline: "Unos 3 días · 6/10 en lo peor.",
    patientQuestions: ["¿Qué podría causar estos dolores?", "¿Hay exámenes que ayuden?"],
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    providerFields: { concern: "Main concern", timeline: "Timeline & severity", questions: "Patient questions" },
    providerConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    providerTimeline: "Duration ~3 days · 6/10 at worst (self-reported).",
    providerQuestions: ["What might be causing the headaches?", "Are there tests that would help clarify this?"],
    note: "Solo para preparación y comunicación. No es un diagnóstico.",
  },
};

const ZH: LandingContent = {
  steps: [
    { n: "01", title: "选择您的语言", body: "选择您描述健康问题最自如的语言。" },
    { n: "02", title: "描述您的问题", body: "用自己的话分享您的困扰。无需表格,无需术语。" },
    { n: "03", title: "回答引导性问题", body: "关于时间、强度、药物、过敏和病史的简短追问。" },
    { n: "04", title: "查看您的回答", body: "在一处查看全部内容,并在生成摘要前进行编辑。" },
    { n: "05", title: "获得两份摘要", body: "您语言的患者摘要,以及给医生的英文摘要。" },
  ],
  audiences: [
    { title: "加拿大新移民", body: "用您最熟练的语言准备就诊,并带上英文摘要。" },
    { title: "支持亲属的家庭", body: "帮父母、祖父母或伴侣整理就诊所需信息。" },
    { title: "就诊前的学生", body: "在校园或社区诊所就诊前,清楚地表达您的诉求。" },
    { title: "更习惯用其他语言的患者", body: "避免现场翻译压力，先冷静描述症状。" },
    { title: "在诊室容易忘记要说什么的人", body: "带着书面摘要进入诊室,而不是空白的头脑。" },
  ],
  safety: [
    "AEDNAV 不诊断或治疗疾病。",
    "AEDNAV 不替代医疗专业人员。",
    "AEDNAV 不替代专业医疗翻译。",
    "AEDNAV 帮助您在就医前整理信息。",
  ],
  faqs: [
    { q: "AEDNAV 是诊断工具吗?", a: "不是。AEDNAV 不诊断疾病或推荐治疗。它帮助您整理症状,以便与医生清晰沟通。" },
    { q: "翻译是临床级别的吗?", a: "不是。AEDNAV 提供演示翻译,用于沟通和准备的支持,不能替代专业医疗翻译。" },
    { q: "我的信息会被分享吗?", a: "您的信息保存在浏览器会话中。是否复制、打印或分享摘要由您决定。" },
    { q: "如果是紧急情况怎么办?", a: "AEDNAV 不适用于紧急情况。如有胸痛、呼吸困难、中风症状或自伤念头,请立即联系本地急救服务。" },
  ],
  features: [
    { title: "多语言信息收集", body: "用您的语言描述症状，无需在脑中翻译。" },
    { title: "双语就诊摘要", body: "两份同步摘要:一份您的语言,一份英文给医生。" },
    { title: "可直接给医生的英文摘要", body: "症状、时间线、药物、过敏和问题，以临床英文整理。" },
    { title: "就诊准备", body: "知道要问什么、先讲什么、带什么进诊室。" },
  ],
  dual: {
    sectionBody: "用您的语言阅读摘要。把英文版给您的医生看。两份来自同一次信息收集。",
    patientLabel: "患者摘要",
    patientTitle: "用您选择的语言",
    patientLangLabel: "用您的语言",
    patientFields: { concern: "主要问题", timeline: "持续时间与强度", questions: "想问医生的问题" },
    patientConcern: "反复头痛已 3 天,下午加重。",
    patientTimeline: "约 3 天 · 最严重时 6/10。",
    patientQuestions: ["这些头痛可能是什么原因?", "有哪些检查会有帮助?"],
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    providerFields: { concern: "Main concern", timeline: "Timeline & severity", questions: "Patient questions" },
    providerConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    providerTimeline: "Duration ~3 days · 6/10 at worst (self-reported).",
    providerQuestions: ["What might be causing the headaches?", "Are there tests that would help clarify this?"],
    note: "仅用于准备和沟通支持。不是诊断。",
  },
};

const PA: LandingContent = {
  steps: [
    { n: "01", title: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ", body: "ਉਹ ਭਾਸ਼ਾ ਚੁਣੋ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਆਪਣੀ ਸਿਹਤ ਨੂੰ ਸਭ ਤੋਂ ਚੰਗੀ ਤਰ੍ਹਾਂ ਬਿਆਨ ਕਰ ਸਕਦੇ ਹੋ।" },
    { n: "02", title: "ਆਪਣੀ ਚਿੰਤਾ ਦੱਸੋ", body: "ਜੋ ਤੁਹਾਡੇ ਮਨ ਵਿੱਚ ਹੈ, ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਸਾਂਝਾ ਕਰੋ।" },
    { n: "03", title: "ਮਾਰਗਦਰਸ਼ਕ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ", body: "ਸਮਾਂ, ਤੀਬਰਤਾ, ਦਵਾਈਆਂ, ਅਲਰਜੀਆਂ ਅਤੇ ਇਤਿਹਾਸ ਬਾਰੇ ਛੋਟੇ ਫਾਲੋ-ਅੱਪ।" },
    { n: "04", title: "ਆਪਣੇ ਜਵਾਬ ਵੇਖੋ", body: "ਸਾਰ ਬਣਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਜਵਾਬ ਇੱਕ ਥਾਂ ਵੇਖੋ ਅਤੇ ਸੰਪਾਦਿਤ ਕਰੋ।" },
    { n: "05", title: "ਦੋਵੇਂ ਸਾਰ ਪ੍ਰਾਪਤ ਕਰੋ", body: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਮਰੀਜ਼ ਸਾਰ ਅਤੇ ਡਾਕਟਰ ਲਈ ਅੰਗਰੇਜ਼ੀ ਸਾਰ।" },
  ],
  audiences: [
    { title: "ਕੈਨੇਡਾ ਵਿੱਚ ਨਵੇਂ ਆਏ", body: "ਆਪਣੀ ਮਜ਼ਬੂਤ ਭਾਸ਼ਾ ਵਿੱਚ ਤਿਆਰੀ ਕਰੋ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਸਾਰ ਨਾਲ ਲੈ ਜਾਓ।" },
    { title: "ਪਰਿਵਾਰਕ ਮੈਂਬਰਾਂ ਦੀ ਮਦਦ ਕਰਨ ਵਾਲੇ", body: "ਮਾਪਿਆਂ, ਦਾਦਿਆਂ ਜਾਂ ਜੀਵਨ ਸਾਥੀ ਨੂੰ ਮੁਲਾਕਾਤ ਲਈ ਤਿਆਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੋ।" },
    { title: "ਮੁਲਾਕਾਤ ਤੋਂ ਪਹਿਲਾਂ ਵਿਦਿਆਰਥੀ", body: "ਕਲੀਨਿਕ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਸਪਸ਼ਟ ਕਰੋ ਕਿ ਕੀ ਕਹਿਣਾ ਹੈ।" },
    { title: "ਹੋਰ ਭਾਸ਼ਾ ਵਿੱਚ ਜ਼ਿਆਦਾ ਅਰਾਮਦਾਇਕ ਮਰੀਜ਼", body: "ਲਾਈਵ ਅਨੁਵਾਦ ਦੇ ਦਬਾਅ ਤੋਂ ਬਚੋ, ਪਹਿਲਾਂ ਸ਼ਾਂਤੀ ਨਾਲ ਲੱਛਣ ਬਿਆਨ ਕਰੋ।" },
    { title: "ਜੋ ਡਾਕਟਰ ਕੋਲ ਜਾ ਕੇ ਭੁੱਲ ਜਾਂਦੇ ਹਨ", body: "ਖਾਲੀ ਮਨ ਨਾਲ ਨਹੀਂ, ਲਿਖਤੀ ਸਾਰ ਨਾਲ ਜਾਓ।" },
  ],
  safety: [
    "AEDNAV ਜਾਂਚ ਜਾਂ ਇਲਾਜ ਨਹੀਂ ਕਰਦਾ।",
    "AEDNAV ਡਾਕਟਰੀ ਮਾਹਰਾਂ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ।",
    "AEDNAV ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਅਨੁਵਾਦਕਾਂ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ।",
    "AEDNAV ਦੇਖਭਾਲ ਤੋਂ ਪਹਿਲਾਂ ਜਾਣਕਾਰੀ ਵਿਵਸਥਿਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
  ],
  faqs: [
    { q: "ਕੀ AEDNAV ਜਾਂਚ ਦਾ ਸਾਧਨ ਹੈ?", a: "ਨਹੀਂ। AEDNAV ਜਾਂਚ ਨਹੀਂ ਕਰਦਾ ਜਾਂ ਇਲਾਜ ਨਹੀਂ ਸੁਝਾਉਂਦਾ। ਇਹ ਤੁਹਾਡੀ ਮਦਦ ਕਰਦਾ ਹੈ।" },
    { q: "ਕੀ ਅਨੁਵਾਦ ਕਲੀਨੀਕਲ ਪੱਧਰ ਦੇ ਹਨ?", a: "ਨਹੀਂ। AEDNAV ਪ੍ਰਦਰਸ਼ਨੀ ਅਨੁਵਾਦ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਇਹ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਅਨੁਵਾਦਕ ਦੀ ਥਾਂ ਨਹੀਂ ਲੈਂਦਾ।" },
    { q: "ਕੀ ਮੇਰੀ ਜਾਣਕਾਰੀ ਸਾਂਝੀ ਕੀਤੀ ਜਾਵੇਗੀ?", a: "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਸੈਸ਼ਨ ਵਿੱਚ ਰਹਿੰਦੀ ਹੈ। ਤੁਸੀਂ ਫੈਸਲਾ ਕਰਦੇ ਹੋ।" },
    { q: "ਜੇ ਐਮਰਜੈਂਸੀ ਹੋਵੇ ਤਾਂ?", a: "AEDNAV ਐਮਰਜੈਂਸੀ ਲਈ ਨਹੀਂ ਹੈ। ਛਾਤੀ ਵਿੱਚ ਦਰਦ, ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਲ ਆਦਿ ਲਈ 911 ਤੇ ਕਾਲ ਕਰੋ।" },
  ],
  features: [
    { title: "ਬਹੁ-ਭਾਸ਼ੀ ਜਾਣਕਾਰੀ", body: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਲੱਛਣ ਬਿਆਨ ਕਰੋ, ਮਨ ਵਿੱਚ ਅਨੁਵਾਦ ਕੀਤੇ ਬਿਨਾਂ।" },
    { title: "ਦੋ-ਭਾਸ਼ੀ ਮੁਲਾਕਾਤ ਸਾਰ", body: "ਦੋ ਸਾਰ: ਇੱਕ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ, ਇੱਕ ਡਾਕਟਰ ਲਈ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ।" },
    { title: "ਡਾਕਟਰ ਲਈ ਤਿਆਰ ਅੰਗਰੇਜ਼ੀ ਸਾਰ", body: "ਚਿੰਤਾਵਾਂ, ਸਮਾਂ, ਦਵਾਈਆਂ, ਅਲਰਜੀਆਂ ਅਤੇ ਸਵਾਲ, ਕਲੀਨੀਕਲ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ।" },
    { title: "ਮੁਲਾਕਾਤ ਦੀ ਤਿਆਰੀ", body: "ਜਾਣ ਕੇ ਜਾਓ ਕਿ ਕੀ ਪੁੱਛਣਾ ਹੈ ਅਤੇ ਕੀ ਲੈ ਕੇ ਜਾਣਾ ਹੈ।" },
  ],
  dual: {
    sectionBody: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਾਰ ਪੜ੍ਹੋ। ਡਾਕਟਰ ਨੂੰ ਅੰਗਰੇਜ਼ੀ ਵਾਲਾ ਦਿਖਾਓ।",
    patientLabel: "ਮਰੀਜ਼ ਸਾਰ",
    patientTitle: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ",
    patientLangLabel: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ",
    patientFields: { concern: "ਮੁੱਖ ਚਿੰਤਾ", timeline: "ਮਿਆਦ ਅਤੇ ਤੀਬਰਤਾ", questions: "ਡਾਕਟਰ ਨੂੰ ਪੁੱਛਣ ਵਾਲੇ ਸਵਾਲ" },
    patientConcern: "ਪਿਛਲੇ 3 ਦਿਨਾਂ ਤੋਂ ਵਾਰ-ਵਾਰ ਸਿਰਦਰਦ, ਦੁਪਹਿਰ ਨੂੰ ਜ਼ਿਆਦਾ।",
    patientTimeline: "ਲਗਭਗ 3 ਦਿਨ · ਸਭ ਤੋਂ ਮਾੜੇ ਸਮੇਂ 6/10।",
    patientQuestions: ["ਇਹ ਸਿਰਦਰਦ ਕਿਉਂ ਹੋ ਰਹੇ ਹਨ?", "ਕੀ ਕੁਝ ਟੈਸਟ ਮਦਦਗਾਰ ਹੋਣਗੇ?"],
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    providerFields: { concern: "Main concern", timeline: "Timeline & severity", questions: "Patient questions" },
    providerConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    providerTimeline: "Duration ~3 days · 6/10 at worst (self-reported).",
    providerQuestions: ["What might be causing the headaches?", "Are there tests that would help clarify this?"],
    note: "ਸਿਰਫ਼ ਤਿਆਰੀ ਅਤੇ ਸੰਚਾਰ ਲਈ। ਜਾਂਚ ਨਹੀਂ।",
  },
};

const UR: LandingContent = {
  steps: [
    { n: "01", title: "اپنی زبان منتخب کریں", body: "وہ زبان منتخب کریں جس میں آپ اپنی صحت بہتر بیان کر سکتے ہیں۔" },
    { n: "02", title: "اپنی پریشانی بتائیں", body: "اپنے الفاظ میں شیئر کریں۔ کوئی فارم نہیں، کوئی اصطلاح نہیں۔" },
    { n: "03", title: "رہنما سوالات کا جواب دیں", body: "وقت، شدت، ادویات، الرجی اور تاریخ کے بارے میں مختصر سوالات۔" },
    { n: "04", title: "اپنے جوابات دیکھیں", body: "خلاصہ بنانے سے پہلے سب کچھ ایک جگہ دیکھیں اور تبدیل کریں۔" },
    { n: "05", title: "دونوں خلاصے حاصل کریں", body: "آپ کی زبان میں مریض خلاصہ اور ڈاکٹر کے لیے انگریزی خلاصہ۔" },
  ],
  audiences: [
    { title: "کینیڈا میں نئے آنے والے", body: "اپنی مضبوط زبان میں تیاری کریں اور انگریزی خلاصہ ساتھ لے جائیں۔" },
    { title: "رشتہ داروں کی مدد کرنے والے خاندان", body: "والدین، دادا/دادی یا ساتھی کو ملاقات کے لیے تیار کریں۔" },
    { title: "ملاقات سے پہلے طلباء", body: "کلینک جانے سے پہلے واضح کریں کہ کیا کہنا ہے۔" },
    { title: "دوسری زبان میں زیادہ آرام دہ مریض", body: "لائیو ترجمے کا دباؤ چھوڑیں, پہلے سکون سے علامات بیان کریں۔" },
    { title: "جو ڈاکٹر کے سامنے بھول جاتے ہیں", body: "خالی ذہن کے بجائے تحریری خلاصے کے ساتھ جائیں۔" },
  ],
  safety: [
    "AEDNAV تشخیص یا علاج نہیں کرتا۔",
    "AEDNAV صحت کے پیشہ ور افراد کا متبادل نہیں ہے۔",
    "AEDNAV پیشہ ور طبی مترجموں کا متبادل نہیں ہے۔",
    "AEDNAV دیکھ بھال سے پہلے معلومات منظم کرنے میں مدد کرتا ہے۔",
  ],
  faqs: [
    { q: "کیا AEDNAV تشخیصی آلہ ہے؟", a: "نہیں۔ AEDNAV تشخیص نہیں کرتا اور علاج تجویز نہیں کرتا۔ یہ آپ کی مدد کرتا ہے۔" },
    { q: "کیا ترجمے کلینیکل معیار کے ہیں؟", a: "نہیں۔ AEDNAV مظاہراتی ترجمے فراہم کرتا ہے۔ یہ پیشہ ور طبی مترجم کا متبادل نہیں ہے۔" },
    { q: "کیا میری معلومات شیئر کی جائے گی؟", a: "آپ کی معلومات اس براؤزر سیشن میں رہتی ہیں۔ آپ فیصلہ کرتے ہیں۔" },
    { q: "ایمرجنسی کی صورت میں؟", a: "AEDNAV ایمرجنسی کے لیے نہیں۔ سینے میں درد، سانس کی دشواری وغیرہ پر فوراً 911 پر کال کریں۔" },
  ],
  features: [
    { title: "کثیر لسانی معلومات", body: "اپنی زبان میں علامات بیان کریں, ذہن میں ترجمہ کیے بغیر۔" },
    { title: "دو لسانی ملاقات خلاصہ", body: "دو خلاصے: ایک آپ کی زبان میں، ایک ڈاکٹر کے لیے انگریزی میں۔" },
    { title: "ڈاکٹر کے لیے انگریزی خلاصہ", body: "پریشانیاں، وقت، ادویات، الرجی اور سوالات, کلینیکل انگریزی میں۔" },
    { title: "ملاقات کی تیاری", body: "جانیں کہ کیا پوچھنا ہے، پہلے کیا بتانا ہے، کیا لانا ہے۔" },
  ],
  dual: {
    sectionBody: "اپنی زبان میں خلاصہ پڑھیں۔ ڈاکٹر کو انگریزی والا دکھائیں۔",
    patientLabel: "مریض کا خلاصہ",
    patientTitle: "آپ کی منتخب زبان میں",
    patientLangLabel: "آپ کی زبان میں",
    patientFields: { concern: "بنیادی پریشانی", timeline: "مدت اور شدت", questions: "ڈاکٹر سے پوچھنے کے سوالات" },
    patientConcern: "3 دن سے بار بار سر درد، دوپہر کو زیادہ۔",
    patientTimeline: "تقریباً 3 دن · بدترین حالت میں 6/10۔",
    patientQuestions: ["یہ سر درد کیوں ہو سکتا ہے؟", "کیا کوئی ٹیسٹ مددگار ہوں گے؟"],
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    providerFields: { concern: "Main concern", timeline: "Timeline & severity", questions: "Patient questions" },
    providerConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    providerTimeline: "Duration ~3 days · 6/10 at worst (self-reported).",
    providerQuestions: ["What might be causing the headaches?", "Are there tests that would help clarify this?"],
    note: "صرف تیاری اور رابطے کے لیے۔ تشخیص نہیں۔",
  },
};

const AR: LandingContent = {
  steps: [
    { n: "01", title: "اختر لغتك", body: "اختر اللغة التي تصف بها صحتك بأفضل شكل." },
    { n: "02", title: "صف ما يقلقك", body: "شارك ما يدور في ذهنك بكلماتك. بدون نماذج أو مصطلحات." },
    { n: "03", title: "أجب عن أسئلة موجَّهة", body: "متابعات قصيرة عن المدة والشدة والأدوية والحساسية والتاريخ." },
    { n: "04", title: "راجع إجاباتك", body: "شاهد كل شيء في مكان واحد وعدّل قبل توليد الملخص." },
    { n: "05", title: "احصل على الملخصين", body: "ملخص للمريض بلغتك وملخص بالإنجليزية لطبيبك." },
  ],
  audiences: [
    { title: "القادمون الجدد إلى كندا", body: "حضّر للموعد بلغتك الأقوى وأحضر ملخصًا إنجليزيًا." },
    { title: "العائلات التي تدعم أقاربها", body: "ساعد أحد الوالدين أو الجدّين أو الشريك على تنظيم ما يحضره للموعد." },
    { title: "الطلاب قبل المواعيد", body: "اعرف بوضوح ما تريد قوله قبل زيارة العيادة." },
    { title: "المرضى الأكثر راحة بلغة أخرى", body: "تجنّب ضغط الترجمة الفورية, صف الأعراض بهدوء أولًا." },
    { title: "كل من ينسى ما يقول في العيادة", body: "ادخل بملخص مكتوب لا بذاكرة فارغة." },
  ],
  safety: [
    "AEDNAV لا يُشخّص أو يعالج الحالات.",
    "AEDNAV لا يحل محل المختصين الصحيين.",
    "AEDNAV لا يحل محل المترجمين الطبيين المحترفين.",
    "AEDNAV يساعدك على تنظيم المعلومات قبل الرعاية.",
  ],
  faqs: [
    { q: "هل AEDNAV أداة تشخيص؟", a: "لا. لا يُشخّص ولا يصف العلاج. يساعدك على تنظيم ما تشعر به للتواصل مع طبيب مرخّص." },
    { q: "هل الترجمات بمستوى سريري؟", a: "لا. AEDNAV يقدم ترجمات تجريبية لدعم التواصل، ولا يحل محل مترجم طبي محترف." },
    { q: "هل ستتم مشاركة بياناتي؟", a: "تبقى إجاباتك في جلسة المتصفح. أنت تقرر النسخ أو الطباعة أو المشاركة." },
    { q: "ماذا لو كانت حالة طارئة؟", a: "AEDNAV ليس للطوارئ. عند ألم الصدر أو ضيق التنفس أو أعراض السكتة أو أفكار إيذاء النفس، اتصل بالطوارئ فورًا." },
  ],
  features: [
    { title: "إدخال متعدد اللغات", body: "صف ما تشعر به بلغتك, دون ترجمة في رأسك." },
    { title: "ملخص زيارة بلغتين", body: "ملخصان متزامنان: واحد بلغتك وآخر بالإنجليزية لطبيبك." },
    { title: "ملخص إنجليزي جاهز للطبيب", body: "المخاوف، الجدول الزمني، الأدوية، الحساسية والأسئلة بإنجليزية سريرية." },
    { title: "التحضير للموعد", body: "ادخل وأنت تعرف ماذا تسأل وماذا تقول وماذا تأخذ." },
  ],
  dual: {
    sectionBody: "اقرأ ملخصك بلغتك. أرِ نسخة الإنجليزية لطبيبك.",
    patientLabel: "ملخص المريض",
    patientTitle: "بلغتك المختارة",
    patientLangLabel: "بلغتك",
    patientFields: { concern: "الشكوى الرئيسية", timeline: "المدة والشدة", questions: "أسئلة للطبيب" },
    patientConcern: "صداع متكرر منذ 3 أيام، يزداد بعد الظهر.",
    patientTimeline: "حوالي 3 أيام · 6/10 في أسوأ حالاته.",
    patientQuestions: ["ما الذي قد يسبب هذا الصداع؟", "هل توجد فحوصات قد تساعد؟"],
    providerLabel: "Provider summary",
    providerTitle: "Doctor-ready English",
    providerFields: { concern: "Main concern", timeline: "Timeline & severity", questions: "Patient questions" },
    providerConcern: "Recurring headaches for 3 days, worse in the afternoon.",
    providerTimeline: "Duration ~3 days · 6/10 at worst (self-reported).",
    providerQuestions: ["What might be causing the headaches?", "Are there tests that would help clarify this?"],
    note: "للتحضير والتواصل فقط. ليس تشخيصًا.",
  },
};

const ALL: Record<LangCode, LandingContent> = {
  en: EN, fr: FR, es: ES, zh: ZH, pa: PA, ur: UR, ar: AR,
};

export function landing(lang: LangCode): LandingContent {
  return ALL[lang] ?? EN;
}
