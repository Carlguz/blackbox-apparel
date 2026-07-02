import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, phone, source } = (await req.json()) as {
      email: string;
      phone?: string;
      source?: string;
    };

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email requerido" }, { status: 400 });
    }

    if (isSupabaseConfigured) {
      const sb = getSupabase();
      // Upsert customer by phone if provided, else create with email placeholder phone
      const phoneKey = phone || `email:${email}`;
      const { data: cust } = await sb!
        .from("customers")
        .upsert({ phone: phoneKey, email }, { onConflict: "phone" })
        .select("id")
        .single();
      if (cust?.id) {
        await sb!.from("leads").insert({
          customer_id: cust.id,
          email,
          source: source || "newsletter",
        });
      }
      return NextResponse.json({ ok: true, storage: "supabase" });
    }

    // Prisma fallback
    const phoneKey = phone || `email:${email}`;
    const customer = await db.customer.upsert({
      where: { phone: phoneKey },
      update: { email },
      create: { phone: phoneKey, email },
    });
    await db.lead.create({
      data: {
        customerId: customer.id,
        email,
        source: source || "newsletter",
      },
    });
    return NextResponse.json({ ok: true, storage: "local" });
  } catch (e) {
    console.error("Lead error:", e);
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (isSupabaseConfigured) {
      const sb = getSupabase();
      const { data, error } = await sb!
        .from("leads")
        .select("id, email, source, created_at, customers(name, phone)")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return NextResponse.json({
          leads: (data as any[]).map((r) => ({
            id: r.id,
            email: r.email,
            source: r.source,
            customerName: r.customers?.name ?? null,
            customerPhone: r.customers?.phone ?? null,
            createdAt: r.created_at,
          })),
          storage: "supabase",
        });
      }
    }
    const leads = await db.lead.findMany({
      include: { customer: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      leads: leads.map((l) => ({
        id: l.id,
        email: l.email,
        source: l.source,
        customerName: l.customer.name,
        customerPhone: l.customer.phone,
        createdAt: l.createdAt.toISOString(),
      })),
      storage: "local",
    });
  } catch (e) {
    console.error("Lead GET error:", e);
    return NextResponse.json({ leads: [], error: (e as Error).message }, { status: 500 });
  }
}
