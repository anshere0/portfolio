import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body text-sm font-medium transition-all duration-120 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-[4px]",
    md: "px-4 py-2 text-sm rounded-[4px]",
    lg: "px-6 py-3 text-base rounded-[4px]",
  };

  const variantStyles = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-105 active:brightness-95 border-none",
    secondary:
      "bg-transparent text-[var(--text)] hairline hover:border-[var(--line-strong)] hover:bg-[var(--bg-raised)]",
    text: "bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] hover:underline underline-offset-4 px-2 py-1",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
