import { ArrowDown, Star } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-[#061425]">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/hero.png"
          alt="Hombre con polo navy elegante de Puerto Norte"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061425] via-[#061425]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061425] via-transparent to-[#061425]/40" />
      </div>

      {/* Decorative stripes (subtle nod) */}
      <div className="absolute top-0 right-0 h-full w-32 flex opacity-20 pointer-events-none">
        <div className="flex-1 bg-[#5B8DBF]" />
        <div className="flex-1 bg-transparent" />
        <div className="flex-1 bg-[#5B8DBF]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <div className="h-px w-12 bg-[#C9A961]" />
            <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
              Colección Inaugural · 2026
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] mb-8 text-balance animate-fade-in-up"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            Herencia que se
            <br />
            lleva <span className="italic text-[#C9A961] font-light">puesto</span>.
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg text-white/80 max-w-xl mb-10 leading-relaxed text-pretty animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            Polos premium inspirados en una identidad centenaria. Tres modelos
            pensados para el hincha que asiste a la reunión, la cena y el día a
            día sin renunciar a lo suyo. Elegancia silenciosa para quien ya no
            necesita camisetas que griten.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.55s", opacity: 0 }}
          >
            <a
              href="#coleccion"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FAF8F4] text-[#0B1F3A] text-xs uppercase tracking-wide-luxe font-medium hover:bg-[#C9A961] hover:text-[#061425] transition-all duration-300 group"
            >
              Ver la colección
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#manifiesto"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/40 text-white text-xs uppercase tracking-wide-luxe font-medium hover:bg-white/10 transition-all duration-300"
            >
              Conoce el manifiesto
            </a>
          </div>

          {/* Trust signals */}
          <div
            className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/60 animate-fade-in-up"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
              <span className="text-xs uppercase tracking-wide-luxe">Algodón Pima peruano</span>
            </div>
            <div className="hidden md:block h-px w-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
              <span className="text-xs uppercase tracking-wide-luxe">Producción limitada</span>
            </div>
            <div className="hidden md:block h-px w-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
              <span className="text-xs uppercase tracking-wide-luxe">Hecho en Lima</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] uppercase tracking-luxe">Desliza</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
