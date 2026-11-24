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
  const dureeOptions = [3, 6, 12, 18, 24, 30, 36];

  const handleRevenuBlur = () => {
    // If the client wrote a number lower than 36 000, do not accept it
    if (revenu > 0 && revenu < 36000) {
      onRevenuChange(0);
    }
  };

  const revenuErrorMessage =
    errors.revenu ||
    (revenu > 0 && revenu < 36000
      ? "Le revenu doit être supérieur ou égal à 36 000 DA."
      : undefined);

  const handlePriceBlur = () => {
    // If the client wrote a number lower than 36 000, do not accept it
    if (price > 0 && price < 36000) {
      onPriceChange(0);
    }
  };

  const priceErrorMessage =
    errors.price ||
    (price > 0 && price < 36000
      ? "Le prix du produit doit être supérieur ou égal à 36 000 DA."
      : undefined);

  return (
    <div className="space-y-4 sm:space-y-5 w-full">
      {/* Direction Régionale — read-only (sans libellé) */}
      <div>
        <input
          type="text"
          value="Banque de Développement Local (BDL) — DRE BOUIRA - 841 -"
          readOnly
          className="w-full px-3.5 py-2 sm:py-2.5 border border-purple-200 rounded-xl bg-purple-50/50 text-[#6A1B9A] font-semibold text-xs sm:text-sm cursor-not-allowed select-none text-center sm:text-left"
        />
      </div>

      {/* TYPE CLIENT */}
      <div className="space-y-1">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          Type de client <span className="text-red-500">*</span>
          <span className="ml-1 text-[11px] text-gray-400">(Obligatoire)</span>
        </label>
        <select
          value={typeClient}
          onChange={(e) => onTypeClientChange(e.target.value)}
          className={`w-full px-3.5 py-2 sm:py-2.5 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white ${
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
          <p className="text-xs text-red-500 font-medium">{errors.typeClient}</p>
        )}
      </div>

      {/* REVENU — Only the message inside the field & red error message when condition not fulfilled */}
      <NumericStepper
        label="Revenu mensuel (Salaire net)"
        value={revenu}
        onChange={onRevenuChange}
        onBlur={handleRevenuBlur}
        step={5000}
        min={36000}
        suffix="د.ج."
        placeholder="36 000 DA minimum"
        error={revenuErrorMessage}
        required
      />

      {/* PRICE (Prix du produit) */}
      <NumericStepper
        label="Prix du produit"
        value={price}
        onChange={onPriceChange}
        onBlur={handlePriceBlur}
        step={10000}
        min={36000}
        suffix="د.ج."
        placeholder="36 000 DA minimum"
        error={priceErrorMessage}
        required
      />

      {/* DUREE MOIS */}
      <div className="space-y-1">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          Durée (mois) <span className="text-red-500">*</span>
          <span className="ml-1 text-[11px] text-gray-400">(Obligatoire)</span>
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
          {dureeOptions.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDureeMoisChange(d)}
              className={`py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all cursor-pointer ${
                dureeMois === d
                  ? "border-[#6A1B9A] bg-[#6A1B9A] text-white shadow-xs"
                  : "border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              {d}
              <span className="block text-[10px] font-normal opacity-70">mois</span>
            </button>
          ))}
        </div>
        {errors.dureeMois && (
          <p className="text-xs text-red-500 font-medium">{errors.dureeMois}</p>
        )}
      </div>
    </div>
  );
}
