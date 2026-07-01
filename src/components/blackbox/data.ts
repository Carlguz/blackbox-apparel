export type Product = {
  id: string;
  name: string;
  label: string;
  price: string;
  image: string;
  alt: string;
};

export const WHATSAPP_NUMBER = "51999888777"; // Replace with real number

export const products: Product[] = [
  {
    id: "001",
    name: "Stealth Black",
    label: "Navy Blue / Algodón Pima",
    price: "S/69",
    image: "/products/polo-slate-front.png",
    alt: "Polo navy blue premium de algodón Pima BLACKBOX",
  },
  {
    id: "002",
    name: "Phantom White",
    label: "Blanco / Premium Cotton",
    price: "S/59",
    image: "/products/polo-phantom-front.png",
    alt: "Polo blanco premium de algodón BLACKBOX",
  },
  {
    id: "003",
    name: "Onyx Basic",
    label: "Negro Mate / Calce Regular",
    price: "S/69",
    image: "/products/polo-onyx-front.png",
    alt: "Polo negro mate minimalista BLACKBOX",
  },
];

export function buildWhatsAppLink(productId?: string, productName?: string, price?: string): string {
  let message: string;
  if (productId && productName && price) {
    message = `¡Hola BLACKBOX! Quiero pedir el polo ${productName} (${price}). ¿Me ayudan con tallas y disponibilidad?`;
  } else {
    message = `¡Hola BLACKBOX! Quiero información sobre la Colección 001.`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
