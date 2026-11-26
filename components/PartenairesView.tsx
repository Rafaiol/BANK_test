"use client";

import React, { useState, useMemo } from "react";
import BrandLogo from "@/components/BrandLogo";
import PDVTable from "@/components/PDVTable";
import {
  Store,
  Calculator,
  Building2,
  Layers,
  MapPin,
  CheckCircle2,
  Tag,
} from "lucide-react";
import type {
  Agence,
  Categorie,
  Marque,
  Produit,
  PointDeVente,
  CouvertureAgence,
} from "@/data/fallbackData";

interface PartenairesViewProps {
  agences: Agence[];
  categories: Categorie[];
  marques: Marque[];
  produits: Produit[];
  pdvs: PointDeVente[];
  couverture: CouvertureAgence[];
  onNavigateToSimulation?: () => void;
}

export default function PartenairesView({
  agences,
  categories,
  marques,
  produits,
  pdvs,
  couverture,
  onNavigateToSimulation,
}: PartenairesViewProps) {
  const [selectedAgence, setSelectedAgence] = useState<string>("");
  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedMarque, setSelectedMarque] = useState<string>("");

  const targetCat = (selectedCategorie || "").trim().toLowerCase();
  const isMeuble = targetCat === "meuble";

  // Filter available brands based on selected agence + category (from both produits & pdvs)
  const filteredMarques = useMemo(() => {
    if (!selectedAgence || !selectedCategorie) return [];
    if (isMeuble) return [];

    const brandSet = new Set<string>();
    for (const p of produits) {
      if (p.CATEGORIE.trim().toLowerCase() === targetCat && p.MARQUE.trim()) {
        brandSet.add(p.MARQUE.trim().toUpperCase());
      }
    }
    for (const pdv of pdvs) {
      if (pdv.CATEGORIE.trim().toLowerCase() === targetCat && pdv.MARQUE.trim()) {
        brandSet.add(pdv.MARQUE.trim().toUpperCase());
      }
    }

    if (brandSet.size === 0) return [];

    const matched = marques.filter((m) =>
      brandSet.has(m.MARQUE.trim().toUpperCase())
    );
    const existingUpper = new Set(
      matched.map((m) => m.MARQUE.trim().toUpperCase())
    );
    for (const b of brandSet) {
      if (!existingUpper.has(b)) {
        matched.push({ MARQUE: b, LOGO: "" });
      }
    }
    return matched;
  }, [selectedAgence, selectedCategorie, targetCat, isMeuble, produits, pdvs, marques]);

  // Categories like Meuble, Motor Cycle VMS, and PC SCHNEIDER have no sub-brands:
  // their PDVs appear immediately after selecting Agence + Categorie.
  const hasBrandChoices = filteredMarques.length > 0;

  // Filter Points de Vente using agency coverage
  const filteredPDVs = useMemo((): PointDeVente[] => {
    if (!selectedAgence || !selectedCategorie) return [];
    if (hasBrandChoices && !selectedMarque) return [];

    const coveredWilayas = new Set(
      couverture
        .filter((c) => c.CODE_AGENCE.trim() === selectedAgence.trim())
        .map((c) => c.WILAYA.trim().toLowerCase())
    );

    return pdvs.filter((pdv) => {
      const pdvWilaya = pdv.Wilaya.trim().toLowerCase();
      const pdvCat = pdv.CATEGORIE.trim().toLowerCase();
      const pdvMarque = pdv.MARQUE.trim().toLowerCase();

      if (!coveredWilayas.has(pdvWilaya) || pdvCat !== targetCat) {
        return false;
      }
      if (!hasBrandChoices) {
        return true;
      }
      return (
        selectedMarque === "ALL" ||
        pdvMarque === selectedMarque.trim().toLowerCase() ||
        pdvMarque === ""
      );
    });
  }, [
    selectedAgence,
    selectedCategorie,
    selectedMarque,
    targetCat,
    hasBrandChoices,
    pdvs,
    couverture,
  ]);

  const selectedAgenceObj = agences.find((a) => a.CODE === selectedAgence);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* ─── HERO HEADER ────────────────────────────────────────── */}
      <div className="text-center space-y-2 bg-gradient-to-r from-purple-50 via-white to-fuchsia-50 p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6A1B9A] text-xs font-semibold mb-1">
          <Store className="w-3.5 h-3.5" />
          Réseau Conventionné Mourabaha Consommation
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Nos Partenaires Conventionnés
        </h1>
        <p className="text-xs text-[#6A1B9A] font-medium" dir="rtl">
          شركاؤنا المعتمدون في إطار الصيرفة الإسلامية البديل
        </p>
      </div>

      {/* ─── EXPLORATEUR DE PARTENAIRES & POINTS DE VENTE ─────────── */}
      <div className="bg-white rounded-3xl border border-purple-100 p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-2 flex-wrap border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6A1B9A]" />
              Trouver un Magasin ou Point de Vente Agréé
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Sélectionnez votre agence, votre catégorie, puis choisissez une marque pour afficher ses magasins agréés.
            </p>
          </div>
          {onNavigateToSimulation && (
            <button
              type="button"
              onClick={onNavigateToSimulation}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#6A1B9A] text-white hover:bg-[#571480] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Faire une simulation
            </button>
          )}
        </div>

        {/* Step 1 & 2: Agence + Categorie Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Agence */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-[#6A1B9A]" />
              1. Agence de rattachement
            </label>
            <select
              value={selectedAgence}
              onChange={(e) => {
                setSelectedAgence(e.target.value);
                setSelectedCategorie("");
                setSelectedMarque("");
              }}
              className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white border-gray-200"
            >
              <option value="">— Sélectionner une agence —</option>
              {agences.map((ag) => (
                <option key={ag.CODE} value={ag.CODE}>
                  {ag.CODE} — {ag.AGENCE}
                </option>
              ))}
            </select>
          </div>

          {/* Categorie */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#6A1B9A]" />
              2. Catégorie de produit
            </label>
            <select
              value={selectedCategorie}
              onChange={(e) => {
                setSelectedCategorie(e.target.value);
                setSelectedMarque("");
              }}
              disabled={!selectedAgence}
              className={`w-full px-3 py-2 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white ${
                !selectedAgence
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-gray-200"
              }`}
            >
              <option value="">— Sélectionner une catégorie —</option>
              {categories.map((c) => (
                <option key={c.CATEGORIE} value={c.CATEGORIE}>
                  {c.CATEGORIE}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 3: Selectable Brand Logos (if category has sub-brands), otherwise show PDVs directly */}
        {selectedAgence && selectedCategorie && (
          <div className="space-y-4 pt-2 border-t border-gray-100">
            {!hasBrandChoices ? (
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center gap-2.5 text-xs text-purple-900">
                <CheckCircle2 className="w-4 h-4 text-[#6A1B9A] shrink-0" />
                <span>
                  Catégorie <strong>{selectedCategorie.trim()}</strong> — les points de vente conventionnés couverts par votre agence sont affichés ci-dessous.
                </span>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#6A1B9A]" />
                    3. Cliquez sur une marque pour afficher ses points de vente agréés :
                  </label>
                  {selectedMarque && (
                    <button
                      type="button"
                      onClick={() => setSelectedMarque("")}
                      className="text-[11px] text-[#6A1B9A] hover:underline font-medium cursor-pointer"
                    >
                      Réinitialiser la marque
                    </button>
                  )}
                </div>

                {/* Selectable brand cards with official logos */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {filteredMarques.map((m) => {
                    const isSelected =
                      selectedMarque.trim().toUpperCase() === m.MARQUE.trim().toUpperCase();
                    return (
                      <button
                        type="button"
                        key={m.MARQUE}
                        onClick={() =>
                          setSelectedMarque(isSelected ? "" : m.MARQUE)
                        }
                        className={`p-3.5 rounded-2xl text-center flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-purple-50/90 border-2 border-[#6A1B9A] ring-2 ring-purple-300 shadow-md scale-[1.02]"
                            : "bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xs"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#6A1B9A] text-white flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="h-12 sm:h-14 flex items-center justify-center w-full px-1">
                          <BrandLogo brand={m.MARQUE} size="lg" />
                        </div>
                        <span
                          className={`text-xs font-bold mt-2 ${
                            isSelected ? "text-[#6A1B9A]" : "text-gray-800"
                          }`}
                        >
                          {m.MARQUE}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Restored Points de Vente Table when everything is selected */}
            {(!hasBrandChoices || selectedMarque) && (
              <div className="space-y-3 pt-3 border-t border-purple-100 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">
                      Magasins &amp; Points de Vente Agréés
                    </h3>
                    <span className="text-xs text-purple-700 bg-purple-100 font-semibold px-2 py-0.5 rounded-md">
                      {!hasBrandChoices ? selectedCategorie.trim() : selectedMarque}
                    </span>
                    {selectedAgenceObj && (
                      <span className="text-xs text-gray-500 hidden sm:inline">
                        — Agence {selectedAgenceObj.CODE} ({selectedAgenceObj.AGENCE})
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Conventionnés BDL
                  </span>
                </div>

                {filteredPDVs.length > 0 ? (
                  <PDVTable
                    pdvs={filteredPDVs}
                    title={`Points de vente conventionnés (${!hasBrandChoices ? selectedCategorie.trim() : selectedMarque})`}
                  />
                ) : (
                  <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
                    Aucun point de vente conventionné trouvé pour ces critères spécifiques dans cette agence. Veuillez vous rapprocher de votre agence.
                  </div>
                )}
              </div>
            )}

            {/* Hint when agence & categorie selected, but brand not yet picked */}
            {hasBrandChoices && !selectedMarque && (
              <div className="p-4 text-center text-xs text-purple-800 bg-purple-50/50 rounded-2xl border border-purple-100">
                👆 Cliquez sur l&apos;un des logos ci-dessus pour afficher la liste de ses magasins et points de vente agréés.
              </div>
            )}
          </div>
        )}

        {/* Empty state when agence or category not yet chosen */}
        {(!selectedAgence || !selectedCategorie) && (
          <div className="p-8 text-center text-xs text-gray-500 bg-purple-50/40 rounded-2xl border border-purple-100">
            Sélectionnez votre <strong>agence de rattachement</strong> et votre <strong>catégorie de produit</strong> pour afficher les marques partenaires et leurs magasins conventionnés.
          </div>
        )}
      </div>
    </div>
  );
}
