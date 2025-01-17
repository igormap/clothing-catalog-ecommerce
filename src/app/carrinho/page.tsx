import { CartDetails } from "../components/CartDetails";

export default async function CartPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <CartDetails />
      {/* <h1 className="text-2xl font-bold text-gray-700">Carrinho de compras</h1> */}
    </div>
  );
}
