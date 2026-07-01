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
    <section id="top" className="relative h-[921px] w-full overflow-hidden flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <div
          className="bg-cover bg-center w-full h-full"
          style={{
            backgroundImage: `url('${hero.backgroundImage}')`,
            transform: `scale(1.05) translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div className="relative z-10 px-5 md:px-12 max-w-[1440px] mx-auto w-full">
        <div className="max-w-2xl">
          <h1 className="text-display-lg md:text-display-lg text-white mb-6 leading-none font-semibold tracking-[-0.04em]">
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </h1>
          <p className="text-body-lg text-white/90 mb-10 max-w-lg">{hero.subtitle}</p>
          <a
            href={buildWhatsAppLink(whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-5 text-button uppercase tracking-wider transition-transform active:scale-95 shadow-xl hover:bg-[#1FB855]"
          >
            <span className="material-symbols-outlined">chat</span>
            {hero.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
