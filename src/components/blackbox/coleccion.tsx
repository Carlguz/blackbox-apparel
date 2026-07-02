import Link from "next/link";
import { type SiteContentData, buildWhatsAppLinkWithTracking } from "./content";
import { ArrowUpRight } from "lucide-react";

export function Coleccion({ content }: { content: SiteContentData }) {
  const { coleccion, products, whatsappNumber } = content;
  const visibleProducts = products.filter((p) => p.published !== false);
  return (
    <section id="coleccion" className="py-[120px] px-5 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h3 className="text-headline-xl text-black">{coleccion.title}</h3>
          <p className="text-body-md text-[#444748]">{coleccion.subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProducts.map((product) => {
          const totalStock = Object.values(product.stock || {}).reduce((a, b) => a + b, 0);
          const lowStock = totalStock > 0 && totalStock < 30;
          return (
            <div key={product.id} className="group product-card-hover">
              <div className="aspect-[3/4] bg-[#f9f9f9] overflow-hidden relative mb-6">
                <Link href={`/producto/${product.id}`}>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    style={{ backgroundImage: `url('${product.image}')` }}
                    role="img"
                    aria-label={product.alt}
                  />
                </Link>

                {/* Stock badge */}
                {totalStock === 0 ? (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 text-label-caps uppercase">
                    Agotado
                  </div>
                ) : lowStock ? (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1.5 text-label-caps uppercase">
                    Bajo stock
                  </div>
                ) : null}

                {/* Hover overlay with actions */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                  <a
                    href={buildWhatsAppLinkWithTracking(whatsappNumber, product.id, product.name, product.price, undefined, "landing")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] text-white py-3.5 text-button uppercase text-center hover:bg-[#1FB855] transition-colors"
                  >
                    Pedir por WhatsApp
                  </a>
                  <Link
                    href={`/producto/${product.id}`}
                    className="block w-full bg-black text-white py-3.5 text-button uppercase text-center hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                  >
                    Ver detalles
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-body-md text-black font-medium">{product.name}</h4>
                  <p className="text-label-caps text-[#444748] uppercase mt-1">{product.label}</p>
                </div>
                <span className="text-label-caps text-black">{product.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
