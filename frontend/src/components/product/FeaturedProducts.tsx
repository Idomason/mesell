"use client";

import Link from "next/link";
import { Product } from "@/app/api/products";
import { productApi } from "@/app/api/products";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await productApi.getProducts();
  return response;
};

export default function FeaturedProducts() {
  const {
    data: featuredProducts,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: fetchProducts,
  });

  if (error) console.log(error);

  if (isLoading) {
    return (
      <section className="py-16 font-sans bg-gray-200">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Featured Products
          </h2>
          <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 font-sans bg-gray-200">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Featured Products
        </h2>
        <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {featuredProducts &&
            featuredProducts.length > 0 &&
            featuredProducts
              .slice(0, 6)
              .map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
        <div className="px-4 py-6 flex items-center justify-center">
          <Link
            className="px-6 py-2.5 bg-primary text-white font-medium rounded-sm animate-pulse"
            href={"/products"}
          >
            See all products
          </Link>
        </div>
      </div>
    </section>
  );
}
