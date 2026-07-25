"use client";

import AddToCartOverlay from "@/components/TestingCard";
export default function page() {
  return (
    <div className="group relative w-64 h-80 rounded-xl overflow-hidden bg-white shadow">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
        alt="Product"
        className="w-full h-full object-cover"
      />

      {/* Your slide-up action panel overlay */}
      <AddToCartOverlay onAddToCart={() => console.log("Added!")} />
    </div>
  );
}
