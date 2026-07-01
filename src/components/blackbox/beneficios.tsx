export function Beneficios() {
  const benefits = [
    {
      icon: "local_shipping",
      title: "Envíos Rápidos",
      text: "Entrega en 24-48h en Lima y envíos a todo el Perú.",
    },
    {
      icon: "payments",
      title: "Facilidad de Pago",
      text: "Pagos contra entrega, Yape, Plin o transferencia bancaria.",
    },
    {
      icon: "verified",
      title: "Calidad Superior",
      text: "Algodón premium con el mejor fit y estructura del mercado.",
    },
  ];

  return (
    <section className="bg-black text-white py-[120px]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-4xl mb-6 font-thin">
                {b.icon}
              </span>
              <h5 className="text-headline-lg mb-4">{b.title}</h5>
              <p className="text-body-md opacity-70">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
