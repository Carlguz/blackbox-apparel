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
        <div className="text-headline-xl font-bold tracking-tighter text-black">
          BLACKBOX APPAREL
        </div>
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
        <div className="flex items-center gap-6">
          <button className="hover:opacity-70 transition-opacity" aria-label="Carrito">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="hover:opacity-70 transition-opacity" aria-label="Cuenta">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}
