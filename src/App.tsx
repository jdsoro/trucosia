import {
  Bookmark,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Clock,
  Copy,
  Download,
  Filter,
  Home,
  RefreshCcw,
  Rocket,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useMemo, useState } from "react";
import { categories, getCategory, normalizeText, tricks, type CategoryId, type Trick } from "./data/tricks";

type GoalId =
  | "rapidez"
  | "mejor-prompt"
  | "estudiar"
  | "contenido"
  | "trabajo"
  | "automatizar"
  | "visual"
  | "vida";

type CategoryFilter = CategoryId | "all";
type ViewId = "inicio" | "explorar" | "detalle";

type AppState = {
  goalId: GoalId;
  timeBudget: number;
  caseText: string;
  search: string;
  category: CategoryFilter;
  activeTrickId: string;
  favorites: string[];
  completed: string[];
};

type GoalDefinition = {
  id: GoalId;
  label: string;
  detail: string;
  categories: CategoryId[];
  tagHints: string[];
};

const storageKey = "ia-express-selector:v1";

const goals: GoalDefinition[] = [
  {
    id: "rapidez",
    label: "Ahorrar tiempo",
    detail: "Resolver sin rodeos",
    categories: ["herramientas", "dictado", "trabajo", "delegar"],
    tagHints: ["ahorro", "resumir", "email", "datos"],
  },
  {
    id: "mejor-prompt",
    label: "Pedir mejor",
    detail: "Prompts mas claros",
    categories: ["prompts", "herramientas", "secretos"],
    tagHints: ["prompts", "claridad", "decisiones"],
  },
  {
    id: "estudiar",
    label: "Aprender",
    detail: "Notas, examenes y repaso",
    categories: ["aprendizaje", "prompts", "delegar"],
    tagHints: ["estudiar", "resumir", "investigar"],
  },
  {
    id: "contenido",
    label: "Crear contenido",
    detail: "Ideas, guiones y piezas",
    categories: ["contenido", "visual", "prompts"],
    tagHints: ["contenido", "video", "imagenes"],
  },
  {
    id: "trabajo",
    label: "Trabajo",
    detail: "Reuniones, informes y oficina",
    categories: ["trabajo", "delegar", "dictado"],
    tagHints: ["trabajo", "email", "datos"],
  },
  {
    id: "automatizar",
    label: "Automatizar",
    detail: "Sistemas y contexto",
    categories: ["secretos", "delegar", "vida"],
    tagHints: ["automatizacion", "automatizar", "gmail", "drive"],
  },
  {
    id: "visual",
    label: "Visual",
    detail: "Imagen, video y diseno",
    categories: ["visual", "contenido", "herramientas"],
    tagHints: ["imagenes", "video", "creacion"],
  },
  {
    id: "vida",
    label: "Vida personal",
    detail: "Planes y decisiones",
    categories: ["vida", "prompts", "herramientas"],
    tagHints: ["coach", "viaje", "decisiones"],
  },
];

const timeOptions = [5, 15, 30, 60];
const searchStopWords = new Set([
  "ahi",
  "algo",
  "como",
  "con",
  "del",
  "eso",
  "esta",
  "este",
  "hacer",
  "hoy",
  "las",
  "los",
  "mas",
  "mis",
  "necesito",
  "para",
  "pero",
  "por",
  "que",
  "quiero",
  "sin",
  "sus",
  "tus",
  "una",
  "uno",
  "unos",
  "usar",
]);

const initialState: AppState = {
  goalId: "rapidez",
  timeBudget: 15,
  caseText: "",
  search: "",
  category: "all",
  activeTrickId: "truco-1",
  favorites: [],
  completed: [],
};

