import { slugify } from "../lib/text";
import type {
  AppState,
  BusinessStrategy,
  BusinessType,
  DayLesson,
  Goal,
  LessonVisual,
  Phase,
  PhaseId,
} from "../types/planner";

export const appName = "Planificador Meta Ads 30 Días";

export const storageKey = "planificador-meta-ads-30-dias:v3";

export const phaseList: Phase[] = [
  {
    id: 1,
    label: "Fase 1",
    title: "Cimientos",
    range: "Días 1-7",
    focus: "Infraestructura, pixel, cliente ideal y oferta.",
  },
  {
    id: 2,
    label: "Fase 2",
    title: "Creatividad",
    range: "Días 8-14",
    focus: "Textos, guiones, creatividades y revisión.",
  },
  {
    id: 3,
    label: "Fase 3",
    title: "Lanzamiento",
    range: "Días 15-21",
    focus: "Campaña simple, aprendizaje y registro.",
  },
  {
    id: 4,
    label: "Fase 4",
    title: "Optimización",
    range: "Días 22-30",
    focus: "Métricas, escalado gradual y sistema semanal.",
  },
];

export const businessConfig: Record<BusinessType, BusinessStrategy> = {
  infoproduct: {
    label: "Infoproducto",
    strategy: "Promesa clara, página de destino simple, vídeo auténtico y objeciones resueltas.",
    emphasis: ["Prueba de valor", "Vídeo mostrando el producto", "Oferta con riesgo bajo"],
  },
  ecommerce: {
    label: "Tienda online",
    strategy: "Pixel, catálogo, producto en uso real, ROAS y remarketing.",
    emphasis: ["Evento de compra", "Producto en contexto", "Página móvil rápida"],
  },
  local: {
    label: "Servicio local",
    strategy: "Zona geográfica, confianza, mensajes/clientes potenciales y prueba social local.",
    emphasis: ["Radio de servicio", "Reseñas visibles", "WhatsApp o formulario probado"],
  },
  creator: {
    label: "Marca personal",
    strategy: "Voz propia, vídeos orgánicos ganadores y audiencias de interacción.",
    emphasis: ["Contenido orgánico", "Tono real", "Audiencias de vídeo e interacción"],
  },
};

export const goalLabels: Record<Goal, string> = {
  ventas: "Ventas",
  leads: "Clientes potenciales",
  mensajes: "Mensajes",
};

export const initialState: AppState = {
  activeTab: "today",
  selectedDay: 1,
  completedTaskIds: [],
  completedDays: [],
  notes: {},
  profile: {
    brand: "Marta Recetas",
    offer: "Libro digital de 60 recetas saludables, rápidas y económicas por 19 EUR",
    audience: "Personas ocupadas que quieren comer mejor sin cocinar durante horas",
    businessType: "infoproduct",
    goal: "ventas",
    budget: "12",
    cpaLimit: "10",
    roasTarget: "2",
    pixelReady: false,
    launchDate: "",
  },
};

export const heroImages: Record<LessonVisual, string> = {
  desk: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82",
  creative: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82",
  metrics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=82",
};

