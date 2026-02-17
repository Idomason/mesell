"use client";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  MapPin,
  Plus,
  Share2,
  Star,
  Users,
  Verified,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { customers } from "@/data/customer";
import Link from "next/link";
import { Input } from "./ui/input";
import { Brand } from "@/Types/Brands";

export default function BrandProfile({ brand }: Brand) {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="relative h-32 md:h-52">
            <Image
              className="w-full h-full object-cover"
              src={"/images/mesell-brand-banner.avif"}
              width={1200}
              height={400}
              alt="Mesell Banner"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8 z-10">
              <div className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-lg overflow-hidden rounded-full">
                <Image
                  className="w-full h-full object-cover"
                  src={brand.image}
                  width={160}
                  height={160}
                  alt="Brand Owner Profile Image"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 pb-6 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase">
                    {brand.company}
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent-600 tracking-wider px-2 py-1 rounded-full text-xs font-medium">
                    <Verified
                      size={16}
                      className="fill-accent text-primary-foreground"
                    />
                    Verified
                  </span>
                </div>
                <p className="text-gray-500 mt-1">
                  Premium Footwear Collection
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 size={16} />
                  Share
                </Button>
                <Button size="sm" className="gap-2">
                  <Plus size={16} />
                  Follow
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-neutral-50"
                >
                  <Ellipsis size={20} />
                </Button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-xs">Lagos, Nigeria</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Users size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">Team Size</p>
                  <p className="text-xs">50-100 Employees</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={18} className="text-primary" />
                <div>
                  <p className="text-sm font-medium">Working Hours</p>
                  <p className="text-xs">Mon-Fri, 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {customers.slice(0, 5).map((customer) => (
                  <div
                    key={customer.id}
                    className="h-8 w-8 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={customer.image}
                      width={32}
                      height={32}
                      alt={customer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                  +{customers.length - 5}
                </div>
              </div>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">500</span>{" "}
                followers
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-600 mb-6">
                ISHA STEPS is a premium footwear brand dedicated to providing
                stylish, comfortable, and durable shoes for all occasions. Our
                commitment to quality craftsmanship and innovative design has
                made us a trusted name in the Nigerian footwear industry.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Why Choose Us
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-600">
                    Premium quality materials sourced from trusted suppliers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-600">
                    Ergonomic design for maximum comfort and support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-600">
                    Wide range of styles for all occasions and preferences
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-600">
                    Ethical manufacturing processes with fair labor practices
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-600">
                    Excellent customer service and satisfaction guarantee
                  </span>
                </li>
              </ul>

              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/5"
                >
                  READ MORE
                </Button>
              </div>
            </div>

            {/* Life at Brand Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Life at ISHA STEPS
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-accent-50"
                  >
                    <ChevronLeft
                      size={20}
                      className="text-accent hover:text-accent-foreground"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-accent-50"
                  >
                    <ChevronRight
                      size={20}
                      className="text-accent hover:text-accent-foreground"
                    />
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

                <div className="flex overflow-x-hidden">
                  <div className="animate-marquee whitespace-nowrap flex gap-4 py-2">
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-0.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-1.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-2.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-3.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-0.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-1.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-2.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-64 h-48 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="/images/mesell-3.png"
                        width={256}
                        height={192}
                        alt="Workspace image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Products Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Latest Products
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={`/images/mesell-${(item - 1) % 4}.png`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt="Product image"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">
                        Ladies Shoes
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        Elegant and comfortable footwear designed for style and
                        durability.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-primary">₦10,000</span>
                        <Button size="sm">View Product</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  View all products
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Rating Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Overall Rating
              </h2>

              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-gray-900">4.8</div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={`${
                          star <= 4
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">/5</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Design
                    </span>
                    <span className="text-sm text-gray-500">4.9</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Creativity
                    </span>
                    <span className="text-sm text-gray-500">4.7</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Compensation
                    </span>
                    <span className="text-sm text-gray-500">4.8</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Fast Response
                    </span>
                    <span className="text-sm text-gray-500">4.9</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>

                <div className="pt-12 pb-3">
                  <hr />
                </div>

                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-6">
                    Customer Reviews
                  </h2>

                  <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="flex gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10">
                        <Image
                          src="/images/customers/mesell-customer-1.png"
                          width={48}
                          height={48}
                          alt="Sarah Johnson"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Adeyi Ochoche
                            </h3>
                            <p className="text-sm text-gray-500">
                              Verified Buyer
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-amber-400 fill-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600 text-sm">
                          <q>
                            The quality of these shoes is exceptional! I&apos;ve
                            been wearing them for months and they still look
                            brand new. The comfort level is unmatched.
                          </q>
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            2 days ago
                          </span>
                          <span className="text-xs text-primary">
                            Helpful (24)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Review 2 */}
                    <div className="flex gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10">
                        <Image
                          src="/images/customers/mesell-customer-2.png"
                          width={48}
                          height={48}
                          alt="Michael Chen"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Ezeogu Ngozi
                            </h3>
                            <p className="text-sm text-gray-500">
                              Verified Buyer
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-amber-400 fill-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600 text-sm">
                          <q>
                            Fast shipping and excellent customer service. The
                            shoes fit perfectly and the design is exactly as
                            shown. Will definitely purchase again!
                          </q>
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            1 week ago
                          </span>
                          <span className="text-xs text-primary">
                            Helpful (18)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Review 3 */}
                    <div className="flex gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10">
                        <Image
                          src="/images/customers/mesell-customer-3.png"
                          width={48}
                          height={48}
                          alt="Emma Thompson"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Aminu Kano
                            </h3>
                            <p className="text-sm text-gray-500">
                              Verified Buyer
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className="text-amber-400 fill-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600 text-sm">
                          <q>
                            The attention to detail in these shoes is
                            remarkable. They&apos;re both stylish and
                            comfortable, perfect for all-day wear. Highly
                            recommend!
                          </q>
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            2 weeks ago
                          </span>
                          <span className="text-xs text-primary">
                            Helpful (32)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      View More Reviews
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" className="w-full" />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <Button className="w-full">Send Message</Button>
              </div>
            </div>

            {/* Bulk Supply */}
            <div className="bg-primary-50 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Bulk Supply Request
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Get wholesale prices for large orders
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Order Fully Customized Products
                </h3>
                <div className="flex flex-col flex-wrap gap-4">
                  <p className="text-sm text-gray-500">
                    Get in-touch with our creative vendors today and get a
                    chance to explain in detail what you want.
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Button className="w-full" size="lg">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
