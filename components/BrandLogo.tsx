"use client";

import React from "react";

interface BrandLogoProps {
  brand: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const BRAND_IMAGE_MAP: Record<string, string> = {
  CONDOR: "/partners/condor.png",
  CRISTOR: "/partners/cristor.png",
  SAMSUNG: "/partners/samsung.png",
  NARDI: "/partners/nardi.png",
  THOMSON: "/partners/thomson.png",
  HISENSE: "/partners/hisense.png",
  SCHNEIDER: "/partners/schneider.png",
  RADIOLA: "/partners/radiola.png",
  GEANT: "/partners/geant.png",
  "ZTE NUBIA": "/partners/zte-nubia.png",
};

/**
 * Official partner brand logos extracted directly from the convention documentation.
 */
export default function BrandLogo({
  brand,
  className = "",
  size = "md",
}: BrandLogoProps) {
  const norm = (brand || "").trim().toUpperCase();

  const sizeClasses = {
    sm: "h-6 max-w-[80px]",
    md: "h-9 max-w-[130px]",
    lg: "h-14 max-w-[180px]",
  }[size];

  // Match brand against known partner logos
  const matchedKey = Object.keys(BRAND_IMAGE_MAP).find((key) =>
    norm.includes(key)
  );
  const imageSrc = matchedKey ? BRAND_IMAGE_MAP[matchedKey] : null;

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={brand}
        className={`${sizeClasses} w-auto object-contain transition-transform select-none ${className}`}
        loading="lazy"
      />
    );
  }

  // Graceful fallback for non-matching or unlisted brands
  return (
    <span
      className={`font-bold text-gray-800 text-xs px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200 select-none ${className}`}
    >
      {brand}
    </span>
  );
}
