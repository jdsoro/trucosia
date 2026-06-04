import { Lock } from "lucide-react";
import type { DayLesson } from "../../types/planner";
import { SectionHead } from "../ui/SectionHead";

type NextLessonsProps = {
  currentDay: number;
  lessons: DayLesson[];
  onOpenLesson: (day: number) => void;
};

export function NextLessons({ currentDay, lessons, onOpenLesson }: NextLessonsProps) {
  return (
    <section className="up-next">
      <SectionHead
        compact
        title="Siguiente"
        aside={<button type="button" onClick={() => onOpenLesson(Math.min(30, currentDay + 1))}>Ver calendario</button>}
      />
      {lessons.map((item) => (
        <button className="next-row" key={item.day} type="button" onClick={() => onOpenLesson(item.day)}>
          <Lock size={15} />
          <span>Día {item.day}: {item.title}</span>
        </button>
      ))}
    </section>
  );
}
