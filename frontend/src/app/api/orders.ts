import { api } from "../../lib/api";
import { boolean, z } from "zod";

const CartItemSchema = z.object({
  product: z.union([z.string(), z.number()]),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive("Quantity must be greater than zero"),
  seller: z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string().min(1, "Seller name is required"),
    verified: z.boolean(),
    isLive: z.boolean(),
  }),
  totalPrice: z.number().nonnegative(),
  deliveryAddress: z.object({
    street: z.string().min(1, "Delivery address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
  }),
});

const CreateOrderSchema = z.array(CartItemSchema);

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

export const orderApi = {
  createOrder: async (orderData: CreateOrderInput) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },

  getSingleOrder: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  updateOrder: async (orderId: string, newOrderData: CreateOrderInput) => {
    const response = await api.patch(`/orders/${orderId}`, newOrderData);
    return response.data;
  },

  deleteOrder: async (orderId: string) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },
};
