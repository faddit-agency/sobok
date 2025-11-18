import { useLanguage } from "../contexts/LanguageContext"

export function FeaturesSection() {
  const { t } = useLanguage()
  
  const features = [
    {
      title: t("home.features.easy.title"),
      subtitle: t("home.features.easy.subtitle"),
      description: t("home.features.easy.desc")
    },
    {
      title: t("home.features.proven.title"),
      subtitle: t("home.features.proven.subtitle"),
      description: t("home.features.proven.desc")
    },
    {
      title: t("home.features.reliable.title"),
      subtitle: t("home.features.reliable.subtitle"),
      description: t("home.features.reliable.desc")
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="text-4xl font-bold mb-2">{feature.title}</div>
              <div className="text-xl text-gray-600 mb-4">{feature.subtitle}</div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

