import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getSupabase, isSupabaseConfigured, STORAGE_BUCKET } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET — health check (para que Vercel reconozca la ruta)
export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/upload",
    method: "POST only",
    supabase: isSupabaseConfigured,
    bucket: STORAGE_BUCKET,
  });
}

// ─── Local fallback ───────────────────────────────────────────────────
async function saveLocal(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const name = `upload-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, name), bytes);
  return `/uploads/${name}`;
}

// ─── Supabase Storage ────────────────────────────────────────────────
async function saveSupabase(file: File): Promise<string> {
  const sb = getSupabase();
  if (!sb) throw new Error("Supabase not configured");
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const name = `upload-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const { error } = await sb.storage
    .from(STORAGE_BUCKET)
    .upload(name, bytes, {
      contentType: file.type || "image/png",
      upsert: false,
    });
  if (error) throw new Error(error.message);
  const { data: pub } = sb.storage.from(STORAGE_BUCKET).getPublicUrl(name);
  return pub.publicUrl;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
    }
    let url: string;
    let storage: "supabase" | "local" = "local";
    if (isSupabaseConfigured) {
      try {
        url = await saveSupabase(file);
        storage = "supabase";
      } catch (e) {
        console.warn("Supabase upload failed, falling back to local:", e);
        url = await saveLocal(file);
      }
    } else {
      url = await saveLocal(file);
    }
    return NextResponse.json({ ok: true, url, storage });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
