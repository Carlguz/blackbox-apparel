import { MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppLink } from "./data";

export function Manifiesto() {
  return (
    <section id="manifiesto" className="bg-[#0B1F3A] text-[#FAF8F4] py-20 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-[#C9A961]" />
          <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
            Manifiesto
          </span>
          <div className="h-px w-12 bg-[#C9A961]" />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-10 text-balance">
          Para el hincha que ya no necesita
          <span className="italic font-light text-[#C9A961]"> gritar</span>.
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
          <p>
            Nacimos de una incomodidad compartida. Durante décadas, la única
            forma de llevar tu colors en público era la camiseta oficial:
            vibrante, histriónica, perfecta para la tribuna pero imposible en
            una cena, una oficina o un cumpleaños.
          </p>
          <p>
            Existe una generación de hinchas que ya no busca lo vulgar. Busca
            prendas que pueda usar cualquier día, en cualquier ocasión. Sin
            que nadie pregunte por qué lleva puesta una camiseta de fútbol
            donde no corresponde. Quieren elegancia, versatilidad,
            reconocimiento silencioso.
          </p>
          <p className="font-serif italic text-white text-xl md:text-2xl pt-4">
            Puerto Norte es la respuesta. Sin escudos, sin logos, sin nombres
            registrados. Solo esencia. Herencia que se lleva puesto.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-[#061425] text-xs uppercase tracking-wide-luxe font-semibold hover:bg-[#1FB855] transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Hablar con Puerto Norte
          </a>
        </div>
      </div>
    </section>
  );
}
