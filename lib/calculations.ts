// =============================================================
// Mourabaha Consommation — Financial Calculation Engine
// All formulas derived from the client's Google Spreadsheet
// =============================================================

export interface SimulationInputs {
  revenu: number;       // R — Monthly net income
  dureeMois: number;    // N — Duration in months (12|18|24|36)
  tauxProfit: number;   // T — Annual profit rate (decimal, e.g. 0.085)
  price: number;        // P — Total price of the item
}

export interface SimulationResults {
  mensualiteMax: number;       // Maximum monthly capacity = R × 0.30
  capaciteEndettement: number; // Max principal the bank can finance
  montantAFinancer: number;    // min(P, capaciteEndettement)
  hamishJidia: number;         // Down payment = max(0, P − montantAFinancer)
  margeBeneficiaire: number;   // Bank profit margin
  mensualite: number;          // Monthly payment
}

/**
 * Core Mourabaha calculation — matches the client's spreadsheet formulas exactly.
 *
 * Configuration toggle:
 *   useSimpleDeduction = false (default) → uses the division formula:
 *     CAPACITE_ENDETTEMENT = (mensualiteMax × N) / (1 + T × N/12)
 *
 *   useSimpleDeduction = true → uses the deduction formula:
 *     CAPACITE_ENDETTEMENT = (mensualiteMax × N) × (1 − T × N/12)
 */
export function calculate(
  inputs: SimulationInputs,
  useSimpleDeduction = false,
): SimulationResults {
  const { revenu, dureeMois: N, tauxProfit: T, price: P } = inputs;

  // 1. Maximum monthly installment capacity
  const mensualiteMax = revenu * 0.3;

  // 2. Total rate factor over the loan duration
  const totalRateFactor = 1 + T * (N / 12);

  // 3. Maximum amount the bank can finance
  let capaciteEndettement: number;
  if (useSimpleDeduction) {
    capaciteEndettement = mensualiteMax * N * (1 - T * (N / 12));
  } else {
    capaciteEndettement = (mensualiteMax * N) / totalRateFactor;
  }

  // 4. Amount to finance = min(price, capacity)
  const montantAFinancer = Math.min(P, capaciteEndettement);

  // 5. Down payment / self-financing
  const hamishJidia = Math.max(0, P - montantAFinancer);

  // 6. Bank profit margin
  const margeBeneficiaire = montantAFinancer * T * (N / 12);

  // 7. Monthly payment
  const mensualite = (montantAFinancer + margeBeneficiaire) / N;

  return {
    mensualiteMax,
    capaciteEndettement,
    montantAFinancer,
    hamishJidia,
    margeBeneficiaire,
    mensualite,
  };
}

// ─── Helpers ─────────────────────────────────────────────────

/** Format a number as Algerian Dinar currency string */
export function formatDZD(amount: number): string {
  return new Intl.NumberFormat("fr-DZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + " د.ج.";
}

/** Format a decimal rate as a percentage string (e.g. 0.085 → "8,50%") */
export function formatRate(rate: number): string {
  return (rate * 100).toFixed(2).replace(".", ",") + "%";
}

/** Generate an 8-character random hex ID */
export function generateSimulationId(): string {
  return Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, "0");
}

/** Format a Date as DD/MM/YYYY */
export function formatDate(date: Date = new Date()): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
