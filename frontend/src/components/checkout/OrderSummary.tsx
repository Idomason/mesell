"use client";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export default function OrderSummary({
  onCreateOrder,
  isLoading,
  cartStats,
}: {
  onCreateOrder: () => void;
  isLoading: Boolean;
  cartStats: {
    totalItems: number;
    totalPrice: number;
  };
}) {
  const [isMounted, setIsMounted] = useState(false);

  const totalItems = isMounted ? (cartStats?.totalItems ?? 0) : 0;
  const totalPrice = isMounted
    ? (cartStats?.totalPrice?.toLocaleString("en-US") ?? "0")
    : "0";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-fit bg-primary p-4 rounded shadow text-white">
      <h2 className="text-lg font-semibold border-b border-primary-600 pb-2">
        Order Summary
      </h2>
      <div className="my-5 pt-5 pb-5 bg-black/75 p-3 rounded">
        <strong className="text-white flex items-center gap-2 mb-2">
          <button className="h-4 w-4 p-3.5 rounded-full bg-white shadow flex items-center justify-center">
            🎁
          </button>
          <span>Buying gift for a loved one?</span>
        </strong>
        <p className="text-sm text-gray-300 font-medium py-2">
          Gift wrap and personalizes message on card, only for N3,000
        </p>
        <Textarea
          placeholder="Write a personalized message to be included in the card"
          className="w-full bg-gray-100 text-gray-700 rounded p-2 text-sm mb-2 my-3"
        />
        <Button className="bg-white text-primary px-4 py-1 rounded mt-4 font-semibold hover:text-white">
          Add gift wrap 🎁
        </Button>
      </div>
      <div className="border-t border-primary-600 py-5">
        <strong className="text-white text-xl mb-3 inline-block">
          Price Details
        </strong>
        <div>
          <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
            <span>{totalItems ?? 0} Items</span>
            <span>₦{totalPrice}</span>
          </p>

          <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
            <span>Subtotal</span>
            <span>₦99.99</span>
          </p>
          <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
            <span>Shipping</span>
            <span>₦5.99</span>
          </p>
          <p className="flex items-center justify-between mt-2 text-sm font-medium tracking-wide">
            <span>Gift Wrap</span>
            <span>₦5.99</span>
          </p>
          <p className="flex items-center justify-between mt-4 font-bold text-lg border-t border-primary-600 pt-5">
            <span>Total</span>
            <span>₦{totalPrice}</span>
          </p>
        </div>
      </div>
      <Button
        onClick={onCreateOrder}
        size={"lg"}
        className="w-full bg-white text-primary text-lg px-4 py-1 rounded mt-4 font-semibold hover:text-white hover:bg-black/75"
      >
        {isLoading ? <Loader className="animate-spin" /> : "Place Order"}
      </Button>
    </div>
  );
}
