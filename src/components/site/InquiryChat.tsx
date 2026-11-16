"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { BojagiPreview } from "@/components/site/BojagiPreview"
import { useAuth } from "@/components/site/AuthProvider"
import {
  appendMessage,
  getInquiry,
  type Inquiry,
} from "@/lib/inquiries"
import { formatCurrency, formatDate } from "@/lib/utils"

type InquiryChatProps = {
  inquiryId: string
}

export function InquiryChat({ inquiryId }: InquiryChatProps) {
  const { user } = useAuth()
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [text, setText] = useState("")
  const [linkUrl, setLinkUrl] = useState("")

  useEffect(() => {
    setInquiry(getInquiry(inquiryId))
  }, [inquiryId])

  const canUse = useMemo(() => {
    if (!inquiry || !user) return false
    return inquiry.userId === user.id
  }, [inquiry, user])

  const send = (role: "user" | "staff", extra?: { quoteAmount?: number; imageUrl?: string }) => {
    if (!text.trim() && !extra?.quoteAmount && !linkUrl) return
    const next = appendMessage(inquiryId, {
      role,
      text: text.trim() || (extra?.quoteAmount ? "견적을 전달드립니다." : "자료를 공유합니다."),
      linkUrl: linkUrl || undefined,
      quoteAmount: extra?.quoteAmount,
      imageUrl: extra?.imageUrl,
    })
    setInquiry(next)
    setText("")
    setLinkUrl("")
  }

  if (!inquiry) {
    return (
      <div className="py-20 text-center text-[13px] text-black/55">
        문의 내역을 찾을 수 없습니다.{" "}
        <Link href="/inquiries" className="underline underline-offset-4">
          목록으로
        </Link>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="py-20 text-center text-[13px] text-black/55">
        채팅을 보려면{" "}
        <Link href={`/login?next=/inquiries/${inquiryId}`} className="underline underline-offset-4">
          로그인
        </Link>
        이 필요합니다.
      </div>
    )
  }

  if (!canUse) {
    return (
      <div className="py-20 text-center text-[13px] text-black/55">
        이 문의에 접근할 수 없습니다.
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        {inquiry.kind === "studio" && inquiry.draft ? (
          <BojagiPreview
            colorHex={inquiry.draft.colorHex}
            patternImage={inquiry.draft.patternImage}
            logoImage={inquiry.draft.logoImage}
          />
        ) : (
          <div className="border border-black/10 bg-[#f7f7f7] px-5 py-8">
            <p className="text-[11px] tracking-[0.16em] text-black/40">GENERAL</p>
            <dl className="mt-4 space-y-3 text-[13px] text-black/70">
              <div>
                <dt className="text-[11px] tracking-[0.12em] text-black/40">종류</dt>
                <dd className="mt-1">
                  {inquiry.form?.productKind === "weave" ? "직조 커스텀" : "일반 보자기"}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.12em] text-black/40">원단</dt>
                <dd className="mt-1">{inquiry.form?.fabric}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.12em] text-black/40">사이즈</dt>
                <dd className="mt-1">{inquiry.form?.size}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.12em] text-black/40">수량</dt>
                <dd className="mt-1">{inquiry.form?.quantity}</dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.12em] text-black/40">납품일</dt>
                <dd className="mt-1">{inquiry.form?.deliveryDate || "협의"}</dd>
              </div>
            </dl>
          </div>
        )}
        <div className="mt-4 space-y-1 text-[12px] text-black/60">
          <p className="tracking-[0.16em] text-black/40">
            {inquiry.kind === "studio" ? "STUDIO" : "GENERAL"}
          </p>
          <p>{inquiry.title}</p>
          <p>상태 · {inquiry.status}</p>
          <p>{formatDate(inquiry.createdAt)}</p>
        </div>
      </aside>

      <div className="flex min-h-[60vh] flex-col border border-black/10 lg:col-span-8">
        <div className="border-b border-black/10 px-4 py-3 text-[11px] tracking-[0.16em]">
          CONSULTATION CHAT
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
          {inquiry.messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[85%] ${msg.role === "user" ? "ml-auto text-right" : ""}`}
            >
              <p className="mb-1 text-[10px] tracking-[0.14em] text-black/40">
                {msg.role === "user" ? "YOU" : "STAFF"} · {formatDate(msg.createdAt)}
              </p>
              <div
                className={`inline-block px-3.5 py-2.5 text-left text-[13px] leading-relaxed ${
                  msg.role === "user" ? "bg-black text-white" : "bg-[#f3f3f3] text-black"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {typeof msg.quoteAmount === "number" && (
                  <p className="mt-2 text-[12px] font-medium tracking-wide">
                    견적 {formatCurrency(msg.quoteAmount)}
                  </p>
                )}
                {msg.linkUrl && (
                  <a
                    href={msg.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block break-all text-[12px] underline underline-offset-2"
                  >
                    {msg.linkUrl}
                  </a>
                )}
                {msg.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={msg.imageUrl}
                    alt="공유 이미지"
                    className="mt-2 max-h-48 w-auto border border-black/10"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t border-black/10 p-4">
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="공유할 링크 (선택)"
            className="w-full border border-black/15 px-3 py-2 text-[12px] outline-none focus:border-black"
          />
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send("user")
                }
              }}
              placeholder="메시지를 입력하세요"
              className="min-w-0 flex-1 border border-black/15 px-3 py-2.5 text-[13px] outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => send("user")}
              className="bg-black px-4 text-[11px] tracking-[0.14em] text-white"
            >
              SEND
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() =>
                send("staff", {
                  quoteAmount: 280000,
                  imageUrl: inquiry.draft?.patternImage || undefined,
                })
              }
              className="border border-black/15 px-3 py-1.5 text-[10px] tracking-[0.12em] text-black/70 hover:border-black"
            >
              담당자 견적 데모
            </button>
            <button
              type="button"
              onClick={() =>
                send("staff", {
                  imageUrl:
                    inquiry.draft?.logoImage || inquiry.draft?.patternImage || undefined,
                })
              }
              className="border border-black/15 px-3 py-1.5 text-[10px] tracking-[0.12em] text-black/70 hover:border-black"
            >
              담당자 이미지 데모
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
