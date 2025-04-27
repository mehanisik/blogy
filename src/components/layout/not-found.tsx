import { Link } from "@tanstack/react-router"

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center">
      <h1 className="text-2xl font-medium mb-2">404</h1>
      <p className="text-gray-700 mb-6">The page you're looking for doesn't exist.</p>

      <Link to="/" className="text-sm text-blue-600 hover:underline">
        Go back to homepage
      </Link>
    </div>
  )
}
