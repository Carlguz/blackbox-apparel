import { type SiteContentData, buildWhatsAppLink } from "./content";
import { SocialLinksDisplay } from "./social-links";

export function Footer({ content }: { content: SiteContentData }) {
  const { footer, whatsappNumber, social } = content;
  return (
    <footer id="footer" className="bg-black py-[120px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12">
        {/* Top: brand + social */}
        <div className="grid md:grid-cols-3 gap-10 mb-14 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="text-headline-lg font-black text-white mb-5">BLACKBOX APPAREL</div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              No vendemos ropa. Construimos presencia. Marca peruana de polos premium con identidad propia.
            </p>
            {/* WhatsApp direct */}
            <a
              href={buildWhatsAppLink(whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-label-caps text-white/80 hover:text-[#25D366] transition-colors uppercase"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              WhatsApp directo
            </a>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-label-caps text-[#25D366] font-bold uppercase mb-5">Síguenos</h4>
            {Object.values(social).every((v) => !v?.trim()) ? (
              <p className="text-sm text-white/40 italic">
                Configura tus redes en el panel admin → General
              </p>
            ) : (
              <SocialLinksDisplay social={social} variant="light" size="md" />
            )}
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-label-caps text-[#25D366] font-bold uppercase mb-5">Legal</h4>
            <ul className="space-y-3">
              {["Privacidad", "Términos", "Envíos", "Contacto"].map((link) => (
                <li key={link}>
                  <a className="text-sm text-white/60 hover:text-white transition-colors" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-label-caps text-white/40 text-center md:text-left">
            {footer.copyright}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-label-caps text-white/60 hover:text-[#25D366] transition-colors group mx-auto md:mx-0 uppercase"
          >
            Volver arriba
            <span className="material-symbols-outlined text-base group-hover:-translate-y-0.5 transition-transform">arrow_upward</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
