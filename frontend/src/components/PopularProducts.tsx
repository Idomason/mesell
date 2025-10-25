import Image from "next/image";
import { FaEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Verified } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/Types/Products";
import { customers } from "@/data/customer";

export default function PopularProducts() {
  return (
    <section className="py-16 font-sans bg-black/75">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Popular Products
        </h2>
        <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-7 gap-x-7">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  // Format price with commas for better readability
  const formattedPrice = product.price.toLocaleString("en-US");

  return (
    <div className="bg-white rounded-lg w-full shadow-md overflow-hidden cursor-pointer">
      {/* Product top content */}
      <div className="relative">
        {/* Stats */}
        <div className="absolute top-[82%] z-40 w-full bg-gradient-to-t from-black/60 to-transparent">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <FaEye className="text-primary-500" />
              <span className="text-[12px] font-medium text-accent-500">
                1.1k
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <FaThumbsUp className="text-primary-500" />
              <span className="text-[12px] font-medium text-accent-500">0</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaThumbsDown className="text-primary-500" />
              <span className="text-[12px] font-medium text-accent-500">0</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-125"
            width={200}
            height={200}
          />
        </div>

        {/* Product category tag */}
        <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 text-sm font-medium rounded-full m-4 shadow">
          {product.category}
        </div>

        {/* Seller profile */}
        <div>
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
        </div>
      </div>

      {/* Product bottom content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 sm:text-base">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">₦{formattedPrice}</span>
          <button className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
