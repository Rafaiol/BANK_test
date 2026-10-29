"use client";

import React from "react";
import { Banknote, TrendingDown, CreditCard, BarChart3, Wallet, Download } from "lucide-react";
import { formatDZD } from "@/lib/calculations";
import type { SimulationResults } from "@/lib/calculations";
import PDVTable from "@/components/PDVTable";
import type { PointDeVente, CouvertureAgence } from "@/data/fallbackData";

interface Tab3DetailSimulationProps {
  results: SimulationResults;
  price: number;
  typeClient: string;
  dureeMois: number;
  tauxProfit: number;
  // PDV props
  selectedAgence: string;
  selectedCategorie: string;
  selectedMarque: string;
  pdvs: PointDeVente[];
  couverture: CouvertureAgence[];
  // PDF export props
  onExportPdf?: () => void;
  isExportReady?: boolean;
  missingFields?: string[];
}

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
  description?: string;
}

function ResultCard({ icon, label, value, highlight, description }: ResultCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border ${
        highlight
          ? "border-[#6A1B9A]/30 bg-gradient-to-r from-purple-50 to-violet-50"
          : "border-gray-100 bg-white"
      } shadow-sm`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            highlight ? "bg-[#6A1B9A]/10" : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 leading-none mb-1">{label}</p>
          {description && (
            <p className="text-[10px] text-gray-400">{description}</p>
          )}
        </div>
      </div>
      <span
        className={`text-base font-bold tabular-nums ${
          highlight ? "text-[#6A1B9A]" : "text-gray-800"
        }`}
      >
        {formatDZD(value)}
      </span>
    </div>
  );
}

export default function Tab3DetailSimulation({
  results,
  price,
  typeClient,
  dureeMois,
  tauxProfit,
  selectedAgence,
  selectedCategorie,
  selectedMarque,
  pdvs,
  couverture,
  onExportPdf,
  isExportReady = false,
  missingFields = [],
}: Tab3DetailSimulationProps) {
  // PDV filtering (same logic as Tab 2)
  const filteredPDVs = React.useMemo((): PointDeVente[] => {
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

  return (
    <div className="space-y-4">
      {/* Summary banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] p-4 text-white shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-purple-200 text-xs">Type client</p>
            <p className="font-semibold text-sm">{typeClient || "—"}</p>
          </div>
          <div className="text-right">
            <p className="text-purple-200 text-xs">Durée</p>
            <p className="font-semibold text-sm">{dureeMois} mois</p>
          </div>
          <div className="text-right">
            <p className="text-purple-200 text-xs">Taux</p>
            <p className="font-semibold text-sm">
              {(tauxProfit * 100).toFixed(2).replace(".", ",")}%
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-2 mt-2 flex items-center justify-between">
          <p className="text-purple-200 text-xs">Prix demandé</p>
          <p className="font-bold text-lg">{formatDZD(price)}</p>
        </div>
      </div>

      {/* Results grid */}
      <div className="space-y-2">
        <ResultCard
          icon={<Banknote className="w-4 h-4 text-[#6A1B9A]" />}
          label="Montant à financer"
          value={results.montantAFinancer}
          highlight
          description="Montant financé par la banque"
        />
        <ResultCard
          icon={<TrendingDown className="w-4 h-4 text-orange-500" />}
          label="Hamish Jidia (Apport personnel)"
          value={results.hamishJidia}
          description="Autofinancement client"
        />
        <ResultCard
          icon={<CreditCard className="w-4 h-4 text-blue-500" />}
          label="Mensualité"
          value={results.mensualite}
          highlight
          description="Paiement mensuel"
        />
        <ResultCard
          icon={<BarChart3 className="w-4 h-4 text-green-500" />}
          label="Marge bénéficiaire"
          value={results.margeBeneficiaire}
          description="Profit bancaire total"
        />
        <ResultCard
          icon={<Wallet className="w-4 h-4 text-teal-500" />}
          label="Capacité d'endettement"
          value={results.capaciteEndettement}
          description="Capacité de remboursement max (30% revenu)"
        />
      </div>

      {/* PDF Export Action Card */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isExportReady
            ? "bg-gradient-to-r from-purple-50/80 via-white to-fuchsia-50/60 border-purple-200 shadow-sm"
            : "bg-gray-50/90 border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
                isExportReady
                  ? "bg-[#6A1B9A] text-white shadow-md shadow-purple-500/25"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <Download className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap mb-1">
                <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-tight">
                  Attestation de Simulation
                </h4>
                {isExportReady ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap shrink-0 border border-emerald-200/60 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Prêt à télécharger
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 whitespace-nowrap shrink-0 border border-amber-200/60">
                    Champs incomplets
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {isExportReady
                  ? "Tous les champs obligatoires sont validés. Ouvrez l'aperçu et téléchargez votre fiche officielle au format PDF A4."
                  : "Complétez les informations client (téléphone, type client, revenu, prix, durée) pour télécharger le PDF."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExportPdf}
            disabled={!isExportReady}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shrink-0 whitespace-nowrap ${
              isExportReady
                ? "bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] hover:from-[#761673] hover:to-[#571480] text-white shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300 opacity-60"
            }`}
          >
            <Download className="w-4 h-4" />
            Télécharger le PDF
          </button>
        </div>

        {!isExportReady && missingFields.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-gray-200/80 text-[11px] text-amber-800 flex flex-wrap items-center gap-1.5">
            <span className="font-semibold">À renseigner :</span>
            {missingFields.map((f, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-medium"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* PDV summary if available */}
      <PDVTable pdvs={filteredPDVs} title="Points de Vente disponibles" />

      {/* Arabic footer */}
      <div className="text-center pt-4 border-t border-gray-100">
        <p
          className="text-2xl font-bold text-[#6A1B9A]"
          dir="rtl"
          style={{ fontFamily: "serif" }}
        >
          مرحبا بكم
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Bienvenue — Smile البديل
        </p>
      </div>
    </div>
  );
}
