import { Button } from "../components/ui/button"
import { ExternalLink, ArrowRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export function Works() {
  const { t } = useLanguage()
  const works = [
    {
      title: t("works.brand.milkdive"),
      category: t("works.category.skincare"),
      description: t("works.desc.milkdive"),
      status: t("works.launchable"),
      image: "bg-gradient-to-br from-blue-100 to-purple-100"
    },
    {
      title: t("works.brand.puresource"),
      category: t("works.category.derma"),
      description: t("works.desc.puresource"),
      status: t("works.launchable"),
      image: "bg-gradient-to-br from-green-100 to-teal-100"
    },
    {
      title: t("works.brand.blankpalette"),
      category: t("works.category.makeup"),
      description: t("works.desc.blankpalette"),
      status: t("works.preparing"),
      image: "bg-gradient-to-br from-pink-100 to-rose-100"
    },
    {
      title: t("works.brand.wanderlust"),
      category: t("works.category.bodycare"),
      description: t("works.desc.wanderlust"),
      status: t("works.preparing"),
      image: "bg-gradient-to-br from-yellow-100 to-orange-100"
    },
    {
      title: t("works.brand.phaserush"),
      category: t("works.category.skincare"),
      description: t("works.desc.phaserush"),
      status: t("works.preparing"),
      image: "bg-gradient-to-br from-indigo-100 to-blue-100"
    },
    {
      title: t("works.brand.squeelzy"),
      category: t("works.category.makeup"),
      description: t("works.desc.squeelzy"),
      status: t("works.preparing"),
      image: "bg-gradient-to-br from-purple-100 to-pink-100"
    }
  ]

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
          {works.map((work, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`aspect-square ${work.image} flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-gray-600">{work.title}</span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{work.category}</span>
                    {work.status === t("works.launchable") && (
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {work.status}
                      </span>
                    )}
                    {work.status === t("works.preparing") && (
                      <span className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                        {work.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{work.title}</h3>
                  <p className="text-gray-600 text-sm">{work.description}</p>
                  <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                    {t("works.more")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">{t("works.cta.title")}</h2>
          <p className="text-lg text-gray-600 mb-8">
            {t("works.cta.desc")}
          </p>
          <Button size="lg" asChild>
            <a href="/lineup">
              {t("works.cta.button")}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </section>
      </div>
    </main>
  )
}

