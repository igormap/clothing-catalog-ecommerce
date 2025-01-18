"use client";

import { useCartStore } from "@/providers/counter-store-provider";
import { Product } from "@/services/api";

interface Props {
  product: Product;
}

export function ButtonAddToCart({ product }: Props) {
  const { addToCart } = useCartStore((store) => store);
  return (
    <button
      className="border border-black rounded-xl p-4 hover:bg-backgroundCart transition-all "
      onClick={() => addToCart(product)}
    >
      Adicionar ao carrinho
    </button>
  );
}
