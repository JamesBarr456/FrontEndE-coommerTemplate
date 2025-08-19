import { Minus, Plus } from "lucide-react";

import { Button } from "../ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}
export const QuantitySelector = ({
  quantity,
  onDecrement,
  onIncrement,
}: QuantitySelectorProps) => {
  return (
    <div className="w-full border font-bold flex items-center justify-between gap-4 rounded-full  ">
      <Button
        onClick={onDecrement}
        variant="ghost"
        size="icon"
        className="rounded-full  h-8 w-8  transition-all mx-1"
      >
        <Minus size={20} />
      </Button>
      <span className="text-black/50">{quantity}</span>
      <Button
        onClick={onIncrement}
        variant="ghost"
        size="icon"
        className="rounded-full h-8 w-8 transition-all m-1"
      >
        <Plus size={20} />
      </Button>
    </div>
  );
};
