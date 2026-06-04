import { Check, Lock } from "lucide-react";
import type { DayLesson, Phase } from "../../types/planner";

type PhaseTimelineProps = {
  phase: Phase;
  lessons: DayLesson[];
  selectedDay: number;
  completedDays: number[];
  completedTaskIds: string[];
  onOpenLesson: (day: number) => void;
};

export function PhaseTimeline({ phase, lessons, selectedDay, completedDays, completedTaskIds, onOpenLesson }: PhaseTimelineProps) {
  const phaseTasks = lessons.flatMap((lessonItem) => lessonItem.checklist);
  const phaseProgress = Math.round((phaseTasks.filter((item) => completedTaskIds.includes(item.id)).length / phaseTasks.length) * 100);

  return (
    <section className="phase-section">
      <div className="phase-banner">
        <span>{phase.label}</span>
        <h2>Semana {phase.id}: {phase.title}</h2>
        <p>{phase.focus}</p>
        <div><b style={{ width: `${phaseProgress}%` }} /></div>
        <small>{phaseProgress}% completo</small>
      </div>
      <div className="timeline-list">
        {lessons.map((lessonItem) => {
          const done = completedDays.includes(lessonItem.day);
          const active = selectedDay === lessonItem.day;
          const locked = lessonItem.day > Math.max(selectedDay, ...completedDays, 1) + 1;

          return (
            <button
              className={`timeline-item ${done ? "is-done" : ""} ${active ? "is-active" : ""} ${locked ? "is-locked" : ""}`}
              key={lessonItem.day}
              type="button"
              onClick={() => onOpenLesson(lessonItem.day)}
            >
              <span>{done ? <Check size={16} /> : locked ? <Lock size={15} /> : lessonItem.day}</span>
              <div>
                <strong>Día {lessonItem.day}</strong>
                <p>{lessonItem.title}</p>
              </div>
              <small>{lessonItem.duration} min</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
