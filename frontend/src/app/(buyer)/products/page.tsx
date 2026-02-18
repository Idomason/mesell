import { customers } from "@/data/customer";
import { products } from "@/data/products";
import { Product } from "@/Types/Products";
import { Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PopularProducts() {
  return (
    <section className="py-16 font-sans bg-gray-800">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          All Available Products
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
        <div className="overflow-hidden">
          <Image
            src={product?.images[0]}
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
      </div>

      {/* Product bottom content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 sm:text-base">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">₦{formattedPrice}</span>
          <Link href={`/products/${product.id}`} className="btn-primary">
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
