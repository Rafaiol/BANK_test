"use client";

import React from "react";
import { Home, Smile, Shield, FileCheck, Calculator } from "lucide-react";

interface NavbarProps {
  activeView: "simulation" | "checklist" | "admin";
  onViewChange: (view: "simulation" | "checklist" | "admin") => void;
}

export default function Navbar({ activeView, onViewChange }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] text-white shadow-md sticky top-0 z-40 w-full">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Brand */}
        <div
          onClick={() => onViewChange("simulation")}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-full shrink-0">
            <Home className="w-4 h-4 text-white" />
            <Smile className="w-3 h-3 text-yellow-300 absolute -bottom-0.5 -right-0.5" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-base sm:text-lg leading-none block truncate">
              Smile البديل
            </span>
            <p className="text-purple-200 text-[10px] leading-none mt-0.5 hidden xs:block sm:block">
              Mourabaha Consommation
            </p>
          </div>
        </div>

        {/* Navigation pills */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-xl p-1 shrink-0">
          <button
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
          <button
            onClick={() => onViewChange("admin")}
            className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === "admin"
                ? "bg-white text-[#6A1B9A] shadow-xs"
                : "text-white/85 hover:text-white hover:bg-white/10"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Admin</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
