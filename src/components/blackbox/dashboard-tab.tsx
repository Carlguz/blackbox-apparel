"use client";

import { useEffect, useState } from "react";

type Metrics = {
  totalOrders: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
  potentialRevenue: number;
  topProducts: { name: string; count: number; revenue: number }[];
  recentOrders: { id: string; product: string; customer: string; total: string; status: string; date: string }[];
  ordersLast7Days: { date: string; count: number }[];
  uniqueCustomers: number;
  conversionRate: number;
};

export function DashboardTab() {
  const [m, setM] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/metrics", { cache: "no-store" });
      const json = await res.json();
      setM(json.metrics || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="text-body-md text-[#444748]">Cargando métricas...</div>;
  if (!m) return <div className="text-body-md text-[#444748]">No hay datos aún.</div>;

  const maxOrders = Math.max(...m.ordersLast7Days.map((d) => d.count), 1);
  const fmtDate = (s: string) =>
    new Date(s).toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit" });

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPI label="Pedidos totales" value={String(m.totalOrders)} />
        <KPI label="Ingresos entregados" value={`S/${m.totalRevenue.toFixed(0)}`} highlight />
        <KPI label="Ingresos potenciales" value={`S/${m.potentialRevenue.toFixed(0)}`} />
        <KPI label="Conversión" value={`${m.conversionRate}%`} highlight />
        <KPI label="Clientes únicos" value={String(m.uniqueCustomers)} />
        <KPI label="Pendientes" value={String(m.pending)} />
        <KPI label="Confirmados" value={String(m.confirmed)} />
        <KPI label="Entregados" value={String(m.delivered)} />
      </div>

      {/* Chart - last 7 days */}
      <div className="bg-white p-6 border border-[#c4c7c7]">
        <h3 className="text-headline-lg text-black mb-4">Pedidos últimos 7 días</h3>
        <div className="flex items-end gap-2 h-32">
          {m.ordersLast7Days.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-black transition-all hover:bg-[#25D366]"
                style={{ height: `${(d.count / maxOrders) * 100}%`, minHeight: d.count > 0 ? "8px" : "2px" }}
                title={`${d.count} pedidos`}
              />
              <span className="text-label-caps text-[#666] uppercase">{fmtDate(d.date)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top products */}
      <div className="bg-white p-6 border border-[#c4c7c7]">
        <h3 className="text-headline-lg text-black mb-4">Productos más pedidos</h3>
        {m.topProducts.length === 0 ? (
          <p className="text-body-md text-[#444748]">Sin datos aún.</p>
        ) : (
          <div className="space-y-3">
            {m.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-label-caps text-[#666] w-6">#{i + 1}</span>
                  <span className="text-body-md text-black">{p.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-body-md text-[#444748]">{p.count} pedidos</span>
                  <span className="text-body-md font-medium text-black">S/{p.revenue.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div className="bg-white p-6 border border-[#c4c7c7]">
        <h3 className="text-headline-lg text-black mb-4">Pedidos recientes</h3>
        {m.recentOrders.length === 0 ? (
          <p className="text-body-md text-[#444748]">Sin pedidos aún.</p>
        ) : (
          <div className="space-y-2">
            {m.recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-[#eee] last:border-0">
                <div>
                  <div className="text-body-md text-black">{o.product}</div>
                  <div className="text-label-caps text-[#666] uppercase">{o.customer} · {fmtDate(o.date)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-body-md font-medium text-black">{o.total}</span>
                  <span
                    className="text-label-caps uppercase px-2 py-0.5"
                    style={{
                      backgroundColor:
                        o.status === "delivered" ? "#25D366" :
                        o.status === "cancelled" ? "#ba1a1a" :
                        o.status === "shipped" ? "#C9A961" :
                        o.status === "confirmed" ? "#1F3C88" : "#a9a9a9",
                      color: "white",
                    }}
                  >
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={load}
        className="px-4 py-2 text-button uppercase bg-[#25D366] text-white hover:bg-[#1FB855]"
      >
        Refrescar métricas
      </button>
    </div>
  );
}

function KPI({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-5 border ${highlight ? "bg-black text-white border-black" : "bg-white border-[#c4c7c7]"}`}>
      <div className={`text-label-caps uppercase mb-1 ${highlight ? "text-white/60" : "text-[#666]"}`}>{label}</div>
      <div className="text-headline-lg font-semibold">{value}</div>
    </div>
  );
}
