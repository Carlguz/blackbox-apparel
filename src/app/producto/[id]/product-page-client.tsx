"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type SiteContentData, type EditableProduct, buildWhatsAppLinkWithTracking } from "@/components/blackbox/content";
import { Header } from "@/components/blackbox/header";
import { Footer } from "@/components/blackbox/footer";
import { WhatsAppFloat } from "@/components/blackbox/whatsapp-float";
import { ArrowLeft, MessageCircle, Check, Truck, ShieldCheck, Ruler } from "lucide-react";

const SIZES: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[] = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductPageClient({
  product,
  content,
}: {
  product: EditableProduct;
  content: SiteContentData;
}) {
  const [size, setSize] = useState<string>(product.sizes?.[0] || "M");
  const [qty, setQty] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Track page view
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: `/producto/${product.id}`,
        referrer: typeof document !== "undefined" ? document.referrer : null,
        device: typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobile") ? "mobile" : "desktop") : null,
      }),
    }).catch(() => {});
  }, [product.id]);

  const stock = product.stock?.[size] ?? 0;
  const outOfStock = stock === 0;
  const relatedProducts = content.products.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />
      <main className="flex-1 pt-20">
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 py-6">
          <Link href="/#coleccion" className="inline-flex items-center gap-2 text-label-caps text-[#444748] uppercase hover:text-black transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a la colección
          </Link>
        </div>

        {/* Product layout */}
        <section className="max-w-[1440px] mx-auto px-5 md:px-12 pb-20 grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-[#eeeeee] overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.alt} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 text-label-caps uppercase">
                {product.label}
              </div>
            </div>
            {product.backImage && (
              <div className="aspect-[3/4] bg-[#eeeeee] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.backImage} alt={`${product.alt} - espalda`} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-display-lg-mobile md:text-display-lg text-black font-semibold leading-none tracking-[-0.04em]">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 mt-2">
                <span className="text-headline-lg text-black">{product.price}</span>
                <span className="text-label-caps text-[#666] uppercase">{product.label}</span>
              </div>
            </div>

            <p className="text-body-lg text-[#1a1c1c] leading-relaxed">{product.description}</p>

            {/* Stock indicator */}
            <div className="flex items-center gap-3">
              <span
                className={`w-2 h-2 rounded-full ${outOfStock ? "bg-red-500" : stock < 10 ? "bg-yellow-500" : "bg-[#25D366]"}`}
              />
              <span className="text-body-md text-[#444748]">
                {outOfStock ? "Agotado" : stock < 10 ? `¡Solo ${stock} disponibles en talla ${size}!` : "Disponible"}
              </span>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-label-caps text-[#444748] uppercase">Talla</span>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="inline-flex items-center gap-1.5 text-label-caps text-[#444748] uppercase hover:text-black transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  Guía de tallas
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => {
                  const available = (product.sizes || []).includes(s);
                  const isSelected = size === s;
                  return (
                    <button
                      key={s}
                      onClick={() => available && setSize(s)}
                      disabled={!available}
                      className={`w-12 h-12 text-button font-medium border transition-all ${
                        isSelected
                          ? "bg-black text-white border-black"
                          : available
                          ? "bg-white text-black border-[#c4c7c7] hover:border-black"
                          : "bg-[#f3f3f3] text-[#999] border-[#eee] line-through cursor-not-allowed"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size guide collapsible */}
            {showSizeGuide && (
              <div className="bg-white border border-[#c4c7c7] p-6">
                <h3 className="text-headline-lg text-black mb-4">{content.sizeGuide.title}</h3>
                <table className="w-full text-body-md">
                  <thead>
                    <tr className="border-b border-[#c4c7c7]">
                      <th className="text-left py-2 text-label-caps uppercase text-[#666]">Talla</th>
                      <th className="text-left py-2 text-label-caps uppercase text-[#666]">Pecho</th>
                      <th className="text-left py-2 text-label-caps uppercase text-[#666]">Largo</th>
                      <th className="text-left py-2 text-label-caps uppercase text-[#666]">Cintura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.sizeGuide.rows.map((r) => (
                      <tr key={r.size} className="border-b border-[#eee]">
                        <td className="py-3 font-medium text-black">{r.size}</td>
                        <td className="py-3 text-[#444]">{r.chest}</td>
                        <td className="py-3 text-[#444]">{r.length}</td>
                        <td className="py-3 text-[#444]">{r.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity */}
            <div>
              <span className="text-label-caps text-[#444748] uppercase block mb-3">Cantidad</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 border border-[#c4c7c7] text-black hover:border-black"
                >
                  −
                </button>
                <span className="text-body-lg font-medium w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(stock || 99, qty + 1))}
                  className="w-10 h-10 border border-[#c4c7c7] text-black hover:border-black"
                >
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={buildWhatsAppLinkWithTracking(
                content.whatsappNumber,
                product.id,
                product.name,
                product.price,
                size,
                "product_page"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-button uppercase tracking-wider transition-all ${
                outOfStock
                  ? "bg-[#999] text-white cursor-not-allowed pointer-events-none"
                  : "bg-[#25D366] text-white hover:bg-[#1FB855] hover:-translate-y-0.5"
              }`}
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              {outOfStock ? "Agotado" : `Pedir por WhatsApp · ${size} × ${qty}`}
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#c4c7c7]">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto text-black mb-2" strokeWidth={1.2} />
                <p className="text-label-caps text-[#666] uppercase">24-48h Lima</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-5 h-5 mx-auto text-black mb-2" strokeWidth={1.2} />
                <p className="text-label-caps text-[#666] uppercase">Garantía 15d</p>
              </div>
              <div className="text-center">
                <Check className="w-5 h-5 mx-auto text-black mb-2" strokeWidth={1.2} />
                <p className="text-label-caps text-[#666] uppercase">Pago contra entrega</p>
              </div>
            </div>

            {/* Story */}
            {product.story && (
              <div className="pt-6 border-t border-[#c4c7c7]">
                <h3 className="text-headline-lg text-black mb-3">Historia</h3>
                <p className="text-body-md text-[#444] leading-relaxed">{product.story}</p>
              </div>
            )}

            {/* Specs */}
            <div className="pt-6 border-t border-[#c4c7c7] space-y-4">
              {product.material && (
                <div>
                  <span className="text-label-caps text-[#666] uppercase block mb-1">Material</span>
                  <p className="text-body-md text-black">{product.material}</p>
                </div>
              )}
              {product.care && (
                <div>
                  <span className="text-label-caps text-[#666] uppercase block mb-1">Cuidados</span>
                  <p className="text-body-md text-black">{product.care}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="max-w-[1440px] mx-auto px-5 md:px-12 py-16 border-t border-[#c4c7c7]">
            <h2 className="text-headline-xl text-black mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/producto/${p.id}`} className="group">
                  <div className="aspect-[3/4] bg-[#eeeeee] overflow-hidden relative mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-body-md text-black font-medium">{p.name}</h3>
                    <span className="text-label-caps text-black">{p.price}</span>
                  </div>
                  <p className="text-label-caps text-[#666] uppercase mt-1">{p.label}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer content={content} />
      <WhatsAppFloat content={content} />
    </div>
  );
}
