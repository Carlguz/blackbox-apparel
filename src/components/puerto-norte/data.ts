export type Product = {
  id: string;
  name: string;
  tagline: string;
  occasion: string;
  price: string;
  image: string;
  description: string;
  details: string[];
  fabric: string;
  fit: string;
  colors: string[];
};

export const products: Product[] = [
  {
    id: "callao",
    name: "Callao",
    tagline: "Casual elevado, herencia diaria",
    occasion: "Para el día a día, café, paseo",
    price: "S/ 89",
    image: "/products/polo-callao.png",
    description:
      "El polo Callao nace del puerto que vio nacer una pasión centenaria. Tejido en algodón pima de gramaje medio, con un bordado discreto del año fundacional en el pecho izquierdo y una franja tenue en la manga. Un guiño que solo quien sabe reconoce, sin gritar lo que se lleva en el alma.",
    details: [
      "Bordado '1901' en hilo blanco sobre el pecho izquierdo",
      "Franja tenue azul cielo en el puño de la manga",
      "Cuello redondo reforzado con ribete canalé",
      "Costuras dobles en hombros y cuello",
    ],
    fabric: "Algodón Pima peruano 220 g/m²",
    fit: "Regular fit, caída limpia",
    colors: ["Azul profundo", "Blanco hueso"],
  },
  {
    id: "grone",
    name: "Grone",
    tagline: "Sofisticado, para la noche",
    occasion: "Para salida, cena, bar",
    price: "S/ 95",
    image: "/products/polo-grone.png",
    description:
      "El polo Grone está pensado para la noche. Corte slim, algodón blanco de peinado extra, con la palabra 'Grone' en tipografía serif sobre el pecho. Un nombre que se pronuncia al revés, como las claves que solo entiende quien pertenece. Para salir elegante sin renunciar a lo tuyo.",
    details: [
      "Tipografía serif 'GRONE' en azul profundo sobre el pecho",
      "Corte slim, entallado moderno",
      "Algodón de peinado extra, suavidad sedosa",
      "Cuello redondo con ribete delgado tono sobre tono",
    ],
    fabric: "Algodón Pima peruano peinado 200 g/m²",
    fit: "Slim fit, entallado",
    colors: ["Blanco puro", "Azul profundo"],
  },
  {
    id: "maute",
    name: "Maute",
    tagline: "Minimalista premium",
    occasion: "Para reunión, oficina casual",
    price: "S/ 109",
    image: "/products/polo-maute.png",
    description:
      "El polo Maute es la pieza más silenciosa de la colección. Algodón navy de gramaje pesado, sin impresión frontal, solo una pequeña estrella bordada en la manga derecha y un acento azul cielo en el interior del cuello. Para quien no necesita mostrar nada para saber lo que es.",
    details: [
      "Estrella bordada en hilo plateado sobre manga derecha",
      "Acento azul cielo en el interior del cuello",
      "Sin impresión frontal, diseño absolutamente minimalista",
      "Algodón de gramaje pesado, caída estructurada",
    ],
    fabric: "Algodón Pima peruano 240 g/m²",
    fit: "Modern fit, caída estructurada",
    colors: ["Azul navy profundo"],
  },
];

export const faqs = [
  {
    q: "¿Los polos tienen licencia oficial del club?",
    a: "No. Puerto Norte es una marca independiente. Inspiramos nuestra identidad en la herencia cultural del hincha, sin usar escudos, logos ni nombres registrados por el club. Trabajamos con guiños estéticos y culturales (años, jerga popular, paleta de colores) que celebran la pertenencia sin violar derechos de imagen.",
  },
  {
    q: "¿Qué tallas están disponibles?",
    a: "Trabajamos tallas XS a XL en todos los modelos. Cada polo incluye guía de medidas detallada en la ficha de producto. Si dudas entre dos tallas, te recomendamos elegir la mayor: nuestros cortes están pensados para caer con elegancia, no para ajustar como camiseta deportiva.",
  },
  {
    q: "¿Cuál es el tiempo de entrega en Lima?",
    a: "Los pedidos dentro de Lima Metropolitana se entregan en 24 a 48 horas hábiles. Para provincias, el tiempo estimado es de 3 a 5 días hábiles. Realizamos envíos gratuitos en pedidos superiores a S/ 200.",
  },
  {
    q: "¿Cómo cuido mis polos Puerto Norte?",
    a: "Lavar a mano o en ciclo delicado con agua fría, usar detergente suave, no usar blanqueador, secar a la sombra tendido horizontalmente, planchar a temperatura media. Con estos cuidados, tus polos mantendrán forma, color y textura por muchas temporadas.",
  },
  {
    q: "¿Puedo devolver un polo si no me convence?",
    a: "Sí. Tienes 15 días desde la recepción para cambios o devoluciones, siempre que el producto esté sin usar, con etiquetas y en su empaque original. Creemos en prendas que se eligen con calma y se conservan con cariño.",
  },
  {
    q: "¿Hacen ediciones limitadas?",
    a: "Sí. Cada temporada lanzamos ediciones limitadas con variaciones en color, detalle o colaboración con artistas locales. Suscríbete a nuestro newsletter para acceder en preventa antes que el público general.",
  },
];