function App() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [activeView, setActiveView] = useState<ViewId>("inicio");
  const [toast, setToast] = useState("");

  const activeGoal = goals.find((goal) => goal.id === state.goalId) ?? goals[0];

  const scoredTricks = useMemo(
    () =>
      tricks
        .map((trick) => ({ trick, score: scoreTrick(trick, state, activeGoal) }))
        .sort((a, b) => b.score - a.score || a.trick.estimatedMinutes - b.trick.estimatedMinutes),
    [activeGoal, state],
  );

  const recommendations = scoredTricks.slice(0, 3);
  const activeTrick =
    tricks.find((trick) => trick.id === state.activeTrickId) ?? recommendations[0]?.trick ?? tricks[0];
  const activeCategory = getCategory(activeTrick.categoryId);
  const activeScore = scoredTricks.find((item) => item.trick.id === activeTrick.id)?.score ?? recommendations[0]?.score ?? 0;

  const visibleTricks = useMemo(() => {
    const filtered = filterTricks(state);
    if (!normalizeText(state.search)) return filtered;

    return [...filtered].sort((a, b) => scoreTrick(b, state, activeGoal) - scoreTrick(a, state, activeGoal));
  }, [activeGoal, state]);
  const completionPercent = Math.round((state.completed.length / tricks.length) * 100);
  const activePrompt = personalizePrompt(activeTrick, state.caseText);
  const planExport = buildPlanExport(state, recommendations.map((item) => item.trick), activeTrick, activePrompt);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function patchState(patch: Partial<AppState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function patchDecision(patch: Partial<AppState>) {
    setState((current) => {
      const next = { ...current, ...patch };
      return { ...next, activeTrickId: getTopTrick(next).id };
    });
  }

  function showToast(message: string) {
    setToast(message);
  }

  function selectTrick(trickId: string) {
    patchState({ activeTrickId: trickId });
    setActiveView("detalle");
  }

  function confirmSearch() {
    setState((current) => {
      const next = {
        ...current,
        category: "all" as CategoryFilter,
        search: current.caseText.trim(),
      };

      return { ...next, activeTrickId: getTopTrick(next).id };
    });
    setActiveView("explorar");
  }

  function toggleFavorite(trickId: string) {
    setState((current) => ({ ...current, favorites: toggleItem(current.favorites, trickId) }));
  }

  function toggleCompleted(trickId: string) {
    setState((current) => ({ ...current, completed: toggleItem(current.completed, trickId) }));
  }

  async function copyActivePrompt() {
    const copied = await copyText(activePrompt);
    if (copied) {
      showToast("Prompt copiado");
      return;
    }

    selectVisiblePrompt();
    showToast("Prompt seleccionado");
  }

  async function copyPlan() {
    const copied = await copyText(planExport);
    showToast(copied ? "Plan copiado" : "No se pudo copiar");
  }

  function downloadPlan() {
    downloadFile("ia-express-plan.md", planExport, "text/markdown");
    showToast("Plan descargado");
  }

  function resetProgress() {
    const confirmed = window.confirm("Borrar progreso, favoritos y filtros?");
    if (!confirmed) return;
    setState(initialState);
    showToast("Progreso reiniciado");
  }

  return (
    <main className={`app-shell view-${activeView}`}>
      <header className="app-header">
        <div className="brand-block">
          <span className="brand-icon" aria-hidden="true">
            <Sparkles size={24} />
          </span>
          <div>
            <p>100 trucos de IA</p>
            <h1>AI Express</h1>
            <span>Tu cockpit para aplicar IA sin perder tiempo.</span>
          </div>
        </div>
        <div className="header-actions">
          <span className="system-pill">
            <Wand2 size={16} />
            Companion premium
          </span>
          <button className="icon-text-button" onClick={downloadPlan}>
            <Download size={18} />
            Exportar
          </button>
          <button className="icon-button" onClick={resetProgress} aria-label="Reiniciar progreso" title="Reiniciar">
            <RefreshCcw size={19} />
          </button>
        </div>
      </header>

      <nav className="view-switcher" aria-label="Vistas de la app">
        <button className={activeView === "inicio" ? "is-active" : ""} onClick={() => setActiveView("inicio")}>
          <Home size={18} />
          Inicio
        </button>
        <button className={activeView === "explorar" ? "is-active" : ""} onClick={() => setActiveView("explorar")}>
          <Search size={18} />
          Explorar
        </button>
        <button className={activeView === "detalle" ? "is-active" : ""} onClick={() => setActiveView("detalle")}>
          <ClipboardList size={18} />
          Detalle
        </button>
      </nav>

      <section className="command-board" aria-label="Resumen de uso">
        <div className="mission-copy">
          <div>
            <p>Ruta de hoy</p>
            <h2>{activeGoal.label}</h2>
            <span>{state.caseText.trim() || "Configura tu objetivo y recibe el siguiente truco listo para ejecutar."}</span>
          </div>
          <div
            className="progress-orb"
            style={{ "--progress": completionPercent } as CSSProperties}
            aria-label={`${completionPercent}% completado`}
          >
            <strong>{completionPercent}%</strong>
            <span>completado</span>
          </div>
        </div>
        <div className="priority-card" style={{ "--accent": activeCategory.accent } as CSSProperties}>
          <span className="priority-kicker">
            <Target size={16} />
            Mejor candidato
          </span>
          <h3>#{activeTrick.number} {activeTrick.title}</h3>
          <div className="priority-meta">
            <strong>{formatScore(activeScore)}% encaje</strong>
            <span>{activeTrick.estimatedMinutes} min</span>
            <span>{activeCategory.short}</span>
          </div>
        </div>
        <div className="metric-stack">
          <Metric label="Trucos" value={String(tricks.length)} detail="catalogados" />
          <Metric label="Completados" value={`${completionPercent}%`} detail={`${state.completed.length} hechos`} />
          <Metric label="Favoritos" value={String(state.favorites.length)} detail="guardados" />
        </div>
      </section>

      <div className="workspace-grid">
        <section id="selector" className="tool-panel selector-panel" aria-label="Selector de trucos">
          <PanelHeader
            icon={<Target size={20} />}
            eyebrow="Diagnostico rapido"
            title="Elige el objetivo"
            action={
              <span className="result-pill">
                <Clock size={15} />
                {state.timeBudget} min
              </span>
            }
          />

          <div className="selector-intro">
            <strong>1. Define el contexto</strong>
            <span>Objetivo, tiempo y caso real son suficientes para priorizar el catalogo.</span>
          </div>

          <div className="goal-grid">
            {goals.map((goal) => (
              <button
                key={goal.id}
                className={state.goalId === goal.id ? "goal-card is-active" : "goal-card"}
                onClick={() => patchDecision({ goalId: goal.id })}
              >
                <strong>{goal.label}</strong>
                <span>{goal.detail}</span>
              </button>
            ))}
          </div>

          <div className="time-tabs" aria-label="Tiempo disponible">
            {timeOptions.map((minutes) => (
              <button
                key={minutes}
                className={state.timeBudget === minutes ? "is-active" : ""}
                onClick={() => patchDecision({ timeBudget: minutes })}
              >
                {minutes} min
              </button>
            ))}
          </div>

          <label className="field-block" htmlFor="case-text">
            <span>Caso de hoy</span>
            <textarea
              id="case-text"
              value={state.caseText}
              placeholder="Ej: necesito resumir un PDF, crear contenido para Instagram o preparar una reunion."
              onChange={(event) => patchDecision({ caseText: event.target.value })}
              rows={4}
            />
          </label>

          <button
            className="confirm-action"
            onClick={confirmSearch}
          >
            <Search size={18} />
            Confirmar y buscar trucos
          </button>
        </section>

        <section id="recommend" className="tool-panel recommendations-panel" aria-label="Recomendaciones">
          <PanelHeader
            icon={<ClipboardList size={20} />}
            eyebrow="Top 3"
            title="Ruta recomendada"
            action={
              <button className="mini-button" onClick={copyPlan}>
                <Copy size={15} />
                Copiar plan
              </button>
            }
          />

          <div className="recommendation-list">
            {recommendations.map(({ trick, score }, index) => (
              <TrickCard
                key={trick.id}
                trick={trick}
                rank={index + 1}
                score={score}
                isActive={activeTrick.id === trick.id}
                isFavorite={state.favorites.includes(trick.id)}
                isCompleted={state.completed.includes(trick.id)}
                onSelect={() => selectTrick(trick.id)}
                onToggleFavorite={() => toggleFavorite(trick.id)}
                onToggleCompleted={() => toggleCompleted(trick.id)}
              />
            ))}
          </div>
        </section>

        <section id="library" className="tool-panel library-panel" aria-label="Biblioteca de trucos">
          <PanelHeader
            icon={<Boxes size={20} />}
            eyebrow="Biblioteca"
            title={`${visibleTricks.length} trucos`}
            action={
              <span className="result-pill">
                <Filter size={15} />
                {state.category === "all" ? "Todos" : getCategory(state.category).short}
              </span>
            }
          />

          <div className="search-row">
            <label className="search-box" htmlFor="trick-search">
              <Search size={18} />
              <input
                id="trick-search"
                value={state.search}
                placeholder="Buscar por tarea, herramienta o resultado"
                onChange={(event) => patchState({ search: event.target.value })}
              />
            </label>
          </div>

          <div className="category-scroll" aria-label="Categorias">
            <button className={state.category === "all" ? "category-chip is-active" : "category-chip"} onClick={() => patchState({ category: "all" })}>
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={state.category === category.id ? "category-chip is-active" : "category-chip"}
                style={{ "--accent": category.accent } as CSSProperties}
                onClick={() => patchState({ category: category.id })}
              >
                {category.short}
              </button>
            ))}
          </div>

          <div className="trick-list">
            {visibleTricks.map((trick) => (
              <LibraryRow
                key={trick.id}
                trick={trick}
                isActive={activeTrick.id === trick.id}
                isFavorite={state.favorites.includes(trick.id)}
                isCompleted={state.completed.includes(trick.id)}
                onSelect={() => selectTrick(trick.id)}
                onToggleFavorite={() => toggleFavorite(trick.id)}
                onToggleCompleted={() => toggleCompleted(trick.id)}
              />
            ))}
          </div>
        </section>

        <aside id="detail" className="tool-panel detail-panel" aria-label="Truco activo">
          <div className="detail-head" style={{ "--accent": activeCategory.accent } as CSSProperties}>
            <div>
              <p>{activeCategory.label}</p>
              <h2>#{activeTrick.number} {activeTrick.title}</h2>
            </div>
            <span>{formatScore(activeScore)}%</span>
          </div>

          <div className="detail-actions">
            <button className="primary-action" onClick={copyActivePrompt}>
              <Copy size={18} />
              Copiar prompt
            </button>
            <button
              className={state.completed.includes(activeTrick.id) ? "state-button is-done" : "state-button"}
              onClick={() => toggleCompleted(activeTrick.id)}
            >
              <CheckCircle2 size={18} />
              {state.completed.includes(activeTrick.id) ? "Hecho" : "Marcar"}
            </button>
            <button
              className={state.favorites.includes(activeTrick.id) ? "state-button is-favorite" : "state-button"}
              onClick={() => toggleFavorite(activeTrick.id)}
            >
              <Star size={18} />
              {state.favorites.includes(activeTrick.id) ? "Favorito" : "Guardar"}
            </button>
          </div>

          <section className="detail-section">
            <h3>Accion</h3>
            <p>{activeTrick.action}</p>
          </section>

          <section className="detail-section detail-grid">
            <div>
              <h3>Tiempo</h3>
              <p>{activeTrick.estimatedMinutes} minutos de aplicacion.</p>
            </div>
            <div>
              <h3>Dificultad</h3>
              <p>{activeTrick.difficulty}</p>
            </div>
          </section>

          <section className="detail-section">
            <h3>Herramientas</h3>
            <div className="tool-tags">
              {activeTrick.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h3>Prompt</h3>
            <textarea className="prompt-preview" value={activePrompt} readOnly aria-label="Prompt recomendado" data-prompt-preview />
          </section>

          <section className="detail-section">
            <h3>Checklist</h3>
            <div className="checklist-stack">
              {activeTrick.checklist.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={17} />
                  {item}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <nav className="bottom-nav" aria-label="Navegacion principal">
        <button className={activeView === "inicio" ? "is-active" : ""} onClick={() => setActiveView("inicio")}>
          <Home size={18} />
          Inicio
        </button>
        <button className={activeView === "explorar" ? "is-active" : ""} onClick={() => setActiveView("explorar")}>
          <TrendingUp size={18} />
          Explorar
        </button>
        <button className={activeView === "detalle" ? "is-active" : ""} onClick={() => setActiveView("detalle")}>
          <Rocket size={18} />
          Detalle
        </button>
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </div>
  );
}

