import { Menu, MoreHorizontal } from "lucide-react";
import { appName } from "../../data/plannerData";
import { IconControl } from "../ui/IconControl";

type AppHeaderProps = {
  isActionsOpen: boolean;
  isMenuOpen: boolean;
  onToggleActions: () => void;
  onToggleMenu: () => void;
};

export function AppHeader({ isActionsOpen, isMenuOpen, onToggleActions, onToggleMenu }: AppHeaderProps) {
  return (
    <header className="app-topbar">
      <IconControl
        label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMenuOpen}
        aria-controls="menu-navegacion"
        icon={<Menu size={18} />}
        onClick={onToggleMenu}
      />
      <strong>{appName}</strong>
      <IconControl
        label={isActionsOpen ? "Cerrar opciones" : "Opciones"}
        aria-expanded={isActionsOpen}
        aria-controls="menu-acciones"
        icon={<MoreHorizontal size={18} />}
        onClick={onToggleActions}
      />
    </header>
  );
}
