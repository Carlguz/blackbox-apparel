import { Header } from "@/components/puerto-norte/header";
import { Hero } from "@/components/puerto-norte/hero";
import { Marquee } from "@/components/puerto-norte/marquee";
import { Manifiesto } from "@/components/puerto-norte/manifiesto";
import { Coleccion } from "@/components/puerto-norte/coleccion";
import { Versatilidad } from "@/components/puerto-norte/versatilidad";
import { Detalles } from "@/components/puerto-norte/detalles";
import { Preorder } from "@/components/puerto-norte/preorder";
import { FAQ } from "@/components/puerto-norte/faq";
import { Footer } from "@/components/puerto-norte/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Manifiesto />
        <Coleccion />
        <Versatilidad />
        <Detalles />
        <Preorder />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
