import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useLanguage } from "../contexts/LanguageContext"
import { OptimizedImage } from "../components/OptimizedImage"

export function About() {
  const { t } = useLanguage()
  
  const values = [
    {
      title: t("about.values.custom.title"),
      description: t("about.values.custom.desc")
    },
    {
      title: t("about.values.trust.title"),
      description: t("about.values.trust.desc")
    },
    {
      title: t("about.values.flexible.title"),
      description: t("about.values.flexible.desc")
    }
  ]

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="mb-8 max-w-2xl mx-auto">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=60"
              alt="SOBOK"
              className="w-full h-auto rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 672px"
              loading="eager"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("about.title")}</h1>
        </section>

        {/* Brand Introduction */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.intro.title")}</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            {t("about.intro.desc")}
          </p>
        </section>

        {/* Culture Perspective */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.culture.title")}</h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            {t("about.culture.desc")}
          </p>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("about.values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cases */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("about.cases.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">{t("about.cases.retail")}</h3>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">{t("about.cases.event")}</h3>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">{t("about.cta.title")}</h2>
          <p className="text-lg text-gray-600 mb-8">
            {t("about.cta.desc")}
          </p>
          <Link to="/inquiry">
            <Button size="lg">{t("about.cta.button")}</Button>
          </Link>
        </section>
      </div>
    </main>
  )
}

