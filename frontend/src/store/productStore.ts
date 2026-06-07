import { create } from "zustand";
import { Product } from "@/Types/Products";
import { persist } from "zustand/middleware";
import { cartApi } from "@/app/api/cart";

interface CartState {
  products: Product[];
  addToCart: (item: Product) => Promise<void>;
  removeItemFromCart: (id: string | number) => Promise<void>;
  reduceItemQuantity: (id: string | number) => Promise<void>;
  removeAllCartItems: () => Promise<void>;
  getCartStats: () => { totalItems: number; totalPrice: number };
  loadCart: () => Promise<void>;
  syncCart: () => Promise<void>;
}

const normalizeItemForServer = (item: Product) => ({
  productId: item.id,
  quantity: item.quantity,
  priceAtAdd: item.price,
  images: item.images,
  heading: item.heading,
  color: item.color,
  size: item.size,
  price: item.price,
  name: item.name,
  description: item.description,
  totalSold: item.totalSold,
  isLive: item.isLive,
  seller: item.seller,
  category: item.category,
});

export const useProductStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],

      // Add To Cart
      addToCart: async (item: Product) => {
        set((state) => {
          const productExists = state.products.find(
            (cartItem) => cartItem._id.toString() === item._id.toString(),
          );

          if (productExists) {
            return {
              products: state.products.map((cartItem) =>
                cartItem._id.toString() === item._id.toString()
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem,
              ),
            };
          }

          return { products: [...state.products, { ...item }] };
        });
        await get().syncCart();
      },

      // Reduce Cart Item quantity
      reduceItemQuantity: async (_id: string | number) => {
        set((state) => ({
          products: state.products.map((cartItem) =>
            cartItem._id.toString() === _id.toString() && cartItem.quantity > 1
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          ),
        }));
        await get().syncCart();
      },

      // Remove from cart
      removeItemFromCart: async (_id: string | number) => {
        set((state) => ({
          products: state.products.filter(
            (cartItem) => cartItem._id.toString() !== _id.toString(),
          ),
        }));
        await get().syncCart();
      },

      // Remove all cart items
      removeAllCartItems: async () => {
        set(() => ({ products: [] }));
        await get().syncCart();
      },

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

      loadCart: async () => {
        try {
          const cart = await cartApi.getCart();
          if (Array.isArray(cart.items)) {
            set({
              products: cart.items.map((item: any) => ({
                ...item,
                id: item.productId ?? item._id,
                quantity: item.quantity,
              })),
            });
          }
        } catch (error) {
          console.error("Failed to load cart from server", error);
        }
      },

      syncCart: async () => {
        try {
          const { products } = get();
          const items = products.map(normalizeItemForServer);
          await cartApi.updateCart({ items });
        } catch (error) {
          console.error("Failed to sync cart with server", error);
          if ((error as any)?.response) {
            console.error(
              "Sync cart response:",
              (error as any).response.status,
              (error as any).response.data,
            );
          }
        }
      },
    }),
    { name: "messel-cart-storage" },
  ),
);
