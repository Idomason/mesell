import { create } from "zustand";
import { Product } from "@/Types/Products";
import { persist } from "zustand/middleware";

interface CartState {
  products: Product[];
  addToCart: (item: Product) => void;
  removeItemFromCart: (id: number) => void;
  reduceItemQuantity: (id: number) => void;
  removeAllCartItems: () => void;
  getCartStats: () => { totalItems: number; totalPrice: number };
}

export const useProductStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],

      // Add To Cart
      addToCart: (item: Product) =>
        set((state) => {
          const productExists = state.products.find(
            (cartItem) => cartItem.id === item.id,
          );

          if (productExists) {
            return {
              products: state.products.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          }

          return { products: [...state.products, { ...item }] };
        }),

      // Reduce Cart Item quantity
      reduceItemQuantity: (id: number) =>
        set((state) => ({
          products: state.products.map((cartItem) =>
            cartItem.id === id && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          ),
        })),

      // Remove from cart
      removeItemFromCart: (id: number) =>
        set((state) => ({
          products: state.products.filter((cartItem) => cartItem.id !== id),
        })),

      // Remove all cart items
      removeAllCartItems: () => set((state) => ({ products: [] })),

      // Cart Stats
      getCartStats: () => {
        const { products } = get();
        return {
          totalItems: products.length,
          totalPrice: products.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ),
        };
      },
    }),
    { name: "messel-cart-storage" },
  ),
);
