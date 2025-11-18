import { Button } from "../components/ui/button"
import { ShoppingCart, Check, Star } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

export function Lineup() {
  const { t } = useLanguage()
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null)

  const lineups = [
    {
      id: 1,
      name: t("lineup.brand.milkdive"),
      description: t("lineup.desc.milkdive"),
      category: t("lineup.category.skincare"),
      price: t("lineup.launchable"),
      features: [
        t("lineup.feature1"),
        t("lineup.feature2"),
        t("lineup.feature3"),
        t("lineup.feature4")
      ],
      image: "bg-gradient-to-br from-blue-100 to-purple-100"
    },
    {
      id: 2,
      name: t("lineup.brand.puresource"),
      description: t("lineup.desc.puresource"),
      category: t("lineup.category.derma"),
      price: t("lineup.launchable"),
      features: [
        t("lineup.feature5"),
        t("lineup.feature6"),
        t("lineup.feature7"),
        t("lineup.feature8")
      ],
      image: "bg-gradient-to-br from-green-100 to-teal-100"
    },
    {
      id: 3,
      name: t("lineup.brand.blankpalette"),
      description: t("lineup.desc.blankpalette"),
      category: t("lineup.category.makeup"),
      price: t("lineup.preparing"),
      features: [
        t("lineup.feature9"),
        t("lineup.feature10"),
        t("lineup.feature11"),
        t("lineup.feature12")
      ],
      image: "bg-gradient-to-br from-pink-100 to-rose-100"
    },
    {
      id: 4,
      name: t("lineup.brand.wanderlust"),
      description: t("lineup.desc.wanderlust"),
      category: t("lineup.category.bodycare"),
      price: t("lineup.preparing"),
      features: [
        t("lineup.feature13"),
        t("lineup.feature14"),
        t("lineup.feature15"),
        t("lineup.feature16")
      ],
      image: "bg-gradient-to-br from-yellow-100 to-orange-100"
    }
  ]

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("lineup.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            {t("lineup.subtitle")}
          </p>
          <p className="text-lg text-gray-500">
            {t("lineup.desc")}
          </p>
        </section>

        {/* Lineup Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {lineups.map((lineup) => (
            <div
              key={lineup.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all ${
                selectedBrand === lineup.id ? "ring-2 ring-gray-900" : ""
              }`}
              onClick={() => setSelectedBrand(lineup.id)}
            >
              <div className={`aspect-video ${lineup.image} flex items-center justify-center`}>
                <span className="text-3xl font-bold text-gray-700">{lineup.name}</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{lineup.category}</span>
                  {lineup.price === t("lineup.launchable") && (
                    <span className="flex items-center text-sm text-green-600">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {lineup.price}
                    </span>
                  )}
                  {lineup.price === t("lineup.preparing") && (
                    <span className="text-sm text-gray-500">{lineup.price}</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold">{lineup.name}</h3>
                <p className="text-gray-600">{lineup.description}</p>
                
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-semibold text-sm">{t("lineup.includes")}</h4>
                  <ul className="space-y-1">
                    {lineup.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {lineup.price === t("lineup.launchable") && (
                  <Button className="w-full mt-4" size="lg">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t("lineup.order")}
                  </Button>
                )}
                {lineup.price === t("lineup.preparing") && (
                  <Button className="w-full mt-4" size="lg" variant="outline" disabled>
                    {t("lineup.preparing")}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Info Section */}
        <section className="bg-gray-50 rounded-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">{t("lineup.reason.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-gray-800">{t("lineup.reason.complete")}</div>
              <p className="text-gray-600">{t("lineup.reason.complete.desc")}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-gray-800">{t("lineup.reason.immediate")}</div>
              <p className="text-gray-600">{t("lineup.reason.immediate.desc")}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-gray-800">{t("lineup.reason.expert")}</div>
              <p className="text-gray-600">{t("lineup.reason.expert.desc")}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">{t("lineup.cta.title")}</h2>
          <p className="text-lg text-gray-600 mb-8">
            {t("lineup.cta.desc")}
          </p>
          <Button size="lg">{t("lineup.cta.button")}</Button>
        </section>
      </div>
    </main>
  )
}

