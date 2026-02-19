"use client";

import { useState } from "react";
import Reviews from "../common/review/Reviews";
import RatingOverview from "../common/ratings/RatingOverview";
import BrandDetails from "../common/brand-details/BrandDetails";

export default function ProductOverview() {
  const [showDetail, setShowDetail] = useState("description");

  const handleShowDetail = function (detail: string) {
    setShowDetail(detail);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] justify-between bg-white">
        <div className="py-3">
          <hr className="h-0.5 bg-black/25" />
          <div className="flex items-center overflow-x-scroll">
            {["description", "reviews", "history", "guide"].map((item) => (
              <button
                key={item}
                onClick={() => handleShowDetail(item)}
                className={`py-1.5 -mb-0.5 px-5 capitalize font-medium hover:text-primary-500 transition-all duration-300 ease-in-out ${
                  showDetail === item
                    ? "border-b-2 border-primary-500 text-primary-500"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <hr className="h-0.5 bg-black/25" />
          <div className="px-2 md:px-8 py-10 bg-white">
            {showDetail === "description" && (
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                velit! Illo minus iusto nihil fugiat, error aperiam quis
                aspernatur voluptas quasi sed tempore reprehenderit enim ex quae
                hic perferendis harum ad rem, non debitis vero! Cumque sunt
                adipisci error deserunt. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Fugit, velit! Illo minus iusto nihil fugiat,
                error aperiam quis aspernatur voluptas quasi sed tempore
                reprehenderit enim ex quae hic perferendis harum ad rem, non
                debitis vero! Cumque sunt adipisci error deserunt. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Fugit, velit! Illo
                minus iusto nihil fugiat, error aperiam quis aspernatur voluptas
                quasi sed tempore reprehenderit enim ex quae hic perferendis
                harum ad rem, non debitis vero! Cumque sunt adipisci error
                deserunt. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Fugit, velit! Illo minus iusto nihil fugiat, error aperiam
                quis aspernatur voluptas quasi sed tempore reprehenderit enim ex
                quae hic perferendis harum ad rem, non debitis vero! Cumque sunt
                adipisci error deserunt.
              </p>
            )}

            {showDetail === "reviews" && <Reviews />}
          </div>
        </div>

        {/* Second */}
        <div className="px-2 md:px-4 py-3">
          <div className="flex flex-col space-y-2">
            <BrandDetails />
            <RatingOverview />
          </div>
        </div>
      </div>
    </div>
  );
}
