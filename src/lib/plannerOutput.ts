import { businessConfig, goalLabels, lessons } from "../data/plannerData";
import type { AppState, CampaignProfile, DayLesson, ProgressSummary } from "../types/planner";

export function buildPrompt(lessonItem: DayLesson, profile: CampaignProfile) {
  return [
    "Actúa como mentor senior de Meta Ads para principiantes.",
    "",
    `Negocio: ${profile.brand}`,
    `Tipo: ${businessConfig[profile.businessType].label}`,
    `Objetivo: ${goalLabels[profile.goal]}`,
    `Oferta: ${profile.offer}`,
    `Audiencia: ${profile.audience}`,
    `Presupuesto diario: ${profile.budget} EUR`,
    `CPA máximo: ${profile.cpaLimit}`,
    `ROAS mínimo: ${profile.roasTarget}`,
    "",
    `Estoy en el Día ${lessonItem.day}: ${lessonItem.title}.`,
    `Objetivo del día: ${lessonItem.objective}`,
    "",
    "Dame una guía accionable para completar esta tarea hoy con:",
    "1. Pasos en orden.",
    "2. Errores comunes que debo evitar.",
    "3. Resultado final que debería guardar.",
    "4. Versión corta para revisar en el móvil.",
  ].join("\n");
}

export function buildDailyActionPlan(lessonItem: DayLesson) {
  const lines = [
    `# Día ${lessonItem.day}: ${lessonItem.title}`,
    "",
    `Objetivo: ${lessonItem.objective}`,
    "",
    "## Tareas del día",
  ];

  lessonItem.checklist.forEach((item, index) => {
    lines.push("", `${index + 1}. ${item.title}`, item.helper, "", "Plan de acción:");
    item.steps.forEach((step, stepIndex) => {
      lines.push(`${stepIndex + 1}. ${step}`);
    });
    lines.push(`Resultado esperado: ${item.deliverable}`);
  });

  return lines.join("\n");
}

export function buildExport(state: AppState, progress: ProgressSummary) {
  const lines = [
    "# Planificador Meta Ads 30 Días",
    "",
    `Marca: ${state.profile.brand}`,
    `Oferta: ${state.profile.offer}`,
    `Audiencia: ${state.profile.audience}`,
    `Objetivo: ${goalLabels[state.profile.goal]}`,
    `Progreso: ${progress.percent}% (${progress.completedTasks}/${progress.totalTasks} tareas)`,
    "",
    "## Estrategia",
    businessConfig[state.profile.businessType].strategy,
    "",
    "## Plan diario",
  ];

  lessons.forEach((lessonItem) => {
    lines.push("", `### Día ${lessonItem.day}: ${lessonItem.title}`, lessonItem.objective);
    lessonItem.checklist.forEach((item) => {
      lines.push(`- [${state.completedTaskIds.includes(item.id) ? "x" : " "}] ${item.title}: ${item.helper}`);
      item.steps.forEach((step) => {
        lines.push(`  - ${step}`);
      });
      lines.push(`  - Resultado: ${item.deliverable}`);
    });

    const note = state.notes[lessonItem.day]?.trim();
    if (note) lines.push(`Nota: ${note}`);
  });

  return lines.join("\n");
}

export async function copyText(text: string): Promise<boolean> {
  if (!text.trim()) return false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopy(text);
    }
  }

  return fallbackCopy(text);
}

export function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function fallbackCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-999px";
  document.body.appendChild(textarea);
  textarea.select();

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  textarea.remove();
  return ok;
}
