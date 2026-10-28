"use client";

import React from "react";
import NumericStepper from "@/components/NumericStepper";
import type { TypeClient } from "@/data/fallbackData";

interface FormErrors {
  telephone?: string;
  typeClient?: string;
  revenu?: string;
  price?: string;
  dureeMois?: string;
}

interface Tab1InfoClientProps {
  telephone: string;
  onTelephoneChange: (v: string) => void;
  typeClient: string;
  onTypeClientChange: (v: string) => void;
  revenu: number;
  onRevenuChange: (v: number) => void;
  price: number;
  onPriceChange: (v: number) => void;
  dureeMois: number;
  onDureeMoisChange: (v: number) => void;
  typesClient: TypeClient[];
  errors: FormErrors;
}

export default function Tab1InfoClient({
  telephone,
  onTelephoneChange,
  typeClient,
  onTypeClientChange,
  revenu,
  onRevenuChange,
  price,
  onPriceChange,
  dureeMois,
  onDureeMoisChange,
  typesClient,
  errors,
}: Tab1InfoClientProps) {
  const dureeOptions = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];

  return (
    <div className="space-y-5">
      {/* Direction Régionale — read-only */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Direction Régionale d&apos;Exploitation
        </label>
        <input
          type="text"
          value="DRE BOUIRA"
          readOnly
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm cursor-not-allowed select-none"
        />
      </div>

      {/* TELEPHONE */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Téléphone <span className="text-red-500">*</span>
          <span className="ml-1 text-xs text-gray-400">(Obligatoire)</span>
        </label>
        <input
          type="tel"
          value={telephone}
          onChange={(e) => onTelephoneChange(e.target.value.replace(/[^0-9]/g, ""))}
          maxLength={10}
          placeholder="05 / 06 / 07 XX XX XX XX"
          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${
            errors.telephone
              ? "border-red-400 ring-1 ring-red-300"
              : "border-gray-200"
          }`}
        />
        {errors.telephone && (
          <p className="text-xs text-red-500">{errors.telephone}</p>
        )}
        <p className="text-xs text-gray-400">Format: 0512345678 (10 chiffres)</p>
      </div>

      {/* TYPE CLIENT */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Type de client <span className="text-red-500">*</span>
          <span className="ml-1 text-xs text-gray-400">(Obligatoire)</span>
        </label>
        <select
          value={typeClient}
          onChange={(e) => onTypeClientChange(e.target.value)}
          className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white ${
            errors.typeClient
              ? "border-red-400 ring-1 ring-red-300"
              : "border-gray-200"
          }`}
        >
          <option value="">— Sélectionner un type de client —</option>
          {typesClient.map((tc) => (
            <option key={tc.NOM_TYPE_CLIENT} value={tc.NOM_TYPE_CLIENT}>
              {tc.NOM_TYPE_CLIENT}{" "}
              — {(tc.TAUX_DE_PROFIT * 100).toFixed(2).replace(".", ",")}%
            </option>
          ))}
        </select>
        {errors.typeClient && (
          <p className="text-xs text-red-500">{errors.typeClient}</p>
        )}
      </div>

      {/* REVENU */}
      <NumericStepper
        label="Revenu mensuel (Salaire net)"
        value={revenu}
        onChange={onRevenuChange}
        step={5000}
        min={0}
        suffix="د.ج."
        placeholder="Montant du revenu"
        error={errors.revenu}
        required
      />

      {/* PRICE (Prix du produit) */}
      <NumericStepper
        label="Prix du produit"
        value={price}
        onChange={onPriceChange}
        step={10000}
        min={0}
        suffix="د.ج."
        placeholder="Prix total du produit"
        error={errors.price}
        required
      />

      {/* DUREE MOIS */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Durée (mois) <span className="text-red-500">*</span>
          <span className="ml-1 text-xs text-gray-400">(Obligatoire)</span>
        </label>
        <div className="grid grid-cols-5 gap-2">
          {dureeOptions.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDureeMoisChange(d)}
              className={`py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all ${
                dureeMois === d
                  ? "border-[#6A1B9A] bg-[#6A1B9A] text-white shadow-md"
                  : "border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              {d}
              <span className="block text-[10px] font-normal opacity-70">mois</span>
            </button>
          ))}
        </div>
        {errors.dureeMois && (
          <p className="text-xs text-red-500">{errors.dureeMois}</p>
        )}
      </div>
    </div>
  );
}
