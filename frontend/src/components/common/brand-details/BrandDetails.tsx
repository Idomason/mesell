import { Dot, Star } from "lucide-react";
import Link from "next/link";
import { FaStore } from "react-icons/fa";

export default function BrandDetails() {
  return (
    <div className="w-full flex flex-col gap-4 border border-gray-200 rounded-md">
      <div className="w-full flex items-center gap-2.5 p-3">
        <div className="p-2 bg-accent rounded-md">
          <FaStore
            size={40}
            className="fill text-accent-700 stroke-accent-700"
          />
        </div>
        <div className="flex flex-col">
          <strong className="font-semibold text-primary">Isha Steps LLC</strong>
          <div className="flex items-center text-xs text-gray-500">
            <Star size={16} className="fill-amber-400 stroke-none mr-1" />
            <span>4.2</span> <Dot />{" "}
            <span>
              <strong className="mr-1">1290</strong> items sold
            </span>
          </div>
        </div>
      </div>
      <div className="w-full px-3 mb-3 -mt-4">
        <Link
          href={"/brand"}
          className="px-6 py-1 block text-sm w-full font-medium text-center text-gray-700 border border-gray-200 rounded-md"
        >
          Seller's Profile
        </Link>
      </div>
    </div>
  );
}
