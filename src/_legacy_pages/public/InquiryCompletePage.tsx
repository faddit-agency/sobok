import { Link, Navigate, useLocation } from "react-router-dom"
import { useMetaTags } from "../../hooks/useMetaTags"

type CompleteState = {
  inquiryId?: string | number | null
  email?: string
  summary?: {
    purpose?: string
    quantity?: string
    deadline?: string
    workTitle?: string | null
  }
}

export function InquiryCompletePage() {
  const location = useLocation()
  const state = (location.state || null) as CompleteState | null

  useMetaTags({
    title: "문의 접수 완료 | 소복",
    description: "제작 문의가 접수되었습니다.",
    image: "/brand/bojagi-flat-wrapped.png",
    url: "/inquiry/complete",
    type: "website",
  })

  if (!state?.email) {
    return <Navigate to="/inquiry" replace />
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[560px] px-5 pb-16 pt-2 md:px-10 md:pb-24">
        <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[32px]">
          문의가 접수되었습니다
        </h1>
        <p className="mt-4 text-[14px] text-neutral-500">
          담당자가 내용을 검토한 뒤 연락드립니다. 확정되지 않은 답변 기한을 약속하지 않습니다.
        </p>
        <dl className="mt-8 space-y-3 border-t border-neutral-200 pt-6 text-[14px]">
          {state.inquiryId != null && (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-400">문의번호</dt>
              <dd className="text-black">{String(state.inquiryId)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-400">접수한 이메일</dt>
            <dd className="text-black">{state.email}</dd>
          </div>
          {state.summary?.purpose && (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-400">사용 목적</dt>
              <dd className="text-black">{state.summary.purpose}</dd>
            </div>
          )}
          {state.summary?.quantity && (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-400">수량</dt>
              <dd className="text-black">{state.summary.quantity}</dd>
            </div>
          )}
          {state.summary?.deadline && (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-400">희망 일정</dt>
              <dd className="text-black">{state.summary.deadline}</dd>
            </div>
          )}
          {state.summary?.workTitle && (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-400">참고 샘플</dt>
              <dd className="text-black">{state.summary.workTitle}</dd>
            </div>
          )}
        </dl>
        <p className="mt-6 text-[13px] text-neutral-500">
          후속 상담은 이메일·전화 등 회사 지정 업무 채널로 진행됩니다.
        </p>
        <Link
          to="/works"
          className="mt-8 inline-block text-[14px] font-bold tracking-tight text-black hover:opacity-55"
        >
          작업 보기로 돌아가기 →
        </Link>
      </div>
    </div>
  )
}
