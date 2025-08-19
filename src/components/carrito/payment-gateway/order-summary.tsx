"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EmptyCarrito } from "../empty";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { updateDiscountPromo } from "@/services/cart";
import { useCart } from "@/context/CartContext";

export const OrderSummary = () => {
  const { cartItems } = useCart();
  const [porcentajeDescuento, setPorcentajeDescuento] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (cartItems && cartItems.promoCodeDiscount) {
      setPorcentajeDescuento(cartItems.promoCodeDiscount);
    }
  }, [cartItems]);

  const empty = !cartItems || cartItems.items.length === 0;

  if (empty) return <EmptySummary />;

  const sub_total = cartItems?.total_amount;

  const descuento = porcentajeDescuento
    ? (sub_total * porcentajeDescuento) / 100
    : 0;

  const total = sub_total - descuento;

  const aplicarDescuento = async (codigo: string) => {
    try {
      if (codigo === "DESCUENTO10") {
        const discountPercentage = 10;
        await updateDiscountPromo(cartItems._id, discountPercentage);
        setPorcentajeDescuento(discountPercentage);
        toast({
          title: "Descuento aplicado",
          description: "Se ha aplicado un 10% de descuento.",
        });
      } else {
        toast({
          title: "Código inválido",
          description: "El código de descuento no es válido.",
          variant: "destructive",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Resumen de la Orden</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40 w-full space-y-4">
            {cartItems.items.map(
              ({ name, quantity, total_mount, size, _id, image }) => (
                <ItemOrderSummary
                  key={_id}
                  image={image}
                  name={name}
                  quantity={quantity}
                  total_mount={total_mount}
                  size={size}
                />
              )
            )}
          </ScrollArea>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${sub_total.toFixed(2)}</span>
            </div>
            {porcentajeDescuento !== null && (
              <div className="flex justify-between text-green-600">
                <span>Descuento ({porcentajeDescuento}%):</span>
                <span>-${descuento.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          {porcentajeDescuento === null && (
            <div className="mt-4 space-y-4">
              <Label htmlFor="codigoDescuento">Código de Descuento</Label>
              <div className="flex gap-2">
                <Input id="codigoDescuento" placeholder="Ingresa tu código" />
                <Button
                  onClick={() =>
                    aplicarDescuento(
                      (
                        document.getElementById(
                          "codigoDescuento"
                        ) as HTMLInputElement
                      ).value
                    )
                  }
                >
                  Aplicar
                </Button>
              </div>
              <p className="text-sm flex items-center gap-4 text-center">
                <Tag className="h-12 w-12" />
                Si tienes un código de descuento, aplícalo antes de completar tu
                compra para aprovechar el ahorro.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
interface Props {
  name: string;
  image: string;
  quantity: number;
  total_mount: number;
  size: number;
}
const ItemOrderSummary = ({
  name,
  image,
  quantity,
  total_mount,
  size,
}: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={image}
        alt={name}
        width={50}
        height={50}
        className="rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">Size: {size}</p>
        <p className="text-sm text-gray-500">Cantidad: {quantity}</p>
      </div>
      <p className="font-semibold">${total_mount.toFixed(2)}</p>
    </div>
  );
};

const EmptySummary = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Resumen de la Orden</CardTitle>
      </CardHeader>
      <CardContent>
        <EmptyCarrito />
      </CardContent>
    </Card>
  );
};
