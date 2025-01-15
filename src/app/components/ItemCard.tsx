"use client";

import { Product } from "@/services/api";
import Image from "next/image";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ItemCard({ product, onAddToCart }: Props) {
  return (
    <div className="w-72 h-[440px] flex flex-col bg-slate-200 relative group">
      <div className="w-full h-full flex items-center justify-center absolute z-50 bg-gray-700 bg-opacity-75 invisible group-hover:visible">
        <button
          className="w-52 h-12 opacity-100 bg-opacity-100 bg-white text-amber-800"
          onClick={() => onAddToCart(product)}
        >
          Adicionar ao carrinho
        </button>
      </div>
      {product.discount_percentage && (
        <div className="flex justify-center items-center absolute rounded-full bg-red-400 w-12 h-12 text-white top-4 right-4 z-40">
          <span>-{product.discount_percentage}%</span>
        </div>
      )}
      <div className="h-2/3 w-full relative">
        <Image alt={product.name} src={product.image} fill objectFit="cover" />
      </div>
      <div className="flex flex-col gap-2 px-4 py-4">
        <h3 className="h-1/3 text-2xl font-semibold text-gray-800">
          {product.name}
        </h3>
        <span className="text-base text-gray-500">{product.description}</span>
        <div className="flex gap-4 items-center">
          <span className="text-xl font-semibold text-gray-800">
            R$ {product.promotional_price || product.price}
          </span>
          {product.promotional_price && (
            <span className="text-sm text-gray-400 line-through">
              R$ {product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
