import { NavLink, Outlet, Navigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"
import { checkAdminAccess, getSupabaseBrowser, isSupabaseAuthConfigured } from "../lib/adminAuth"

const links = [
  { to: "/admin", label: "대시보드", end: true },
  { to: "/admin/inquiries", label: "제작 문의" },
  { to: "/admin/projects", label: "프로젝트" },
  { to: "/admin/calculator", label: "원가 계산" },
  { to: "/admin/calendar", label: "생산 캘린더" },
  { to: "/admin/history", label: "히스토리" },
  { to: "/admin/works", label: "공개 콘텐츠" },
  { to: "/admin/settings", label: "설정" },
]

export function AdminLayout() {
  const [session, setSession] = useState<Session | null>(null)
  const [allowed, setAllowed] = useState<boolean | null>(null)
  const [reason, setReason] = useState("")

  useEffect(() => {
    const sb = getSupabaseBrowser()
    if (!sb) {
      setAllowed(false)
      setReason("supabase_not_configured")
      return
    }
    sb.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      const access = await checkAdminAccess(data.session)
      setAllowed(access.ok)
      setReason(access.reason || "")
    })
    const { data: sub } = sb.auth.onAuthStateChange(async (_e, next) => {
      setSession(next)
      const access = await checkAdminAccess(next)
      setAllowed(access.ok)
      setReason(access.reason || "")
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isSupabaseAuthConfigured()) {
    return (
      <div className="min-h-screen bg-white p-8 text-sm text-neutral-700">
        <h1 className="text-xl font-semibold">관리자 영역</h1>
        <p className="mt-3">
          Supabase 인증이 설정되지 않았습니다. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`와
          `admin_memberships` 테이블(RLS)이 필요합니다.
        </p>
        <p className="mt-2 text-neutral-500">공개 문의·샘플 탐색은 설정 없이도 확인할 수 있습니다.</p>
        <Link to="/" className="mt-6 inline-block underline">
          공개 사이트로
        </Link>
      </div>
    )
  }

  if (allowed === null) {
    return <div className="min-h-screen p-8 text-sm text-neutral-600">권한 확인 중…</div>
  }

  if (!session) return <Navigate to="/admin/signin" replace />
  if (!allowed) {
    return (
      <div className="min-h-screen bg-white p-8 text-sm">
        <h1 className="text-xl font-semibold">접근 불가</h1>
        <p className="mt-3 text-neutral-600">
          로그인되어 있어도 승인된 관리자가 아니면 접근할 수 없습니다. ({reason})
        </p>
        <button
          type="button"
          className="mt-4 border px-3 py-2"
          onClick={() => getSupabaseBrowser()?.auth.signOut()}
        >
          로그아웃
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 border-r border-neutral-200 bg-white p-4 md:block">
          <p className="mb-6 text-sm font-semibold">SOBOK Admin</p>
          <nav className="flex flex-col gap-1 text-sm">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-2 py-1.5 ${isActive ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="mt-8 text-xs text-neutral-500 underline"
            onClick={() => getSupabaseBrowser()?.auth.signOut()}
          >
            로그아웃
          </button>
        </aside>
        <div className="flex-1">
          <header className="border-b border-neutral-200 bg-white px-4 py-3 text-sm md:hidden">
            SOBOK Admin · {session.user.email}
          </header>
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
