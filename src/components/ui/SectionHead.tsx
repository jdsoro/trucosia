import type { ReactNode } from "react";

type SectionHeadProps = {
  caption?: string;
  title: string;
  compact?: boolean;
  aside?: ReactNode;
};

export function SectionHead({ caption, title, compact = false, aside }: SectionHeadProps) {
  return (
    <div className={`section-head ${compact ? "compact" : ""}`.trim()}>
      <div>
        {caption ? <p className="caption">{caption}</p> : null}
        <h2>{title}</h2>
      </div>
      {aside}
    </div>
  );
}
