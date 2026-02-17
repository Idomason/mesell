import BrandProfile from "@/components/BrandProfile";
import { brands } from "@/data/brands";

export default async function page({ params }: any) {
  const { brandId } = await params;
  const brand = brands.find((brand) => brand.id === +brandId);
  return (
    <section>
      <BrandProfile brand={brand} />
    </section>
  );
}
