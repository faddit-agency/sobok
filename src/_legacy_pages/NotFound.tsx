import { Link } from "react-router-dom"
import { useMetaTags } from "../hooks/useMetaTags"

export function NotFound() {
  useMetaTags({
    title: "404 - 페이지를 찾을 수 없습니다 | 소복",
    description: "요청하신 페이지를 찾을 수 없습니다.",
    image: "/brand/bojagi-flat-wrapped.png",
    url: "/404",
    type: "website",
  })

  return (
    <div className="sobok-shell flex min-h-[60vh] items-center py-20">
      <div className="max-w-lg">
        <p className="text-sm text-sobok-muted">404</p>
        <h1 className="mt-2 text-3xl font-semibold">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-[15px] text-sobok-muted">
          요청하신 주소가 없거나 이동되었을 수 있습니다.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex border border-sobok-ink bg-sobok-ink px-5 py-2.5 text-sm text-sobok-bg"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
