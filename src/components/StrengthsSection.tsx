import { useLanguage } from "../contexts/LanguageContext"

export function StrengthsSection() {
  const { t } = useLanguage()
  
  const strengths = [
    {
      title: t("home.strengths.weaving.title"),
      desc: t("home.strengths.weaving.desc")
    },
    {
      title: t("home.strengths.experience.title"),
      desc: t("home.strengths.experience.desc")
    },
    {
      title: t("home.strengths.materials.title"),
      desc: t("home.strengths.materials.desc")
    },
    {
      title: t("home.strengths.consultation.title"),
      desc: t("home.strengths.consultation.desc")
    }
  ]
  
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("home.strengths.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {strengths.map((strength, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-bold mb-4">{strength.title}</h3>
              <p className="text-gray-600 leading-relaxed">{strength.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

