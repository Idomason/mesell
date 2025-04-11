"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Search,
  User,
  LogIn,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

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
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-opacity.png"
              alt="Mesell Logo"
              width={120}
              height={40}
              // className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link
                href="/products"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors flex items-center"
              >
                Categories
                <ChevronDown size={14} className="ml-1" />
              </Link>
              <Link
                href="/orders"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Orders
              </Link>
            </nav>

            {/* Auth & Cart */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                <LogIn size={18} className="mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                href="/signup"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                <User size={18} className="mr-1" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
              <Link
                href="/cart"
                className="relative flex items-center text-gray-700 hover:text-primary transition-colors"
              >
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <Search size={16} />
              </button>
            </form>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/orders"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <Link
                  href="/login"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors mb-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
