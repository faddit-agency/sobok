import type { Metadata } from "next"
import { InquiryChat } from "@/components/site/InquiryChat"
import { PageShell } from "@/components/site/PageShell"

export const metadata: Metadata = {
  title: "Consultation",
}

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <PageShell>
      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-10">
        <h1 className="font-display text-[28px] font-semibold tracking-tight sm:text-[32px]">
          상담 채팅
        </h1>
        <div className="mt-10">
          <InquiryChat inquiryId={id} />
        </div>
      </div>
    </PageShell>
  )
}
