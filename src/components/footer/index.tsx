import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { Logo } from "../logo/logo";
import credit_cards from "@/assets/credit-cards.json";

export default function Footer() {
  const { basePath, cards } = credit_cards;

  return (
    <footer className="py-8 md:py-12 border-t border-gray-200 font-poppins">
      <div className="container mx-auto max-w-7xl grid grid-cols-1  justify-items-center md:grid-cols-5 gap-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Navigation Links */}
        <div className="grid gap-2 w-full text-center md:text-left">
          <h4 className="text-lg font-semibold">Páginas</h4>
          <Link href="/" className="text-muted-foreground hover:underline">
            Inicio
          </Link>
          <Link
            href="/products"
            className="text-muted-foreground hover:underline"
          >
            Productos
          </Link>
        </div>

        {/* Contact Information */}
        <div className="grid gap-2 w-full text-center md:text-left">
          <h4 className="text-lg font-semibold">Contacto</h4>
          <p className="text-muted-foreground">Teléfono: +54-3704-441861</p>
          <p className="text-muted-foreground">Email: info@stayls.com</p>
          <p className="text-muted-foreground">
            Dirección: La Rioja 1500, Corrientes - Capital
          </p>
        </div>

        {/* Payment Methods */}
        <div className="grid gap-2 w-full text-center md:text-left">
          <h4 className="text-lg font-semibold">Medios de Pago</h4>
          <div className="grid grid-cols-4 gap-2 justify-items-center md:justify-items-start">
            {cards.map(({ filename, name }) => (
              <Image
                key={filename}
                width={36}
                height={22}
                style={{ height: "auto", width: "auto" }}
                alt={name}
                src={`${basePath}${filename}`}
              />
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="grid gap-2 text-center md:text-left">
          <h4 className="text-lg font-semibold">Redes Sociales</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto max-w-7xl mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>&copy; 2024 tails Inc. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="#" className="hover:underline">
            Términos de Servicio
          </Link>
          <Link href="#" className="hover:underline">
            Política de Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
