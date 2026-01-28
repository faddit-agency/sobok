import { Link } from "react-router-dom"
import { Home } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useMetaTags } from "../hooks/useMetaTags"

export function NotFound() {
  const { t } = useLanguage()
  
  useMetaTags({
    title: "404 - 페이지를 찾을 수 없습니다 | 소복",
    description: "요청하신 페이지를 찾을 수 없습니다.",
    image: "/og-home.jpg",
    url: "/404",
    type: "website"
  })

  return (
    <main className="pt-32 pb-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 숫자 */}
          <h1 className="text-8xl md:text-9xl font-bold text-gray-900 mb-6">
            {t("notFound.title")}
          </h1>
          
          {/* 제목 */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("notFound.subtitle")}
          </h2>
          
          {/* 설명 */}
          <p className="text-lg text-gray-600 mb-12">
            {t("notFound.description")}
          </p>
          
          {/* 홈으로 돌아가기 버튼 */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Home size={20} />
            {t("notFound.home")}
          </Link>
        </div>
      </div>
    </main>
  )
}


