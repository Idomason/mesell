import { z } from "zod";

const defaultBackendUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const defaultFrontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

export const EnvSchema = z.object({
  PORT: z.string().min(1, "Client PORT is required").default("3000"),
  BACKEND_URL: z
    .string()
    .url()
    .min(1, "Backend URL is required")
    .default(defaultBackendUrl),
  FRONTEND_URL: z
    .string()
    .url()
    .min(1, "Frontend URL is required")
    .default(defaultFrontendUrl),
});

export type FrontendEnv = z.infer<typeof EnvSchema>;

const loadEnv = function (): FrontendEnv {
  const env = EnvSchema.safeParse(process.env);

  if (!env.success) {
    console.log(
      `Environment variable validation failed:`,
      env.error.flatten().fieldErrors,
    );

    throw new Error("Invalid environment variables");
  }

  return env.data;
};

let cachedEnv: FrontendEnv | null = null;

export const getFrontendEnv = function () {
  if (!cachedEnv) cachedEnv = loadEnv();

  return cachedEnv;
};
