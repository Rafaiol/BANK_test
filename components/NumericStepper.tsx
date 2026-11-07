"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface NumericStepperProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  onBlur?: () => void;
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
  onBlur,
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
    <div className="space-y-1 w-full">
      <label className="block text-xs sm:text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className={`flex items-center gap-0 rounded-xl border ${
          error ? "border-red-400 ring-1 ring-red-300" : "border-gray-200"
        } bg-white shadow-2xs overflow-hidden transition-all w-full`}
      >
        <button
          type="button"
          onClick={() => onChange(Math.max(min, numVal - step))}
          className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors border-r border-gray-200 cursor-pointer shrink-0"
        >
          <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={numVal === 0 ? "" : numVal.toLocaleString("fr-DZ")}
          onChange={handleInput}
          onBlur={onBlur}
          placeholder={placeholder}
          className="flex-1 min-w-0 px-2 sm:px-3 py-2 sm:py-2.5 text-center text-xs sm:text-sm font-semibold focus:outline-none bg-transparent placeholder:text-gray-400 placeholder:font-normal"
        />
        <span className="px-2 sm:px-2.5 text-gray-500 text-xs sm:text-sm font-medium border-l border-gray-200 py-2 sm:py-2.5 bg-gray-50 select-none shrink-0">
          {suffix}
        </span>
        <button
          type="button"
          onClick={() => onChange(numVal === 0 && min > 0 ? min : numVal + step)}
          className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors border-l border-gray-200 cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
      {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
    </div>
  );
}
