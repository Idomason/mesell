"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  useEffect(() => {
    // Optional: Track successful order with analytics
    if (reference) {
      console.log("Order successful:", reference);
    }
  }, [reference]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for your purchase. Your order has been successfully placed
          and is now being processed. Funds are securely held in escrow.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h2 className="font-semibold text-gray-900 mb-2">Order Reference</h2>
          <p className="text-gray-700 font-mono text-sm break-all">
            {reference}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => (window.location.href = "/orders")}
            className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            View Your Orders
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-white hover:bg-gray-50 text-primary font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
