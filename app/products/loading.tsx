export default function ProductsLoading() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <div className="h-10 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}