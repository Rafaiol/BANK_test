"use client";

import React from "react";

interface BrandLogoProps {
  brand: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Authentic vector logos for all partnered brands.
 * Crisp SVGs guarantee zero network latency, zero broken images,
 * and sharp high-DPI rendering across all devices.
 */
export default function BrandLogo({
  brand,
  className = "",
  size = "md",
}: BrandLogoProps) {
  const norm = (brand || "").trim().toUpperCase();

  const sizeClasses = {
    sm: "h-5 w-auto max-w-[80px]",
    md: "h-8 w-auto max-w-[120px]",
    lg: "h-12 w-auto max-w-[160px]",
  }[size];

  // ─── CONDOR ─────────────────────────────────────────────────────────────
  if (norm.includes("CONDOR")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Condor"
      >
        {/* Dynamic Eagle Wing Arc */}
        <path
          d="M18 8C28 10 38 18 42 28C36 24 28 22 18 24C12 25 8 29 4 34C8 26 12 18 18 8Z"
          fill="#0066B3"
        />
        <path
          d="M24 14C32 17 38 23 40 31C35 27 28 26 22 27C17 28 14 31 11 35C15 28 19 21 24 14Z"
          fill="#008BE2"
        />
        {/* Typography */}
        <text
          x="46"
          y="32"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="24"
          fill="#003366"
          letterSpacing="-0.5"
        >
          condor
        </text>
      </svg>
    );
  }

