"use client";

import React, { useState } from "react";
import {
  Download,
  X,
  ShieldCheck,
  CheckCircle2,
  User,
  Banknote,
  Store,
  Eye,
  Loader2,
  Building,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { formatDZD } from "@/lib/calculations";
import type { SimulationResults } from "@/lib/calculations";
import type { PointDeVente, Agence, CheckListItem } from "@/data/fallbackData";
import { toPng } from "html-to-image";
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
}: SimulationPdfModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Always reset scroll to the very top whenever the modal opens
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
        }
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  // Primary PDV info
  const primaryPdv = pdvs && pdvs.length > 0 ? pdvs[0] : null;

  // Ultra-crisp A4 PDF Generator using native browser rendering engine
  const handleDownloadPdf = async () => {
    const element = document.getElementById("simulation-pdf-document");
    if (!element) return;

    setIsDownloading(true);
    try {
      // toPng delegates to browser's native SVG/foreignObject pipeline
      // fontEmbedCSS: "" disables slow external network font downloads, generating the PDF instantly
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        fontEmbedCSS: "",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      pdf.save(`Simulation-Smile-Albadil-${telephone || "dossier"}.pdf`);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      {/* Modal Dialog Card */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[94vh] max-h-[920px] flex flex-col overflow-hidden border border-gray-200">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-b border-gray-200 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#6A1B9A]/10 text-[#6A1B9A] rounded-lg">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                Aperçu de la Fiche de Simulation
              </h3>
              <p className="text-xs text-gray-500">
                Document officiel A4 prêt pour le téléchargement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] hover:from-[#761673] hover:to-[#571480] text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-70 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Génération haute qualité…
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
              className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Preview Wrapper with guaranteed top scroll position */}
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-gray-200/70 flex justify-center"
        >
          {/* Paper Shadow Wrapper */}
          <div className="shadow-2xl rounded-xl overflow-hidden bg-white shrink-0 my-auto">
            {/* Clean Document Container (Exact 794x1123 A4 standard ratio) */}
            <div
              id="simulation-pdf-document"
              style={{
                width: "794px",
                minHeight: "1123px",
                boxSizing: "border-box",
              }}
              className="bg-white p-9 flex flex-col justify-between text-gray-800 font-sans"
            >
              {/* TOP HALF: Header, Sections 1, 2, 3, 4 */}
              <div className="space-y-4">
                {/* ─── HEADER ──────────────────────────────────────────────── */}
                <div className="border-b-2 border-[#6A1B9A] pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-[#6A1B9A]">
                          Smile
                        </span>
                        <span
                          className="text-xl font-bold text-[#8A1C86]"
                          dir="rtl"
                          style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
                        >
                          البديل
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-gray-700 tracking-normal mt-0.5">
                        Banque Al Baraka d&apos;Algérie —{" "}
                        <span
                          dir="rtl"
                          style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
                        >
                          بنك البركة الجزائري
                        </span>
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">
                        Direction Régionale d&apos;Exploitation: DRE BOUIRA
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-[#6A1B9A] border border-purple-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#6A1B9A]" />
                        <span>Conforme Chari&apos;a</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-1">
                        Date : <strong className="text-gray-900">{today}</strong>
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        Réf : SIM-{today.replace(/\//g, "")}-{telephone.slice(-4) || "0000"}
                      </p>
                    </div>
                  </div>

                  {/* Title Box */}
                  <div className="mt-3 py-1.5 px-4 bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-100 rounded-lg text-center">
                    <h1 className="text-base font-extrabold text-[#6A1B9A] uppercase tracking-normal">
                      Fiche de Simulation — Mourabaha Consommation
                    </h1>
                    <p
                      className="text-xs text-gray-600 font-semibold mt-0.5"
                      dir="rtl"
                      style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
                    >
                      بطاقة محاكاة تمويل المرابحة للاستهلاك
                    </p>
                  </div>
                </div>

                {/* ─── SECTION 1: CLIENT & AGENCE ──────────────────────────── */}
                <div>
                  <h2 className="text-[11px] font-bold uppercase text-[#6A1B9A] border-b border-purple-100 pb-1 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#6A1B9A]" />
                    1. Identification du Client &amp; de l&apos;Agence
                  </h2>
                  <div className="grid grid-cols-2 gap-2.5 bg-gray-50/80 p-3 rounded-lg border border-gray-200 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">
                        Agence de domiciliation
                      </span>
                      <span className="font-semibold text-gray-900 text-xs">
                        {agenceLabel}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">
                        Numéro de téléphone
                      </span>
                      <span className="font-mono font-bold text-gray-900 text-xs">
                        {telephone || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">
                        Statut / Type de client
                      </span>
                      <span className="font-semibold text-gray-900 text-xs">
                        {typeClient || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">
                        Revenu mensuel net déclaré
                      </span>
                      <span className="font-bold text-gray-900 text-xs">
                        {formatDZD(revenu)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ─── SECTION 2: BIEN & POINT DE VENTE ─────────────────────── */}
                <div>
                  <h2 className="text-[11px] font-bold uppercase text-[#6A1B9A] border-b border-purple-100 pb-1 mb-2 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-[#6A1B9A]" />
                    2. Désignation du Bien &amp; Point de Vente Agréé
                  </h2>
                  <div className="grid grid-cols-3 gap-2.5 bg-gray-50/80 p-3 rounded-lg border border-gray-200 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">
                        Catégorie
                      </span>
                      <span className="font-semibold text-gray-900 text-xs">
                        {selectedCategorie || "Non spécifiée"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">
                        Marque
                      </span>
                      <span className="font-semibold text-gray-900 text-xs">
                        {selectedMarque || "Non spécifiée"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block font-medium">
                        Produit(s)
                      </span>
                      <span className="font-semibold text-gray-900 text-xs">
                        {selectedProduits && selectedProduits.length > 0
                          ? selectedProduits.join(", ")
                          : "Non spécifié"}
                      </span>
                    </div>

                    <div className="col-span-3 pt-2 mt-0.5 border-t border-gray-200 text-xs">
                      <span className="text-[10px] text-gray-500 block font-medium mb-0.5">
                        Magasin / Partenaire conventionné :
                      </span>
                      {primaryPdv ? (
                        <p className="font-medium text-gray-900">
                          <strong>{primaryPdv.Commercial}</strong> — {primaryPdv.Adresse} ({primaryPdv.Wilaya}) — Tél : {primaryPdv.Telephone}
                        </p>
                      ) : (
                        <p className="font-normal text-gray-500 italic">
                          Point de vente partenaire à convenir lors du dépôt du dossier en agence
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ─── SECTION 3: PLAN FINANCIER MOURABAHA ──────────────────── */}
                <div>
                  <h2 className="text-[11px] font-bold uppercase text-[#6A1B9A] border-b border-purple-100 pb-1 mb-2 flex items-center gap-1.5">
                    <Banknote className="w-3.5 h-3.5 text-[#6A1B9A]" />
                    3. Plan Financier Mourabaha
                  </h2>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <tbody>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <td className="py-2 px-3.5 font-medium text-gray-700">
                            Prix total du bien (TTC)
                          </td>
                          <td className="py-2 px-3.5 text-right font-bold text-gray-900 tabular-nums">
                            {formatDZD(price)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3.5 font-medium text-gray-700">
                            Apport personnel client (Hamish Jidia —{" "}
                            <span
                              dir="rtl"
                              style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
                            >
                              هامش الجدية
                            </span>
                            )
                          </td>
                          <td className="py-2 px-3.5 text-right font-bold text-amber-700 tabular-nums">
                            {formatDZD(results.hamishJidia)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <td className="py-2 px-3.5 font-medium text-gray-700">
                            Montant financé par la banque (Financement net)
                          </td>
                          <td className="py-2 px-3.5 text-right font-bold text-[#6A1B9A] tabular-nums">
                            {formatDZD(results.montantAFinancer)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3.5 font-medium text-gray-700">
                            Durée du remboursement
                          </td>
                          <td className="py-2 px-3.5 text-right font-bold text-gray-900">
                            {dureeMois} mois
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <td className="py-2 px-3.5 font-medium text-gray-700">
                            Taux de profit annuel
                          </td>
                          <td className="py-2 px-3.5 text-right font-bold text-gray-900">
                            {(tauxProfit * 100).toFixed(2).replace(".", ",")}%
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2 px-3.5 font-medium text-gray-700">
                            Marge bénéficiaire totale banque
                          </td>
                          <td className="py-2 px-3.5 text-right font-bold text-green-700 tabular-nums">
                            {formatDZD(results.margeBeneficiaire)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <td className="py-2 px-3.5 font-medium text-gray-700">
                            Coût global d&apos;acquisition (Vente à terme)
                          </td>
                          <td className="py-2 px-3.5 text-right font-bold text-gray-900 tabular-nums">
                            {formatDZD(totalCost)}
                          </td>
                        </tr>
                        <tr className="bg-purple-100/70 border-t-2 border-[#6A1B9A]/40">
                          <td className="py-2.5 px-3.5 font-bold text-[#6A1B9A] text-xs sm:text-sm">
                            Mensualité de remboursement (Échéance)
                          </td>
                          <td className="py-2.5 px-3.5 text-right font-black text-[#6A1B9A] text-sm sm:text-base tabular-nums">
                            {formatDZD(results.mensualite)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Ratios Footnote */}
                  <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-gray-600">
                    <span>
                      Capacité d&apos;endettement max (30% salaire) :{" "}
                      <strong className="text-gray-900">{formatDZD(results.capaciteEndettement)}</strong>
                    </span>
                    <span>
                      Ratio d&apos;endettement réel :{" "}
                      <strong className={Number(debtRatio) <= 30 ? "text-emerald-700" : "text-amber-700"}>
                        {debtRatio}%
                      </strong>
                    </span>
                  </div>
                </div>

                {/* ─── SECTION 4: DOSSIER & PIÈCES À FOURNIR ───────────────── */}
                <div>
                  <h2 className="text-[11px] font-bold uppercase text-[#6A1B9A] border-b border-purple-100 pb-1 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6A1B9A]" />
                    4. Principales Pièces à Fournir (Dossier de Financement)
                  </h2>
                  <div className="grid grid-cols-2 gap-2 text-[10px] bg-gray-50/80 p-3 rounded-lg border border-gray-200">
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
              </div>

              {/* ─── FOOTER LEGAL NOTICE (NO SIGNATURES) ─────────────────── */}
              <div className="pt-3 border-t border-gray-200 text-center text-[10px] text-gray-500 leading-tight">
                <p className="font-medium text-gray-600">
                  Document indicatif généré par le simulateur officiel Smile البديل — Ne vaut pas accord définitif de financement.
                </p>
                <p className="mt-0.5 text-gray-400">
                  Banque Al Baraka d&apos;Algérie — Société par Actions au capital de 20.000.000.000 DZD — Siège Social : Alger — www.albaraka-bank.dz
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
