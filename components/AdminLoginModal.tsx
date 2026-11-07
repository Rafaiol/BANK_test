"use client";

import React, { useState } from "react";
import { Shield, Lock, User, Eye, EyeOff, X, AlertCircle } from "lucide-react";
import SmileLogo from "@/components/SmileLogo";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({
  isOpen,
  onClose,
  onSuccess,
}: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Verification check:
    // Username: "admin"
    // Password: "admin" or "admin2026" or "albadil"
    setTimeout(() => {
      if (
        cleanUser === "admin" &&
        (cleanPass === "admin" ||
          cleanPass === "admin2026" ||
          cleanPass === "albadil" ||
          cleanPass === "smile2026")
      ) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("smile_admin_auth", "true");
        }
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SmileLogo size="sm" withShadow={false} />
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Espace Administrateur
              </h3>
              <p className="text-[11px] text-purple-200">
                Accès sécurisé — Authentification requise
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="text-center space-y-1 pb-1">
            <div className="w-11 h-11 mx-auto rounded-full bg-purple-50 text-[#6A1B9A] flex items-center justify-center border border-purple-100">
              <Shield className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Veuillez saisir vos identifiants administrateur pour gérer les données et la configuration.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Nom d'utilisateur */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">
              Nom d&apos;utilisateur
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
                placeholder="Ex: admin"
                className="w-full pl-9 pr-3.5 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8A1C86] to-[#6A1B9A] hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span>Connexion…</span>
                </>
              ) : (
                <span>Se connecter</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

