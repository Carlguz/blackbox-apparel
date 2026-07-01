// Default editable content for the BLACKBOX APPAREL landing
// All editable content lives in this single object so the AdminPanel can mutate it.

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type EditableProduct = {
  id: string;
  name: string;
  label: string;
  price: string;
  image: string;
  alt: string;
  description: string;
  story: string;
  material: string;
  care: string;
  sizes: ProductSize[];
  stock: Record<string, number>; // size -> qty
  backImage?: string;
  detailImage?: string;
};

export type EditableBenefit = {
  id: string;
  icon: string; // Material Symbol name
  title: string;
  text: string;
};

export type ThemeColors = {
  bg: string;
  text: string;
  primary: string;
  whatsapp: string;
};

export type NotificationsConfig = {
  // Email destino donde recibir notificaciones de pedidos
  notifyEmail: string;
  // WhatsApp interno (diferente del WhatsApp público de clientes)
  notifyWhatsapp: string;
  // SMTP config
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  smtpFrom: string;
  // Toggles
  emailEnabled: boolean;
  whatsappBadgeEnabled: boolean;
};

export type SiteContentData = {
  whatsappNumber: string;
  instagramUrl: string;
  tiktokUrl: string;
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
  theme: ThemeColors;
  newsletter: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  sizeGuide: {
    title: string;
    rows: { size: string; chest: string; length: string; waist: string }[];
  };
  notifications: NotificationsConfig;
};

export const defaultContent: SiteContentData = {
  whatsappNumber: "51999888777",
  instagramUrl: "https://instagram.com",
  tiktokUrl: "https://tiktok.com",
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
      description:
        "Polo navy blue de algodón Pima heavyweight. El azul profundo que combina con todo.",
      story:
        "Inspirado en la noche limeña. Bordado tonal en el pecho, costuras reforzadas, caída perfecta desde el primer uso.",
      material: "100% Algodón Pima peruano · 240 g/m² heavyweight",
      care: "Lavar en frío · Secar a la sombra · Planchar del revés",
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: { S: 15, M: 25, L: 30, XL: 20, XXL: 10 },
    },
    {
      id: "002",
      name: "Phantom White",
      label: "Blanco / Premium Cotton",
      price: "S/59",
      image: "/products/polo-phantom-front.png",
      alt: "Polo blanco premium BLACKBOX",
      description:
        "Polo blanco de algodón premium peinado. Limpio, versátil, atemporal.",
      story:
        "El contrapunto limpio. Frente minimalista, espalda con detalle sutil. Para el que entiende que el silencio también es identidad.",
      material: "100% Algodón Pima peruano · 220 g/m² peinado",
      care: "Lavar en frío · Secar a la sombra · No usar blanqueador",
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: { S: 12, M: 20, L: 28, XL: 18, XXL: 8 },
    },
    {
      id: "003",
      name: "Onyx Basic",
      label: "Negro Mate / Calce Regular",
      price: "S/69",
      image: "/products/polo-onyx-front.png",
      alt: "Polo negro mate BLACKBOX",
      description:
        "Polo negro absoluto. El más silencioso de la colección.",
      story:
        "Para el que no necesita mostrar nada para saber lo que es. Textura mate, caída estructurada, presencia absoluta.",
      material: "100% Algodón Pima peruano · 240 g/m² heavyweight",
      care: "Lavar en frío · Secar a la sombra · Planchar del revés",
      sizes: ["S", "M", "L", "XL", "XXL"],
      stock: { S: 10, M: 22, L: 28, XL: 15, XXL: 12 },
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
  theme: {
    bg: "#f9f9f9",
    text: "#1a1c1c",
    primary: "#000000",
    whatsapp: "#25D366",
  },
  newsletter: {
    title: "Únete al club",
    subtitle: "Accede a drops exclusivos y descuentos antes que nadie.",
    buttonText: "Suscribirme",
  },
  sizeGuide: {
    title: "Guía de Tallas",
    rows: [
      { size: "S", chest: "46-48 cm", length: "68 cm", waist: "40-42 cm" },
      { size: "M", chest: "49-51 cm", length: "70 cm", waist: "43-45 cm" },
      { size: "L", chest: "52-54 cm", length: "72 cm", waist: "46-48 cm" },
      { size: "XL", chest: "55-57 cm", length: "74 cm", waist: "49-51 cm" },
      { size: "XXL", chest: "58-60 cm", length: "76 cm", waist: "52-54 cm" },
    ],
  },
  notifications: {
    notifyEmail: "",
    notifyWhatsapp: "",
    smtpHost: "smtp.gmail.com",
    smtpPort: "465",
    smtpUser: "",
    smtpPassword: "",
    smtpFrom: "BLACKBOX APPAREL <no-reply@blackbox.pe>",
    emailEnabled: false,
    whatsappBadgeEnabled: true,
  },
};

export function buildWhatsAppLink(
  whatsappNumber: string,
  productId?: string,
  productName?: string,
  price?: string,
  size?: string,
  source?: string
): string {
  let message: string;
  if (productId && productName && price) {
    const sizeText = size ? ` · Talla ${size}` : "";
    message = `¡Hola BLACKBOX! Quiero pedir el polo ${productName} (${price}${sizeText}). ¿Me ayudan con la disponibilidad?`;
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
  source?: string;
}): Promise<void> {
  try {
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerPhone: "pending",
        customerName: null,
        productId: opts.productId,
        productName: opts.productName,
        productPrice: opts.productPrice,
        size: opts.size,
        source: opts.source || "landing",
        notes: "Pedido iniciado desde landing (clic en WhatsApp)",
      }),
    });
  } catch (e) {
    console.warn("trackOrderClick failed:", e);
  }
}

/**
 * Wraps a WhatsApp link with order tracking.
 * Tracking only fires in the browser (not during SSR).
 */
export function buildWhatsAppLinkWithTracking(
  whatsappNumber: string,
  productId?: string,
  productName?: string,
  price?: string,
  size?: string,
  source?: string
): string {
  if (typeof window !== "undefined" && productId && productName && price) {
    void trackOrderClick({ productId, productName, productPrice: price, size, source });
  }
  return buildWhatsAppLink(whatsappNumber, productId, productName, price, size, source);
}
