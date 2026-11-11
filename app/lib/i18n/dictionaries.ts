export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "es";

const es = {
  meta: {
    homeTitle: "ResumeSense — Analiza tu CV con IA",
    homeDescription:
      "Sube tu currículum y recibe una puntuación ATS, un diagnóstico por categorías y recomendaciones concretas para el puesto que buscas.",
    dashboardTitle: "Panel | ResumeSense",
    uploadTitle: "Analizar CV | ResumeSense",
    authTitle: "Iniciar sesión | ResumeSense",
    resumeTitle: "Resultado del análisis | ResumeSense",
    aboutTitle: "Acerca de | ResumeSense",
    wipeTitle: "Borrar datos | ResumeSense",
  },
  nav: {
    howItWorks: "Cómo funciona",
    features: "Características",
    about: "Acerca de",
    dashboard: "Panel",
    analyze: "Analizar CV",
    signIn: "Iniciar sesión",
    signOut: "Cerrar sesión",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "Inicio",
    account: "Cuenta",
    signedInAs: "Sesión iniciada como",
  },
  theme: {
    label: "Cambiar tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
  language: {
    label: "Idioma",
    es: "Español",
    en: "English",
  },
  landing: {
    eyebrow: "Análisis de CV con IA",
    titleA: "Tu currículum,",
    titleAccent: "leído",
    titleB: "como lo lee un reclutador.",
    subtitle:
      "Sube tu CV en PDF, pega la oferta y en segundos recibe una puntuación ATS, un diagnóstico por categorías y cambios concretos para conseguir la entrevista.",
    ctaPrimary: "Analizar mi CV gratis",
    ctaSecondary: "Ver cómo funciona",
    trust: ["Gratis", "Sin tarjeta", "Tus archivos en tu cuenta"],
    mockup: {
      file: "cv_maria_lopez.pdf",
      role: "Diseñadora de producto · Spotify",
      overall: "Puntuación general",
      ats: "Compatibilidad ATS",
      tipGood: "Logros cuantificados en experiencia",
      tipImprove: "Faltan palabras clave: “design systems”, “Figma”",
    },
    howEyebrow: "Cómo funciona",
    howTitle: "Del PDF al feedback en tres pasos",
    steps: [
      {
        title: "Sube tu CV",
        body: "Arrastra tu currículum en PDF. Se guarda en tu propia cuenta de Puter, no en nuestros servidores.",
      },
      {
        title: "Añade la oferta",
        body: "Indica la empresa, el puesto y pega la descripción. El análisis se adapta a lo que pide ese empleo.",
      },
      {
        title: "Recibe tu diagnóstico",
        body: "Puntuación ATS, nota por categoría y recomendaciones explicadas para que sepas exactamente qué cambiar.",
      },
    ],
    featuresEyebrow: "Características",
    featuresTitle: "Todo lo que un reclutador mira, en un solo informe",
    features: [
      {
        title: "Puntuación ATS",
        body: "Comprueba si tu CV supera los filtros automáticos que usan las empresas antes de que lo lea una persona.",
      },
      {
        title: "Ajuste a la oferta",
        body: "Compara tu experiencia con la descripción del puesto y detecta las palabras clave que te faltan.",
      },
      {
        title: "Cuatro categorías",
        body: "Tono y estilo, contenido, estructura y habilidades, cada una con su nota y sus consejos.",
      },
      {
        title: "Consejos accionables",
        body: "Nada de frases genéricas: cada recomendación explica qué cambiar y por qué importa.",
      },
      {
        title: "Historial de análisis",
        body: "Guarda cada versión de tu CV y compara cómo mejora tu puntuación con cada cambio.",
      },
      {
        title: "Privado por diseño",
        body: "Tus archivos y resultados viven en tu cuenta de Puter. Puedes borrarlos cuando quieras.",
      },
    ],
    ctaTitle: "Tu próxima entrevista empieza con un mejor CV.",
    ctaBody: "Analízalo ahora. Tarda menos que un café.",
  },
  dashboard: {
    eyebrow: "Panel",
    title: "Tus análisis",
    subtitle: "Cada CV que analizas queda guardado aquí con su puntuación.",
    newAnalysis: "Nuevo análisis",
    count: (n: number) => (n === 1 ? "1 análisis" : `${n} análisis`),
    emptyTitle: "Todavía no has analizado ningún CV",
    emptyBody:
      "Sube tu currículum junto con la oferta que te interesa y recibe tu primera puntuación en segundos.",
    emptyCta: "Analizar mi primer CV",
    untitled: "CV sin título",
    overall: "General",
    viewReport: "Ver informe",
    loading: "Cargando tus análisis…",
  },
  upload: {
    eyebrow: "Nuevo análisis",
    title: "Analiza tu CV para un puesto concreto",
    subtitle:
      "Cuanto más detalle des sobre la oferta, más preciso será el feedback.",
    company: "Empresa",
    companyPlaceholder: "Ej. Mercado Libre",
    jobTitle: "Puesto",
    jobTitlePlaceholder: "Ej. Desarrollador frontend",
    jobDescription: "Descripción de la oferta",
    jobDescriptionPlaceholder: "Pega aquí la descripción del empleo…",
    optional: "Opcional",
    resume: "Currículum (PDF)",
    dropTitle: "Arrastra tu PDF aquí",
    dropOr: "o haz clic para elegir un archivo",
    dropHint: (size: string) => `Solo PDF · máximo ${size}`,
    remove: "Quitar archivo",
    fileRequired: "Selecciona tu CV en PDF para continuar.",
    fileRejected: "Ese archivo no es válido. Usa un PDF de hasta 20 MB.",
    submit: "Analizar CV",
    tips: {
      title: "Para un mejor resultado",
      items: [
        "Usa un PDF con texto seleccionable, no una imagen escaneada.",
        "Pega la descripción completa de la oferta.",
        "Analiza una versión por cada puesto al que apliques.",
      ],
    },
    processingTitle: "Analizando tu CV",
    processingBody: "Esto suele tardar menos de un minuto. No cierres esta pestaña.",
    steps: {
      upload: "Subiendo el PDF",
      convert: "Generando la vista previa",
      uploadImage: "Guardando la vista previa",
      prepare: "Preparando el análisis",
      analyze: "Analizando con IA",
      done: "Listo, abriendo el informe",
    },
    errors: {
      upload: "No se pudo subir el archivo.",
      convert: "No se pudo leer el PDF.",
      uploadImage: "No se pudo guardar la vista previa.",
      analyze: "La IA no pudo analizar el CV.",
      parse: "La respuesta de la IA no tenía el formato esperado.",
    },
    retry: "Intentar de nuevo",
  },
  auth: {
    eyebrow: "Bienvenido",
    title: "Inicia sesión para continuar",
    body: "ResumeSense usa Puter para guardar tus CV y resultados de forma privada en tu propia cuenta. Es gratis y solo toma unos segundos.",
    signIn: "Continuar con Puter",
    signingIn: "Conectando…",
    signedIn: "Ya iniciaste sesión",
    goDashboard: "Ir al panel",
    signOut: "Cerrar sesión",
    perks: [
      "Tus archivos se guardan en tu cuenta, no en nuestros servidores",
      "Historial de todos tus análisis",
      "Sin contraseñas nuevas que recordar",
    ],
    quote: "Un buen CV no es más largo. Es más claro.",
    back: "Volver al inicio",
  },
  resume: {
    back: "Volver al panel",
    eyebrow: "Informe",
    title: "Resultado del análisis",
    preview: "Vista previa del CV",
    openPdf: "Abrir PDF",
    loading: "Cargando el informe…",
    notFound: "No encontramos este análisis.",
    notFoundCta: "Ir al panel",
    summaryTitle: "Puntuación general",
    summaryBody: "Calculada a partir de las cuatro categorías de abajo.",
    atsTitle: "Compatibilidad ATS",
    atsBody:
      "Qué tan bien supera tu CV los sistemas de seguimiento de candidatos que filtran las solicitudes.",
    atsFooter: "Aplica las sugerencias de cada categoría para subir tu puntuación.",
    detailsTitle: "Detalle por categoría",
    categories: {
      toneAndStyle: "Tono y estilo",
      content: "Contenido",
      structure: "Estructura",
      skills: "Habilidades",
    },
    labels: {
      strong: "Sólido",
      good: "Buen comienzo",
      weak: "Necesita trabajo",
    },
    good: "Bien",
    improve: "Mejorar",
  },
  about: {
    eyebrow: "Acerca de",
    title: "Un segundo par de ojos para tu CV",
    body: "ResumeSense nació para responder una pregunta simple: ¿por qué no me llaman? Analiza tu currículum como lo haría un reclutador y un sistema ATS, y te dice qué funciona, qué no y cómo mejorarlo para el puesto que quieres.",
    madeBy: "Hecho por Francis Castillo",
    stackTitle: "Cómo está hecho",
    stack:
      "React Router, Tailwind CSS y Puter.js para la IA, el almacenamiento y la autenticación. El código es abierto.",
    github: "Ver en GitHub",
  },
  wipe: {
    title: "Borrar mis datos",
    body: "Esto elimina todos tus CV, vistas previas y análisis guardados en tu cuenta de Puter. No se puede deshacer.",
    files: (n: number) => (n === 1 ? "1 archivo guardado" : `${n} archivos guardados`),
    empty: "No tienes archivos guardados.",
    confirm: "Borrar todo",
    deleting: "Borrando…",
    done: "Tus datos fueron eliminados.",
  },
  footer: {
    tagline: "Análisis de CV con IA para conseguir la entrevista.",
    product: "Producto",
    legal: "Tus datos",
    deleteData: "Borrar mis datos",
    rights: (year: number) => `© ${year} ResumeSense`,
  },
  errors: {
    notFoundTitle: "Página no encontrada",
    notFoundBody: "La página que buscas no existe o se movió.",
    genericTitle: "Algo salió mal",
    genericBody: "Ocurrió un error inesperado. Intenta de nuevo en un momento.",
    home: "Volver al inicio",
  },
  common: {
    loading: "Cargando…",
    cancel: "Cancelar",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    homeTitle: "ResumeSense — AI resume analysis",
    homeDescription:
      "Upload your resume and get an ATS score, a breakdown by category and concrete recommendations for the job you want.",
    dashboardTitle: "Dashboard | ResumeSense",
    uploadTitle: "Analyze resume | ResumeSense",
    authTitle: "Sign in | ResumeSense",
    resumeTitle: "Analysis report | ResumeSense",
    aboutTitle: "About | ResumeSense",
    wipeTitle: "Delete data | ResumeSense",
  },
  nav: {
    howItWorks: "How it works",
    features: "Features",
    about: "About",
    dashboard: "Dashboard",
    analyze: "Analyze resume",
    signIn: "Sign in",
    signOut: "Sign out",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Home",
    account: "Account",
    signedInAs: "Signed in as",
  },
  theme: {
    label: "Change theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  language: {
    label: "Language",
    es: "Español",
    en: "English",
  },
  landing: {
    eyebrow: "AI resume analysis",
    titleA: "Your resume,",
    titleAccent: "read",
    titleB: "the way a recruiter reads it.",
    subtitle:
      "Upload your PDF, paste the job post and in seconds get an ATS score, a breakdown by category and concrete changes that get you the interview.",
    ctaPrimary: "Analyze my resume free",
    ctaSecondary: "See how it works",
    trust: ["Free", "No credit card", "Files stay in your account"],
    mockup: {
      file: "maria_lopez_resume.pdf",
      role: "Product Designer · Spotify",
      overall: "Overall score",
      ats: "ATS compatibility",
      tipGood: "Quantified achievements in experience",
      tipImprove: "Missing keywords: “design systems”, “Figma”",
    },
    howEyebrow: "How it works",
    howTitle: "From PDF to feedback in three steps",
    steps: [
      {
        title: "Upload your resume",
        body: "Drop your resume as a PDF. It's stored in your own Puter account, not on our servers.",
      },
      {
        title: "Add the job post",
        body: "Enter the company, the role and paste the description. The analysis adapts to what that job asks for.",
      },
      {
        title: "Get your diagnosis",
        body: "ATS score, a grade per category and explained recommendations so you know exactly what to change.",
      },
    ],
    featuresEyebrow: "Features",
    featuresTitle: "Everything a recruiter looks at, in one report",
    features: [
      {
        title: "ATS score",
        body: "Check whether your resume gets past the automated filters companies use before a human reads it.",
      },
      {
        title: "Job match",
        body: "Compares your experience with the job description and spots the keywords you're missing.",
      },
      {
        title: "Four categories",
        body: "Tone and style, content, structure and skills, each with its own grade and tips.",
      },
      {
        title: "Actionable advice",
        body: "No generic one-liners: every recommendation explains what to change and why it matters.",
      },
      {
        title: "Analysis history",
        body: "Keep every version of your resume and see how your score improves with each change.",
      },
      {
        title: "Private by design",
        body: "Your files and results live in your Puter account. Delete them whenever you want.",
      },
    ],
    ctaTitle: "Your next interview starts with a better resume.",
    ctaBody: "Analyze it now. It takes less time than a coffee.",
  },
  dashboard: {
    eyebrow: "Dashboard",
    title: "Your analyses",
    subtitle: "Every resume you analyze is saved here with its score.",
    newAnalysis: "New analysis",
    count: (n: number) => (n === 1 ? "1 analysis" : `${n} analyses`),
    emptyTitle: "You haven't analyzed a resume yet",
    emptyBody:
      "Upload your resume with the job you're interested in and get your first score in seconds.",
    emptyCta: "Analyze my first resume",
    untitled: "Untitled resume",
    overall: "Overall",
    viewReport: "View report",
    loading: "Loading your analyses…",
  },
  upload: {
    eyebrow: "New analysis",
    title: "Analyze your resume for a specific role",
    subtitle: "The more detail you give about the job, the sharper the feedback.",
    company: "Company",
    companyPlaceholder: "e.g. Stripe",
    jobTitle: "Role",
    jobTitlePlaceholder: "e.g. Frontend developer",
    jobDescription: "Job description",
    jobDescriptionPlaceholder: "Paste the job description here…",
    optional: "Optional",
    resume: "Resume (PDF)",
    dropTitle: "Drop your PDF here",
    dropOr: "or click to choose a file",
    dropHint: (size: string) => `PDF only · up to ${size}`,
    remove: "Remove file",
    fileRequired: "Select your resume PDF to continue.",
    fileRejected: "That file isn't valid. Use a PDF up to 20 MB.",
    submit: "Analyze resume",
    tips: {
      title: "For the best result",
      items: [
        "Use a PDF with selectable text, not a scanned image.",
        "Paste the full job description.",
        "Analyze one version per role you apply to.",
      ],
    },
    processingTitle: "Analyzing your resume",
    processingBody: "This usually takes less than a minute. Keep this tab open.",
    steps: {
      upload: "Uploading the PDF",
      convert: "Generating the preview",
      uploadImage: "Saving the preview",
      prepare: "Preparing the analysis",
      analyze: "Analyzing with AI",
      done: "Done, opening the report",
    },
    errors: {
      upload: "The file couldn't be uploaded.",
      convert: "The PDF couldn't be read.",
      uploadImage: "The preview couldn't be saved.",
      analyze: "The AI couldn't analyze the resume.",
      parse: "The AI response wasn't in the expected format.",
    },
    retry: "Try again",
  },
  auth: {
    eyebrow: "Welcome",
    title: "Sign in to continue",
    body: "ResumeSense uses Puter to store your resumes and results privately in your own account. It's free and takes a few seconds.",
    signIn: "Continue with Puter",
    signingIn: "Connecting…",
    signedIn: "You're signed in",
    goDashboard: "Go to dashboard",
    signOut: "Sign out",
    perks: [
      "Your files are stored in your account, not on our servers",
      "History of all your analyses",
      "No new password to remember",
    ],
    quote: "A good resume isn't longer. It's clearer.",
    back: "Back to home",
  },
  resume: {
    back: "Back to dashboard",
    eyebrow: "Report",
    title: "Analysis result",
    preview: "Resume preview",
    openPdf: "Open PDF",
    loading: "Loading the report…",
    notFound: "We couldn't find this analysis.",
    notFoundCta: "Go to dashboard",
    summaryTitle: "Overall score",
    summaryBody: "Calculated from the four categories below.",
    atsTitle: "ATS compatibility",
    atsBody:
      "How well your resume gets through the applicant tracking systems that filter applications.",
    atsFooter: "Apply the suggestions in each category to raise your score.",
    detailsTitle: "Breakdown by category",
    categories: {
      toneAndStyle: "Tone and style",
      content: "Content",
      structure: "Structure",
      skills: "Skills",
    },
    labels: {
      strong: "Strong",
      good: "Good start",
      weak: "Needs work",
    },
    good: "Good",
    improve: "Improve",
  },
  about: {
    eyebrow: "About",
    title: "A second pair of eyes for your resume",
    body: "ResumeSense was built to answer a simple question: why am I not getting calls? It analyzes your resume the way a recruiter and an ATS would, and tells you what works, what doesn't and how to improve it for the role you want.",
    madeBy: "Made by Francis Castillo",
    stackTitle: "How it's built",
    stack:
      "React Router, Tailwind CSS and Puter.js for AI, storage and authentication. The code is open source.",
    github: "View on GitHub",
  },
  wipe: {
    title: "Delete my data",
    body: "This removes all your resumes, previews and analyses stored in your Puter account. It can't be undone.",
    files: (n: number) => (n === 1 ? "1 saved file" : `${n} saved files`),
    empty: "You don't have any saved files.",
    confirm: "Delete everything",
    deleting: "Deleting…",
    done: "Your data was deleted.",
  },
  footer: {
    tagline: "AI resume analysis to get you the interview.",
    product: "Product",
    legal: "Your data",
    deleteData: "Delete my data",
    rights: (year: number) => `© ${year} ResumeSense`,
  },
  errors: {
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or was moved.",
    genericTitle: "Something went wrong",
    genericBody: "An unexpected error occurred. Try again in a moment.",
    home: "Back to home",
  },
  common: {
    loading: "Loading…",
    cancel: "Cancel",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { es, en };

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

/** Picks the best supported language from an Accept-Language header or navigator list. */
export function negotiateLang(preferred: readonly string[] | string | null | undefined): Lang {
  const list =
    typeof preferred === "string"
      ? preferred
          .split(",")
          .map((part) => part.split(";")[0].trim())
          .filter(Boolean)
      : preferred ?? [];
  for (const tag of list) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLang(base)) return base;
  }
  return DEFAULT_LANG;
}

export const LANG_COOKIE = "lang";

export function readLangCookie(cookieHeader: string | null | undefined): Lang | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|;\s*)lang=([^;]+)/);
  const value = match?.[1];
  return isLang(value) ? value : null;
}
