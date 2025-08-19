"use client";

import { Button } from "../ui/button";
import { IProduct } from "@/interfaces/product";
import { QuantitySelector } from "../carrito/quantity";
import { SessionCheckModal } from "../others/session-check-modal";
import { ShoppingCart } from "lucide-react";
import { cx } from "class-variance-authority";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useQuantity } from "@/hooks/useQuantity";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  product: IProduct;
}

export const SizeSelector = ({ product }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const { addItemToCart } = useCart();
  const { decrement, increment, quantity } = useQuantity();
  const [sizeSelect, setSizeSelect] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();

  const handleSizeSelection = (size: number) => {
    setSizeSelect(size);
  };

  const handleAddToCartOrLogin = async () => {
    if (isAuthenticated) {
      if (user?._id) {
        try {
          const data = {
            userId: user._id,
            productId: product._id,
            quantity: quantity,
            size: sizeSelect,
          };

          await addItemToCart(data);

          toast({
            title: "¡Producto agregado al carrito! 🛒",
            description: `Se agregó ${quantity} ${
              quantity > 1 ? "unidades" : "unidad"
            } de ${product.name}`,
          });
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);

            toast({
              title: "Error",
              description: "No se pudo agregar el producto al carrito.",
              variant: "destructive",
            });
          }
        }
      } else {
        throw new Error("El usuario no tiene un ID válido.");
      }
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <p>Seleccionar talle argentino</p>
      <div className="flex flex-wrap gap-2">
        {product.size.map((size, i) => (
          <Button
            key={i}
            onClick={() => handleSizeSelection(size)}
            variant={"outline"}
            className={cx("w-12 h-12", {
              "bg-orange-500 text-white hover:brightness-90 hover:bg-orange-500 hover:text-white":
                size === sizeSelect,
            })}
          >
            {size}
          </Button>
        ))}
      </div>

      <div className="grid grid-col-1 lg:grid-cols-2 lg:items-center gap-6 ">
        <QuantitySelector
          quantity={quantity}
          onDecrement={decrement}
          onIncrement={increment}
        />
        <div className="py-3 bg-orange rounded-md hover:brightness-110">
          <Button
            onClick={handleAddToCartOrLogin}
            disabled={!sizeSelect || quantity === 0}
            className="bg-orange-500  p-7 rounded-xl hover:bg-orange-600 text-white transition-colors space-x-3 w-full"
          >
            <ShoppingCart size={22} />
            <p>Add to cart</p>
          </Button>
          <SessionCheckModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
      </div>
    </>
  );
};
