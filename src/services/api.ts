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

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use variáveis de ambiente para segurança.
});

export const getProducts = async () => {
  const response: Product[] = (await api.get("/products")).data;
  return response;
};
