"use client";

import React, { useState, useMemo } from "react";
import BrandLogo from "@/components/BrandLogo";
import PDVTable from "@/components/PDVTable";
import { Store, Calculator, Sparkles, Building2, Layers, CheckCircle2, MapPin } from "lucide-react";
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

const ALL_PARTNER_BRANDS = [
  { name: "CONDOR", category: "Électroménager & Multimédia" },
  { name: "SAMSUNG", category: "Électroménager & Smart Phones" },
  { name: "CRISTOR", category: "Électroménager & TV" },
  { name: "HISENSE", category: "Électroménager & Climatisation" },
  { name: "THOMSON", category: "Téléviseurs & Électroménager" },
  { name: "SCHNEIDER", category: "Informatique PC & Équipements" },
  { name: "GEANT", category: "Électronique & Électroménager" },
  { name: "NARDI", category: "Électroménager & Cuisson" },
  { name: "RADIOLA", category: "Électroménager & Froid" },
  { name: "ZTE NUBIA", category: "Smart Phones & Téléphonie" },
];

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

  const isMeuble = (selectedCategorie || "").toLowerCase().trim() === "meuble";

  // Filter available brands based on selected agence + category
  const filteredMarques = useMemo(() => {
    if (!selectedAgence || !selectedCategorie) return [];
    if (isMeuble) return [];
    const catProds = produits.filter(
      (p) => p.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase()
    );
    const catBrands = new Set(catProds.map((p) => p.MARQUE.toUpperCase()));
    return marques.filter((m) => catBrands.has(m.MARQUE.toUpperCase()));
  }, [selectedAgence, selectedCategorie, isMeuble, produits, marques]);

  // Filter Points de Vente using agency coverage
  const filteredPDVs = useMemo((): PointDeVente[] => {
    if (!selectedAgence || !selectedCategorie) return [];

    const coveredWilayas = couverture
      .filter((c) => c.CODE_AGENCE === selectedAgence)
      .map((c) => c.WILAYA.toLowerCase());

    return pdvs.filter(
      (pdv) =>
        coveredWilayas.includes(pdv.Wilaya.toLowerCase()) &&
        pdv.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase() &&
        (isMeuble ||
          !selectedMarque ||
          pdv.MARQUE.toLowerCase() === selectedMarque.toLowerCase() ||
          pdv.MARQUE === "")
    );
  }, [selectedAgence, selectedCategorie, selectedMarque, isMeuble, pdvs, couverture]);

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
        <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Banque de Développement Local (BDL) — Direction Régionale d&apos;Exploitation DRE BOUIRA - 841 -
        </p>
        <p className="text-xs text-[#6A1B9A] font-medium" dir="rtl">
          شركاؤنا المعتمدون في إطار الصيرفة الإسلامية البديل
        </p>
      </div>

      {/* ─── SECTION 1: GRILLE OFFICIELLE DES LOGOS (DOCUMENT EXCLUSIF) ─── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6A1B9A]" />
            Marques et Fabricants Partenaires Agréés
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            10 grandes marques conventionnées
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {ALL_PARTNER_BRANDS.map((b) => (
            <div
              key={b.name}
              className="bg-white rounded-2xl border border-gray-200/90 p-4 flex flex-col items-center justify-center text-center shadow-xs hover:border-[#6A1B9A] hover:shadow-md transition-all group"
            >
              <div className="h-14 sm:h-16 flex items-center justify-center w-full px-2">
                <BrandLogo brand={b.name} size="lg" className="group-hover:scale-105 transition-transform" />
              </div>
              <h3 className="text-xs font-bold text-gray-800 mt-2">
                {b.name}
              </h3>
              <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                {b.category}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 2: EXPLORATEUR DE POINTS DE VENTE PAR AGENCE ─── */}
      <div className="bg-white rounded-3xl border border-purple-100 p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-2 flex-wrap border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6A1B9A]" />
              Trouver un Magasin ou Point de Vente Agréé
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Sélectionnez votre agence et la catégorie souhaitée pour afficher les magasins conventionnés.
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

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
              className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white border-gray-200"
            >
              <option value="">— Sélectionner une catégorie —</option>
              {categories.map((c) => (
                <option key={c.CATEGORIE} value={c.CATEGORIE}>
                  {c.CATEGORIE}
                </option>
              ))}
            </select>
          </div>

          {/* Marque (if not Meuble and if agence+categorie chosen) */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-[#6A1B9A]" />
              3. Marque (facultatif)
            </label>
            <select
              value={selectedMarque}
              onChange={(e) => setSelectedMarque(e.target.value)}
              disabled={!selectedAgence || !selectedCategorie || isMeuble}
              className={`w-full px-3 py-2 border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white ${
                !selectedAgence || !selectedCategorie || isMeuble
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-gray-200"
              }`}
            >
              <option value="">
                {isMeuble
                  ? "— Non applicable pour Meuble —"
                  : !selectedAgence || !selectedCategorie
                  ? "— Choisissez d'abord agence & catégorie —"
                  : "— Toutes les marques —"}
              </option>
              {filteredMarques.map((m) => (
                <option key={m.MARQUE} value={m.MARQUE}>
                  {m.MARQUE}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results of PDV Table */}
        {selectedAgence && selectedCategorie ? (
          filteredPDVs.length > 0 ? (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-medium">
                  {filteredPDVs.length} point{filteredPDVs.length > 1 ? "s" : ""} de vente trouvé{filteredPDVs.length > 1 ? "s" : ""}
                </span>
                <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Conventionnés BDL
                </span>
              </div>
              <PDVTable pdvs={filteredPDVs} />
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
              Aucun point de vente conventionné trouvé pour ces critères spécifiques dans cette agence.
            </div>
          )
        ) : (
          <div className="p-6 text-center text-xs text-gray-500 bg-purple-50/50 rounded-2xl border border-purple-100">
            Choisissez une agence et une catégorie ci-dessus pour afficher la liste complète des points de vente et magasins agréés.
          </div>
        )}
      </div>
    </div>
  );
}
