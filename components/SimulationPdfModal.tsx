"use client";

import React, { useState } from "react";
import { Download, X, ShieldCheck, CheckCircle2, User, Banknote, Store, Eye, Loader2 } from "lucide-react";
import { formatDZD } from "@/lib/calculations";
import type { SimulationResults } from "@/lib/calculations";
import type { PointDeVente, Agence, CheckListItem } from "@/data/fallbackData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface SimulationPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Simulation & Client data
  telephone: string;
  typeClient: string;
  revenu: number;
  dureeMois: number;
  tauxProfit: number;
  price: number;
  results: SimulationResults;
  // Product & Agency data
  selectedAgence: string;
  agences: Agence[];
  selectedCategorie: string;
  selectedMarque: string;
  selectedProduits: string[];
  pdvs: PointDeVente[];
  checkList?: CheckListItem[];
}

export default function SimulationPdfModal({
  isOpen,
  onClose,
  telephone,
  typeClient,
  revenu,
  dureeMois,
  tauxProfit,
  price,
  results,
  selectedAgence,
  agences,
  selectedCategorie,
  selectedMarque,
  selectedProduits,
  pdvs,
  checkList = [],
}: SimulationPdfModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString("fr-DZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const agenceObj = agences.find((a) => a.CODE === selectedAgence);
  const agenceLabel = agenceObj
    ? `${agenceObj.CODE} - ${agenceObj.AGENCE}`
    : selectedAgence
    ? selectedAgence
    : "Non spécifiée (Toutes agences Al Baraka)";

  const totalCost = results.montantAFinancer + results.margeBeneficiaire;
  const debtRatio = revenu > 0 ? ((results.mensualite / revenu) * 100).toFixed(1) : "0";

  // Pick primary matching PDV if available
  const primaryPdv = pdvs && pdvs.length > 0 ? pdvs[0] : null;

  // Direct PDF Download Handler (No browser print dialog)
  const handleDownloadPdf = async () => {
    const element = document.getElementById("simulation-pdf-document");
    if (!element) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // 2x high resolution for crisp text & borders
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Simulation-Smile-Albadil-${telephone || "dossier"}.pdf`);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Modal Top Bar (Aperçu + Télécharger) */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#6A1B9A]/10 text-[#6A1B9A] rounded-lg">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">
                Aperçu de l&apos;Attestation de Simulation
              </h3>
              <p className="text-xs text-gray-500">
                Fiche officielle prête à être téléchargée au format PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] hover:from-[#761673] hover:to-[#571480] text-white rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Génération du PDF…
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Télécharger en PDF
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Preview Area */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-gray-100/70 flex justify-center">
          <div
            id="simulation-pdf-document"
            className="bg-white w-full max-w-[210mm] p-8 sm:p-10 shadow-lg border border-gray-200 text-gray-900 text-sm leading-relaxed"
          >
            {/* Header with Bank Logos & Bilingual Title */}
            <div className="border-b-2 border-[#6A1B9A] pb-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-[#6A1B9A]">
                      Smile
                    </span>
                    <span className="text-xl font-bold text-[#8A1C86]" dir="rtl">
                      البديل
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Banque Al Baraka d&apos;Algérie — بنك البركة الجزائري
                  </p>
                  <p className="text-[10px] text-gray-400">
                    Direction Régionale d&apos;Exploitation: DRE BOUIRA
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-[#6A1B9A] border border-purple-200">
                    <ShieldCheck className="w-3 h-3 text-[#6A1B9A]" />
                    Conforme aux préceptes de la Chari&apos;a
                  </span>
                  <p className="text-xs text-gray-500 mt-1.5">
                    Date d&apos;émission : <strong className="text-gray-700">{today}</strong>
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Réf : SIM-{today.replace(/\//g, "")}-{telephone.slice(-4) || "0000"}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 uppercase tracking-wide">
                  Fiche de Simulation — Mourabaha Consommation
                </h1>
                <p className="text-sm text-gray-600 font-semibold mt-0.5" dir="rtl">
                  بطاقة محاكاة تمويل المرابحة للاستهلاك
                </p>
              </div>
            </div>

            {/* Section 1: Client & Agency Identification */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6A1B9A] border-b border-purple-100 pb-1 mb-3 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                1. Identification du Client &amp; de l&apos;Agence
              </h2>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-[11px] text-gray-400 block">Agence de domiciliation</span>
                  <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                    {agenceLabel}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Téléphone du client</span>
                  <span className="font-mono font-semibold text-gray-800 text-xs sm:text-sm">
                    {telephone || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Type de client / Statut</span>
                  <span className="font-semibold text-gray-800 text-xs sm:text-sm">
                    {typeClient || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Revenu mensuel net déclaré</span>
                  <span className="font-bold text-gray-900 text-xs sm:text-sm">
                    {formatDZD(revenu)}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Product & Point of Sale Details */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6A1B9A] border-b border-purple-100 pb-1 mb-3 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5" />
                2. Désignation du Bien &amp; Point de Vente Agréé
              </h2>
              <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <span className="text-[11px] text-gray-400 block">Catégorie</span>
                  <span className="font-semibold text-gray-800 text-xs">
                    {selectedCategorie || "Non spécifiée"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Marque</span>
                  <span className="font-semibold text-gray-800 text-xs">
                    {selectedMarque || "Non spécifiée"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Produit(s)</span>
                  <span className="font-semibold text-gray-800 text-xs">
                    {selectedProduits && selectedProduits.length > 0
                      ? selectedProduits.join(", ")
                      : "Non spécifié"}
                  </span>
                </div>

                <div className="col-span-3 pt-2 mt-1 border-t border-gray-200/60 text-xs">
                  <span className="text-[11px] text-gray-400 block mb-0.5">
                    Magasin / Partenaire conventionné :
                  </span>
                  {primaryPdv ? (
                    <p className="font-medium text-gray-800">
                      🏬 <strong>{primaryPdv.Commercial}</strong> — 📍 {primaryPdv.Adresse} ({primaryPdv.Wilaya}) — 📞 {primaryPdv.Telephone}
                    </p>
                  ) : (
                    <p className="font-normal text-gray-500 italic">
                      🏬 Point de vente partenaire : À convenir lors du dépôt du dossier auprès de votre agence Al Baraka
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Financial Plan & Mourabaha Breakdown */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6A1B9A] border-b border-purple-100 pb-1 mb-3 flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5" />
                3. Plan Financier Mourabaha
              </h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <td className="py-2.5 px-4 font-medium text-gray-600">Prix total du bien (TTC)</td>
                      <td className="py-2.5 px-4 text-right font-bold text-gray-900 tabular-nums">
                        {formatDZD(price)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-4 font-medium text-gray-600">
                        Apport personnel client (Hamish Jidia — هامش الجدية)
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-orange-600 tabular-nums">
                        {formatDZD(results.hamishJidia)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <td className="py-2.5 px-4 font-medium text-gray-600">
                        Montant financé par la banque (Financement net)
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-[#6A1B9A] tabular-nums">
                        {formatDZD(results.montantAFinancer)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-4 font-medium text-gray-600">Durée du remboursement</td>
                      <td className="py-2.5 px-4 text-right font-bold text-gray-900">
                        {dureeMois} mois
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <td className="py-2.5 px-4 font-medium text-gray-600">Taux de profit annuel</td>
                      <td className="py-2.5 px-4 text-right font-bold text-gray-900">
                        {(tauxProfit * 100).toFixed(2).replace(".", ",")}%
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-4 font-medium text-gray-600">Marge bénéficiaire totale banque</td>
                      <td className="py-2.5 px-4 text-right font-bold text-green-700 tabular-nums">
                        {formatDZD(results.margeBeneficiaire)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <td className="py-2.5 px-4 font-medium text-gray-600">Coût global d&apos;acquisition (Vente à terme)</td>
                      <td className="py-2.5 px-4 text-right font-bold text-gray-900 tabular-nums">
                        {formatDZD(totalCost)}
                      </td>
                    </tr>
                    <tr className="bg-purple-50/70 border-t-2 border-[#6A1B9A]/30">
                      <td className="py-3 px-4 font-bold text-[#6A1B9A] text-sm">
                        Mensualité de remboursement (Échéance)
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-[#6A1B9A] text-base tabular-nums">
                        {formatDZD(results.mensualite)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Ratios footnote */}
              <div className="flex items-center justify-between mt-2.5 px-1 text-[11px] text-gray-500">
                <span>
                  Capacité d&apos;endettement max (30% du salaire) :{" "}
                  <strong className="text-gray-700">{formatDZD(results.capaciteEndettement)}</strong>
                </span>
                <span>
                  Ratio d&apos;endettement réel :{" "}
                  <strong className={Number(debtRatio) <= 30 ? "text-emerald-700" : "text-amber-700"}>
                    {debtRatio}%
                  </strong>
                </span>
              </div>
            </div>

            {/* Section 4: Required Checklist */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6A1B9A] border-b border-purple-100 pb-1 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                4. Principales Pièces à Fournir (Dossier de Financement)
              </h2>
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                <div className="flex items-start gap-1.5">
                  <span className="text-[#6A1B9A] font-bold">✓</span>
                  <span>Copie de la pièce d&apos;identité nationale en cours de validité</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#6A1B9A] font-bold">✓</span>
                  <span>Facture proforma originale délivrée par le point de vente agréé</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#6A1B9A] font-bold">✓</span>
                  <span>Fiches de paie des trois (03) derniers mois ou relevé des émoluments</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#6A1B9A] font-bold">✓</span>
                  <span>Certificat de résidence de moins de trois (03) mois</span>
                </div>
              </div>
            </div>

            {/* Signatures & Footer Notice */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <p className="font-semibold text-gray-600 mb-12">
                    Signature du Client / Bénéficiaire
                  </p>
                  <p className="text-[10px] text-gray-400 italic">
                    « Lu et approuvé — Pour accord de principe »
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600 mb-12">
                    Cachet et Signature de l&apos;Agence
                  </p>
                  <p className="text-[10px] text-gray-400 italic">
                    Banque Al Baraka d&apos;Algérie
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-3 border-t border-gray-100 text-center text-[10px] text-gray-400 leading-tight">
                <p>
                  Document indicatif généré par le simulateur Smile البديل — Ne vaut pas accord définitif de financement.
                </p>
                <p className="mt-0.5">
                  Banque Al Baraka d&apos;Algérie — Société par Actions au capital de 20.000.000.000 DZD — Siège Social : Alger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
