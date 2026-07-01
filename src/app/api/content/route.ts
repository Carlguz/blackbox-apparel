import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { defaultContent, type SiteContentData } from "@/components/blackbox/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const row = await db.siteContent.findUnique({
      where: { id: "singleton" },
    });
    if (!row) {
      return NextResponse.json({ data: defaultContent });
    }
    const parsed = JSON.parse(row.data) as SiteContentData;
    const merged = { ...defaultContent, ...parsed };
    return NextResponse.json({ data: merged });
  } catch (e) {
    console.error("GET content error:", e);
    return NextResponse.json({ data: defaultContent });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as SiteContentData;
    const data = JSON.stringify(body);
    const row = await db.siteContent.upsert({
      where: { id: "singleton" },
      update: { data },
      create: { id: "singleton", data },
    });
    return NextResponse.json({ ok: true, data: row });
  } catch (e) {
    console.error("PUT content error:", e);
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
