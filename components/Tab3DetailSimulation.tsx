"use client";

import React from "react";
import {
  Phone,
  Lock,
  Store,
  Download,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calculator,
} from "lucide-react";
import { formatDZD } from "@/lib/calculations";
import type { SimulationResults } from "@/lib/calculations";
import type { PointDeVente, CouvertureAgence } from "@/data/fallbackData";

interface Tab3DetailSimulationProps {
  // Client & Calculation Data
  results: SimulationResults;
  price: number;
  revenu: number;
  typeClient: string;
  dureeMois: number;
  tauxProfit: number;

  // Phone Gate State
  telephone: string;
  onTelephoneChange: (v: string) => void;
  telephoneError?: string;

  // Navigation to Partners
  onNavigateToPartners?: () => void;

  // PDV optional props
  selectedAgence?: string;
  selectedCategorie?: string;
  selectedMarque?: string;
  pdvs?: PointDeVente[];
  couverture?: CouvertureAgence[];

  // PDF export props
  onExportPdf?: () => void;
  isExportReady?: boolean;
  missingFields?: string[];
}

export default function Tab3DetailSimulation({
  results,
  price,
  revenu,
  typeClient,
  dureeMois,
  tauxProfit,
  telephone,
  onTelephoneChange,
  telephoneError,
  onNavigateToPartners,
  onExportPdf,
  isExportReady = false,
  missingFields = [],
}: Tab3DetailSimulationProps) {
  // Validate Algerian mobile phone: 10 digits starting with 05, 06, or 07
  const isPhoneValid = /^(05|06|07)\d{8}$/.test(telephone.trim());

  // Check if monthly installment is within debt capacity (max 30% of net income)
  const isWithinCapacity =
    results.mensualiteMax > 0 &&
    results.mensualite <= results.mensualiteMax + 1;

  const totalARembourser = results.montantAFinancer + results.margeBeneficiaire;

  return (
    <div className="space-y-4 sm:space-y-5 w-full">
      {/* ─── Top Context Summary Chips ────────────────────────────── */}
      <div className="bg-gradient-to-r from-purple-50 via-slate-50 to-fuchsia-50 p-3 sm:p-3.5 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-[#6A1B9A] font-bold shadow-2xs">
            {typeClient || "Client standard"}
          </span>
          <span className="text-gray-500 font-medium">
            Salaire: <strong className="text-gray-800">{formatDZD(revenu)}</strong>
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 font-medium">
            Prix du bien: <strong className="text-gray-800">{formatDZD(price)}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-purple-100/70 text-[#6A1B9A] font-semibold text-[11px]">
            {dureeMois} mois
          </span>
          <span className="px-2 py-0.5 rounded-md bg-purple-100/70 text-[#6A1B9A] font-semibold text-[11px]">
            Taux: {(tauxProfit * 100).toFixed(2).replace(".", ",")}%
          </span>
        </div>
      </div>

      {/* ─── PHONE NUMBER GATE SECTION ───────────────────────────── */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
          isPhoneValid
            ? "border-emerald-300/80 bg-gradient-to-r from-emerald-50/40 via-white to-teal-50/30 shadow-xs"
            : "border-[#6A1B9A]/30 bg-gradient-to-r from-purple-50/60 via-white to-fuchsia-50/40 shadow-sm"
        }`}
      >
        <div className="space-y-2">
          {/* Header Message Above Phone Field */}
          <div className="flex items-start gap-2.5">
            <div
              className={`p-2 rounded-xl shrink-0 mt-0.5 transition-colors ${
                isPhoneValid
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-purple-100 text-[#6A1B9A]"
              }`}
            >
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <label
                htmlFor="phone-sim-input"
                className="block text-xs sm:text-sm font-bold text-gray-900 leading-snug cursor-pointer"
              >
                Renseignez votre numéro de téléphone pour afficher les résultats de la simulation
              </label>
              <p className="text-[11px] sm:text-xs text-[#6A1B9A] font-medium mt-0.5" dir="rtl">
                يرجى إدخال رقم الهاتف لعرض تفاصيل ونتائج المحاكاة
              </p>
            </div>
          </div>

          {/* Phone Input Box */}
          <div className="relative mt-2">
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs sm:text-sm font-semibold text-gray-400 select-none pointer-events-none">
                🇩🇿 +213
              </span>
              <input
                id="phone-sim-input"
                type="tel"
                value={telephone}
                onChange={(e) =>
                  onTelephoneChange(e.target.value.replace(/[^0-9]/g, ""))
                }
                maxLength={10}
                placeholder="05 / 06 / 07 XX XX XX XX"
                className={`w-full pl-20 sm:pl-22 pr-28 sm:pr-32 py-2.5 sm:py-3 border-2 rounded-xl text-sm sm:text-base font-semibold tracking-wide bg-white focus:outline-none transition-all ${
                  isPhoneValid
                    ? "border-emerald-500 focus:ring-2 focus:ring-emerald-300 text-gray-900"
                    : telephone.length > 0
                    ? "border-amber-400 focus:ring-2 focus:ring-amber-200 text-gray-800"
                    : "border-gray-300 focus:border-[#6A1B9A] focus:ring-2 focus:ring-purple-200"
                }`}
              />
              <div className="absolute right-3 flex items-center">
                {isPhoneValid ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Numéro validé
                  </span>
                ) : telephone.length > 0 ? (
                  <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    {telephone.length}/10 chiffres
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-400">10 chiffres requis</span>
                )}
              </div>
            </div>

            {telephoneError && !isPhoneValid && (
              <p className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {telephoneError}
              </p>
            )}
            {telephone.length > 0 && !isPhoneValid && !telephoneError && (
              <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Le numéro doit débuter par 05, 06 ou 07 et comporter exactement 10 chiffres.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ─── CONDITIONAL RESULTS: UNLOCKED ONLY WHEN PHONE IS VALID ─── */}
      {!isPhoneValid ? (
        /* LOCKED TEASER STATE */
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-purple-200/90 bg-gradient-to-b from-purple-50/50 via-slate-50/40 to-white text-center space-y-3 shadow-2xs">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100/80 border border-purple-200 flex items-center justify-center text-[#6A1B9A] shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Résultats de la simulation masqués
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 leading-relaxed">
              Veuillez saisir votre numéro de téléphone valide ci-dessus afin de calculer et débloquer instantanément le montant exact de votre mensualité, l'apport personnel requis et l'attestation téléchargeable.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/60 text-[#6A1B9A] text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            Calcul instantané et confidentiel
          </div>
        </div>
      ) : (
        /* UNLOCKED & MINIMALIST FINANCIAL RESULTS */
        <div className="space-y-4 animate-in fade-in-50 duration-300">
          {/* 1. HERO MENSUALITÉ — Épuré, direct et lisible */}
          <div className="rounded-2xl bg-gradient-to-br from-[#7A1575] via-[#65157F] to-[#4F0F6F] p-5 sm:p-6 text-white text-center shadow-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-purple-100 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              القسط الشهري — Mensualité Estimée
            </span>

            <div className="my-2.5 flex items-baseline justify-center gap-1.5 flex-wrap">
              <span className="text-3xl sm:text-5xl font-black tracking-tight tabular-nums">
                {formatDZD(results.mensualite)}
              </span>
              <span className="text-xs sm:text-sm text-purple-200 font-medium">
                / mois
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-purple-200 flex-wrap">
              <span>Pendant <strong className="text-white">{dureeMois} mois</strong></span>
              <span>•</span>
              {isWithinCapacity ? (
                <span className="inline-flex items-center gap-1 text-emerald-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Conforme à votre capacité
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-amber-300 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Dépasse le plafond recommandé
                </span>
              )}
            </div>
          </div>

          {/* 2. RÉCAPITULATIF MINIMALISTE EN 4 LIGNES CLAIRES */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs divide-y divide-gray-100 overflow-hidden">
            <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-gray-600 font-medium">Votre apport initial (Hamish Jidia)</span>
              </div>
              <span className="font-bold text-amber-700 tabular-nums text-sm sm:text-base">
                {results.hamishJidia === 0 ? "0 د.ج. (100% financé)" : formatDZD(results.hamishJidia)}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6A1B9A] shrink-0" />
                <span className="text-gray-600 font-medium">Montant de financement</span>
              </div>
              <span className="font-bold text-[#6A1B9A] tabular-nums text-sm sm:text-base">
                {formatDZD(results.montantAFinancer)}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-gray-600 font-medium">Marge bénéficiaire de la banque</span>
              </div>
              <span className="font-bold text-gray-700 tabular-nums text-sm sm:text-base">
                {formatDZD(results.margeBeneficiaire)}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs sm:text-sm bg-purple-50/70">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                <span className="font-bold text-gray-900">Capacité maximum de financement</span>
              </div>
              <span className="font-black text-[#6A1B9A] tabular-nums text-base sm:text-lg">
                {formatDZD(results.capaciteEndettement)}
              </span>
            </div>
          </div>

          {/* 4. NOTE TO VIEW PARTNERS ON NEXT PAGE (REQUIREMENT 2) */}
          <div className="p-4 sm:p-5 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 via-fuchsia-50/40 to-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-purple-100 text-[#6A1B9A] shrink-0 mt-0.5 sm:mt-0">
                <Store className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    Nos Partenaires Conventionnés
                  </h4>
                  <span className="text-[10px] font-semibold bg-purple-100 text-[#6A1B9A] px-2 py-0.5 rounded-full">
                    Étape facultative
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Vous pouvez consulter l&apos;ensemble de nos partenaires conventionnés, marques agréées et points de vente à la page suivante (<strong>Nos Partenaires</strong>).
                </p>
              </div>
            </div>
            {onNavigateToPartners && (
              <button
                type="button"
                onClick={onNavigateToPartners}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-purple-300 text-[#6A1B9A] hover:bg-purple-50 hover:border-purple-400 transition-all flex items-center justify-center gap-1.5 shadow-2xs shrink-0 cursor-pointer self-start sm:self-center whitespace-nowrap active:scale-[0.98]"
              >
                Voir nos partenaires
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 5. PDF EXPORT ACTION CARD */}
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
                      ? "Votre numéro est validé. Téléchargez votre fiche officielle de simulation au format PDF A4."
                      : "Complétez les informations pour télécharger le PDF officiel."}
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
        </div>
      )}

      {/* ─── ARABIC WELCOME FOOTER ───────────────────────────────── */}
      <div className="text-center pt-3 border-t border-gray-100">
        <p
          className="text-2xl font-bold text-[#6A1B9A]"
          dir="rtl"
          style={{ fontFamily: "serif" }}
        >
          مرحبا بكم
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Bienvenue — BDL Al Badil • DRE BOUIRA - 841 -
        </p>
      </div>
    </div>
  );
}
