import { z } from "zod";

export const EnvSchema = z.object({
  PORT: z.string().min(1, "Client PORT is required").default("3000"),
  BACKEND_URL: z
    .string()
    .min(1, "Backend URL is required")
    .default("http://localhost:5000"),
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
