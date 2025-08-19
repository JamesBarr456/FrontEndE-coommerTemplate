"use client";

import { EmptyCarrito } from "./empty";
import { ItemCarrito } from "./item-carrito";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { SheetClose } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { updateDiscountPromo } from "@/services/cart";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export const Carrito = () => {
  const { user } = useAuth();
  const { cartItems, removeItemFromCart, updateItemInCart } = useCart();

  useEffect(() => {
    if (cartItems && cartItems.items.length === 0) {
      updateDiscountPromo(cartItems?._id, 0);
    }
  }, [cartItems]);

  if (!cartItems || (cartItems && cartItems.items.length === 0)) {
    return <EmptyCarrito />;
  }

  const price_total = cartItems?.items.reduce((acc, item) => {
    return acc + item.total_mount;
  }, 0);

  if (!user) throw new Error("El usuario no existe, vuelva a loguearse");

  return (
    <div className="h-[90%] space-y-8 font-poppins">
      <ScrollArea className="h-4/5 w-full">
        <ul>
          {cartItems?.items.map((item, i) => (
            <li key={i}>
              <ItemCarrito
                item={item}
                userId={user._id}
                handleTrash={removeItemFromCart}
                handleUpdate={updateItemInCart}
              />
            </li>
          ))}

          <Separator className="my-1" />
        </ul>
      </ScrollArea>

      <div className="flex justify-between w-full">
        <p className="font-bold text-2xl">Total</p>
        <p className="font-bold text-2xl">${price_total?.toLocaleString()}</p>
      </div>
      <SheetClose asChild>
        <Link
          href="/cart"
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "h-10 px-4 py-2 w-full"
          )}
        >
          Finalizar Compra
        </Link>
      </SheetClose>
    </div>
  );
};
