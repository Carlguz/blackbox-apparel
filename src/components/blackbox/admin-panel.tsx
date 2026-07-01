"use client";

import { useState, useRef, useEffect } from "react";
import { type SiteContentData, type EditableProduct, type EditableBenefit, type ProductSize } from "./content";
import { DashboardTab } from "./dashboard-tab";

type Tab = "dashboard" | "general" | "hero" | "filosofia" | "coleccion" | "productos" | "stock" | "beneficios" | "modelo" | "tema" | "newsletter" | "notificaciones" | "exportar" | "cta" | "footer" | "pedidos";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "general", label: "General", icon: "settings" },
  { id: "hero", label: "Hero", icon: "view_carousel" },
  { id: "filosofia", label: "Filosofía", icon: "format_quote" },
  { id: "coleccion", label: "Colección", icon: "grid_view" },
  { id: "productos", label: "Productos", icon: "checkroom" },
  { id: "stock", label: "Stock", icon: "inventory_2" },
  { id: "beneficios", label: "Beneficios", icon: "verified" },
  { id: "modelo", label: "Galería", icon: "image" },
  { id: "tema", label: "Tema", icon: "palette" },
  { id: "newsletter", label: "Newsletter", icon: "email" },
  { id: "notificaciones", label: "Notificaciones", icon: "notifications" },
  { id: "exportar", label: "Exportar", icon: "download" },
  { id: "cta", label: "CTA Final", icon: "campaign" },
  { id: "footer", label: "Footer", icon: "dock_to_bottom" },
  { id: "pedidos", label: "Pedidos", icon: "shopping_bag" },
];

const MATERIAL_ICONS = [
  "local_shipping", "payments", "verified", "shopping_bag", "person",
  "chat", "favorite", "star", "security", "eco", "diamond", "workspace_premium",
  "auto_awesome", "bolt", "trending_up", "savings", "credit_card", "support_agent",
];

