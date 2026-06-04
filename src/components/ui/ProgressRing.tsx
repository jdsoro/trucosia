import type { CSSProperties } from "react";

type ProgressRingProps = {
  value: number;
};

export function ProgressRing({ value }: ProgressRingProps) {
  return (
    <div className="progress-ring" style={{ "--progress": `${value}%` } as CSSProperties}>
      <strong>{value}%</strong>
      <span>Progreso</span>
    </div>
  );
}
