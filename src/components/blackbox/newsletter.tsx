"use client";

import { useState } from "react";
import { type SiteContentData } from "./content";
import { Check } from "lucide-react";

export function Newsletter({ content }: { content: SiteContentData }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter" }),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus("ok");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-black text-white py-[120px]">
      <div className="max-w-3xl mx-auto px-5 md:px-12 text-center">
        <h2 className="text-display-lg-mobile md:text-display-lg text-white mb-6 leading-none font-semibold tracking-[-0.04em]">
          {content.newsletter.title}
        </h2>
        <p className="text-body-lg text-white/70 mb-10 max-w-xl mx-auto">
          {content.newsletter.subtitle}
        </p>

        {status === "ok" ? (
          <div className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4">
            <Check className="w-5 h-5" />
            <span className="text-button uppercase tracking-wider">¡Gracias por unirte!</span>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-5 py-4 text-body-md outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#25D366] text-white px-8 py-4 text-button uppercase tracking-wider hover:bg-[#1FB855] transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : content.newsletter.buttonText}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-sm text-red-400 mt-4">Hubo un error. Intenta de nuevo.</p>
        )}
      </div>
    </section>
  );
}
