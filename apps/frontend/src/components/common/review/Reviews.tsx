import Image from "next/image";
import StarRating from "../ratings/StarRating";

export default function Reviews() {
  return (
    <div className="">
      {[...Array(5)].map((_, ndx) => (
        <Review key={ndx} />
      ))}
    </div>
  );
}

function Review() {
  return (
    <div className="w-full flex gap-4 mb-5">
      <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary-500">
        <Image
          src="/images/customers/mesell-customer-1.png"
          width={48}
          height={48}
          alt="Sarah Johnson"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Adeyi Ochoche</h3>
            <p className="text-sm text-gray-500">Verified Buyer</p>
          </div>
          <div className="flex gap-1 mt-1">
            <StarRating size={14} />
          </div>
        </div>
        <p className="mt-2 text-gray-600 text-sm">
          <q>
            The quality of these shoes is exceptional! I&apos;ve been wearing
            them for months and they still look brand new. The comfort level is
            unmatched.
          </q>
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-500">2 days ago</span>
          <span className="text-xs text-primary">Helpful (24)</span>
        </div>
      </div>
    </div>
  );
}
