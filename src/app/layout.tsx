import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import Navbar from "../components/navbar/index";
import { Poppins } from "@next/font/google";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tails - Ecommerce",
  description: "Ecommerce de venta de zapatillas importadas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
