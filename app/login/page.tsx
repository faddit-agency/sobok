"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { LogoMark } from "@/components/site/LogoMark"
import { useAuth } from "@/components/site/AuthProvider"
import type { AuthProviderId } from "@/lib/auth"

const providers: { id: AuthProviderId; label: string; className: string }[] = [
  { id: "kakao", label: "카카오로 계속하기", className: "bg-[#FEE500] text-[#191919]" },
  { id: "naver", label: "네이버로 계속하기", className: "bg-[#03C75A] text-white" },
  { id: "google", label: "Google로 계속하기", className: "bg-white text-black border border-black/15" },
]

function LoginForm() {
  const { login, user, ready } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get("next") || "/studio"

  useEffect(() => {
    if (ready && user) router.replace(next)
  }, [ready, user, router, next])

  const onLogin = (id: AuthProviderId) => {
    login(id)
    router.push(next)
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-6 py-16">
      <div className="mb-10 flex flex-col items-center text-center">
        <LogoMark size={64} href="/" />
        <h1 className="mt-6 font-display text-[22px] font-semibold tracking-tight">로그인</h1>
        <p className="sentence mt-2 text-[13px] leading-relaxed text-black/55">
          소셜 계정으로 로그인하면 시안 문의와 채팅 상담, 문의내역을 이용할 수 있습니다.
        </p>
      </div>

      <div className="space-y-3">
        {providers.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onLogin(p.id)}
            className={`w-full px-4 py-3.5 text-[13px] font-medium tracking-wide ${p.className}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-1 text-center text-[12px] text-black/45">
        <p className="sentence">현재는 데모 로그인입니다.</p>
        <p className="sentence">실제 OAuth 연동 전 로컬 세션으로 동작합니다.</p>
      </div>
      <Link href="/" className="mt-4 text-center text-[12px] underline underline-offset-4">
        홈으로 돌아가기
      </Link>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh]" />}>
      <LoginForm />
    </Suspense>
  )
}
