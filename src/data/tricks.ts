export type CategoryId =
  | "herramientas"
  | "prompts"
  | "dictado"
  | "aprendizaje"
  | "contenido"
  | "trabajo"
  | "delegar"
  | "visual"
  | "secretos"
  | "vida";

export type Difficulty = "rapido" | "medio" | "profundo";

export type Payoff = "ahorro" | "claridad" | "calidad" | "creacion" | "automatizacion";

export type Trick = {
  id: string;
  number: number;
  title: string;
  categoryId: CategoryId;
  chapter: string;
  tags: string[];
  tools: string[];
  estimatedMinutes: number;
  difficulty: Difficulty;
  payoff: Payoff;
  action: string;
  prompt: string;
  checklist: string[];
};

export type TrickCategory = {
  id: CategoryId;
  label: string;
  short: string;
  accent: string;
};

export const categories: TrickCategory[] = [
  { id: "herramientas", label: "IA correcta", short: "Elegir herramienta", accent: "#0f8b8d" },
  { id: "prompts", label: "Prompts copy-paste", short: "Pedir mejor", accent: "#e2554f" },
  { id: "dictado", label: "Atajos de texto", short: "No teclear", accent: "#6b5dd3" },
  { id: "aprendizaje", label: "Estudiar", short: "Aprender rapido", accent: "#2f7d32" },
  { id: "contenido", label: "Contenido", short: "Crear piezas", accent: "#c46a14" },
  { id: "trabajo", label: "Trabajo", short: "Oficina", accent: "#255f85" },
  { id: "delegar", label: "Delegar lo aburrido", short: "Automatizar tareas", accent: "#7a5a18" },
  { id: "visual", label: "Imagen y video", short: "Visuales", accent: "#b6426d" },
  { id: "secretos", label: "Funciones avanzadas", short: "Configurar sistema", accent: "#34495e" },
  { id: "vida", label: "Vida personal", short: "Piloto automatico", accent: "#0a7a5b" },
];

