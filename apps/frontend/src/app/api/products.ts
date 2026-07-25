import { api } from "../../lib/api";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().positive("Price must be greater than zero"),
  preOrderPrice: z
    .number()
    .positive("Pre-order price must be greater than zero"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  stock: z.number().int().nonnegative("Stock must be zero or more"),
  totalSold: z.number().int().nonnegative("Total sold must be zero or more"),
  status: z.enum(["active", "inactive"]),
  images: z.array(z.string().url("Each image must be a valid URL")),
  seller: z.object({
    id: z.number().min(1, "Seller ID is required"),
    name: z.string().min(1, "Seller name is required"),
    verified: z.boolean(),
    isLive: z.boolean(),
  }),
  slug: z.string().min(1, "Slug is required"),
  specifications: z.record(z.string(), z.string()),
  estimatedDeliveryDate: z.date(),
  minimumOrders: z
    .number()
    .int()
    .positive("Minimum orders must be greater than zero"),
  currentOrders: z
    .number()
    .int()
    .nonnegative("Current orders must be zero or more"),
  currency: z.string().min(1, "Currency is required").default("NGN"),
  variants: z.array(
    z.object({
      name: z.string().min(1, "Variant name is required"),
      sku: z.string().min(1, "Variant SKU is required"),
      price: z.number().positive("Variant price must be greater than zero"),
      stock: z.number().int().nonnegative("Variant stock must be zero or more"),
    }),
  ),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  reviews: z.array(
    z.object({
      user: z.number().min(1, "User ID is required"),
      rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
      comment: z.string().min(1, "Comment is required"),
      isVerifiedPurchase: z.boolean(),
      createdAt: z.date(),
    }),
  ),
  liveStreamUrl: z
    .string()
    .url("Live stream URL must be a valid URL")
    .optional(),
  liveStreamScheduled: z.date().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response?.data?.data?.products;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData: Product): Promise<Product> => {
    const response = await api.post("/products", productData);
    return response.data;
  },

  updateProduct: async (
    id: string,
    updatedData: Partial<Product>,
  ): Promise<Product> => {
    const response = await api.patch(`/products/${id}`, updatedData);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
