"use client";

import { useState } from "react";
import Reviews from "../common/review/Reviews";
import RatingOverview from "../common/ratings/RatingOverview";
import BrandDetails from "../common/brand-details/BrandDetails";
import Description from "../common/product/Description";
import History from "../common/product/History";
import UsageGuide from "../common/product/UsageGuide";

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
          <div className="flex items-center">
            {["description", "reviews", "history", "usage guide"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => handleShowDetail(item)}
                  className={`py-1 -mb-0.5 px-2 md:px-5 capitalize font-medium hover:text-primary-500 transition-all duration-300 ease-in-out ${
                    showDetail === item
                      ? "border-b-2 border-primary text-primary bg-gradient-to-t from-primary-100 to-transparent"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <hr className="h-0.5 bg-black/25" />
          <div className="px-2 md:px-8 py-10 bg-white">
            {showDetail === "description" && <Description />}

            {showDetail === "reviews" && <Reviews />}

            {showDetail === "history" && <History />}

            {showDetail === "usage guide" && <UsageGuide />}
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
