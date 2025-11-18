import { useLanguage } from "../contexts/LanguageContext"

export function ServiceSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.service.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("home.service.desc")}
          </p>
        </div>
      </div>
    </section>
  )
}

