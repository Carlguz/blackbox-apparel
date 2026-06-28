import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { buildGeneralWhatsAppLink, WHATSAPP_NUMBER } from "./data";

export function Footer() {
  const whatsappDisplay = `+51 ${WHATSAPP_NUMBER.slice(2, 4)} ${WHATSAPP_NUMBER.slice(4, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

  return (
    <footer className="bg-[#061425] text-[#FAF8F4] pt-20 pb-10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top section */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16 pb-16 border-b border-[#1F3251]">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-serif text-3xl font-semibold text-white">
                Puerto
              </span>
              <span className="font-serif italic text-3xl font-light text-[#C9A961]">
                Norte
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-8">
              Marca peruana independiente de polos premium inspirados en la
              herencia cultural del hincha. Sin escudos, sin nombres
              registrados. Solo esencia. Herencia que se lleva puesto.
            </p>

            {/* WhatsApp big CTA */}
            <a
              href={buildGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#25D366] text-[#061425] text-xs uppercase tracking-wide-luxe font-semibold hover:bg-[#1FB855] transition-all duration-300 mb-6"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Escríbenos por WhatsApp
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#1F3251] hover:border-[#C9A961] flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white group-hover:text-[#C9A961] transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-luxe text-[#C9A961] font-medium mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Manifiesto", href: "#manifiesto" },
                { label: "Colección", href: "#coleccion" },
                { label: "Cómo comprar", href: "#como-comprar" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#C9A961] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Models */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-luxe text-[#C9A961] font-medium mb-5">
              Colección
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#callao" className="text-sm text-white/60 hover:text-[#C9A961] transition-colors">
                  Polo Callao · S/ 45
                </a>
              </li>
              <li>
                <a href="#grone" className="text-sm text-white/60 hover:text-[#C9A961] transition-colors">
                  Polo Grone · S/ 48
                </a>
              </li>
              <li>
                <a href="#maute" className="text-sm text-white/60 hover:text-[#C9A961] transition-colors">
                  Polo Maute · S/ 52
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-luxe text-[#C9A961] font-medium mb-5">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-0.5 text-[#25D366] flex-shrink-0" />
                <div>
                  <a
                    href={buildGeneralWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A961] transition-colors block"
                  >
                    {whatsappDisplay}
                  </a>
                  <span className="text-xs text-white/40">WhatsApp directo</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-[#5B8DBF] flex-shrink-0" />
                <div>
                  <span className="leading-relaxed block">
                    Lun – Sáb · 9am – 8pm
                  </span>
                  <span className="text-xs text-white/40">Domingo cerrado</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#5B8DBF] flex-shrink-0" />
                <div>
                  <span className="leading-relaxed block">
                    Producción en Gamarra
                  </span>
                  <span className="text-xs text-white/40">Envíos a todo el Perú</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mb-10 p-6 bg-[#0B1F3A] border border-[#1F3251]">
          <p className="text-xs text-white/50 leading-relaxed">
            <span className="text-[#C9A961] font-medium uppercase tracking-wide-luxe text-[10px] block mb-2">
              Aviso legal
            </span>
            Puerto Norte es una marca independiente y no está afiliada, patrocinada
            ni autorizada por ningún club deportivo. No utilizamos escudos, logos,
            nombres comerciales ni marcas registradas de terceros. Los guiños
            culturales (años históricos, jerga popular, paletas de color) son
            homenajes a la cultura del hincha y no constituyen uso de propiedad
            intelectual protegida. Cada diseño es original de Puerto Norte.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/40">
          <div>
            © 2026 Puerto Norte. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#C9A961] transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-[#C9A961] transition-colors">
              Términos de venta
            </a>
            <a href="#" className="hover:text-[#C9A961] transition-colors">
              Envíos y devoluciones
            </a>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-10 pt-10 border-t border-[#1F3251] text-center">
          <p className="font-serif italic text-white/30 text-sm">
            Herencia que se lleva puesto.
          </p>
        </div>
      </div>
    </footer>
  );
}
