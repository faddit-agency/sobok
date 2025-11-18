import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function CTASection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  
  return (
    <section 
      ref={ref}
      className={`py-32 px-4 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto max-w-7xl text-center">
        {/* 칩 형태의 제목 */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-medium rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
          {t("home.cta.title")}
        </span>
        
        {/* 메인 제목 */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-[1.3] sm:whitespace-nowrap">
          {t("home.cta.subtitle")}
        </h2>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-[1.3] sm:whitespace-nowrap">
          {t("home.cta.desc")}
        </h2>
        
        {/* 하단 텍스트 */}
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          {t("home.cta.footer")}
        </p>
        
        {/* 문의하기 버튼 */}
        <Link to="/inquiry">
          <button 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#222222] text-white rounded-lg text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {t("home.cta.button")}
            <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    </section>
  )
}

