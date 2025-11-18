import { useLanguage } from "../contexts/LanguageContext"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function WhoWeAreSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  
  return (
    <section 
      ref={ref}
      className={`py-16 sm:py-24 md:py-32 px-4 md:px-8 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 왼쪽: 텍스트 */}
          <div className="space-y-8">
            {/* 칩 형태의 제목 */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
              {t("home.who.title")}
            </span>
            
            {/* 메인 제목 */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.3]">
                {t("home.who.main")}
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.3]">
                {t("home.who.sub")}
              </h2>
            </div>
            
            {/* 설명 텍스트 */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">
                {t("home.who.desc").split('\n\n')[0]}
              </p>
              <p className="text-base md:text-lg">
                {t("home.who.desc").split('\n\n')[1]}
              </p>
              <p className="text-base md:text-lg">
                {t("home.who.desc").split('\n\n')[2]}
              </p>
            </div>
          </div>
          
          {/* 오른쪽: 이미지 */}
          <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&q=80"
              alt="Fabric texture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

