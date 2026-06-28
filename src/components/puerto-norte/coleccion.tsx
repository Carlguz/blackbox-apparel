import { products } from "./data";
import { Plus } from "lucide-react";

export function Coleccion() {
  return (
    <section id="coleccion" className="bg-[#FFFFFF] py-24 md:py-36 border-t border-[#E5E0D5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A961]" />
              <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
                La Colección
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0B1F3A] leading-[1.05] text-balance">
              Tres modelos. <span className="italic font-light text-[#5B8DBF]">Tres ocasiones.</span>
              <br />
              Una sola identidad.
            </h2>
          </div>
          <p className="text-[#0B1F3A]/60 text-sm md:text-base max-w-sm leading-relaxed">
            Cada polo resuelve una necesidad distinta del hincha moderno. Día,
            noche, reunión. Lo que no cambia es la calidad y el guiño.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, idx) => (
            <article
              key={product.id}
              className="group flex flex-col bg-[#FAF8F4] hover:bg-white transition-all duration-500 border border-[#E5E0D5] hover:border-[#0B1F3A]/30 hover:shadow-2xl hover:shadow-[#0B1F3A]/10"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[#F5F1EA]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={`Polo ${product.name} de Puerto Norte`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0B1F3A] text-[#FAF8F4] px-3 py-1.5 text-[10px] uppercase tracking-wide-luxe font-medium">
                  0{idx + 1}
                </div>
                <div className="absolute bottom-4 right-4 bg-[#FAF8F4]/95 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-wide-luxe font-medium text-[#0B1F3A]">
                  {product.price}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6 lg:p-8">
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <h3 className="font-serif text-3xl text-[#0B1F3A]">
                    {product.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wide-luxe text-[#C9A961] font-medium">
                    {product.occasion.split(",")[0]}
                  </span>
                </div>
                <p className="font-serif italic text-[#5B8DBF] text-base mb-4">
                  {product.tagline}
                </p>
                <p className="text-sm text-[#0B1F3A]/70 leading-relaxed mb-6 flex-1">
                  {product.description}
                </p>

                {/* Details */}
                <ul className="space-y-2 mb-6 pt-6 border-t border-[#E5E0D5]">
                  {product.details.slice(0, 2).map((d, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#0B1F3A]/60 flex items-start gap-2 leading-relaxed"
                    >
                      <Plus className="w-3 h-3 mt-0.5 text-[#C9A961] flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-[10px] uppercase tracking-wide-luxe">
                  <div>
                    <div className="text-[#0B1F3A]/40 mb-1">Tela</div>
                    <div className="text-[#0B1F3A] font-medium text-[11px] normal-case tracking-normal">
                      {product.fabric}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#0B1F3A]/40 mb-1">Corte</div>
                    <div className="text-[#0B1F3A] font-medium text-[11px] normal-case tracking-normal">
                      {product.fit}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#preorder"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B1F3A] text-[#FAF8F4] text-xs uppercase tracking-wide-luxe font-medium hover:bg-[#061425] transition-all duration-300 group/btn"
                >
                  Reservar {product.name}
                  <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform duration-500" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-12 border-t border-[#E5E0D5]">
          <p className="text-sm text-[#0B1F3A]/60 max-w-md leading-relaxed">
            Producción de serie corta: cada lote se fabrica una sola vez. Si un
            modelo se agota, no se repone hasta la siguiente temporada.
          </p>
          <a
            href="#preorder"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wide-luxe font-medium text-[#0B1F3A] border-b border-[#0B1F3A] pb-1 hover:text-[#C9A961] hover:border-[#C9A961] transition-colors"
          >
            Reservar toda la colección
          </a>
        </div>
      </div>
    </section>
  );
}
