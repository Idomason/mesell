import axios from "axios";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export interface PaystackTransaction {
  reference: string;
  amount: number;
  email: string;
  metadata?: Record<string, any>;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    gateway_response: string;
    paid_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    log: Record<string, any>;
    fees: number;
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any>;
      risk_action: string;
    };
    plan: string | null;
    split: Record<string, any>;
    order_id: string | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_id: string | null;
    source: string | null;
    fees_breakdown: Record<string, any> | null;
    transaction_date: string;
    plan_object: Record<string, any> | null;
    subaccount: Record<string, any> | null;
  };
}

class PaystackService {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY || "";
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      "Content-Type": "application/json",
    };
  }

  async initializeTransaction(
    transaction: PaystackTransaction
  ): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${PAYSTACK_BASE_URL}/transaction/initialize`,
        transaction,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to initialize transaction"
        );
      }
      throw error;
    }
  }

  async verifyTransaction(
    reference: string
  ): Promise<PaystackVerificationResponse> {
    try {
      const response = await axios.get(
        `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to verify transaction"
        );
      }
      throw error;
    }
  }

  async listTransactions(): Promise<PaystackResponse> {
    try {
      const response = await axios.get(`${PAYSTACK_BASE_URL}/transaction`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to list transactions"
        );
      }
      throw error;
    }
  }
}

export const paystackService = new PaystackService();