const rawTricks: Array<[number, string]> = [
  [1, "La IA correcta para cada tarea (la chuleta que te va a ahorrar horas)"],
  [2, "Cuando Claude le gana a ChatGPT (y viceversa)"],
  [3, "La IA gratis que casi nadie conoce y rinde un monton"],
  [4, "Que IA usar cuando las demas te censuran"],
  [5, "Cual usar para investigar (y por que Perplexity puede ahorrarte horas)"],
  [6, "La IA correcta para imagenes (spoiler: no es DALL-E)"],
  [7, "La IA para video que si te va a sorprender"],
  [8, "La IA para programar (incluso si no programas)"],
  [9, "Cuando NO usar IA (y ahorrar dinero)"],
  [10, 'La estrategia "una de pago + dos gratis"'],
  [11, "El prompt universal para resumir cualquier cosa"],
  [12, "El prompt para que la IA te haga preguntas en vez de tu a ella"],
  [13, "El prompt para emails dificiles"],
  [14, "El prompt para convertir cualquier texto en algo que se entienda"],
  [15, "El prompt asistente personal todoterreno"],
  [16, "El prompt anti-IA-generica"],
  [17, 'El prompt de "dame opciones, no respuestas"'],
  [18, "El prompt para tomar decisiones complicadas"],
  [19, "El prompt para pedir feedback de verdad"],
  [20, "El prompt para no quedarte en blanco nunca mas"],
  [21, "Dicta en vez de teclear (y deja que la IA limpie)"],
  [22, "Foto a notas a mano = texto limpio en 5 segundos"],
  [23, "Audio de WhatsApp a email profesional"],
  [24, "Reescribe tus mensajes con un clic"],
  [25, "Convierte 4 bullets en un texto largo de oficina"],
  [26, "Redacta CV o LinkedIn sin sentirte ridiculo"],
  [27, "Texto en otro idioma sin sonar a Google Translate"],
  [28, 'La plantilla "voy a improvisar pero parezco preparado"'],
  [29, "Auto-respuesta del WhatsApp del trabajo"],
  [30, "Convierte cualquier idea en una nota organizada"],
  [31, "Convierte un PDF de 200 paginas en notas de TikTok"],
  [32, "La tecnica Feynman con IA (la mejor para aprender de verdad)"],
  [33, "Aprende un idioma chateando, no estudiando"],
  [34, "Estudia menos, aprueba mas (con flashcards generadas por IA)"],
  [35, "Resumenes en 3 niveles segun cuanta energia tengas hoy"],
  [36, "Que la IA te examine y te ensene lo que no sabes"],
  [37, "Estudia un libro entero sin leerlo"],
  [38, "Aprende cualquier habilidad nueva en 7 dias"],
  [39, "La IA como tu profesor particular nivel Harvard"],
  [40, "Prepara una entrevista de trabajo en 30 minutos"],
  [41, "30 ideas de contenido sobre un solo tema"],
  [42, "Recicla un video largo en 10 piezas cortas"],
  [43, "Ganchos virales que la IA genera mejor que tu"],
  [44, "Guiones para video corto que retienen audiencia"],
  [45, "Titulos y miniaturas que si venden"],
  [46, "Subtitulos automaticos en 30 segundos"],
  [47, "Genera carruseles de Instagram completos"],
  [48, "La formula AIDA para captions y emails"],
  [49, "Voz de marca propia (que no suene a IA)"],
  [50, "Repurposing total: un video, 7 piezas de contenido"],
  [51, "Resumir la reunion a la que no prestaste atencion"],
  [52, 'Email de "siento la tardanza" en 10 segundos'],
  [53, "Informe profesional desde 4 bullets caoticos"],
  [54, "Tabla de Excel sin saber Excel"],
  [55, "Powerpoint en 10 minutos en vez de 3 horas"],
  [56, 'La tecnica "delegar al jefe"'],
  [57, "Convierte una idea vaga en un plan ejecutable"],
  [58, "Escribe una propuesta comercial como un consultor caro"],
  [59, "Negocia un aumento, una promocion o cualquier cosa dificil"],
  [60, "Auto-evaluacion anual sin morir"],
  [61, "Llenar formularios largos sin morir"],
  [62, "Comparar 5 productos sin abrir 5 pestanas"],
  [63, "Resumir terminos y condiciones (esos que nadie lee)"],
  [64, "Hace los calculos de tus impuestos antes que tu gestor"],
  [65, "Buscar y comparar precios en segundos"],
  [66, "Organiza datos sueltos en una tabla util"],
  [67, "Extraer informacion clave de PDFs largos"],
  [68, "Limpieza de bandeja de entrada"],
  [69, "Convertir capturas de pantalla en informacion usable"],
  [70, "Analisis basico de datos sin saber estadistica"],
  [71, "Quita fondos, objetos o personas en segundos"],
  [72, "Genera imagenes con IA que NO se ven a IA"],
  [73, "Genera miniaturas que si dan clic"],
  [74, "Crea logos decentes sin disenador"],
  [75, "Mejora fotos viejas, borrosas o pixeladas"],
  [76, "Edita videos sin saber edicion"],
  [77, "Genera voces realistas para narrar"],
  [78, "Genera videos cortos desde texto o imagen"],
  [79, "Crea musica y efectos de sonido sin saber musica"],
  [80, "Plantillas de Canva + IA = magia"],
  [81, "Memoria personalizada bien configurada"],
  [82, "Proyectos para no repetir contexto nunca mas"],
  [83, "Conecta tu IA con Gmail, Drive, Slack y mas"],
  [84, "System prompts personales que cambian todo"],
  [85, "Combinar dos IAs para una misma tarea"],
  [86, "Usar Artifacts y Canvas como entorno de trabajo"],
  [87, "Skills personales: ensena a tu IA tus reglas"],
  [88, 'La funcion oculta de "regenerar con cambios"'],
  [89, "Tareas programadas: la IA trabaja mientras duermes"],
  [90, "Modos de razonamiento profundo (para cuando si importa)"],
  [91, "Planifica un viaje completo en un solo prompt"],
  [92, "Decisiones dificiles con framework propio"],
  [93, "Plan de comidas segun lo que tienes en la nevera"],
  [94, "Coach de fitness personalizado"],
  [95, "Coach de finanzas personales"],
  [96, "Coach personal para habitos"],
  [97, "Asesor de relaciones (si, tambien)"],
  [98, "Ayuda con problemas de salud (con responsabilidad)"],
  [99, "Resumen diario tuyo (un journal con superpoderes)"],
  [100, "El truco final: que la IA te ensene a usar la IA"],
];

