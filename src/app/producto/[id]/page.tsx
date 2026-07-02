import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { defaultContent, type SiteContentData } from "@/components/blackbox/content";
import { ProductPageClient } from "./product-page-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

async function getContent(): Promise<SiteContentData> {
  try {
    const row = await db.siteContent.findUnique({ where: { id: "singleton" } });
    if (row) {
      const parsed = JSON.parse(row.data) as SiteContentData;
      return { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.error(e);
  }
  return defaultContent;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const content = await getContent();
  const product = content.products.find((p) => p.id === id || p.name.toLowerCase().replace(/\s+/g, "-") === id);
  if (!product) return { title: "Producto no encontrado | BLACKBOX" };
  return {
    title: `${product.name} | BLACKBOX APPAREL`,
    description: product.description,
    openGraph: {
      title: `${product.name} | BLACKBOX APPAREL`,
      description: product.description,
      images: [{ url: product.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | BLACKBOX APPAREL`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const content = await getContent();
  const product = content.products.find((p) => p.id === id || p.name.toLowerCase().replace(/\s+/g, "-") === id);
  if (!product) notFound();
  return <ProductPageClient product={product} content={content} />;
}
