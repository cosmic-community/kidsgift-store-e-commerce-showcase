import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.metadata.product_images?.[0]

  return (
    <Link href={`/products/${product.slug}`} className="card group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {mainImage ? (
          <img 
            src={`${mainImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={product.metadata.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {!product.metadata.in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
          {product.metadata.product_name}
        </h3>
        
        {product.metadata.age_range && (
          <p className="text-sm text-gray-600 mb-2">
            {product.metadata.age_range}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.metadata.price.toFixed(2)}
          </span>
          
          {product.metadata.in_stock && (
            <span className="text-sm text-green-600 font-medium">
              In Stock
            </span>
          )}
        </div>

        {product.metadata.collections && product.metadata.collections.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.metadata.collections.slice(0, 2).map((collection) => (
              <span 
                key={collection.id}
                className="text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-full"
              >
                {collection.metadata.collection_name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}