export const tricks: Trick[] = rawTricks.map(([number, title]) => {
  const categoryId = getCategoryId(number);
  const category = categories.find((item) => item.id === categoryId) ?? categories[0];
  const tools = inferTools(title, categoryId);
  const estimatedMinutes = estimateMinutes(title, categoryId);
  const difficulty = inferDifficulty(title, estimatedMinutes);

  return {
    id: `truco-${number}`,
    number,
    title,
    categoryId,
    chapter: category.label,
    tags: inferTags(title, categoryId, tools),
    tools,
    estimatedMinutes,
    difficulty,
    payoff: inferPayoff(categoryId),
    action: buildAction(title, categoryId),
    prompt: buildPrompt(title, categoryId, tools),
    checklist: buildChecklist(categoryId),
  };
});

export function getCategory(categoryId: CategoryId): TrickCategory {
  return categories.find((category) => category.id === categoryId) ?? categories[0];
}

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getCategoryId(number: number): CategoryId {
  if (number <= 10) return "herramientas";
  if (number <= 20) return "prompts";
  if (number <= 30) return "dictado";
  if (number <= 40) return "aprendizaje";
  if (number <= 50) return "contenido";
  if (number <= 60) return "trabajo";
  if (number <= 70) return "delegar";
  if (number <= 80) return "visual";
  if (number <= 90) return "secretos";
  return "vida";
}

function inferTools(title: string, categoryId: CategoryId): string[] {
  const text = normalizeText(title);
  const tools = new Set<string>();

  if (/claude/.test(text)) tools.add("Claude");
  if (/chatgpt/.test(text)) tools.add("ChatGPT");
  if (/gemini/.test(text)) tools.add("Gemini");
  if (/perplexity|investigar|fuentes/.test(text)) tools.add("Perplexity");
  if (/grok/.test(text)) tools.add("Grok");
  if (/canva|plantillas/.test(text)) tools.add("Canva");
  if (/excel|tabla|datos|estadistica/.test(text)) tools.add("Sheets");
  if (/powerpoint/.test(text)) tools.add("PowerPoint");
  if (/whatsapp|audio|mensaje/.test(text)) tools.add("WhatsApp");
  if (/linkedin|cv/.test(text)) tools.add("LinkedIn");
  if (/gmail|drive|slack|bandeja/.test(text)) tools.add("Gmail/Drive");
  if (/video|subtitulos/.test(text)) tools.add("CapCut");
  if (/imagen|miniatura|fotos|logo|fondos/.test(text)) tools.add("Gemini/Midjourney");
  if (/voz|narrar/.test(text)) tools.add("ElevenLabs");
  if (/musica|sonido/.test(text)) tools.add("Suno");

  const fallback: Record<CategoryId, string[]> = {
    herramientas: ["ChatGPT", "Claude", "Gemini"],
    prompts: ["ChatGPT", "Claude"],
    dictado: ["ChatGPT", "Claude", "Dictado movil"],
    aprendizaje: ["Claude", "ChatGPT"],
    contenido: ["ChatGPT", "Claude", "Canva"],
    trabajo: ["ChatGPT", "Claude", "Google Workspace"],
    delegar: ["ChatGPT", "Perplexity", "Google Workspace"],
    visual: ["Gemini", "Canva", "CapCut"],
    secretos: ["ChatGPT", "Claude", "Automations"],
    vida: ["ChatGPT", "Gemini"],
  };

  fallback[categoryId].forEach((tool) => tools.add(tool));
  return Array.from(tools).slice(0, 4);
}

