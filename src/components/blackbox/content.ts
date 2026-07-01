// Default editable content for the BLACKBOX APPAREL landing
// All editable content lives in this single object so the AdminPanel can mutate it.

export type EditableProduct = {
  id: string;
  name: string;
  label: string;
  price: string;
  image: string;
  alt: string;
};

export type EditableBenefit = {
  id: string;
  icon: string; // Material Symbol name
  title: string;
  text: string;
};

export type SiteContentData = {
  whatsappNumber: string;
  hero: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  filosofia: {
    label: string;
    quote: string;
  };
  coleccion: {
    title: string;
    subtitle: string;
  };
  products: EditableProduct[];
  beneficios: EditableBenefit[];
  modelo: {
    imageGrande: string;
    imagePequena1: string;
    imagePequena2: string;
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  footer: {
    copyright: string;
  };
};

export const defaultContent: SiteContentData = {
  whatsappNumber: "51999888777",
  hero: {
    titleLine1: "No vendemos ropa.",
    titleLine2: "Construimos presencia.",
    subtitle:
      "Polos premium diseñados en Perú para potenciar tu estilo, confianza y fit diario.",
    ctaText: "Comprar por WhatsApp",
    backgroundImage: "/products/hero-v3.png",
  },
  filosofia: {
    label: "Nuestra Filosofía",
    quote: "Vestir bien no es un lujo. Es una estrategia.",
  },
  coleccion: {
    title: "Colección 001",
    subtitle: "La base de cualquier armario sofisticado.",
  },
  products: [
    {
      id: "001",
      name: "Stealth Black",
      label: "Navy Blue / Algodón Pima",
      price: "S/69",
      image: "/products/polo-slate-front.png",
      alt: "Polo navy blue premium BLACKBOX",
    },
    {
      id: "002",
      name: "Phantom White",
      label: "Blanco / Premium Cotton",
      price: "S/59",
      image: "/products/polo-phantom-front.png",
      alt: "Polo blanco premium BLACKBOX",
    },
    {
      id: "003",
      name: "Onyx Basic",
      label: "Negro Mate / Calce Regular",
      price: "S/69",
      image: "/products/polo-onyx-front.png",
      alt: "Polo negro mate BLACKBOX",
    },
  ],
  beneficios: [
    {
      id: "b1",
      icon: "local_shipping",
      title: "Envíos Rápidos",
      text: "Entrega en 24-48h en Lima y envíos a todo el Perú.",
    },
    {
      id: "b2",
      icon: "payments",
      title: "Facilidad de Pago",
      text: "Pagos contra entrega, Yape, Plin o transferencia bancaria.",
    },
    {
      id: "b3",
      icon: "verified",
      title: "Calidad Superior",
      text: "Algodón premium con el mejor fit y estructura del mercado.",
    },
  ],
  modelo: {
    imageGrande: "/products/modelo-grande.png",
    imagePequena1: "/products/modelo-cuello.png",
    imagePequena2: "/products/polo-phantom-back.png",
  },
  cta: {
    title: "ELEVA TU BÁSICO HOY.",
    subtitle:
      "Únete a la disciplina del buen vestir. Calidad artesanal peruana con diseño contemporáneo.",
    buttonText: "Pedir por WhatsApp Ahora",
  },
  footer: {
    copyright: "© 2024 BLACKBOX APPAREL. Craftsmanship from the Andes to the world.",
  },
};

export function buildWhatsAppLink(
  whatsappNumber: string,
  productId?: string,
  productName?: string,
  price?: string
): string {
  let message: string;
  if (productId && productName && price) {
    message = `¡Hola BLACKBOX! Quiero pedir el polo ${productName} (${price}). ¿Me ayudan con tallas y disponibilidad?`;
  } else {
    message = `¡Hola BLACKBOX! Quiero información sobre la Colección 001.`;
  }
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a pending order in the database when a user clicks a WhatsApp CTA.
 * Fire-and-forget — never blocks the link opening.
 */
export async function trackOrderClick(opts: {
  productId: string;
  productName: string;
  productPrice: string;
  size?: string;
}): Promise<void> {
  try {
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerPhone: "pending", // placeholder, filled when WhatsApp contact happens
        customerName: null,
        productId: opts.productId,
        productName: opts.productName,
        productPrice: opts.productPrice,
        size: opts.size,
        notes: "Pedido iniciado desde landing (clic en WhatsApp)",
      }),
    });
  } catch (e) {
    // Silent fail — never block the user
    console.warn("trackOrderClick failed:", e);
  }
}

/**
 * Wraps a WhatsApp link with order tracking.
 * Returns the WhatsApp URL and triggers a background order creation.
 */
export function buildWhatsAppLinkWithTracking(
  whatsappNumber: string,
  productId?: string,
  productName?: string,
  price?: string,
  size?: string
): string {
  if (productId && productName && price) {
    void trackOrderClick({ productId, productName, productPrice: price, size });
  }
  return buildWhatsAppLink(whatsappNumber, productId, productName, price);
}
