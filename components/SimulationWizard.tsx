"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Save,
  User,
  Calculator,
  Store,
} from "lucide-react";
import Tab1InfoClient from "@/components/Tab1InfoClient";
import Tab2Produit from "@/components/Tab2Produit";
import Tab3DetailSimulation from "@/components/Tab3DetailSimulation";
import SimulationPdfModal from "@/components/SimulationPdfModal";
import Toast from "@/components/Toast";
import { calculate } from "@/lib/calculations";
import type { SimulationResults } from "@/lib/calculations";
import type {
  Agence,
  Categorie,
  Marque,
  Produit,
  PointDeVente,
  CouvertureAgence,
  TypeClient,
} from "@/data/fallbackData";

interface LookupData {
  agences: Agence[];
  couverture: CouvertureAgence[];
  typesClient: TypeClient[];
  categories: Categorie[];
  marques: Marque[];
  produits: Produit[];
  pdvs: PointDeVente[];
}

interface SimulationWizardProps {
  data: LookupData;
}

type Tab = 0 | 1 | 2;

const TAB_LABELS = [
  { label: "Info Client", icon: User },
  { label: "Détail Simulation", icon: Calculator },
  { label: "Nos Partenaires", icon: Store },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function SimulationWizard({ data }: SimulationWizardProps) {
  const [tab, setTab] = useState<Tab>(0);
  const [direction, setDirection] = useState(1);

  // ─── Form state ────────────────────────────────────────────
  const [telephone, setTelephone] = useState("");
  const [typeClient, setTypeClient] = useState("");
  const [revenu, setRevenu] = useState(0);
  const [dureeMois, setDureeMois] = useState(0);
  const [selectedAgence, setSelectedAgence] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [selectedMarque, setSelectedMarque] = useState("");
  const [selectedProduits, setSelectedProduits] = useState<string[]>([]);
  const [price, setPrice] = useState(0);

  // ─── Validation state ──────────────────────────────────────
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);

  // ─── Toast state ───────────────────────────────────────────
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Check if chosen category is "Meuble"
  const isMeuble = (selectedCategorie || "").toLowerCase().trim() === "meuble";

  // ─── Derived taux profit ────────────────────────────────────
  const tauxProfit = useMemo(() => {
    const tc = data.typesClient.find((t) => t.NOM_TYPE_CLIENT === typeClient);
    return tc?.TAUX_DE_PROFIT ?? 0;
  }, [data.typesClient, typeClient]);

  // ─── Live calculation ───────────────────────────────────────
  // Rejects revenu lower than 36 000 DA
  const results: SimulationResults = useMemo(() => {
    if (!revenu || revenu < 36000 || !dureeMois || !tauxProfit || !price) {
      return {
        mensualiteMax: 0,
        capaciteEndettement: 0,
        montantAFinancer: 0,
        hamishJidia: 0,
        margeBeneficiaire: 0,
        mensualite: 0,
      };
    }
    return calculate({
      revenu,
      dureeMois,
      tauxProfit,
      price,
      categorie: selectedCategorie,
    });
  }, [revenu, dureeMois, tauxProfit, price, selectedCategorie]);

  // ─── PDF Export Readiness & Mandatory Fields Check ──────────
  const { isExportReady, missingFields } = useMemo(() => {
    const missing: string[] = [];

    // Telephone valid (10 digits starting with 05, 06, or 07)
    if (!telephone || !/^(05|06|07)\d{8}$/.test(telephone)) {
      missing.push("N° Téléphone valide (05, 06 ou 07)");
    }
    if (!typeClient) missing.push("Type de client");
    if (!revenu || revenu < 36000) {
      missing.push("Revenu mensuel (min. 36 000 DA)");
    }
    if (!price || price <= 0) missing.push("Prix du produit");
    if (!dureeMois || dureeMois <= 0) missing.push("Durée (mois)");

    // Simulation calculation validity
    if (!results || results.mensualite <= 0 || isNaN(results.mensualite)) {
      missing.push("Simulation financière calculée");
    }

    return {
      isExportReady: missing.length === 0,
      missingFields: missing,
    };
  }, [
    telephone,
    typeClient,
    revenu,
    price,
    dureeMois,
    results,
  ]);

  // ─── PDV string for saving ──────────────────────────────────
  const pdvString = useMemo(() => {
    if (!selectedAgence || !selectedCategorie) return "";
    if (!isMeuble && !selectedMarque) return "";
    const coveredWilayas = data.couverture
      .filter((c) => c.CODE_AGENCE === selectedAgence)
      .map((c) => c.WILAYA.toLowerCase());
    const matching = data.pdvs.filter(
      (p) =>
        coveredWilayas.includes(p.Wilaya.toLowerCase()) &&
        p.CATEGORIE.toLowerCase() === selectedCategorie.toLowerCase() &&
        (isMeuble || p.MARQUE.toLowerCase() === selectedMarque.toLowerCase() || p.MARQUE === ""),
    );
    return matching
      .map((p) => `🏬 ${p.Commercial} | 📍 ${p.Adresse} (${p.Wilaya}) | 📞 ${p.Telephone}`)
      .join("\n");
  }, [data.couverture, data.pdvs, selectedAgence, selectedCategorie, selectedMarque, isMeuble]);

  // ─── Validation helper for Tab 0 ────────────────────────────
  function validateTab0() {
    const errs: Record<string, string> = {};
    if (!typeClient) errs.typeClient = "Veuillez sélectionner un type de client.";
    if (!revenu || revenu <= 0) {
      errs.revenu = "Le revenu doit être supérieur ou égal à 36 000 DA.";
    } else if (revenu < 36000) {
      errs.revenu = "Le revenu doit être supérieur ou égal à 36 000 DA.";
    }
    if (!dureeMois) errs.dureeMois = "Veuillez sélectionner une durée.";
    if (!price || price <= 0) errs.price = "Le prix doit être supérieur à 0.";
    return errs;
  }

  // ─── Full Validation ─────────────────────────────────────────
  function validate() {
    const errs = validateTab0();

    // Telephone: 10 digits starting with 05, 06, or 07 (located on Tab 1)
    if (!telephone) {
      errs.telephone = "Le numéro de téléphone est obligatoire.";
    } else if (!/^(05|06|07)\d{8}$/.test(telephone)) {
      errs.telephone =
        "Format invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres.";
    }

    return errs;
  }

  // ─── Tab navigation ─────────────────────────────────────────
  function goTo(next: Tab) {
    // If attempting to leave Tab 0, validate Tab 0 fields
    if (tab === 0 && next > 0) {
      const errs0 = validateTab0();
      if (Object.keys(errs0).length > 0) {
        setTouched(true);
        setErrors((prev) => ({ ...prev, ...errs0 }));
        return;
      }
    }

    setDirection(next > tab ? 1 : -1);
    setTab(next);
  }

  function handleNext() {
    if (tab === 0) {
      const errs0 = validateTab0();
      if (Object.keys(errs0).length > 0) {
        setTouched(true);
        setErrors((prev) => ({ ...prev, ...errs0 }));
        return;
      }
      goTo(1);
      return;
    }

    if (tab === 1) {
      goTo(2);
      return;
    }
  }

  function handlePrev() {
    if (tab === 0) return;
    goTo((tab - 1) as Tab);
  }

  function handleReset() {
    setTelephone("");
    setTypeClient("");
    setRevenu(0);
    setDureeMois(0);
    setSelectedAgence("");
    setSelectedCategorie("");
    setSelectedMarque("");
    setSelectedProduits([]);
    setPrice(0);
    setErrors({});
    setTouched(false);
    setTab(0);
  }

  async function handleSave() {
    setTouched(true);
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      if (!errs.revenu) {
        setToast({ message: "Veuillez corriger les erreurs avant de sauvegarder.", type: "error" });
      }
      // Navigate to tab containing error
      if (errs.typeClient || errs.revenu || errs.price || errs.dureeMois) {
        goTo(0);
      } else if (errs.telephone) {
        goTo(1);
      }
      return;
    }

    setIsSaving(true);
    try {
      const agenceName =
        data.agences.find((a) => a.CODE === selectedAgence)?.AGENCE ?? "";

      const payload = {
        telephone,
        typeClient,
        tauxProfit,
        revenu,
        dureeMois,
        agence: agenceName,
        categorie: selectedCategorie,
        marque: isMeuble ? "" : selectedMarque,
        produit: selectedProduits.join(", "),
        price,
        pointsDeVente: pdvString,
      };

      const res = await fetch("/api/simulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        setToast({ message: json.error ?? "Erreur lors de la sauvegarde.", type: "error" });
      } else if (!json.saved) {
        // Alert the user that Google Sheets credentials are not configured on the server
        setToast({ message: json.message, type: "error" });
      } else {
        setToast({ message: json.message, type: "success" });
      }
    } catch {
      setToast({ message: "Erreur réseau. Veuillez réessayer.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  }

  // Live clear errors as fields are filled / corrected
  useEffect(() => {
    setErrors((prev) => {
      let changed = false;
      const next = { ...prev };

      // Clear typeClient error as soon as client chooses a type
      if (typeClient && next.typeClient) {
        delete next.typeClient;
        changed = true;
      }

      // Clear revenu error as soon as revenu >= 36 000
      if (revenu >= 36000 && next.revenu) {
        delete next.revenu;
        changed = true;
      }

      // Clear price error as soon as price > 0
      if (price > 0 && next.price) {
        delete next.price;
        changed = true;
      }

      // Clear dureeMois error as soon as dureeMois > 0
      if (dureeMois > 0 && next.dureeMois) {
        delete next.dureeMois;
        changed = true;
      }

      // Clear telephone error as soon as phone is valid (10 digits starting with 05, 06, 07)
      if (telephone && /^(05|06|07)\d{8}$/.test(telephone) && next.telephone) {
        delete next.telephone;
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [typeClient, revenu, price, dureeMois, telephone]);

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Tab header */}
      <div className="flex gap-1 mb-4 sm:mb-6 bg-gray-100 rounded-2xl p-1 shadow-inner">
        {TAB_LABELS.map(({ label, icon: Icon }, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx as Tab)}
            className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl font-semibold transition-all cursor-pointer ${
              tab === idx
                ? "bg-white text-[#6A1B9A] shadow-xs"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs truncate">{label}</span>
          </button>
        ))}
      </div>

      {/* Animated tab content */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3.5 sm:p-5 min-h-[380px] sm:min-h-[420px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={tab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {/* TAB 0: Info Client (Income, Price, Duration, Client Type) */}
            {tab === 0 && (
              <Tab1InfoClient
                typeClient={typeClient}
                onTypeClientChange={setTypeClient}
                revenu={revenu}
                onRevenuChange={setRevenu}
                price={price}
                onPriceChange={setPrice}
                dureeMois={dureeMois}
                onDureeMoisChange={setDureeMois}
                typesClient={data.typesClient}
                errors={{
                  telephone: errors.telephone,
                  typeClient: errors.typeClient,
                  revenu: errors.revenu,
                  price: errors.price,
                  dureeMois: errors.dureeMois,
                }}
              />
            )}

            {/* TAB 1: Détail Simulation (Phone Gate + Redesigned Financial Results + Note to Partners) */}
            {tab === 1 && (
              <Tab3DetailSimulation
                results={results}
                price={price}
                revenu={revenu}
                typeClient={typeClient}
                dureeMois={dureeMois}
                tauxProfit={tauxProfit}
                telephone={telephone}
                onTelephoneChange={setTelephone}
                telephoneError={errors.telephone}
                onNavigateToPartners={() => goTo(2)}
                selectedAgence={selectedAgence}
                selectedCategorie={selectedCategorie}
                selectedMarque={selectedMarque}
                pdvs={data.pdvs}
                couverture={data.couverture}
                onExportPdf={() => setIsPdfModalOpen(true)}
                isExportReady={isExportReady}
                missingFields={missingFields}
              />
            )}

            {/* TAB 2: Nos Partenaires (Formerly Produit, now 3rd page & optional) */}
            {tab === 2 && (
              <Tab2Produit
                agences={data.agences}
                categories={data.categories}
                marques={data.marques}
                produits={data.produits}
                pdvs={data.pdvs}
                couverture={data.couverture}
                selectedAgence={selectedAgence}
                onAgenceChange={setSelectedAgence}
                selectedCategorie={selectedCategorie}
                onCategorieChange={setSelectedCategorie}
                selectedMarque={selectedMarque}
                onMarqueChange={setSelectedMarque}
                selectedProduits={selectedProduits}
                onProduitsChange={setSelectedProduits}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center gap-2 sm:gap-3 mt-4 flex-wrap">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={tab === 0}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-gray-200 text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Next & Save Actions */}
        {tab === 0 && (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all cursor-pointer"
          >
            Suivant : Détail Simulation
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {tab === 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(2)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border-2 border-purple-200 text-[#6A1B9A] hover:bg-purple-50 hover:border-purple-300 transition-all cursor-pointer"
            >
              Nos Partenaires
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Enregistrement…
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        )}

        {tab === 2 && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Enregistrement…
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enregistrer
              </>
            )}
          </button>
        )}
      </div>

      {/* PDF Modal */}
      <SimulationPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        telephone={telephone}
        typeClient={typeClient}
        revenu={revenu}
        dureeMois={dureeMois}
        tauxProfit={tauxProfit}
        price={price}
        results={results}
        selectedAgence={selectedAgence}
        agences={data.agences}
        selectedCategorie={selectedCategorie}
        selectedMarque={selectedMarque}
        selectedProduits={selectedProduits}
        pdvs={data.pdvs}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
