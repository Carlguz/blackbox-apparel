"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9f9]/80 backdrop-blur-md border-b border-[#c4c7c7]/30 h-20">
      <div className="flex justify-between items-center px-5 md:px-12 h-full max-w-[1440px] mx-auto">
        <a href="#top" className="text-headline-xl font-bold tracking-tighter text-black">
          BLACKBOX APPAREL
        </a>
        <nav className="hidden md:flex gap-8">
          <a className="text-button uppercase text-black border-b-2 border-black pb-1" href="#coleccion">
            Colección
          </a>
          <a className="text-button uppercase text-[#444748] hover:text-black transition-colors" href="#filosofia">
            Nuestra Historia
          </a>
          <a className="text-button uppercase text-[#444748] hover:text-black transition-colors" href="#footer">
            WhatsApp
          </a>
        </nav>
        {/* Espacio vacío a la derecha - sin carrito ni cuenta (todo por WhatsApp) */}
        <div className="w-12 md:w-20" />
      </div>
    </header>
  );
}
