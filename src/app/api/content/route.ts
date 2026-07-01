import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  defaultContent,
  type SiteContentData,
} from "@/components/blackbox/content";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const TABLE = "site_content";

// ─── Supabase helpers ────────────────────────────────────────────────
async function supabaseGetContent(): Promise<SiteContentData | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from(TABLE)
    .select("data")
    .eq("id", "singleton")
    .maybeSingle();
  if (error || !data) return null;
  try {
    return JSON.parse(data.data) as SiteContentData;
  } catch {
    return null;
  }
}

async function supabaseUpsertContent(data: SiteContentData): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const json = JSON.stringify(data);
  const { error } = await sb.from(TABLE).upsert(
    { id: "singleton", data: json, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  );
  return !error;
}

// ─── Prisma helpers (fallback) ────────────────────────────────────────
async function prismaGetContent(): Promise<SiteContentData | null> {
  try {
    const row = await db.siteContent.findUnique({
      where: { id: "singleton" },
    });
    if (!row) return null;
    return JSON.parse(row.data) as SiteContentData;
  } catch {
    return null;
  }
}

async function prismaUpsertContent(data: SiteContentData): Promise<boolean> {
  try {
    const json = JSON.stringify(data);
    await db.siteContent.upsert({
      where: { id: "singleton" },
      update: { data: json },
      create: { id: "singleton", data: json },
    });
    return true;
  } catch (e) {
    console.error("Prisma upsert error:", e);
    return false;
  }
}

// ─── Route handlers ───────────────────────────────────────────────────
export async function GET() {
  let data: SiteContentData | null = null;
  if (isSupabaseConfigured) {
    data = await supabaseGetContent();
  }
  if (!data) {
    data = await prismaGetContent();
  }
  const merged = data ? { ...defaultContent, ...data } : defaultContent;
  return NextResponse.json({ data: merged, storage: isSupabaseConfigured ? "supabase" : "local" });
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as SiteContentData;
    let ok = false;
    if (isSupabaseConfigured) {
      ok = await supabaseUpsertContent(body);
    }
    if (!ok) {
      ok = await prismaUpsertContent(body);
    }
    if (!ok) {
      return NextResponse.json({ ok: false, error: "No se pudo guardar" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, storage: isSupabaseConfigured ? "supabase" : "local" });
  } catch (e) {
    console.error("PUT content error:", e);
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