function PanelHeader({
  icon,
  eyebrow,
  title,
  action,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="panel-header">
      <span className="panel-icon" aria-hidden="true">
        {icon}
      </span>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {action && <div className="panel-action">{action}</div>}
    </div>
  );
}

function TrickCard({
  trick,
  rank,
  score,
  isActive,
  isFavorite,
  isCompleted,
  onSelect,
  onToggleFavorite,
  onToggleCompleted,
}: {
  trick: Trick;
  rank: number;
  score: number;
  isActive: boolean;
  isFavorite: boolean;
  isCompleted: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onToggleCompleted: () => void;
}) {
  const category = getCategory(trick.categoryId);

  return (
    <article className={isActive ? "trick-card is-active" : "trick-card"} style={{ "--accent": category.accent } as CSSProperties}>
      <button className="trick-visual" onClick={onSelect} aria-label={`Abrir truco ${trick.number}`}>
        <span />
      </button>
      <button className="trick-card-main" onClick={onSelect}>
        <span className="rank-badge">{rank}</span>
        <div>
          <p>{category.short} / {trick.estimatedMinutes} min</p>
          <h3>#{trick.number} {trick.title}</h3>
          <small>{trick.tools.slice(0, 3).join(" / ")}</small>
        </div>
        <strong>{formatScore(score)}%</strong>
      </button>
      <div className="card-actions">
        <IconToggle
          active={isCompleted}
          label={isCompleted ? "Quitar hecho" : "Marcar hecho"}
          onClick={onToggleCompleted}
          activeClass="done"
        >
          <CheckCircle2 size={17} />
        </IconToggle>
        <IconToggle
          active={isFavorite}
          label={isFavorite ? "Quitar favorito" : "Guardar favorito"}
          onClick={onToggleFavorite}
          activeClass="favorite"
        >
          <Bookmark size={17} />
        </IconToggle>
      </div>
    </article>
  );
}

