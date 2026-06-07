"use client";

import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";
import { useProductStore } from "@/store/productStore";

import { useEffect, useState } from "react";

export default function page() {
  const products = useProductStore((state) => state.products);
  const getCartStats = useProductStore((state) => state.getCartStats);
  const loadCart = useProductStore((state) => state.loadCart);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    void loadCart();
  }, [loadCart]);

  const cart = isHydrated ? products.slice() : [];
  const cartStats = isHydrated
    ? getCartStats()
    : { totalItems: 0, totalPrice: 0 };

  if (!isHydrated) {
    return (
      <div className="font-sans py-12 bg-gray-200">
        <div className="px-2 sm:px-4 mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary">Your Cart</h1>
            <span className="text-sm text-gray-600 mb-8 font-semibold">
              Loading cart...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans py-12 bg-gray-200">
      <div className="px-2 sm:px-4 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Your Cart</h1>
          <span className="text-sm text-gray-600 mb-8 font-semibold">
            {cartStats.totalItems} Products in your cart - Total worth: $
            {cartStats.totalPrice.toFixed(2)}
          </span>
        </div>

        {cart && cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_350px] gap-6">
            <div className="w-full border border-gray-200 rounded-md">
              <CartItems cartData={cart} />
            </div>
            <CartSummary />
          </div>
        ) : (
          <p className="text-center text-gray-600 mb-8">
            Your cart is currently empty. Start adding products to your cart to
            see them here.
          </p>
        )}
      </div>
    </div>
  );
}
