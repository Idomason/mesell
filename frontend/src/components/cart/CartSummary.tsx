"use client";

import Link from "next/link";
import { IoWarning } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { useProductStore } from "@/store/productStore";

export default function CartSummary() {
  const getCartStats = useProductStore((state) => state.getCartStats);
  const cart = useProductStore((state) => state.products);
  const cartStats = getCartStats();

  return (
    <div className="bg-primary-50 rounded-md p-4 flex flex-col justify-between font-sans max-h-[35.4rem]">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-lg font-semibold mb-4 text-primary">
          Cart Summary
        </h2>
        <div className="border border-gray-200 bg-white rounded-md mb-4 flex items-center justify-between overflow-hidden">
          <input
            className="w-full px-2 py-1.5 border-none outline-none border border-r-gray-200"
            type="text"
            placeholder="Promo Code"
          />
          <button className="text-white font-semibold text-sm bg-primary px-4 py-2">
            Apply
          </button>
        </div>
        <div className="space-y-2 text-xs text-gray-500 font-medium">
          <div className="flex justify-between">
            <span>{cartStats.totalItems} Items</span>
            <span className="font-semibold text-gray-700">
              ₦{cartStats.totalPrice.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-700">₦450</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-gray-700">₦150</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600 font-semibold">- ₦80</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold text-gray-700">
              ₦50 ({cartStats.totalItems})
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₦{cartStats.totalPrice.toLocaleString("en-US")}</span>
      </div>
      <Link
        href="/checkout"
        className="w-full mt-4 px-4 text-center bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/80 transition-colors duration-300"
      >
        Proceed to Checkout
      </Link>

      <div className="mt-4 text-xs text-gray-500 flex items-center gap-2 justify-around bg-gray-50 p-2 rounded-md">
        <TbTruckDelivery className="inline-block mr-1 size-10 stroke-1" />
        <div className="flex-1">
          <span className="block text-xs font-medium mb-0.5">
            Est. Delivery
          </span>
          <span className="block text-xs font-semibold">
            Friday, May 10, 2024 (14 day's production)
          </span>
        </div>
      </div>

      <p className="py-4 text-xs text-gray-500 font-medium text-center">
        <IoWarning size={15} className="fill-amber-500 inline-block" />
        <span>Funds held in escrow. Released to sellers upon shipment.</span>
      </p>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          By proceeding to checkout, you agree to our <br />
          <Link href="#" className="text-primary hover:underline mr-1">
            Terms of Service
          </Link>
          and
          <Link href="#" className="text-primary hover:underline ml-1">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
