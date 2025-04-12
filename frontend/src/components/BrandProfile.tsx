import {
  Calendar,
  ChevronLeftCircle,
  ChevronRightCircle,
  Clock,
  Ellipsis,
  MapPin,
  Plus,
  Share2,
  Users,
  Verified,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { customers } from "@/data/customer";
import Link from "next/link";

export default function BrandProfile() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col gap-8 relative">
        {/* First section */}
        <div className="container mx-auto px-4 max-w-7xl rounded flex gap-4 w-full">
          <div className="border border-gray-100 rounded w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full h-48 relative overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={"/images/mesell-brand-banner.avif"}
                width={1200}
                height={192}
                alt="Mesell Banner"
                priority
              />
            </div>
            <div className="p-4 pt-10 lg:pt-20 flex flex-col w-full">
              <div className="flex flex-wrap gap-4 justify-between px-4">
                <div className="flex justify-between space-x-4 md:space-x-0 md:w-1/3 py-8">
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold">
                      ISHA STEPS
                    </h2>
                    <small className="text-neutral-500 inline-block py-4 tracking-wide">
                      Footwears
                    </small>
                  </div>

                  <div>
                    <span className="inline-flex">
                      <strong className="text-primary font-semibold tracking-wide">
                        Verified
                      </strong>
                      <Verified
                        size={24}
                        className="fill-accent text-accent-foreground"
                      />
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-around gap-4 -mt-8">
                  <div className="place-self-center">
                    <Ellipsis size={25} className="text-neutral-300" />
                  </div>
                  <div>
                    <Button className="bg-primary-100 px-4 py-1.5 text-primary hover:text-primary-foreground">
                      <Share2
                        size={24}
                        className="text-primary hover:text-primary-foreground"
                      />
                      <strong>Share</strong>
                    </Button>
                  </div>
                  <div>
                    <Button className="bg-primary text-primary-foreground px-4 py-1.5">
                      <Plus size={24} className="text-primary-foreground" />
                      <strong>Follow</strong>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
                  <div className="flex flex-col  justify-between py-4">
                    <div className="flex items-center space-x-4">
                      <div className="leading-relaxed text-neutral-500 flex items-center justify-center space-x-2 mb-2">
                        <MapPin size={20} className="text-accent" />{" "}
                        <span>Lagos,</span>
                        <strong className="text-semibold tracking-wide leading-relaxed">
                          NIGERIA
                        </strong>
                      </div>
                    </div>
                    <div className="flex items-center space-y-2">
                      <div className="leading-relaxed text-neutral-500 flex items-center justify-center space-x-2">
                        <Users size={20} className="text-accent" />{" "}
                        <span>50 - 100 Employees</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between py-4">
                    <div className="flex items-center space-y-2">
                      <div className="flex items-center space-x-2 justify-center">
                        <Calendar size={20} className="text-accent" />{" "}
                        <span className="leading-relaxed text-neutral-500">
                          Mondays - Fridays
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-y-2">
                      <div className="flex items-center space-x-2 justify-center">
                        <Clock size={20} className="text-accent" />{" "}
                        <span className="leading-relaxed text-neutral-500">
                          Opening: 08:00AM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 py-4 md:place-self-end">
                    <p className="font-medium font-sans text-neutral-500">
                      <strong>500</strong> Followers
                    </p>
                    <div>
                      <div className="flex items-center justify-center -space-x-2">
                        {customers.map((customer) => (
                          <div
                            key={customer.id}
                            className="h-8 w-8 rounded-full overflow-hidden border border-primary  z-10"
                          >
                            <Image
                              className="w-full h-auto object-cover"
                              src={customer.image}
                              width={32}
                              height={32}
                              alt="People following the brand"
                            />
                          </div>
                        ))}
                        <div className="h-8 w-8 rounded-full bg-neutral-500  overflow-hidden flex items-center justify-center">
                          <span className="text-primary-foreground">+9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="h-24 w-24 lg:h-32 lg:w-32 border-4 border-primary-foreground shadow-sm overflow-hidden rounded-full absolute top-48 left-16">
          <Image
            className="w-full h-full object-cover"
            src={"/images/customers/mesell-customer-4.png"}
            width={128}
            height={128}
            alt="Brand Owner Profile Image"
          />
        </div>

        {/* Second Section */}
        <div className="container mx-auto px-4 py-1 max-w-7xl rounded sm:flex gap-4">
          {/* First Row */}
          <div className="flex flex-col gap-3 w-full">
            <div className="border border-gray-100 p-8 rounded sm:mb-4">
              <div>
                <h2 className="text-xl font-bold mb-3 text-primary">
                  About Us
                </h2>
                <p className="text-neutral-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quisquam, quos.
                </p>
                <div className="py-4">
                  <h2 className="text-xl font-bold mb-3 text-primary">
                    Why choosing us
                  </h2>
                  <div>
                    <p>
                      <span>-</span> <span>Lorem ipsum dolor sit amet</span>
                    </p>
                    <p>
                      <span>-</span>{" "}
                      <span>Lorem ipsum dolor sit amet consectetur amet</span>
                    </p>
                    <p>
                      <span>-</span>{" "}
                      <span>Lorem ipsum dolor sit amet consectetur</span>
                    </p>
                    <p>
                      <span>-</span>{" "}
                      <span>Lorem ipsum dolor sit amet consectetur</span>
                    </p>
                    <p>
                      <span>-</span>{" "}
                      <span>Lorem ipsum dolor sit amet consectetur</span>
                    </p>
                  </div>
                </div>
                <div className="p-4 mt-8 font-semibold tracking-widest text-xs uppercase text-primary text-center ">
                  READ MORE
                </div>
              </div>
            </div>
            <div className="border border-gray-100 p-4 rounded">
              <div className="">
                <div className="flex  justify-between mb-2">
                  <h2 className="text-lg tracking-wide font-bold text-primary">
                    Life at Isha Steps
                  </h2>
                  <div className="flex items-center justify-center">
                    <ChevronLeftCircle
                      size={24}
                      className="text-accent-foreground fill-accent hover:cursor-pointer"
                    />
                    <ChevronRightCircle
                      size={24}
                      className="text-accent-foreground fill-accent hover:cursor-pointer"
                    />
                  </div>
                </div>
                <div className="relative flex overflow-x-hidden">
                  <div className="animate-marquee whitespace-nowrap flex gap-4">
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-0.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-1.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-2.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-3.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-0.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-1.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-2.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                    <Image
                      className="w-48 h-48 object-cover rounded-md shadow inline-block"
                      src={"/images/mesell-3.png"}
                      width={192}
                      height={192}
                      alt="Image from brand workstation"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 rounded">
              <div className="container mx-auto px-4">
                <h2 className="text-xl tracking-wide font-bold text-primary py-4">
                  Latest Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                  <div className="flex flex-col lg:flex-row overflow-hidden rounded-md ring-1 ring-primary-100 bg-primary-100">
                    <Image
                      className="h-40 w-full lg:w-40 object-cover"
                      src={"/images/mesell-0.png"}
                      width={192}
                      height={192}
                      alt="Latest Product Image"
                    />
                    <div className="flex flex-col gap-2 py-2 px-4">
                      <h2 className="text-lg font-bold text-primary">
                        Laddies Shoes
                      </h2>
                      <p className="text-neutral-500 text-xs md:text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quos.
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-primary">
                          <strong>N10,000</strong>
                        </p>
                        <Button className="bg-primary text-primary-foreground px-4 py-1.5 text-xs md:text-sm">
                          View Product
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row overflow-hidden rounded-md ring-1 ring-primary-100 bg-primary-100">
                    <Image
                      className="h-40 w-full lg:w-40 object-cover"
                      src={"/images/mesell-0.png"}
                      width={192}
                      height={192}
                      alt="Latest Product Image"
                    />
                    <div className="flex flex-col gap-2 py-2 px-4">
                      <h2 className="text-lg font-bold text-primary">
                        Laddies Shoes
                      </h2>
                      <p className="text-neutral-500 text-xs md:text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quos.
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-primary">
                          <strong>N10,000</strong>
                        </p>
                        <Button className="bg-primary text-primary-foreground px-4 py-1.5 text-xs md:text-sm">
                          View Product
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row overflow-hidden rounded-md ring-1 ring-primary-100 bg-primary-100">
                    <Image
                      className="h-40 w-full lg:w-40 object-cover"
                      src={"/images/mesell-0.png"}
                      width={192}
                      height={192}
                      alt="Latest Product Image"
                    />
                    <div className="flex flex-col gap-2 py-2 px-4">
                      <h2 className="text-lg font-bold text-primary">
                        Laddies Shoes
                      </h2>
                      <p className="text-neutral-500 text-xs md:text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quos.
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-primary">
                          <strong>N10,000</strong>
                        </p>
                        <Button className="bg-primary text-primary-foreground px-4 py-1.5 text-xs md:text-sm">
                          View Product
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row overflow-hidden rounded-md ring-1 ring-primary-100 bg-primary-100">
                    <Image
                      className="h-40 w-full lg:w-40 object-cover"
                      src={"/images/mesell-0.png"}
                      width={192}
                      height={192}
                      alt="Latest Product Image"
                    />
                    <div className="flex flex-col gap-2 py-2 px-4">
                      <h2 className="text-lg font-bold text-primary">
                        Laddies Shoes
                      </h2>
                      <p className="text-neutral-500 text-xs md:text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quos.
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-primary">
                          <strong>N10,000</strong>
                        </p>
                        <Button className="bg-primary text-primary-foreground px-4 py-1.5 text-xs md:text-sm">
                          View Product
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Link to this particular Brand Products */}
                <div className="flex items-center justify-center py-6">
                  <Link
                    href={"#"}
                    className="text-sm font-semibold text-primary tracking-wider text-center hover:underline transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    View all products
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col gap-4 w-full flex-1 mt-3 sm:mt-0">
            <div className="border border-gray-100 p-8 rounded flex-1">
              <h2 className="text-2xl font-bold mb-4">Brand Name</h2>
            </div>
            <div className="border border-gray-100 p-8 rounded">
              <h2 className="text-2xl font-bold mb-4">Brand Name</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
