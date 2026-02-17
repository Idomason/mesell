"use client";

import { useState } from "react";
import Address from "./address/Address";
import Payment from "./payment/Payment";

export default function Checkout() {
  const [option, setOption] = useState("address");

  return (
    <div className="bg-gray-50 rounded shadow overflow-hidden">
      <div className="bg-white px-4 pt-6 flex items-center justify-between font-semibold border-b border-gray-200">
        <button
          className={
            option === "address"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }
          onClick={() => setOption("address")}
        >
          Address
        </button>
        <button
          className={
            option === "payment"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }
          onClick={() => setOption("payment")}
        >
          Payment
        </button>
        <button
          className={
            option === "review"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }
          onClick={() => setOption("review")}
        >
          Review
        </button>
      </div>
      {option === "address" && <Address />}
      {option === "payment" && <Payment />}
      {option === "review" && (
        <div className="p-4">
          <h2 className="text-lg font-semibold text-primary">Review</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Please review your order details before proceeding to payment.
          </p>
          {/* Display order summary and details here */}
        </div>
      )}
    </div>
  );
}
