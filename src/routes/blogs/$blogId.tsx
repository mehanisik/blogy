import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/blogs/$blogId')({
  loader: async ({ params }) => {
    return fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.blogId}`,
    ).then((r) => r.json())
  },
  component: PostComponent,
})

function PostComponent() {
  const post = Route.useLoaderData()

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  )
}
