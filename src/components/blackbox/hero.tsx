"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppLink } from "./data";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative h-[921px] w-full overflow-hidden flex items-center pt-20"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{
            backgroundImage: "url('/products/hero-v3.png')",
            transform: `scale(1.05) translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="text-display-lg md:text-display-lg text-white mb-6 leading-none font-semibold tracking-[-0.04em]">
            No vendemos ropa.
            <br />
            Construimos presencia.
          </h1>
          <p className="text-body-lg text-white/90 mb-10 max-w-lg">
            Polos premium diseñados en Perú para potenciar tu estilo, confianza y fit diario.
          </p>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 text-button uppercase tracking-wider transition-transform active:scale-95 shadow-xl hover:bg-[#1FB855]"
          >
            <span className="material-symbols-outlined">chat</span>
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
