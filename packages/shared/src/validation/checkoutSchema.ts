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

// What the frontend sends over the network
export const CheckoutPayloadSchema = z.object({
  deliveryAddress: z.object({
    street: z.string().trim().min(1),
    city: z.string().trim().min(1),
    state: z.string().trim().min(1),
    country: z.string().trim().min(1).default("Nigeria"),
    postalCode: z.string().trim().min(1),
  }),
  // Simple cart item declarations
  cartItems: z
    .array(
      z.object({
        productId: ObjectIdSchema,
        quantity: z.number().int().min(1),
      }),
    )
    .min(1, "Cart cannot be empty"),
});

export type CheckoutPayload = z.infer<typeof CheckoutPayloadSchema>;

// Validation
export const validateCheckout = <T>(schema: z.ZodSchema, data: unknown): T => {
  return schema.parse(data);
};
