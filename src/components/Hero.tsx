import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export function Hero() {
  const { t } = useLanguage()
  
  return (
    <section className="pt-32 sm:pt-48 md:pt-64 pb-4 px-4 md:px-8 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-4">
          {/* 왼쪽 텍스트 */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4 text-gray-900">
              {t("home.hero.title")} <span className="text-gray-900">________</span>
            </h1>
            <p className="text-4xl md:text-6xl lg:text-7xl text-gray-900 leading-relaxed font-black">
              {t("home.hero.subtitle")}
            </p>
          </div>

          {/* 오른쪽 CTA 버튼 */}
          <div className="flex-shrink-0">
            <Link 
              to="/inquiry"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors group"
            >
              <span className="text-base md:text-lg font-medium border-b border-gray-900 pb-1 group-hover:border-gray-700">
                {t("home.hero.cta")}
              </span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

