import { Check } from "lucide-react";
import type { ChecklistItem } from "../../types/planner";

type TaskListProps = {
  items: ChecklistItem[];
  completedTaskIds: string[];
  onToggleTask: (taskId: string) => void;
};

export function TaskList({ items, completedTaskIds, onToggleTask }: TaskListProps) {
  return (
    <div className="task-list">
      {items.map((item) => {
        const checked = completedTaskIds.includes(item.id);
        return (
          <article
            className={`task-item ${checked ? "is-done" : ""}`}
            key={item.id}
          >
            <button
              className="task-check"
              type="button"
              aria-label={checked ? `Marcar ${item.title} como pendiente` : `Marcar ${item.title} como completada`}
              aria-pressed={checked}
              onClick={() => onToggleTask(item.id)}
            >
              {checked ? <Check size={16} /> : null}
            </button>
            <div className="task-content">
              <div className="task-copy">
                <strong>{item.title}</strong>
                <small>{item.helper}</small>
              </div>
              <div className="task-action-plan">
                <span>Plan de acción</span>
                <ol>
                  {item.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p><b>Resultado:</b> {item.deliverable}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
