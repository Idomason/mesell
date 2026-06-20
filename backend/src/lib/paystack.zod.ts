// lib/paystack.zod.ts
import { z } from "zod";

// ----- API Request schemas -----
export const InitPaymentSchema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
  orderId: z.string().min(1),
  productId: z.string().optional(),
  quantity: z.number().int().positive().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export type InitPaymentInput = z.infer<typeof InitPaymentSchema>;

// Paystack's expected request body (derived, but we can also define separately)
export const PaystackInitializeRequestSchema = z.object({
  email: z.string().email(),
  amount: z.number().int().positive(), // in kobo
  reference: z.string().min(1),
  callback_url: z.string().url().optional(),
  metadata: z.record(z.unknown()).optional(),
  channels: z.array(z.string()).optional(),
  idempotency_key: z.string().uuid().optional(),
});

// ----- API Response schemas -----
const PaystackBaseResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
});

export const PaystackInitializeResponseSchema =
  PaystackBaseResponseSchema.extend({
    data: z.object({
      authorization_url: z.string().url(),
      access_code: z.string(),
      reference: z.string(),
    }),
  });

export const PaystackVerifyResponseSchema = PaystackBaseResponseSchema.extend({
  data: z.object({
    id: z.number().int(),
    status: z.enum(["success", "failed", "abandoned"]),
    reference: z.string(),
    amount: z.number().int(),
    paid_at: z.string().datetime(),
    channel: z.string(),
    fees: z.number().int(),
    authorization: z
      .object({
        last4: z.string().optional(),
        brand: z.string().optional(),
      })
      .optional(),
    metadata: z.any(),
  }),
});

export type PaystackInitializeResponse = z.infer<
  typeof PaystackInitializeResponseSchema
>;
export type PaystackVerifyResponse = z.infer<
  typeof PaystackVerifyResponseSchema
>;

// ----- Reusable validation helper -----
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data); // throws ZodError if invalid
}
