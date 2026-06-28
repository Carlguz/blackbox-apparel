import { Header } from "@/components/puerto-norte/header";
import { Hero } from "@/components/puerto-norte/hero";
import { Manifiesto } from "@/components/puerto-norte/manifiesto";
import { Coleccion } from "@/components/puerto-norte/coleccion";
import { ComoComprar } from "@/components/puerto-norte/como-comprar";
import { FAQ } from "@/components/puerto-norte/faq";
import { Footer } from "@/components/puerto-norte/footer";
import { WhatsAppFloat } from "@/components/puerto-norte/whatsapp-float";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Manifiesto />
        <Coleccion />
        <ComoComprar />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
