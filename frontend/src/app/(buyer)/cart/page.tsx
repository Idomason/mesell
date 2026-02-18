"use client";

import { useState } from "react";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";

const cartData = [
  {
    id: 0,
    image:
      "https://media.istockphoto.com/id/1464991531/photo/prosecco-bottle-with-blank-label-on-white-background-easily-apply-your-custom-design-on-the.jpg?s=612x612&w=0&k=20&c=aGAL0OGKAHTEwDuty1Aboa6ERlpz4PVn6NDb8NYDPdc=",
    heading: "Whisky Hot Wine",
    color: "Salmon",
    size: "Small",
    price: 23,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max Red",
    color: "Red",
    size: "Medium",
    price: 1800,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE5pa2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max XVII",
    color: "Lemon",
    size: "Large",
    price: 500,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max Red",
    color: "Red",
    size: "Medium",
    price: 1800,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE5pa2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max XVII",
    color: "Lemon",
    size: "Large",
    price: 500,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max Red",
    color: "Red",
    size: "Medium",
    price: 1800,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE5pa2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max XVII",
    color: "Lemon",
    size: "Large",
    price: 500,
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max Red",
    color: "Red",
    size: "Medium",
    price: 1800,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE5pa2V8ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max XVII",
    color: "Lemon",
    size: "Large",
    price: 500,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmlrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    heading: "Nike Air Max Red",
    color: "Red",
    size: "Medium",
    price: 1800,
  },
];

export default function page() {
  const [total, setTotal] = useState(0);
  const cart = cartData.slice();
  const numItems = cart.length;
  const actualTotal = cart.reduce((acc, item) => acc + item.price, 0) + total;

  function handleTotalCalc(t: number) {
    setTotal(t);
  }

  return (
    <div className="font-sans py-12 bg-gray-200">
      <div className="px-2 sm:px-4 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Your Cart</h1>
          <span className="text-sm text-gray-600 mb-8 font-semibold">
            {numItems} Products in your cart {actualTotal} - {total}
          </span>
        </div>

        {cart && cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_350px] gap-6">
            <div className="w-full border border-gray-200 rounded-md">
              <CartItems cartData={cart} onSetTotal={handleTotalCalc} />
            </div>
            <CartSummary totalItems={numItems} />
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
