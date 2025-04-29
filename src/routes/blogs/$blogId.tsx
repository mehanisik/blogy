"use client"

import { getBlogById } from "@/services"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/blogs/$blogId")({
  loader: ({ params }) => ({
    blogQuery: {
      queryKey: ["blog", params.blogId],
      queryFn: () => getBlogById(Number.parseInt(params.blogId)),
    },
  }),
  component: BlogPostPage,
})

function BlogPostPage() {
  const { blogQuery } = Route.useLoaderData()
  const { data: post, isLoading, isError } = useQuery(blogQuery)

  if (isLoading) {
    return <div className="py-8 text-center">Loading blog post...</div>
  }

  if (isError || !post) {
    return notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <main className="flex flex-col gap-10">
      <article className="mt-8">
        <Link to="/blogs" className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block">
          ← Back to all posts
        </Link>

        <h1 className="text-3xl font-serif font-bold tracking-tight mt-4 mb-3">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {formatDate(post.date)} • by {post.author}
          {post.tags && (
            <span>
              {post.tags.map((tag) => tag.trim())
                .join(", ")}
            </span>
          )}
        </p>

        <div className="prose prose-gray max-w-none">
          <div className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </div>
      </article>
    </main>
  )
}