function LibraryRow({
  trick,
  isActive,
  isFavorite,
  isCompleted,
  onSelect,
  onToggleFavorite,
  onToggleCompleted,
}: {
  trick: Trick;
  isActive: boolean;
  isFavorite: boolean;
  isCompleted: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onToggleCompleted: () => void;
}) {
  const category = getCategory(trick.categoryId);

  return (
    <article className={isActive ? "library-row is-active" : "library-row"} style={{ "--accent": category.accent } as CSSProperties}>
      <button className="library-main" onClick={onSelect}>
        <span className="library-thumb">#{trick.number}</span>
        <div>
          <h3>{trick.title}</h3>
          <p>{category.short} / {trick.estimatedMinutes} min / {trick.difficulty}</p>
        </div>
      </button>
      <div className="row-actions">
        <IconToggle active={isCompleted} label={isCompleted ? "Quitar hecho" : "Marcar hecho"} onClick={onToggleCompleted} activeClass="done">
          <CheckCircle2 size={17} />
        </IconToggle>
        <IconToggle active={isFavorite} label={isFavorite ? "Quitar favorito" : "Guardar favorito"} onClick={onToggleFavorite} activeClass="favorite">
          <Star size={17} />
        </IconToggle>
      </div>
    </article>
  );
}

function IconToggle({
  active,
  activeClass,
  label,
  onClick,
  children,
}: {
  active: boolean;
  activeClass: string;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button className={active ? `icon-toggle is-${activeClass}` : "icon-toggle"} onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>
  );
}

