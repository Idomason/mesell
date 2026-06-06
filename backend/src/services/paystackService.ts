import axios from "axios";
import { getEnv } from "@/lib/env";
import { CreateSellerAcctSchema } from "@/lib/zodSchema";

const env = getEnv();

interface ITransactionData {
  email: any;
  amount: number;
  currency: string;
  subaccount: any;
  split_code: any;
  metadata?: {
    custom_fields: {
      display_name: string;
      variable_name: string;
      value: string;
    }[];
  };
}

interface IRecipientData {
  type: string;
  name: string;
  account_number: string;
  bank_code: string;
}

interface ITransferData {
  source: string;
  amount: number;
  recipient: string;
  reason?: string;
}

export const paystackClient = axios.create({
  baseURL: env.PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

// Get bank code
export const getBankCode = async function (bankName: string) {
  try {
    const response = await paystackClient.get("/bank");
    const bank = response.data.data.find(
      (b: { name: string }) => b.name.toLowerCase() === bankName.toLowerCase(),
    );
    if (!bank) {
      throw new Error("Bank not found");
    }
    return { success: true, data: bank.code };
  } catch (error) {
    console.error("Error fetching bank code:", error);
    let message = "Failed to fetch bank code";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Get list of subaccounts (sellers)
export const allSellerAccounts = async function () {
  try {
    const response = await paystackClient.get("/subaccount");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching subaccounts(sellers account):", error);
    let message = "Failed to fetch subaccounts";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Find subaccount by business name & account number
export const findSellerByBusinessAndAccountNumber = async function (
  accountNumber: string,
  businessName: string,
) {
  try {
    const response = await paystackClient.get("/subaccount?perPage=100&page=1");
    const subaccounts = response.data.data;
    const existingAccount = subaccounts.find(
      (acct: { account_number: string; business_name: string }) =>
        acct.account_number === accountNumber &&
        acct.business_name === businessName,
    );
    return existingAccount || null;
  } catch (error) {
    console.error("Error fetching subaccounts:", error);
    let message = "Failed to fetch subaccounts";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Create subaccount
export const createSellerAccount = async function (
  subaccountData: CreateSellerAcctSchema,
) {
  try {
    const response = await paystackClient.post("/subaccount", subaccountData);
    return {
      success: true,
      data: response.data,
      message: "Seller created successfully",
    };
  } catch (error: unknown) {
    console.error("Error creating subaccount:", error);
    let message = "Failed to create subaccount";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Initialize payment (The Lock)
export const initializeEscrowPayment = async function (order: any) {
  try {
    const response = await paystackClient.post("/transaction/initialize", {
      email: order.buyer.email,
      amount: order.totalAmount * 100, // Paystack expects amount in kobo
      currency: "NGN",
      split: {
        subaccount: order.subaccount_code, // Seller's Paystack subaccount ID
        percentage: 0,
        bearer: "main_account", // You (Platform) pay the transaction fees
      }, // Split code for payment distribution
      callback_url: `${env.FRONTEND_URL}/payment/success`, // URL to redirect after payment
      metadata: {
        custom_fields: [
          {
            display_name: order._id,
            variable_name: "order_id",
            value: order._id.toString(),
          },
        ],
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error initializing escrow payment:", error);
    let message = "Failed to initialize escrow payment";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Initialize transaction (The Lock)
export const initializeTransaction = async function (
  transactionData: ITransactionData,
) {
  try {
    const response = await paystackClient.post(
      "/transaction/initialize",
      transactionData,
    );
    const { authorizationUrl, reference } = response.data.data;
    return { success: true, data: response.data, authorizationUrl, reference };
  } catch (error) {
    console.error("Error initializing transaction:", error);
    let message = "Failed to initialize transaction";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Create transfer recipient
export const createTransferRecipient = async function (
  recipientData: IRecipientData,
) {
  try {
    const response = await paystackClient.post(
      "/transferrecipient",
      recipientData,
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating transfer recipient:", error);
    let message = "Failed to create transfer recipient";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Create transfer
export const createTransfer = async function (transferData: ITransferData) {
  try {
    const response = await paystackClient.post("/transfer", transferData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error creating transfer:", error);
    let message = "Failed to create transfer";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};

// Verify transaction (webhook)
export const verifyTransaction = async function (reference: string) {
  try {
    const response = await paystackClient.get(
      `/transaction/verify/${reference}`,
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error verifying transaction:", error);
    let message = "Failed to verify transaction";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    } else if (error instanceof Error) {
      message = error.message || message;
    }
    throw new Error(message);
  }
};
