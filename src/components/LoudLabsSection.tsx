import { Button } from "./ui/button"
import { useLanguage } from "../contexts/LanguageContext"
import { OptimizedImage } from "./OptimizedImage"

export function LoudLabsSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 whitespace-pre-line">
            {t("home.loudlabs.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto whitespace-pre-line">
            {t("home.loudlabs.subtitle")}
          </p>
          <Button size="lg">{t("home.loudlabs.cta")}</Button>
        </div>
        
        {/* 이미지 영역 */}
        <div className="mt-12">
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=60"
              alt="LoudLabs AI 기술"
              className="w-full h-full"
              sizes="100vw"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

