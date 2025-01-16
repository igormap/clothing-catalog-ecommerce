import { normalizeString } from "@/utils";
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
  const searchBy = params?.searchBy ? normalizeString(params.searchBy) : "";
  const category = params?.category ? normalizeString(params?.category) : ""; // Normaliza a categoria para comparação

  return products.filter((product) => {
    const matchesSearch = normalizeString(product.name).includes(searchBy);
    const matchesCategory = category
      ? normalizeString(product.category) === category
      : true;

    // console.log(matchesCategory && product);

    return matchesSearch && matchesCategory; // Produto deve corresponder a ambos os filtros
  });
};

export const getProducts = async (params?: ListProductParams) => {
  const response: Product[] = (await api.get("/products")).data;

  const filteredProducts = filterProducts(response, params);
  return filteredProducts;
};
