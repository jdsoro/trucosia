import { useState, type ReactNode } from "react";
import { appName } from "../../data/plannerData";
import type { TabId } from "../../types/planner";
import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";
import { TopMenuPanel } from "./TopMenuPanel";

type PhoneShellProps = {
  activeTab: TabId;
  children: ReactNode;
  onCopyPrompt: () => void;
  onExport: () => void;
  onPrint: () => void;
  onReset: () => void;
  onSelectTab: (tab: TabId) => void;
};

type TopPanel = "nav" | "actions" | null;

export function PhoneShell({ activeTab, children, onCopyPrompt, onExport, onPrint, onReset, onSelectTab }: PhoneShellProps) {
  const [openPanel, setOpenPanel] = useState<TopPanel>(null);

  function togglePanel(panel: Exclude<TopPanel, null>) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  function selectTab(tab: TabId) {
    onSelectTab(tab);
    setOpenPanel(null);
  }

  return (
    <main className="page-shell">
      <section className="app-stage">
        <section className="phone-frame" aria-label={appName}>
          <div className="phone-screen">
            <AppHeader
              isActionsOpen={openPanel === "actions"}
              isMenuOpen={openPanel === "nav"}
              onToggleActions={() => togglePanel("actions")}
              onToggleMenu={() => togglePanel("nav")}
            />
            {openPanel ? (
              <>
                <button className="top-menu-backdrop" type="button" aria-label="Cerrar menú" onClick={() => setOpenPanel(null)} />
                <TopMenuPanel
                  activePanel={openPanel}
                  activeTab={activeTab}
                  onClose={() => setOpenPanel(null)}
                  onCopyPrompt={onCopyPrompt}
                  onExport={onExport}
                  onPrint={onPrint}
                  onReset={onReset}
                  onSelectTab={selectTab}
                />
              </>
            ) : null}
            <div className="screen-scroll">{children}</div>
            <BottomNav activeTab={activeTab} onSelect={onSelectTab} />
          </div>
        </section>
      </section>
    </main>
  );
}
