import { getPublications } from "@/services"
import type { Publication } from "@/types/publication"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/publications")({
  loader: () => ({
    publicationsQuery: {
      queryKey: ["publications"],
      queryFn: getPublications,
    },
  }),
  component: PublicationsPage,
})

function PublicationsPage() {
  const { publicationsQuery } = Route.useLoaderData()
  const { data: publications = [], isLoading, isError } = useQuery(publicationsQuery)

  if (isLoading) {
    return <div className="py-8 text-center">Loading publications...</div>
  }

  if (isError) {
    return <div className="py-8 text-center">Error loading publications. Please try again later.</div>
  }

  return (
    <main className="flex flex-col gap-10">
      <section className="mt-8">
        <h1 className="text-3xl font-serif font-bold tracking-tight mb-6">Publications</h1>

        {publications.length === 0 ? (
          <p className="text-gray-500">No publications found.</p>
        ) : (
          <div className="space-y-8">
            {publications.map((publication: Publication) => (
              <article key={publication.id} className="border-b border-gray-100 pb-6">
                <h2 className="text-xl font-serif font-semibold mb-2">{publication.title}</h2>
                <p className="text-sm text-gray-500 mb-3">
                  {publication.journal} • {publication.date}
                </p>
                <p className="text-base text-gray-700 mb-4">{publication.abstract}</p>
                <div className="flex gap-4">
                  {publication.doi && (
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      [ DOI ]
                    </a>
                  )}
                  {publication.pdf && (
                    <a
                      href={publication.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      [ PDF ]
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
