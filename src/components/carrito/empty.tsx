import { ShoppingBag } from "lucide-react";

export const EmptyCarrito = () => {
  return (
    <div className="h-64 flex flex-col justify-center items-center mx-auto gap-6">
      <ShoppingBag size={40} />
      <p className="font-bold text-lg">No hay productos agregados</p>
    </div>
  );
};
