import { lessons, phaseList } from "../data/plannerData";
import { PhaseTimeline } from "../components/planner/PhaseTimeline";

type CalendarScreenProps = {
  selectedDay: number;
  completedDays: number[];
  completedTaskIds: string[];
  onOpenLesson: (day: number) => void;
};

export function CalendarScreen({ selectedDay, completedDays, completedTaskIds, onOpenLesson }: CalendarScreenProps) {
  return (
    <div className="screen-flow">
      <div className="week-tabs">
        {phaseList.map((phase) => (
          <button className={lessons[selectedDay - 1]?.phase === phase.id ? "is-active" : ""} key={phase.id} type="button">
            Semana {phase.id}: {phase.title}
          </button>
        ))}
      </div>

      {phaseList.map((phase) => (
        <PhaseTimeline
          completedDays={completedDays}
          completedTaskIds={completedTaskIds}
          key={phase.id}
          lessons={lessons.filter((lessonItem) => lessonItem.phase === phase.id)}
          onOpenLesson={onOpenLesson}
          phase={phase}
          selectedDay={selectedDay}
        />
      ))}
    </div>
  );
}
