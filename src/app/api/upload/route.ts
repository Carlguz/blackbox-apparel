import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = (file.name.split(".").pop() || "png").toLowerCase();
    const name = `upload-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, name);
    await fs.writeFile(filepath, bytes);
    return NextResponse.json({ ok: true, url: `/uploads/${name}` });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
