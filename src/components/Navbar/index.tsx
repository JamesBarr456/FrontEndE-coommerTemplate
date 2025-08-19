import { IconCart } from "./cart-button";
import Link from "next/link";
import { Logo } from "../logo/logo";
import { Sidebar } from "./sidebar";
import { UserButton } from "./user-button";

const links = [
  {
    url: "inicio",
    path: "/",
  },
  {
    url: "productos",
    path: "/products",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white font-poppins">
      <div className="container mx-auto flex h-16 w-full items-center justify-between px-5">
        <Sidebar />

        <Link href={"/"}>
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 capitalize md:text-lg"
              prefetch={false}
            >
              {link.url}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <UserButton />
          <IconCart />
        </div>
      </div>
    </header>
  );
}
