import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendOrderNotificationEmail } from "@/lib/notifications";
import { defaultContent, type SiteContentData } from "@/components/blackbox/content";

export const dynamic = "force-dynamic";

const ORDERS_TABLE = "orders";
const CUSTOMERS_TABLE = "customers";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type OrderRow = {
  id: string;
  customer_id: string;
  customer_name: string | null;
  customer_phone: string;
  product_id: string;
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

// ─── GET /api/orders ──────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") as OrderStatus | null;
  try {
    let rows: OrderRow[] = [];

    if (isSupabaseConfigured) {
      const sb = getSupabase();
      let q = sb!.from(ORDERS_TABLE).select(
        "id, customer_id, product_id, product_name, product_price, size, quantity, status, total, notes, source, created_at, customers(name, phone)"
      );
      if (status) q = q.eq("status", status);
      q = q.order("created_at", { ascending: false });
      const { data, error } = await q;
      if (!error && data) {
        rows = (data as any[]).map((r) => ({
          id: r.id,
          customer_id: r.customer_id,
          customer_name: r.customers?.name ?? null,
          customer_phone: r.customers?.phone ?? "",
          product_id: r.product_id,
          product_name: r.product_name,
          product_price: r.product_price,
          size: r.size,
          quantity: r.quantity,
          status: r.status,
          total: r.total,
          notes: r.notes,
          source: r.source,
          created_at: r.created_at,
        }));
      }
    }

    if (rows.length === 0) {
      // Fallback to Prisma
      const where = status ? { status } : {};
      const orders = await db.order.findMany({
        where,
        include: { customer: true },
        orderBy: { createdAt: "desc" },
      });
      rows = orders.map((o) => ({
        id: o.id,
        customer_id: o.customerId,
        customer_name: o.customer.name,
        customer_phone: o.customer.phone,
        product_id: o.productId,
        product_name: o.productName,
        product_price: o.productPrice,
        size: o.size,
        quantity: o.quantity,
        status: o.status as OrderStatus,
        total: o.total,
        notes: o.notes,
        source: o.source,
        created_at: o.createdAt.toISOString(),
      }));
    }

    return NextResponse.json({ orders: rows, storage: isSupabaseConfigured ? "supabase" : "local" });
  } catch (e) {
    console.error("GET orders error:", e);
    return NextResponse.json({ orders: [], error: (e as Error).message }, { status: 500 });
  }
}

// ─── POST /api/orders ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      productId,
      productName,
      productPrice,
      size,
      quantity = 1,
      notes,
      source,
    } = body as {
      customerName?: string;
      customerPhone: string;
      customerEmail?: string;
      productId: string;
      productName: string;
      productPrice: string;
      size?: string;
      quantity?: number;
      notes?: string;
      source?: string;
    };

    if (!customerPhone || !productId || !productName) {
      return NextResponse.json(
        { ok: false, error: "Faltan datos (teléfono, producto)" },
        { status: 400 }
      );
    }

    // Compute total (strip non-numeric from price and multiply by quantity)
    const priceNum = parseFloat(String(productPrice).replace(/[^0-9.]/g, "")) || 0;
    const totalNum = priceNum * quantity;
    const total = `S/${totalNum.toFixed(0)}`;
    const status: OrderStatus = "pending";

    let orderId = "";
    let storage: "supabase" | "local" = "local";

    if (isSupabaseConfigured) {
      const sb = getSupabase();
      // Upsert customer by phone
      const { data: cust } = await sb!
        .from(CUSTOMERS_TABLE)
        .upsert(
          { name: customerName || null, phone: customerPhone, email: customerEmail || null },
          { onConflict: "phone" }
        )
        .select("id")
        .single();
      const customerId = cust?.id;
      if (!customerId) throw new Error("No se pudo crear/obtener cliente");
      // Insert order
      const { data: ord, error } = await sb!
        .from(ORDERS_TABLE)
        .insert({
          customer_id: customerId,
          product_id: productId,
          product_name: productName,
          product_price: productPrice,
          size: size || null,
          quantity,
          status,
          total,
          notes: notes || null,
          source: source || null,
        })
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      orderId = ord?.id ?? "";
      storage = "supabase";
    } else {
      // Prisma fallback
      const customer = await db.customer.upsert({
        where: { phone: customerPhone },
        update: { name: customerName, email: customerEmail },
        create: { phone: customerPhone, name: customerName, email: customerEmail },
      });
      const order = await db.order.create({
        data: {
          customerId: customer.id,
          productId,
          productName,
          productPrice,
          size: size || null,
          quantity,
          status,
          total,
          notes: notes || null,
          source: source || null,
        },
      });
      orderId = order.id;
      storage = "local";
    }

    // Fire-and-forget notification email (before return so it actually runs)
    void (async () => {
      try {
        let content: SiteContentData = defaultContent;
        if (isSupabaseConfigured) {
          const sb = getSupabase();
          const { data } = await sb!.from("site_content").select("data").eq("id", "singleton").maybeSingle();
          if (data?.data) content = { ...defaultContent, ...JSON.parse(data.data) };
        } else {
          const row = await db.siteContent.findUnique({ where: { id: "singleton" } });
          if (row) content = { ...defaultContent, ...JSON.parse(row.data) };
        }
        if (content.notifications?.emailEnabled) {
          await sendOrderNotificationEmail(content, {
            id: orderId,
            productName,
            productPrice,
            size,
            quantity,
            total,
            customerName,
            customerPhone,
            source,
          });
        }
      } catch (e) {
        console.warn("Notification email failed:", e);
      }
    })();

    return NextResponse.json({ ok: true, orderId, status, total, storage });
  } catch (e) {
    console.error("POST order error:", e);
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
