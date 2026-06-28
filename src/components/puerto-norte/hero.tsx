import { ArrowDown, MessageCircle, Star } from "lucide-react";
import { buildGeneralWhatsAppLink } from "./data";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-[#061425]">
      {/* Background image - los 3 polos */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/hero.png"
          alt="Colección Puerto Norte: tres polos premium"
          className="w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061425] via-[#061425]/80 to-[#061425]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061425] via-transparent to-[#061425]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <div className="h-px w-12 bg-[#C9A961]" />
            <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
              Colección 2026 · Producción Gamarra
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] mb-6 text-balance animate-fade-in-up"
            style={{ animationDelay: "0.25s", opacity: 0 }}
          >
            Polos que
            <br />
            <span className="italic text-[#C9A961] font-light">dicen sin</span> gritar.
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg text-white/80 max-w-xl mb-8 leading-relaxed text-pretty animate-fade-in-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            Tres modelos pensados para el hincha que quiere llevar su identidad
            a la reunión, la cena y el día a día. Sin camisetas grotescas. Sin
            gritar lo que se lleva en el alma.
          </p>

          {/* Price line */}
          <div
            className="flex items-center gap-3 mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            <span className="text-xs uppercase tracking-wide-luxe text-white/50">Desde</span>
            <span className="font-serif text-3xl text-[#C9A961]">S/ 45</span>
            <span className="text-xs text-white/40">· Envío Lima 24h</span>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.55s", opacity: 0 }}
          >
            <a
              href={buildGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-[#061425] text-xs uppercase tracking-wide-luxe font-semibold hover:bg-[#1FB855] transition-all duration-300 group"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Pedir por WhatsApp
            </a>
            <a
              href="#coleccion"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/40 text-white text-xs uppercase tracking-wide-luxe font-medium hover:bg-white/10 transition-all duration-300 group"
            >
              Ver los 3 modelos
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Trust signals */}
          <div
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/60 animate-fade-in-up"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
              <span className="text-xs uppercase tracking-wide-luxe">Algodón Pima peruano</span>
            </div>
            <div className="hidden md:block h-px w-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
              <span className="text-xs uppercase tracking-wide-luxe">Estampado en Gamarra</span>
            </div>
            <div className="hidden md:block h-px w-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#C9A961] fill-[#C9A961]" />
              <span className="text-xs uppercase tracking-wide-luxe">Lote limitado</span>
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
