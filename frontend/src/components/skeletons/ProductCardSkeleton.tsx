export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200" />

      <div className="p-4">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-12 bg-gray-200 rounded" />
        </div>

        <div className="h-5 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-3 w-full" />

        <div className="flex justify-between items-center mb-3">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
