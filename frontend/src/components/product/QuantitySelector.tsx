"use client";

import { useState } from "react";

export default function QuantitySelector({
  onAddItem,
}: {
  onAddItem: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityNext() {
    setQuantity((quantity) => quantity + 1);
    onAddItem(quantity + 1);
  }

  function handleQuantityPrevious() {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
      onAddItem(quantity - 1);
    }
  }

  return (
    <div className="w-32 ring-2 ring-secondary rounded-md bg-gray-300">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleQuantityPrevious}
          className="p-2 h-7 w-7 flex items-center justify-center rounded-md shadow bg-gray-500 text-warning font-semibold hover:text-white"
        >
          -
        </button>
        <span className="text-gray-500 font-semibold">{quantity}</span>
        <button
          onClick={handleQuantityNext}
          className="p-2 h-7 w-7 flex items-center justify-center rounded-md shadow bg-gray-500 text-warning font-semibold hover:text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}
