"use client";

import { useCartStore } from "@/providers/counter-store-provider";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { UpdateCartProductQuantity } from "./UpdateCartProductQuantity";

export function CartDetails() {
  const { products, updateQuantity, removeFromCart, totalValue, totalItems } =
    useCartStore((store) => store);

  if (totalItems === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Carrinho vazio.</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-start  gap-4 w-screen px-6 lg:flex-row">
      <div className="flex flex-col w-full max-w-screen-md overflow-auto">
        <div className="w-full h-14 bg-backgroundCart grid grid-cols-4 p-4 justify-start">
          <span>Produto</span>
          <span>Preço</span>
          <span>Quantidade</span>
          <span>Subtotal</span>
        </div>
        {products.map(({ product, quantity }) => (
          <div
            key={"product-cart-" + product.id}
            className="w-full flex justify-between items-start  flex-auto p-4 mt-6"
          >
            <Image
              alt={product.name}
              src={product.image}
              width={105}
              height={105}
              objectFit="contain"
              className="rounded-lg h-[105px] w-[105px]"
            />
            <span className="text-secondary">{product.name}</span>
            <span className="text-secondary">
              {product.promotional_price ?? product.price}
            </span>
            <UpdateCartProductQuantity
              onMinus={() => updateQuantity(product, "decrement")}
              onPlus={() => updateQuantity(product, "increment")}
              quantity={quantity}
            />
            <span>
              {quantity * (product.promotional_price ?? product.price)}
            </span>
            <button onClick={() => removeFromCart(product)}>
              <Trash2 className="hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-backgroundCart flex flex-col gap-8 px-8 py-6 max-w-[470px] w-full pb-12">
        <h2 className="font-semibold text-3xl text-black">Total do carrinho</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>R$ {totalValue}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span>R$ {totalValue}</span>
          </div>
          <button className="border border-black rounded-xl p-3">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
