import { Copy, Download, FileText, RefreshCcw } from "lucide-react";
import type { ReactNode } from "react";
import type { TabId } from "../../types/planner";
import { navItems } from "./BottomNav";

type TopPanel = "nav" | "actions";

type TopMenuPanelProps = {
  activePanel: TopPanel;
  activeTab: TabId;
  onClose: () => void;
  onCopyPrompt: () => void;
  onExport: () => void;
  onPrint: () => void;
  onReset: () => void;
  onSelectTab: (tab: TabId) => void;
};

type ActionItem = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
};

export function TopMenuPanel({
  activePanel,
  activeTab,
  onClose,
  onCopyPrompt,
  onExport,
  onPrint,
  onReset,
  onSelectTab,
}: TopMenuPanelProps) {
  const actions: ActionItem[] = [
    { label: "Copiar instrucción IA", icon: <Copy size={16} />, onClick: onCopyPrompt },
    { label: "Exportar plan", icon: <Download size={16} />, onClick: onExport },
    { label: "Imprimir PDF", icon: <FileText size={16} />, onClick: onPrint },
    { label: "Reiniciar estrategia", icon: <RefreshCcw size={16} />, onClick: onReset },
  ];

  function selectTab(tab: TabId) {
    onSelectTab(tab);
    onClose();
  }

  function runAction(action: () => void) {
    onClose();
    action();
  }

  if (activePanel === "nav") {
    return (
      <section className="top-menu-panel is-left" id="menu-navegacion" aria-label="Menú de navegación">
        <p>Navegación rápida</p>
        <div className="top-menu-list">
          {navItems.map((item) => (
            <button className={activeTab === item.id ? "is-active" : ""} key={item.id} type="button" onClick={() => selectTab(item.id)}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="top-menu-panel is-right" id="menu-acciones" aria-label="Opciones del plan">
      <p>Acciones rápidas</p>
      <div className="top-menu-list">
        {actions.map((item) => (
          <button key={item.label} type="button" onClick={() => runAction(item.onClick)}>
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
