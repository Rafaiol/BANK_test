"use client";

import React, { useState, useMemo } from "react";
import { Search, CheckCircle2, FileText } from "lucide-react";
import type { CheckListItem } from "@/data/fallbackData";

interface CheckListViewProps {
  items: CheckListItem[];
}

export default function CheckListView({ items }: CheckListViewProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (it) => it.fr.toLowerCase().includes(q) || it.ar.includes(query),
    );
  }, [items, query]);

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
      {/* Compact Responsive Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#6A1B9A]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800 leading-tight">
              Check-List
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500">
              Documents requis — الوثائق المطلوبة
            </p>
          </div>
        </div>

        {/* Counter badge */}
        <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 bg-purple-50 text-[#6A1B9A] rounded-full border border-purple-100 shrink-0">
          {filtered.length} / {items.length} doc{items.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Rechercher un document / بحث في الوثائق..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 sm:py-2.5 border border-gray-200 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs sm:text-sm"
        />
      </div>

      {/* Responsive Grid — 1 column on mobile, 2 columns on desktop */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            Aucun document trouvé / لا توجد نتائج
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-xs border border-gray-150 p-3.5 sm:p-4 hover:border-purple-300 hover:shadow-sm transition-all flex items-start gap-3"
            >
              {/* Number Badge */}
              <div className="w-6 h-6 rounded-full bg-purple-100 text-[#6A1B9A] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                {idx + 1}
              </div>

              {/* Document Text: French & Large Arabic */}
              <div className="flex-1 min-w-0 space-y-1.5">
                {/* French text */}
                <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                  {item.fr}
                </p>

                {/* Arabic text — Significantly larger, clear and bold */}
                <p
                  className="text-sm sm:text-base md:text-[17px] font-bold text-purple-950 leading-relaxed text-right pt-1.5 border-t border-purple-50"
                  dir="rtl"
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, Tahoma, 'Noto Sans Arabic', 'Segoe UI', Arial, sans-serif",
                  }}
                >
                  {item.ar}
                </p>
              </div>

              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
