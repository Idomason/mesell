import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import FeaturedProducts from "@/components/product/FeaturedProducts";
import Quote from "@/components/Quote";
import NewArrivals from "@/components/product/new-arrivals/NewArrivals";
import Trending from "@/components/product/trending/Trending";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Brands />
      <FeaturedProducts />
      <NewArrivals />
      <Trending />
      <Quote />
    </div>
  );
}
