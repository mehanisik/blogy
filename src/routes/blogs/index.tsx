import { createFileRoute, Link } from '@tanstack/react-router'
import { getAllPosts } from '@/services/blog'

export const Route = createFileRoute('/blogs/')({
  loader: async () => {
    return  fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  },
  component: PostsIndexComponent,
})

function PostsIndexComponent() {
  const posts = Route.useLoaderData()
  return (
    <div className="space-y-4">
     {posts.length > 0 ? posts.map((post) => (
      <div key={post.id}>
        <Link to={"/blogs/$blogId"} params={{ blogId: post.id.toString() }} className="text-lg text-blue-600 hover:underline">
          {post.title}
        </Link>
        {post.excerpt && <p className="text-gray-600">{post.excerpt}</p>}
      </div>
    )) : <p>No posts found</p>}
    </div>
  )
}
