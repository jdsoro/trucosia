import { BarChart3, CalendarDays, Home, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import type { TabId } from "../../types/planner";

type BottomNavProps = {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
};

export const navItems: Array<{ id: TabId; label: string; icon: ReactNode }> = [
  { id: "today", label: "Hoy", icon: <Home size={17} /> },
  { id: "calendar", label: "Calendario", icon: <CalendarDays size={17} /> },
  { id: "strategy", label: "Estrategia", icon: <BarChart3 size={17} /> },
  { id: "profile", label: "Perfil", icon: <UserRound size={17} /> },
];

export function BottomNav({ activeTab, onSelect }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {navItems.map((item) => (
        <button className={activeTab === item.id ? "is-active" : ""} key={item.id} type="button" onClick={() => onSelect(item.id)}>
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
