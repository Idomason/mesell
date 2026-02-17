import Link from "next/link";
import Image from "next/image";
import { brands } from "@/data/brands";
import { Verified } from "lucide-react";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

export default function page() {
  return (
    <div className="bg-slate-200 py-16">
      <div className="px-2 flex items-center justify-center max-w-6xl mx-auto">
        {/* Brands */}
        <div className="px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          <div className="bg-primary p-4 rounded-xl shadow w-full flex flex-col justify-center gap-8">
            <h1 className="font-semibold text-2xl text-white leading-relaxed tracking-wide">
              Our Highly Esteemed Brands
            </h1>
            <p className="py-2 leading-relaxed tracking-wide text-sm text-gray-50 font-semibold">
              These brands work on making Mesell the best from{" "}
              <strong className="text-yellow-200 font-bold">quality</strong> to
              fantastic
              <strong className="text-yellow-200 font-bold">
                {" "}
                creative designs
              </strong>
            </p>

            <button className="px-6 py-3 bg-primary-50 text-primary font-bold rounded-full w-fit">
              Join our brands
            </button>
          </div>
          {brands &&
            brands.length > 0 &&
            brands.map((brand) => (
              <Link
                href={`/brands/${brand.id}`}
                key={brand.id}
                className="rounded-xl shadow w-full flex flex-col bg-white border border-gray-200 gap-8 overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden h-full">
                  <Image
                    src={brand.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    alt={"Brand"}
                    className="object-cover"
                  />
                </div>
                <div className="px-4 py-2 flex justify-between mb-8">
                  <div>
                    <strong className="text-gray-700 text-lg">
                      {brand.name}
                    </strong>
                    <p className="text-gray-500 font-medium text-sm mt-1">
                      {/* Founder & CEO Isha Steps */}
                      {brand.role}
                    </p>
                    <p className="flex items-center text-primary leading-relaxed tracking-wide font-semibold text-sm mt-1">
                      {/* Founder & CEO Isha Steps */}
                      {brand.company}{" "}
                      <Verified className="ml-1 size-5 inset-1 text-success-foreground fill-accent rounded-full" />
                    </p>
                  </div>
                  <div className="flex space-x-2 items-start">
                    {/* href={brand.social.twitter || "#"} */}
                    <button>
                      <BsTwitterX
                        size={20}
                        className="text-primary hover:text-primary-600 cursor-pointer transition-all duration-300 ease-in-out"
                      />
                    </button>
                    <button>
                      <BsInstagram
                        size={20}
                        className="text-primary hover:text-primary-600 cursor-pointer transition-all duration-300 ease-in-out"
                      />
                    </button>
                    <button>
                      <BsFacebook
                        size={20}
                        className="text-primary hover:text-primary-600 cursor-pointer transition-all duration-300 ease-in-out"
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
