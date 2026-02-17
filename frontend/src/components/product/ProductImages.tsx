import Image from "next/image";

export default function ProductImages({ images }: { images: string[] }) {
  return (
    <div className="flex md:flex-col gap-2 px-2 py-4">
      <div className=" w-fit cursor-pointer rounded  transition-all hover:scale-105 duration-300 ease-in-out ">
        <Image
          className="h-12 w-auto shadow rounded object-cover hover:shadow-md hover:ring-2 hover:ring-primary-500"
          src={"/images/mesell-advert-1.png"}
          width={250}
          height={250}
          alt={`${"ene-adanu"}-store/${"ankle-shoe"}`}
        />
      </div>
      <div className="w-fit cursor-pointer  transition-all hover:scale-105 duration-300 ease-in-out ">
        <Image
          className="h-12 w-auto shadow rounded object-cover hover:ring-2 hover:ring-primary-500 hover:shadow-md"
          src={"/images/mesell-advert-1.png"}
          width={250}
          height={250}
          alt={`${"ene-adanu"}-store/${"ankle-shoe"}`}
        />
      </div>
      <div className=" w-fit cursor-pointer rounded  transition-all hover:scale-105 duration-300 ease-in-out ">
        <Image
          className="h-12 w-auto shadow rounded object-cover hover:ring-2 hover:ring-primary-500 hover:shadow-md"
          src={"/images/mesell-advert-1.png"}
          width={250}
          height={250}
          alt={`${"ene-adanu"}-store/${"ankle-shoe"}`}
        />
      </div>
      <div className=" w-fit cursor-pointer rounded  transition-all hover:scale-105 duration-300 ease-in-out ">
        <Image
          className="h-12 w-auto shadow rounded object-cover hover:shadow-md hover:ring-2 hover:ring-primary-500"
          src={"/images/mesell-advert-1.png"}
          width={250}
          height={250}
          alt={`${"ene-adanu"}-store/${"ankle-shoe"}`}
        />
      </div>
      <div className=" w-fit cursor-pointer rounded  transition-all hover:scale-105 duration-300 ease-in-out ">
        <Image
          className="h-12 w-auto shadow rounded object-cover hover:shadow-md hover:ring-2 hover:ring-primary-500"
          src={"/images/mesell-advert-1.png"}
          width={250}
          height={250}
          alt={`${"ene-adanu"}-store/${"ankle-shoe"}`}
        />
      </div>
    </div>
  );
}
