import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Puerto Norte — Herencia que se lleva puesto",
  description: "Polos premium inspirados en la identidad porteña. Elegancia versátil para el hincha que no se conforma con lo común. Para la reunión, la cena y el día a día.",
  keywords: ["polos premium", "moda masculina", "Puerto Norte", "herencia", "elegancia", "Perú", "Lima"],
  authors: [{ name: "Puerto Norte" }],
  openGraph: {
    title: "Puerto Norte — Herencia que se lleva puesto",
    description: "Polos premium inspirados en la identidad porteña. Elegancia versátil para el hincha que no se conforma con lo común.",
    siteName: "Puerto Norte",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puerto Norte — Herencia que se lleva puesto",
    description: "Polos premium inspirados en la identidad porteña.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
