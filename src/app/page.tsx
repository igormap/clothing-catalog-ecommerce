import { getProducts } from "@/services/api";
import { HeroSection } from "./components/Herosection";
import { ItemsSection } from "./components/ItemsSection";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="w-full">
      <HeroSection />
      <ItemsSection products={products} />
    </div>
  );
}
