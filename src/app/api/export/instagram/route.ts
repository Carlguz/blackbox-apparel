import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { defaultContent, type SiteContentData } from "@/components/blackbox/content";

export const dynamic = "force-dynamic";

function csvEscape(s: string | null | undefined): string {
  if (s == null) return "";
  const str = String(s);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generates a CSV catalog compatible with Instagram/Meta Shopping feed.
 * Format: https://www.facebook.com/business/help/120325381656392
 */
export async function GET() {
  try {
    let content: SiteContentData = defaultContent;
    if (isSupabaseConfigured) {
      const sb = getSupabase();
      const { data } = await sb.from("site_content").select("data").eq("id", "singleton").maybeSingle();
      if (data?.data) content = { ...defaultContent, ...JSON.parse(data.data) };
    } else {
      const row = await db.siteContent.findUnique({ where: { id: "singleton" } });
      if (row) content = { ...defaultContent, ...JSON.parse(row.data) };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blackbox-apparel.pe";

    const headers = [
      "id", "title", "description", "availability", "condition", "price",
      "link", "image_link", "brand", "additional_image_link", "size",
      "age_group", "gender", "material", "product_type",
    ];

    const rows = content.products.map((p) => {
      const totalStock = Object.values(p.stock || {}).reduce((a, b) => a + b, 0);
      const priceNum = parseFloat(String(p.price).replace(/[^0-9.]/g, "")) || 0;
      const sizes = (p.sizes || []).join("/");
      return [
        p.id,
        p.name,
        p.description,
        totalStock > 0 ? "in stock" : "out of stock",
        "new",
        `${priceNum.toFixed(2)} PEN`,
        `${siteUrl}/producto/${p.id}`,
        p.image,
        "BLACKBOX APPAREL",
        p.backImage || "",
        sizes,
        "adult",
        "unisex",
        p.material || "",
        "Apparel & Accessories > Clothing > Shirts & Tops",
      ].map(csvEscape).join(",");
    });

    const csv = headers.join(",") + "\n" + rows.join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="instagram-shopping-feed.csv"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
