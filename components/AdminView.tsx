"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Shield,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  Database,
  Users,
  Building2,
  MapPin,
  Tag,
  Briefcase,
  Store,
  FileCheck,
  History,
  RefreshCw,
} from "lucide-react";
import Toast from "@/components/Toast";
import type {
  Agence,
  CouvertureAgence,
  TypeClient,
  Categorie,
  Marque,
  Produit,
  PointDeVente,
  CheckListItem,
} from "@/data/fallbackData";

interface AdminData {
  agences: Agence[];
  couverture: CouvertureAgence[];
  typesClient: TypeClient[];
  categories: Categorie[];
  marques: Marque[];
  produits: Produit[];
  pdvs: PointDeVente[];
  checkList: CheckListItem[];
}

interface AdminViewProps {
  initialData: AdminData;
  onDataUpdated?: (newData: AdminData) => void;
}

type TableKey =
  | "typesClient"
  | "agences"
  | "couverture"
  | "categories"
  | "marques"
  | "produits"
  | "pdvs"
  | "checkList"
  | "simulations";

const TABLES_CONFIG: { key: TableKey; label: string; icon: any }[] = [
  { key: "typesClient", label: "Types Client & Taux", icon: Users },
  { key: "agences", label: "Agences", icon: Building2 },
  { key: "couverture", label: "Couverture Wilayas", icon: MapPin },
  { key: "categories", label: "Catégories", icon: Tag },
  { key: "marques", label: "Marques", icon: Briefcase },
  { key: "produits", label: "Produits", icon: Database },
  { key: "pdvs", label: "Points de Vente", icon: Store },
  { key: "checkList", label: "Check-List", icon: FileCheck },
  { key: "simulations", label: "Simulations Enregistrées", icon: History },
];

