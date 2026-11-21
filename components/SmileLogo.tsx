"use client";

import React from "react";

interface SmileLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  withShadow?: boolean;
}

/**
 * Official Al Badil (النافذة الإسلامية) logo of Banque de Développement Local (BDL).
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
      className={`relative shrink-0 rounded-xl bg-white p-0.5 flex items-center justify-center select-none overflow-hidden ${
        withShadow ? "shadow-sm border border-purple-200/50" : ""
      } ${className}`}
    >
      <img
        src="/logo-badil.png"
        alt="BDL Al Badil - النافذة الإسلامية"
        className="w-full h-full object-contain"
        loading="eager"
      />
    </div>
  );
}
