import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-custom py-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/"
          className="btn-primary inline-block"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}