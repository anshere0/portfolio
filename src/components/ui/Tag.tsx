import React from "react";

interface TagProps {
  label: string;
  variant?: "signal" | "accent" | "anomaly" | "default";
  className?: string;
}

export default function Tag({
  label,
  variant = "default",
  className = "",
}: TagProps) {
  const variantStyles = {
    signal: "text-[var(--signal)] border-[var(--signal)] bg-[var(--bg-sunken)]/60",
    accent: "text-[var(--accent)] border-[var(--accent)] bg-[var(--bg-sunken)]/60",
    anomaly: "text-[var(--anomaly)] border-[var(--anomaly)] bg-[var(--bg-sunken)]/60",
    default: "text-[var(--text-muted)] border-[var(--line)] bg-[var(--bg-sunken)]/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[4px] border font-body text-xs font-medium tracking-normal select-none ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
