import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconControlProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
};

export function IconControl({ label, icon, ...props }: IconControlProps) {
  return (
    <button className="icon-control" type="button" aria-label={label} {...props}>
      {icon}
    </button>
  );
}
