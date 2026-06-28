"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Preorder() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast({
        title: "Faltan datos",
        description: "Necesitamos tu nombre y correo para reservar.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Reserva confirmada",
      description: `Gracias ${name}. Te contactaremos en ${email} en 24h.`,
    });
  };

  return (
    <section id="preorder" className="bg-[#061425] text-[#FAF8F4] py-24 md:py-36 relative overflow-hidden">
      {/* Decorative side band */}
      <div className="absolute top-0 right-0 h-full w-1 bg-[#C9A961]" />
      <div className="absolute top-0 right-4 h-full w-px bg-[#5B8DBF]/40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C9A961]" />
              <span className="text-xs uppercase tracking-luxe text-[#C9A961] font-medium">
                Preventa
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-8 text-balance">
              Reserva tu lugar en la
              <span className="italic font-light text-[#C9A961]"> primera colección</span>.
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              Producción limitada a 200 unidades por modelo. La preventa
              garantiza tu talla y modelo antes del lanzamiento público. Sin
              pago anticipado: te contactaremos en 24 horas para coordinar
              entrega y método de pago.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {[
                "Garantía de talla y modelo en el primer lote",
                "Precio de preventa: 10% bajo el precio de lanzamiento",
                "Envío prioritario gratuito dentro de Lima Metropolitana",
                "Acceso anticipado a futuras ediciones limitadas",
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#C9A961] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#061425]" />
                  </div>
                  <span className="text-sm text-white/80 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#1F3251]">
              <div>
                <div className="font-serif text-3xl text-[#C9A961] mb-1">200</div>
                <div className="text-[10px] uppercase tracking-wide-luxe text-white/50">
                  Unidades por modelo
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#C9A961] mb-1">10%</div>
                <div className="text-[10px] uppercase tracking-wide-luxe text-white/50">
                  Descuento preventa
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl text-[#C9A961] mb-1">15d</div>
                <div className="text-[10px] uppercase tracking-wide-luxe text-white/50">
                  Garantía total
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-[#0B1F3A] border border-[#1F3251] p-8 lg:p-10 relative">
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#C9A961]" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#C9A961]" />

            {!submitted ? (
              <>
                <h3 className="font-serif text-2xl text-white mb-2">
                  Formulario de reserva
                </h3>
                <p className="text-xs text-white/50 mb-8 leading-relaxed">
                  Sin pago anticipado. Te contactaremos en menos de 24 horas
                  hábiles para coordinar detalles.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wide-luxe text-white/50 mb-2 font-medium">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full bg-transparent border-b border-[#1F3251] focus:border-[#C9A961] py-3 text-white placeholder:text-white/30 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wide-luxe text-white/50 mb-2 font-medium">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full bg-transparent border-b border-[#1F3251] focus:border-[#C9A961] py-3 text-white placeholder:text-white/30 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wide-luxe text-white/50 mb-2 font-medium">
                      Modelo de interés
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Callao", "Grone", "Maute"].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setModel(m)}
                          className={`py-3 text-xs uppercase tracking-wide font-medium border transition-all ${
                            model === m
                              ? "bg-[#C9A961] text-[#061425] border-[#C9A961]"
                              : "bg-transparent text-white/70 border-[#1F3251] hover:border-[#C9A961]/50"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-white/40 mt-2">
                      {model
                        ? `Has seleccionado: Polo ${model}`
                        : "Opcional — también puedes decidir después"}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FAF8F4] text-[#0B1F3A] text-xs uppercase tracking-wide-luxe font-medium hover:bg-[#C9A961] hover:text-[#061425] transition-all duration-300 group"
                  >
                    Reservar mi lugar
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[10px] text-white/40 text-center leading-relaxed pt-2">
                    Al enviar aceptas recibir comunicaciones de Puerto Norte.
                    No compartimos tu información. Cancela cuando quieras.
                  </p>
                </form>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C9A961] flex items-center justify-center">
                  <Check className="w-8 h-8 text-[#061425]" />
                </div>
                <h3 className="font-serif text-3xl text-white mb-3">
                  Reserva confirmada
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  Gracias, <span className="text-[#C9A961]">{name}</span>. Tu
                  lugar en la primera colección de Puerto Norte está guardado.
                  Te contactaremos en <span className="text-white">{email}</span>{" "}
                  en menos de 24 horas hábiles.
                </p>
                <div className="text-[10px] uppercase tracking-wide-luxe text-white/50 mb-2">
                  {model ? `Modelo seleccionado: ${model}` : "Modelo por confirmar"}
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                    setName("");
                    setModel("");
                  }}
                  className="text-xs text-[#C9A961] hover:text-white transition-colors border-b border-[#C9A961] hover:border-white pb-0.5"
                >
                  Registrar otra reserva
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
