import { Clock, Moon, Briefcase } from "lucide-react";

const occasions = [
  {
    icon: Clock,
    label: "Día",
    title: "El café de la mañana",
    description:
      "Para el paseo del sábado, el café con amigos, la compra en el mercado. El polo Callao con su bordado discreto pasa desapercibido para quien no sabe, y se reconoce al instante para quien sí.",
    image: "/products/lifestyle-ciudad.png",
    model: "Polo Callao",
    time: "Mañanas · 8am – 2pm",
    accent: "#5B8DBF",
  },
  {
    icon: Moon,
    label: "Noche",
    title: "La cena y el bar",
    description:
      "Para la salida nocturna, la cena romántica, el bar con amigos. El polo Grone, blanco y slim, bajo un blazer oscuro. La tipografía serif en el pecho es un código que solo se entiende si se comparte.",
    image: "/products/lifestyle-reunion.png",
    model: "Polo Grone",
    time: "Noches · 8pm – 2am",
    accent: "#C9A961",
  },
  {
    icon: Briefcase,
    label: "Reunión",
    title: "La oficina casual",
    description:
      "Para la reunión de equipo, el viernes de oficina informal, el cumpleaños del compañero. El polo Maute, navy profundo y silencioso, solo revela su estrella en la manga cuando te quitas la chaqueta.",
    image: "/products/polo-maute.png",
    model: "Polo Maute",
    time: "Día de semana · 9am – 6pm",
    accent: "#0B1F3A",
  },
];

export function Versatilidad() {
  return (
    <section
      id="versatilidad"
      className="bg-[#0B1F3A] text-[#FAF8F4] py-24 md:py-36 relative overflow-hidden"
    >
      {/* Decorative texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/bg-texture.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A961]" />
            <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
              Versatilidad
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] text-balance">
            Un solo polo no basta
            <br />
            cuando vives <span className="italic font-light text-[#C9A961]">todo el día</span>.
          </h2>
          <p className="mt-6 text-white/70 text-lg max-w-2xl leading-relaxed">
            Cada modelo está pensado para una franja del día distinta. La
            elegancia está en saber cuál usar, cuándo y cómo combinarlo. Tres
            prendas, una identidad completa.
          </p>
        </div>

        {/* Occasions grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {occasions.map((occ, idx) => {
            const Icon = occ.icon;
            return (
              <article
                key={occ.label}
                className="group relative bg-[#061425]/60 backdrop-blur-sm border border-[#1F3251] hover:border-[#C9A961]/40 transition-all duration-500 hover:bg-[#061425]"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0B1F3A]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={occ.image}
                    alt={`${occ.title} con polo Puerto Norte`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061425] via-transparent to-transparent" />

                  {/* Top label */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: occ.accent }}
                    />
                    <span className="text-[10px] uppercase tracking-wide-luxe font-medium text-white">
                      0{idx + 1} · {occ.label}
                    </span>
                  </div>

                  {/* Bottom title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="text-[10px] uppercase tracking-wide-luxe mb-1 font-medium"
                      style={{ color: occ.accent }}
                    >
                      {occ.time}
                    </div>
                    <h3 className="font-serif text-2xl text-white">
                      {occ.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon
                      className="w-5 h-5"
                      style={{ color: occ.accent }}
                    />
                    <span className="text-[10px] uppercase tracking-wide-luxe text-white/50">
                      {occ.model}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {occ.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Closing line */}
        <div className="mt-20 max-w-3xl">
          <p className="font-serif italic text-2xl md:text-3xl text-white/80 leading-snug text-balance">
            &ldquo;La elegancia no está en lo que llevas, sino en saber cuándo
            llevas lo correcto. Puerto Norte te da el qué. El cuándo es tuyo.&rdquo;
          </p>
          <p className="mt-4 text-xs uppercase tracking-wide-luxe text-[#C9A961] font-medium">
            — Manifiesto Puerto Norte
          </p>
        </div>
      </div>
    </section>
  );
}
