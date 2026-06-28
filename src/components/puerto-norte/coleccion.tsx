"use client";

import { useState } from "react";
import { products, buildWhatsAppLink, type Product } from "./data";
import { MessageCircle, Eye, Ruler, Shirt, Check } from "lucide-react";

function ProductGallery({ product, index }: { product: Product; index: number }) {
  const [view, setView] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const isReversed = index % 2 === 1;

  return (
    <article
      id={product.id}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      {/* Image gallery */}
      <div className={`lg:[direction:ltr] ${isReversed ? "lg:order-2" : ""}`}>
        {/* Main view */}
        <div className="relative aspect-square overflow-hidden bg-[#F5F1EA] border border-[#E5E0D5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={view === "front" ? product.frontImage : product.backImage}
            alt={`Polo ${product.name} - vista ${view === "front" ? "frontal" : "trasera"}`}
            className="w-full h-full object-cover object-center transition-all duration-500"
            key={view}
          />

          {/* View label */}
          <div className="absolute top-4 left-4 bg-[#0B1F3A]/95 backdrop-blur-sm text-[#FAF8F4] px-3 py-1.5 text-[10px] uppercase tracking-wide-luxe font-medium">
            {view === "front" ? "Frente" : "Espalda"}
          </div>

          {/* Product number */}
          <div className="absolute top-4 right-4 bg-[#C9A961] text-[#061425] px-3 py-1.5 text-[10px] uppercase tracking-wide-luxe font-bold">
            0{index + 1}
          </div>
        </div>

        {/* View toggle */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button
            onClick={() => setView("front")}
            className={`relative aspect-[4/3] overflow-hidden border-2 transition-all ${
              view === "front"
                ? "border-[#0B1F3A]"
                : "border-[#E5E0D5] hover:border-[#0B1F3A]/40"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.frontImage}
              alt={`Polo ${product.name} frente thumbnail`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-2 text-[10px] uppercase tracking-wide-luxe font-medium text-[#0B1F3A] bg-white/90 px-1.5 py-0.5">
              Frente
            </div>
          </button>
          <button
            onClick={() => setView("back")}
            className={`relative aspect-[4/3] overflow-hidden border-2 transition-all ${
              view === "back"
                ? "border-[#0B1F3A]"
                : "border-[#E5E0D5] hover:border-[#0B1F3A]/40"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.backImage}
              alt={`Polo ${product.name} espalda thumbnail`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-2 text-[10px] uppercase tracking-wide-luxe font-medium text-[#0B1F3A] bg-white/90 px-1.5 py-0.5">
              Espalda
            </div>
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className={`lg:[direction:ltr] ${isReversed ? "lg:order-1" : ""}`}>
        {/* Header */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="font-serif text-5xl md:text-6xl text-[#0B1F3A]">
            {product.name}
          </h3>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/40">
              Precio
            </div>
            <div className="font-serif text-3xl text-[#0B1F3A]">{product.price}</div>
          </div>
        </div>

        <p className="font-serif italic text-[#5B8DBF] text-lg mb-2">
          {product.tagline}
        </p>

        {/* Color chip */}
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-4 h-4 rounded-full border border-[#0B1F3A]/20"
            style={{ backgroundColor: product.colorHex }}
          />
          <span className="text-xs text-[#0B1F3A]/60 uppercase tracking-wide-luxe">
            {product.colorName}
          </span>
          <span className="text-xs text-[#0B1F3A]/40">·</span>
          <span className="text-xs text-[#0B1F3A]/60 uppercase tracking-wide-luxe">
            {product.occasion}
          </span>
        </div>

        {/* Concept */}
        <p className="text-sm text-[#0B1F3A]/70 leading-relaxed mb-6">
          {product.designConcept}
        </p>

        {/* Design breakdown */}
        <div className="space-y-3 mb-6 pt-6 border-t border-[#E5E0D5]">
          <div className="flex items-start gap-3">
            <Eye className="w-4 h-4 mt-0.5 text-[#C9A961] flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/40 mb-1">
                Diseño frente
              </div>
              <p className="text-xs text-[#0B1F3A]/80 leading-relaxed">
                {product.frontDesign}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Eye className="w-4 h-4 mt-0.5 text-[#C9A961] flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/40 mb-1">
                Diseño espalda
              </div>
              <p className="text-xs text-[#0B1F3A]/80 leading-relaxed">
                {product.backDesign}
              </p>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-start gap-2 p-3 bg-[#F5F1EA]">
            <Shirt className="w-3.5 h-3.5 mt-0.5 text-[#0B1F3A] flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/40">
                Tela
              </div>
              <div className="text-xs text-[#0B1F3A] font-medium leading-tight">
                {product.fabric}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 bg-[#F5F1EA]">
            <Ruler className="w-3.5 h-3.5 mt-0.5 text-[#0B1F3A] flex-shrink-0" />
            <div>
              <div className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/40">
                Corte
              </div>
              <div className="text-xs text-[#0B1F3A] font-medium leading-tight">
                {product.fit}
              </div>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <div className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/40 mb-2">
            Tallas disponibles
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 text-xs font-medium border transition-all ${
                  selectedSize === size
                    ? "bg-[#0B1F3A] text-[#FAF8F4] border-[#0B1F3A]"
                    : "bg-white text-[#0B1F3A] border-[#E5E0D5] hover:border-[#0B1F3A]/40"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={buildWhatsAppLink(product.id, product.name, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-[#061425] text-xs uppercase tracking-wide-luxe font-semibold hover:bg-[#1FB855] transition-all duration-300 group"
        >
          <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
          Pedir polo {product.name} · Talla {selectedSize}
        </a>

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#0B1F3A]/40">
          <Check className="w-3 h-3 text-[#25D366]" />
          <span>Respuesta en 5 min · Pago contra entrega en Lima</span>
        </div>
      </div>
    </article>
  );
}

export function Coleccion() {
  return (
    <section id="coleccion" className="bg-[#FAF8F4] py-20 md:py-32 border-t border-[#E5E0D5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A961]" />
            <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
              La Colección
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0B1F3A] leading-[1.05] text-balance">
            Tres modelos.
            <br />
            Tres ocasiones. <span className="italic font-light text-[#5B8DBF]">Una identidad.</span>
          </h2>
          <p className="mt-6 text-[#0B1F3A]/70 text-base md:text-lg leading-relaxed max-w-xl">
            Mira cada polo por delante y por detrás. Toca las vistas para
            alternar. Cuando decidas, pídelo por WhatsApp en un clic.
          </p>
        </div>

        {/* Products */}
        <div className="space-y-20 md:space-y-32">
          {products.map((product, idx) => (
            <ProductGallery key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
