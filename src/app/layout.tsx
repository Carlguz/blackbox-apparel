import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLACKBOX APPAREL | Esenciales Premium",
  description: "Polos premium diseñados en Perú para potenciar tu estilo, confianza y fit diario.",
  keywords: ["BLACKBOX", "apparel", "polos premium", "moda masculina", "Perú"],
  authors: [{ name: "BLACKBOX APPAREL" }],
  openGraph: {
    title: "BLACKBOX APPAREL | Esenciales Premium",
    description: "Polos premium diseñados en Perú.",
    siteName: "BLACKBOX APPAREL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-[#f9f9f9] text-[#1a1c1c]`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
