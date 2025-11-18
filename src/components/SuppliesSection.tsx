import { useLanguage } from "../contexts/LanguageContext"

export function SuppliesSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("home.supplies.title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("home.supplies.desc")}
          </p>
        </div>
      </div>
    </section>
  )
}

