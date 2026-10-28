"use client";

import React from "react";
import { Home, Smile, Shield } from "lucide-react";

interface NavbarProps {
  activeView: "simulation" | "checklist" | "admin";
  onViewChange: (view: "simulation" | "checklist" | "admin") => void;
}

export default function Navbar({ activeView, onViewChange }: NavbarProps) {
  return (
    <nav className="bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-9 h-9 bg-white/20 rounded-full">
            <Home className="w-4 h-4 text-white" />
            <Smile className="w-3 h-3 text-yellow-300 absolute -bottom-0.5 -right-0.5" />
          </div>
          <div>
            <span className="font-bold text-lg leading-none">Smile البديل</span>
            <p className="text-purple-200 text-[10px] leading-none mt-0.5">
              Mourabaha Consommation
            </p>
          </div>
        </div>

        {/* Navigation pills */}
        <div className="flex gap-1 bg-white/10 rounded-xl p-1">
          <button
            onClick={() => onViewChange("simulation")}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeView === "simulation"
                ? "bg-white text-[#6A1B9A] shadow"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Simulation
          </button>
          <button
            onClick={() => onViewChange("checklist")}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeView === "checklist"
                ? "bg-white text-[#6A1B9A] shadow"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Check-List
          </button>
          <button
            onClick={() => onViewChange("admin")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeView === "admin"
                ? "bg-white text-[#6A1B9A] shadow font-semibold"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
