"use client";

import React from "react";
import { Phone, Store } from "lucide-react";
import type { PointDeVente } from "@/data/fallbackData";

interface PDVTableProps {
  pdvs: PointDeVente[];
  title?: string;
}

export default function PDVTable({ pdvs, title = "Points de vente disponibles" }: PDVTableProps) {
  if (pdvs.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Store className="w-4 h-4 text-[#6A1B9A]" />
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {pdvs.length} point{pdvs.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
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
                  <a
                    href={`tel:${pdv.Telephone}`}
                    className="flex items-center gap-1 text-[#6A1B9A] hover:underline"
                  >
                    <Phone className="w-3 h-3" />
                    {pdv.Telephone}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
