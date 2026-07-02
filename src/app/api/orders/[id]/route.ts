import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { OrderStatus } from "../route";

export const dynamic = "force-dynamic";

const ORDERS_TABLE = "orders";
const VALID_STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const status = body.status as OrderStatus;
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ ok: false, error: "Status inválido" }, { status: 400 });
    }

    let ok = false;
    if (isSupabaseConfigured) {
      const sb = getSupabase();
      const { error } = await sb!.from(ORDERS_TABLE).update({ status }).eq("id", id);
      ok = !error;
    }
    if (!ok) {
      try {
        await db.order.update({ where: { id }, data: { status } });
        ok = true;
      } catch (e) {
        console.error("Prisma update order error:", e);
      }
    }

    if (!ok) return NextResponse.json({ ok: false }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    let ok = false;
    if (isSupabaseConfigured) {
      const sb = getSupabase();
      const { error } = await sb!.from(ORDERS_TABLE).delete().eq("id", id);
      ok = !error;
    }
    if (!ok) {
      try {
        await db.order.delete({ where: { id } });
        ok = true;
      } catch (e) {
        console.error("Prisma delete order error:", e);
      }
    }
    if (!ok) return NextResponse.json({ ok: false }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
