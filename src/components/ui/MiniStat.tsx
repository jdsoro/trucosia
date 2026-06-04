import type { ReactNode } from "react";

type MiniStatProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function MiniStat({ icon, label, value }: MiniStatProps) {
  return (
    <article className="mini-stat">
      <span>{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}
