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
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-purple-100 rounded-lg">
          <FileText className="w-5 h-5 text-[#6A1B9A]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Check-List</h2>
          <p className="text-sm text-gray-500">
            Documents requis — الوثائق المطلوبة
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Check-List / بحث..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
        />
      </div>

      {/* Items */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">
            Aucun résultat / لا توجد نتائج
          </p>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* French */}
              <div className="flex items-start gap-3 px-4 py-3 border-b border-gray-50">
                <CheckCircle2 className="w-4 h-4 text-[#6A1B9A] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold text-purple-500 uppercase tracking-wide block mb-0.5">
                    Français
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.fr}</p>
                </div>
              </div>
              {/* Arabic */}
              <div className="flex items-start gap-3 px-4 py-3 flex-row-reverse bg-purple-50/40">
                <CheckCircle2 className="w-4 h-4 text-[#8A1C86] mt-0.5 shrink-0" />
                <div className="text-right flex-1">
                  <span className="text-[10px] font-semibold text-purple-500 uppercase tracking-wide block mb-0.5">
                    العربية
                  </span>
                  <p
                    className="text-sm text-gray-700 leading-relaxed"
                    dir="rtl"
                  >
                    {item.ar}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Count */}
      <p className="text-center text-xs text-gray-400">
        {filtered.length} / {items.length} document
        {items.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
