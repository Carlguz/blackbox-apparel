"use client";

import { Header } from "@/components/blackbox/header";
import { Hero } from "@/components/blackbox/hero";
import { Filosofia } from "@/components/blackbox/filosofia";
import { Coleccion } from "@/components/blackbox/coleccion";
import { Beneficios } from "@/components/blackbox/beneficios";
import { Modelo } from "@/components/blackbox/modelo";
import { Newsletter } from "@/components/blackbox/newsletter";
import { CTA } from "@/components/blackbox/cta";
import { Footer } from "@/components/blackbox/footer";
import { WhatsAppFloat } from "@/components/blackbox/whatsapp-float";
import { AdminShell } from "@/components/blackbox/admin-shell";
import { useSiteContent } from "@/components/blackbox/use-site-content";
import { useScrollReveal } from "@/components/blackbox/use-scroll-reveal";
import { defaultContent } from "@/components/blackbox/content";
import { useEffect } from "react";

export default function Home() {
  useScrollReveal();
  const { content, setContent, save, saving } = useSiteContent();
  const data = content ?? defaultContent;

  // Track page view (fire-and-forget)
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "/",
        referrer: typeof document !== "undefined" ? document.referrer : null,
        device: typeof navigator !== "undefined" ? (navigator.userAgent.includes("Mobile") ? "mobile" : "desktop") : null,
      }),
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header />
      <main className="flex-1 pt-20">
        <Hero content={data} />
        <Filosofia content={data} />
        <Coleccion content={data} />
        <Beneficios content={data} />
        <Modelo content={data} />
        <CTA content={data} />
        <Newsletter content={data} />
      </main>
      <Footer content={data} />
      <WhatsAppFloat content={data} />
      <AdminShell content={data} setContent={setContent} save={save} saving={saving} />
    </div>
  );
}
