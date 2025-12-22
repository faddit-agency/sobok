import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"
import { noticesData } from "../data/notices"
import { getAllNoticeViews } from "../lib/api"
import { useMetaTags } from "../hooks/useMetaTags"

export function Notice() {
  const { t } = useLanguage()
  
  useMetaTags({
    title: `${t("notice.title")} | SOBIN`,
    description: t("notice.subtitle"),
    image: "/og-notice.jpg",
    url: "/notice",
    type: "website"
  })
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewsMap, setViewsMap] = useState<Record<number, number>>({})
  const itemsPerPage = 10

  // 조회수 로드
  useEffect(() => {
    const loadViews = async () => {
      try {
        const views = await getAllNoticeViews()
        setViewsMap(views)
      } catch (error) {
        console.error('Error loading views:', error)
      }
    }
    loadViews()
  }, [])

  // 번역된 공지사항 데이터
  const translatedNotices = useMemo(() => {
    return noticesData.map(notice => ({
      ...notice,
      title: t(notice.titleKey),
      content: t(notice.contentKey),
      views: viewsMap[notice.id] ?? 0
    }))
  }, [t, viewsMap])

  // 검색 필터링
  const filteredNotices = useMemo(() => {
    if (!query.trim()) return translatedNotices
    const lower = query.toLowerCase()
    return translatedNotices.filter(
      (notice) =>
        notice.title.toLowerCase().includes(lower) ||
        notice.content.toLowerCase().includes(lower)
    )
  }, [translatedNotices, query])

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNotices = filteredNotices.slice(startIndex, endIndex)

  // 검색어 변경 시 첫 페이지로
  const handleSearchChange = (value: string) => {
    setQuery(value)
    setCurrentPage(1)
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\./g, '.').replace(/\s/g, '')
  }

  return (
    <main className="pt-32 pb-20 px-4 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("notice.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("notice.subtitle")}
          </p>
        </div>

        {/* 검색 */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder={t("notice.search.placeholder")}
              className="w-full border border-gray-200 rounded-full py-4 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-gray-900/30 transition"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 공지사항 목록 */}
        <div className="space-y-0 border-t border-gray-200">
          {currentNotices.length === 0 ? (
            <div className="text-gray-500 py-20 text-center border-b border-gray-200">
              {t("notice.search.noResult")}
            </div>
          ) : (
            currentNotices.map((notice) => (
              <Link
                key={notice.id}
                to={`/notice/${notice.id}`}
                className="block border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="py-6 px-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {notice.content}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-sm text-gray-500 mb-1">
                        {formatDate(notice.date)}
                      </div>
                      {notice.views !== undefined && notice.views > 0 && (
                        <div className="text-xs text-gray-400">
                          {t("notice.views")} {notice.views}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="이전 페이지"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                    currentPage === page
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="다음 페이지"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

