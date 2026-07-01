import { type SiteContentData, buildWhatsAppLink } from "./content";

export function CTA({ content }: { content: SiteContentData }) {
  const { cta, whatsappNumber } = content;
  return (
    <section className="py-[120px] bg-[#f9f9f9] border-t border-[#c4c7c7]/30 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 text-center relative z-10">
        <h2 className="text-display-lg text-black mb-8 leading-tight font-semibold tracking-[-0.04em]">
          {cta.title}
        </h2>
        <p className="text-body-lg text-[#444748] mb-12 max-w-xl mx-auto">{cta.subtitle}</p>
        <a
          href={buildWhatsAppLink(whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-[#25D366] text-white px-12 py-6 text-button uppercase tracking-[0.2em] transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 hover:bg-[#1FB855]"
        >
          <span className="material-symbols-outlined">chat</span>
          {cta.buttonText}
        </a>
      </div>
    </section>
  );
}
