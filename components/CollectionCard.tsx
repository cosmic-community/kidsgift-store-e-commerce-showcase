import Link from 'next/link'
import type { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="card group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {collection.metadata.featured_image ? (
          <img 
            src={`${collection.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={collection.metadata.collection_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={600}
            height={300}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
            <span className="text-4xl">🎁</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-xl mb-1">
            {collection.metadata.collection_name}
          </h3>
        </div>
      </div>
      
      {collection.metadata.description && (
        <div className="p-4">
          <p className="text-gray-600 text-sm line-clamp-2">
            {collection.metadata.description}
          </p>
        </div>
      )}
    </Link>
  )
}