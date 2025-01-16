import axios from "axios";

export interface Product {
  id: string;
  name: string;
  category: string;
  discount_percentage?: number;
  promotional_price?: number;
  price: number;
  image: string;
  description: string;
}

export interface ListProductParams {
  searchBy?: string;
  category?: string;
  page?: number;
  limit?: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use variáveis de ambiente para segurança.
});

const filterProducts = (
  products: Product[],
  params?: ListProductParams
): Product[] => {
  const normalizeString = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const searchBy = params?.searchBy ? normalizeString(params.searchBy) : "";

  return products.filter((product) =>
    normalizeString(product.name).includes(searchBy)
  );
};

export const getProducts = async (params?: ListProductParams) => {
  const response: Product[] = (await api.get("/products")).data;

  const filteredProducts = filterProducts(response, params);
  return filteredProducts;
};
