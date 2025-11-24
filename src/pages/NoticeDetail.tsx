import { ArrowLeft } from "lucide-react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"
import { noticesData } from "../data/notices"

// localStorage에서 조회수 가져오기
const getViews = (noticeId: number): number => {
  const stored = localStorage.getItem(`notice_views_${noticeId}`)
  return stored ? parseInt(stored, 10) : 0
}

// localStorage에 조회수 저장하기
const setViews = (noticeId: number, views: number): void => {
  localStorage.setItem(`notice_views_${noticeId}`, views.toString())
}

// 조회수 증가
const incrementViews = (noticeId: number): number => {
  const currentViews = getViews(noticeId)
  const newViews = currentViews + 1
  setViews(noticeId, newViews)
  return newViews
}

export function NoticeDetail() {
  const { t } = useLanguage()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [views, setViewsState] = useState<number>(0)
  
  const noticeId = id ? parseInt(id, 10) : null
  const notice = noticeId ? noticesData.find(n => n.id === noticeId) : null

  // 조회수 증가 및 로드
  useEffect(() => {
    if (noticeId) {
      const newViews = incrementViews(noticeId)
      setViewsState(newViews)
    }
  }, [noticeId])

  if (!notice) {
    return (
      <main className="pt-32 pb-20 px-4 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t("notice.detail.notFound")}
            </h2>
            <Link
              to="/notice"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              {t("notice.detail.backToList")}
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const noticeTitle = t(notice.titleKey)
  const noticeContent = t(notice.contentKey)

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
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">{t("notice.detail.back")}</span>
        </button>

        {/* 공지사항 상세 */}
        <article className="border-t border-b border-gray-200 py-8">
          {/* 헤더 */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {noticeTitle}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDate(notice.date)}</span>
              <span>{t("notice.views")} {views}</span>
            </div>
          </div>

          {/* 내용 */}
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {noticeContent}
            </div>
          </div>
        </article>

        {/* 목록으로 가기 버튼 */}
        <div className="mt-8 text-center">
          <Link
            to="/notice"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("notice.detail.backToList")}</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

