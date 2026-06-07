"use client";

import { useState } from "react";
import Checkout from "@/components/checkout/Checkout";
import OrderSummary from "@/components/checkout/OrderSummary";
import { orderApi } from "@/app/api/orders";
import { useProductStore } from "@/store/productStore";
import { toast } from "sonner";

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
  const cartStats = getCartStats();

  async function createCheckoutOrder() {
    try {
      const orderItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.price * item.quantity,
        seller: item.seller,
        deliveryAddress: {
          street: `${address.addressLine1}, ${address.addressLine2}`.trim(),
          city: address.city,
          state: address.state,
          country: address.country,
          postalCode: address.postalCode,
        },
      }));

      const result = await orderApi.createOrder(orderItems);
      if (result) toast.success("Order created");
    } catch (error) {
      toast.error(error?.response?.data.message);
      console.log(error?.response?.data.message);
      throw new Error("Error occured, order creation failed try again");
    }
  }

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
          onCreateOrder={createCheckoutOrder}
          cartStats={cartStats}
        />
      </div>
    </div>
  );
}
