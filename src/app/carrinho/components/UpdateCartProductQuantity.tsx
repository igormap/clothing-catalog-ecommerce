import { Minus, Plus } from "lucide-react";

interface Props {
  onMinus: () => void;
  onPlus: () => void;
  quantity: number;
}

export function UpdateCartProductQuantity({
  onMinus,
  onPlus,
  quantity,
}: Props) {
  return (
    <div className="flex items-center">
      <button
        onClick={onMinus}
        className="border border-black p-2 w-8 h-8 flex items-center justify-center rounded-s disabled:cursor-not-allowed"
        disabled={quantity === 1}
      >
        <Minus />
      </button>
      <div className="border border-black p-2 w-8 h-8 flex items-center justify-center border-l-0 border-r-0">
        {quantity}
      </div>
      <button
        onClick={onPlus}
        className="border border-black p-2 w-8 h-8 flex items-center justify-center rounded-e"
      >
        <Plus />
      </button>
    </div>
  );
}
