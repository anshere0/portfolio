"use client";

import React, { useEffect, useState } from "react";

interface TextGenerateProps {
  words: string;
  className?: string;
  delay?: number;
}

export default function TextGenerate({
  words,
  className = "",
  delay = 0,
}: TextGenerateProps) {
  const [isRendered, setIsRendered] = useState(false);
  const wordArray = words.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRendered(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={`inline-block ${className}`}>
      {wordArray.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          style={{
            transitionDelay: `${idx * 40}ms`,
          }}
          className={`inline-block mr-[0.25em] transition-all duration-500 will-change-transform ${
            isRendered
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-0 blur-sm translate-y-2"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
