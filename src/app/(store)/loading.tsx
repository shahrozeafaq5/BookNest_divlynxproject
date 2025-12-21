export default function Loading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}