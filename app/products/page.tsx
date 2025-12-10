import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'All Products - KidsGift Store',
  description: 'Browse our complete collection of toys and gifts for children.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          All Products
        </h1>
        <p className="text-xl text-gray-600">
          Discover our complete collection of toys and gifts for children of all ages.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}