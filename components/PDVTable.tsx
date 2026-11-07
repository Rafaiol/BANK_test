"use client";

import React from "react";
import { Phone, Store, MapPin } from "lucide-react";
import type { PointDeVente } from "@/data/fallbackData";

interface PDVTableProps {
  pdvs: PointDeVente[];
  title?: string;
}

export default function PDVTable({
  pdvs,
  title = "Points de vente disponibles",
}: PDVTableProps) {
  if (pdvs.length === 0) return null;

  return (
    <div className="mt-4 w-full">
      <div className="flex items-center gap-2 mb-2">
        <Store className="w-4 h-4 text-[#6A1B9A] shrink-0" />
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 truncate">
          {title}
        </h3>
        <span className="ml-auto text-[11px] sm:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
          {pdvs.length} point{pdvs.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ─── MOBILE VIEW: Responsive Cards (phones) ────────────────── */}
      <div className="sm:hidden space-y-2">
        {pdvs.map((pdv, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-3 shadow-2xs space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-bold text-xs text-gray-900 leading-tight">
                {pdv.Commercial}
              </span>
              <span className="bg-purple-100 text-[#6A1B9A] px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                {pdv.Wilaya}
              </span>
            </div>

            <p className="text-[11px] text-gray-600 flex items-start gap-1.5 leading-snug">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <span>{pdv.Adresse}</span>
            </p>

            {pdv.Telephone && (
              <a
                href={`tel:${pdv.Telephone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-[#6A1B9A] text-xs font-semibold hover:bg-purple-100 transition-colors w-full justify-center"
              >
                <Phone className="w-3 h-3" />
                <span>{pdv.Telephone}</span>
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ─── DESKTOP/TABLET VIEW: Table ───────────────────────────── */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 shadow-2xs w-full">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-purple-50 text-[#6A1B9A]">
              <th className="px-3 py-2 text-left font-semibold">Commercial</th>
              <th className="px-3 py-2 text-left font-semibold">Adresse</th>
              <th className="px-3 py-2 text-left font-semibold">Wilaya</th>
              <th className="px-3 py-2 text-left font-semibold">N° téléphone</th>
            </tr>
          </thead>
          <tbody>
            {pdvs.map((pdv, idx) => (
              <tr
                key={idx}
                className={`border-t border-gray-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <td className="px-3 py-2 font-medium text-gray-800">
                  {pdv.Commercial}
                </td>
                <td className="px-3 py-2 text-gray-600">{pdv.Adresse}</td>
                <td className="px-3 py-2">
                  <span className="bg-purple-100 text-[#6A1B9A] px-1.5 py-0.5 rounded text-[10px] font-semibold">
                    {pdv.Wilaya}
                  </span>
                </td>
                <td className="px-3 py-2">
                  {pdv.Telephone ? (
                    <a
                      href={`tel:${pdv.Telephone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-1 text-[#6A1B9A] hover:underline font-medium"
                    >
                      <Phone className="w-3 h-3" />
                      {pdv.Telephone}
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
