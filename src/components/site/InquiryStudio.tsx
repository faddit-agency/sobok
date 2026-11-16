"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState, type ChangeEvent } from "react"
import { BojagiPreview } from "@/components/site/BojagiPreview"
import { useAuth } from "@/components/site/AuthProvider"
import { fabricColors } from "@/data/site"
import { createStudioInquiry } from "@/lib/inquiries"

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function InquiryStudio() {
  const router = useRouter()
  const { user } = useAuth()
  const [colorId, setColorId] = useState<(typeof fabricColors)[number]["id"]>(
    fabricColors[0].id,
  )
  const [patternImage, setPatternImage] = useState<string | null>(null)
  const [logoImage, setLogoImage] = useState<string | null>(null)
  const [note, setNote] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const color = useMemo(
    () => fabricColors.find((c) => c.id === colorId) ?? fabricColors[0],
    [colorId],
  )

  const onPattern = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPatternImage(await fileToDataUrl(file))
  }

  const onLogo = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoImage(await fileToDataUrl(file))
  }

  const submit = () => {
    if (!user) {
      router.push("/login?next=/studio")
      return
    }
    setSubmitting(true)
    const inquiry = createStudioInquiry({
      userId: user.id,
      draft: {
        colorId: color.id,
        colorHex: color.hex,
        patternImage,
        logoImage,
        note,
      },
    })
    router.push(`/inquiries/${inquiry.id}`)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <BojagiPreview
          colorHex={color.hex}
          patternImage={patternImage}
          logoImage={logoImage}
        />
        <div className="mt-4 space-y-1 text-[12px] leading-relaxed text-black/55">
          <p className="sentence">원단 색 · 그래픽 · 로고를 미리 입혀본 뒤 문의하세요.</p>
          <p className="sentence">전송하면 담당자와 채팅으로 이어서 상담합니다.</p>
        </div>
      </div>

      <div className="lg:col-span-6">
        <div className="space-y-8">
          <section>
            <h2 className="text-[11px] tracking-[0.2em] text-black/50">COLOR</h2>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {fabricColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  className="group flex flex-col items-center gap-1.5"
                  aria-label={c.label}
                >
                  <span
                    className={`h-9 w-9 border ${
                      colorId === c.id ? "border-black" : "border-black/15"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[10px] text-black/55">{c.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <label className="block border border-black/10 p-4">
              <span className="text-[11px] tracking-[0.18em] text-black/50">IMAGE</span>
              <p className="mt-1 text-[12px] text-black/60">보자기에 올릴 그래픽</p>
              <input
                type="file"
                accept="image/*"
                onChange={onPattern}
                className="mt-3 block w-full text-[12px]"
              />
            </label>
            <label className="block border border-black/10 p-4">
              <span className="text-[11px] tracking-[0.18em] text-black/50">LOGO</span>
              <p className="mt-1 text-[12px] text-black/60">브랜드 마크</p>
              <input
                type="file"
                accept="image/*"
                onChange={onLogo}
                className="mt-3 block w-full text-[12px]"
              />
            </label>
          </section>

          <section>
            <label htmlFor="note" className="text-[11px] tracking-[0.18em] text-black/50">
              MESSAGE
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={5}
              placeholder="수량, 용도, 희망 일정, 원단 선호 등을 적어주세요."
              className="mt-3 w-full resize-y border border-black/15 bg-white px-3 py-3 text-[13px] outline-none focus:border-black"
            />
          </section>

          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="w-full bg-black px-5 py-3.5 text-[12px] tracking-[0.18em] text-white transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {user ? "문의 보내기" : "로그인 후 문의하기"}
          </button>
        </div>
      </div>
    </div>
  )
}
