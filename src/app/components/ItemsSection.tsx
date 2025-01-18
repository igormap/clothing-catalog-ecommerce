"use client";

import { Product } from "@/services/api";
import { ItemCard } from "./ItemCard";
import { useCartStore } from "@/providers/counter-store-provider";

interface Props {
  products: Product[];
}

export function ItemsSection({ products }: Props) {
  const { addToCart } = useCartStore((state) => state);

  return (
    <div className="flex flex-wrap justify-center gap-32">
      {products.map((product) => {
        return (
          <ItemCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        );
      })}
    </div>
  );
}
