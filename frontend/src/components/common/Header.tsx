"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="w-full border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 animate-pulse rounded bg-muted" />
            <div className="flex gap-4">
              <div className="h-8 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Mesell
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/orders"
              className="text-sm font-medium hover:text-primary"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="text-sm font-medium hover:text-primary"
            >
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
