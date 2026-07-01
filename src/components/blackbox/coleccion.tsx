import { products, buildWhatsAppLink } from "./data";

export function Coleccion() {
  return (
    <section id="coleccion" className="py-[120px] px-5 md:px-12 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h3 className="text-headline-xl text-black">Colección 001</h3>
          <p className="text-body-md text-[#444748]">
            La base de cualquier armario sofisticado.
          </p>
        </div>
      </div>

      {/* Grid 3 cols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group product-card-hover">
            {/* Image container aspect 3:4 */}
            <div className="aspect-[3/4] bg-[#f9f9f9] overflow-hidden relative mb-6">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${product.image}')` }}
                role="img"
                aria-label={product.alt}
              />
              {/* Hover overlay with WhatsApp button */}
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={buildWhatsAppLink(product.id, product.name, product.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black text-white py-4 text-button uppercase text-center hover:bg-[#25D366] transition-colors"
                >
                  Pedir por WhatsApp
                </a>
              </div>
            </div>

            {/* Footer: name + label + price */}
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-body-md text-black font-medium">{product.name}</h4>
                <p className="text-label-caps text-[#444748] uppercase mt-1">
                  {product.label}
                </p>
              </div>
              <span className="text-label-caps text-black">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
