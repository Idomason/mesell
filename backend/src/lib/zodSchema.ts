import { z } from "zod";

export const createSellerAcctSchema = z.object({
  business_name: z.string().trim().min(1, "Business name is required"),
  settlement_bank: z.string().min(1, "Settlement bank is required"),
  account_number: z.string().min(1, "Account number is required"),
  currency: z.string().min(1, "Currency is required").default("NGN"),
  percentage_charge: z
    .number()
    .min(0, "Percentage charge must be a positive number")
    .default(0),

  primary_contact_email: z.string().email("Invalid email address"),
  primary_contact_name: z.string().min(1, "Primary contact name is required"),
  primary_contact_phone: z.string().min(1, "Primary contact phone is required"),

  metadata: z
    .object({
      custom_fields: z.array(
        z.object({
          display_name: z.string().min(1, "Display name is required"),
          variable_name: z.string().min(1, "Variable name is required"),
          value: z.string().min(1, "Value is required"),
        }),
      ),
    })
    .optional(),
});

export const userSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  passwordConfirm: z.string().min(1, "Please confirm your password"),
  firstName: z.string().min(1, "Please provide your first name").trim(),
  lastName: z.string().min(1, "Please provide your last name").trim(),
  phoneNumber: z.string().min(1, "Please provide your phone number").trim(),
  role: z.enum(["buyer", "seller", "admin"]).default("buyer"),
  isVerified: z.boolean().default(false),
  bvn: z.string().optional(),
  idDocument: z.string().optional(),
  businessName: z.string().trim().optional(),
  businessAddress: z.string().trim().optional(),
  qualityCertification: z.string().trim().optional(),
  rating: z.number().min(0).max(5).default(0),
  totalSales: z.number().default(0),
});

export type UserSchema = z.infer<typeof userSchema>;

export type CreateSellerAcctSchema = z.infer<typeof createSellerAcctSchema>;

// Reusable validation helper
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};
