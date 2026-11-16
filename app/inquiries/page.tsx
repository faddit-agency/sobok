import type { Metadata } from "next"
import Link from "next/link"
import { GeneralInquiryForm } from "@/components/site/GeneralInquiryForm"
import { InquiryList } from "@/components/site/InquiryList"
import { PageShell } from "@/components/site/PageShell"

export const metadata: Metadata = {
  title: "Inquiries",
  description: "일반 문의 견적 요청과 스튜디오 시안 문의 내역",
}

export default function InquiriesPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-10">
        <h1 className="font-display text-[28px] font-semibold tracking-tight sm:text-[36px]">
          문의
        </h1>
        <div className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-black/60">
          <p className="sentence">일반 문의로 견적을 받거나, 스튜디오에서 시안을 입혀 문의할 수 있습니다.</p>
          <p className="sentence">문의 후 채팅으로 상담을 이어가세요.</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-[11px] tracking-[0.14em]">
          <span className="border border-black bg-black px-3 py-1.5 text-white">GENERAL</span>
          <Link
            href="/studio"
            className="border border-black/20 px-3 py-1.5 transition-colors hover:border-black"
          >
            STUDIO →
          </Link>
        </div>

        <div className="mt-10">
          <GeneralInquiryForm />
        </div>

        <section className="mt-16">
          <h2 className="mb-5 text-[18px] font-medium tracking-tight">문의 내역</h2>
          <InquiryList />
        </section>
      </div>
    </PageShell>
  )
}
