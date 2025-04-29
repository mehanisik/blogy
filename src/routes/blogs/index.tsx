import { getBlogs } from "@/services"
import type { Blog } from "@/types/blog"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"


export const Route = createFileRoute("/blogs/")({
  loader: () => ({
    blogsQuery: {
      queryKey: ["blogs"],
      queryFn: getBlogs,
    },
  }),
  component: BlogPage,
})

function BlogPage() {
  const { blogsQuery } = Route.useLoaderData()
  const { data: blogs = [], isLoading, isError } = useQuery(blogsQuery)

  if (isLoading) {
    return <div className="py-8 text-center">Loading blog posts...</div>
  }

  if (isError) {
    return <div className="py-8 text-center">Error loading blog posts. Please try again later.</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const createExcerpt = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return `${content.substring(0, maxLength)}...`
  }

  return (
    <main className="flex flex-col gap-10">
      <section className="mt-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight mb-6">Blog</h1>

        {blogs.length === 0 ? (
          <p className="text-gray-500">No blog posts found.</p>
        ) : (
          <div className="space-y-8">
            {blogs.map((post: Blog) => (
              <article key={post.id} className="border-b border-gray-100 pb-6">
                <h2 className="text-xl font-serif font-semibold mb-2">
                  <Link to={"/blogs/$blogId"} params={{ blogId: post.id.toString() }} className="hover:text-gray-700">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {formatDate(post.date)} • by {post.author}
                  {post.tags && (
                    <span>
                      {post.tags
                        .map((tag) => tag.trim())
                        .join(", ")}
                    </span>
                  )}
                </p>
                <p className="text-base text-gray-700 mb-4">{createExcerpt(post.content)}</p>
                <Link
                  to={"/blogs/$blogId"}
                  params={{ blogId: post.id.toString() }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  [ Read More ]
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
