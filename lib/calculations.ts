// =============================================================
// Mourabaha Consommation — Financial Calculation Engine
// All formulas derived from the client's Google Spreadsheet
// =============================================================

export interface SimulationInputs {
  revenu: number;       // R — Monthly net income
  dureeMois: number;    // N — Duration in months (12|18|24|36)
  tauxProfit: number;   // T — Annual profit rate (decimal, e.g. 0.085)
  price: number;        // P — Total price of the item
  categorie?: string;   // Optional category name (e.g. "Meuble", "Électroménager")
}

export interface SimulationResults {
  mensualiteMax: number;       // Maximum monthly installment = R × 0.30
  capaciteEndettement: number; // Max total principal bank can finance (Present Value)
  montantAFinancer: number;    // Amount financed by the bank
  hamishJidia: number;         // Client down payment (apport personnel)
  margeBeneficiaire: number;   // Total bank profit margin
  mensualite: number;          // Monthly payment
}

/**
 * Core Mourabaha calculation engine — implementing the client's official formulas:
 *
 * 1. CAPACITE_ENDETTEMENT:
 *    Monthly maximum capacity = REVENU × 0.30
 *    Present Value of the ordinary annuity for mensualiteMax over N months at rate T:
 *    CAPACITE_ENDETTEMENT = mensualiteMax × (1 - (1 + r)^(-N)) / r   (where r = T / 12)
 *
 * 2. HAMISH_JIDIA (Apport personnel):
 *    IFS(
 *      [PRICE] > 3500000, [PRICE] - 3500000,
 *      [PRICE] > [CAPACITE_ENDETTEMENT], [PRICE] - [CAPACITE_ENDETTEMENT],
 *      AND([CAPACITE_ENDETTEMENT] >= [PRICE], [REVENU] > 120000), 0,
 *      TRUE, [PRICE] * 0.10
 *    )
 *    Enforces regulatory constraints: financing cannot exceed 3.5M ceiling or borrowing capacity;
 *    10% minimum down payment if REVENU <= 120,000 DA; 0% if REVENU > 120,000 DA and within capacity.
 *
 * 3. MONTANT_A_FINANCER:
 *    IF(
 *      OR([CATEGORIE] = "Meuble", [CATEGORIE] = "Électroménager"),
 *      IF([PRICE] - [HAMISH_JIDIA] <= 50000, 50000,
 *        IF([PRICE] - [HAMISH_JIDIA] >= 3500000, 3500000, [PRICE] - [HAMISH_JIDIA])
 *      ),
 *      IF([PRICE] - [HAMISH_JIDIA] <= 200000, 200000,
 *        IF([PRICE] - [HAMISH_JIDIA] >= 3500000, 3500000, [PRICE] - [HAMISH_JIDIA])
 *      )
 *    )
 *    Bounded such that MONTANT_A_FINANCER <= PRICE and MONTANT_A_FINANCER + HAMISH_JIDIA = PRICE.
 *
 * 4. MENSUALITE:
 *    [MONTANT_A_FINANCER] * ([TAUX_PROFIT] / 12) / (1 - (1 / POWER(1 + ([TAUX_PROFIT] / 12), [DUREE_MOIS])))
 *
 * 5. MARGE_BENEFICIAIRE:
 *    ([MENSUALITE] * [DUREE_MOIS]) - [MONTANT_A_FINANCER]
 */
export function calculate(inputs: SimulationInputs): SimulationResults {
  const { revenu, dureeMois: N, tauxProfit: T, price: P, categorie } = inputs;

  // 1. Mensualité maximale admissible (30% du salaire net)
  const mensualiteMax = Math.max(0, revenu * 0.3);

  // Taux périodique mensuel r = T / 12
  const r = T > 0 ? T / 12 : 0;

  // 2. Capacité d'endettement (Valeur Actuelle maximale finançable pour mensualiteMax)
  let capaciteEndettement = 0;
  if (N > 0) {
    if (r === 0) {
      capaciteEndettement = mensualiteMax * N;
    } else {
      capaciteEndettement = (mensualiteMax * (1 - Math.pow(1 + r, -N))) / r;
    }
  }

  // 3. Hamish Jidia (Apport personnel du client)
  const ceilingMaxFin = 3500000;
  const minHamishRate = revenu > 120000 ? 0 : 0.1;
  const baseHamish = P * minHamishRate;
  const excessOverCeiling = Math.max(0, P - ceilingMaxFin);
  const excessOverCapacity = Math.max(0, P - capaciteEndettement);

  let hamishJidia = Math.max(baseHamish, excessOverCeiling, excessOverCapacity);
  // Ensure hamishJidia is bounded within [0, P]
  hamishJidia = Math.min(P, Math.max(0, hamishJidia));

  // 4. Montant à financer
  const cat = (categorie ?? "").trim().toLowerCase();
  const isMeubleOrElectro =
    cat === "meuble" ||
    cat === "électroménager" ||
    cat === "electromenager" ||
    cat === ""; // default when unselected

  const minFinLimit = isMeubleOrElectro ? 50000 : 200000;
  const tentativeFinancement = P - hamishJidia;

  let montantAFinancer: number;
  if (P < minFinLimit) {
    // If product price is lower than credit tier minimum, financing cannot exceed price
    montantAFinancer = Math.max(0, tentativeFinancement);
  } else if (tentativeFinancement <= minFinLimit) {
    montantAFinancer = minFinLimit;
  } else if (tentativeFinancement >= ceilingMaxFin) {
    montantAFinancer = ceilingMaxFin;
  } else {
    montantAFinancer = tentativeFinancement;
  }

  // Financed amount cannot exceed product price
  montantAFinancer = Math.min(P, Math.max(0, montantAFinancer));

  // Ensure exact balance: P = montantAFinancer + hamishJidia
  hamishJidia = Math.max(0, P - montantAFinancer);

  // 5. Mensualité
  let mensualite = 0;
  if (N > 0 && montantAFinancer > 0) {
    if (r === 0) {
      mensualite = montantAFinancer / N;
    } else {
      mensualite = (montantAFinancer * r) / (1 - 1 / Math.pow(1 + r, N));
    }
  }

  // 6. Marge Bénéficiaire
  const margeBeneficiaire = N > 0 ? mensualite * N - montantAFinancer : 0;

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

/** Minimum allowed product price based on monthly income */
export function getMinProductPrice(revenu: number): number {
  return revenu > 0 && revenu <= 120000 ? 55000 : 50000;
}

/** Format a number as Algerian Dinar currency string */
export function formatDZD(amount: number): string {
  return (
    new Intl.NumberFormat("fr-DZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + " د.ج."
  );
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
