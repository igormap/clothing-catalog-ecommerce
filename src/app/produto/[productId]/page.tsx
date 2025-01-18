import { getProductById } from "@/services/api";
import Image from "next/image";
import { ButtonAddToCart } from "../components/ButtonAddToCart";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">
          Produto não encontrado.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-8 px-52 py-10">
      <div className="w-1/2 h-[500px] relative rounded">
        <Image
          objectFit="cover"
          alt={product?.name ?? "Produto"}
          src={product?.image ?? ""}
          fill
        />
      </div>
      <div className="w-1/2 flex flex-col items-start gap-8 h-[500px]">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-4xl">{product?.name}</h1>
          <p className="text-2xl text-gray-500">R$ {product?.price}</p>
          <p className="text-sm">{product?.description}</p>
        </div>
        <ButtonAddToCart product={product} />
      </div>
    </div>
  );
}
