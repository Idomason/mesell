import axios from "axios";
import { AppError } from "../middleware/errorHandler";
import { IPayment } from "../models/Payment";
import { IOrder } from "../models/Order";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

interface PaystackResponse {
  status: boolean;
  message: string;
  data: any;
}

export class PaystackService {
  private static instance: PaystackService;
  private readonly headers: Record<string, string>;

  private constructor() {
    this.headers = {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
  }

  public static getInstance(): PaystackService {
    if (!PaystackService.instance) {
      PaystackService.instance = new PaystackService();
    }
    return PaystackService.instance;
  }

  async initializeEscrowPayment(
    order: IOrder
  ): Promise<{ authorizationUrl: string; reference: string }> {
    try {
      const response = await axios.post<PaystackResponse>(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        {
          email: order.buyer.toString(), // Replace with actual buyer email
          amount: order.totalAmount * 100, // Convert to kobo
          reference: `ORDER-${order._id}-${Date.now()}`,
          metadata: {
            orderId: order._id,
            productId: order.product.toString(),
            quantity: order.quantity,
          },
          callback_url: `${process.env.FRONTEND_URL}/payment/verify`,
        },
        { headers: this.headers }
      );

      if (!response.data.status) {
        throw new AppError(response.data.message, 400);
      }

      return {
        authorizationUrl: response.data.data.authorization_url,
        reference: response.data.data.reference,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AppError(
          error.response?.data?.message || "Failed to initialize payment",
          400
        );
      }
      throw error;
    }
  }

  async verifyPayment(reference: string): Promise<boolean> {
    try {
      const response = await axios.get<PaystackResponse>(
        `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
        { headers: this.headers }
      );

      return response.data.status && response.data.data.status === "success";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AppError(
          error.response?.data?.message || "Failed to verify payment",
          400
        );
      }
      throw error;
    }
  }

  async createEscrowTransaction(payment: IPayment): Promise<string> {
    try {
      const response = await axios.post<PaystackResponse>(
        `${PAYSTACK_BASE_URL}/escrow/transaction`,
        {
          amount: payment.amount * 100, // Convert to kobo
          currency: payment.currency,
          description: `Escrow payment for order ${payment.order}`,
          metadata: {
            orderId: payment.order.toString(),
            paymentId: payment._id.toString(),
          },
        },
        { headers: this.headers }
      );

      if (!response.data.status) {
        throw new AppError(response.data.message, 400);
      }

      return response.data.data.escrow_id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AppError(
          error.response?.data?.message ||
            "Failed to create escrow transaction",
          400
        );
      }
      throw error;
    }
  }

  async releaseEscrowPayment(escrowId: string): Promise<boolean> {
    try {
      const response = await axios.post<PaystackResponse>(
        `${PAYSTACK_BASE_URL}/escrow/release/${escrowId}`,
        {},
        { headers: this.headers }
      );

      return response.data.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AppError(
          error.response?.data?.message || "Failed to release escrow payment",
          400
        );
      }
      throw error;
    }
  }

  async refundEscrowPayment(
    escrowId: string,
    reason: string
  ): Promise<boolean> {
    try {
      const response = await axios.post<PaystackResponse>(
        `${PAYSTACK_BASE_URL}/escrow/refund/${escrowId}`,
        { reason },
        { headers: this.headers }
      );

      return response.data.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new AppError(
          error.response?.data?.message || "Failed to refund escrow payment",
          400
        );
      }
      throw error;
    }
  }
}
