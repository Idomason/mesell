import Link from "next/link";
import { products } from "@/data/products";
import { ChevronRight } from "lucide-react";
import ProductImages from "@/components/product/ProductImages";
import ProductOverview from "@/components/product/ProductOverview";
import ProductDescription from "@/components/product/ProductDescription";
import ProductImageDisplay from "@/components/product/ProductImageDisplay";

type ParamsProp = {
  params: { productId: string };
};

export default async function page({ params }: ParamsProp) {
  const { productId } = await params;
  const product = products.find((product) => product.id === +productId);

  console.log("product", product);

  return (
    <section className=" bg-gray-200 font-sans">
      <div className="max-w-6xl mx-auto bg-white">
        <nav className="px-2 md:px-4 py-3 -mb-2">
          <ul className="flex items-center space-x-2 text-lg text-gray-700">
            <li className="flex items-center font-light transition-all duration-300 ease-in-out hover:font-medium hover:text-primary">
              <Link href="#">wood</Link>
            </li>
            <li className="flex items-center space-x-2 font-light transition-all duration-300 ease-in-out hover:font-medium hover:text-primary">
              <ChevronRight size={16} />
              <Link href="#">kitchen</Link>
            </li>
            <li className="flex items-center space-x-2 font-light transition-all duration-300 ease-in-out hover:font-medium hover:text-primary">
              <ChevronRight size={16} />
              <Link href="#">utensils</Link>
            </li>
            <li className="flex items-center space-x-2 text-primary font-medium transition-all duration-300 ease-in-out hover:font-medium hover:text-primary">
              <ChevronRight size={16} />
              <Link href="#">basket</Link>
            </li>
          </ul>
        </nav>
        <div className="grid md:grid-cols-[1fr_400px]">
          <div className="flex flex-col-reverse md:flex-row">
            <ProductImages images={product?.image || []} />
            <ProductImageDisplay image={product?.image || ""} />
          </div>
          <ProductDescription product={product || {}} />
        </div>
      </div>
      <ProductOverview />
    </section>
  );
}
