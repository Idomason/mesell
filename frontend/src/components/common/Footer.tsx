"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShoppingBag,
  User,
  HelpCircle,
  CreditCard,
  Truck,
  Shield,
  Heart,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 relative">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 animate-bounce"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/logo-opacity.png"
                alt="Mesell Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm">
              A secure and trusted pre-order e-commerce platform built for the
              Nigerian market, offering quality locally made products from top
              brands.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://threads.net"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                aria-label="Threads"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.186 24C18.929 24 24 18.929 24 12.186C24 5.443 18.929 0.372 12.186 0.372C5.443 0.372 0.372 5.443 0.372 12.186C0.372 18.929 5.443 24 12.186 24ZM12.186 2.791C17.715 2.791 22.209 7.285 22.209 12.814C22.209 18.343 17.715 22.837 12.186 22.837C6.657 22.837 2.163 18.343 2.163 12.814C2.163 7.285 6.657 2.791 12.186 2.791Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.186 7.442C14.651 7.442 16.651 9.442 16.651 11.907C16.651 14.372 14.651 16.372 12.186 16.372C9.721 16.372 7.721 14.372 7.721 11.907C7.721 9.442 9.721 7.442 12.186 7.442ZM12.186 9.302C10.907 9.302 9.861 10.348 9.861 11.627C9.861 12.906 10.907 13.952 12.186 13.952C13.465 13.952 14.511 12.906 14.511 11.627C14.511 10.348 13.465 9.302 12.186 9.302Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                aria-label="X (Twitter)"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  Special Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <ArrowRight
                    size={14}
                    className="mr-2 group-hover:translate-x-1 transition-transform"
                  />
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Customer Service
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/account"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <User
                    size={14}
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <ShoppingBag
                    size={14}
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <Heart
                    size={14}
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <HelpCircle
                    size={14}
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center text-sm hover:text-primary transition-colors group"
                >
                  <Mail
                    size={14}
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-primary" />
                <span className="text-sm">
                  123 Victoria Island, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <span className="text-sm">+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <span className="text-sm">support@mesell.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white font-medium mb-3 relative inline-block">
                Payment Methods
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-primary"></span>
              </h4>
              <div className="flex space-x-2">
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <CreditCard size={16} />
                </div>
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Truck size={16} />
                </div>
                <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Shield size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-white font-semibold text-lg mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm mb-4">
              Stay updated with our latest products, offers, and news
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              &copy; {currentYear} Mesell. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/shipping"
                className="hover:text-primary transition-colors"
              >
                Shipping Policy
              </Link>
              <Link
                href="/returns"
                className="hover:text-primary transition-colors"
              >
                Returns & Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
