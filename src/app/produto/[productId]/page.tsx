import { getProductById } from "@/services/api";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  return (
    <div>
      <h1>Produto</h1>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}
