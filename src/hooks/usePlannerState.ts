import { useEffect, useMemo, useState } from "react";
import { businessConfig, initialState, lessons, phaseList } from "../data/plannerData";
import { buildDailyActionPlan, buildPrompt, buildExport, copyText, downloadFile } from "../lib/plannerOutput";
import { buildProgress } from "../lib/progress";
import { loadState, saveState } from "../lib/storage";
import type { AppState, CampaignProfile, TabId } from "../types/planner";

export function usePlannerState() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [toast, setToast] = useState("");

  const selectedLesson = lessons.find((lessonItem) => lessonItem.day === state.selectedDay) ?? lessons[0];
  const progress = useMemo(() => buildProgress(state), [state]);
  const currentPhase = phaseList.find((phase) => phase.id === selectedLesson.phase) ?? phaseList[0];
  const nextLessons = lessons.filter((lessonItem) => lessonItem.day > state.selectedDay).slice(0, 2);
  const strategy = businessConfig[state.profile.businessType];

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function patchProfile(patch: Partial<CampaignProfile>) {
    setState((current) => ({ ...current, profile: { ...current.profile, ...patch } }));
  }

  function setTab(activeTab: TabId) {
    setState((current) => ({ ...current, activeTab }));
  }

  function openLesson(day: number) {
    setState((current) => ({ ...current, selectedDay: day, activeTab: "today" }));
  }

  function toggleTask(taskId: string) {
    setState((current) => {
      const exists = current.completedTaskIds.includes(taskId);
      const completedTaskIds = exists
        ? current.completedTaskIds.filter((id) => id !== taskId)
        : [...current.completedTaskIds, taskId];

      return { ...current, completedTaskIds };
    });
  }

  function completeDay(day: number) {
    const lessonItem = lessons.find((item) => item.day === day);
    if (!lessonItem) return;

    setState((current) => {
      const taskIds = lessonItem.checklist.map((item) => item.id);
      return {
        ...current,
        completedTaskIds: Array.from(new Set([...current.completedTaskIds, ...taskIds])),
        completedDays: Array.from(new Set([...current.completedDays, day])),
        selectedDay: Math.min(30, day + 1),
      };
    });

    showToast(day === 30 ? "Plan completado" : `Día ${day} completado`);
  }

  function updateNote(day: number, note: string) {
    setState((current) => ({ ...current, notes: { ...current.notes, [day]: note } }));
  }

  function resetAll() {
    if (!window.confirm("¿Reiniciar la estrategia desde cero y borrar progreso, notas y perfil local?")) return;
    setState(initialState);
    showToast("Estrategia reiniciada");
  }

  async function copyPrompt() {
    const copied = await copyText(buildPrompt(selectedLesson, state.profile));
    showToast(copied ? "Instrucción IA copiada" : "No se pudo copiar");
  }

  async function copyDailyPlan() {
    const copied = await copyText(buildDailyActionPlan(selectedLesson));
    showToast(copied ? "Plan de acción copiado" : "No se pudo copiar");
  }

  function exportMarkdown() {
    downloadFile("planificador-meta-ads-30-dias.md", buildExport(state, progress), "text/markdown");
    showToast("Plan exportado");
  }

  function printPdf() {
    window.print();
  }

  function showToast(message: string) {
    setToast(message);
  }

  return {
    state,
    toast,
    selectedLesson,
    progress,
    currentPhase,
    nextLessons,
    strategy,
    actions: {
      patchProfile,
      setTab,
      openLesson,
      toggleTask,
      completeDay,
      updateNote,
      resetAll,
      copyPrompt,
      copyDailyPlan,
      exportMarkdown,
      printPdf,
    },
  };
}
