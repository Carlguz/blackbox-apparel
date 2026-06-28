import { MessageCircle, Clock, Truck, ShieldCheck } from "lucide-react";
import { buildGeneralWhatsAppLink } from "./data";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Escríbenos por WhatsApp",
    description:
      "Toca cualquier botón verde de la página. Te responde una persona real, no un bot. Cuéntanos qué polo y talla quieres.",
  },
  {
    icon: Clock,
    step: "02",
    title: "Coordinamos en 5 minutos",
    description:
      "Confirmamos disponibilidad, talla y dirección. Aceptamos Yape, Plin, transferencia o efectivo contra entrega en Lima.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Lo recibes en 24-48h",
    description:
      "Envíos dentro de Lima en 24 horas. Provincias en 3-5 días. Gratis en pedidos sobre S/ 150.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "Garantía de 15 días",
    description:
      "Si algo no calza, lo cambiamos. Sin preguntas. Si no te convence, lo devuelves. Sin trabas.",
  },
];

export function ComoComprar() {
  return (
    <section id="como-comprar" className="bg-[#FAF8F4] py-20 md:py-32 border-t border-[#E5E0D5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A961]" />
            <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
              Cómo comprar
            </span>
            <div className="h-px w-12 bg-[#C9A961]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#0B1F3A] leading-[1.1] text-balance">
            Pedir es <span className="italic font-light text-[#5B8DBF]">simple</span>.
          </h2>
          <p className="mt-4 text-[#0B1F3A]/60 text-sm md:text-base">
            Sin carro de compras, sin formularios. Directo al WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-white border border-[#E5E0D5] p-6 hover:border-[#C9A961]/40 hover:shadow-lg hover:shadow-[#0B1F3A]/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-6 h-6 text-[#0B1F3A]" />
                  <span className="font-serif text-2xl text-[#C9A961]">{s.step}</span>
                </div>
                <h3 className="font-serif text-lg text-[#0B1F3A] mb-2 leading-tight">
                  {s.title}
                </h3>
                <p className="text-xs text-[#0B1F3A]/60 leading-relaxed">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Big CTA */}
        <div className="mt-12 text-center">
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-[#061425] text-xs uppercase tracking-wide-luxe font-semibold hover:bg-[#1FB855] transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Empezar mi pedido ahora
          </a>
        </div>
      </div>
    </section>
  );
}
