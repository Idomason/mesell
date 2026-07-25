"use client";

import Link from "next/link";
import Image from "next/image";
import { Verified } from "lucide-react";
import { customers } from "@/data/customer";
import { Product } from "@/app/api/products";
import { productApi } from "@/app/api/products";
import { useQuery } from "@tanstack/react-query";
import { useProductStore } from "@/store/productStore";
import { toast } from "sonner";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await productApi.getProducts();
  return response;
};

export default function PopularProducts() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addToCart = useProductStore((state) => state.addToCart);

  return (
    <section className="py-16 font-sans bg-gray-800">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          All Available Products
        </h2>
        <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-7 max-w-6xl mx-auto">
          {products &&
            products.length > 0 &&
            products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (item: Product) => void;
}) {
  // Format price with commas for better readability
  const formattedPrice = product.price.toLocaleString("en-US");

  function addProductToCart(product) {
    addToCart(product);
    toast.success("Product added to cart");
  }

  return (
    <div className="bg-white rounded-lg w-full shadow-md overflow-hidden cursor-pointer">
      {/* Product top content */}
      <div className="relative">
        <div className="overflow-hidden">
          <Image
            src={product?.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-125"
            width={200}
            height={200}
            priority
          />
        </div>

        {/* Product category tag */}
        <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 text-sm font-medium rounded-full m-4 shadow">
          {product.category}
        </div>

        {/* Seller profile */}
        {/* href="/sellers/ene-adanu" */}
        <button>
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
        </button>
      </div>

      {/* Product bottom content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 sm:text-base">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">₦{formattedPrice}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => addProductToCart(product)}
              className="btn-primary hover:bg-primary-600 transition-colors duration-300 ease-in"
            >
              Add To Cart
            </button>
            <Link
              href={`/products/${product._id}`}
              className="btn-secondary border border-white/24 hover:bg-primary-600 transition-colors duration-300 ease-in"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
