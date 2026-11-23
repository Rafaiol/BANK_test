"use client";

import React from "react";

interface SmileLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  withShadow?: boolean;
}

/**
 * Smile El Badil — original SVG house logo for the app navbar.
 */
export default function SmileLogo({
  size = "md",
  className = "",
  withShadow = true,
}: SmileLogoProps) {
  const dim =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 28
      : size === "md"
      ? 36
      : size === "lg"
      ? 46
      : 58;

  return (
    <div
      style={{ width: dim, height: dim }}
      className={`relative shrink-0 rounded-xl flex items-center justify-center select-none overflow-hidden ${
        withShadow ? "shadow-sm border border-purple-200/50" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        width={dim}
        height={dim}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="11" fill="#5C1480" />
        <circle cx="24" cy="6.5" r="1.5" fill="#FFFFFF" />
        <polygon points="24,8 10,19 38,19" fill="#FAB308" />
        <path
          d="M 12 19 H 36 V 32 H 28 V 25 C 28 23 20 23 20 25 V 32 H 12 Z"
          fill="#FFFFFF"
        />
        <path
          d="M 14 36.5 C 18 41.5 30 41.5 34 36.5"
          stroke="#FAB308"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