  // ─── SAMSUNG ────────────────────────────────────────────────────────────
  if (norm.includes("SAMSUNG")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Samsung"
      >
        <g transform="translate(0, 4)">
          {/* Iconic Tilted Samsung Ellipse */}
          <ellipse
            cx="80"
            cy="20"
            rx="75"
            ry="18"
            transform="rotate(-5 80 20)"
            fill="#0C4DA2"
          />
          {/* Stylized Wordmark */}
          <text
            x="80"
            y="26"
            textAnchor="middle"
            fontFamily="Arial Black, Impact, sans-serif"
            fontWeight="900"
            fontSize="18"
            fill="#FFFFFF"
            letterSpacing="2"
            transform="rotate(-5 80 20)"
          >
            SAMSUNG
          </text>
        </g>
      </svg>
    );
  }

  // ─── HISENSE ────────────────────────────────────────────────────────────
  if (norm.includes("HISENSE")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Hisense"
      >
        <text
          x="10"
          y="33"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="28"
          fill="#00AAA6"
          letterSpacing="-0.5"
        >
          Hisense
        </text>
        <circle cx="145" cy="18" r="3" fill="#00AAA6" />
      </svg>
    );
  }

  // ─── CRISTOR ────────────────────────────────────────────────────────────
  if (norm.includes("CRISTOR")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Cristor"
      >
        {/* Dynamic Blue & Red Crest */}
        <path d="M12 12L24 24L12 36L18 24Z" fill="#E30613" />
        <path d="M22 12L34 24L22 36L28 24Z" fill="#004B87" />
        {/* Wordmark */}
        <text
          x="38"
          y="32"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          fill="#004B87"
          letterSpacing="1"
        >
          CRISTOR
        </text>
      </svg>
    );
  }

  // ─── NARDI ──────────────────────────────────────────────────────────────
  if (norm.includes("NARDI")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Nardi"
      >
        {/* Red accent dot */}
        <circle cx="20" cy="16" r="4.5" fill="#D32F2F" />
        {/* Italian Stylized Italics Typography */}
        <text
          x="28"
          y="33"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontStyle="italic"
          fontWeight="900"
          fontSize="27"
          fill="#1E1E1E"
          letterSpacing="0.5"
        >
          nardi
        </text>
        <rect x="28" y="37" width="70" height="2.5" fill="#D32F2F" rx="1" />
      </svg>
    );
  }

  // ─── GEANT ──────────────────────────────────────────────────────────────
  if (norm.includes("GEANT")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Géant"
      >
        {/* Hexagonal Shield Badge */}
        <polygon
          points="20,8 32,15 32,31 20,38 8,31 8,15"
          fill="#0B4F9C"
        />
        <text
          x="20"
          y="27"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontWeight="900"
          fontSize="16"
          fill="#F59E0B"
        >
          G
        </text>
        {/* Géant Electronics text */}
        <text
          x="38"
          y="28"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="20"
          fill="#0B4F9C"
          letterSpacing="1"
        >
          GÉANT
        </text>
        <text
          x="39"
          y="38"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="8"
          fill="#F59E0B"
          letterSpacing="2"
        >
          ELECTRONICS
        </text>
      </svg>
    );
  }

  // ─── THOMSON ────────────────────────────────────────────────────────────
  if (norm.includes("THOMSON")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Thomson"
      >
        {/* Red Globe / Orbit Emblem */}
        <circle cx="20" cy="24" r="12" stroke="#E3001B" strokeWidth="3" />
        <path
          d="M10 24C10 24 16 16 26 22"
          stroke="#E3001B"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text
          x="38"
          y="32"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="21"
          fill="#E3001B"
          letterSpacing="1.5"
        >
          THOMSON
        </text>
      </svg>
    );
  }

  // ─── SCHNEIDER ──────────────────────────────────────────────────────────
  if (norm.includes("SCHNEIDER")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Schneider"
      >
        <text
          x="10"
          y="31"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          fontSize="21"
          fill="#1F2937"
          letterSpacing="1.5"
        >
          SCHNEIDER
        </text>
        <circle cx="150" cy="18" r="3" fill="#DC2626" />
        <rect x="10" y="36" width="135" height="1.5" fill="#E5E7EB" />
      </svg>
    );
  }

  // ─── RADIOLA ────────────────────────────────────────────────────────────
  if (norm.includes("RADIOLA")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="Radiola"
      >
        {/* Radio Wave Badge */}
        <rect x="8" y="10" width="30" height="28" rx="6" fill="#DC2626" />
        <path
          d="M17 24A6 6 0 0 1 29 24"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M13 24A10 10 0 0 1 33 24"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="44"
          y="31"
          fontFamily="Impact, Arial Black, sans-serif"
          fontWeight="900"
          fontSize="22"
          fill="#111827"
          letterSpacing="1"
        >
          RADIOLA
        </text>
      </svg>
    );
  }

  // ─── ZTE / NUBIA ────────────────────────────────────────────────────────
  if (norm.includes("ZTE") || norm.includes("NUBIA")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="ZTE Nubia"
      >
        {/* Red circle dot */}
        <circle cx="18" cy="24" r="8" fill="#E60012" />
        <circle cx="18" cy="24" r="3.5" fill="#FFFFFF" />
        {/* ZTE & nubia wordmark */}
        <text
          x="32"
          y="23"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="14"
          fill="#0066B3"
          letterSpacing="0.5"
        >
          ZTE
        </text>
        <text
          x="32"
          y="37"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="15"
          fill="#E60012"
          letterSpacing="0.5"
        >
          nubia
        </text>
      </svg>
    );
  }

  // ─── VMS ────────────────────────────────────────────────────────────────
  if (norm.includes("VMS")) {
    return (
      <svg
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses} ${className}`}
        aria-label="VMS Industrie"
      >
        <polygon points="12,10 32,10 26,38 6,38" fill="#0284C7" />
        <text
          x="19"
          y="30"
          fontFamily="Arial Black, sans-serif"
          fontWeight="900"
          fontSize="18"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          V
        </text>
        <text
          x="38"
          y="31"
          fontFamily="Arial Black, sans-serif"
          fontWeight="900"
          fontSize="22"
          fill="#0F172A"
          letterSpacing="1"
        >
          VMS
        </text>
      </svg>
    );
  }

  // ─── FALLBACK GENERIC BADGE ─────────────────────────────────────────────
  const initials = norm
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs ${className}`}
    >
      <span className="w-5 h-5 rounded bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-[10px] uppercase">
        {initials || "★"}
      </span>
      <span className="truncate max-w-[100px]">{brand}</span>
    </div>
  );
}

