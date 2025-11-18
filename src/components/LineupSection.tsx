import { Button } from "./ui/button"
import { useLanguage } from "../contexts/LanguageContext"
import { OptimizedImage } from "./OptimizedImage"

export function LineupSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 whitespace-pre-line">
            {t("home.lineup.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8 whitespace-pre-line">
            {t("home.lineup.subtitle")}
          </p>
          <Button size="lg">{t("home.lineup.cta")}</Button>
        </div>
        
        {/* 이미지 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=60"
              alt="SOBOK 뷰티 컨셉"
              className="w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1502767089025-6572583495b4?auto=format&fit=crop&w=1400&q=60"
              alt="SOBOK 라인 일러스트"
              className="w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

