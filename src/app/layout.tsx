import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

// Se você tiver alguma configuração de fonte, pode adicionar aqui

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        {/* outros elementos do head */}
      </head>
      <body>
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          strategy="afterInteractive"
          data-utmify-prevent-subids=""
          async
          defer
        />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guia Prático de Controle do Trips no Maracujá",
  description: "Domine o controle do trips no maracujá com técnicas validadas pela Embrapa. Aprenda o Manejo Integrado de Pragas (MIP) e aumente sua produtividade.",
  keywords: ["trips maracujá", "controle de pragas", "MIP", "Embrapa", "maracujá", "agricultura", "pragas do maracujazeiro"],
  authors: [{ name: "Especialista em Controle de Trips" }],
  openGraph: {
    title: "Guia Prático de Controle do Trips no Maracujá",
    description: "Aprenda a controlar o trips no maracujá com técnicas validadas pela Embrapa. Aumente sua produtividade!",
    url: "https://seusite.com",
    siteName: "Controle de Trips no Maracujá",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guia Prático de Controle do Trips no Maracujá",
    description: "Aprenda a controlar o trips no maracujá com técnicas validadas pela Embrapa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
        <Toaster />
      </body>
    </html>
  );
}


