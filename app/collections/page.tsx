import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'

export const metadata = {
  title: 'Collections - KidsGift Store',
  description: 'Browse our curated collections of toys and gifts for children.',
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Our Collections
        </h1>
        <p className="text-xl text-gray-600">
          Discover our carefully curated collections of toys and gifts for every occasion.
        </p>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No collections found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  )
}