import type { ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  icon?: ReactNode;
  iconPosition?: "start" | "end";
};

const variantClass = {
  primary: "primary-action",
  secondary: "secondary-action",
  danger: "danger-action",
};

export function ActionButton({ variant = "primary", icon, iconPosition = "end", children, className = "", ...props }: ActionButtonProps) {
  return (
    <button className={`${variantClass[variant]} ${className}`.trim()} type="button" {...props}>
      {iconPosition === "start" ? icon : null}
      {children}
      {iconPosition === "end" ? icon : null}
    </button>
  );
}
