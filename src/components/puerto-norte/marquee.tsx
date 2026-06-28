const phrases = [
  "Herencia que se lleva puesto",
  "Elegancia silenciosa",
  "Para el hincha que ya no grita",
  "Algodón Pima del Perú",
  "Tres modelos · Una identidad",
  "Hecho en Lima",
];

export function Marquee() {
  const items = [...phrases, ...phrases, ...phrases];
  return (
    <div className="bg-[#0B1F3A] text-[#FAF8F4] py-5 overflow-hidden border-y border-[#1F3251]">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((phrase, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="font-serif italic text-lg md:text-xl font-light">
              {phrase}
            </span>
            <span className="text-[#C9A961] text-xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
