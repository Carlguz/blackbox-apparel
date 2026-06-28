"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "./data-faqs";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#FAF8F4] py-24 md:py-36 border-t border-[#E5E0D5]">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A961]" />
              <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
                Preguntas frecuentes
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-[1.05] text-balance">
              Lo que querrás
              <span className="italic font-light text-[#5B8DBF]"> saber</span>.
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="text-[#0B1F3A]/70 text-base leading-relaxed">
              Hemos recopilado las preguntas que más recibimos. Si tienes una
              duda que no está aquí, escríbenos por WhatsApp con el botón verde
              flotante o cualquier botón de la página. Te respondemos en menos
              de 5 minutos en horario de atención.
            </p>
          </div>
        </div>

        {/* FAQ list */}
        <div className="border-t border-[#E5E0D5]">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="border-b border-[#E5E0D5]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-4 flex-1">
                    <span className="text-xs text-[#C9A961] font-medium mt-1 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="font-serif text-xl md:text-2xl text-[#0B1F3A] group-hover:text-[#5B8DBF] transition-colors">
                      {faq.q}
                    </span>
                  </span>
                  <span className="mt-1 w-8 h-8 flex-shrink-0 flex items-center justify-center border border-[#0B1F3A]/20 rounded-full group-hover:border-[#C9A961] transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#0B1F3A]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#0B1F3A]" />
                    )}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-8"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#0B1F3A]/70 leading-relaxed pl-8 pr-12 text-sm md:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
