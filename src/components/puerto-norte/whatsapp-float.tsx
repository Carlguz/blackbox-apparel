"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { buildGeneralWhatsAppLink } from "./data";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-show tooltip after a delay
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShowTooltip(true), 1500);
      const t2 = setTimeout(() => setShowTooltip(false), 8000);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [visible]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-0 right-0 mb-20 mr-2 bg-white shadow-2xl border border-[#E5E0D5] p-4 max-w-[260px] animate-fade-in-up">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-[#0B1F3A]/40 hover:text-[#0B1F3A]"
            aria-label="Cerrar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-3 pr-4">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0B1F3A] mb-1">
                ¿Tienes dudas?
              </p>
              <p className="text-xs text-[#0B1F3A]/60 leading-relaxed">
                Escríbenos por WhatsApp. Respondemos en 5 minutos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main button */}
      <a
        href={buildGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-2xl shadow-[#25D366]/40 hover:bg-[#1FB855] hover:scale-110 transition-all duration-300 group relative"
        aria-label="Pedir por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white group-hover:rotate-12 transition-transform" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </a>
    </div>
  );
}