export default function AdminView({ initialData, onDataUpdated }: AdminViewProps) {
  const [activeTable, setActiveTable] = useState<TableKey>("typesClient");
  const [search, setSearch] = useState("");
  const [connected, setConnected] = useState<boolean>(false);
  const [sheetId, setSheetId] = useState<string>("");
  const [sheetUrl, setSheetUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Editable copies
  const [tablesData, setTablesData] = useState<AdminData>(initialData);
  const [simulations, setSimulations] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Fetch connection status and current sheet data
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/sheet");
      const json = await res.json();
      if (res.ok) {
        setConnected(json.connected);
        setSheetId(json.sheetId);
        setSheetUrl(json.sheetUrl);
        if (json.data) {
          setTablesData(json.data);
          onDataUpdated?.(json.data);
        }
        if (json.simulations) {
          setSimulations(json.simulations);
        }
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Update cell in current table
  const handleCellChange = (index: number, field: string, value: any) => {
    if (activeTable === "simulations") return; // read-only history
    setTablesData((prev) => {
      const list = [...(prev[activeTable] as any[])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [activeTable]: list };
    });
    setHasChanges(true);
  };

  // Add new row to current table
  const handleAddRow = () => {
    if (activeTable === "simulations") return;
    let newRow: any = {};
    switch (activeTable) {
      case "typesClient":
        newRow = { NOM_TYPE_CLIENT: "Nouveau Type", TAUX_DE_PROFIT: 0.065 };
        break;
      case "agences":
        newRow = { CODE: "CODE_01", AGENCE: "Nouvelle Agence" };
        break;
      case "couverture":
        newRow = { CODE_AGENCE: "01", NOM_AGENCE: "Agence", WILAYA: "Wilaya" };
        break;
      case "categories":
        newRow = { CATEGORIE: "Nouvelle Catégorie" };
        break;
      case "marques":
        newRow = { MARQUE: "Nouvelle Marque", LOGO: "" };
        break;
      case "produits":
        newRow = { ID_PRODUIT: "PROD_01", CATEGORIE: "", MARQUE: "", PRODUIT_GENERIQUE: "" };
        break;
      case "pdvs":
        newRow = {
          ID_PDV: "PDV_01",
          CATEGORIE: "",
          MARQUE: "",
          Commercial: "",
          Adresse: "",
          Wilaya: "",
          Telephone: "",
        };
        break;
      case "checkList":
        newRow = { fr: "Nouveau document requis", ar: "وثيقة جديدة مطلوبة" };
        break;
    }

    setTablesData((prev) => ({
      ...prev,
      [activeTable]: [newRow, ...(prev[activeTable] as any[])],
    }));
    setHasChanges(true);
  };

  // Delete row
  const handleDeleteRow = (index: number) => {
    if (activeTable === "simulations") return;
    setTablesData((prev) => {
      const list = [...(prev[activeTable] as any[])];
      list.splice(index, 1);
      return { ...prev, [activeTable]: list };
    });
    setHasChanges(true);
  };

  // Save changes to Google Sheets
  const handleSave = async () => {
    if (activeTable === "simulations") return;
    setIsSaving(true);
    try {
      const payload = {
        tableKey: activeTable,
        data: tablesData[activeTable],
      };

      const res = await fetch("/api/admin/sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setToast({ message: json.message, type: "success" });
        setHasChanges(false);
        onDataUpdated?.(tablesData);
      } else {
        setToast({
          message: json.error || "Erreur lors de l'enregistrement.",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "Erreur de connexion serveur.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered rows for current table
  const currentRows = useMemo(() => {
    if (activeTable === "simulations") {
      if (!search.trim()) return simulations;
      const q = search.toLowerCase();
      return simulations.filter((s) =>
        Object.values(s).some((val) => String(val).toLowerCase().includes(q)),
      );
    }

    const list = (tablesData[activeTable] as any[]) || [];
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q)),
    );
  }, [activeTable, tablesData, simulations, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-xl text-[#6A1B9A]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Panneau d&apos;Administration
                </h1>
                <p className="text-xs text-gray-500">
                  Gestion directe des données du simulateur et synchronisation Google Sheets
                </p>
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex flex-wrap items-center gap-2">
            {connected ? (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Connecté à Google Sheets</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Mode Prévisualisation Locale</span>
              </div>
            )}

            <button
              onClick={loadAdminData}
              disabled={isLoading}
              title="Rafraîchir les données"
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Free Tier Notice */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>
              <strong>Quota Free Tier préservé :</strong> Requêtes groupées (BatchGet), cache mémoire serveur et enregistrement en une seule transaction.
            </span>
          </div>
          <span className="text-gray-400 font-mono text-[11px]">
            ID Feuille : {sheetId || "1Jf0j1qNw7zEGrlWaddO8Y1A2F-6ls76NASdEz_8tWh8"}
          </span>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {TABLES_CONFIG.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              setActiveTable(key);
              setSearch("");
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTable === key
                ? "bg-[#6A1B9A] text-white shadow-sm"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
            {key !== "simulations" && (
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTable === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {(tablesData[key as keyof AdminData] as any[])?.length || 0}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table Content & Actions Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Top Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans cette table..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex items-center gap-2">
            {activeTable !== "simulations" && (
              <>
                <button
                  onClick={handleAddRow}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 text-[#6A1B9A] hover:bg-purple-100 transition-all border border-purple-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une ligne</span>
                </button>

                <button
                  onClick={() => {
                    loadAdminData();
                    setHasChanges(false);
                  }}
                  disabled={!hasChanges}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Annuler</span>
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving || !hasChanges}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] text-white shadow-md hover:shadow-lg disabled:opacity-40 transition-all"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Enregistrer dans la feuille</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Change Indicator Alert */}
        {hasChanges && (
          <div className="px-4 py-2 bg-purple-50 border-b border-purple-100 text-xs text-[#6A1B9A] flex items-center justify-between">
            <span>⚠️ Vous avez des modifications en attente d&apos;enregistrement pour cette table.</span>
            <span className="font-semibold underline cursor-pointer" onClick={handleSave}>
              Enregistrer maintenant
            </span>
          </div>
        )}

        {/* Table View */}
        <div className="overflow-x-auto max-h-[550px] scrollbar-thin">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="sticky top-0 bg-gray-100 text-gray-700 font-semibold z-10 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2.5 w-12 text-center text-gray-400">#</th>
                {activeTable === "typesClient" && (
                  <>
                    <th className="px-4 py-2.5">Nom Type Client</th>
                    <th className="px-4 py-2.5">Taux de Profit (décimal)</th>
                    <th className="px-4 py-2.5">Taux Affiché (%)</th>
                  </>
                )}
                {activeTable === "agences" && (
                  <>
                    <th className="px-4 py-2.5">Code</th>
                    <th className="px-4 py-2.5">Nom Agence</th>
                  </>
                )}
                {activeTable === "couverture" && (
                  <>
                    <th className="px-4 py-2.5">Code Agence</th>
                    <th className="px-4 py-2.5">Nom Agence</th>
                    <th className="px-4 py-2.5">Wilaya Couverte</th>
                  </>
                )}
                {activeTable === "categories" && (
                  <>
                    <th className="px-4 py-2.5">Nom de la Catégorie</th>
                  </>
                )}
                {activeTable === "marques" && (
                  <>
                    <th className="px-4 py-2.5">Nom de la Marque</th>
                    <th className="px-4 py-2.5">Logo (URL ou texte)</th>
                  </>
                )}
                {activeTable === "produits" && (
                  <>
                    <th className="px-4 py-2.5">ID Produit</th>
                    <th className="px-4 py-2.5">Catégorie</th>
                    <th className="px-4 py-2.5">Marque</th>
                    <th className="px-4 py-2.5">Produit Générique</th>
                  </>
                )}
                {activeTable === "pdvs" && (
                  <>
                    <th className="px-3 py-2.5">ID PDV</th>
                    <th className="px-3 py-2.5">Catégorie</th>
                    <th className="px-3 py-2.5">Marque</th>
                    <th className="px-3 py-2.5">Commercial</th>
                    <th className="px-3 py-2.5">Adresse</th>
                    <th className="px-3 py-2.5">Wilaya</th>
                    <th className="px-3 py-2.5">Téléphone</th>
                  </>
                )}
                {activeTable === "checkList" && (
                  <>
                    <th className="px-4 py-2.5">Document Requis (Français)</th>
                    <th className="px-4 py-2.5 text-right" dir="rtl">الوثيقة المطلوبة (العربية)</th>
                  </>
                )}
                {activeTable === "simulations" && (
                  <>
                    <th className="px-3 py-2.5">ID</th>
                    <th className="px-3 py-2.5">Date</th>
                    <th className="px-3 py-2.5">Téléphone</th>
                    <th className="px-3 py-2.5">Client</th>
                    <th className="px-3 py-2.5">Revenu</th>
                    <th className="px-3 py-2.5">Prix</th>
                    <th className="px-3 py-2.5">Durée</th>
                    <th className="px-3 py-2.5">Mensualité</th>
                  </>
                )}
                {activeTable !== "simulations" && (
                  <th className="px-3 py-2.5 w-14 text-center">Action</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-400">
                    Aucune ligne trouvée.
                  </td>
                </tr>
              ) : (
                currentRows.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-3 py-2 text-center text-gray-400 font-mono text-[10px]">
                      {idx + 1}
                    </td>

                    {/* TYPES CLIENT */}
                    {activeTable === "typesClient" && (
                      <>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.NOM_TYPE_CLIENT}
                            onChange={(e) =>
                              handleCellChange(idx, "NOM_TYPE_CLIENT", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="number"
                            step="0.005"
                            value={row.TAUX_DE_PROFIT}
                            onChange={(e) =>
                              handleCellChange(
                                idx,
                                "TAUX_DE_PROFIT",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-4 py-1.5 font-semibold text-purple-700">
                          {(row.TAUX_DE_PROFIT * 100).toFixed(2).replace(".", ",")}%
                        </td>
                      </>
                    )}

                    {/* AGENCES */}
                    {activeTable === "agences" && (
                      <>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.CODE}
                            onChange={(e) => handleCellChange(idx, "CODE", e.target.value)}
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white font-mono"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.AGENCE}
                            onChange={(e) => handleCellChange(idx, "AGENCE", e.target.value)}
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                      </>
                    )}

                    {/* COUVERTURE */}
                    {activeTable === "couverture" && (
                      <>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.CODE_AGENCE}
                            onChange={(e) =>
                              handleCellChange(idx, "CODE_AGENCE", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white font-mono"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.NOM_AGENCE}
                            onChange={(e) =>
                              handleCellChange(idx, "NOM_AGENCE", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.WILAYA}
                            onChange={(e) =>
                              handleCellChange(idx, "WILAYA", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                      </>
                    )}

                    {/* CATEGORIES */}
                    {activeTable === "categories" && (
                      <td className="px-4 py-1.5">
                        <input
                          type="text"
                          value={row.CATEGORIE}
                          onChange={(e) =>
                            handleCellChange(idx, "CATEGORIE", e.target.value)
                          }
                          className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                        />
                      </td>
                    )}

                    {/* MARQUES */}
                    {activeTable === "marques" && (
                      <>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.MARQUE}
                            onChange={(e) =>
                              handleCellChange(idx, "MARQUE", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.LOGO ?? ""}
                            onChange={(e) => handleCellChange(idx, "LOGO", e.target.value)}
                            placeholder="URL ou vide"
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                      </>
                    )}

                    {/* PRODUITS */}
                    {activeTable === "produits" && (
                      <>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.ID_PRODUIT}
                            onChange={(e) =>
                              handleCellChange(idx, "ID_PRODUIT", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white font-mono text-xs"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.CATEGORIE}
                            onChange={(e) =>
                              handleCellChange(idx, "CATEGORIE", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.MARQUE}
                            onChange={(e) =>
                              handleCellChange(idx, "MARQUE", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.PRODUIT_GENERIQUE}
                            onChange={(e) =>
                              handleCellChange(idx, "PRODUIT_GENERIQUE", e.target.value)
                            }
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                      </>
                    )}

                    {/* POINTS DE VENTE */}
                    {activeTable === "pdvs" && (
                      <>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={row.ID_PDV}
                            onChange={(e) =>
                              handleCellChange(idx, "ID_PDV", e.target.value)
                            }
                            className="w-full px-1.5 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white font-mono text-[11px]"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={row.CATEGORIE}
                            onChange={(e) =>
                              handleCellChange(idx, "CATEGORIE", e.target.value)
                            }
                            className="w-full px-1.5 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={row.MARQUE}
                            onChange={(e) =>
                              handleCellChange(idx, "MARQUE", e.target.value)
                            }
                            className="w-full px-1.5 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={row.Commercial}
                            onChange={(e) =>
                              handleCellChange(idx, "Commercial", e.target.value)
                            }
                            className="w-full px-1.5 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={row.Adresse}
                            onChange={(e) =>
                              handleCellChange(idx, "Adresse", e.target.value)
                            }
                            className="w-full px-1.5 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={row.Wilaya}
                            onChange={(e) =>
                              handleCellChange(idx, "Wilaya", e.target.value)
                            }
                            className="w-full px-1.5 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="text"
                            value={row.Telephone}
                            onChange={(e) =>
                              handleCellChange(idx, "Telephone", e.target.value)
                            }
                            className="w-full px-1.5 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white font-mono text-[11px]"
                          />
                        </td>
                      </>
                    )}

                    {/* CHECK-LIST */}
                    {activeTable === "checkList" && (
                      <>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.fr}
                            onChange={(e) => handleCellChange(idx, "fr", e.target.value)}
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white"
                          />
                        </td>
                        <td className="px-4 py-1.5">
                          <input
                            type="text"
                            value={row.ar}
                            dir="rtl"
                            onChange={(e) => handleCellChange(idx, "ar", e.target.value)}
                            className="w-full px-2 py-1 rounded border border-gray-200 focus:outline-none focus:border-purple-400 bg-white text-right"
                          />
                        </td>
                      </>
                    )}

                    {/* SIMULATIONS (READ-ONLY) */}
                    {activeTable === "simulations" && (
                      <>
                        <td className="px-3 py-2 font-mono text-[#6A1B9A] font-semibold">
                          {row.id}
                        </td>
                        <td className="px-3 py-2 text-gray-500">{row.date}</td>
                        <td className="px-3 py-2 font-mono">
                          {row.telephone ? (
                            <span className="text-gray-900 font-medium">{row.telephone}</span>
                          ) : (
                            <span className="text-gray-300 font-sans italic text-xs">—</span>
                          )}
                        </td>
                        <td className="px-3 py-2">{row.typeClient}</td>
                        <td className="px-3 py-2">{Number(row.revenu || 0).toLocaleString()} د.ج.</td>
                        <td className="px-3 py-2 font-semibold">{Number(row.price || 0).toLocaleString()} د.ج.</td>
                        <td className="px-3 py-2">{row.dureeMois} mois</td>
                        <td className="px-3 py-2 text-emerald-700 font-semibold">{Number(row.mensualite || 0).toLocaleString()} د.ج.</td>
                      </>
                    )}

                    {/* Action delete */}
                    {activeTable !== "simulations" && (
                      <td className="px-3 py-1.5 text-center">
                        <button
                          onClick={() => handleDeleteRow(idx)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                          title="Supprimer cette ligne"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>
            Affichage de {currentRows.length} ligne{currentRows.length !== 1 ? "s" : ""}
          </span>
          <span>Smile البديل Admin Engine</span>
        </div>
      </div>

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
