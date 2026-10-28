"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface NumericStepperProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  suffix?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export default function NumericStepper({
  label,
  value,
  onChange,
  step = 1000,
  min = 0,
  suffix = "د.ج.",
  placeholder = "0",
  error,
  required,
}: NumericStepperProps) {
  const numVal = Number(value) || 0;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    onChange(raw === "" ? 0 : Number(raw));
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className={`flex items-center gap-0 rounded-xl border ${
          error ? "border-red-400 ring-1 ring-red-300" : "border-gray-200"
        } bg-white shadow-sm overflow-hidden`}
      >
        <button
          type="button"
          onClick={() => onChange(Math.max(min, numVal - step))}
          className="px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors border-r border-gray-200"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={numVal === 0 ? "" : numVal.toLocaleString("fr-DZ")}
          onChange={handleInput}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 text-center text-sm font-medium focus:outline-none bg-transparent"
        />
        <span className="px-2 text-gray-400 text-sm font-medium border-l border-gray-200 py-2.5 bg-gray-50">
          {suffix}
        </span>
        <button
          type="button"
          onClick={() => onChange(numVal + step)}
          className="px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors border-l border-gray-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
