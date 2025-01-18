import { getProducts, ListProductParams } from "@/services/api";
import { HeroSection } from "./components/Herosection";
import { ItemsSection } from "./components/ItemsSection";
import { ProductsFilter } from "./components/ProductsFilter";
import { Pagination } from "./components/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    searchBy?: string;
    category?: string;
    page?: string;
    pageSize?: string;
  };
}) {
  const { searchBy, category, page, pageSize } = await searchParams;

  async function listProducts(params?: ListProductParams) {
    return await getProducts(params);
  }

  const { products, total } = await listProducts({
    searchBy,
    category,
    page: Number(page || 1),
    pageSize: Number(pageSize || 6),
  });

  return (
    <div className="w-full pb-10">
      <HeroSection />
      <div className="w-full flex flex-col gap-4 justify-center py-6 mb-6 bg-backgroundCart md:flex-row">
        <ProductsFilter />
        <Pagination
          page={Number(page || 1)}
          pageSize={Number(pageSize || 6)}
          productCount={total}
        />
      </div>
      <ItemsSection products={products} />
    </div>
  );
}
