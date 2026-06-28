export function Manifiesto() {
  return (
    <section id="manifiesto" className="bg-[#FAF8F4] py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A961]" />
            <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
              Manifiesto
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0B1F3A] leading-[1.05] text-balance">
            Para el hincha que ya no necesita
            <span className="italic font-light text-[#5B8DBF]"> gritar</span>.
          </h2>
        </div>

        {/* Body grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 space-y-6 text-[#0B1F3A]/80 text-lg leading-relaxed">
            <p>
              Nacimos de una incomodidad compartida. Durante décadas, la única
              forma de llevar tu colors en público era a través de la camiseta
              oficial: vibrante, histriónica, perfecta para la tribuna pero
              imposible en una cena, una oficina informal o un cumpleaños donde
              quieres verte bien sin renunciar a lo tuyo.
            </p>
            <p>
              Existe una generación de hinchas que ya no busca la camiseta
              grotesca, esa que solo sirve para el estadio. Busca prendas que
              puedan usar cualquier día de la semana, en cualquier ocasión, sin
              que nadie les pregunte por qué llevan puesta una camiseta de fútbol
              en una reunión seria. Quieren elegancia, quieren versatilidad,
              quieren reconocimiento silencioso.
            </p>
            <p>
              <span className="font-serif italic text-[#0B1F3A]">Puerto Norte</span> es
              la respuesta. Inspirados en la identidad porteña del Callao, en el
              año fundacional de una pasión centenaria, en la jerga que solo
              entiende quien pertenece, creamos prendas que celebran la
              pertenencia sin violar lo registrado. Sin escudos, sin logos
              oficiales, sin nombres protegidos. Solo esencia.
            </p>
            <p>
              Tres modelos. Tres ocasiones. Una sola identidad. El resto lo hace
              el porta: la forma de caminar, la conversación, el detalle
              imperceptible que solo otro hincha reconocerá. Eso es Puerto Norte:
              herencia que se lleva puesto, sin gritar lo que se lleva en el alma.
            </p>
          </div>

          {/* Pillars */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-l-2 border-[#C9A961] pl-6">
              <div className="text-xs uppercase tracking-wide-luxe text-[#C9A961] mb-2 font-medium">
                01 · Origen
              </div>
              <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">
                Callao, puerto de salida
              </h3>
              <p className="text-sm text-[#0B1F3A]/70 leading-relaxed">
                Inspirados en el primer puerto del Perú, donde una pasión
                centenaria echó raíces y se convirtió en identidad.
              </p>
            </div>

            <div className="border-l-2 border-[#5B8DBF] pl-6">
              <div className="text-xs uppercase tracking-wide-luxe text-[#5B8DBF] mb-2 font-medium">
                02 · Identidad
              </div>
              <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">
                Guiños, no gritos
              </h3>
              <p className="text-sm text-[#0B1F3A]/70 leading-relaxed">
                Sin escudos ni nombres registrados. Trabajamos con años, jerga
                popular y paletas de color que celebran la pertenencia con
                elegancia.
              </p>
            </div>

            <div className="border-l-2 border-[#0B1F3A] pl-6">
              <div className="text-xs uppercase tracking-wide-luxe text-[#0B1F3A] mb-2 font-medium">
                03 · Calidad
              </div>
              <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">
                Algodón Pima del Perú
              </h3>
              <p className="text-sm text-[#0B1F3A]/70 leading-relaxed">
                Una de las fibras más finas del mundo, cultivada en la costa
                norte peruana. Suavidad, durabilidad y caída que se nota.
              </p>
            </div>

            <div className="border-l-2 border-[#C9A961]/60 pl-6">
              <div className="text-xs uppercase tracking-wide-luxe text-[#C9A961] mb-2 font-medium">
                04 · Producción
              </div>
              <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">
                Hecho en Lima, en serie corta
              </h3>
              <p className="text-sm text-[#0B1F3A]/70 leading-relaxed">
                Producción local, talleres pequeños, lotes limitados. Cada polo
                pasa por manos peruanas que cuidan el detalle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
