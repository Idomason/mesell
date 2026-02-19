"use client";

import { Dot } from "lucide-react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { HiOutlineHeart, HiOutlineShoppingBag } from "react-icons/hi2";
import StarRating from "../common/ratings/StarRating";
import Quantity from "./QuantitySelector";

type Seller = {
  id: number;
  name: string;
  verified: boolean;
  isLive: boolean;
};

type ProductDescriptionProps = {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    totalSold: number;
    isLive: boolean;
    images: string[];
    seller: Seller;
    category: string;
  };
};

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <div className="px-2 md:px-4 py-4">
      <div>
        <h2 className="font-semibold text-xl text-gray-800">
          {/* African Wood Woven Basket, 12 dozens packed made in Zulu land */}
          {product?.name}
        </h2>
        <div className="flex items-center text-gray-500 text-[12px] py-4 font-semibold tracking-wide">
          <div className="text-orange-500">
            <StarRating size={14} />
          </div>
          <Dot />
          <div className="flex items-center space-x-1">
            <HiOutlineShoppingBag size={14} className="text-orange-500" />
            <span>154 orders</span>
          </div>
        </div>
        <div className="flex items-center gap-10 text-sm font-semibold pb-4 border-b-2 border-gray-400/60">
          <div className="flex flex-col space-y-2 text-gray-700">
            <span>Made in:</span>
            <span>Native:</span>
            <span>Design:</span>
            <span>Delivery:</span>
          </div>
          <div className="flex flex-col space-y-2 text-gray-500 font-light">
            <span className="">East Africa</span>
            <span>Akan</span>
            <span>Cultural</span>
            <span>2 Weeks</span>
          </div>
        </div>

        {/* Colours */}
        <div className="py-4">
          <h4 className="mb-2">Colours</h4>
          {["#00ff00", "#f5f05f", "#a08", "#00ff", "#ff0000"].map((colour) => (
            <button
              style={{ backgroundColor: colour }}
              key={colour}
              className={`h-6 w-6 rounded-full shadow inline-block mr-2`}
            ></button>
          ))}
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <h4 className="mb-2">Sizes</h4>
          <div className="flex items-center gap-4">
            {["S", "M", "L", "XL"].map((size) => (
              <button
                className="h-6 w-6 md:h-7 md:w-7 flex items-center justify-center bg-[#d7d7d7] border border-gray-50 rounded-sm hover:bg-white transition-all duration-300 ease-in-out"
                key={size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <h4 className="mb-2">Quantity</h4>
          <Quantity onAddItem={() => {}} />
        </div>
        <div className="py-4">
          <h5 className="mb-2 text-sm font-medium">Price</h5>
          <span className="font-semibold">₦499,000</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <button className="px-6 py-2.5 flex items-center rounded-md space-x-2 text-[13px] md:text-sm  shadow text-white bg-primary-500 border border-gray-300 hover:bg-primary-700">
              <TbShoppingBagPlus className="hidden size-5 sm:block" />
              <span className="font-semibold">Add to cart</span>
            </button>
            <button className="px-6 py-2.5 inline-block w-[150px] rounded-md items-center space-x-2 text-sm font-semibold text-primary-500 bg-primary-100 border border-gray-300 hover:text-primary-700 shadow">
              Buy now
            </button>
            <button className="inline-block rounded-md shadow p-2.5 bg-gray-100 hover:bg-accent-500 transition-all duration-300 ease-in-out border border-gray-300">
              <HiOutlineHeart className="md:size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
