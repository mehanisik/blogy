
import { useNavigate } from "@tanstack/react-router"

interface ErrorProps {
  error?: Error | null
  resetErrorBoundary?: () => void
}

export default function Error({ error, resetErrorBoundary }: ErrorProps) {
  const navigate = useNavigate()

  const goBack = () => {
    navigate({ to: "/" })
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-medium mb-4">Something went wrong</h1>

      {error && (
        <p className="text-gray-700 mb-6 text-sm border-l-2 border-gray-300 pl-3">
          {error.message || "An unexpected error occurred"}
        </p>
      )}

      <div className="flex gap-4">
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50"
          >
            Try again
          </button>
        )}

        <button onClick={goBack} className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
          Go to homepage
        </button>
      </div>
    </div>
  )
}
