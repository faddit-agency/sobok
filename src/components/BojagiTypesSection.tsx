import { useLanguage } from "../contexts/LanguageContext"

export function BojagiTypesSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("home.bojagi.title")}
        </h2>
        
        <div className="space-y-12">
          {/* 일반 보자기 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">{t("home.bojagi.regular.title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-3">{t("home.bojagi.regular.slab.title")}</h4>
                <p className="text-gray-600">{t("home.bojagi.regular.slab.desc")}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-3">{t("home.bojagi.regular.organza.title")}</h4>
                <p className="text-gray-600">{t("home.bojagi.regular.organza.desc")}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-3">{t("home.bojagi.regular.crystal.title")}</h4>
                <p className="text-gray-600">{t("home.bojagi.regular.crystal.desc")}</p>
              </div>
            </div>
          </div>
          
          {/* 브랜드 직조 보자기 */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">{t("home.bojagi.brand.title")}</h3>
            <p className="text-gray-600 leading-relaxed">{t("home.bojagi.brand.desc")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

