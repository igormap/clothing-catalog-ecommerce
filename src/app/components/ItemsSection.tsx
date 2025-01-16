"use client";

import { Product } from "@/services/api";
import { ItemCard } from "./ItemCard";

interface Props {
  products: Product[];
}

export function ItemsSection({ products }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-32">
      {products.map((product) => {
        return (
          <ItemCard
            key={product.id}
            product={product}
            onAddToCart={(product) => console.log(product)}
          />
        );
      })}
    </div>
  );
}
