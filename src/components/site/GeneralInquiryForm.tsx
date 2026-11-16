"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/components/site/AuthProvider"
import {
  fabricOptions,
  productKinds,
  quantityOptions,
  sizeOptions,
} from "@/data/inquiryOptions"
import { createGeneralInquiry, type ProductKind } from "@/lib/inquiries"
import { cn } from "@/lib/utils"

export function GeneralInquiryForm() {
  const router = useRouter()
  const { user } = useAuth()
  const [productKind, setProductKind] = useState<ProductKind>("bojagi")
  const [fabric, setFabric] = useState(fabricOptions[0].label)
  const [size, setSize] = useState(sizeOptions[1].label)
  const [quantity, setQuantity] = useState(quantityOptions[0].label)
  const [deliveryDate, setDeliveryDate] = useState("")
  const [company, setCompany] = useState("")
  const [contactName, setContactName] = useState("")
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const submit = () => {
    if (!user) {
      router.push("/login?next=/inquiries")
      return
    }
    if (!fabric || !size || !quantity) return
    setSubmitting(true)
    const inquiry = createGeneralInquiry({
      userId: user.id,
      form: {
        productKind,
        fabric,
        size,
        quantity,
        deliveryDate,
        company: company.trim() || undefined,
        contactName: contactName.trim() || undefined,
        note,
      },
    })
    router.push(`/inquiries/${inquiry.id}`)
  }

  return (
    <div className="border border-black/10">
      <div className="border-b border-black/10 px-5 py-4 sm:px-6">
        <h2 className="text-[18px] font-medium tracking-tight">일반 문의 · 견적 받기</h2>
        <div className="mt-2 space-y-1 text-[13px] leading-relaxed text-black/60">
          <p className="sentence">종류·원단·사이즈·납품일을 알려주시면 견적을 안내드립니다.</p>
          <p className="sentence">
            시안을 직접 입혀보려면{" "}
            <Link href="/studio" className="underline underline-offset-4">
              스튜디오 문의
            </Link>
            를 이용하세요.
          </p>
        </div>
      </div>

      <div className="space-y-8 px-5 py-6 sm:px-6 sm:py-8">
        <section>
          <p className="text-[11px] tracking-[0.16em] text-black/45">종류</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {productKinds.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setProductKind(item.id)}
                className={cn(
                  "border px-4 py-4 text-left transition-colors",
                  productKind === item.id
                    ? "border-black bg-black text-white"
                    : "border-black/15 hover:border-black/40",
                )}
              >
                <span className="block text-[14px] font-medium">{item.label}</span>
                <span
                  className={cn(
                    "mt-1 block text-[12px] leading-relaxed",
                    productKind === item.id ? "text-white/70" : "text-black/55",
                  )}
                >
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] tracking-[0.16em] text-black/45">원단</span>
            <select
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="mt-2 w-full border border-black/15 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-black"
            >
              {fabricOptions.map((o) => (
                <option key={o.id} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] tracking-[0.16em] text-black/45">사이즈</span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-2 w-full border border-black/15 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-black"
            >
              {sizeOptions.map((o) => (
                <option key={o.id} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] tracking-[0.16em] text-black/45">수량</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-2 w-full border border-black/15 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-black"
            >
              {quantityOptions.map((o) => (
                <option key={o.id} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[11px] tracking-[0.16em] text-black/45">희망 납품일</span>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="mt-2 w-full border border-black/15 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-black"
            />
          </label>

          <label className="block">
            <span className="text-[11px] tracking-[0.16em] text-black/45">회사 / 브랜드</span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="선택"
              className="mt-2 w-full border border-black/15 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-black"
            />
          </label>

          <label className="block">
            <span className="text-[11px] tracking-[0.16em] text-black/45">담당자명</span>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="선택"
              className="mt-2 w-full border border-black/15 bg-white px-3 py-2.5 text-[13px] outline-none focus:border-black"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-[11px] tracking-[0.16em] text-black/45">추가 요청</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="용도, 참고 이미지, 인쇄/자수 여부 등을 적어주세요."
            className="mt-2 w-full resize-y border border-black/15 bg-white px-3 py-3 text-[13px] outline-none focus:border-black"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-black/50">
            {user
              ? "견적 요청 후 담당자와 채팅으로 이어집니다."
              : "견적 요청은 로그인 후 가능합니다."}
          </p>
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="bg-black px-6 py-3.5 text-[11px] tracking-[0.18em] text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {user ? "견적 받기" : "로그인 후 견적 받기"}
          </button>
        </div>
      </div>
    </div>
  )
}
