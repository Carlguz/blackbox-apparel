"use client";

import { useState, useRef, useEffect } from "react";
import { type SiteContentData, type EditableProduct, type EditableBenefit } from "./content";

type Tab = "general" | "hero" | "filosofia" | "coleccion" | "productos" | "beneficios" | "modelo" | "cta" | "footer" | "pedidos";

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
  { id: "pedidos", label: "Pedidos", icon: "shopping_bag" },
];

const MATERIAL_ICONS = [
  "local_shipping", "payments", "verified", "shopping_bag", "person",
  "chat", "favorite", "star", "security", "eco", "diamond", "workspace_premium",
  "auto_awesome", "bolt", "trending_up", "savings", "credit_card", "support_agent",
];

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
  created_at: string;
};

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
              {tab === "pedidos"
                ? "Pedidos generados cuando un cliente hace clic en WhatsApp."
                : "Edita los campos y guarda los cambios al final."}
            </p>
          </div>

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
                    <button onClick={() => removeProduct(p.id)} className="text-sm text-red-600 hover:text-red-800">
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
              <button onClick={addProduct} className="w-full py-4 border-2 border-dashed border-[#c4c7c7] text-[#444748] hover:border-black hover:text-black transition-colors text-button uppercase">
                + Agregar producto
              </button>
            </div>
          )}

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
                    <select value={b.icon} onChange={(e) => updateBenefit(b.id, { icon: e.target.value })} className="bb-input">
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
              <button onClick={addBenefit} className="w-full py-4 border-2 border-dashed border-[#c4c7c7] text-[#444748] hover:border-black hover:text-black transition-colors text-button uppercase">
                + Agregar beneficio
              </button>
            </div>
          )}

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

// ─── Orders Tab ───────────────────────────────────────────────────────
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

  useEffect(() => {
    load();
  }, [filter]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      load();
    } catch (e) {
      alert("Error al actualizar: " + (e as Error).message);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("¿Eliminar este pedido?")) return;
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      load();
    } catch (e) {
      alert("Error al eliminar: " + (e as Error).message);
    }
  };

  const fmtDate = (s: string) => {
    try {
      return new Date(s).toLocaleString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return s;
    }
  };

  if (loading) {
    return <div className="text-body-md text-[#444748]">Cargando pedidos...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-button uppercase ${filter === "all" ? "bg-black text-white" : "bg-white border border-[#c4c7c7] text-black hover:border-black"}`}
        >
          Todos ({orders.length})
        </button>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`px-4 py-2 text-button uppercase ${filter === s.value ? "bg-black text-white" : "bg-white border border-[#c4c7c7] text-black hover:border-black"}`}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={load}
          className="ml-auto px-4 py-2 text-button uppercase bg-[#25D366] text-white hover:bg-[#1FB855]"
        >
          <span className="material-symbols-outlined text-sm align-middle">refresh</span>{" "}
          Refrescar
        </button>
      </div>

      {/* Lista */}
      {orders.length === 0 ? (
        <div className="bg-white p-8 border border-[#c4c7c7] text-center text-body-md text-[#444748]">
          No hay pedidos aún. Cuando alguien haga clic en un botón de WhatsApp en la landing, aparecerá aquí.
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
                      <span
                        className="text-label-caps px-2 py-0.5 uppercase"
                        style={{ backgroundColor: statusMeta.color, color: "white" }}
                      >
                        {statusMeta.label}
                      </span>
                      <span className="text-label-caps text-[#666]">{fmtDate(o.created_at)}</span>
                    </div>
                    <div className="text-body-md font-medium text-black">
                      {o.product_name} × {o.quantity}
                      {o.size && <span className="text-[#666]"> · Talla {o.size}</span>}
                    </div>
                    <div className="text-body-md text-[#444748] mt-1">
                      {o.customer_name || "Cliente desconocido"} · {o.customer_phone}
                    </div>
                    {o.notes && (
                      <div className="text-sm text-[#666] mt-1 italic">{o.notes}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-headline-lg text-black">{o.total}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-[#c4c7c7]">
                  {ORDER_STATUSES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => updateStatus(o.id, s.value)}
                      className={`px-3 py-1.5 text-label-caps uppercase ${o.status === s.value ? "bg-black text-white" : "bg-[#f3f3f3] text-black hover:bg-[#e8e8e8]"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                  <button
                    onClick={() => deleteOrder(o.id)}
                    className="ml-auto px-3 py-1.5 text-label-caps uppercase text-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
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
      <div className="w-full aspect-[3/4] max-w-[200px] bg-[#eeeeee] overflow-hidden border border-[#c4c7c7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="Preview" className="w-full h-full object-cover" />
      </div>
      <input
        type="text"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/products/imagen.png o https://..."
        className="bb-input"
      />
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