function scoreTrick(trick: Trick, state: AppState, goal: GoalDefinition): number {
  const query = normalizeText(`${state.search || state.caseText}`);
  let score = query ? 8 : 24;
  const haystack = normalizeText(
    `${trick.title} ${trick.categoryId} ${trick.tags.join(" ")} ${trick.tools.join(" ")}`,
  );

  if (goal.categories.includes(trick.categoryId)) score += query ? 12 : 36;
  if (goal.tagHints.some((tag) => trick.tags.includes(tag) || haystack.includes(normalizeText(tag)))) {
    score += query ? 8 : 14;
  }
  if (trick.estimatedMinutes <= state.timeBudget) {
    score += query ? 8 : 18;
  } else {
    score -= Math.min(18, Math.ceil((trick.estimatedMinutes - state.timeBudget) / 2));
  }

  if (query) {
    const tokens = expandSearchTokens(query);
    const baseTokens = getSearchBaseTokens(query);
    const titleText = normalizeText(trick.title);
    const matches = tokens.filter((token) => tokenMatches(haystack, token)).length;
    const titleMatches = tokens.filter((token) => tokenMatches(titleText, token)).length;
    const baseTitleMatches = baseTokens.filter((token) => tokenMatches(titleText, token)).length;

    score += Math.min(58, matches * 12);
    score += Math.min(24, titleMatches * 12);
    score += Math.min(18, baseTitleMatches * 6);

    if (haystack.includes(query)) score += 16;
    if (/video|videos/.test(query) && titleText.includes("video")) score += 18;
    if (query.includes("video largo") && titleText.includes("video largo")) score += 16;
    if (query.includes("video corto") && titleText.includes("video corto")) score += 16;
    if (/recicl/.test(query) && titleText.includes("recicl")) score += 18;
    if (/guion/.test(query) && titleText.includes("guion")) score += 12;
    if (/subtitul/.test(query) && titleText.includes("subtitul")) score += 12;
  }

  if (state.favorites.includes(trick.id)) score += 3;
  if (state.completed.includes(trick.id)) score -= 8;

  return Math.max(1, score);
}

