import { PhoneShell } from "./components/layout/PhoneShell";
import { usePlannerState } from "./hooks/usePlannerState";
import { CalendarScreen } from "./screens/CalendarScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { StrategyScreen } from "./screens/StrategyScreen";
import { TodayScreen } from "./screens/TodayScreen";

function App() {
  const { state, toast, selectedLesson, progress, currentPhase, nextLessons, strategy, actions } = usePlannerState();

  return (
    <>
      <PhoneShell
        activeTab={state.activeTab}
        onCopyPrompt={actions.copyPrompt}
        onExport={actions.exportMarkdown}
        onPrint={actions.printPdf}
        onReset={actions.resetAll}
        onSelectTab={actions.setTab}
      >
        {state.activeTab === "today" ? (
          <TodayScreen
            completedDays={state.completedDays}
            completedTaskIds={state.completedTaskIds}
            currentPhase={currentPhase}
            lesson={selectedLesson}
            nextLessons={nextLessons}
            note={state.notes[selectedLesson.day] ?? ""}
            onCompleteDay={actions.completeDay}
            onCopyActionPlan={actions.copyDailyPlan}
            onCopyPrompt={actions.copyPrompt}
            onNoteChange={(value) => actions.updateNote(selectedLesson.day, value)}
            onOpenLesson={actions.openLesson}
            onToggleTask={actions.toggleTask}
            progress={progress}
          />
        ) : null}

        {state.activeTab === "calendar" ? (
          <CalendarScreen
            completedDays={state.completedDays}
            completedTaskIds={state.completedTaskIds}
            onOpenLesson={actions.openLesson}
            selectedDay={state.selectedDay}
          />
        ) : null}

        {state.activeTab === "strategy" ? (
          <StrategyScreen
            onExport={actions.exportMarkdown}
            onPatchProfile={actions.patchProfile}
            onPrint={actions.printPdf}
            onReset={actions.resetAll}
            profile={state.profile}
            progress={progress}
            strategy={strategy}
          />
        ) : null}

        {state.activeTab === "profile" ? (
          <ProfileScreen
            onExport={actions.exportMarkdown}
            onPatchProfile={actions.patchProfile}
            onReset={actions.resetAll}
            profile={state.profile}
            progress={progress}
          />
        ) : null}
      </PhoneShell>

      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}

export default App;
