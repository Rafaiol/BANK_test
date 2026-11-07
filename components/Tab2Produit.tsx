"use client";

import React, { useMemo } from "react";
import PDVTable from "@/components/PDVTable";
import BrandLogo from "@/components/BrandLogo";
import { Check, X, Sparkles } from "lucide-react";
import type {
  Agence,
  Categorie,
  Marque,
  Produit,
  PointDeVente,
  CouvertureAgence,
} from "@/data/fallbackData";

interface Tab2ProduitProps {
  // Lookups
  agences: Agence[];
  categories: Categorie[];
  marques: Marque[];
  produits: Produit[];
  pdvs: PointDeVente[];
  couverture: CouvertureAgence[];

  // State
  selectedAgence: string;
  onAgenceChange: (v: string) => void;
  selectedCategorie: string;
  onCategorieChange: (v: string) => void;
  selectedMarque: string;
  onMarqueChange: (v: string) => void;
  selectedProduits: string[];
  onProduitsChange: (v: string[]) => void;
}

export default function Tab2Produit({
  agences,
  categories,
  marques,
  produits,
  pdvs,
  couverture,
  selectedAgence,
  onAgenceChange,
  selectedCategorie,
  onCategorieChange,
  selectedMarque,
  onMarqueChange,
  selectedProduits,
  onProduitsChange,
}: Tab2ProduitProps) {
  // Check if chosen category is "Meuble" (furniture)
  const isMeuble = (selectedCategorie || "").toLowerCase().trim() === "meuble";

  // Filter brands by selected category
  const filteredMarques = useMemo(() => {
    if (!selectedCategorie) return marques;
    if (isMeuble) return []; // No brands for Meuble
    const catProds = produits.filter(
      (p) => p.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase(),
    );
    const brandSet = new Set(catProds.map((p) => p.MARQUE));
    return marques.filter((m) => brandSet.has(m.MARQUE) || brandSet.has(""));
  }, [marques, produits, selectedCategorie, isMeuble]);

  // Filter product generics by category + brand (or category alone for Meuble)
  const filteredProduits = useMemo(() => {
    if (!selectedCategorie) return [];
    if (isMeuble) {
      return [
        ...new Set(
          produits
            .filter((p) => p.CATEGORIE.toLowerCase() === "meuble")
            .map((p) => p.PRODUIT_GENERIQUE),
        ),
      ];
    }
    if (!selectedMarque) return [];
    return [
      ...new Set(
        produits
          .filter(
            (p) =>
              p.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase() &&
              (p.MARQUE.toLowerCase() === selectedMarque.toLowerCase() ||
                p.MARQUE === ""),
          )
          .map((p) => p.PRODUIT_GENERIQUE),
      ),
    ];
  }, [produits, selectedCategorie, selectedMarque, isMeuble]);

  // Filter PDVs — For Meuble, requires agence + categorie; For others, requires agence + categorie + marque
  const filteredPDVs = useMemo((): PointDeVente[] => {
    if (!selectedAgence || !selectedCategorie) return [];
    if (!isMeuble && !selectedMarque) return [];

    const coveredWilayas = couverture
      .filter((c) => c.CODE_AGENCE === selectedAgence)
      .map((c) => c.WILAYA.toLowerCase());

    return pdvs.filter(
      (pdv) =>
        coveredWilayas.includes(pdv.Wilaya.toLowerCase()) &&
        pdv.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase() &&
        (isMeuble ||
          pdv.MARQUE.toLowerCase() === selectedMarque.toLowerCase() ||
          pdv.MARQUE === ""),
    );
  }, [pdvs, couverture, selectedAgence, selectedCategorie, selectedMarque, isMeuble]);

  const toggleProduit = (prod: string) => {
    if (selectedProduits.includes(prod)) {
      onProduitsChange(selectedProduits.filter((p) => p !== prod));
    } else {
      onProduitsChange([...selectedProduits, prod]);
    }
  };

  const handleBrandSelect = (brandName: string) => {
    if (selectedMarque === brandName) {
      // Toggle off if clicked again
      onMarqueChange("");
      onProduitsChange([]);
    } else {
      onMarqueChange(brandName);
      onProduitsChange([]);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 w-full">
      {/* AGENCE — Optional */}
      <div className="space-y-1">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          Agence
          <span className="ml-2 text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            Optionnel
          </span>
        </label>
        <select
          value={selectedAgence}
          onChange={(e) => onAgenceChange(e.target.value)}
          className="w-full px-3.5 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        >
          <option value="">— Sélectionner une agence —</option>
          {agences.map((ag) => (
            <option key={ag.CODE} value={ag.CODE}>
              {ag.CODE}: {ag.AGENCE}
            </option>
          ))}
        </select>
      </div>

      {/* CATEGORIE — Optional */}
      <div className="space-y-1">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          Catégorie
          <span className="ml-2 text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            Optionnel
          </span>
        </label>
        <select
          value={selectedCategorie}
          onChange={(e) => {
            const nextCat = e.target.value;
            onCategorieChange(nextCat);
            onMarqueChange("");
            onProduitsChange([]);
          }}
          className="w-full px-3.5 py-2 sm:py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        >
          <option value="">— Sélectionner une catégorie —</option>
          {categories.map((cat) => (
            <option key={cat.CATEGORIE} value={cat.CATEGORIE}>
              {cat.CATEGORIE}
            </option>
          ))}
        </select>
      </div>

      {/* MARQUE — HIDDEN when category is "Meuble" */}
      {!isMeuble && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Marque
              <span className="ml-2 text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                Optionnel
              </span>
            </label>
            {selectedMarque && (
              <button
                type="button"
                onClick={() => {
                  onMarqueChange("");
                  onProduitsChange([]);
                }}
                className="text-xs text-purple-600 hover:text-purple-800 font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Désélectionner
              </button>
            )}
          </div>

          {/* Visual Brand Selector with Authentic Brand Logos */}
          {filteredMarques.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
              {filteredMarques.map((m) => {
                const isSelected = selectedMarque === m.MARQUE;
                return (
                  <button
                    key={m.MARQUE}
                    type="button"
                    onClick={() => handleBrandSelect(m.MARQUE)}
                    className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border-2 transition-all cursor-pointer text-center group bg-white ${
                      isSelected
                        ? "border-[#6A1B9A] bg-purple-50/50 shadow-xs ring-2 ring-purple-200"
                        : "border-gray-200 hover:border-purple-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Active check pill */}
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#6A1B9A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}

                    {/* Authentic Brand SVG Logo */}
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1 w-full px-1">
                      <BrandLogo brand={m.MARQUE} size="md" />
                    </div>

                    <span
                      className={`text-[11px] sm:text-xs font-semibold truncate w-full ${
                        isSelected ? "text-[#6A1B9A]" : "text-gray-700"
                      }`}
                    >
                      {m.MARQUE}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              Veuillez sélectionner une catégorie pour voir les marques associées.
            </p>
          )}

          {/* Selected Brand Banner */}
          {selectedMarque && (
            <div className="flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-200 rounded-xl mt-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="w-4 h-4 text-[#6A1B9A] shrink-0" />
                <span className="text-[11px] sm:text-xs text-gray-600">Marque :</span>
                <strong className="text-xs sm:text-sm text-[#6A1B9A] font-bold">
                  {selectedMarque}
                </strong>
              </div>
              <BrandLogo brand={selectedMarque} size="sm" className="hidden sm:block" />
            </div>
          )}
        </div>
      )}

      {/* PRODUCT PICKER — for Meuble (no brand required) or when brand is selected */}
      {filteredProduits.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Produits sélectionnés
          </label>
          <div className="flex flex-wrap gap-2">
            {filteredProduits.map((prod) => (
              <button
                key={prod}
                type="button"
                onClick={() => toggleProduit(prod)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all cursor-pointer ${
                  selectedProduits.includes(prod)
                    ? "border-[#6A1B9A] bg-[#6A1B9A] text-white shadow-xs"
                    : "border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                {prod}
              </button>
            ))}
          </div>
          {/* Selected products read-only display */}
          {selectedProduits.length > 0 && (
            <div className="mt-2">
              <input
                type="text"
                readOnly
                value={selectedProduits.join(", ")}
                className="w-full px-4 py-2 border border-purple-200 bg-purple-50 rounded-xl text-xs text-[#6A1B9A] font-medium focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* PDV TABLE — For Meuble (agence + categorie) or other (agence + categorie + marque) */}
      <PDVTable pdvs={filteredPDVs} />
    </div>
  );
}
