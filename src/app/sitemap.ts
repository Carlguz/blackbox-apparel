import { db } from "@/lib/db";
import { defaultContent } from "@/components/blackbox/content";
import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blackbox-apparel.pe";

  let content = defaultContent;
  try {
    const row = await db.siteContent.findUnique({ where: { id: "singleton" } });
    if (row) content = { ...defaultContent, ...JSON.parse(row.data) };
  } catch {}

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];

  const productRoutes: MetadataRoute.Sitemap = content.products
    .filter((p) => p.published !== false)
    .map((p) => ({
      url: `${baseUrl}/producto/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...productRoutes];
}
