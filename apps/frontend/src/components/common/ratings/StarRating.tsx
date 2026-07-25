import { StarIcon } from "lucide-react";

export default function StarDisplay({ rating = 4.5, max = 5, size = 20 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarIcon
          key={i}
          size={size}
          className="text-orange-500 fill-orange-500"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative w-5 h-5 flex justify-center">
          {/* Outline star */}
          <StarIcon size={size} className="text-orange-500" />

          {/* Filled half */}
          <StarIcon
            size={size}
            className="text-orange-500 fill-orange-500 absolute -left-.5 top-.5 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: max - fullStars - (hasHalfStar ? 1 : 0) }).map(
        (_, i) => (
          <StarIcon key={`empty-${i}`} size={size} className="text-gray-300" />
        )
      )}

      {/* Rating number */}
      <strong className="text-orange-500 font-medium text-xs ml-1">
        {rating}
      </strong>
    </div>
  );
}
