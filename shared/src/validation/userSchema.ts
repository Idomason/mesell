import { z } from "zod";

export const AddressSchema = z.object({
  fullName: z.string().min(5, "Fullname must be longer than 5 characters"),
  address: z.string().min(5, "Address must be longer than 5 characters"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  isDefault: z.boolean(),
});

export const PaymentDetailSchema = z.object({
  type: z
    .string()
    .min(
      1,
      "Your bank Type. It could be one of: nuban, ghipss, mobile_money or basa",
    )
    .default("nuban"),
  name: z
    .string()
    .min(1, "The seller's name according to their account registration"),
  accountNumber: z.string().min(1, "Seller's bank account number is required"),
  bankCode: z.string().min(1, "Bank code is required"),
  currency: z.string().min(1, "Currency is required").default("NGN"),
});

export const CreateUserSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  passwordConfirm: z.string().min(1, "Please confirm your password"),
  firstName: z.string().min(1, "Please provide your first name").trim(),
  lastName: z.string().min(1, "Please provide your last name").trim(),
  phoneNumber: z.string().min(1, "Please provide your phone number").trim(),
  sellerAcctInfo: z
    .object({
      businessName: z.string().trim().min(1, "Business name is required"),
      businessAddress: z.string().trim().min(1, "Business address is required"),
      settlementBank: z.string().min(1, "Settlement bank is required"),
      percentageCharge: z
        .number()
        .min(0, "Percentage charge must be a positive number")
        .default(0),

      primaryContactEmail: z.string().email("Invalid email address"),
      primaryContactName: z.string().min(1, "Primary contact name is required"),
      primaryContactPhone: z
        .string()
        .min(1, "Primary contact phone is required"),

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
      subaccount: z.string(),
      paymentDetails: PaymentDetailSchema,
      bvn: z.string().optional(),
      idDocument: z.string().optional(),
      isVerified: z.boolean().default(false),
      rating: z.number().min(0).max(5).default(0),
      qualityCertification: z.string().trim().optional(),
      totalSales: z.number().default(0),
    })
    .optional(),
  sellerPending: z.boolean().default(false),
  role: z.enum(["buyer", "seller", "admin"]).default("buyer"),
  businessName: z.string().trim().optional(),
  points: z.number().optional(),
  addresses: z.array(AddressSchema).optional(),
  passwordChangedAt: z.date().optional(),
  passwordResetToken: z.string().optional(),
  passwordResetExpires: z.date().optional(),
});

// Type inference (used by both frontend and backend)
export type UserAddressInput = z.infer<typeof AddressSchema>;

export type PaymentDetailInput = z.infer<typeof PaymentDetailSchema>;

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export type CreateSellerAcctInput = z.infer<
  typeof CreateUserSchema.sellerAcctInfo
>;

// Validation
export const validateUser = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};