const ALL_SIZES: ProductSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

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
  const [tab, setTab] = useState<Tab>("dashboard");
  const [savedFlash, setSavedFlash] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const uploadImage = async (file: File, target: string) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
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
      } else if (target.startsWith("product-back-")) {
        const pid = target.replace("product-back-", "");
        update("products", content.products.map((p) => (p.id === pid ? { ...p, backImage: url } : p)));
      }
    } catch (e) {
      alert("Error al subir imagen: " + (e as Error).message);
    }
  };

  const addProduct = () => {
    const newId = String(Date.now()).slice(-6);
    const newProduct: EditableProduct = {
      id: newId,
      name: "Nuevo Producto",
      label: "Etiqueta / Material",
      price: "S/0",
      image: "/products/polo-slate-front.png",
      alt: "Nuevo producto BLACKBOX",
      description: "Descripción del producto.",
      story: "",
      material: "100% Algodón Pima · 240 g/m²",
      care: "Lavar en frío · Secar a la sombra",
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: { S: 10, M: 10, L: 10, XL: 10, XXL: 10 },
    };
    update("products", [...content.products, newProduct]);
  };
  const removeProduct = (id: string) => {
    update("products", content.products.filter((p) => p.id !== id));
  };
  const updateProduct = (id: string, patch: Partial<EditableProduct>) => {
    update("products", content.products.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const addBenefit = () => {
    const newBenefit: EditableBenefit = {
      id: "b" + Date.now(),
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

      <main className="flex-1 bg-[#f9f9f9] overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <div className="mb-8 pb-6 border-b border-[#c4c7c7]">
            <h2 className="text-headline-xl text-black">
              {TABS.find((t) => t.id === tab)?.label}
            </h2>
            <p className="text-body-md text-[#444748] mt-1">
              {tab === "dashboard" && "Métricas en tiempo real de tu tienda."}
              {tab === "pedidos" && "Pedidos generados cuando un cliente hace clic en WhatsApp."}
              {tab === "stock" && "Controla el inventario por talla de cada producto."}
              {tab === "tema" && "Personaliza los colores de la marca."}
              {tab === "newsletter" && "Captura de leads y lista de suscriptores."}
              {tab === "notificaciones" && "Configura email y WhatsApp donde recibir alertas de pedidos."}
              {tab === "exportar" && "Descarga tus datos en CSV para Excel, Google Sheets o Instagram Shopping."}
              {!["dashboard", "pedidos", "stock", "tema", "newsletter", "notificaciones", "exportar"].includes(tab) && "Edita los campos y guarda los cambios al final."}
            </p>
          </div>

          {tab === "dashboard" && <DashboardTab />}

          {tab === "general" && (
            <div className="space-y-6">
              <Field label="Número de WhatsApp (con código país, sin +)">
                <input type="text" value={content.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} placeholder="51999888777" className="bb-input" />
              </Field>
              <Field label="URL de Instagram">
                <input type="text" value={content.instagramUrl} onChange={(e) => update("instagramUrl", e.target.value)} className="bb-input" />
              </Field>
              <Field label="URL de TikTok">
                <input type="text" value={content.tiktokUrl} onChange={(e) => update("tiktokUrl", e.target.value)} className="bb-input" />
              </Field>
            </div>
          )}

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
                <ImagePicker url={content.hero.backgroundImage} onPick={(f) => uploadImage(f, "hero")} onChange={(url) => update("hero", { ...content.hero, backgroundImage: url })} inputRef={(el) => { fileInputRefs.current["hero"] = el; }} />
              </Field>
            </div>
          )}

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

          {tab === "productos" && (
            <div className="space-y-8">
              {content.products.map((p, idx) => (
                <div key={p.id} className="bg-white p-6 border border-[#c4c7c7] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-black">Producto {idx + 1}</h4>
                    <button onClick={() => removeProduct(p.id)} className="text-sm text-red-600 hover:text-red-800">Eliminar</button>
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
                  <Field label="Descripción corta (landing)">
                    <textarea value={p.description} onChange={(e) => updateProduct(p.id, { description: e.target.value })} className="bb-input min-h-[60px]" />
                  </Field>
                  <Field label="Historia (página de producto)">
                    <textarea value={p.story} onChange={(e) => updateProduct(p.id, { story: e.target.value })} className="bb-input min-h-[80px]" />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Material">
                      <input type="text" value={p.material} onChange={(e) => updateProduct(p.id, { material: e.target.value })} className="bb-input" />
                    </Field>
                    <Field label="Cuidados">
                      <input type="text" value={p.care} onChange={(e) => updateProduct(p.id, { care: e.target.value })} className="bb-input" />
                    </Field>
                  </div>
                  <Field label="Tallas disponibles">
                    <div className="flex flex-wrap gap-2">
                      {ALL_SIZES.map((s) => {
                        const checked = p.sizes.includes(s);
                        return (
                          <button
                            key={s}
                            onClick={() => {
                              const sizes = checked ? p.sizes.filter((x) => x !== s) : [...p.sizes, s];
                              updateProduct(p.id, { sizes });
                            }}
                            className={`w-12 h-10 text-button font-medium border transition-all ${checked ? "bg-black text-white border-black" : "bg-white text-black border-[#c4c7c7]"}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Imagen frontal">
                    <ImagePicker url={p.image} onPick={(f) => uploadImage(f, `product-${p.id}`)} onChange={(url) => updateProduct(p.id, { image: url })} inputRef={(el) => { fileInputRefs.current[`product-${p.id}`] = el; }} />
                  </Field>
                  <Field label="Imagen espalda (opcional)">
                    <ImagePicker url={p.backImage || ""} onPick={(f) => uploadImage(f, `product-back-${p.id}`)} onChange={(url) => updateProduct(p.id, { backImage: url })} inputRef={(el) => { fileInputRefs.current[`product-back-${p.id}`] = el; }} />
                  </Field>
                </div>
              ))}
              <button onClick={addProduct} className="w-full py-4 border-2 border-dashed border-[#c4c7c7] text-[#444748] hover:border-black hover:text-black transition-colors text-button uppercase">
                + Agregar producto
              </button>
            </div>
          )}

          {tab === "stock" && (
            <div className="space-y-6">
              {content.products.map((p) => (
                <div key={p.id} className="bg-white p-6 border border-[#c4c7c7]">
                  <div className="flex items-baseline justify-between mb-4">
                    <h4 className="font-bold text-black">{p.name}</h4>
                    <span className="text-label-caps text-[#666] uppercase">
                      Total: {Object.values(p.stock || {}).reduce((a, b) => a + b, 0)} u
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {ALL_SIZES.map((s) => {
                      const stock = p.stock?.[s] ?? 0;
                      const available = p.sizes.includes(s);
                      return (
                        <div key={s} className={`${!available ? "opacity-40" : ""}`}>
                          <div className="text-label-caps text-[#666] uppercase mb-1 text-center">{s}</div>
                          <input
                            type="number"
                            min={0}
                            value={stock}
                            disabled={!available}
                            onChange={(e) => {
                              const next = { ...p.stock, [s]: parseInt(e.target.value) || 0 };
                              updateProduct(p.id, { stock: next });
                            }}
                            className="bb-input text-center"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "beneficios" && (
            <div className="space-y-6">
              {content.beneficios.map((b, idx) => (
                <div key={b.id} className="bg-white p-6 border border-[#c4c7c7] space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-black">Beneficio {idx + 1}</h4>
                    <button onClick={() => removeBenefit(b.id)} className="text-sm text-red-600 hover:text-red-800">Eliminar</button>
                  </div>
                  <Field label="Título">
                    <input type="text" value={b.title} onChange={(e) => updateBenefit(b.id, { title: e.target.value })} className="bb-input" />
                  </Field>
                  <Field label="Texto">
                    <textarea value={b.text} onChange={(e) => updateBenefit(b.id, { text: e.target.value })} className="bb-input min-h-[60px]" />
                  </Field>
                  <Field label="Icono (Material Symbol)">
                    <select value={b.icon} onChange={(e) => updateBenefit(b.id, { icon: e.target.value })} className="bb-input">
                      {MATERIAL_ICONS.map((ic) => (<option key={ic} value={ic}>{ic}</option>))}
                    </select>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="material-symbols-outlined text-2xl text-black">{b.icon}</span>
                      <span className="text-xs text-[#666]">Vista previa</span>
                    </div>
                  </Field>
                </div>
              ))}
              <button onClick={addBenefit} className="w-full py-4 border-2 border-dashed border-[#c4c7c7] text-[#444748] hover:border-black hover:text-black transition-colors text-button uppercase">
                + Agregar beneficio
              </button>
            </div>
          )}

          {tab === "modelo" && (
            <div className="space-y-6">
              <Field label="Imagen grande (calle)">
                <ImagePicker url={content.modelo.imageGrande} onPick={(f) => uploadImage(f, "modelo-grande")} onChange={(url) => update("modelo", { ...content.modelo, imageGrande: url })} inputRef={(el) => { fileInputRefs.current["modelo-grande"] = el; }} />
              </Field>
              <Field label="Imagen pequeña 1 (cuello)">
                <ImagePicker url={content.modelo.imagePequena1} onPick={(f) => uploadImage(f, "modelo-peq1")} onChange={(url) => update("modelo", { ...content.modelo, imagePequena1: url })} inputRef={(el) => { fileInputRefs.current["modelo-peq1"] = el; }} />
              </Field>
              <Field label="Imagen pequeña 2 (espalda)">
                <ImagePicker url={content.modelo.imagePequena2} onPick={(f) => uploadImage(f, "modelo-peq2")} onChange={(url) => update("modelo", { ...content.modelo, imagePequena2: url })} inputRef={(el) => { fileInputRefs.current["modelo-peq2"] = el; }} />
              </Field>
            </div>
          )}

          {tab === "tema" && (
            <div className="space-y-6">
              <p className="text-body-md text-[#444748]">Personaliza los colores principales. Los cambios se aplican al guardar.</p>
              <Field label="Color de fondo">
                <ColorPicker value={content.theme.bg} onChange={(v) => update("theme", { ...content.theme, bg: v })} />
              </Field>
              <Field label="Color de texto principal">
                <ColorPicker value={content.theme.text} onChange={(v) => update("theme", { ...content.theme, text: v })} />
              </Field>
              <Field label="Color primario (negro)">
                <ColorPicker value={content.theme.primary} onChange={(v) => update("theme", { ...content.theme, primary: v })} />
              </Field>
              <Field label="Color de WhatsApp">
                <ColorPicker value={content.theme.whatsapp} onChange={(v) => update("theme", { ...content.theme, whatsapp: v })} />
              </Field>
            </div>
          )}

          {tab === "newsletter" && (
            <div className="space-y-6">
              <Field label="Título">
                <input type="text" value={content.newsletter.title} onChange={(e) => update("newsletter", { ...content.newsletter, title: e.target.value })} className="bb-input" />
              </Field>
              <Field label="Subtítulo">
                <textarea value={content.newsletter.subtitle} onChange={(e) => update("newsletter", { ...content.newsletter, subtitle: e.target.value })} className="bb-input min-h-[60px]" />
              </Field>
              <Field label="Texto del botón">
                <input type="text" value={content.newsletter.buttonText} onChange={(e) => update("newsletter", { ...content.newsletter, buttonText: e.target.value })} className="bb-input" />
              </Field>
              <LeadsList />
            </div>
          )}

          {tab === "notificaciones" && <NotificationsTab content={content} update={update} />}

          {tab === "exportar" && <ExportTab />}

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

          {tab === "footer" && (
            <div className="space-y-6">
              <Field label="Texto de copyright">
                <textarea value={content.footer.copyright} onChange={(e) => update("footer", { ...content.footer, copyright: e.target.value })} className="bb-input min-h-[60px]" />
              </Field>
            </div>
          )}

          {tab === "pedidos" && <OrdersTab />}
        </div>
      </main>

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
        .bb-input:focus { border-color: #000000; }
      `}</style>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-label-caps text-[#444748] uppercase mb-2">{label}</label>
      {children}
    </div>
  );
}

function ImagePicker({ url, onPick, onChange, inputRef }: { url: string; onPick: (file: File) => void; onChange: (url: string) => void; inputRef: (el: HTMLInputElement | null) => void; }) {
  return (
    <div className="space-y-3">
      <div className="w-full aspect-[3/4] max-w-[200px] bg-[#eeeeee] overflow-hidden border border-[#c4c7c7]">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#999] text-sm">Sin imagen</div>
        )}
      </div>
      <input type="text" value={url} onChange={(e) => onChange(e.target.value)} placeholder="/products/imagen.png o https://..." className="bb-input" />
      <input type="file" accept="image/*" ref={inputRef} onChange={(e) => { const file = e.target.files?.[0]; if (file) onPick(file); }} className="hidden" />
      <button onClick={() => inputRef(null)?.click()} className="text-button uppercase text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
        Subir imagen
      </button>
    </div>
  );
}

function ColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-12 h-12 border border-[#c4c7c7] cursor-pointer" />
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="bb-input flex-1" />
    </div>
  );
}

// ─── Notifications Tab ───────────────────────────────────────────────
function NotificationsTab({
  content,
  update,
}: {
  content: SiteContentData;
  update: <K extends keyof SiteContentData>(key: K, value: SiteContentData[K]) => void;
}) {
  const n = content.notifications;
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const setN = (patch: Partial<typeof n>) => {
    update("notifications", { ...n, ...patch });
  };

  const testEmail = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/notify/test", { method: "POST" });
      const json = await res.json();
      if (json.ok) {
        setTestResult({ ok: true, msg: "✓ Email enviado. Revisa tu bandeja (y spam)." });
      } else {
        setTestResult({ ok: false, msg: "✗ " + (json.error || "Error desconocido") });
      }
    } catch (e) {
      setTestResult({ ok: false, msg: "✗ " + (e as Error).message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toggles */}
      <div className="bg-white p-5 border border-[#c4c7c7] space-y-4">
        <h4 className="font-bold text-black">Canales de notificación</h4>
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <div className="text-body-md text-black font-medium">Notificaciones por Email</div>
            <div className="text-sm text-[#666]">Recibe un email cada vez que llegue un pedido nuevo</div>
          </div>
          <input
            type="checkbox"
            checked={n.emailEnabled}
            onChange={(e) => setN({ emailEnabled: e.target.checked })}
            className="w-6 h-6"
          />
        </label>
      </div>

      {/* Email config */}
      <div className="bg-white p-6 border border-[#c4c7c7] space-y-4">
        <h4 className="font-bold text-black">Configuración de Email</h4>

        <Field label="Email donde recibir notificaciones">
          <input type="email" value={n.notifyEmail} onChange={(e) => setN({ notifyEmail: e.target.value })} placeholder="tucorreo@gmail.com" className="bb-input" />
          <p className="text-xs text-[#666] mt-1">A este correo llegarán las alertas de pedidos nuevos.</p>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="SMTP Host">
            <input type="text" value={n.smtpHost} onChange={(e) => setN({ smtpHost: e.target.value })} placeholder="smtp.gmail.com" className="bb-input" />
          </Field>
          <Field label="SMTP Puerto">
            <input type="text" value={n.smtpPort} onChange={(e) => setN({ smtpPort: e.target.value })} placeholder="465" className="bb-input" />
          </Field>
        </div>

        <Field label="SMTP Usuario (tu email)">
          <input type="text" value={n.smtpUser} onChange={(e) => setN({ smtpUser: e.target.value })} placeholder="tucorreo@gmail.com" className="bb-input" />
        </Field>

        <Field label="SMTP Contraseña (App Password)">
          <input type="password" value={n.smtpPassword} onChange={(e) => setN({ smtpPassword: e.target.value })} placeholder="••••••••••••" className="bb-input" />
          <p className="text-xs text-[#666] mt-1">
            Para Gmail: NO uses tu contraseña normal. Crea una &quot;App Password&quot; en{" "}
            <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-[#1F3C88] underline">
              myaccount.google.com/apppasswords
            </a>
            . Necesitas activar 2FA primero.
          </p>
        </Field>

        <Field label="Remitente (From)">
          <input type="text" value={n.smtpFrom} onChange={(e) => setN({ smtpFrom: e.target.value })} placeholder="BLACKBOX APPAREL <no-reply@blackbox.pe>" className="bb-input" />
        </Field>

        <div className="pt-3 border-t border-[#c4c7c7]">
          <button
            onClick={testEmail}
            disabled={testing}
            className="px-5 py-2.5 bg-black text-white text-button uppercase hover:bg-[#25D366] transition-colors disabled:opacity-50"
          >
            {testing ? "Enviando..." : "Probar notificación"}
          </button>
          {testResult && (
            <p className={`text-sm mt-3 ${testResult.ok ? "text-[#2ECC71]" : "text-red-600"}`}>
              {testResult.msg}
            </p>
          )}
        </div>
      </div>

      {/* WhatsApp interno */}
      <div className="bg-white p-6 border border-[#c4c7c7] space-y-4">
        <h4 className="font-bold text-black">WhatsApp interno de notificaciones (opcional)</h4>
        <p className="text-sm text-[#666]">
          Número donde tú recibes alertas. Diferente del WhatsApp público de clientes.
          Cuando llegue un pedido, podrás reenviarlo a este WhatsApp con un clic desde el tab Pedidos.
        </p>
        <Field label="WhatsApp interno (con código país, sin +)">
          <input type="text" value={n.notifyWhatsapp} onChange={(e) => setN({ notifyWhatsapp: e.target.value })} placeholder="51999888777" className="bb-input" />
        </Field>
        <label className="flex items-center justify-between cursor-pointer pt-2">
          <div>
            <div className="text-body-md text-black font-medium">Mostrar badge de pedidos nuevos</div>
            <div className="text-sm text-[#666]">Aparece un punto rojo en el botón del admin cuando hay pedidos pendientes</div>
          </div>
          <input
            type="checkbox"
            checked={n.whatsappBadgeEnabled}
            onChange={(e) => setN({ whatsappBadgeEnabled: e.target.checked })}
            className="w-6 h-6"
          />
        </label>
      </div>

      {/* Guía rápida */}
      <div className="bg-[#1a1c1c] text-white p-6 space-y-3">
        <h4 className="font-bold">📖 Guía rápida</h4>
        <div className="text-sm space-y-2 text-white/80">
          <p><strong className="text-white">Gmail:</strong> Activa 2FA → crea App Password en myaccount.google.com/apppasswords → úsala aquí</p>
          <p><strong className="text-white">Outlook/Hotmail:</strong> Host: smtp.office365.com · Puerto: 587</p>
          <p><strong className="text-white">Yahoo:</strong> Host: smtp.mail.yahoo.com · Puerto: 465</p>
          <p><strong className="text-white">Zoho:</strong> Host: smtp.zoho.com · Puerto: 465</p>
        </div>
      </div>
    </div>
  );
}

// ─── Export Tab ──────────────────────────────────────────────────────
function ExportTab() {
  const [loading, setLoading] = useState<string | null>(null);

  const download = async (type: "orders" | "instagram") => {
    setLoading(type);
    try {
      const url = type === "orders" ? "/api/export/orders" : "/api/export/instagram";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al exportar");
      const blob = await res.blob();
      const a = document.createElement("a");
      const urlObj = URL.createObjectURL(blob);
      a.href = urlObj;
      a.download = type === "orders"
        ? `pedidos-blackbox-${new Date().toISOString().slice(0, 10)}.csv`
        : "instagram-shopping-feed.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(urlObj);
    } catch (e) {
      alert("Error: " + (e as Error).message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pedidos CSV */}
      <div className="bg-white p-6 border border-[#c4c7c7]">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-3xl text-black">table_view</span>
          <div className="flex-1">
            <h4 className="font-bold text-black mb-1">Exportar Pedidos (CSV)</h4>
            <p className="text-sm text-[#666] mb-4">
              Descarga todos los pedidos en formato CSV. Abrelo en Excel, Google Sheets o Numbers.
              Incluye: ID, fecha, producto, talla, cantidad, total, estado, cliente, teléfono, email.
            </p>
            <button
              onClick={() => download("orders")}
              disabled={loading === "orders"}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-button uppercase hover:bg-[#25D366] transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">download</span>
              {loading === "orders" ? "Generando..." : "Descargar pedidos CSV"}
            </button>
          </div>
        </div>
      </div>

      {/* Instagram Shopping */}
      <div className="bg-white p-6 border border-[#c4c7c7]">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-3xl text-black">shopping_bag</span>
          <div className="flex-1">
            <h4 className="font-bold text-black mb-1">Feed Instagram Shopping (CSV)</h4>
            <p className="text-sm text-[#666] mb-4">
              Genera un catálogo en formato Meta/Instagram Shopping. Súbelo en Facebook Business Manager
              → Catalog → Bulk upload. Formato compatible con Instagram Shopping tags.
            </p>
            <button
              onClick={() => download("instagram")}
              disabled={loading === "instagram"}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-button uppercase hover:bg-[#25D366] transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">download</span>
              {loading === "instagram" ? "Generando..." : "Descargar feed CSV"}
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#1a1c1c] text-white p-6 space-y-2">
        <h4 className="font-bold">💡 ¿Para qué sirve exportar?</h4>
        <ul className="text-sm space-y-1.5 text-white/80 list-disc list-inside">
          <li><strong className="text-white">Pedidos CSV:</strong> Llevar contabilidad, ver tendencias, compartir con tu contador</li>
          <li><strong className="text-white">Instagram Shopping:</strong> Etiquetar productos en tus posts de Instagram con precio y link</li>
          <li><strong className="text-white">Google Sheets:</strong> Archivo → Importar → Subir CSV</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Orders Tab ──────────────────────────────────────────────────────
type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
const ORDER_STATUSES: { value: OrderStatus; label: string; color: string }[] = [
  { value: "pending", label: "Pendiente", color: "#a9a9a9" },
  { value: "confirmed", label: "Confirmado", color: "#1F3C88" },
  { value: "shipped", label: "Enviado", color: "#C9A961" },
  { value: "delivered", label: "Entregado", color: "#2ECC71" },
  { value: "cancelled", label: "Cancelado", color: "#ba1a1a" },
];

type OrderRow = {
  id: string;
  customer_name: string | null;
  customer_phone: string;
  product_name: string;
  product_price: string;
  size: string | null;
  quantity: number;
  status: OrderStatus;
  total: string;
  notes: string | null;
  source: string | null;
  created_at: string;
};

function OrdersTab() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const load = async () => {
    setLoading(true);
    try {
      const url = filter === "all" ? "/api/orders" : `/api/orders?status=${filter}`;
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      setOrders(json.orders || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      await fetch(`/api/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      load();
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("¿Eliminar este pedido?")) return;
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      load();
    } catch (e) {
      alert("Error: " + (e as Error).message);
    }
  };

  const fmtDate = (s: string) => {
    try {
      return new Date(s).toLocaleString("es-PE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    } catch {
      return s;
    }
  };

  if (loading) return <div className="text-body-md text-[#444748]">Cargando pedidos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-center">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 text-button uppercase ${filter === "all" ? "bg-black text-white" : "bg-white border border-[#c4c7c7] text-black hover:border-black"}`}>Todos ({orders.length})</button>
        {ORDER_STATUSES.map((s) => (
          <button key={s.value} onClick={() => setFilter(s.value)} className={`px-4 py-2 text-button uppercase ${filter === s.value ? "bg-black text-white" : "bg-white border border-[#c4c7c7] text-black hover:border-black"}`}>{s.label}</button>
        ))}
        <button onClick={load} className="ml-auto px-4 py-2 text-button uppercase bg-[#25D366] text-white hover:bg-[#1FB855]">Refrescar</button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-8 border border-[#c4c7c7] text-center text-body-md text-[#444748]">
          No hay pedidos en este filtro.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const statusMeta = ORDER_STATUSES.find((s) => s.value === o.status) || ORDER_STATUSES[0];
            return (
              <div key={o.id} className="bg-white p-5 border border-[#c4c7c7]">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-label-caps px-2 py-0.5 uppercase text-white" style={{ backgroundColor: statusMeta.color }}>{statusMeta.label}</span>
                      {o.source && <span className="text-label-caps text-[#999] uppercase">{o.source}</span>}
                      <span className="text-label-caps text-[#666]">{fmtDate(o.created_at)}</span>
                    </div>
                    <div className="text-body-md font-medium text-black">{o.product_name} × {o.quantity}{o.size && <span className="text-[#666]"> · Talla {o.size}</span>}</div>
                    <div className="text-body-md text-[#444748] mt-1">{o.customer_name || "Cliente pendiente"} · {o.customer_phone}</div>
                    {o.notes && <div className="text-sm text-[#666] mt-1 italic">{o.notes}</div>}
                  </div>
                  <div className="text-right">
                    <div className="text-headline-lg text-black">{o.total}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#c4c7c7]">
                  {ORDER_STATUSES.map((s) => (
                    <button key={s.value} onClick={() => updateStatus(o.id, s.value)} className={`px-3 py-1.5 text-label-caps uppercase ${o.status === s.value ? "bg-black text-white" : "bg-[#f3f3f3] text-black hover:bg-[#e8e8e8]"}`}>{s.label}</button>
                  ))}
                  <button onClick={() => deleteOrder(o.id)} className="ml-auto px-3 py-1.5 text-label-caps uppercase text-red-600 hover:bg-red-50">Eliminar</button>
                </div>
                {/* Internal WhatsApp forward */}
                {content.notifications?.notifyWhatsapp && (
                  <div className="mt-2 pt-2 border-t border-[#eee]">
                    <a
                      href={`https://wa.me/${content.notifications.notifyWhatsapp}?text=${encodeURIComponent(
                        `🛒 PEDIDO ${o.id}\n${o.product_name} × ${o.quantity}${o.size ? ` · Talla ${o.size}` : ""}\nTotal: ${o.total}\nCliente: ${o.customer_name || "Pendiente"} · ${o.customer_phone}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-label-caps uppercase bg-[#25D366] text-white hover:bg-[#1FB855] transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">forward_to_inbox</span>
                      Reenviar a mi WhatsApp
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Leads list (inside Newsletter tab) ──────────────────────────────
function LeadsList() {
  const [leads, setLeads] = useState<{ id: string; email: string; source: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => setLeads(j.leads || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-body-md text-[#444748]">Cargando suscriptores...</div>;

  return (
    <div>
      <h4 className="text-headline-lg text-black mb-3">Suscriptores ({leads.length})</h4>
      {leads.length === 0 ? (
        <p className="text-body-md text-[#444748]">Aún no hay suscriptores.</p>
      ) : (
        <div className="bg-white border border-[#c4c7c7] max-h-96 overflow-y-auto">
          {leads.map((l) => (
            <div key={l.id} className="px-4 py-3 border-b border-[#eee] last:border-0 flex items-center justify-between">
              <span className="text-body-md text-black">{l.email}</span>
              <span className="text-label-caps text-[#666] uppercase">{new Date(l.createdAt).toLocaleDateString("es-PE")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
