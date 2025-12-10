export default function CollectionsLoading() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <div className="h-10 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}