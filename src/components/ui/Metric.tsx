"use client";

import React from "react";

interface MetricProps {
  value: string;
  label: string;
  onReceiptClick?: () => void;
  receiptId?: string;
  className?: string;
}

export default function Metric({
  value,
  label,
  onReceiptClick,
  className = "",
}: MetricProps) {
  return (
    <div className={`space-y-1 font-body ${className}`}>
      <div className="font-data text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
        {value}
      </div>
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <span>{label}</span>
        {onReceiptClick && (
          <button
            type="button"
            onClick={onReceiptClick}
            className="text-[var(--accent)] hover:underline underline-offset-2 font-medium cursor-pointer"
          >
            [receipt]
          </button>
        )}
      </div>
    </div>
  );
}
