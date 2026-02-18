import { StarIcon } from "lucide-react";

type RatingProps = {
  rating: number;
  totalReviews: number;
  breakdown: Record<number, number>;
};

export default function RatingOverview({
  rating = 4.7,
  totalReviews = 458,
  breakdown = {
    5: 0.85,
    4: 0.65,
    3: 0.3,
  },
}: RatingProps) {
  // Generate star fill levels for the main rating display
  const getStarFill = (index: number) => {
    const diff = rating - index;
    if (diff >= 1) return 100;
    if (diff <= 0) return 0;
    return diff * 100;
  };

  return (
    <div className="w-full border rounded-md p-4 space-y-3">
      {/* Top: Stars + Rating Number */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} fillPercentage={getStarFill(i)} />
          ))}
        </div>
        <span className="font-semibold">{rating} out of 5</span>
      </div>

      {/* Total Reviews */}
      <div className="text-gray-500 text-sm">{totalReviews} global ratings</div>

      {/* Breakdown Bars */}
      <div className="space-y-2">
        {[5, 4, 3].map((star) => (
          <div key={star} className="flex items-center space-x-2">
            <span className="w-4 text-sm text-gray-500">{star}★</span>
            <div className="flex-1 h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-orange-400 rounded"
                style={{
                  width: `${(breakdown[star] ?? 0) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Star({ fillPercentage }: { fillPercentage: number }) {
  return (
    <div className="relative w-5 h-5">
      {/* empty star outline */}
      <StarIcon className="absolute top-0 left-0 stroke-amber-400 w-5 h-5" />

      {/* filled portion */}
      <div
        className="absolute top-0 left-0 overflow-hidden"
        style={{ width: `${fillPercentage}%` }}
      >
        <StarIcon className="fill-amber-400 stroke-none w-5 h-5" />
      </div>
    </div>
  );
}
