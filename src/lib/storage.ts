import { initialState, storageKey } from "../data/plannerData";
import { clamp } from "./number";
import type { AppState } from "../types/planner";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return initialState;

    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      ...initialState,
      ...parsed,
      activeTab: parsed.activeTab ?? initialState.activeTab,
      selectedDay: clamp(Number(parsed.selectedDay ?? 1), 1, 30),
      completedTaskIds: Array.isArray(parsed.completedTaskIds) ? parsed.completedTaskIds : [],
      completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
      notes: parsed.notes && typeof parsed.notes === "object" ? parsed.notes : {},
      profile: { ...initialState.profile, ...parsed.profile },
    };
  } catch {
    return initialState;
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(storageKey, JSON.stringify(state));
}
