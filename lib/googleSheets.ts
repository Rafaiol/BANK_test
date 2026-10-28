// =============================================================
// Google Sheets API & Live Sync Service
// Automatically synchronizes live with Google Spreadsheet
// Spreadsheet ID: 1Jf0j1qNw7zEGrlWaddO8Y1A2F-6ls76NASdEz_8tWh8
// =============================================================

import { google } from "googleapis";
import https from "https";
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

export const DEFAULT_SHEET_ID = "1Jf0j1qNw7zEGrlWaddO8Y1A2F-6ls76NASdEz_8tWh8";

export function getTargetSheetId(): string {
  return process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
}

export function isGoogleSheetsConnected(): boolean {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  return Boolean(GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY);
}

// ─── Local in-memory runtime store ────────────────────────────
const localStore = {
  agences: [...AGENCES],
  couverture: [...COUVERTURE_AGENCE],
  typesClient: [...TYPES_CLIENT],
  categories: [...CATEGORIES],
  marques: [...MARQUES],
  produits: [...PRODUITS],
  pdvs: [...POINTS_DE_VENTE],
  checkList: [...CHECK_LIST_ITEMS],
  simulations: [] as any[],
};

// ─── Server In-Memory Cache (TTL 10 min) ──────────────────────
let cachedLookupData: any = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 10 * 60 * 1000;

export function invalidateLookupCache() {
  cachedLookupData = null;
  cacheTimestamp = 0;
}

// ─── Google Service Account Auth ──────────────────────────────
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
  } catch (err) {
    console.error("[Sheets] Auth error:", err);
    return null;
  }
}

function getSheets() {
  const auth = getAuth();
  if (!auth) return null;
  return google.sheets({ version: "v4", auth });
}

