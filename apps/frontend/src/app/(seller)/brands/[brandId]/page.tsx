import BrandProfile from "@/components/BrandProfile";
import { brands } from "@/data/brands";

export default async function page({ params }: any) {
  const { brandId } = await params;
  const brand = brands.find((brand) => brand.id === +brandId);

  if (!brand) {
    return <div>No brand found </div>;
  }

  return (
    <section>
      <BrandProfile brand={brand} />
    </section>
  );
}
