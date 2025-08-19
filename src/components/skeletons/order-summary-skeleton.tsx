import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag } from "lucide-react";

export default function OrderSummarySkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <ItemOrderSummarySkeleton key={index} />
        ))}
      </div>
      <div className="mt-4 pt-4 border-t space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <Label htmlFor="codigoDescuento">Código de Descuento</Label>
        <div className="flex gap-2">
          <Input
            id="codigoDescuento"
            placeholder="Ingresa tu código"
            disabled
          />
          <Button disabled>Aplicar</Button>
        </div>
        <p className="text-sm flex items-center gap-4 text-center text-muted-foreground">
          <Tag className="h-12 w-12" />
          Si tienes un código de descuento, aplícalo antes de completar tu
          compra para aprovechar el ahorro.
        </p>
      </div>
    </div>
  );
}

function ItemOrderSummarySkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-16 w-16 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
