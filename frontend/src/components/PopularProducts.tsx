import { products } from "@/data/products";
import { Product } from "@/Types/Products";
import Image from "next/image";
import { customers } from "@/data/customer";
import { Verified } from "lucide-react";

export default function PopularProducts() {
  return (
    <section className="py-16 font-sans">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          width={200}
          height={200}
        />
        <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 text-sm font-medium rounded-full m-4 shadow">
          {product.category}
        </div>
        <div className="h-10 w-10 rounded-full border-2 border-primary-500 overflow-hidden absolute left-0 top-0 right-full m-4">
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
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">₦{formattedPrice}</span>
          <button className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
