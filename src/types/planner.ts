export type TabId = "today" | "calendar" | "strategy" | "profile";

export type BusinessType = "infoproduct" | "ecommerce" | "local" | "creator";

export type Goal = "ventas" | "leads" | "mensajes";

export type PhaseId = 1 | 2 | 3 | 4;

export type LessonVisual = "desk" | "creative" | "metrics";

export type ChecklistItem = {
  id: string;
  title: string;
  helper: string;
  steps: string[];
  deliverable: string;
};

export type LessonResource = {
  title: string;
  description: string;
  action: "copyPrompt" | "copyActionPlan";
};

export type DayLesson = {
  day: number;
  phase: PhaseId;
  title: string;
  subtitle: string;
  duration: number;
  objective: string;
  visual: LessonVisual;
  checklist: ChecklistItem[];
  resources: LessonResource[];
  prompt: string;
};

export type CampaignProfile = {
  brand: string;
  offer: string;
  audience: string;
  businessType: BusinessType;
  goal: Goal;
  budget: string;
  cpaLimit: string;
  roasTarget: string;
  pixelReady: boolean;
  launchDate: string;
};

export type AppState = {
  activeTab: TabId;
  selectedDay: number;
  completedTaskIds: string[];
  completedDays: number[];
  notes: Record<number, string>;
  profile: CampaignProfile;
};

export type Phase = {
  id: PhaseId;
  label: string;
  title: string;
  range: string;
  focus: string;
};

export type BusinessStrategy = {
  label: string;
  strategy: string;
  emphasis: string[];
};

export type ProgressSummary = {
  totalTasks: number;
  completedTasks: number;
  completedDays: number;
  percent: number;
  todayDone: number;
  todayTotal: number;
  streak: number;
};