function formatScore(score: number): number {
  return Math.max(1, Math.min(99, Math.round(score)));
}

function expandSearchTokens(query: string): string[] {
  const baseTokens = getSearchBaseTokens(query);
  const extraTokens: string[] = [];
  const joined = baseTokens.join(" ");

  if (/video|videos|reel|reels|tiktok|youtube|short/.test(joined)) {
    extraTokens.push("video", "videos", "guion", "guiones", "subtitulos", "reel", "reels", "short", "shorts", "youtube", "tiktok");
  }

  if (/imagen|foto|fotos|diseno|miniatura/.test(joined)) {
    extraTokens.push("imagen", "imagenes", "visual", "canva", "miniatura", "logo");
  }

  if (/email|correo|whatsapp|mensaje/.test(joined)) {
    extraTokens.push("email", "correo", "whatsapp", "mensaje", "texto");
  }

  if (/estudi|aprender|examen|pdf|libro/.test(joined)) {
    extraTokens.push("estudiar", "aprender", "pdf", "resumir", "flashcards", "examinar");
  }

  return Array.from(new Set([...baseTokens, ...extraTokens]));
}

function getSearchBaseTokens(query: string): string[] {
  return query.split(" ").filter((token) => token.length > 2 && !searchStopWords.has(token));
}

function tokenMatches(haystack: string, token: string): boolean {
  const variants = new Set<string>([token]);
  if (token.endsWith("es")) variants.add(token.slice(0, -2));
  if (token.endsWith("s")) variants.add(token.slice(0, -1));
  if (/ar|er|ir$/.test(token)) variants.add(token.slice(0, -1));

  const genderStem = token.replace(/[oa]s?$/, "");
  if (genderStem.length > 3) variants.add(genderStem);

  for (const variant of variants) {
    if (variant.length > 2 && haystack.includes(variant)) return true;
  }
  return false;
}

function getTopTrick(state: AppState): Trick {
  const goal = goals.find((item) => item.id === state.goalId) ?? goals[0];

  return tricks
    .map((trick) => ({ trick, score: scoreTrick(trick, state, goal) }))
    .sort((a, b) => b.score - a.score || a.trick.estimatedMinutes - b.trick.estimatedMinutes)[0].trick;
}

