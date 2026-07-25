"use client";

import React from "react";
import { ShoppingCart } from "lucide-react"; // pnpm add lucide-react

interface AddToCartOverlayProps {
  onAddToCart?: () => void;
  disabled?: boolean;
}

export default function AddToCartOverlay({
  onAddToCart,
  disabled,
}: AddToCartOverlayProps) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end rounded-xl bg-black/0 p-4 transition-colors duration-200 group-hover:bg-black/10">
      <div className="translate-y-6 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <button
          type="button"
          disabled={disabled}
          onClick={onAddToCart}
          className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none
            focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
            disabled:pointer-events-none disabled:opacity-50
            bg-secondary text-secondary-foreground hover:bg-secondary/80
            h-9 px-4 py-2 w-full rounded-full"
        >
          <ShoppingCart
            className="size-4 pointer-events-none shrink-0"
            aria-hidden="true"
          />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
