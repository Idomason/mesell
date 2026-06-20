import { Types } from "mongoose";
import { z } from "zod";

// Validate & transform mongoose IDs
const ObjectIdSchema = z
  .string({ required_error: "ID must be string" })
  .length(24, "ID must be exactly 24 characters")
  .transform((val: string, ctx: z.RefinementCtx) => {
    if (!Types.ObjectId.isValid(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid ObjectId format",
      });
      return z.NEVER;
    }

    return Types.ObjectId.createFromHexString(val);
  });

export const OrderItemSchema = z.object({
  productId: ObjectIdSchema,
  sellerId: ObjectIdSchema,
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
  payoutAmount: z.number().min(0),
  payoutStatus: z.enum(["paid", "held", "failed"]).default("held"),
  deliveryStatus: z
    .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
    .default("pending"),
  refundStatus: z
    .enum(["pending", "requested", "refunded", "rejected"])
    .default("pending"),
  refundedAmount: z.number().min(0).optional(),
  deliveryAddress: z.object({
    street: z.string().trim().min(1),
    city: z.string().trim().min(1),
    state: z.string().trim().min(1),
    country: z.string().trim().min(1).default("Nigeria"),
    postalCode: z.string().trim().min(1),
  }),
});

export const CreateOrderSchema = z.object({
  buyerId: ObjectIdSchema,
  items: z.array(OrderItemSchema),
  email: z.string().email().trim().min(1),
  isGuest: z.boolean().default(true),
  guestClaimToken: z.string().optional(),
  guestClaimTokenExpiry: z
    .string()
    .datetime()
    .transform((s: string) => new Date(s))
    .optional(),
  totalAmount: z.number(),
  paymentStatus: z
    .enum(["pending", "paid", "refunded", "released"])
    .default("pending"),
  paymentMethod: z.enum(["card", "ussd", "pos"]).optional(),
  paymentReference: z.string().optional(),
  deliveryStatus: z
    .enum(["pending", "processing", "shipped", "delivered", "cancelled"])
    .default("pending"),
  trackingNumber: z.string().optional(),
  deliveryProvider: z.enum(["max", "gig"]).optional(),
  deliveryAddress: z
    .object({
      street: z.string().trim().min(1),
      city: z.string().trim().min(1),
      state: z.string().trim().min(1),
      country: z.string().trim().min(1),
      postalCode: z.string().trim().min(1),
    })
    .optional(),
  deliveryConfirmation: z
    .object({
      confirmedBy: ObjectIdSchema,
      confirmedAt: z
        .string()
        .datetime()
        .transform((s: string) => new Date(s)),
      images: z.array(z.string().url()),
    })
    .optional(),
  dispute: z
    .object({
      status: z.enum(["open", "resolved", "closed"]),
      reason: z.string().trim().min(1),
      description: z.string().trim().min(1),
      openedBy: ObjectIdSchema,
      openedAt: z
        .string()
        .datetime()
        .transform((s: string) => new Date(s)),
      resolvedAt: z
        .string()
        .datetime()
        .transform((s: string) => new Date(s))
        .optional(),
      resolution: z.string().trim().min(1).optional(),
    })
    .optional(),
});

export type OrderItemInput = z.infer<typeof OrderItemSchema>;

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

// Validation
export const validateOrder = <T>(schema: z.ZodSchema, data: unknown): T => {
  return schema.parse(data);
};
