export function Modelo() {
  return (
    <section className="py-[120px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-12 gap-6 h-[700px]">
          {/* Imagen grande col-span-8 */}
          <div className="col-span-12 md:col-span-8 h-full relative group overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/products/modelo-grande.png')" }}
              role="img"
              aria-label="Modelo con polo BLACKBOX caminando en distrito urbano moderno"
            />
          </div>

          {/* Columna derecha col-span-4 con 2 imágenes apiladas */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6 h-full">
            <div className="h-1/2 relative group overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: "url('/products/modelo-cuello.png')" }}
                role="img"
                aria-label="Detalle del cuello de polo navy blue BLACKBOX"
              />
            </div>
            <div className="h-1/2 relative group overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: "url('/products/polo-phantom-back.png')" }}
                role="img"
                aria-label="Detalle posterior de polo blanco BLACKBOX contra pared de concreto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
