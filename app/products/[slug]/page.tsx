// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getProducts, getReviewsByProduct } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }
  
  return {
    title: `${product.metadata.product_name} - KidsGift Store`,
    description: product.metadata.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)
  
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + parseInt(review.metadata.rating.key), 0) / reviews.length
    : 0

  const mainImage = product.metadata.product_images?.[0]

  return (
    <div className="container-custom py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{product.metadata.product_name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          {mainImage ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img 
                src={`${mainImage.imgix_url}?w=1200&h=900&fit=crop&auto=format,compress`}
                alt={product.metadata.product_name}
                className="w-full h-auto"
                width={600}
                height={450}
              />
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Image Available</span>
            </div>
          )}
          
          {/* Thumbnail Gallery */}
          {product.metadata.product_images && product.metadata.product_images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.metadata.product_images.slice(1, 5).map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img 
                    src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={`${product.metadata.product_name} ${index + 2}`}
                    className="w-full h-auto"
                    width={200}
                    height={200}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {product.metadata.product_name}
          </h1>
          
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-accent' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>

          <div className="text-4xl font-bold text-primary mb-6">
            ${product.metadata.price.toFixed(2)}
          </div>

          {product.metadata.age_range && (
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700">Age Range: </span>
              <span className="text-sm text-gray-600">{product.metadata.age_range}</span>
            </div>
          )}

          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              product.metadata.in_stock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div 
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: product.metadata.description }}
          />

          {product.metadata.collections && product.metadata.collections.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Collections:</h3>
              <div className="flex flex-wrap gap-2">
                {product.metadata.collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.slug}`}
                    className="inline-block px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm hover:bg-secondary-100 transition-colors"
                  >
                    {collection.metadata.collection_name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <button 
            disabled={!product.metadata.in_stock}
            className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.metadata.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Customer Reviews
        </h2>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}