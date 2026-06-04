import { lessons } from "../data/plannerData";
import type { AppState, ProgressSummary } from "../types/planner";

export function buildProgress(state: AppState): ProgressSummary {
  const totalTasks = lessons.reduce((sum, lessonItem) => sum + lessonItem.checklist.length, 0);
  const completedTasks = state.completedTaskIds.length;
  const selectedLesson = lessons.find((lessonItem) => lessonItem.day === state.selectedDay) ?? lessons[0];
  const todayDone = selectedLesson.checklist.filter((item) => state.completedTaskIds.includes(item.id)).length;
  const completedDays = state.completedDays.length;
  const streak = calculateStreak(state.completedDays);

  return {
    totalTasks,
    completedTasks,
    completedDays,
    percent: Math.round((completedTasks / totalTasks) * 100),
    todayDone,
    todayTotal: selectedLesson.checklist.length,
    streak,
  };
}

function calculateStreak(days: number[]) {
  if (!days.length) return 0;

  const sorted = Array.from(new Set(days)).sort((a, b) => a - b);
  let streak = 1;

  for (let index = sorted.length - 1; index > 0; index -= 1) {
    if (sorted[index] - sorted[index - 1] === 1) streak += 1;
    else break;
  }

  return streak;
}