// ─── Robust CSV Parser for Live Fetch ─────────────────────────
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      row.push(cur.trim());
      cur = "";
    } else if ((c === "\r" || c === "\n") && !inQuotes) {
      if (c === "\r" && text[i + 1] === "\n") {
        i++;
      }
      row.push(cur.trim());
      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }
      row = [];
      cur = "";
    } else {
      cur += c;
    }
  }

  if (cur.length > 0 || row.length > 0) {
    row.push(cur.trim());
    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

// ─── Direct Live Fetch via Google Sheets Export ───────────────
function fetchPublicSheetCSV(sheetName: string): Promise<string[][] | null> {
  const sheetId = getTargetSheetId();
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    sheetName,
  )}`;

  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          resolve(null);
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const rows = parseCSV(data);
            resolve(rows);
          } catch {
            resolve(null);
          }
        });
      })
      .on("error", () => resolve(null));
  });
}

// ─── Exact sheet tab names from spreadsheet ───────────────────
export const SHEET_TABS = {
  agences: "AGENCE ",
  couverture: "Couverture_Agence",
  categories: "CATEGORIE",
  marques: "MARQUE ",
  produits: "PRODUIT",
  typesClient: "TYPE DU CLIENT",
  pdvs: "POINT DE VENTE ",
  checkList: "Check Liste ",
  simulations: "SIMULATION",
};

// ─── Live Data Loader with 3-tier Fallback ────────────────────
export async function getAllLookupData() {
  const now = Date.now();
  if (cachedLookupData && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedLookupData;
  }

  const sheetId = getTargetSheetId();
  const sheets = getSheets();

  // Tier 1: Google Sheets API v4 (BatchGet) if service account is configured
  if (sheets && sheetId) {
    try {
      const ranges = [
        `'${SHEET_TABS.agences}'!A2:B`,
        `'${SHEET_TABS.couverture}'!A2:C`,
        `'${SHEET_TABS.typesClient}'!A2:B`,
        `'${SHEET_TABS.categories}'!A2:A`,
        `'${SHEET_TABS.marques}'!A2:B`,
        `'${SHEET_TABS.produits}'!A2:D`,
        `'${SHEET_TABS.pdvs}'!A2:G`,
        `'${SHEET_TABS.checkList}'!A2:A`,
      ];

      const res = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: sheetId,
        ranges,
      });

      const valueRanges = res.data.valueRanges ?? [];
      const rAgences = valueRanges[0]?.values ?? [];
      const rCouverture = valueRanges[1]?.values ?? [];
      const rTypes = valueRanges[2]?.values ?? [];
      const rCategories = valueRanges[3]?.values ?? [];
      const rMarques = valueRanges[4]?.values ?? [];
      const rProduits = valueRanges[5]?.values ?? [];
      const rPdvs = valueRanges[6]?.values ?? [];
      const rCheckList = valueRanges[7]?.values ?? [];

      if (rProduits.length > 0) {
        const agences: Agence[] = rAgences.map((r) => ({
          CODE: r[0] ?? "",
          AGENCE: r[1] ?? "",
        }));

        const couverture: CouvertureAgence[] = rCouverture.map((r) => ({
          CODE_AGENCE: r[0] ?? "",
          NOM_AGENCE: r[1] ?? "",
          WILAYA: r[2] ?? "",
        }));

        const typesClient: TypeClient[] = rTypes.map((r) => ({
          NOM_TYPE_CLIENT: r[0] ?? "",
          TAUX_DE_PROFIT:
            parseFloat((r[1] ?? "0").replace("%", "").replace(",", ".")) / 100,
        }));

        const categories: Categorie[] = rCategories.map((r) => ({
          CATEGORIE: r[0] ?? "",
        }));

        const marques: Marque[] = rMarques.map((r) => ({
          MARQUE: r[0] ?? "",
          LOGO: r[1] ?? "",
        }));

        const produits: Produit[] = rProduits.map((r) => ({
          ID_PRODUIT: r[0] ?? "",
          CATEGORIE: r[1] ?? "",
          MARQUE: r[2] ?? "",
          PRODUIT_GENERIQUE: r[3] ?? "",
        }));

        const pdvs: PointDeVente[] = rPdvs.map((r) => ({
          ID_PDV: r[0] ?? "",
          CATEGORIE: r[1] ?? "",
          MARQUE: r[2] ?? "",
          Commercial: r[3] ?? "",
          Adresse: r[4] ?? "",
          Wilaya: r[5] ?? "",
          Telephone: r[6] ?? "",
        }));

        const checkList: CheckListItem[] = [];
        for (let i = 0; i < rCheckList.length - 1; i += 2) {
          checkList.push({
            fr: rCheckList[i][0] ?? "",
            ar: rCheckList[i + 1]?.[0] ?? "",
          });
        }

        cachedLookupData = {
          agences,
          couverture,
          typesClient,
          categories,
          marques,
          produits,
          pdvs,
          checkList,
        };
        cacheTimestamp = now;
        return cachedLookupData;
      }
    } catch (err) {
      console.warn("[Sheets] API batchGet failed, falling back to live HTTP fetch:", err);
    }
  }

  // Tier 2: Direct Live HTTP Fetch from Google Spreadsheet (Zero credentials required!)
  try {
    const [
      rAgences,
      rCouverture,
      rCategories,
      rMarques,
      rProduits,
      rTypes,
      rPdvs,
      rCheckList,
    ] = await Promise.all([
      fetchPublicSheetCSV(SHEET_TABS.agences),
      fetchPublicSheetCSV(SHEET_TABS.couverture),
      fetchPublicSheetCSV(SHEET_TABS.categories),
      fetchPublicSheetCSV(SHEET_TABS.marques),
      fetchPublicSheetCSV(SHEET_TABS.produits),
      fetchPublicSheetCSV(SHEET_TABS.typesClient),
      fetchPublicSheetCSV(SHEET_TABS.pdvs),
      fetchPublicSheetCSV(SHEET_TABS.checkList),
    ]);

    if (rProduits && rProduits.length > 1) {
      const agences: Agence[] = (rAgences || [])
        .slice(1)
        .map((r) => ({ CODE: r[0] || "", AGENCE: r[1] || "" }))
        .filter((a) => a.CODE);

      const couverture: CouvertureAgence[] = (rCouverture || [])
        .slice(1)
        .map((r) => ({
          CODE_AGENCE: r[0] || "",
          NOM_AGENCE: r[1] || "",
          WILAYA: r[2] || "",
        }))
        .filter((c) => c.CODE_AGENCE);

      const categories: Categorie[] = (rCategories || [])
        .slice(1)
        .map((r) => ({ CATEGORIE: r[0] || "" }))
        .filter((c) => c.CATEGORIE);

      const marques: Marque[] = (rMarques || [])
        .slice(1)
        .map((r) => ({ MARQUE: r[0] || "", LOGO: r[1] || "" }))
        .filter((m) => m.MARQUE);

      const produits: Produit[] = (rProduits || [])
        .slice(1)
        .map((r) => ({
          ID_PRODUIT: r[0] || "",
          CATEGORIE: r[1] || "",
          MARQUE: r[2] || "",
          PRODUIT_GENERIQUE: r[3] || "",
        }))
        .filter((p) => p.ID_PRODUIT && p.PRODUIT_GENERIQUE);

      const typesClient: TypeClient[] = (rTypes || [])
        .slice(1)
        .map((r) => {
          const raw = (r[1] || "0").replace("%", "").replace(",", ".").trim();
          return {
            NOM_TYPE_CLIENT: r[0] || "",
            TAUX_DE_PROFIT: (parseFloat(raw) || 0) / 100,
          };
        })
        .filter((t) => t.NOM_TYPE_CLIENT);

      const pdvs: PointDeVente[] = (rPdvs || [])
        .slice(1)
        .map((r) => ({
          ID_PDV: r[0] || "",
          CATEGORIE: r[1] || "",
          MARQUE: r[2] || "",
          Commercial: r[3] || "",
          Adresse: r[4] || "",
          Wilaya: r[5] || "",
          Telephone: r[6] || "",
        }))
        .filter((p) => p.ID_PDV && p.ID_PDV.startsWith("PDV"));

      const checkList: CheckListItem[] = [];
      const clLines = (rCheckList || []).slice(1).map((r) => r[0] || "").filter(Boolean);
      for (let i = 0; i < clLines.length - 1; i += 2) {
        checkList.push({ fr: clLines[i], ar: clLines[i + 1] });
      }

      cachedLookupData = {
        agences: agences.length > 0 ? agences : localStore.agences,
        couverture: couverture.length > 0 ? couverture : localStore.couverture,
        typesClient: typesClient.length > 0 ? typesClient : localStore.typesClient,
        categories: categories.length > 0 ? categories : localStore.categories,
        marques: marques.length > 0 ? marques : localStore.marques,
        produits: produits.length > 0 ? produits : localStore.produits,
        pdvs: pdvs.length > 0 ? pdvs : localStore.pdvs,
        checkList: checkList.length > 0 ? checkList : localStore.checkList,
      };
      cacheTimestamp = now;

      // Update localStore with live data
      Object.assign(localStore, cachedLookupData);

      return cachedLookupData;
    }
  } catch (err) {
    console.warn("[Sheets] Live HTTP fetch failed, using fallback:", err);
  }

  // Tier 3: Local full fallback (all 160 products, 61 PDVs, etc.)
  cachedLookupData = {
    agences: localStore.agences,
    couverture: localStore.couverture,
    typesClient: localStore.typesClient,
    categories: localStore.categories,
    marques: localStore.marques,
    produits: localStore.produits,
    pdvs: localStore.pdvs,
    checkList: localStore.checkList,
  };
  cacheTimestamp = now;
  return cachedLookupData;
}

// ─── Simulations History Loader ───────────────────────────────
export async function getSimulations(): Promise<any[]> {
  const sheetId = getTargetSheetId();
  const sheets = getSheets();

  if (sheets && sheetId) {
    try {
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `'${SHEET_TABS.simulations}'!B2:W`,
      });
      const rows = res.data.values;
      if (rows && rows.length > 0) {
        return rows
          .slice()
          .reverse()
          .map((r) => ({
            id: r[0] ?? "",
            date: r[1] ?? "",
            direction: r[2] ?? "",
            agence: r[3] ?? "",
            categorie: r[5] ?? "",
            marque: r[6] ?? "",
            produit: r[7] ?? "",
            typeClient: r[8] ?? "",
            tauxProfit: r[9] ?? "",
            revenu: r[10] ?? "",
            dureeMois: r[11] ?? "",
            price: r[13] ?? "",
            montantAFinancer: r[14] ?? "",
            hamishJidia: r[15] ?? "",
            mensualite: r[16] ?? "",
            margeBeneficiaire: r[17] ?? "",
            pointsDeVente: r[20] ?? "",
            telephone: r[21] ?? "",
          }));
      }
    } catch {
      // ignore
    }
  }

  // Fallback to live CSV fetch for simulations
  const csvRows = await fetchPublicSheetCSV(SHEET_TABS.simulations);
  if (csvRows && csvRows.length > 1) {
    return csvRows
      .slice(1)
      .reverse()
      .map((r) => ({
        id: r[1] ?? "",
        date: r[2] ?? "",
        direction: r[3] ?? "",
        agence: r[4] ?? "",
        categorie: r[6] ?? "",
        marque: r[7] ?? "",
        produit: r[8] ?? "",
        typeClient: r[9] ?? "",
        tauxProfit: r[10] ?? "",
        revenu: r[11] ?? "",
        dureeMois: r[12] ?? "",
        price: r[14] ?? "",
        montantAFinancer: r[15] ?? "",
        hamishJidia: r[16] ?? "",
        mensualite: r[17] ?? "",
        margeBeneficiaire: r[18] ?? "",
        pointsDeVente: r[21] ?? "",
        telephone: r[22] ?? "",
      }));
  }

  return localStore.simulations;
}

// ─── Append Simulation Row ────────────────────────────────────
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
  const sheetId = getTargetSheetId();
  const sheets = getSheets();

  localStore.simulations.unshift(row);

  if (!sheets || !sheetId) return false;

  const values = [
    [
      "",
      row.id,
      row.date,
      "DRE BOUIRA",
      row.agence,
      "",
      row.categorie,
      row.marque,
      row.produit,
      row.typeClient,
      row.tauxProfit,
      row.revenu,
      row.dureeMois,
      "",
      row.price,
      row.montantAFinancer,
      row.hamishJidia,
      row.mensualite,
      row.margeBeneficiaire,
      "",
      "",
      row.pointsDeVente,
      row.telephone,
    ],
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `'${SHEET_TABS.simulations}'!A:W`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
    return true;
  } catch (err) {
    console.error("[Sheets] Error appending simulation:", err);
    return false;
  }
}

// ─── Admin Table Update ───────────────────────────────────────
export async function updateTableData(
  tableKey: string,
  data: any[],
): Promise<{ success: boolean; appliedToSheets: boolean; message: string }> {
  if (tableKey in localStore) {
    (localStore as any)[tableKey] = data;
  }

  invalidateLookupCache();

  const sheets = getSheets();
  const sheetId = getTargetSheetId();

  if (!sheets || !sheetId) {
    return {
      success: true,
      appliedToSheets: false,
      message:
        "Modifications enregistrées en mémoire et appliquées immédiatement au simulateur. (Pour sauvegarder aussi dans Google Sheets, configurez les clés de compte de service dans .env.local).",
    };
  }

  let sheetName = "";
  let range = "";
  let values: (string | number)[][] = [];

  switch (tableKey) {
    case "typesClient":
      sheetName = SHEET_TABS.typesClient;
      range = `'${sheetName}'!A2:B`;
      values = data.map((d: TypeClient) => [
        d.NOM_TYPE_CLIENT,
        `${(d.TAUX_DE_PROFIT * 100).toFixed(2).replace(".", ",")}%`,
      ]);
      break;

    case "agences":
      sheetName = SHEET_TABS.agences;
      range = `'${sheetName}'!A2:B`;
      values = data.map((d: Agence) => [d.CODE, d.AGENCE]);
      break;

    case "couverture":
      sheetName = SHEET_TABS.couverture;
      range = `'${sheetName}'!A2:C`;
      values = data.map((d: CouvertureAgence) => [
        d.CODE_AGENCE,
        d.NOM_AGENCE,
        d.WILAYA,
      ]);
      break;

    case "categories":
      sheetName = SHEET_TABS.categories;
      range = `'${sheetName}'!A2:A`;
      values = data.map((d: Categorie) => [d.CATEGORIE]);
      break;

    case "marques":
      sheetName = SHEET_TABS.marques;
      range = `'${sheetName}'!A2:B`;
      values = data.map((d: Marque) => [d.MARQUE, d.LOGO ?? ""]);
      break;

    case "produits":
      sheetName = SHEET_TABS.produits;
      range = `'${sheetName}'!A2:D`;
      values = data.map((d: Produit) => [
        d.ID_PRODUIT,
        d.CATEGORIE,
        d.MARQUE,
        d.PRODUIT_GENERIQUE,
      ]);
      break;

    case "pdvs":
      sheetName = SHEET_TABS.pdvs;
      range = `'${sheetName}'!A2:G`;
      values = data.map((d: PointDeVente) => [
        d.ID_PDV,
        d.CATEGORIE,
        d.MARQUE,
        d.Commercial,
        d.Adresse,
        d.Wilaya,
        d.Telephone,
      ]);
      break;

    case "checkList":
      sheetName = SHEET_TABS.checkList;
      range = `'${sheetName}'!A2:A`;
      values = [];
      data.forEach((d: CheckListItem) => {
        values.push([d.fr]);
        values.push([d.ar]);
      });
      break;

    default:
      return {
        success: false,
        appliedToSheets: false,
        message: `Table inconnue: ${tableKey}`,
      };
  }

  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: sheetId,
      range: `'${sheetName}'!A2:Z`,
    });

    if (values.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
    }

    return {
      success: true,
      appliedToSheets: true,
      message: `Modifications enregistrées avec succès dans la feuille « ${sheetName} » !`,
    };
  } catch (err: any) {
    console.error(`[Sheets] Error updating ${sheetName}:`, err);
    return {
      success: true,
      appliedToSheets: false,
      message: `Modifications appliquées en mémoire. Erreur API Sheets: ${err?.message || "inconnue"}.`,
    };
  }
}
