"use client";

import React, { useMemo } from "react";
import PDVTable from "@/components/PDVTable";
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
  // Filter brands by selected category
  const filteredMarques = useMemo(() => {
    if (!selectedCategorie) return marques;
    const catProds = produits.filter(
      (p) => p.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase(),
    );
    const brandSet = new Set(catProds.map((p) => p.MARQUE));
    return marques.filter((m) => brandSet.has(m.MARQUE) || brandSet.has(""));
  }, [marques, produits, selectedCategorie]);

  // Filter product generics by category + brand
  const filteredProduits = useMemo(() => {
    if (!selectedCategorie || !selectedMarque) return [];
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
  }, [produits, selectedCategorie, selectedMarque]);

  // Filter PDVs — requires all 3 selections
  const filteredPDVs = useMemo((): PointDeVente[] => {
    if (!selectedAgence || !selectedCategorie || !selectedMarque) return [];
    const coveredWilayas = couverture
      .filter((c) => c.CODE_AGENCE === selectedAgence)
      .map((c) => c.WILAYA.toLowerCase());
    return pdvs.filter(
      (pdv) =>
        coveredWilayas.includes(pdv.Wilaya.toLowerCase()) &&
        pdv.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase() &&
        (pdv.MARQUE.toLowerCase() === selectedMarque.toLowerCase() ||
          pdv.MARQUE === ""),
    );
  }, [pdvs, couverture, selectedAgence, selectedCategorie, selectedMarque]);

  const toggleProduit = (prod: string) => {
    if (selectedProduits.includes(prod)) {
      onProduitsChange(selectedProduits.filter((p) => p !== prod));
    } else {
      onProduitsChange([...selectedProduits, prod]);
    }
  };

  return (
    <div className="space-y-5">
      {/* AGENCE — Optional */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Agence
          <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            Optionnel
          </span>
        </label>
        <select
          value={selectedAgence}
          onChange={(e) => {
            onAgenceChange(e.target.value);
          }}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
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
        <label className="block text-sm font-medium text-gray-700">
          Catégorie
          <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            Optionnel
          </span>
        </label>
        <select
          value={selectedCategorie}
          onChange={(e) => {
            onCategorieChange(e.target.value);
            onMarqueChange("");
            onProduitsChange([]);
          }}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        >
          <option value="">— Sélectionner une catégorie —</option>
          {categories.map((cat) => (
            <option key={cat.CATEGORIE} value={cat.CATEGORIE}>
              {cat.CATEGORIE}
            </option>
          ))}
        </select>
      </div>

      {/* MARQUE — Optional, filtered by category */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Marque
          <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
            Optionnel
          </span>
        </label>
        <select
          value={selectedMarque}
          onChange={(e) => {
            onMarqueChange(e.target.value);
            onProduitsChange([]);
          }}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        >
          <option value="">— Sélectionner une marque —</option>
          {filteredMarques.map((m) => (
            <option key={m.MARQUE} value={m.MARQUE}>
              {m.MARQUE}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT PICKER — only if categorie AND marque are selected */}
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${
                  selectedProduits.includes(prod)
                    ? "border-[#6A1B9A] bg-[#6A1B9A] text-white shadow"
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

      {/* PDV TABLE — only if agence + categorie + marque are all selected */}
      <PDVTable pdvs={filteredPDVs} />
    </div>
  );
}
