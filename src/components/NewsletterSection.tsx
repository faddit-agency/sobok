import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useLanguage } from "../contexts/LanguageContext"

export function NewsletterSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("home.newsletter.title")}
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          {t("home.newsletter.subtitle")}
        </p>
        <p className="text-lg text-gray-600 mb-8">
          {t("home.newsletter.desc")}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder={t("home.newsletter.placeholder")}
            className="flex-1"
          />
          <Button>{t("home.newsletter.cta")}</Button>
        </div>
      </div>
    </section>
  )
}

