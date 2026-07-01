"use client";

import { useEffect, useState } from "react";
import { type SiteContentData, buildWhatsAppLink } from "./content";

export function WhatsAppFloat({ content }: { content: SiteContentData }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={buildWhatsAppLink(content.whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 right-8 z-40 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Comprar por WhatsApp"
    >
      <span className="material-symbols-outlined text-3xl">chat</span>
    </a>
  );
}
