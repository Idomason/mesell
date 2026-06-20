import { api } from "../../lib/api";
import { z } from "zod";
import { CheckoutPayload } from "mesell-shared";

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

const deliveryAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

const orderItemSchema = z.object({
  product: z.string(), // ObjectId as string
  seller: z.string(), // ObjectId as string
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
  deliveryStatus: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  refundStatus: z.enum(["pending", "requested", "refunded", "rejected"]),
  refundedAmount: z.number().optional(),
  deliveryAddress: deliveryAddressSchema,
});

const deliveryConfirmationSchema = z.object({
  confirmedBy: z.string(), // ObjectId as string
  confirmedAt: z.coerce.date(),
  images: z.array(z.string()).optional(),
});

const disputeSchema = z.object({
  status: z.enum(["open", "resolved", "closed"]),
  reason: z.string(),
  description: z.string(),
  openedBy: z.string(), // ObjectId as string
  openedAt: z.coerce.date(),
  resolvedAt: z.coerce.date().optional(),
  resolution: z.string().optional(),
});

export const OrderSchema = z.object({
  _id: z.string(), // ObjectId as string
  buyer: z.string(), // ObjectId as string
  items: z.array(orderItemSchema),
  seller: z.string().optional(), // ObjectId as string
  product: z.string().optional(), // ObjectId as string
  quantity: z.number().optional(),
  totalAmount: z.number(),
  paymentStatus: z.enum(["pending", "paid", "refunded", "released"]),
  paymentMethod: z.enum(["card", "ussd", "pos"]).optional(),
  status: z.enum(["processing", "shipped", "delivered"]).default("processing"),
  paymentReference: z.string().optional(),
  escrowId: z.string().optional(),
  payoutAmount: z.number(), // Note: Number in interface, likely should be number
  payoutStatus: z.literal("held"),
  deliveryStatus: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  trackingNumber: z.string().optional(),
  deliveryProvider: z.enum(["max", "gig"]).optional(),
  deliveryAddress: deliveryAddressSchema.optional(),
  deliveryConfirmation: deliveryConfirmationSchema.optional(),
  dispute: disputeSchema.optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const CreateOrderSchema = z.array(CartItemSchema);

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

export type OrderSchemaProp = z.infer<typeof OrderSchema>;

export const orderApi = {
  createOrder: async (orderData: CheckoutPayload) => {
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

  getAllUserOrders: async () => {
    const response = await api.get("/orders/user-orders");
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
