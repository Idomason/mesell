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
        sizes="(max-width: 768px) 100vw, 320px"
        alt="African Basket"
      />
    </div>
  );
}
