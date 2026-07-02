import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function csvEscape(s: string | null | undefined): string {
  if (s == null) return "";
  const str = String(s);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCSV(rows: Record<string, any>[], headers: { key: string; label: string }[]): string {
  const head = headers.map((h) => csvEscape(h.label)).join(",");
  const body = rows.map((r) =>
    headers.map((h) => csvEscape(r[h.key])).join(",")
  ).join("\n");
  return head + "\n" + body;
}

export async function GET() {
  try {
    let orders: any[] = [];

    if (isSupabaseConfigured) {
      const sb = getSupabase();
      const { data } = await sb
        .from("orders")
        .select("id, product_name, product_price, size, quantity, status, total, notes, source, created_at, customers(name, phone, email)")
        .order("created_at", { ascending: false });
      if (data) {
        orders = (data as any[]).map((r) => ({
          id: r.id,
          product_name: r.product_name,
          product_price: r.product_price,
          size: r.size,
          quantity: r.quantity,
          status: r.status,
          total: r.total,
          notes: r.notes,
          source: r.source,
          created_at: r.created_at,
          customer_name: r.customers?.name ?? "",
          customer_phone: r.customers?.phone ?? "",
          customer_email: r.customers?.email ?? "",
        }));
      }
    }

    if (orders.length === 0) {
      const rows = await db.order.findMany({
        include: { customer: true },
        orderBy: { createdAt: "desc" },
      });
      orders = rows.map((o) => ({
        id: o.id,
        product_name: o.productName,
        product_price: o.productPrice,
        size: o.size,
        quantity: o.quantity,
        status: o.status,
        total: o.total,
        notes: o.notes,
        source: o.source,
        created_at: o.createdAt.toISOString(),
        customer_name: o.customer.name || "",
        customer_phone: o.customer.phone,
        customer_email: o.customer.email || "",
      }));
    }

    const headers = [
      { key: "id", label: "ID Pedido" },
      { key: "created_at", label: "Fecha" },
      { key: "product_name", label: "Producto" },
      { key: "product_price", label: "Precio" },
      { key: "size", label: "Talla" },
      { key: "quantity", label: "Cantidad" },
      { key: "total", label: "Total" },
      { key: "status", label: "Estado" },
      { key: "source", label: "Origen" },
      { key: "customer_name", label: "Cliente" },
      { key: "customer_phone", label: "Teléfono" },
      { key: "customer_email", label: "Email" },
      { key: "notes", label: "Notas" },
    ];

    const csv = toCSV(orders, headers);
    const dateStr = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="pedidos-blackbox-${dateStr}.csv"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
