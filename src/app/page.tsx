"use client";

import { Header } from "@/components/blackbox/header";
import { Hero } from "@/components/blackbox/hero";
import { Filosofia } from "@/components/blackbox/filosofia";
import { Coleccion } from "@/components/blackbox/coleccion";
import { Beneficios } from "@/components/blackbox/beneficios";
import { Modelo } from "@/components/blackbox/modelo";
import { CTA } from "@/components/blackbox/cta";
import { Footer } from "@/components/blackbox/footer";
import { WhatsAppFloat } from "@/components/blackbox/whatsapp-float";
import { useScrollReveal } from "@/components/blackbox/use-scroll-reveal";

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />
      <main className="flex-1 pt-20">
        <Hero />
        <Filosofia />
        <Coleccion />
        <Beneficios />
        <Modelo />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
