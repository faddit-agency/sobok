import { FormEvent, useMemo, useRef, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { getWorkBySlug } from "../../data/worksCatalog"
import { siteSettings } from "../../data/siteSettings"
import { useMetaTags } from "../../hooks/useMetaTags"

type Errors = Record<string, string>

const MAX_FILES = 5
const MAX_FILE_MB = 10
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "pdf"]

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function InquiryPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const workSlug = params.get("work") || ""
  const linkedWork = workSlug ? getWorkBySlug(workSlug) : undefined
  const [detachWork, setDetachWork] = useState(false)
  const selectedWork = !detachWork ? linkedWork : undefined

  const [purpose, setPurpose] = useState("")
  const [qtyMode, setQtyMode] = useState<"number" | "undecided">("number")
  const [quantity, setQuantity] = useState("")
  const [deadlineMode, setDeadlineMode] = useState<"date" | "flexible">("date")
  const [deadline, setDeadline] = useState("")
  const [requestText, setRequestText] = useState("")
  const [specState, setSpecState] = useState("")
  const [knowSize, setKnowSize] = useState("")
  const [sizeW, setSizeW] = useState("")
  const [sizeH, setSizeH] = useState("")
  const [contentType, setContentType] = useState("")
  const [contentW, setContentW] = useState("")
  const [contentH, setContentH] = useState("")
  const [contentD, setContentD] = useState("")
  const [materialPref, setMaterialPref] = useState("")
  const [brandColor, setBrandColor] = useState("")
  const [printRequest, setPrintRequest] = useState("")
  const [finishPref, setFinishPref] = useState("")
  const [designState, setDesignState] = useState("")
  const [budgetType, setBudgetType] = useState("")
  const [budgetAmount, setBudgetAmount] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [contactName, setContactName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [preferContact, setPreferContact] = useState<"email" | "phone">("email")
  const [isPartner, setIsPartner] = useState(false)
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [idempotencyKey] = useState(() => crypto.randomUUID())
  const firstErrorRef = useRef<HTMLElement | null>(null)

  useMetaTags({
    title: "제작 문의 | 소복",
    description: "비회원으로 보자기 제작을 문의할 수 있습니다.",
    image: "/brand/bojagi-flat-wrapped.png",
    url: "/inquiry",
    type: "website",
  })

  const minDate = useMemo(() => todayISO(), [])

  const validate = (): Errors => {
    const next: Errors = {}
    if (!purpose) next.purpose = "사용 목적을 선택해 주세요."
    if (qtyMode === "number") {
      const n = Number(quantity)
      if (!Number.isInteger(n) || n <= 0) next.quantity = "희망 수량은 양의 정수여야 합니다."
    }
    if (deadlineMode === "date") {
      if (!deadline) next.deadline = "희망 납품일을 선택해 주세요."
      else if (deadline < minDate) next.deadline = "과거 날짜는 선택할 수 없습니다."
    }
    if (knowSize === "yes") {
      if (!sizeW || Number(sizeW) <= 0) next.sizeW = "완성 가로를 입력해 주세요."
      if (!sizeH || Number(sizeH) <= 0) next.sizeH = "완성 세로를 입력해 주세요."
    }
    if (!contactName.trim()) next.contactName = "담당자명을 입력해 주세요."
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "올바른 이메일을 입력해 주세요."
    }
    if (preferContact === "phone" && !phone.trim()) {
      next.phone = "전화 연락을 원하시면 전화번호가 필요합니다."
    }
    if (!privacyConsent) next.privacyConsent = "개인정보 수집·이용에 동의해 주세요."
    return next
  }

  const onFiles = (list: FileList | null) => {
    if (!list) return
    const incoming = Array.from(list)
    const nextErrors: Errors = { ...errors }
    delete nextErrors.files
    const accepted: File[] = []
    for (const file of incoming) {
      const ext = file.name.split(".").pop()?.toLowerCase() || ""
      if (!ALLOWED_EXT.includes(ext)) {
        nextErrors.files = `지원하지 않는 형식입니다: ${file.name}`
        continue
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        nextErrors.files = `${MAX_FILE_MB}MB를 초과한 파일이 있습니다.`
        continue
      }
      accepted.push(file)
    }
    const merged = [...files, ...accepted].slice(0, MAX_FILES)
    if (files.length + accepted.length > MAX_FILES) {
      nextErrors.files = `파일은 최대 ${MAX_FILES}개까지 가능합니다.`
    }
    setFiles(merged)
    setErrors(nextErrors)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    if (honeypot) return

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      const firstKey = Object.keys(next)[0]
      const el = document.querySelector(`[data-field="${firstKey}"]`) as HTMLElement | null
      el?.focus()
      firstErrorRef.current = el
      return
    }

    if (siteSettings.demoMode) {
      setSubmitError(
        "현재 데모 모드입니다. 실제 문의 접수는 설정되지 않았습니다. 운영 환경에서는 VITE_DEMO_MODE를 끄고 서버 연동을 완료해 주세요."
      )
      return
    }

    setSubmitting(true)
    try {
      const designFiles = await Promise.all(
        files.map(
          (file) =>
            new Promise<{ name: string; size: number; type: string; base64: string }>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => {
                const result = String(reader.result || "")
                const base64 = result.includes(",") ? result.split(",")[1] : result
                resolve({ name: file.name, size: file.size, type: file.type, base64 })
              }
              reader.onerror = () => reject(new Error("파일 읽기 실패"))
              reader.readAsDataURL(file)
            })
        )
      )

      const payload = {
        idempotencyKey,
        companyName: company || "(미입력)",
        contactName,
        email,
        phone: phone || "",
        website: "",
        country: "KR",
        industry: purpose,
        customIndustry: "",
        existingProducts: contentType,
        bojagiType: selectedWork ? `ref:${selectedWork.slug}` : "",
        material: materialPref,
        sizeWidth: sizeW,
        sizeHeight: sizeH,
        sizeDepth: contentD,
        calculatedBojagiSize: "",
        quantity: qtyMode === "undecided" ? "미정" : quantity,
        deadline: deadlineMode === "flexible" ? "" : deadline,
        orderSizeWidth: contentW,
        orderSizeHeight: contentH,
        details: [
          requestText,
          specState && `사양 상태: ${specState}`,
          knowSize && `완성 크기 인지: ${knowSize}`,
          brandColor && `브랜드 컬러: ${brandColor}`,
          printRequest && `인쇄 요청: ${printRequest}`,
          finishPref && `마감·포장: ${finishPref}`,
          designState && `디자인 자료: ${designState}`,
          budgetType && budgetAmount && `예산(${budgetType}): ${budgetAmount}`,
          preferContact && `선호 연락: ${preferContact}`,
          isPartner ? "협력업체 문의" : "",
          selectedWork ? `참고 샘플: ${selectedWork.title} (${selectedWork.slug})` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        privacyConsent,
        designFiles,
      }

      const res = await fetch("/api/inquiry/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.details || data.error || "문의 접수에 실패했습니다.")
      }

      navigate("/inquiry/complete", {
        replace: true,
        state: {
          inquiryId: data.id || data.inquiryNumber || null,
          email,
          summary: {
            purpose,
            quantity: qtyMode === "undecided" ? "아직 미정" : quantity,
            deadline: deadlineMode === "flexible" ? "협의 가능" : deadline,
            workTitle: selectedWork?.title || null,
          },
        },
      })
    } catch (err: any) {
      setSubmitError(err?.message || "문의 접수 중 오류가 발생했습니다. 다시 시도해 주세요.")
    } finally {
      setSubmitting(false)
    }
  }

  const fieldError = (key: string) =>
    errors[key] ? (
      <p className="mt-1 text-xs text-red-700" role="alert">
        {errors[key]}
      </p>
    ) : null

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-2 md:px-10 md:pb-24">
      <header className="max-w-2xl">
        <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[32px]">문의</h1>
        <p className="mt-3 text-[14px] text-neutral-500">
          회원가입 없이 문의할 수 있습니다. 희망 납품일은 보장된 납기가 아니며, 상담 후 일정이 확정됩니다.
        </p>
        {siteSettings.demoMode && (
          <p className="mt-4 border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-500" role="status">
            데모 모드: 실제 접수가 완료되지 않습니다.
          </p>
        )}
      </header>

      {selectedWork && (
        <div className="mt-8 flex max-w-2xl items-center gap-4 border border-neutral-200 p-4">
          <img src={selectedWork.heroImage} alt="" className="h-16 w-16 object-cover" />
          <div className="flex-1">
            <p className="text-xs text-neutral-400">참고 중인 샘플</p>
            <p className="font-medium text-black">{selectedWork.title}</p>
          </div>
          <button type="button" className="text-sm text-neutral-500 underline" onClick={() => setDetachWork(true)}>
            연결 해제
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-10 max-w-2xl space-y-12" noValidate>
        <input
          type="text"
          name="company_website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <section className="space-y-5">
          <h2 className="text-xl font-semibold">A. 무엇을 만들고 싶으신가요?</h2>
          <div>
            <label className="block text-sm font-medium" htmlFor="purpose">
              사용 목적 <span className="text-red-700">*</span>
            </label>
            <select
              id="purpose"
              data-field="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="mt-2 w-full border border-sobok-line bg-white px-3 py-2.5 text-sm"
            >
              <option value="">선택해 주세요</option>
              <option value="product_packaging">제품 포장</option>
              <option value="corporate_gift">기업 선물</option>
              <option value="event">행사·기념</option>
              <option value="other">기타</option>
            </select>
            {fieldError("purpose")}
          </div>

          <div>
            <p className="text-sm font-medium">희망 수량 <span className="text-red-700">*</span></p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={qtyMode === "number"} onChange={() => setQtyMode("number")} />
                수량 입력
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={qtyMode === "undecided"} onChange={() => setQtyMode("undecided")} />
                아직 미정
              </label>
            </div>
            {qtyMode === "number" && (
              <input
                data-field="quantity"
                type="number"
                min={1}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
                placeholder="양의 정수"
              />
            )}
            {fieldError("quantity")}
          </div>

          <div>
            <p className="text-sm font-medium">희망 납품일 <span className="text-red-700">*</span></p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={deadlineMode === "date"} onChange={() => setDeadlineMode("date")} />
                날짜 선택
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={deadlineMode === "flexible"} onChange={() => setDeadlineMode("flexible")} />
                협의 가능
              </label>
            </div>
            {deadlineMode === "date" && (
              <input
                data-field="deadline"
                type="date"
                min={minDate}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              />
            )}
            <p className="mt-1 text-xs text-sobok-muted">희망일은 보장된 납기가 아닙니다.</p>
            {fieldError("deadline")}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="requestText">
              제작 요청 내용
            </label>
            <textarea
              id="requestText"
              rows={4}
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              placeholder="원하시는 이미지와 변경하고 싶은 점을 적어 주세요."
            />
          </div>
        </section>

        <section className="space-y-5 border-t border-sobok-line pt-10">
          <h2 className="text-xl font-semibold">B. 원하는 보자기를 알려주세요</h2>
          <div>
            <label className="block text-sm font-medium" htmlFor="specState">
              사양 결정 상태
            </label>
            <select
              id="specState"
              value={specState}
              onChange={(e) => setSpecState(e.target.value)}
              className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
            >
              <option value="">선택 (선택 사항)</option>
              <option value="대략 정해져 있어요">대략 정해져 있어요</option>
              <option value="추천이 필요해요">추천이 필요해요</option>
            </select>
          </div>

          <div>
            <p className="text-sm font-medium">완성 크기를 알고 계신가요?</p>
            <div className="mt-2 flex gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={knowSize === "yes"} onChange={() => setKnowSize("yes")} /> 예
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" checked={knowSize === "no"} onChange={() => setKnowSize("no")} /> 아니오
              </label>
            </div>
            {knowSize === "yes" && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-sobok-muted" htmlFor="sizeW">
                    완성 가로 (cm)
                  </label>
                  <input
                    id="sizeW"
                    data-field="sizeW"
                    type="number"
                    min={0}
                    step="0.1"
                    value={sizeW}
                    onChange={(e) => setSizeW(e.target.value)}
                    className="mt-1 w-full border border-sobok-line px-3 py-2 text-sm"
                  />
                  {fieldError("sizeW")}
                </div>
                <div>
                  <label className="text-xs text-sobok-muted" htmlFor="sizeH">
                    완성 세로 (cm)
                  </label>
                  <input
                    id="sizeH"
                    data-field="sizeH"
                    type="number"
                    min={0}
                    step="0.1"
                    value={sizeH}
                    onChange={(e) => setSizeH(e.target.value)}
                    className="mt-1 w-full border border-sobok-line px-3 py-2 text-sm"
                  />
                  {fieldError("sizeH")}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="contentType">
              포장할 내용물
            </label>
            <input
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              placeholder="예: 화장품 상자, 선물 세트"
            />
            <p className="mt-1 text-xs text-sobok-muted">
              내용물 크기는 보자기 완성 크기와 다릅니다. 자동으로 확정하지 않습니다.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <input
                type="number"
                min={0}
                step="0.1"
                placeholder="가로"
                value={contentW}
                onChange={(e) => setContentW(e.target.value)}
                className="border border-sobok-line px-2 py-2 text-sm"
                aria-label="내용물 가로 cm"
              />
              <input
                type="number"
                min={0}
                step="0.1"
                placeholder="세로"
                value={contentH}
                onChange={(e) => setContentH(e.target.value)}
                className="border border-sobok-line px-2 py-2 text-sm"
                aria-label="내용물 세로 cm"
              />
              <input
                type="number"
                min={0}
                step="0.1"
                placeholder="높이"
                value={contentD}
                onChange={(e) => setContentD(e.target.value)}
                className="border border-sobok-line px-2 py-2 text-sm"
                aria-label="내용물 높이 cm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="materialPref">
                선호 소재·질감
              </label>
              <input
                id="materialPref"
                value={materialPref}
                onChange={(e) => setMaterialPref(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="brandColor">
                브랜드 컬러
              </label>
              <input
                id="brandColor"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="designState">
              디자인 자료 상태
            </label>
            <select
              id="designState"
              value={designState}
              onChange={(e) => setDesignState(e.target.value)}
              className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
            >
              <option value="">선택 (선택 사항)</option>
              <option value="완성 파일 있음">완성 파일 있음</option>
              <option value="로고만 있음">로고만 있음</option>
              <option value="참고 이미지만 있음">참고 이미지만 있음</option>
              <option value="없음">없음</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="printRequest">
              로고·패턴·인쇄 요청
            </label>
            <textarea
              id="printRequest"
              rows={2}
              value={printRequest}
              onChange={(e) => setPrintRequest(e.target.value)}
              className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="finishPref">
              원하는 마감·포장 방식
            </label>
            <input
              id="finishPref"
              value={finishPref}
              onChange={(e) => setFinishPref(e.target.value)}
              className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
            <div>
              <label className="block text-sm font-medium" htmlFor="budgetType">
                예산 유형
              </label>
              <select
                id="budgetType"
                value={budgetType}
                onChange={(e) => setBudgetType(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              >
                <option value="">선택</option>
                <option value="총예산">총예산</option>
                <option value="장당 목표금액">장당 목표금액</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="budgetAmount">
                예산
              </label>
              <input
                id="budgetAmount"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
                placeholder="선택 사항"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="files">
              참고 파일
            </label>
            <p className="mt-1 text-xs text-sobok-muted">
              JPG, PNG, WebP, PDF · 최대 {MAX_FILES}개 · 개당 {MAX_FILE_MB}MB. AI·PSD·SVG 원본은 상담 채널로 전달해 주세요.
            </p>
            <input
              id="files"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              onChange={(e) => onFiles(e.target.files)}
              className="mt-2 block w-full text-sm"
            />
            {files.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between border border-sobok-line px-3 py-2">
                    <span>
                      {f.name} ({(f.size / 1024 / 1024).toFixed(2)}MB)
                    </span>
                    <button
                      type="button"
                      className="text-xs text-sobok-muted underline"
                      onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {fieldError("files")}
          </div>
        </section>

        <section className="space-y-5 border-t border-sobok-line pt-10">
          <h2 className="text-xl font-semibold">C. 연락받을 정보를 알려주세요</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="contactName">
                담당자명 <span className="text-red-700">*</span>
              </label>
              <input
                id="contactName"
                data-field="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              />
              {fieldError("contactName")}
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="email">
                이메일 <span className="text-red-700">*</span>
              </label>
              <input
                id="email"
                data-field="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              />
              {fieldError("email")}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium" htmlFor="company">
                회사·브랜드명
              </label>
              <input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="phone">
                전화번호
              </label>
              <input
                id="phone"
                data-field="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full border border-sobok-line px-3 py-2.5 text-sm"
              />
              {fieldError("phone")}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">선호 연락 방식</p>
            <div className="mt-2 flex gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  checked={preferContact === "email"}
                  onChange={() => setPreferContact("email")}
                />
                이메일
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  checked={preferContact === "phone"}
                  onChange={() => setPreferContact("phone")}
                />
                전화
              </label>
            </div>
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPartner} onChange={(e) => setIsPartner(e.target.checked)} />
            협력업체입니다
          </label>
          <label className="flex items-start gap-2 text-sm" data-field="privacyConsent">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-1"
            />
            <span>
              개인정보 수집·이용에 동의합니다. (필수){" "}
              <Link to="/privacy" className="underline">
                안내 보기
              </Link>
            </span>
          </label>
          {fieldError("privacyConsent")}
        </section>

        {submitError && (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="bg-black px-6 py-3 text-[13px] font-bold tracking-[0.04em] text-white disabled:opacity-60"
        >
          {submitting ? "접수 중…" : "문의 제출"}
        </button>
      </form>
      </div>
    </div>
  )
}
