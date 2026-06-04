import { BookOpen, ClipboardList } from "lucide-react";
import type { LessonResource } from "../../types/planner";

type LessonResourcesProps = {
  resources: LessonResource[];
  onCopyActionPlan: () => void;
  onCopyPrompt: () => void;
};

export function LessonResources({ resources, onCopyActionPlan, onCopyPrompt }: LessonResourcesProps) {
  function runResourceAction(action: LessonResource["action"]) {
    if (action === "copyPrompt") onCopyPrompt();
    if (action === "copyActionPlan") onCopyActionPlan();
  }

  return (
    <div className="resource-grid">
      {resources.map((resource) => (
        <button key={resource.title} className="resource-card" type="button" onClick={() => runResourceAction(resource.action)}>
          {resource.action === "copyPrompt" ? <BookOpen size={16} /> : <ClipboardList size={16} />}
          <strong>{resource.title}</strong>
          <span>{resource.description}</span>
        </button>
      ))}
    </div>
  );
}
