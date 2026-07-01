import { type SiteContentData } from "./content";

export function Modelo({ content }: { content: SiteContentData }) {
  const { modelo } = content;
  return (
    <section className="py-[120px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-12 gap-6 h-[700px]">
          <div className="col-span-12 md:col-span-8 h-full relative group overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url('${modelo.imageGrande}')` }}
              role="img"
              aria-label="Modelo BLACKBOX en calle urbana"
            />
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6 h-full">
            <div className="h-1/2 relative group overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${modelo.imagePequena1}')` }}
                role="img"
                aria-label="Detalle cuello polo BLACKBOX"
              />
            </div>
            <div className="h-1/2 relative group overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${modelo.imagePequena2}')` }}
                role="img"
                aria-label="Detalle espalda polo BLACKBOX"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
