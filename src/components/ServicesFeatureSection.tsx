import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function ServicesFeatureSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null)
  
  const panels = [
    {
      id: 1,
      english: t("home.services.easy.title"),
      korean: t("home.services.easy.korean"),
      desc: t("home.services.easy.desc"),
      bgColor: "bg-gray-800"
    },
    {
      id: 2,
      english: t("home.services.proven.title"),
      korean: t("home.services.proven.korean"),
      desc: t("home.services.proven.desc"),
      bgColor: "bg-gray-900"
    },
    {
      id: 3,
      english: t("home.services.reliable.title"),
      korean: t("home.services.reliable.korean"),
      desc: t("home.services.reliable.desc"),
      bgColor: "bg-black"
    }
  ]

  const panelBackgrounds: Record<number, string> = {
    1: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=60",
    2: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=60",
    3: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=60"
  }
  
  return (
    <section 
      ref={ref}
      className={`py-32 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-16">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className={`relative ${hoveredPanel === panel.id ? 'bg-black' : panel.bgColor} text-white p-6 sm:p-8 md:p-12 min-h-[500px] sm:min-h-[600px] md:min-h-[800px] flex flex-col justify-center items-center transition-all duration-500 cursor-pointer group overflow-hidden`}
              onMouseEnter={() => setHoveredPanel(panel.id)}
              onMouseLeave={() => setHoveredPanel(null)}
            >
              {/* 배경 이미지 */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                hoveredPanel === panel.id ? 'opacity-0' : 'opacity-100'
              }`}>
                <div className="w-full h-full">
                  <img
                    src={panelBackgrounds[panel.id]}
                    alt="fabric inspiration"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/60 mix-blend-darken"></div>
                </div>
              </div>

              {/* 텍스트 영역 - 중앙 정렬 */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl px-4">
                {/* 제목 */}
                <div className="flex flex-col items-center gap-2 mb-6 sm:mb-8 md:mb-10">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {panel.english}
                  </h3>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {panel.korean}
                  </h3>
                </div>

                {/* 설명 텍스트 */}
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 whitespace-pre-line px-2">
                  {panel.desc.split('.').filter(s => s.trim()).map((sentence, index, array) => 
                    index === array.length - 1 ? sentence.trim() + '.' : sentence.trim()
                  ).join('.\n')}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center px-4">
          <p className="text-lg font-semibold text-gray-900">{t("home.services.partners")}</p>
        </div>
      </div>
    </section>
  )
}

