import { getProducts } from "@/services/api";
import { HeroSection } from "./components/Herosection";
import { ItemsSection } from "./components/ItemsSection";
import { ProductsFilter } from "./components/ProductsFilter";

export default async function Home({
  searchParams,
}: {
  searchParams: { searchBy?: string; category?: string };
}) {
  const { searchBy, category } = await searchParams;

  const products = await getProducts({
    searchBy,
    category,
    // page: 1,
    // limit: 10,
  });

  return (
    <div className="w-full">
      <HeroSection />
      <div className="w-full flex justify-center ">
        <ProductsFilter />
      </div>
      <ItemsSection products={products} />
    </div>
  );
}
