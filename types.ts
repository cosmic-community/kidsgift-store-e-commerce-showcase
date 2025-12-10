// Base Cosmic object interface
interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Product type with properly typed metadata
export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    product_name: string
    description: string
    price: number
    product_images?: Array<{
      url: string
      imgix_url: string
    }>
    age_range?: string
    in_stock: boolean
    collections?: Collection[]
  }
}

// Collection type with properly typed metadata
export interface Collection extends CosmicObject {
  type: 'collections'
  metadata: {
    collection_name: string
    description?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
  }
}

// Review type with properly typed metadata
export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    customer_name: string
    rating: {
      key: '1' | '2' | '3' | '4' | '5'
      value: '1 Star' | '2 Stars' | '3 Stars' | '4 Stars' | '5 Stars'
    }
    review_text: string
    product: Product
    verified_purchase: boolean
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Type guards for runtime validation
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products'
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections'
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews'
}