import Image from "next/image";

export default function ProductImageDisplay({ image }: { image: string }) {

  return (
    <div className="my-4 rounded-sm overflow-hidden">
      {/* Product image */}
      <Image
        className="h-full w-full object-cover"
        src={image}
        width={250}
        height={250}
        alt="African Basket"
      />
    </div>
  );
}
