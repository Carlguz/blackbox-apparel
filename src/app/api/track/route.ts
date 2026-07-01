import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { path, referrer, country, device } = (await req.json()) as {
      path: string;
      referrer?: string;
      country?: string;
      device?: string;
    };

    if (!path) return NextResponse.json({ ok: false }, { status: 400 });

    if (isSupabaseConfigured) {
      const sb = getSupabase();
      const { error } = await sb!.from("page_views").insert({
        path,
        referrer: referrer || null,
        country: country || null,
        device: device || null,
      });
      if (!error) return NextResponse.json({ ok: true, storage: "supabase" });
    }

    await db.pageView.create({
      data: {
        path,
        referrer: referrer || null,
        country: country || null,
        device: device || null,
      },
    });
    return NextResponse.json({ ok: true, storage: "local" });
  } catch (e) {
    console.warn("Track error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
