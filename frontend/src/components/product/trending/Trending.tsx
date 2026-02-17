import { Tag, TrendingUp } from "lucide-react";
import Image from "next/image";

const newArrivals = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnfGVufDB8fDB8fHww",
    title: "Latest Ankara Bag",
    price: 19.9,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1614179689702-355944cd0918?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFnfGVufDB8fDB8fHww",
    title: "New bag design cultural",
    price: 40.0,
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1681498856888-2f3552c0b189?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFnfGVufDB8fDB8fHww",
    title: "Ankara top design of today",
    price: 25.9,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFnfGVufDB8fDB8fHww",
    title: "The greatest design ever",
    price: 50.0,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFnfGVufDB8fDB8fHww",
    title: "The greatest design ever",
    price: 50.0,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFnfGVufDB8fDB8fHww",
    title: "The greatest design ever",
    price: 50.0,
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFnfGVufDB8fDB8fHww",
    title: "The greatest design ever",
    price: 50.0,
  },
  {
    id: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1680390327010-09e627ebd475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    title: "The greatest design ever",
    price: 50.0,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    title: "The greatest design ever",
    price: 50.0,
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhZ3xlbnwwfHwwfHx8MA%3D%3D",
    title: "The greatest design ever",
    price: 50.0,
  },
];

export default function Trending() {
  return (
    <div className="w-full max-w-7xl mx-auto py-4 my-16">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="px-2 text-2xl font-semibold">Trending</h2>
        <TrendingUp size={50} className="stroke-primary" />
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient overlays for fade effect */}
        {/* <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10"></div> */}

        {/* Single line marquee with duplicated items for seamless loop */}
        <div className="flex overflow-x-hidden">
          <div className="animate-marquee flex items-center">
            {newArrivals.map((product) => (
              <div key={product.id} className="flex-shrink-0 mx-6 group">
                <div className="relative h-full w-64 bg-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col justify-center transition-all duration-300 group-hover:shadow-md">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={120}
                    height={60}
                    className="object-cover h-48 w-full rounded-lg border border-gray-300"
                  />
                  <div className="p-4 mt-3">
                    <h3 className="text-base font-medium line-clamp-2 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-primary flex space-x-2">
                      <Tag className="rotate-90" />{" "}
                      <span>N{product.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
