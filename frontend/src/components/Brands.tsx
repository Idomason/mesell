import { brands } from "@/data/brands";

export default function Brands() {
  return (
    <section className="py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-primary mb-6 text-center">
          Our Trusted Brands
        </h2>

        <div className="relative flex overflow-x-hidden">
          {/* First row of brands */}
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {brands.map((brand) => (
              <div key={brand.id} className="mx-4">
                <button className="text-sm px-6 py-3 border border-gray-200 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-300 outline-none">
                  {brand.name}
                </button>
              </div>
            ))}
          </div>

          {/* Duplicate row for seamless loop */}
          <div className="animate-marquee2 whitespace-nowrap flex items-center absolute top-0">
            {brands.map((brand) => (
              <div key={`${brand.id}-duplicate`} className="mx-4">
                <button className="text-sm px-6 py-3 border border-gray-200 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow duration-300 outline-none">
                  {brand.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
