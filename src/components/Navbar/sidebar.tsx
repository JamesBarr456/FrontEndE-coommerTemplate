import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import Link from "next/link";
import { Logo } from "../logo/logo";
import { Menu } from "lucide-react";

export const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full md:hidden">
          <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="md:hidden bg-white">
        <SheetTitle>
          <Logo />
        </SheetTitle>
        <SheetDescription />
        <div className="grid space-y-6 mt-7 p-4">
          <SheetClose asChild>
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Home
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              Productos
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
