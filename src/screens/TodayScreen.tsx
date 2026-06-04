import { ChevronRight, Sparkles, Target, Timer, Trophy } from "lucide-react";
import { useRef } from "react";
import { heroImages } from "../data/plannerData";
import type { DayLesson, Phase, ProgressSummary } from "../types/planner";
import { LessonResources } from "../components/planner/LessonResources";
import { NextLessons } from "../components/planner/NextLessons";
import { TaskList } from "../components/planner/TaskList";
import { ActionButton } from "../components/ui/ActionButton";
import { MiniStat } from "../components/ui/MiniStat";
import { ProgressRing } from "../components/ui/ProgressRing";
import { SectionHead } from "../components/ui/SectionHead";

type TodayScreenProps = {
  lesson: DayLesson;
  progress: ProgressSummary;
  currentPhase: Phase;
  nextLessons: DayLesson[];
  completedTaskIds: string[];
  completedDays: number[];
  note: string;
  onToggleTask: (taskId: string) => void;
  onCompleteDay: (day: number) => void;
  onNoteChange: (value: string) => void;
  onCopyActionPlan: () => void;
  onOpenLesson: (day: number) => void;
  onCopyPrompt: () => void;
};

export function TodayScreen({
  lesson,
  progress,
  currentPhase,
  nextLessons,
  completedTaskIds,
  completedDays,
  note,
  onToggleTask,
  onCompleteDay,
  onNoteChange,
  onCopyActionPlan,
  onOpenLesson,
  onCopyPrompt,
}: TodayScreenProps) {
  const detailRef = useRef<HTMLElement>(null);
  const completedLessonTasks = lesson.checklist.filter((item) => completedTaskIds.includes(item.id)).length;

  function continueToDailyDetail() {
    const detail = detailRef.current;
    const scroller = detail?.closest(".screen-scroll") as HTMLElement | null;
    if (!detail || !scroller) return;

    const detailBox = detail.getBoundingClientRect();
    const scrollerBox = scroller.getBoundingClientRect();
    const nextScrollTop = scroller.scrollTop + detailBox.top - scrollerBox.top - 8;

    scroller.scrollTo({ top: Math.max(0, nextScrollTop), behavior: "auto" });
    detail.focus({ preventScroll: true });
  }

  return (
    <div className="screen-flow">
      <section className="progress-card">
        <ProgressRing value={progress.percent} />
        <h2>{progress.percent === 0 ? "Empieza con estructura" : "Sigue avanzando"}</h2>
        <p>{progress.todayDone} de {progress.todayTotal} tareas completadas hoy</p>
      </section>

      <div className="mini-stat-grid">
        <MiniStat icon={<Trophy size={16} />} label="Racha actual" value={`${progress.streak} días`} />
        <MiniStat icon={<Target size={16} />} label="Avance total" value={`${progress.completedDays}/30`} />
      </div>

      <button className="active-course-card" type="button" aria-controls="detalle-dia" onClick={continueToDailyDetail}>
        <span className="status-pill">Activo</span>
        <p>{currentPhase.label}: {currentPhase.title}</p>
        <h2>Día {lesson.day}: {lesson.title}</h2>
        <span>{lesson.subtitle}</span>
        <span className="course-cta">
          Continuar plan
          <ChevronRight size={17} />
        </span>
      </button>

      <section className="detail-card" id="detalle-dia" ref={detailRef} tabIndex={-1}>
        <SectionHead
          caption={`Semana ${lesson.phase} - Fase de ejecución`}
          title={`Día ${lesson.day}: ${lesson.title}`}
          aside={
            <span className="time-pill">
              <Timer size={13} />
              {lesson.duration} min est.
            </span>
          }
        />
        <img className="lesson-image" src={heroImages[lesson.visual]} alt="" />
        <p className="lesson-objective">{lesson.objective}</p>

        <div className="checklist-head">
          <span>Lista de tareas</span>
          <strong>
            {completedLessonTasks}/{lesson.checklist.length} completadas
          </strong>
        </div>

        <TaskList items={lesson.checklist} completedTaskIds={completedTaskIds} onToggleTask={onToggleTask} />

        <label className="notes-box">
          <span>Notas rápidas</span>
          <textarea value={note} onChange={(event) => onNoteChange(event.target.value)} placeholder="Escribe tus ideas aquí..." />
          <small>Guardado en este navegador</small>
        </label>

        <LessonResources resources={lesson.resources} onCopyActionPlan={onCopyActionPlan} onCopyPrompt={onCopyPrompt} />

        <ActionButton icon={<Sparkles size={17} />} onClick={() => onCompleteDay(lesson.day)}>
          {completedDays.includes(lesson.day) ? "Día completado" : "Completar día"}
        </ActionButton>
      </section>

      <NextLessons currentDay={lesson.day} lessons={nextLessons} onOpenLesson={onOpenLesson} />
    </div>
  );
}