export const lessons: DayLesson[] = [
  lesson(1, 1, "Configuración de Business Manager", "Deja listo el centro de mando", 60, "Configura accesos, cuenta publicitaria, moneda, zona horaria y método de pago.", "desk", [
    ["Confirma acceso de administrador", "Business Manager y página deben estar bajo control real."],
    ["Revisa cuenta publicitaria", "Moneda, zona horaria y método de pago sin errores."],
    ["Conecta Facebook e Instagram", "Perfiles completos y vinculados antes de invertir."],
  ]),
  lesson(2, 1, "Instalación de Pixel y CAPI", "Prepara la medición", 45, "Asegura que Meta pueda recibir señales de compra, cliente potencial o mensaje.", "metrics", [
    ["Comprueba pixel", "Evento de compra o cliente potencial instalado si vendes en web."],
    ["Valida dominio", "Dominio verificado y sin alertas críticas."],
    ["Prueba ruta móvil", "Clic, página, pago/formulario y confirmación."],
  ]),
  lesson(3, 1, "Investigación de audiencia", "Entiende a quién hablas", 90, "Documenta deseos, miedos, objeciones y lenguaje real del cliente.", "creative", [
    ["Lista 3 deseos", "Qué resultado quiere con más urgencia."],
    ["Lista 5 objeciones", "Precio, tiempo, confianza, complejidad o miedo."],
    ["Captura frases reales", "Lenguaje que el cliente diría, no lenguaje de marca."],
  ]),
  lesson(4, 1, "Estrategia creativa", "Define las hipótesis fuertes", 75, "Crea el mapa inicial de ángulos de venta y formatos.", "creative", [
    ["Elige palancas", "Emocional, racional, urgencia sana o prueba social."],
    ["Asigna formato", "Reel, imagen, contenido de usuario, demo o carrusel."],
    ["Guarda la hipótesis", "Por qué este ángulo debería mover al cliente."],
  ]),
  lesson(5, 1, "Estructura de oferta", "Haz que la oferta cierre", 60, "Revisa promesa, precio, bonos, garantía y llamada a la acción.", "desk", [
    ["Clarifica promesa", "Debe ser concreta, creíble y visible."],
    ["Reduce riesgo", "Bono, garantía o muestra que facilite decidir."],
    ["Prueba llamada a la acción", "Comprar, reservar, dejar datos o escribir sin fricción."],
  ]),
  lesson(6, 1, "Redacción publicitaria básica", "Escribe para frenar el desplazamiento", 75, "Prepara ganchos y textos base con estructura AIDA.", "creative", [
    ["Crea 10 ganchos", "Problema, deseo, contraste, curiosidad e identidad."],
    ["Escribe AIDA", "Atención, interés, deseo y acción por ángulo."],
    ["Revisa claridad", "Una idea por anuncio y llamada a la acción específica."],
  ]),
  lesson(7, 1, "Revisión semanal", "Cierra los cimientos", 45, "Revisa que la campaña no se monte sobre dudas técnicas.", "desk", [
    ["Lista de acceso", "Business Manager, cuenta, página, pixel y destino revisados."],
    ["Documento de marca guardado", "Contexto reutilizable para todas las instrucciones IA."],
    ["Número objetivo", "CPA máximo o ROAS mínimo definidos."],
  ]),
  lesson(8, 2, "Redacción estratégica", "Convierte ángulos en anuncios", 45, "Redacta variantes de texto para los ángulos elegidos.", "creative", [
    ["Escribe 3 titulares", "Compara beneficio directo frente a curiosidad."],
    ["Redacta el texto principal", "Incluye AIDA: atención, interés, deseo y acción."],
    ["Define 2 llamadas a la acción", "Prueba una versión suave y otra más directa."],
    ["Revisión final", "Lee en voz alta para comprobar que suena natural."],
  ]),
  lesson(9, 2, "Ganchos y miniaturas", "Diseña el primer segundo", 60, "Crea texto en pantalla y miniaturas que se entiendan sin sonido.", "creative", [
    ["Escribe 12 ganchos", "Máximo 10 palabras por gancho."],
    ["Crea texto en pantalla", "6 a 8 frases cortas para video."],
    ["Revisa contraste", "Legible en móvil a tamaño real."],
  ]),
  lesson(10, 2, "Estructura de campaña", "Ordena la arquitectura", 60, "Define campaña, conjunto, anuncios, nombres y presupuesto.", "desk", [
    ["Campaña simple", "Un objetivo real y presupuesto a nivel de campaña al inicio."],
    ["Conjunto amplio", "Advantage+ o audiencia amplia con pocas pistas."],
    ["3 a 5 anuncios", "Cada uno con ángulo o gancho distinto."],
  ]),
  lesson(11, 2, "Presupuesto y punto de equilibrio", "Calcula tu margen", 45, "Fija presupuesto inicial sostenible y umbral de rentabilidad.", "metrics", [
    ["Presupuesto diario", "Debe poder mantenerse mínimo 7 días."],
    ["CPA máximo", "Calculado con margen prudente."],
    ["ROAS mínimo", "Retorno mínimo para no perder dinero."],
  ]),
  lesson(12, 2, "Revisión de página de destino", "Evita fugas después del clic", 60, "Audita el destino móvil antes de enviar tráfico.", "desk", [
    ["Velocidad móvil", "La página carga rápido y sin saltos raros."],
    ["Promesa coherente", "Anuncio y destino prometen lo mismo."],
    ["Botón visible", "Botón o formulario sin buscarlo."],
  ]),
  lesson(13, 2, "Revisión de políticas", "Reduce rechazos", 45, "Filtra afirmaciones sensibles, promesas exageradas y atributos personales.", "creative", [
    ["Detecta afirmaciones de dinero/salud", "Suaviza o elimina afirmaciones arriesgadas."],
    ["Evita atributos personales", "No señalar problemas del usuario de forma directa."],
    ["Versión segura", "Reescribe manteniendo fuerza y honestidad."],
  ]),
  lesson(14, 2, "Preparación de recursos", "Deja listo el banco inicial", 60, "Organiza piezas, textos, titulares y nombres antes de entrar a Meta.", "creative", [
    ["Nombra archivos", "Formato, ángulo y versión claros."],
    ["Comprueba 9:16", "Prioriza Reels y Stories."],
    ["Guarda variantes", "No descartes material para relevo creativo."],
  ]),
  lesson(15, 3, "Día de lanzamiento", "Publica con estructura simple", 90, "Monta la campaña y publica sin sobrecomplicar.", "desk", [
    ["Selecciona objetivo correcto", "Ventas, clientes potenciales o mensajes según negocio."],
    ["Activa presupuesto de campaña", "Presupuesto de campaña modesto y sostenible."],
    ["Publica y documenta", "Captura estructura, anuncios y fecha."],
  ]),
  lesson(16, 3, "Protección de aprendizaje", "No toques la campaña", 20, "Deja que Meta explore sin reiniciar aprendizaje.", "metrics", [
    ["Verifica estado", "Activa, revisión o rechazo con causa."],
    ["Anota observaciones", "Sin tomar decisiones por horas sueltas."],
    ["Evita cambios", "No editar presupuesto, audiencia ni anuncios."],
  ]),
  lesson(17, 3, "Bitácora de campaña", "Registra lo lanzado", 35, "Crea bitácora para no adivinar luego.", "desk", [
    ["Lista estructura", "Campaña, conjunto, objetivo y ubicaciones."],
    ["Lista anuncios", "Ángulo, texto, creatividad y llamada a la acción."],
    ["Anota hipótesis", "Qué esperas aprender de cada variante."],
  ]),
  lesson(18, 3, "Corrección de rechazos", "Gestiona rechazos", 45, "Corrige anuncios rechazados sin poner en riesgo la cuenta.", "creative", [
    ["Lee la razón exacta", "No supongas el motivo."],
    ["Corrige afirmaciones", "Dinero, salud, atributos o promesas."],
    ["Solicita revisión", "Solo si crees que fue error."],
  ]),
  lesson(19, 3, "Auditoría del destino", "Prueba toda la ruta", 40, "Verifica que cada clic pueda convertirse.", "desk", [
    ["Prueba desde móvil", "Con datos móviles si puedes."],
    ["Completa formulario o pago", "Hasta confirmación final."],
    ["Anota fricciones", "Cualquier duda que frenaría la compra."],
  ]),
  lesson(20, 3, "Lectura de señales", "Mira sin reaccionar", 25, "Observa CTR, frecuencia y comentarios sin romper aprendizaje.", "metrics", [
    ["Revisa CTR", "Termómetro de creatividad."],
    ["Revisa frecuencia", "Señal temprana de saturación."],
    ["Guarda comentarios", "Objeciones reales para próximos anuncios."],
  ]),
  lesson(21, 3, "Preparación de datos semanales", "Prepara diagnóstico", 45, "Reúne datos de la primera semana completa.", "metrics", [
    ["Gasto y resultados", "Ventas/clientes potenciales, CPA y ROAS."],
    ["Datos por anuncio", "Entrega, CTR, frecuencia y conversiones."],
    ["Preguntas de análisis", "Qué decisión necesitas tomar mañana."],
  ]),
  lesson(22, 4, "Diagnóstico de métricas", "Lee lo que dice la campaña", 75, "Convierte métricas en decisiones concretas.", "metrics", [
    ["Compara con umbral", "CPA máximo o ROAS mínimo."],
    ["Detecta ganador", "No tu favorito, el que sostiene resultado."],
    ["Pide diagnóstico IA", "Salud, problema y 3 acciones."],
  ]),
  lesson(23, 4, "Primeras decisiones", "Pausar, mantener o ajustar", 45, "Toma decisiones basadas en datos de semana.", "metrics", [
    ["Pausa perdedores claros", "Solo con datos suficientes."],
    ["Mantén prometedores", "No matar por un mal día."],
    ["Define cuello de botella", "Creatividad, oferta, destino o medición."],
  ]),
  lesson(24, 4, "Escalado gradual", "Sube sin romper", 35, "Escala de forma prudente lo que funciona.", "metrics", [
    ["Confirma estabilidad", "Rendimiento sostenido varios días."],
    ["Sube máximo 20%", "Incremento moderado."],
    ["Documenta cambio", "Fecha, antes, después y motivo."],
  ]),
  lesson(25, 4, "Relevo creativo", "Prepara relevo", 60, "Genera variaciones del ángulo ganador antes de fatiga.", "creative", [
    ["Selecciona ganador", "Por CPA/ROAS/CTR, no gusto personal."],
    ["Crea 5 variaciones", "Misma esencia, nuevos ganchos."],
    ["Plan de grabación", "Qué pieza producir y cuándo."],
  ]),
  lesson(26, 4, "Reglas automáticas", "Instala protecciones", 40, "Crea reglas simples que avisen de problemas.", "metrics", [
    ["Alerta por frecuencia", "Cuando suba demasiado varios días."],
    ["Alerta por CPA", "Cuando supere tu umbral."],
    ["Registra reglas", "Condición, acción y razón."],
  ]),
  lesson(27, 4, "Plan de prueba A/B", "Prueba sin engañarte", 50, "Diseña una prueba cambiando una variable.", "creative", [
    ["Elige variable", "Gancho, ángulo, formato, oferta o destino."],
    ["Define métrica", "CTR, CPA, ROAS o cliente potencial cualificado."],
    ["Marca duración", "Tiempo y volumen razonables."],
  ]),
  lesson(28, 4, "Biblioteca de aprendizajes", "Convierte datos en criterio", 45, "Documenta patrones reales de tu audiencia.", "desk", [
    ["Qué funcionó", "Ángulo, gancho, formato o promesa."],
    ["Qué falló", "Aprendizaje sin drama."],
    ["Actualiza documento guía", "La IA mejora con contexto real."],
  ]),
  lesson(29, 4, "Sistema semanal de trabajo", "Crea tu rutina", 35, "Fija el hábito de revisión, decisión y creatividad.", "desk", [
    ["Bloque semanal", "Día y hora fija para revisar."],
    ["Cadencia creativa", "Relevo cada 2 o 3 semanas."],
    ["Conversación IA dedicada", "Documento de marca, métricas e historial juntos."],
  ]),
  lesson(30, 4, "Exportación y siguiente ciclo", "Cierra y repite", 45, "Exporta plan, aprendizajes y próximas acciones.", "desk", [
    ["Exporta resumen", "Progreso, notas, métricas y aprendizajes."],
    ["Define siguiente ciclo", "Mantener, pausar, escalar o probar."],
    ["Mantén banco lleno", "Próximas variaciones preparadas."],
  ]),
];

