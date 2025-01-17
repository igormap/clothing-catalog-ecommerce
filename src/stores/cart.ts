import { Product } from "@/services/api";
import { createStore } from "zustand/vanilla";

export type CartState = {
  products: {
    quantity: number;
    product: Product;
  }[];
  totalItems: number;
  totalValue: number;
};

export type CartActions = {
  cleanCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  updateQuantity: (product: Product, action: "increment" | "decrement") => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore = (): CartState => {
  return { products: [], totalItems: 0, totalValue: 0 };
};

export const defaultInitState: CartState = {
  products: [],
  totalItems: 0,
  totalValue: 0,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    cleanCart: () => set({ products: [], totalItems: 0, totalValue: 0 }),
    addToCart: (product) =>
      set((state) => {
        const existingProductIndex = state.products.findIndex(
          (p) => p.product.id === product.id
        );

        let updatedProducts;

        if (existingProductIndex !== -1) {
          updatedProducts = state.products.map((p, index) =>
            index === existingProductIndex
              ? { ...p, quantity: p.quantity + 1 }
              : p
          );
        } else {
          updatedProducts = [...state.products, { quantity: 1, product }];
        }

        return {
          products: updatedProducts,
          totalItems: state.totalItems + 1,
          totalValue:
            state.totalValue + (product.promotional_price ?? product.price),
        };
      }),

    removeFromCart: (product) =>
      set((state) => {
        const productToRemove = state.products.find(
          (p) => p.product.id === product.id
        );

        if (!productToRemove) {
          return state;
        }

        const newProducts = state.products.filter(
          (p) => p.product.id !== product.id
        );

        const totalItems = state.totalItems - productToRemove.quantity;
        const totalValue =
          state.totalValue -
          productToRemove.quantity *
            (product.promotional_price ?? product.price);

        return {
          products: newProducts,
          totalItems,
          totalValue,
        };
      }),

    updateQuantity: (product, action) =>
      set((state) => {
        const productIndex = state.products.findIndex(
          (p) => p.product.id === product.id
        );

        if (productIndex === -1) {
          return state;
        }

        const currentProduct = state.products[productIndex];
        const newProducts = [...state.products];

        if (action === "increment") {
          newProducts[productIndex] = {
            ...currentProduct,
            quantity: currentProduct.quantity + 1,
          };
        } else if (action === "decrement") {
          if (currentProduct.quantity > 1) {
            newProducts[productIndex] = {
              ...currentProduct,
              quantity: currentProduct.quantity - 1,
            };
          } else {
            newProducts.splice(productIndex, 1);
          }
        }

        const totalItems = newProducts.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalValue = newProducts.reduce(
          (sum, item) => sum + item.quantity * item.product.price,
          0
        );

        return {
          products: newProducts,
          totalItems,
          totalValue,
        };
      }),
  }));
};
