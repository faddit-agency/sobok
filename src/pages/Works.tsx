import { ArrowRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { Link } from "react-router-dom"
import { worksData } from "../data/works"
import { useMetaTags } from "../hooks/useMetaTags"

export function Works() {
  const { t } = useLanguage()
  
  useMetaTags({
    title: `${t("works.title")} | 소복`,
    description: t("works.subtitle"),
    image: "/og-works.jpg",
    url: "/works",
    type: "website"
  })

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("works.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("works.subtitle")}
          </p>
        </section>

        {/* Works Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {worksData.filter((work) => work.company === "설아래").map((work) => {
            const title = t(work.titleKey)
            const category = t(work.categoryKey)
            const description = t(work.descriptionKey)
            const status = t(work.statusKey)

            return (
              <Link
                key={work.slug}
                to={`/works/${work.slug}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    {work.heroImage ? (
                      <img
                        src={work.heroImage}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`${work.imageClass} w-full h-full flex items-center justify-center`}>
                        <span className="text-2xl font-bold text-gray-600">{title}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-3 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category}</span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          work.statusKey === "works.launchable"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {status}
                      </span>
                  </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-gray-600 text-sm flex-1">{description}</p>
                  <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                    {t("works.more")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
              </Link>
            )
          })}
        </section>
      </div>
    </main>
  )
}

