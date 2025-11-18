import { Button } from "./ui/button"
import { useLanguage } from "../contexts/LanguageContext"

export function LineupUpdateSection() {
  const { t } = useLanguage()
  
  const lineupItems = [
    { name: t("home.update.brand.milkdive"), status: t("home.update.launchable"), description: t("home.update.desc.milkdive") },
    { name: t("home.update.brand.puresource"), status: t("home.update.launchable"), description: t("home.update.desc.puresource") },
    { name: "Blank Palette", status: "", description: "" },
    { name: "Objet de Wanderlust Body Care", status: "", description: "" },
    { name: "PHASE RUSH", status: "", description: "" },
    { name: "SQUEELZY", status: "", description: "" },
    { name: "PURE SOURCE", status: "", description: "" },
  ]
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.update.title")}
          </h2>
          <Button variant="outline" size="lg">{t("home.update.cta")}</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lineupItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-400 text-sm">{item.name}</span>
              </div>
              <div className="font-bold text-lg">{item.name}</div>
              {item.status && (
                <div className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full inline-block">
                  {item.status}
                </div>
              )}
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

