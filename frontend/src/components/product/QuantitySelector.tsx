"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/Types/Products";
import { useProductStore } from "@/store/productStore";

export default function QuantitySelector({ item }: { item: Product }) {
  const addToCart = useProductStore((state) => state.addToCart);
  const reduceQuantity = useProductStore((state) => state.reduceItemQuantity);

  return (
    <div className="w-32 ring-2 ring-secondary rounded-md bg-gray-300">
      <div className="flex items-center justify-between gap-4">
        <button
          disabled={item.quantity === 1}
          onClick={() => reduceQuantity(item.id)}
          className={cn(
            "p-2 h-7 w-7 flex items-center justify-center rounded-md shadow bg-gray-500 text-warning font-semibold hover:text-white",
            item.quantity === 1 &&
              "cursor-not-allowed disabled:bg-transparent blur",
          )}
        >
          -
        </button>
        <span className="text-gray-500 font-semibold">{item.quantity}</span>
        <button
          onClick={() => addToCart(item)}
          className="p-2 h-7 w-7 flex items-center justify-center rounded-md shadow bg-gray-500 text-warning font-semibold hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}
