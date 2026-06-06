import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  MONGODB_URI: z.string().min(1, "Database URL is required!"),
  MONGODB_PASSWORD: z.string().min(1, "Database password is required!"),
  MONGODB_USERNAME: z.string().min(1, "Database username is required!"),

  JWT_SECRET: z.string().min(1, "jwt secret is required"),
  PORT: z.coerce.number().default(5000),
  FRONTEND_URL: z.string().url().min(1, "Client side URL is required"),

  EMAIL_USERNAME: z.string().min(1, "Email username is required"),
  EMAIL_PASSWORD: z.string().min(1, "Email password is required"),
  EMAIL_HOST: z.string().min(1, "Email host is required"),
  EMAIL_PORT: z.string().min(1, "Email port is required"),

  PAYSTACK_SECRET_KEY: z.string().min(1, "Paystack secret key is required"),
  PAYSTACK_PUBLIC_KEY: z.string().min(1, "Paystack public key is required"),
  PAYSTACK_BASE_URL: z.string().url().min(1, "Paystack base URL is required"),
  PAYSTACK_TIMEOUT_MS: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default("10000"),
  PAYSTACK_RETRIES: z
    .string()
    .transform(Number)
    .pipe(z.number().int().min(0))
    .default("3"),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = function (): Env {
  const env = envSchema.safeParse(process.env);

  if (!env.success) {
    console.error(
      "Environment variable validation failed:",
      env.error.flatten().fieldErrors,
    );

    throw new Error("Invalid environment variables");
  }

  return env.data;
};

let cachedEnv: Env | null = null;

export const getEnv = function (): Env {
  if (!cachedEnv) {
    cachedEnv = loadEnv();
  }

  return cachedEnv;
};
