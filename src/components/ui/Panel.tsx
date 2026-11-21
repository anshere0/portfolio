import React from "react";

interface PanelProps {
  title?: string;
  tag?: string;
  tagType?: "recorded run" | "synthetic data" | "illustrative" | "default";
  variant?: "container" | "data";
  children: React.ReactNode;
  className?: string;
}

export default function Panel({
  title,
  tag,
  tagType = "default",
  variant = "container",
  children,
  className = "",
}: PanelProps) {
  const radius = variant === "container" ? "rounded-[16px]" : "rounded-[4px]";

  const tagColors = {
    "recorded run": "text-[var(--signal)] border-[var(--signal)]",
    "synthetic data": "text-[var(--accent)] border-[var(--accent)]",
    "illustrative": "text-[var(--text-muted)] border-[var(--line-strong)]",
    "default": "text-[var(--text-muted)] border-[var(--line)]",
  };

  return (
    <div
      className={`bg-[var(--bg-raised)] hairline ${radius} p-6 sm:p-8 space-y-4 ${className}`}
    >
      {(title || tag) && (
        <div className="flex items-center justify-between gap-4 hairline-b pb-3">
          {title && (
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--text)] tracking-tight">
              {title}
            </h3>
          )}
          {tag && (
            <span
              className={`font-data text-[11px] px-2.5 py-0.5 rounded-[4px] border ${tagColors[tagType]}`}
            >
              {tag}
            </span>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
