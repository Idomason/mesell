"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { AiOutlineInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import CountryFlag from "react-country-flag";
import {
  ShoppingCart,
  Search,
  User,
  LogIn,
  Menu,
  X,
  ChevronDown,
  Heart,
} from "lucide-react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  if (!mounted) {
    return (
      <header className="w-full border-b bg-background font-sans">
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
    <>
      <header className="fixed w-full flex flex-col items-center justify-between border-b bg-background top-0 left-0 right-0 z-50">
        {/* First Nav */}
        <nav className="container mx-auto px-4 sm:px-6 py-2 bg-black">
          <ul className="flex items-center justify-between">
            {/* Socials */}
            <li className="flex items-center justify-center divide-x">
              <div className="flex items-center justify-center gap-2.5 mr-4">
                <Link
                  href="#"
                  className="text-sm font-medium text-accent hover:text-primary transition-colors"
                >
                  <IoLogoFacebook className="size-5" />
                </Link>

                <Link
                  href="#"
                  className="text-sm font-medium text-accent hover:text-primary transition-colors"
                >
                  <AiOutlineInstagram className="size-5" />
                </Link>

                <Link
                  href="#"
                  className="text-sm font-medium text-accent hover:text-primary transition-colors"
                >
                  <RiTwitterXFill className="size-5" />
                </Link>
              </div>
              {/* Country */}
              <div className="flex items-center justify-center gap-2.5 mr-4">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-medium text-accent ml-4">
                    Nigeria
                  </span>
                  <CountryFlag
                    countryCode="NG"
                    svg
                    style={{
                      width: "20px",
                      height: "15px",
                    }}
                    title="Nigeria"
                  />
                </span>
                <span className="text-sm font-medium text-accent hover:text-primary transition-colors">
                  <ChevronDown size={14} />
                </span>
              </div>
            </li>

            {/* Auth & Cart */}
            <li className="flex items-center justify-center gap-2.5">
              <Link
                href="/cart"
                className="relative flex items-center text-gray-200 hover:text-primary transition-colors"
              >
                <ShoppingCart className="hover:stroke-primary" size={22} />
                <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                  0
                </div>
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center text-gray-200 hover:text-primary transition-colors"
              >
                <Heart className="hover:stroke-primary" size={22} />
                <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                  0
                </div>
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center text-gray-200 hover:text-primary transition-colors"
              >
                <IoIosNotifications className="hover:fill-primary" size={22} />
                <div className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                  0
                </div>
              </Link>

              <Link
                href="/login"
                className="hidden md:flex items-center text-sm font-medium text-gray-200 hover:text-primary transition-colors"
              >
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                href="/signup"
                className="hidden md:flex items-center text-sm font-medium text-gray-200 hover:text-primary transition-colors"
              >
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Second Nav */}
        <div className="container mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-opacity.png"
                alt="Logo"
                width={100}
                height={40}
                className="md:h-6 w-auto h-5"
              />
            </Link>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="relative w-80 hidden md:block"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              <nav className="flex items-center space-x-6">
                <Link
                  href="/brands"
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Brands
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
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div
            className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    src="/images/logo-opacity.png"
                    alt="Logo"
                    width={120}
                    height={40}
                    className="h-7 w-auto"
                  />
                </Link>
                <button
                  className="text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b">
                <form onSubmit={handleSearch} className="relative">
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
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto">
                <div className="px-4 py-2 space-y-1">
                  <Link
                    href="/brands"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Brands
                  </Link>
                  <Link
                    href="/categories"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </div>

                {/* Mobile Auth & Cart */}
                <div className="px-4 py-4 border-t">
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn size={20} className="mr-3" />
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={20} className="mr-3" />
                      Sign Up
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="relative">
                        <ShoppingCart size={20} className="mr-3" />
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
                          0
                        </span>
                      </div>
                      Cart
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
