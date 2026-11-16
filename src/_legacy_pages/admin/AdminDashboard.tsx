import { Link } from "react-router-dom"

export function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">대시보드</h1>
      <p className="mt-2 text-sm text-neutral-600">
        문의 접수 → 프로젝트 → 원가 계산 → 견적 → 생산 일정 순으로 관리합니다.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { to: "/admin/inquiries", label: "제작 문의", desc: "접수·담당·상태" },
          { to: "/admin/projects", label: "프로젝트", desc: "사양·견적 버전" },
          { to: "/admin/calculator", label: "원가 계산", desc: "기존 규칙 기반" },
          { to: "/admin/calendar", label: "생산 캘린더", desc: "7단계 일정" },
          { to: "/admin/works", label: "공개 콘텐츠", desc: "샘플·소재 게시" },
        ].map((card) => (
          <Link key={card.to} to={card.to} className="border border-neutral-200 bg-white p-4 hover:border-neutral-400">
            <p className="font-medium">{card.label}</p>
            <p className="mt-1 text-sm text-neutral-500">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
