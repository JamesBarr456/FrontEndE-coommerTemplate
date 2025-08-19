"use client";

import { useEffect, useState } from "react";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartWithBadge() {
  const [count, setCount] = useState(0);
  const { cartItems } = useCart();

  useEffect(() => {
    if (cartItems) {
      setCount(cartItems.items.length);
    } else {
      setCount(0);
    }
  }, [cartItems]);

  return (
    <>
      <ShoppingCart />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform  bg-orange-500 rounded-full min-w-[1.25rem] min-h-[1.25rem]">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </>
  );
}
