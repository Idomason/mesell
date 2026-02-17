"use client";

import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { Verified } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/Types/Products";
import { customers } from "@/data/customer";
import ProductCard from "@/components/product/ProductCard";
import { useEffect, useState } from "react";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";

export const dummyProducts = [
  {
    _id: "prod_001",
    name: "Premium Ankara Two-Piece",
    description:
      "High-quality handcrafted Ankara outfit made with breathable cotton fabric.",
    price: 45000,
    totalSold: 128,
    isLive: true,
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
      "https://images.unsplash.com/photo-1520975922327-74766a6c2f21",
      "https://images.unsplash.com/photo-1544441893-675973e31985",
    ],
    seller: {
      id: "seller_001",
      name: "Idoma Fashion House",
      verified: true,
      isLive: true,
    },
  },
  {
    _id: "prod_002",
    name: "Smart Fitness Watch",
    description:
      "Track your health, heart rate, sleep, and workouts in real time.",
    price: 78000,
    totalSold: 342,
    isLive: false,
    images: [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    ],
    seller: {
      id: "seller_002",
      name: "TechNova Gadgets",
      verified: false,
      isLive: false,
    },
  },
  {
    _id: "prod_003",
    name: "Organic Skincare Set",
    description: "Natural glow kit made from 100% organic ingredients.",
    price: 32000,
    totalSold: 89,
    isLive: true,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    ],
    seller: {
      id: "seller_003",
      name: "Glow Naturals",
      verified: true,
      isLive: false,
    },
  },
  {
    _id: "prod_004",
    name: "Leather Office Backpack",
    description:
      "Durable leather backpack designed for work, travel, and everyday use.",
    price: 65000,
    totalSold: 214,
    isLive: false,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
      "https://images.unsplash.com/photo-1514474959185-1472d4c4e0d4",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    ],
    seller: {
      id: "seller_004",
      name: "Urban Carry",
      verified: true,
      isLive: false,
    },
  },
  {
    _id: "prod_005",
    name: "Wireless Noise Cancelling Headphones",
    description: "Immersive sound experience with active noise cancellation.",
    price: 120000,
    totalSold: 506,
    isLive: true,
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90",
      "https://images.unsplash.com/photo-1518441902112-f0b7b7f7f1f7",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944",
    ],
    seller: {
      id: "seller_005",
      name: "AudioLab",
      verified: true,
      isLive: true,
    },
  },
  {
    _id: "prod_006",
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and angle.",
    price: 27000,
    totalSold: 73,
    isLive: false,
    images: [
      "https://images.unsplash.com/photo-1507477338202-487281e6c27e",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9",
    ],
    seller: {
      id: "seller_006",
      name: "HomeSpace",
      verified: false,
      isLive: false,
    },
  },
  {
    _id: "prod_007",
    name: "Handmade Wooden Coffee Table",
    description: "Solid wood coffee table crafted for durability and elegance.",
    price: 98000,
    totalSold: 41,
    isLive: true,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9",
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc",
    ],
    seller: {
      id: "seller_007",
      name: "CraftWood",
      verified: true,
      isLive: true,
    },
  },
  {
    _id: "prod_008",
    name: "Sports Running Sneakers",
    description:
      "Lightweight running sneakers designed for comfort and performance.",
    price: 54000,
    totalSold: 267,
    isLive: false,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      "https://images.unsplash.com/photo-1519741497674-611481863552",
    ],
    seller: {
      id: "seller_008",
      name: "ActiveWear",
      verified: true,
      isLive: false,
    },
  },
  {
    _id: "prod_009",
    name: "Premium Ankara Two-Piece",
    description:
      "High-quality handcrafted Ankara outfit made with breathable cotton fabric.",
    price: 45000,
    totalSold: 128,
    isLive: true,
    images: [
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
      "https://images.unsplash.com/photo-1520975922327-74766a6c2f21",
      "https://images.unsplash.com/photo-1544441893-675973e31985",
    ],
    seller: {
      id: "seller_009",
      name: "Idoma Fashion House",
      verified: true,
      isLive: true,
    },
  },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data with a delay
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  if (loading) {
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
          {dummyProducts.map((product) => (
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

// function ProductCard({ product }: { product: Product }) {
//   // Format price with commas for better readability
//   const formattedPrice = product.price.toLocaleString("en-US");

//   return (
//     <div className="bg-white rounded-lg w-full shadow-md overflow-hidden cursor-pointer">
//       {/* Product top content */}
//       <div className="relative">
//         <div className="overflow-hidden">
//           <Image
//             src={product.image}
//             alt={product.name}
//             className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-125"
//             width={200}
//             height={200}
//           />
//         </div>

//         {/* Product category tag */}
//         <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 text-sm font-medium rounded-full m-4 shadow">
//           {product.category}
//         </div>

//         {/* Seller profile */}
//         <Link href="/sellers/ene-adanu">
//           <div className="h-10 w-10 rounded-full border-2 border-primary-500 overflow-hidden absolute left-0 top-0 right-full m-4 cursor-pointer">
//             <Image
//               className="w-full h-full object-cover"
//               src={customers[3].image}
//               alt={customers[3].name}
//               width={32}
//               height={32}
//             />
//           </div>
//           <Verified className="size-5 inset-1 text-success-foreground absolute left-11 top-9 fill-accent rounded-full" />
//         </Link>
//       </div>

//       {/* Product bottom content */}
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//         <p className="text-gray-600 mb-4 line-clamp-2 sm:text-base">
//           {product.description}
//         </p>
//         <div className="flex items-center justify-between">
//           <span className="text-primary font-bold">₦{formattedPrice}</span>
//           <Link href={"/products"} className="btn-primary">
//             View Product
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
