"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import Quantity from "../product/QuantitySelector";

type ItemProp = {
  id: number;
  image: string;
  heading: string;
  color: string;
  size: string | number;
  price: number;
};

export default function Item({ item }: { item: ItemProp }) {
  const [actualPrice, setActualPrice] = useState(0);

  function handleSelectedItems(num: number) {
    setActualPrice(num * item.price);
  }

  return (
    <li className="py-2 flex">
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.image}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between text-base font-medium text-gray-900 mb-1.5">
            <h3 className="text-sm font-semibold">
              <a href="#">{item.heading}</a>
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-gray-500 font-medium">
            Color: {item.color}
          </p>

          <p className="mt-0.5 text-xs text-gray-500 font-medium">
            Size: {item.size}
          </p>
          <p className="mt-0.5 text-xs text-gray-500 font-medium mb-1">
            Price:{" "}
            <span className="font-semibold text-gray-900">₦{item.price}</span> /
            per item
          </p>
          <Quantity onAddItem={handleSelectedItems} />
        </div>
      </div>
      <div className="flex flex-col items-end justify-between text-sm">
        <p className="ml-4 text-sm font-semibold">
          ₦{actualPrice || item.price}
        </p>
        <div className="flex items-center space-x-2">
          <button
            title="Move to whishlist"
            type="button"
            className="inline-block transition-all duration-300 ease-in-out"
          >
            <HiOutlineHeart
              size={24}
              className="stroke-accent-500 hover:fill-accent-500"
            />
          </button>
          <button
            title="Remove item"
            type="button"
            className="font-medium text-primary hover:text-primary/80 rounded-full p-.5 transition-all duration-300 ease-in-out"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </li>
  );
}
