import React from "react";
import Image from "next/image";
import Link from "next/link";
import VerificationBadge from "../trust/VerificationBadge";
import { Play, Heart, Verified } from "lucide-react";
import { Product } from "@/Types/Products";
import { customers } from "@/data/customer";
import { Button } from "../ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.[0] || "/placeholder.jpg";
  const hoverImage = product.images?.[1];

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(product.price);

  return (
    <div className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link
        href={`/products/${product._id}`}
        className="block relative aspect-square overflow-hidden"
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover group-hover:scale-115 transition-transform duration-300 ease-in-out"
        />

        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
          />
        )}
      </Link>

      {/* Seller profile */}
      {product.seller && (
        <Link href="/sellers/ene-adanu">
          <div className="h-10 w-10 rounded-full border-2 border-primary-500 overflow-hidden absolute left-0 top-0 right-full m-4 cursor-pointer">
            <Image
              className="w-full h-full object-cover"
              src={customers[3].image}
              alt={customers[3].name}
              width={32}
              height={32}
            />
          </div>
          <Verified className="size-5 inset-1 text-success-foreground absolute left-11 top-9 fill-accent rounded-full" />
        </Link>
      )}

      {/* Whishlist Icon */}
      <button className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-100">
        {" "}
        <Heart className="w-4 h-4" />{" "}
      </button>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <VerificationBadge type="quality" size="sm" />
          {product.seller.verified && (
            <VerificationBadge type="bvn" size="sm" />
          )}
        </div>

        <Link href={`/products/${product._id}`}>
          <h3 className="font-karla font-semibold text-lg mb-1 hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">{formattedPrice}</span>
            <span className="text-sm text-gray-500 ml-2">pre-order</span>
          </div>
          <span className="text-sm text-gray-500">
            {product.totalSold}+ sold
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <button className="flex-1 bg-primary text-white py-2 font-semibold rounded-lg hover:bg-primary-700 transition">
            Pre-Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
