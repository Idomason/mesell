import { api } from "../../lib/api";

export const cartApi = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  updateCart: async (cartData: { items: any[]; coupon?: any }) => {
    const response = await api.post("/cart", cartData);
    return response.data;
  },

  mergeCart: async (items: any[]) => {
    const response = await api.post("/cart/merge", { items });
    return response.data;
  },

  deleteCartItem: async (itemId: string) => {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
  },
};
