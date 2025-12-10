// app/collections/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCollection, getCollections, getProductsByCollection } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export async function generateStaticParams() {
  const collections = await getCollections()
  
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug)
  
  if (!collection) {
    return {
      title: 'Collection Not Found',
    }
  }
  
  return {
    title: `${collection.metadata.collection_name} - KidsGift Store`,
    description: collection.metadata.description,
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug)
  
  if (!collection) {
    notFound()
  }

  const products = await getProductsByCollection(collection.id)

  return (
    <div className="container-custom py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/collections" className="hover:text-primary">Collections</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{collection.metadata.collection_name}</span>
      </nav>

      {/* Collection Header */}
      <div className="mb-12">
        {collection.metadata.featured_image && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={`${collection.metadata.featured_image.imgix_url}?w=2400&h=600&fit=crop&auto=format,compress`}
              alt={collection.metadata.collection_name}
              className="w-full h-64 object-cover"
              width={1200}
              height={300}
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          {collection.metadata.collection_name}
        </h1>
        
        {collection.metadata.description && (
          <p className="text-xl text-gray-600">
            {collection.metadata.description}
          </p>
        )}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">No products in this collection yet.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} in this collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}