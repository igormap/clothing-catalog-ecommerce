import { getProducts } from "@/services/api";
import { HeroSection } from "./components/Herosection";
import { ItemsSection } from "./components/ItemsSection";
import { ProductsFilter } from "./components/ProductsFilter";

export default async function Home({
  searchParams,
}: {
  searchParams?: { searchBy?: string; category?: string };
}) {
  const params = await searchParams;

  const products = await getProducts({
    searchBy: params?.searchBy || undefined,
    // category: searchParams?.category,
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
