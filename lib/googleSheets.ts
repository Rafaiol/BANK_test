// =============================================================
// Google Sheets API Service — with graceful fallback to local data
// =============================================================

import { google } from "googleapis";
import {
  AGENCES,
  COUVERTURE_AGENCE,
  TYPES_CLIENT,
  CATEGORIES,
  MARQUES,
  PRODUITS,
  POINTS_DE_VENTE,
  CHECK_LIST_ITEMS,
  type Agence,
  type CouvertureAgence,
  type TypeClient,
  type Categorie,
  type Marque,
  type Produit,
  type PointDeVente,
  type CheckListItem,
} from "@/data/fallbackData";

// ─── Auth ─────────────────────────────────────────────────────
function getAuth() {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) return null;

  try {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch {
    return null;
  }
}

function getSheets() {
  const auth = getAuth();
  if (!auth) return null;
  return google.sheets({ version: "v4", auth });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// ─── Generic helper ───────────────────────────────────────────
async function fetchRange(range: string): Promise<string[][] | null> {
  if (!SHEET_ID) return null;
  const sheets = getSheets();
  if (!sheets) return null;

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
    return (res.data.values as string[][] | undefined) ?? null;
  } catch (err) {
    console.error(`[Sheets] Error reading ${range}:`, err);
    return null;
  }
}

// ─── Read helpers with fallback ───────────────────────────────
export async function getAgences(): Promise<Agence[]> {
  const rows = await fetchRange("AGENCE!A2:B");
  if (!rows) return AGENCES;
  return rows.map((r) => ({ CODE: r[0] ?? "", AGENCE: r[1] ?? "" }));
}

export async function getCouvertureAgence(): Promise<CouvertureAgence[]> {
  const rows = await fetchRange("Couverture_Agence!A2:C");
  if (!rows) return COUVERTURE_AGENCE;
  return rows.map((r) => ({
    CODE_AGENCE: r[0] ?? "",
    NOM_AGENCE: r[1] ?? "",
    WILAYA: r[2] ?? "",
  }));
}

export async function getTypesClient(): Promise<TypeClient[]> {
  const rows = await fetchRange("TYPE DU CLIENT!A2:B");
  if (!rows) return TYPES_CLIENT;
  return rows.map((r) => ({
    NOM_TYPE_CLIENT: r[0] ?? "",
    TAUX_DE_PROFIT: parseFloat((r[1] ?? "0").replace("%", "")) / 100,
  }));
}

export async function getCategories(): Promise<Categorie[]> {
  const rows = await fetchRange("CATEGORIE!A2:A");
  if (!rows) return CATEGORIES;
  return rows.map((r) => ({ CATEGORIE: r[0] ?? "" }));
}

export async function getMarques(): Promise<Marque[]> {
  const rows = await fetchRange("MARQUE!A2:B");
  if (!rows) return MARQUES;
  return rows.map((r) => ({ MARQUE: r[0] ?? "", LOGO: r[1] ?? "" }));
}

export async function getProduits(): Promise<Produit[]> {
  const rows = await fetchRange("PRODUIT!A2:D");
  if (!rows) return PRODUITS;
  return rows.map((r) => ({
    ID_PRODUIT: r[0] ?? "",
    CATEGORIE: r[1] ?? "",
    MARQUE: r[2] ?? "",
    PRODUIT_GENERIQUE: r[3] ?? "",
  }));
}

export async function getPointsDeVente(): Promise<PointDeVente[]> {
  const rows = await fetchRange("POINT DE VENTE!A2:G");
  if (!rows) return POINTS_DE_VENTE;
  return rows.map((r) => ({
    ID_PDV: r[0] ?? "",
    CATEGORIE: r[1] ?? "",
    MARQUE: r[2] ?? "",
    Commercial: r[3] ?? "",
    Adresse: r[4] ?? "",
    Wilaya: r[5] ?? "",
    Telephone: r[6] ?? "",
  }));
}

export async function getCheckList(): Promise<CheckListItem[]> {
  const rows = await fetchRange("Check Liste!A2:A");
  if (!rows) return CHECK_LIST_ITEMS;
  // Rows alternate: French, Arabic, French, Arabic …
  const items: CheckListItem[] = [];
  for (let i = 0; i < rows.length - 1; i += 2) {
    items.push({ fr: rows[i][0] ?? "", ar: rows[i + 1]?.[0] ?? "" });
  }
  return items.length > 0 ? items : CHECK_LIST_ITEMS;
}

// ─── Write simulation row ─────────────────────────────────────
export interface SimulationRow {
  id: string;
  date: string;
  agence: string;
  categorie: string;
  marque: string;
  produit: string;
  typeClient: string;
  tauxProfit: string;
  revenu: number;
  dureeMois: number;
  price: number;
  montantAFinancer: number;
  hamishJidia: number;
  mensualite: number;
  margeBeneficiaire: number;
  pointsDeVente: string;
  telephone: string;
}

export async function appendSimulation(row: SimulationRow): Promise<boolean> {
  if (!SHEET_ID) return false;
  const sheets = getSheets();
  if (!sheets) return false;

  const values = [
    [
      "",                        // A — PAGE 01
      row.id,                    // B — ID_SIMULATION
      row.date,                  // C — DATE
      "DRE BOUIRA",              // D — Direction Régionale d'Exploitation
      row.agence,                // E — AGENCE
      "",                        // F — PAGE_2
      row.categorie,             // G — CATEGORIE
      row.marque,                // H — MARQUE
      row.produit,               // I — PRODUIT
      row.typeClient,            // J — TYPE_CLIENT
      row.tauxProfit,            // K — TAUX_PROFIT
      row.revenu,                // L — REVENU
      row.dureeMois,             // M — DUREE_MOIS
      "",                        // N — PAGE_3
      row.price,                 // O — PRICE
      row.montantAFinancer,      // P — MONTANT_A_FINANCER
      row.hamishJidia,           // Q — HAMISH_JIDIA
      row.mensualite,            // R — MENSUALITE
      row.margeBeneficiaire,     // S — MARGE_BENEFICIAIRE
      "",                        // T — COUT_GLOBAL
      "",                        // U — PRIX_TOTAL
      row.pointsDeVente,         // V — POINTS_DE_VENTE_CORRESPONDANTS
      row.telephone,             // W — DATE_NAISSANCE / TELEPHONE
    ],
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "SIMULATION!A:W",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
    return true;
  } catch (err) {
    console.error("[Sheets] Error appending simulation:", err);
    return false;
  }
}

// ─── Cached lookup bundle (for /api/lookup) ───────────────────
export async function getAllLookupData() {
  const [agences, couverture, typesClient, categories, marques, produits, pdvs, checkList] =
    await Promise.all([
      getAgences(),
      getCouvertureAgence(),
      getTypesClient(),
      getCategories(),
      getMarques(),
      getProduits(),
      getPointsDeVente(),
      getCheckList(),
    ]);

  return { agences, couverture, typesClient, categories, marques, produits, pdvs, checkList };
}
