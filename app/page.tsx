"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SimulationWizard from "@/components/SimulationWizard";
import CheckListView from "@/components/CheckListView";
import AdminView from "@/components/AdminView";
import {
  AGENCES,
  COUVERTURE_AGENCE,
  TYPES_CLIENT,
  CATEGORIES,
  MARQUES,
  PRODUITS,
  POINTS_DE_VENTE,
  CHECK_LIST_ITEMS,
} from "@/data/fallbackData";

type View = "simulation" | "checklist" | "admin";

// Fallback data bundle used before API responds
const FALLBACK = {
  agences: AGENCES,
  couverture: COUVERTURE_AGENCE,
  typesClient: TYPES_CLIENT,
  categories: CATEGORIES,
  marques: MARQUES,
  produits: PRODUITS,
  pdvs: POINTS_DE_VENTE,
  checkList: CHECK_LIST_ITEMS,
};

export default function HomePage() {
  const [view, setView] = useState<View>("simulation");
  const [data, setData] = useState(FALLBACK);

  // Fetch from API (hydrates from Google Sheets if credentials configured)
  useEffect(() => {
    fetch("/api/lookup")
      .then((r) => r.json())
      .then((json) => {
        if (json && json.agences) setData(json);
      })
      .catch(() => {
        // silently keep fallback
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar activeView={view} onViewChange={setView} />

      <main className="flex-1">
        {view === "simulation" && (
          <SimulationWizard
            data={{
              agences: data.agences,
              couverture: data.couverture,
              typesClient: data.typesClient,
              categories: data.categories,
              marques: data.marques,
              produits: data.produits,
              pdvs: data.pdvs,
            }}
          />
        )}
        {view === "checklist" && <CheckListView items={data.checkList} />}
        {view === "admin" && (
          <AdminView initialData={data} onDataUpdated={setData} />
        )}
      </main>

      <footer className="text-center py-3 text-xs text-gray-400 border-t border-gray-200 bg-white">
        Smile البديل &copy; 2026 — Mourabaha Consommation Simulator
      </footer>
    </div>
  );
}
