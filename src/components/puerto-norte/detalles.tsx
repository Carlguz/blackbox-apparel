import { Shirt, Ruler, Scissors, Layers, Recycle, Award } from "lucide-react";

const features = [
  {
    icon: Shirt,
    title: "Algodón Pima peruano",
    description:
      "Una de las fibras más finas y durables del mundo, cultivada en la costa norte del Perú. Suavidad sedosa, brillo natural y resistencia que mantiene la prenda en forma por años.",
    spec: "200 – 240 g/m²",
  },
  {
    icon: Scissors,
    title: "Confección local en Lima",
    description:
      "Talleres pequeños, manos peruanas, lotes limitados. Cada polo pasa por costureras con décadas de experiencia que cuidan cada costura y cada borde antes de salir.",
    spec: "Lote máximo: 200 u",
  },
  {
    icon: Ruler,
    title: "Cortes pensados para el cuerpo",
    description:
      "Tres cortes distintos según el modelo: regular, slim y modern fit. Cada uno estudiado para caer con elegancia sobre el cuerpo sin ajustar como camiseta deportiva.",
    spec: "XS a XL",
  },
  {
    icon: Layers,
    title: "Bordados y detalles discretos",
    description:
      "Bordados en hilo a tono, tipografía serif pequeña, estrellas en manga. Detalles que solo se ven de cerca, que solo reconoce quien sabe mirar. Sin impresiones gigantes.",
    spec: "Bordado a máquina",
  },
  {
    icon: Award,
    title: "Control de calidad por pieza",
    description:
      "Cada polo es revisado individualmente antes del empaque. Verificamos costuras, bordado, simetría y caída. Lo que llega a tus manos pasó por dos pares de ojos además del tuyo.",
    spec: "100% inspección",
  },
  {
    icon: Recycle,
    title: "Producción responsable",
    description:
      "Serie corta para evitar excedentes. Restos de tela se donan a talleres textiles locales. Empaque en cartón reciclable sin plástico innecesario. Moda que no contamina para vestir.",
    spec: "Cero plástico single-use",
  },
];

export function Detalles() {
  return (
    <section id="detalles" className="bg-[#FAF8F4] py-24 md:py-36 border-t border-[#E5E0D5]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A961]" />
              <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
                Detalles
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0B1F3A] leading-[1.05] text-balance">
              La diferencia está en
              <span className="italic font-light text-[#5B8DBF]"> lo que no se ve</span>.
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[#0B1F3A]/70 text-base md:text-lg leading-relaxed">
              Un polo premium no se distingue por el logo gigante en el pecho.
              Se distingue por la mano de la tela, la caída del corte, el
              prolijo del bordado, la consistencia de la costura. Por eso
              trabajamos en serie corta: para cuidar cada detalle que la
              producción masiva no puede cuidar.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E0D5] border border-[#E5E0D5]">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F4] p-8 lg:p-10 hover:bg-white transition-colors duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <Icon className="w-7 h-7 text-[#0B1F3A] group-hover:text-[#C9A961] transition-colors" />
                  <span className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/30 font-medium">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#0B1F3A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#0B1F3A]/70 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="pt-4 border-t border-[#E5E0D5]">
                  <div className="text-[10px] uppercase tracking-wide-luxe text-[#0B1F3A]/40 mb-1">
                    Especificación
                  </div>
                  <div className="text-xs text-[#0B1F3A] font-medium tracking-wide">
                    {feature.spec}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality assurance band */}
        <div className="mt-16 bg-[#0B1F3A] text-[#FAF8F4] p-8 lg:p-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl md:text-3xl mb-3">
              Garantía de satisfacción de 15 días
            </h3>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Si algo no convence, lo cambiamos o lo devolvemos. Sin
              preguntas, sin trabas. Creemos en prendas que se eligen con
              calma y se conservan con cariño, no en compras impulsivas que se
              arrepienten al abrir el paquete.
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="#preorder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C9A961] text-[#061425] text-xs uppercase tracking-wide-luxe font-medium hover:bg-[#D4B978] transition-colors"
            >
              Reservar con garantía
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
