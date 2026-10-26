import { NextRequest, NextResponse } from "next/server";
import { appendSimulation } from "@/lib/googleSheets";
import {
  calculate,
  generateSimulationId,
  formatDate,
  formatRate,
} from "@/lib/calculations";
import type { SimulationRow } from "@/lib/googleSheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ─── Validate required fields ────────────────────────────
    const { telephone, typeClient, tauxProfit, revenu, dureeMois, price } = body;

    if (!telephone || !typeClient || !tauxProfit || !revenu || !dureeMois || !price) {
      return NextResponse.json(
        { error: "Missing required fields: telephone, typeClient, tauxProfit, revenu, dureeMois, price" },
        { status: 400 },
      );
    }

    // ─── Recalculate server-side for integrity ────────────────
    const results = calculate({
      revenu: Number(revenu),
      dureeMois: Number(dureeMois),
      tauxProfit: Number(tauxProfit),
      price: Number(price),
    });

    // ─── Build row ────────────────────────────────────────────
    const row: SimulationRow = {
      id: generateSimulationId(),
      date: formatDate(),
      agence: body.agence ?? "",
      categorie: body.categorie ?? "",
      marque: body.marque ?? "",
      produit: body.produit ?? "",
      typeClient,
      tauxProfit: formatRate(Number(tauxProfit)),
      revenu: Number(revenu),
      dureeMois: Number(dureeMois),
      price: Number(price),
      montantAFinancer: Math.round(results.montantAFinancer * 100) / 100,
      hamishJidia: Math.round(results.hamishJidia * 100) / 100,
      mensualite: Math.round(results.mensualite * 100) / 100,
      margeBeneficiaire: Math.round(results.margeBeneficiaire * 100) / 100,
      pointsDeVente: body.pointsDeVente ?? "",
      telephone: String(telephone),
    };

    // ─── Append to Google Sheet ───────────────────────────────
    const saved = await appendSimulation(row);

    return NextResponse.json({
      success: true,
      saved,                // true = written to Sheet, false = no credentials
      id: row.id,
      message: saved
        ? `Simulation ${row.id} enregistrée avec succès.`
        : `Simulation générée (mode local — ID: ${row.id}). Configurez les credentials Google Sheets pour la sauvegarder.`,
      results,
    });
  } catch (error) {
    console.error("[/api/simulations] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
