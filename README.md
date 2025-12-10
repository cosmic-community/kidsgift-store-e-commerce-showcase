# KidsGift Store - E-Commerce Showcase

![App Preview](https://imgix.cosmicjs.com/687e9b50-d5b5-11f0-9863-27fda22f5ed2-photo-1587654780291-39c9404d746b-1765363556090.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce showcase for kids' gifting products built with Next.js 16, Tailwind CSS, and Cosmic CMS. Features dynamic product catalogs, curated collections, and customer reviews.

## Features

- 🛍️ **Product Catalog** - Browse all kids' products with detailed information
- 🎁 **Collections** - Explore themed product collections (Birthday Gifts, Educational Toys, Creative Play)
- ⭐ **Customer Reviews** - Read authentic customer feedback with star ratings
- 📱 **Responsive Design** - Perfect experience on mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful interface with smooth animations and hover effects
- 🚀 **Fast Performance** - Server-side rendering with Next.js 16 App Router
- 🔄 **Real-time Content** - Dynamic content updates from Cosmic CMS

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6939479029f51b74cc1d2626&clone_repository=693950fe29f51b74cc1d2693)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with kids ifting products, collections, and customer reviews"

### Code Generation Prompt

> Based on the content model I created for "Design a content model for an e-commerce store with kids ifting products, collections, and customer reviews", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account and bucket with the required content model

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Products with Collections

```typescript
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes nested collection data

return products as Product[]
```

### Fetching a Single Product with Reviews

```typescript
const product = await cosmic.objects
  .findOne({ type: 'products', slug })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get reviews for this product
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': product.object.id 
  })
  .depth(1)
```

### Fetching Collections

```typescript
const { objects: collections } = await cosmic.objects
  .find({ type: 'collections' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(0)

return collections as Collection[]
```

## Cosmic CMS Integration

This application integrates with three main Cosmic object types:

### Products
- Product Name (text)
- Description (html-textarea)
- Price (number)
- Product Images (files)
- Age Range (text)
- In Stock (switch)
- Collections (objects - multiple)

### Collections
- Collection Name (text)
- Description (textarea)
- Featured Image (file)

### Reviews
- Customer Name (text)
- Rating (select-dropdown: 1-5 Stars)
- Review Text (textarea)
- Product (object - single)
- Verified Purchase (switch)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage with featured products
│   ├── products/
│   │   ├── page.tsx          # Products listing
│   │   └── [slug]/page.tsx   # Product detail page
│   ├── collections/
│   │   ├── page.tsx          # Collections listing
│   │   └── [slug]/page.tsx   # Collection detail page
│   └── layout.tsx            # Root layout with navigation
├── components/
│   ├── ProductCard.tsx       # Product display component
│   ├── CollectionCard.tsx    # Collection display component
│   ├── ReviewCard.tsx        # Review display component
│   ├── Header.tsx            # Site header/navigation
│   ├── Footer.tsx            # Site footer
│   └── CosmicBadge.tsx       # Cosmic branding badge
├── lib/
│   └── cosmic.ts             # Cosmic SDK configuration
└── types.ts                  # TypeScript type definitions
```

## Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

<!-- README_END -->