import Link from "next/link"
import { PageShell } from "@/components/site/PageShell"

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[600px] px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-[28px] font-semibold">페이지를 찾을 수 없습니다.</h1>
        <Link
          href="/"
          className="mt-8 inline-block bg-black px-5 py-3 text-[11px] tracking-[0.16em] text-white"
        >
          HOME
        </Link>
      </div>
    </PageShell>
  )
}
