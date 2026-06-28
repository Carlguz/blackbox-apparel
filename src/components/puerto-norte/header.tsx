"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const navItems = [
  { label: "Manifiesto", href: "#manifiesto" },
  { label: "Colección", href: "#coleccion" },
  { label: "Versatilidad", href: "#versatilidad" },
  { label: "Detalles", href: "#detalles" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F4]/95 backdrop-blur-md border-b border-[#E5E0D5] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-baseline gap-2 group">
          <span
            className={`font-serif text-2xl md:text-3xl font-semibold tracking-tight transition-colors ${
              scrolled ? "text-[#0B1F3A]" : "text-white"
            }`}
          >
            Puerto
          </span>
          <span
            className={`font-serif italic text-2xl md:text-3xl font-light transition-colors ${
              scrolled ? "text-[#C9A961]" : "text-[#C9A961]"
            }`}
          >
            Norte
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-xs uppercase tracking-wide-luxe font-medium transition-colors hover:text-[#C9A961] ${
                scrolled ? "text-[#0B1F3A]" : "text-white/90"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#preorder"
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wide-luxe font-medium transition-all duration-300 ${
              scrolled
                ? "bg-[#0B1F3A] text-[#FAF8F4] hover:bg-[#061425]"
                : "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:bg-white hover:text-[#0B1F3A]"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Reservar
          </a>

          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-1.5 transition-colors ${
              scrolled ? "text-[#0B1F3A]" : "text-white"
            }`}
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#FAF8F4] border-t border-[#E5E0D5] mt-3">
          <nav className="px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-wide-luxe font-medium text-[#0B1F3A] border-b border-[#E5E0D5]/50 last:border-0 hover:text-[#C9A961] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#preorder"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs uppercase tracking-wide-luxe font-medium bg-[#0B1F3A] text-[#FAF8F4]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Reservar ahora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
