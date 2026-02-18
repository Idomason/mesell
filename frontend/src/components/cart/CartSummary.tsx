import Link from "next/dist/client/link";
import { TbTruckDelivery } from "react-icons/tb";

type ItemsProp = { totalItems: number };

export default function CartSummary({ totalItems }: ItemsProp) {
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
            <span>{totalItems} Items</span>
            <span className="font-semibold text-gray-700">₦20,890</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Cost</span>
            <span className="font-semibold text-gray-700">₦150</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold text-gray-700">₦50</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600 font-semibold">- ₦80</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span>₦22,040</span>
      </div>
      <Link
        href="/checkout"
        className="w-full mt-4 px-4 text-center bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/80 transition-colors duration-300"
      >
        Proceed to Checkout
      </Link>

      <div className="mt-4 text-xs text-gray-500 flex items-center gap-2 justify-around bg-gray-50 p-2 rounded-md">
        <TbTruckDelivery className="inline-block mr-1 size-10 stroke-1" />
        <div>
          <span className="block text-xs font-medium mb-0.5">Delivered by</span>
          <span className="block text-xs font-semibold">
            Morning, Friday, May 10, 2024
          </span>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          By proceeding to checkout, you agree to our <br />
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>
          and
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
