import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/publications")({
  component: PublicationsPage,
})

function PublicationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-8">Publications</h1>

      <div className="space-y-8">
        {publications.map((publication, index) => (
          <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
            <h2 className="text-lg font-medium">{publication.title}</h2>
            <p className="text-sm text-gray-500 mt-1 mb-2">
              {publication.authors} • {publication.date} • {publication.journal}
            </p>
            <p className="text-gray-700 text-sm">{publication.abstract}</p>
            <div className="mt-2">
              <a href={publication.doi} className="text-sm text-blue-600 mr-4">
                DOI
              </a>
              <a href={publication.pdf} className="text-sm text-blue-600">
                PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const publications = [
  {
    title: "Advances in Modern Web Development Frameworks",
    authors: "J. Doe, J. Smith",
    date: "2023",
    journal: "Journal of Web Technologies",
    abstract: "This paper explores the latest advancements in web development frameworks.",
    doi: "#",
    pdf: "#",
  },
  {
    title: "Optimizing React Applications with TanStack Query",
    authors: "J. Smith, M. Brown",
    date: "2022",
    journal: "React Development Journal",
    abstract: "An analysis of data fetching patterns in React applications using TanStack Query.",
    doi: "#",
    pdf: "#",
  },
  {
    title: "The Evolution of CSS: From Tables to Tailwind",
    authors: "R. Johnson, S. Williams",
    date: "2023",
    journal: "Frontend Development Quarterly",
    abstract:
      "This research traces the evolution of CSS methodologies from early web development to modern frameworks.",
    doi: "#",
    pdf: "#",
  },
]
