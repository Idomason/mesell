import { api } from "../../lib/api";

export const paymentApi = {
  createSellerSubaccount: async (payload: Record<string, any>) => {
    const response = await api.post("/payments/create", payload);
    return response.data;
  },
};

export default paymentApi;