function inferTags(title: string, categoryId: CategoryId, tools: string[]): string[] {
  const text = normalizeText(title);
  const tags = new Set<string>([categoryId, inferPayoff(categoryId)]);

  [
    "email",
    "resumir",
    "decisiones",
    "estudiar",
    "video",
    "imagenes",
    "datos",
    "viaje",
    "coach",
    "contenido",
    "trabajo",
    "automatizar",
    "ahorrar",
    "investigar",
    "programar",
    "prompts",
  ].forEach((keyword) => {
    if (text.includes(keyword)) tags.add(keyword);
  });

  tools.forEach((tool) => tags.add(normalizeText(tool)));
  return Array.from(tags);
}

function estimateMinutes(title: string, categoryId: CategoryId): number {
  const text = normalizeText(title);
  if (text.includes("30 segundos") || text.includes("5 segundos") || text.includes("10 segundos")) return 5;
  if (text.includes("10 minutos")) return 10;
  if (text.includes("30 minutos")) return 30;
  if (text.includes("7 dias")) return 45;
  if (text.includes("system") || text.includes("memoria") || text.includes("proyectos")) return 25;

  const defaults: Record<CategoryId, number> = {
    herramientas: 10,
    prompts: 8,
    dictado: 7,
    aprendizaje: 18,
    contenido: 18,
    trabajo: 12,
    delegar: 15,
    visual: 18,
    secretos: 25,
    vida: 20,
  };

  return defaults[categoryId];
}

function inferDifficulty(title: string, estimatedMinutes: number): Difficulty {
  const text = normalizeText(title);
  if (estimatedMinutes <= 10) return "rapido";
  if (/system|memoria|conecta|programadas|razonamiento|framework|finanzas|salud/.test(text)) return "profundo";
  return "medio";
}

function inferPayoff(categoryId: CategoryId): Payoff {
  const payoffs: Record<CategoryId, Payoff> = {
    herramientas: "ahorro",
    prompts: "claridad",
    dictado: "ahorro",
    aprendizaje: "calidad",
    contenido: "creacion",
    trabajo: "ahorro",
    delegar: "automatizacion",
    visual: "creacion",
    secretos: "automatizacion",
    vida: "claridad",
  };

  return payoffs[categoryId];
}

function buildAction(title: string, categoryId: CategoryId): string {
  const actions: Record<CategoryId, string> = {
    herramientas: "Elige una herramienta principal, una alternativa gratis y una situacion donde no usar IA.",
    prompts: "Convierte una peticion vaga en una plantilla con tarea, contexto, formato, tono y limite.",
    dictado: "Captura la idea en bruto y pide una version limpia para el canal exacto donde la usaras.",
    aprendizaje: "Transforma el material en notas, preguntas, ejemplos y una prueba corta de recuperacion.",
    contenido: "Parte de una sola idea y genera piezas reutilizables con gancho, estructura y cierre.",
    trabajo: "Entrega una version profesional desde notas desordenadas, reuniones o bullets incompletos.",
    delegar: "Pega el material repetitivo y pide una salida estructurada que puedas revisar rapido.",
    visual: "Define objetivo visual, referencia, formato y restricciones antes de generar o editar.",
    secretos: "Configura una regla persistente para no repetir contexto en cada conversacion.",
    vida: "Describe tu situacion, restricciones y preferencia; pide un plan simple con seguimiento.",
  };

  return `${actions[categoryId]} Foco: ${title}.`;
}

