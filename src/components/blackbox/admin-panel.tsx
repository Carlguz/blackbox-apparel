"use client";

import { useState, useRef } from "react";
import { type SiteContentData, type EditableProduct, type EditableBenefit } from "./content";

type Tab = "general" | "hero" | "filosofia" | "coleccion" | "productos" | "beneficios" | "modelo" | "cta" | "footer";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "general", label: "General", icon: "settings" },
  { id: "hero", label: "Hero", icon: "view_carousel" },
  { id: "filosofia", label: "Filosofía", icon: "format_quote" },
  { id: "coleccion", label: "Colección", icon: "grid_view" },
  { id: "productos", label: "Productos", icon: "checkroom" },
  { id: "beneficios", label: "Beneficios", icon: "verified" },
  { id: "modelo", label: "Galería", icon: "image" },
  { id: "cta", label: "CTA Final", icon: "campaign" },
  { id: "footer", label: "Footer", icon: "dock_to_bottom" },
];

const MATERIAL_ICONS = [
  "local_shipping", "payments", "verified", "shopping_bag", "person",
  "chat", "favorite", "star", "security", "eco", "diamond", "workspace_premium",
  "auto_awesome", "bolt", "trending_up", "savings", "credit_card", "support_agent",
];

export function AdminPanel({
  content,
  setContent,
  save,
  saving,
  onClose,
}: {
  content: SiteContentData;
  setContent: (next: SiteContentData) => void;
  save: (next: SiteContentData) => Promise<boolean>;
  saving: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("general");
  const [savedFlash, setSavedFlash] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Helper to update nested content
  const update = <K extends keyof SiteContentData>(key: K, value: SiteContentData[K]) => {
    setContent({ ...content, [key]: value });
  };

  const handleSave = async () => {
    const ok = await save(content);
    if (ok) {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    }
  };

  // Image upload handler
  const uploadImage = async (file: File, target: "hero" | `product-${string}` | `modelo-grande` | `modelo-peq1` | `modelo-peq2`) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Upload failed");
      const url: string = json.url;

      if (target === "hero") {
        update("hero", { ...content.hero, backgroundImage: url });
      } else if (target === "modelo-grande") {
        update("modelo", { ...content.modelo, imageGrande: url });
      } else if (target === "modelo-peq1") {
        update("modelo", { ...content.modelo, imagePequena1: url });
      } else if (target === "modelo-peq2") {
        update("modelo", { ...content.modelo, imagePequena2: url });
      } else if (target.startsWith("product-")) {
        const pid = target.replace("product-", "");
        update("products", content.products.map((p) => (p.id === pid ? { ...p, image: url } : p)));
      }
    } catch (e) {
      alert("Error al subir imagen: " + (e as Error).message);
    }
  };

  // Product helpers
  const addProduct = () => {
    const newId = String(Date.now()).slice(-6);
    const newProduct: EditableProduct = {
      id: newId,
      name: "Nuevo Producto",
      label: "Etiqueta / Material",
      price: "S/0",
      image: "/products/polo-slate-front.png",
      alt: "Nuevo producto BLACKBOX",
    };
    update("products", [...content.products, newProduct]);
  };
  const removeProduct = (id: string) => {
    update("products", content.products.filter((p) => p.id !== id));
  };
  const updateProduct = (id: string, patch: Partial<EditableProduct>) => {
    update("products", content.products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  // Benefit helpers
  const addBenefit = () => {
    const newId = "b" + Date.now();
    const newBenefit: EditableBenefit = {
      id: newId,
      icon: "star",
      title: "Nuevo Beneficio",
      text: "Descripción del beneficio.",
    };
    update("beneficios", [...content.beneficios, newBenefit]);
  };
  const removeBenefit = (id: string) => {
    update("beneficios", content.beneficios.filter((b) => b.id !== id));
  };
  const updateBenefit = (id: string, patch: Partial<EditableBenefit>) => {
    update("beneficios", content.beneficios.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-stretch animate-fade-in">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1c1c] text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="text-label-caps text-white/40 uppercase tracking-[0.2em] mb-1">Admin Panel</div>
          <div className="font-bold text-lg tracking-tight">BLACKBOX</div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-left text-sm transition-colors ${
                tab === t.id
                  ? "bg-white/10 text-white border-l-2 border-[#25D366]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#25D366] text-white py-3 text-button uppercase tracking-wider hover:bg-[#1FB855] transition-colors disabled:opacity-50"
          >
            {saving ? "Guardando..." : savedFlash ? "✓ Guardado" : "Guardar cambios"}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-transparent border border-white/20 text-white py-3 text-button uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#f9f9f9] overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          {/* Tab title */}
          <div className="mb-8 pb-6 border-b border-[#c4c7c7]">
            <h2 className="text-headline-xl text-black">
              {TABS.find((t) => t.id === tab)?.label}
            </h2>
            <p className="text-body-md text-[#444748] mt-1">
              Edita los campos y guarda los cambios al final.
            </p>
          </div>

          {/* GENERAL */}
          {tab === "general" && (
            <div className="space-y-6">
              <Field label="Número de WhatsApp (con código país, sin +)">
                <input
                  type="text"
                  value={content.whatsappNumber}
                  onChange={(e) => update("whatsappNumber", e.target.value)}
                  placeholder="51999888777"
                  className="bb-input"
                />
                <p className="text-xs text-[#666] mt-2">
                  Ejemplo: 51 + 999888777. Todos los botones de WhatsApp usarán este número.
                </p>
              </Field>
            </div>
          )}

          {/* HERO */}
          {tab === "hero" && (
            <div className="space-y-6">
              <Field label="Título línea 1">
                <input type="text" value={content.hero.titleLine1} onChange={(e) => update("hero", { ...content.hero, titleLine1: e.target.value })} className="bb-input" />
              </Field>
              <Field label="Título línea 2">
                <input type="text" value={content.hero.titleLine2} onChange={(e) => update("hero", { ...content.hero, titleLine2: e.target.value })} className="bb-input" />
              </Field>
              <Field label="Subtítulo">
                <textarea value={content.hero.subtitle} onChange={(e) => update("hero", { ...content.hero, subtitle: e.target.value })} className="bb-input min-h-[80px]" />
              </Field>
              <Field label="Texto del botón">
                <input type="text" value={content.hero.ctaText} onChange={(e) => update("hero", { ...content.hero, ctaText: e.target.value })} className="bb-input" />
              </Field>
              <Field label="Imagen de fondo">
                <ImagePicker
                  url={content.hero.backgroundImage}
                  onPick={(file) => uploadImage(file, "hero")}
                  onChange={(url) => update("hero", { ...content.hero, backgroundImage: url })}
                  inputRef={(el) => { fileInputRefs.current["hero"] = el; }}
                />
              </Field>
            </div>
          )}

          {/* FILOSOFIA */}
          {tab === "filosofia" && (
            <div className="space-y-6">
              <Field label="Etiqueta (uppercase)">
                <input type="text" value={content.filosofia.label} onChange={(e) => update("filosofia", { ...content.filosofia, label: e.target.value })} className="bb-input" />
              </Field>
              <Field label="Cita (sin comillas, se agregan automáticamente)">
                <textarea value={content.filosofia.quote} onChange={(e) => update("filosofia", { ...content.filosofia, quote: e.target.value })} className="bb-input min-h-[80px]" />
              </Field>
            </div>
          )}

          {/* COLECCION */}
          {tab === "coleccion" && (
            <div className="space-y-6">
              <Field label="Título de la colección">
                <input type="text" value={content.coleccion.title} onChange={(e) => update("coleccion", { ...content.coleccion, title: e.target.value })} className="bb-input" />
              </Field>
              <Field label="Subtítulo">
                <input type="text" value={content.coleccion.subtitle} onChange={(e) => update("coleccion", { ...content.coleccion, subtitle: e.target.value })} className="bb-input" />
              </Field>
            </div>
          )}

          {/* PRODUCTOS */}
          {tab === "productos" && (
            <div className="space-y-8">
              {content.products.map((p, idx) => (
                <div key={p.id} className="bg-white p-6 border border-[#c4c7c7] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-black">Producto {idx + 1}</h4>
                    <button
                      onClick={() => removeProduct(p.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Nombre">
                      <input type="text" value={p.name} onChange={(e) => updateProduct(p.id, { name: e.target.value })} className="bb-input" />
                    </Field>
                    <Field label="Precio">
                      <input type="text" value={p.price} onChange={(e) => updateProduct(p.id, { price: e.target.value })} className="bb-input" />
                    </Field>
                  </div>
                  <Field label="Etiqueta (material/color)">
                    <input type="text" value={p.label} onChange={(e) => updateProduct(p.id, { label: e.target.value })} className="bb-input" />
                  </Field>
                  <Field label="Texto alternativo (accesibilidad)">
                    <input type="text" value={p.alt} onChange={(e) => updateProduct(p.id, { alt: e.target.value })} className="bb-input" />
                  </Field>
                  <Field label="Imagen del producto">
                    <ImagePicker
                      url={p.image}
                      onPick={(file) => uploadImage(file, `product-${p.id}`)}
                      onChange={(url) => updateProduct(p.id, { image: url })}
                      inputRef={(el) => { fileInputRefs.current[`product-${p.id}`] = el; }}
                    />
                  </Field>
                </div>
              ))}
              <button
                onClick={addProduct}
                className="w-full py-4 border-2 border-dashed border-[#c4c7c7] text-[#444748] hover:border-black hover:text-black transition-colors text-button uppercase"
              >
                + Agregar producto
              </button>
            </div>
          )}

          {/* BENEFICIOS */}
          {tab === "beneficios" && (
            <div className="space-y-6">
              {content.beneficios.map((b, idx) => (
                <div key={b.id} className="bg-white p-6 border border-[#c4c7c7] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-black">Beneficio {idx + 1}</h4>
                    <button onClick={() => removeBenefit(b.id)} className="text-sm text-red-600 hover:text-red-800">
                      Eliminar
                    </button>
                  </div>
                  <Field label="Título">
                    <input type="text" value={b.title} onChange={(e) => updateBenefit(b.id, { title: e.target.value })} className="bb-input" />
                  </Field>
                  <Field label="Texto">
                    <textarea value={b.text} onChange={(e) => updateBenefit(b.id, { text: e.target.value })} className="bb-input min-h-[60px]" />
                  </Field>
                  <Field label="Icono (Material Symbol)">
                    <select
                      value={b.icon}
                      onChange={(e) => updateBenefit(b.id, { icon: e.target.value })}
                      className="bb-input"
                    >
                      {MATERIAL_ICONS.map((ic) => (
                        <option key={ic} value={ic}>{ic}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="material-symbols-outlined text-2xl text-black">{b.icon}</span>
                      <span className="text-xs text-[#666]">Vista previa del icono</span>
                    </div>
                  </Field>
                </div>
              ))}
              <button
                onClick={addBenefit}
                className="w-full py-4 border-2 border-dashed border-[#c4c7c7] text-[#444748] hover:border-black hover:text-black transition-colors text-button uppercase"
              >
                + Agregar beneficio
              </button>
            </div>
          )}

          {/* MODELO (Galería) */}
          {tab === "modelo" && (
            <div className="space-y-6">
              <Field label="Imagen grande (calle)">
                <ImagePicker
                  url={content.modelo.imageGrande}
                  onPick={(file) => uploadImage(file, "modelo-grande")}
                  onChange={(url) => update("modelo", { ...content.modelo, imageGrande: url })}
                  inputRef={(el) => { fileInputRefs.current["modelo-grande"] = el; }}
                />
              </Field>
              <Field label="Imagen pequeña 1 (cuello)">
                <ImagePicker
                  url={content.modelo.imagePequena1}
                  onPick={(file) => uploadImage(file, "modelo-peq1")}
                  onChange={(url) => update("modelo", { ...content.modelo, imagePequena1: url })}
                  inputRef={(el) => { fileInputRefs.current["modelo-peq1"] = el; }}
                />
              </Field>
              <Field label="Imagen pequeña 2 (espalda)">
                <ImagePicker
                  url={content.modelo.imagePequena2}
                  onPick={(file) => uploadImage(file, "modelo-peq2")}
                  onChange={(url) => update("modelo", { ...content.modelo, imagePequena2: url })}
                  inputRef={(el) => { fileInputRefs.current["modelo-peq2"] = el; }}
                />
              </Field>
            </div>
          )}

          {/* CTA */}
          {tab === "cta" && (
            <div className="space-y-6">
              <Field label="Título">
                <input type="text" value={content.cta.title} onChange={(e) => update("cta", { ...content.cta, title: e.target.value })} className="bb-input" />
              </Field>
              <Field label="Subtítulo">
                <textarea value={content.cta.subtitle} onChange={(e) => update("cta", { ...content.cta, subtitle: e.target.value })} className="bb-input min-h-[80px]" />
              </Field>
              <Field label="Texto del botón">
                <input type="text" value={content.cta.buttonText} onChange={(e) => update("cta", { ...content.cta, buttonText: e.target.value })} className="bb-input" />
              </Field>
            </div>
          )}

          {/* FOOTER */}
          {tab === "footer" && (
            <div className="space-y-6">
              <Field label="Texto de copyright">
                <textarea value={content.footer.copyright} onChange={(e) => update("footer", { ...content.footer, copyright: e.target.value })} className="bb-input min-h-[60px]" />
              </Field>
            </div>
          )}
        </div>
      </main>

      {/* Inline styles for inputs (using a style tag to keep things simple) */}
      <style>{`
        .bb-input {
          width: 100%;
          padding: 12px 14px;
          background: white;
          border: 1px solid #c4c7c7;
          color: #1a1c1c;
          font-family: Inter, sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .bb-input:focus {
          border-color: #000000;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-label-caps text-[#444748] uppercase mb-2">{label}</label>
      {children}
    </div>
  );
}

function ImagePicker({
  url,
  onPick,
  onChange,
  inputRef,
}: {
  url: string;
  onPick: (file: File) => void;
  onChange: (url: string) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}) {
  return (
    <div className="space-y-3">
      {/* Preview */}
      <div className="w-full aspect-[3/4] max-w-[200px] bg-[#eeeeee] overflow-hidden border border-[#c4c7c7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="Preview" className="w-full h-full object-cover" />
      </div>
      {/* URL input */}
      <input
        type="text"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/products/imagen.png o https://..."
        className="bb-input"
      />
      {/* Upload button */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file);
        }}
        className="hidden"
      />
      <button
        onClick={() => inputRef(null)?.click()}
        className="text-button uppercase text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
      >
        Subir imagen
      </button>
    </div>
  );
}
