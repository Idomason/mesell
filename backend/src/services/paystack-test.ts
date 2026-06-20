// services/paystack.service.ts
import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import { randomUUID } from "crypto";
import { AppError } from "../middleware/errorHandler";
import logger from "../utils/logger";
import {
  InitPaymentSchema,
  PaystackInitializeResponseSchema,
  PaystackVerifyResponseSchema,
  validate,
  type InitPaymentInput,
} from "../lib/paystack.zod";
import { Env, getEnv } from "@/lib/env";

const env = getEnv();

export class PaystackService {
  private readonly client: AxiosInstance;
  private readonly backendUrl: string;

  private constructor(env: Env) {
    this.backendUrl = env.BACKEND_URL;
    this.client = axios.create({
      baseURL: env.PAYSTACK_BASE_URL,
      timeout: env.PAYSTACK_TIMEOUT_MS,
      headers: {
        Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    axiosRetry(this.client, {
      retries: env.PAYSTACK_RETRIES,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response?.status !== undefined && error.response.status >= 500),
    });
  }

  // Factory: validates environment variables once at startup.
  public static create(): PaystackService {
    return new PaystackService(env);
  }

  // Initialize a payment with Zod‑validated input.
  async initializePayment(
    params: InitPaymentInput,
  ): Promise<{ authorizationUrl: string; reference: string }> {
    // 1. Validate input using Zod
    const validated = validate(InitPaymentSchema, params);

    // 2. Build request payload
    const reference = this.generateReference("PAY", validated.orderId);
    const requestPayload = {
      email: validated.email,
      amount: Math.round(validated.amount * 100), // Paystack expects amount in kobo
      reference,
      currency: "NGN",
      callback_url: `${this.backendUrl}/api/v1/payments/verify`,
      metadata: {
        orderId: validated.orderId,
        productId: validated.productId,
        quantity: validated.quantity,
        ...validated.metadata,
        expected_delivery_days: 14,
        escrow_status: "held",
      },
      idempotency_key: randomUUID(),
    };

    try {
      logger.info("Initializing Paystack payment", {
        reference,
        orderId: validated.orderId,
      });
      const { data } = await this.client.post(
        "/transaction/initialize",
        requestPayload,
      );

      // 3. Validate and type the response
      const parsed = validate(PaystackInitializeResponseSchema, data);
      if (!parsed.status) {
        throw new AppError(
          parsed.message || "Payment initialisation failed",
          400,
        );
      }

      return {
        authorizationUrl: parsed.data.authorization_url,
        reference: parsed.data.reference,
      };
    } catch (error) {
      this.handleError(error, "initializePayment");
    }
  }

  // Verify payment – response is validated with Zod.

  async verifyPayment(reference: string): Promise<{
    status: boolean;
    amountInNaira: number;
    metadata: Record<string, unknown>;
    authorization: Record<string, unknown>;
  }> {
    if (!reference) throw new AppError("Payment reference is required", 400);

    try {
      logger.info("Verifying Paystack payment", { reference });
      const { data } = await this.client.get(
        `/transaction/verify/${reference}`,
      );
      const parsed = validate(PaystackVerifyResponseSchema, data);

      if (!parsed.status) {
        throw new AppError(
          parsed.message || "Payment verification API error",
          400,
        );
      }

      const isSuccess = parsed.data.status === "success";
      return {
        status: isSuccess,
        amountInNaira: parsed.data.amount / 100,
        metadata: {
          transactionId: parsed.data.id, // Paystack's internal ID
          channel: parsed.data.channel,
          cardLast4: parsed.data.authorization?.last4,
          cardBrand: parsed.data.authorization?.brand,
          fees: parsed.data.fees,
          paid: parsed.data.paid_at,
        },
        authorization: {
          cardLast4: parsed.data.authorization?.last4,
          cardBrand: parsed.data.authorization?.brand,
        },
      };
    } catch (error) {
      this.handleError(error, "verifyPayment");
    }
  }

  // Release Payment
  async releasePayment(paymentDetails: {
    source: string;
    amount: number;
    recipient: string;
    reference: string;
    currency: string;
    reason: string;
    sellerId: string;
  }): Promise<{}> {
    if (!paymentDetails.amount || !paymentDetails.currency) {
      throw new AppError("Amount and currency is required", 400);
    }

    try {
      logger.info(`Releasing funds to the seller: ${paymentDetails.sellerId}`);
      const { data } = await this.client.post("/transfer", paymentDetails);

      return data;
    } catch (error) {
      this.handleError(error, "releasePayment");
    }
  }

  // Create Transferrecipient
  async createTransferRecipient(sellerPaymentData) {
    if (!sellerPaymentData.name || !sellerPaymentData.accountNumber) {
      throw new AppError("Seller's payment detail is not complete", 400);
    }

    const { data } = await this.client.post(
      "/transferrecipient",
      sellerPaymentData,
    );

    return data.recipient_code;
  }

  // ---------- Webhook handler (keeps signature verification) ----------
  async handleWebhook(payload: unknown, signature: string): Promise<void> {
    // Zod can also validate the webhook event shape if needed
    const crypto = await import("crypto");
    const expectedSignature = crypto
      .createHmac("sha512", this.getSecretKey())
      .update(JSON.stringify(payload))
      .digest("hex");

    if (signature !== expectedSignature) {
      logger.warn("Invalid webhook signature");
      throw new AppError("Invalid webhook signature", 401);
    }

    // You can optionally validate the payload with a Zod schema here
    logger.info("Webhook received", { event: (payload as any).event });
    // route to handlers...
  }

  // ---------- Private helpers ----------
  private generateReference(prefix: string, orderId: string): string {
    return `${prefix}-${orderId}-${Date.now()}-${randomUUID().slice(0, 6)}`;
  }

  private getSecretKey(): string {
    // Retrieve from the configured client's headers
    const authHeader = this.client.defaults.headers.Authorization as string;
    return authHeader.replace("Bearer ", "");
  }

  private handleError(error: unknown, context: string): never {
    if (axios.isAxiosError(error)) {
      const paystackMessage = error.response?.data?.message;
      const statusCode = error.response?.status || 500;
      logger.error(
        `Paystack API error: ${JSON.stringify({
          context,
          status: statusCode,
          message: paystackMessage,
          url: error.config?.url,
        })}`,
      );
      throw new AppError(
        paystackMessage || `Payment service error (${context})`,
        statusCode >= 400 && statusCode < 500 ? 400 : 502,
      );
    }
    if (error instanceof AppError) throw error;
    logger.error("Unexpected error in Paystack service", { context, error });
    throw new AppError("Internal payment service error", 500);
  }
}
