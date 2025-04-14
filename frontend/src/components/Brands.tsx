"use client";

import { brands } from "@/data/brands";
import Image from "next/image";

export default function Brands() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Our Trusted Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with the most reputable local brands to bring you quality
            products
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* Single line marquee with duplicated items for seamless loop */}
          <div className="flex overflow-x-hidden">
            <div className="animate-marquee flex items-center">
              {brands.map((brand) => (
                <div key={brand.id} className="flex-shrink-0 mx-6 group">
                  <div className="relative h-20 w-40 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center transition-all duration-300 group-hover:shadow-md">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={120}
                      height={60}
                      className="object-contain h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="animate-marquee flex items-center">
              {brands.map((brand) => (
                <div
                  key={`${brand.id}-duplicate`}
                  className="flex-shrink-0 mx-6 group"
                >
                  <div className="relative h-20 w-40 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center transition-all duration-300 group-hover:shadow-md">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={120}
                      height={60}
                      className="object-contain h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