function filterTricks(state: AppState): Trick[] {
  const search = normalizeText(state.search);

  return tricks.filter((trick) => {
    if (state.category !== "all" && trick.categoryId !== state.category) return false;
    if (!search) return true;

    const haystack = normalizeText(`${trick.number} ${trick.title} ${trick.tags.join(" ")} ${trick.tools.join(" ")}`);
    const tokens = expandSearchTokens(search);
    return haystack.includes(search) || tokens.some((token) => tokenMatches(haystack, token));
  });
}

function personalizePrompt(trick: Trick, caseText: string): string {
  const caseValue = caseText.trim();
  if (!caseValue) return trick.prompt;
  return trick.prompt.replace("[describe aqui tu situacion real]", caseValue);
}

function buildPlanExport(state: AppState, recommendations: Trick[], activeTrick: Trick, activePrompt: string): string {
  const goal = goals.find((item) => item.id === state.goalId) ?? goals[0];
  const favoriteTricks = tricks.filter((trick) => state.favorites.includes(trick.id));
  const completedTricks = tricks.filter((trick) => state.completed.includes(trick.id));

  return [
    "# IA Express - Plan de aplicacion",
    "",
    `Objetivo: ${goal.label}`,
    `Tiempo disponible: ${state.timeBudget} minutos`,
    `Caso: ${state.caseText.trim() || "Pendiente"}`,
    "",
    "## Recomendaciones",
    ...recommendations.flatMap((trick, index) => [
      "",
      `### ${index + 1}. Truco #${trick.number} - ${trick.title}`,
      `Categoria: ${getCategory(trick.categoryId).label}`,
      `Tiempo estimado: ${trick.estimatedMinutes} minutos`,
      `Herramientas: ${trick.tools.join(", ")}`,
      `Accion: ${trick.action}`,
    ]),
    "",
    "## Prompt activo",
    "",
    `Truco #${activeTrick.number} - ${activeTrick.title}`,
    "",
    "```text",
    activePrompt,
    "```",
    "",
    "## Checklist",
    ...activeTrick.checklist.map((item) => `- [ ] ${item}`),
    "",
    "## Favoritos",
    ...(favoriteTricks.length ? favoriteTricks.map((trick) => `- #${trick.number} ${trick.title}`) : ["- Ninguno"]),
    "",
    "## Completados",
    ...(completedTricks.length ? completedTricks.map((trick) => `- #${trick.number} ${trick.title}`) : ["- Ninguno"]),
  ].join("\n");
}

function toggleItem(items: string[], item: string): string[] {
  return items.includes(item) ? items.filter((current) => current !== item) : [...items, item];
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<AppState>;

    return {
      ...initialState,
      ...parsed,
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
    };
  } catch {
    return initialState;
  }
}

async function copyText(text: string): Promise<boolean> {
  if (!text.trim()) return false;
  if (copyWithSelection(text)) return true;

  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

function copyWithSelection(text: string): boolean {
  const element = document.createElement("textarea");
  const selection = document.getSelection();
  const selectedRange = selection?.rangeCount ? selection.getRangeAt(0) : null;

  element.value = text;
  element.setAttribute("readonly", "");
  element.style.position = "fixed";
  element.style.inset = "0 auto auto 0";
  element.style.width = "1px";
  element.style.height = "1px";
  element.style.padding = "0";
  element.style.border = "0";
  element.style.opacity = "0.01";
  element.style.pointerEvents = "none";
  element.style.zIndex = "-1";

  document.body.appendChild(element);
  element.focus({ preventScroll: true });
  element.select();
  element.setSelectionRange(0, element.value.length);

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  element.remove();
  if (selection && selectedRange) {
    selection.removeAllRanges();
    selection.addRange(selectedRange);
  }

  return copied;
}

function selectVisiblePrompt() {
  const element = document.querySelector<HTMLTextAreaElement>("[data-prompt-preview]");
  if (!element) return;

  element.focus({ preventScroll: true });
  element.select();
  element.setSelectionRange(0, element.value.length);
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default App;