function lesson(
  day: number,
  phase: PhaseId,
  title: string,
  subtitle: string,
  duration: number,
  objective: string,
  visual: LessonVisual,
  checklist: Array<[string, string]>,
): DayLesson {
  return {
    day,
    phase,
    title,
    subtitle,
    duration,
    objective,
    visual,
    checklist: checklist.map(([itemTitle, helper]) => ({
      id: `day-${day}-${slugify(itemTitle)}`,
      title: itemTitle,
      helper,
      steps: buildTaskSteps(title, itemTitle, helper),
      deliverable: buildTaskDeliverable(itemTitle),
    })),
    resources: [
      { title: "Copiar instrucción IA", description: "Prompt para ChatGPT", action: "copyPrompt" },
      { title: "Copiar plan de acción", description: "Pasos del día", action: "copyActionPlan" },
    ],
    prompt: title,
  };
}

function buildTaskSteps(lessonTitle: string, itemTitle: string, helper: string) {
  const text = normalizeForGuide(`${lessonTitle} ${itemTitle} ${helper}`);

  if (hasAny(text, ["pixel", "capi", "evento"])) {
    return [
      "Abre el Administrador de eventos de Meta y entra en el pixel de este proyecto.",
      "Usa la prueba de eventos o navega por la web hasta completar la acción clave.",
      "Confirma que Meta recibe el evento correcto y anota cualquier aviso o error.",
    ];
  }

  if (hasAny(text, ["dominio"])) {
    return [
      "Entra en la configuración del negocio y revisa el apartado de seguridad de marca/dominios.",
      "Comprueba que el dominio principal aparece verificado y asociado al negocio correcto.",
      "Si hay alertas, apunta el mensaje exacto antes de seguir con la campaña.",
    ];
  }

  if (hasAny(text, ["ruta movil", "movil", "pagina", "destino", "boton", "formulario", "pago"])) {
    return [
      "Abre el destino desde el móvil, sin asumir que en ordenador funciona igual.",
      "Recorre el camino completo: anuncio simulado, página, botón, formulario o pago.",
      "Anota cualquier fricción: carga lenta, texto confuso, botón escondido o paso dudoso.",
    ];
  }

  if (hasAny(text, ["acceso", "administrador", "business manager", "cuenta publicitaria", "facebook", "instagram"])) {
    return [
      "Entra en Business Manager y revisa quién tiene acceso de administrador.",
      "Comprueba cuenta publicitaria, página, Instagram, moneda, zona horaria y método de pago.",
      "Deja escrito qué está correcto y qué falta pedir, corregir o conectar.",
    ];
  }

  if (hasAny(text, ["deseos", "objeciones", "frases reales", "audiencia", "cliente"])) {
    return [
      "Piensa en una persona concreta de tu público y escribe su situación real.",
      "Busca lenguaje en comentarios, reseñas, mensajes, preguntas frecuentes o llamadas.",
      "Guarda frases literales: dolores, deseos, dudas y palabras que usaría el cliente.",
    ];
  }

  if (hasAny(text, ["palancas", "formato", "hipotesis", "angulo", "creativa", "gancho", "miniatura", "texto en pantalla"])) {
    return [
      "Elige una idea principal: problema, deseo, prueba social, comparación o urgencia sana.",
      "Decide el formato más fácil de producir hoy: reel, imagen, demo, carrusel o testimonio.",
      "Escribe por qué crees que esta pieza puede llamar la atención del cliente.",
    ];
  }

  if (hasAny(text, ["promesa", "riesgo", "oferta", "bono", "garantia", "llamada a la accion"])) {
    return [
      "Escribe la promesa en una frase concreta y fácil de entender.",
      "Revisa si hay una razón clara para actuar ahora: precio, bono, garantía o beneficio.",
      "Define la siguiente acción exacta: comprar, reservar, dejar datos o escribir.",
    ];
  }

  if (hasAny(text, ["aida", "titulares", "texto principal", "redacta", "claridad", "revision final"])) {
    return [
      "Redacta primero sin pulir: titular, primera frase, beneficio y llamada a la acción.",
      "Revisa que cada anuncio tenga una sola idea y no mezcle demasiadas promesas.",
      "Lee el texto en voz alta y elimina cualquier frase que suene artificial o confusa.",
    ];
  }

  if (hasAny(text, ["presupuesto", "cpa", "roas", "margen", "rentabilidad", "umbral"])) {
    return [
      "Anota precio, margen aproximado y cuánto puedes invertir sin poner en riesgo el negocio.",
      "Calcula el CPA máximo o ROAS mínimo con números prudentes, no con deseos.",
      "Guarda el umbral que usarás para decidir si mantener, pausar o ajustar.",
    ];
  }

  if (hasAny(text, ["politicas", "afirmaciones", "atributos personales", "rechazos", "version segura"])) {
    return [
      "Lee el texto como si fueras Meta revisando promesas sensibles o exageradas.",
      "Cambia frases que señalen atributos personales, salud, dinero o resultados garantizados.",
      "Guarda una versión segura que mantenga claridad sin prometer de más.",
    ];
  }

  if (hasAny(text, ["archivos", "9:16", "variantes", "recursos", "banco"])) {
    return [
      "Reúne los textos, imágenes, vídeos y nombres de anuncios en una misma carpeta.",
      "Renombra cada pieza con formato, ángulo y versión para encontrarla rápido.",
      "Comprueba que tienes suficientes variantes para lanzar sin improvisar dentro de Meta.",
    ];
  }

  if (hasAny(text, ["objetivo correcto", "campana simple", "conjunto", "publica", "estructura"])) {
    return [
      "Abre Meta Ads y crea una estructura simple: campaña, conjunto y anuncios.",
      "Configura solo lo imprescindible para no complicar el aprendizaje inicial.",
      "Antes de publicar, revisa objetivo, presupuesto, ubicación, anuncios y destino.",
    ];
  }

  if (hasAny(text, ["aprendizaje", "evita cambios", "no toques", "observaciones"])) {
    return [
      "Revisa el estado de la campaña sin cambiar presupuesto, audiencia ni anuncios.",
      "Apunta observaciones, pero no tomes decisiones por pocas horas de datos.",
      "Define cuándo volverás a revisar para evitar tocar la campaña por ansiedad.",
    ];
  }

  if (hasAny(text, ["bitacora", "documenta", "lista anuncios", "lista estructura", "hipotesis"])) {
    return [
      "Crea una nota o documento con fecha, campaña, conjunto y anuncios activos.",
      "Añade el ángulo, texto, creatividad y llamada a la acción de cada anuncio.",
      "Escribe qué esperas aprender para poder comparar después con datos reales.",
    ];
  }

  if (hasAny(text, ["ctr", "frecuencia", "comentarios", "datos", "gasto", "resultados", "conversiones", "metricas"])) {
    return [
      "Abre el panel de anuncios y mira solo las métricas necesarias para esta tarea.",
      "Compara el dato con tu objetivo o umbral, evitando conclusiones por una sola señal.",
      "Guarda una nota breve con dato, interpretación y próxima decisión posible.",
    ];
  }

  if (hasAny(text, ["pausa", "mantien", "cuello", "ganador", "diagnostico", "perdedores"])) {
    return [
      "Separa anuncios claros ganadores, dudosos y perdedores según datos, no gustos.",
      "Decide una sola acción: mantener, pausar, ajustar o preparar nueva creatividad.",
      "Anota el motivo para no repetir la misma duda en la próxima revisión.",
    ];
  }

  if (hasAny(text, ["escala", "sube", "reglas", "alerta", "ab", "variable", "duracion"])) {
    return [
      "Elige una única variable para tocar: presupuesto, gancho, formato, oferta o destino.",
      "Define cuánto durará la prueba o qué condición activará la alerta.",
      "Registra fecha, cambio realizado y criterio para evaluar si funcionó.",
    ];
  }

  if (hasAny(text, ["aprendizajes", "funciono", "fallo", "sistema semanal", "bloque semanal", "cadencia", "siguiente ciclo", "exporta resumen"])) {
    return [
      "Abre tu documento de campaña y resume lo aprendido en una frase clara.",
      "Separa lo que funcionó, lo que falló y lo que probarás después.",
      "Guarda la próxima acción con fecha para convertir el aprendizaje en rutina.",
    ];
  }

  return [
    "Abre tu documento de campaña y localiza la sección de esta tarea.",
    `Completa la acción usando datos reales de tu negocio: ${helper}`,
    "Guarda una evidencia breve antes de marcar la tarea como completada.",
  ];
}

function buildTaskDeliverable(itemTitle: string) {
  return `Deja guardado el resultado de "${itemTitle}" en tus notas o documento de campaña.`;
}

function normalizeForGuide(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasAny(value: string, patterns: string[]) {
  return patterns.some((pattern) => value.includes(normalizeForGuide(pattern)));
}
