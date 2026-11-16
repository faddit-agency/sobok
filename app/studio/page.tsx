import type { Metadata } from "next"
import { InquiryStudio } from "@/components/site/InquiryStudio"
import { PageShell } from "@/components/site/PageShell"

export const metadata: Metadata = {
  title: "Studio",
  description: "보자기에 이미지·색·로고를 입혀보고 문의하세요.",
}

export default function StudioPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-10">
        <h1 className="font-display text-[28px] font-semibold tracking-tight sm:text-[36px]">
          보자기에 직접 입혀보세요.
        </h1>
        <div className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-black/60">
          <p className="sentence">그래픽과 색, 로고를 미리 적용한 뒤 메시지를 남겨 문의합니다.</p>
          <p className="sentence">전송 즉시 담당자와의 채팅 상담이 시작됩니다.</p>
        </div>
        <div className="mt-12">
          <InquiryStudio />
        </div>
      </div>
    </PageShell>
  )
}
