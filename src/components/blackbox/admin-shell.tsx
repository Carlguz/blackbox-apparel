"use client";

import { useState, useEffect } from "react";
import { AdminPanel } from "./admin-panel";
import { type SiteContentData } from "./content";

const ADMIN_PASSWORD = "blackbox2026";

export function AdminShell({
  content,
  setContent,
  save,
  saving,
}: {
  content: SiteContentData;
  setContent: (next: SiteContentData) => void;
  save: (next: SiteContentData) => Promise<boolean>;
  saving: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Poll for pending orders (badge)
  const badgeEnabled = content.notifications?.whatsappBadgeEnabled;
  useEffect(() => {
    if (!badgeEnabled) return;
    let mounted = true;
    const check = async () => {
      try {
        const res = await fetch("/api/orders?status=pending", { cache: "no-store" });
        const json = await res.json();
        if (mounted) setPendingCount(json.orders?.length || 0);
      } catch {}
    };
    check();
    const interval = setInterval(check, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [badgeEnabled]);

  const handleUnlock = () => {
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-40 bg-black/80 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center shadow-xl hover:bg-black hover:scale-110 transition-all relative"
        aria-label="Panel de administración"
        title="Panel de administración"
      >
        <span className="material-symbols-outlined">settings</span>
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {pendingCount > 9 ? "9+" : pendingCount}
          </span>
        )}
      </button>
    );
  }

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4">
        <div className="bg-white max-w-sm w-full p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-headline-lg text-black">Admin</h2>
            <button
              onClick={() => {
                setOpen(false);
                setPassword("");
                setError(false);
              }}
              className="text-[#666] hover:text-black"
              aria-label="Cerrar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <p className="text-body-md text-[#444748] mb-6">
            Ingresa la contraseña para editar el contenido de la landing.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            placeholder="Contraseña"
            className="w-full px-4 py-3 border border-[#c4c7c7] focus:border-black outline-none text-black"
            autoFocus
          />
          {error && <p className="text-sm text-red-600 mt-2">Contraseña incorrecta</p>}
          <button
            onClick={handleUnlock}
            className="w-full mt-4 bg-black text-white py-3 text-button uppercase tracking-wider hover:bg-[#25D366] transition-colors"
          >
            Entrar
          </button>
          <p className="text-xs text-[#666] mt-4 text-center">
            Pista: la contraseña por defecto es <code className="bg-[#eeeeee] px-1 py-0.5">blackbox2026</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminPanel
      content={content}
      setContent={setContent}
      save={save}
      saving={saving}
      onClose={() => {
        setOpen(false);
        setUnlocked(false);
        setPassword("");
      }}
    />
  );
}
