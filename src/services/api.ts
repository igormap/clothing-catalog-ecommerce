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
  pageSize?: number;
}

interface ProductResponse {
  products: Product[];
  total: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use variáveis de ambiente para segurança.
});

const filterProducts = (
  products: Product[],
  params?: ListProductParams
): ProductResponse => {
  const searchBy = params?.searchBy ? normalizeString(params.searchBy) : "";
  const category = params?.category ? normalizeString(params?.category) : ""; // Normaliza a categoria para comparação
  const page = params?.page || 1; // Página atual (1 por padrão)
  const pageSize = params?.pageSize || 6; // Tamanho da página (10 por padrão)

  // Filtra os produtos
  const filteredProducts = products.filter((product) => {
    const matchesSearch = normalizeString(product.name).includes(searchBy);
    const matchesCategory = category
      ? normalizeString(product.category) === category
      : true;

    return matchesSearch && matchesCategory; // Produto deve corresponder a ambos os filtros
  });

  // Aplica a paginação
  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
  };
};

export const getProducts = async (
  params?: ListProductParams
): Promise<ProductResponse> => {
  const response: Product[] = (await api.get("/products")).data;

  const filteredProducts = filterProducts(response, params);
  return {
    products: filteredProducts.products,
    total: filteredProducts.total,
  };
};

export const getProductById = async (id: string) => {
  const response: Product[] = (await api.get(`/products`)).data;
  const product = response.find((product) => product.id === id);
  return product;
};
