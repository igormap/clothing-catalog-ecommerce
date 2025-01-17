"use client";

import { useCartStore } from "@/providers/counter-store-provider";
import Image from "next/image";

export function CartDetails() {
  const { products, updateQuantity, removeFromCart, totalValue } = useCartStore(
    (store) => store
  );

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-col w-full">
        <div className="w-full h-14 bg-rose-200 flex justify-between flex-auto p-4">
          <span>Produto</span>
          <span>Preço</span>
          <span>Quantidade</span>
          <span>Subtotal</span>
        </div>
        {products.map(({ product, quantity }) => (
          <div
            key={"product-cart-" + product.id}
            className="w-full bg-rose-200 flex justify-between flex-auto p-4"
          >
            <Image
              alt={product.name}
              src={product.image}
              width={105}
              height={105}
              objectFit="contain"
            />
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>
              <button
                onClick={() => updateQuantity(product, "decrement")}
                disabled={quantity === 1}
              >
                -
              </button>
              {quantity}
              <button onClick={() => updateQuantity(product, "increment")}>
                +
              </button>
            </span>
            <span>{quantity * product.price}</span>
            <button onClick={() => removeFromCart(product)}>Remover</button>
          </div>
        ))}
      </div>
      <div className="bg-rose-200 flex flex-col gap-8 p-6">
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
          <button className="border border-black rounded-xl p-4">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
