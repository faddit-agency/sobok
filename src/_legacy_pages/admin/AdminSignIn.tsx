import { FormEvent, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { getSupabaseBrowser, isSupabaseAuthConfigured } from "../../lib/adminAuth"

export function AdminSignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  if (!isSupabaseAuthConfigured()) {
    return (
      <div className="mx-auto max-w-md p-8 text-sm">
        <h1 className="text-xl font-semibold">관리자 로그인</h1>
        <p className="mt-3 text-neutral-600">Supabase 환경변수가 필요합니다. 공개 가입은 제공하지 않습니다.</p>
        <Link to="/" className="mt-4 inline-block underline">
          공개 사이트
        </Link>
      </div>
    )
  }

  if (done) return <Navigate to="/admin" replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const sb = getSupabaseBrowser()
      if (!sb) throw new Error("Supabase not configured")
      const { error: err } = await sb.auth.signInWithPassword({ email, password })
      if (err) throw err
      setDone(true)
    } catch (err: any) {
      setError(err?.message || "로그인에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-8">
      <h1 className="text-xl font-semibold">관리자 로그인</h1>
      <p className="mt-2 text-sm text-neutral-600">사전 승인된 계정만 접근할 수 있습니다. 고객 회원가입은 없습니다.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border px-3 py-2 text-sm"
          />
        </div>
        {error && (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="w-full bg-neutral-900 py-2.5 text-sm text-white disabled:opacity-60">
          {loading ? "확인 중…" : "로그인"}
        </button>
      </form>
    </div>
  )
}
