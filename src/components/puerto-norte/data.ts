export type Product = {
  id: string;
  name: string;
  tagline: string;
  occasion: string;
  price: string;
  priceNumber: string;
  frontImage: string;
  backImage: string;
  colorName: string;
  colorHex: string;
  designConcept: string;
  frontDesign: string;
  backDesign: string;
  fabric: string;
  fit: string;
  sizes: string[];
};

// WhatsApp number (Peru) — REPLACE with real number when ready
export const WHATSAPP_NUMBER = "51999888777";

export const products: Product[] = [
  {
    id: "callao",
    name: "Callao",
    tagline: "Para el día · Café, paseo,周末",
    occasion: "Casual elevado",
    price: "S/ 45",
    priceNumber: "45",
    frontImage: "/products/callao-front.png",
    backImage: "/products/callao-back.png",
    colorName: "Azul profundo",
    colorHex: "#0B1F3A",
    designConcept:
      "Inspirado en el primer puerto del Perú. Bordado discreto en el pecho, tipografía serif elegante en la espalda. Un guiño que solo reconocen los que saben.",
    frontDesign:
      "Bordado 'CALLAO' en hilo blanco con estrella ★ sobre el pecho izquierdo. Tamaño 4cm, tipografía serif.",
    backDesign:
      "Tipografía serif 'CALLAO' centrada en la espalda alta, en blanco. Líneas finas horizontales arriba y abajo del texto. Tamaño 18cm de ancho.",
    fabric: "Algodón Pima 24/1 (180 g/m²)",
    fit: "Regular fit · Cuello redondo reforzado",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "grone",
    name: "Grone",
    tagline: "Para la noche · Cena, bar, salida",
    occasion: "Sofisticado",
    price: "S/ 48",
    priceNumber: "48",
    frontImage: "/products/grone-front.png",
    backImage: "/products/grone-back.png",
    colorName: "Blanco premium",
    colorHex: "#FFFFFF",
    designConcept:
      "El nombre que se pronuncia al revés, como las claves que solo entiende quien pertenece. Frente limpio con estrella, espalda con tipografía grande.",
    frontDesign:
      "Estrella ★ bordada en navy sobre el pecho izquierdo. Tamaño 2cm. Diseño absolutamente minimalista.",
    backDesign:
      "Tipografía serif 'GRONE' centrada en la espalda alta, en azul profundo. Línea fina horizontal arriba del texto. Tamaño 22cm de ancho.",
    fabric: "Algodón Pima 30/1 (170 g/m²) peinado",
    fit: "Slim fit · Cuello redondo con ribete delgado",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "maute",
    name: "Maute",
    tagline: "Para reunión · Oficina casual, cumpleaños",
    occasion: "Minimalista premium",
    price: "S/ 52",
    priceNumber: "52",
    frontImage: "/products/maute-front.png",
    backImage: "/products/maute-back.png",
    colorName: "Crema hueso",
    colorHex: "#F5F1EA",
    designConcept:
      "La pieza más silenciosa de la colección. Sin nada en el frente. Solo una tipografía pequeña en la nuca con la estrella. Para quien no necesita mostrar nada para saber lo que es.",
    frontDesign:
      "Frente completamente limpio. Sin impresión, sin bordado, sin decoración. Solo la calidad del algodón y el corte.",
    backDesign:
      "Tipografía serif 'MAUTE' pequeña en la nuca (cuello), en navy. Estrella ★ arriba del texto. Tamaño 6cm de ancho.",
    fabric: "Algodón Pima 24/1 (180 g/m²) — crema natural",
    fit: "Modern fit · Cuello redondo reforzado",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export function buildWhatsAppLink(productId: string, productName: string, price: string): string {
  const message = `¡Hola Puerto Norte! 👋\n\nQuiero pedir el polo *${productName}* (${price}).\n\n¿Me ayudan con tallas y disponibilidad? 🙌`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(): string {
  const message = `¡Hola Puerto Norte! 👋\n\nQuiero más info sobre la colección de polos. 🙌`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
