"use client";

import { useEffect, useState } from "react";
import { type SiteContentData, buildWhatsAppLink } from "./content";

export function Hero({ content }: { content: SiteContentData }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { hero, whatsappNumber } = content;

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-end md:items-center pb-24 md:pb-0 pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="bg-cover bg-top w-full h-[120%] absolute top-0 left-0 right-0"
          style={{
            backgroundImage: `url('${hero.backgroundImage}')`,
            transform: `translateY(${scrollY * 0.15}px)`,
            willChange: "transform",
          }}
        />
        {/* Gradient overlays for readability - softer at top to not hide model's head */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-5 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="text-display-lg-mobile md:text-display-lg text-white mb-6 leading-[0.95] font-semibold tracking-[-0.04em]">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </h1>
          <p className="text-body-lg text-white/90 mb-10 max-w-lg drop-shadow-lg">
            {hero.subtitle}
          </p>
          <a
            href={buildWhatsAppLink(whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 text-button uppercase tracking-wider transition-transform active:scale-95 shadow-xl hover:bg-[#1FB855] hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined">chat</span>
            {hero.ctaText}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-[10px] uppercase tracking-luxe">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
