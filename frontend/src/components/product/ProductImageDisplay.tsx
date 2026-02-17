import Image from "next/image";

export default function ProductImageDisplay({ image }: { image: string }) {
  return (
    <div className="relative my-4 rounded-sm overflow-hidden">
      {/* Product background image */}
      <Image
        className="px-2 md:px-0 w-full h-full object-cover shadow-xl"
        src="/images/product/bg-canva.webp"
        width={250}
        height={250}
        alt="bg-canva"
      />

      {/* Actual product image */}
      <Image
        className="h-auto w-48 md:h-auto md:w-96 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        // src="https://cdn.pixabay.com/photo/2016/10/02/17/32/basket-1710068_640.png"
        src={image}
        width={400}
        height={400}
        alt="African Basket"
      />
    </div>
  );
}
