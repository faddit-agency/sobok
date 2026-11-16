"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/site/AuthProvider"
import { readInquiries, type Inquiry } from "@/lib/inquiries"
import { formatDate } from "@/lib/utils"

export function InquiryList() {
  const { user, ready } = useAuth()
  const [items, setItems] = useState<Inquiry[]>([])

  useEffect(() => {
    if (!user) {
      setItems([])
      return
    }
    setItems(readInquiries().filter((item) => item.userId === user.id))
  }, [user])

  if (!ready) return null

  if (!user) {
    return (
      <div className="border border-black/10 px-6 py-12 text-center">
        <p className="sentence text-[13px] text-black/60">문의 내역은 로그인 후 확인할 수 있습니다.</p>
        <Link
          href="/login?next=/inquiries"
          className="mt-5 inline-block bg-black px-5 py-3 text-[11px] tracking-[0.16em] text-white"
        >
          LOGIN
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="border border-black/10 px-6 py-12 text-center">
        <p className="sentence text-[13px] text-black/60">아직 문의 내역이 없습니다.</p>
        <p className="sentence mt-2 text-[12px] text-black/45">
          위에서 일반 문의를 보내거나, 스튜디오에서 시안 문의를 남겨보세요.
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-black/10 border border-black/10">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={`/inquiries/${item.id}`}
            className="flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-black/[0.02] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-[14px]">{item.title}</p>
              <p className="mt-1 text-[12px] text-black/50">{formatDate(item.updatedAt)}</p>
            </div>
            <span className="text-[10px] tracking-[0.16em] text-black/55">
              {item.kind === "studio" ? "STUDIO" : "GENERAL"} · {item.status.toUpperCase()}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
