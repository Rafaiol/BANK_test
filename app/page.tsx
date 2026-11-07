"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SimulationWizard from "@/components/SimulationWizard";
import CheckListView from "@/components/CheckListView";
import AdminView from "@/components/AdminView";
import AdminLoginModal from "@/components/AdminLoginModal";
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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Check persisted admin session on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = sessionStorage.getItem("smile_admin_auth") === "true";
      setIsAdminAuthenticated(isAuth);
    }
  }, []);

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

  const handleRequestAdminLogin = () => {
    if (isAdminAuthenticated) {
      setView("admin");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowLoginModal(false);
    setView("admin");
  };

  const handleAdminLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("smile_admin_auth");
    }
    setIsAdminAuthenticated(false);
    if (view === "admin") {
      setView("simulation");
    }
  };

  const handleViewChange = (nextView: View) => {
    if (nextView === "admin" && !isAdminAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setView(nextView);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        activeView={view}
        onViewChange={handleViewChange}
        isAdminAuthenticated={isAdminAuthenticated}
        onRequestAdminLogin={handleRequestAdminLogin}
        onAdminLogout={handleAdminLogout}
      />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
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
        {view === "admin" && isAdminAuthenticated && (
          <AdminView
            initialData={data}
            onDataUpdated={setData}
            onLogout={handleAdminLogout}
          />
        )}
      </main>

      {/* Admin Login Gate Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      <footer className="text-center py-3 text-xs text-gray-400 border-t border-gray-200 bg-white">
        Smile البديل &copy; 2026 — Mourabaha Consommation Simulator
      </footer>
    </div>
  );
}
