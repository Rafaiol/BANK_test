"use client";

import React from "react";
import { FileCheck, Calculator, Store, Shield, LogOut, Lock } from "lucide-react";
import SmileLogo from "@/components/SmileLogo";

interface NavbarProps {
  activeView: "simulation" | "partenaires" | "checklist" | "admin";
  onViewChange: (view: "simulation" | "partenaires" | "checklist" | "admin") => void;
  isAdminAuthenticated?: boolean;
  onRequestAdminLogin?: () => void;
  onAdminLogout?: () => void;
}

export default function Navbar({
  activeView,
  onViewChange,
  isAdminAuthenticated = false,
  onRequestAdminLogin,
  onAdminLogout,
}: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] text-white shadow-md sticky top-0 z-40 w-full">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand with authentic Smile Logo */}
        <div
          onClick={() => onViewChange("simulation")}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <SmileLogo size="md" />
          <div className="min-w-0">
            <span className="font-bold text-base sm:text-lg leading-none block truncate">
              BDL البديل
            </span>
            <p className="text-purple-200 text-[10px] leading-none mt-0.5 hidden xs:block sm:block">
              DRE BOUIRA - 841 -
            </p>
          </div>
        </div>

        {/* Center: Main Client Navigation Pages (Simulation, Nos Partenaires, Check-List) */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-xl p-1 shrink-0">
          <button
            type="button"
            onClick={() => onViewChange("simulation")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === "simulation"
                ? "bg-white text-[#6A1B9A] shadow-xs"
                : "text-white/85 hover:text-white hover:bg-white/10"
            }`}
          >
            <Calculator className="w-3.5 h-3.5 sm:hidden" />
            <span>Simulation</span>
          </button>
          <button
            type="button"
            onClick={() => onViewChange("partenaires")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === "partenaires"
                ? "bg-white text-[#6A1B9A] shadow-xs"
                : "text-white/85 hover:text-white hover:bg-white/10"
            }`}
          >
            <Store className="w-3.5 h-3.5 sm:hidden" />
            <span>Nos Partenaires</span>
          </button>
          <button
            type="button"
            onClick={() => onViewChange("checklist")}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === "checklist"
                ? "bg-white text-[#6A1B9A] shadow-xs"
                : "text-white/85 hover:text-white hover:bg-white/10"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 sm:hidden" />
            <span>Check-List</span>
          </button>
        </div>

        {/* Far Top Right: Discreet Admin Access */}
        <div className="flex items-center shrink-0">
          {isAdminAuthenticated ? (
            <div className="flex items-center gap-1.5 bg-white/15 px-2 py-1 rounded-xl">
              <button
                type="button"
                onClick={() => onViewChange("admin")}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeView === "admin"
                    ? "bg-white text-[#6A1B9A] shadow-2xs"
                    : "text-white hover:bg-white/20"
                }`}
                title="Accéder au panneau d'administration"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
              {onAdminLogout && (
                <button
                  type="button"
                  onClick={onAdminLogout}
                  title="Déconnexion Administrateur"
                  className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onRequestAdminLogin}
              title="Accès Administrateur (Privé)"
              className="p-2 rounded-xl text-white/35 hover:text-white hover:bg-white/15 transition-all cursor-pointer flex items-center justify-center"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
