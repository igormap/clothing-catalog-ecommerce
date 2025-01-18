import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { CounterStoreProvider } from "@/providers/counter-store-provider";
import { Footer } from "./components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo de roupas",
  description: "Ecommerce de roupas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <CounterStoreProvider>
        <body className={`${poppins.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </CounterStoreProvider>
    </html>
  );
}
