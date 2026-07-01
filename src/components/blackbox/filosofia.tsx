import { type SiteContentData } from "./content";

export function Filosofia({ content }: { content: SiteContentData }) {
  const { filosofia } = content;
  return (
    <section id="filosofia" className="py-[120px] bg-white border-b border-[#c4c7c7]/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 text-center">
        <h2 className="text-label-caps text-[#444748] mb-8 uppercase tracking-[0.3em]">
          {filosofia.label}
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-headline-xl text-black leading-tight font-light italic">
            &ldquo;{filosofia.quote}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
