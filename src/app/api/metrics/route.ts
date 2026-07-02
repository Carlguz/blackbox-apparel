import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export type Metrics = {
  totalOrders: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number; // sum of delivered orders (numeric part of total)
  potentialRevenue: number; // sum of pending+confirmed
  topProducts: { name: string; count: number; revenue: number }[];
  recentOrders: { id: string; product: string; customer: string; total: string; status: string; date: string }[];
  ordersLast7Days: { date: string; count: number }[];
  uniqueCustomers: number;
  conversionRate: number; // confirmed+delivered / total
};

function parsePrice(s: string): number {
  const m = String(s).match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

async function getFromPrisma(): Promise<Metrics> {
  const orders = await db.order.findMany({ include: { customer: true } });
  return computeMetrics(orders.map((o) => ({
    id: o.id,
    productName: o.productName,
    productPrice: o.productPrice,
    customerName: o.customer.name || o.customer.phone,
    total: o.total,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
  })));
}

async function getFromSupabase(): Promise<Metrics | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("orders")
    .select("id, product_name, product_price, total, status, created_at, customers(name, phone)")
    .order("created_at", { ascending: false });
  if (error || !data) return null;
  return computeMetrics((data as any[]).map((r) => ({
    id: r.id,
    productName: r.product_name,
    productPrice: r.product_price,
    customerName: r.customers?.name || r.customers?.phone || "—",
    total: r.total,
    status: r.status,
    createdAt: r.created_at,
  })));
}

function computeMetrics(items: {
  id: string;
  productName: string;
  productPrice: string;
  customerName: string;
  total: string;
  status: string;
  createdAt: string;
}[]): Metrics {
  const total = items.length;
  const byStatus = (s: string) => items.filter((i) => i.status === s).length;
  const revenue = (statuses: string[]) =>
    items.filter((i) => statuses.includes(i.status)).reduce((a, b) => a + parsePrice(b.total), 0);

  // Top products
  const prodMap: Record<string, { count: number; revenue: number }> = {};
  items.forEach((i) => {
    const k = i.productName;
    if (!prodMap[k]) prodMap[k] = { count: 0, revenue: 0 };
    prodMap[k].count += 1;
    prodMap[k].revenue += parsePrice(i.total);
  });
  const topProducts = Object.entries(prodMap)
    .map(([name, v]) => ({ name, count: v.count, revenue: v.revenue }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Last 7 days
  const days: Record<string, number> = {};
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const k = d.toISOString().slice(0, 10);
    days[k] = 0;
  }
  items.forEach((i) => {
    const k = new Date(i.createdAt).toISOString().slice(0, 10);
    if (k in days) days[k] += 1;
  });
  const ordersLast7Days = Object.entries(days).map(([date, count]) => ({ date, count }));

  // Unique customers
  const uniqueCust = new Set(items.map((i) => i.customerName)).size;

  // Conversion rate
  const converted = byStatus("confirmed") + byStatus("delivered");
  const convRate = total > 0 ? Math.round((converted / total) * 100) : 0;

  return {
    totalOrders: total,
    pending: byStatus("pending"),
    confirmed: byStatus("confirmed"),
    shipped: byStatus("shipped"),
    delivered: byStatus("delivered"),
    cancelled: byStatus("cancelled"),
    totalRevenue: revenue(["delivered"]),
    potentialRevenue: revenue(["pending", "confirmed"]),
    topProducts,
    recentOrders: items.slice(0, 5).map((i) => ({
      id: i.id,
      product: i.productName,
      customer: i.customerName,
      total: i.total,
      status: i.status,
      date: i.createdAt,
    })),
    ordersLast7Days,
    uniqueCustomers: uniqueCust,
    conversionRate: convRate,
  };
}

export async function GET() {
  try {
    let metrics: Metrics | null = null;
    if (isSupabaseConfigured) metrics = await getFromSupabase();
    if (!metrics) metrics = await getFromPrisma();
    return NextResponse.json({ metrics, storage: isSupabaseConfigured ? "supabase" : "local" });
  } catch (e) {
    console.error("Metrics error:", e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