function buildPrompt(title: string, categoryId: CategoryId, tools: string[]): string {
  const role: Record<CategoryId, string> = {
    herramientas: "asesor practico de herramientas de IA",
    prompts: "especialista en prompts claros y accionables",
    dictado: "editor que limpia ideas dictadas sin cambiar la intencion",
    aprendizaje: "profesor particular que convierte material en aprendizaje activo",
    contenido: "estratega de contenido que reutiliza ideas sin sonar generico",
    trabajo: "consultor operativo que convierte notas caoticas en entregables profesionales",
    delegar: "asistente de productividad que estructura informacion repetitiva",
    visual: "director creativo de piezas visuales generadas con IA",
    secretos: "arquitecto de sistemas personales de IA",
    vida: "coach practico que crea planes realistas y responsables",
  };

  const output: Record<CategoryId, string> = {
    herramientas: "comparativa breve, recomendacion, alternativa gratis y primer paso",
    prompts: "prompt final listo para copiar, version corta y checklist de calidad",
    dictado: "texto limpio, version breve y version profesional",
    aprendizaje: "resumen, preguntas de examen y plan de repaso",
    contenido: "ideas, guion, hook y pieza final reutilizable",
    trabajo: "entregable profesional, riesgos y proximas acciones",
    delegar: "tabla, resumen, decisiones y elementos pendientes",
    visual: "prompt visual, ajustes de estilo y variaciones",
    secretos: "regla persistente, ejemplo de uso y mantenimiento",
    vida: "plan simple, limites, seguimiento y senales de revision",
  };

  return [
    `Actua como ${role[categoryId]}.`,
    `Quiero aplicar el truco "${title}" a este caso: [describe aqui tu situacion real].`,
    `Herramientas disponibles: ${tools.join(", ")}.`,
    `Devuelve ${output[categoryId]}.`,
    "Si falta informacion importante, haz primero un maximo de 3 preguntas.",
  ].join("\n");
}

function buildChecklist(categoryId: CategoryId): string[] {
  const shared = "Guarda el resultado util en una nota o documento.";
  const lists: Record<CategoryId, string[]> = {
    herramientas: [
      "Define si necesitas escribir, investigar, crear, calcular o decidir.",
      "Elige la IA principal y una copia de seguridad.",
      "Comprueba si una app tradicional seria mas rapida.",
      shared,
    ],
    prompts: [
      "Escribe una sola tarea principal.",
      "Anade contexto, audiencia y formato de salida.",
      "Incluye limites, ejemplos o criterios de calidad.",
      shared,
    ],
    dictado: [
      "Captura la idea sin corregirte mientras hablas.",
      "Pide limpieza, tono y formato para un canal concreto.",
      "Revisa nombres, fechas y datos sensibles.",
      shared,
    ],
    aprendizaje: [
      "Pega o resume el material base.",
      "Pide explicacion en niveles y ejemplos.",
      "Haz que la IA te examine con preguntas.",
      shared,
    ],
    contenido: [
      "Define tema, audiencia y canal.",
      "Pide 3 enfoques antes de elegir uno.",
      "Genera pieza principal y derivadas cortas.",
      shared,
    ],
    trabajo: [
      "Pega bullets, notas o transcripcion.",
      "Pide estructura profesional y decisiones claras.",
      "Comprueba tono, datos y proximos pasos.",
      shared,
    ],
    delegar: [
      "Agrupa toda la informacion repetitiva.",
      "Pide tabla, resumen o checklist verificable.",
      "Marca lo que requiere revision humana.",
      shared,
    ],
    visual: [
      "Define objetivo, formato y estilo visual.",
      "Anade referencias permitidas y restricciones.",
      "Genera variaciones antes de pulir.",
      shared,
    ],
    secretos: [
      "Escribe una regla corta que quieras repetir siempre.",
      "Pruebala en una tarea real.",
      "Ajusta la regla si produce respuestas demasiado genericas.",
      shared,
    ],
    vida: [
      "Declara restricciones reales de tiempo, dinero o energia.",
      "Pide un plan pequeno y medible.",
      "Incluye limite de seguridad o responsabilidad cuando aplique.",
      shared,
    ],
  };

  return lists[categoryId];
}
