import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useScrollAnimation } from "../hooks/useScrollAnimation"
import { worksData } from "../data/works"

export function WorksSummarySection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  
  // 런칭 가능한 작품만 표시 (최대 3개)
  const featuredWorks = worksData.filter(work => work.statusKey === "works.launchable").slice(0, 3)

  return (
    <section 
      id="works"
      ref={ref}
      className={`py-16 sm:py-24 md:py-32 px-4 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-medium rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
            {t("works.title")}
          </span>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.3] mb-6">
            {t("works.subtitle")}
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredWorks.map((work) => {
            const title = t(work.titleKey)
            const category = t(work.categoryKey)
            const description = t(work.descriptionKey)

            return (
              <Link
                key={work.slug}
                to={`/works/${work.slug}`}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col border border-gray-100">
                  <div className={`${work.imageClass} aspect-square flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-gray-600">{title}</span>
                  </div>
                  <div className="p-6 space-y-3 flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category}</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800">
                        {t("works.launchable")}
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
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors group"
          >
            <span className="text-base md:text-lg font-medium border-b border-gray-900 pb-1 group-hover:border-gray-700">
              {t("works.viewAll") || "모든 작품 보기"}
            </span>
            <ArrowRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

