"use client";

import { useState } from "react";
import Checkout from "@/components/checkout/Checkout";
import OrderSummary from "@/components/checkout/OrderSummary";
import { orderApi } from "@/app/api/orders";
import { useProductStore } from "@/store/productStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PaystackPop from "@paystack/inline-js";

const initialAddress = {
  fullName: "",
  email: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export default function page() {
  const [address, setAddress] = useState(initialAddress);

  const cart = useProductStore((state) => state.products);
  const getCartStats = useProductStore((state) => state.getCartStats);
  const clearCart = useProductStore((state) => state.removeAllCartItems);
  const cartStats = getCartStats();

  const router = useRouter();
  const queryClient = useQueryClient();

  async function createCheckoutOrder() {
    try {
      const deliveryAddress = {
        street: `${address.addressLine1}, ${address.addressLine2}`.trim(),
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postalCode,
      };
      const cartItems = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      const checkoutPayload = {
        deliveryAddress,
        cartItems,
      };

      const { data } = await orderApi.createOrder(checkoutPayload);
      if (!data.accessCode) {
        throw new Error("No payment access code revieved");
      }

      return data;
    } catch (error) {
      console.error(`Order creation failed: ${error?.response?.data?.message}`);
      throw new Error(error?.response?.data?.message);
    }
  }

  const mutation = useMutation({
    mutationFn: createCheckoutOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["my-order"] });
      if (data.accessCode) {
        const popup = new PaystackPop();

        popup.resumeTransaction(data.accessCode, {
          onSuccess(transaction) {
            // Clear cart items
            clearCart();
            toast.success("Payment successful!");
            router.push(
              `orders/verify-pay?orderId=${data.orderId}&reference=${transaction.reference}`,
            );
          },
          onCancel() {
            toast.info("Payment cancelled");
            router.push(`orders/verify-pay?orderId=${data.orderId}`);
          },
          onError(err) {
            toast.error(`Payment failed: ${err.message}`);
          },
        });
      }
      toast.success("Order created successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Order creation failed!");
    },
    onMutate: () => null,
  });

  return (
    <div className="container mx-auto p-4 md:px-8 bg-gray-200 h-full">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary py-2 mb-4">
          Shipping Details
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[auto_400px] gap-4 mt-4">
        <Checkout address={address} setAddress={setAddress} />

        {/* Order Summary */}
        <OrderSummary
          onCreateOrder={mutation.mutate}
          isLoading={mutation.isPending}
          cartStats={cartStats}
        />
      </div>
    </div>
  );
}
