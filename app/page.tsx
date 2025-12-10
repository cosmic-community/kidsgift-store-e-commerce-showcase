import Link from 'next/link'
import { getProducts, getCollections } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CollectionCard from '@/components/CollectionCard'

export default async function HomePage() {
  const products = await getProducts()
  const collections = await getCollections()
  
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6)

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-primary">
          Welcome to KidsGift Store
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing toys and gifts that bring joy, learning, and creativity to children of all ages.
        </p>
      </section>

      {/* Collections Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Shop by Collection
          </h2>
          <Link 
            href="/collections"
            className="text-primary hover:text-primary-600 font-medium"
          >
            View All →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link 
            href="/products"
            className="text-primary hover:text-primary-600 font-medium"
          >
            View All Products →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-primary to-primary-400 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Find the Perfect Gift Today
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Browse our curated collections and discover toys that inspire imagination and learning.
        </p>
        <Link 
          href="/products"
          className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Shop Now
        </Link>
      </section>
    </div>
  )
}