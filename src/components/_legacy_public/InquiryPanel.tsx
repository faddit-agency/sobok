import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { getPublishedMaterials } from "../../data/materials"
import type { WorkItem } from "../../data/worksCatalog"
import { siteSettings } from "../../data/siteSettings"
import { useLanguage } from "../../contexts/LanguageContext"
import { localizeWork, materialHintKo, materialLabel, st, type Lang } from "../../i18n/studio"

type Props = {
  selectedWork: WorkItem | null
  onClearWork: () => void
  onSubmitted?: () => void
}

type Errors = Record<string, string>

const MAX_FILES = 5
const MAX_FILE_MB = 10
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp", "pdf"]

const EXTRA_MATERIALS = [
  {
    id: "jacquard",
    name: "자카드 직조",
    hint: "패턴·로고 직조",
    image: "/brand/fabrics/fabric-jacquard.jpg",
  },
  {
    id: "undecided",
    name: "미정 · 상담",
    hint: "샘플 보고 결정",
    image: "/brand/fabrics/fabric-undecided.jpg",
  },
] as const

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

function draftFromWork(work: WorkItem, lang: Lang) {
  const lines = [
    `${st(lang, "inquiry.draft.ref")}: ${work.title}`,
    `${st(lang, "inquiry.draft.category")}: ${work.year} / ${work.categoryLabel}`,
    work.intent,
    work.shortIntro,
    work.points.length ? `${st(lang, "inquiry.draft.points")}: ${work.points.join(", ")}` : "",
  ].filter(Boolean)
  return lines.join("\n")
}

function guessMaterialId(work: WorkItem | null): string {
  if (!work?.specs.material) return ""
  const m = work.specs.material.toLowerCase()
  if (m.includes("오간자") || m.includes("organza")) return "m2"
  if (m.includes("크리스탈") || m.includes("실크") || m.includes("crystal") || m.includes("silk")) return "m3"
  if (m.includes("자카드") || m.includes("직조") || m.includes("jacquard") || m.includes("weave")) return "jacquard"
  if (m.includes("슬라브") || m.includes("린넨") || m.includes("면") || m.includes("slub") || m.includes("linen") || m.includes("cotton"))
    return "m1"
  return ""
}

const inputClass =
  "mt-1.5 w-full border border-neutral-300 bg-white px-2.5 py-2 text-[13px] text-black outline-none focus:border-black"
const labelClass = "block text-[12px] font-medium text-neutral-700"

export function InquiryPanel({ selectedWork, onClearWork, onSubmitted }: Props) {
  const { language } = useLanguage()
  const displayWork = useMemo(
    () => (selectedWork ? localizeWork(selectedWork, language) : null),
    [selectedWork, language]
  )

  const materials = useMemo(() => getPublishedMaterials(), [])
  const materialOptions = useMemo(
    () => [
      ...materials.map((m) => {
        const label = materialLabel(m.id, language, m.name, materialHintKo(m))
        return {
          id: m.id,
          name: label.name,
          hint: label.hint,
          image: m.detailImage || m.image,
        }
      }),
      ...EXTRA_MATERIALS.map((m) => {
        const label = materialLabel(m.id, language, m.name, m.hint)
        return { id: m.id, name: label.name, hint: label.hint, image: m.image }
      }),
    ],
    [materials, language]
  )

  const [purpose, setPurpose] = useState("")
  const [materialId, setMaterialId] = useState("")
  const [requestText, setRequestText] = useState("")
  const [quantity, setQuantity] = useState("")
  const [qtyUndecided, setQtyUndecided] = useState(false)
  const [deadline, setDeadline] = useState("")
  const [deadlineFlexible, setDeadlineFlexible] = useState(false)
  const [contactName, setContactName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [done, setDone] = useState(false)
  const [idempotencyKey] = useState(() => crypto.randomUUID())
  const minDate = useMemo(() => todayISO(), [])
  const panelTopRef = useRef<HTMLDivElement>(null)

  const selectedMaterialLabel = materialOptions.find((m) => m.id === materialId)?.name || ""

  useEffect(() => {
    if (!selectedWork) return
    const localized = localizeWork(selectedWork, language)
    setDone(false)
    setPurpose(selectedWork.usage)
    setRequestText(draftFromWork(localized, language))
    setMaterialId(guessMaterialId(selectedWork))
    setErrors({})
    setSubmitError("")
    panelTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [selectedWork, language])

  const fieldError = (key: string) =>
    errors[key] ? (
      <p className="mt-1 text-[11px] text-red-700" role="alert">
        {errors[key]}
      </p>
    ) : null

  const validate = (): Errors => {
    const next: Errors = {}
    if (!purpose) next.purpose = st(language, "inquiry.err.purpose")
    if (!materialId) next.materialId = st(language, "inquiry.err.material")
    if (!requestText.trim()) next.requestText = st(language, "inquiry.err.request")
    if (!qtyUndecided) {
      const n = Number(quantity)
      if (!Number.isInteger(n) || n <= 0) next.quantity = st(language, "inquiry.err.quantity")
    }
    if (!deadlineFlexible) {
      if (!deadline) next.deadline = st(language, "inquiry.err.deadline")
      else if (deadline < minDate) next.deadline = st(language, "inquiry.err.deadlinePast")
    }
    if (!contactName.trim()) next.contactName = st(language, "inquiry.err.name")
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = st(language, "inquiry.err.email")
    }
    if (!privacyConsent) next.privacyConsent = st(language, "inquiry.err.privacy")
    return next
  }

  const onFiles = (list: FileList | null) => {
    if (!list) return
    const nextErrors: Errors = { ...errors }
    delete nextErrors.files
    const accepted: File[] = []
    for (const file of Array.from(list)) {
      const ext = file.name.split(".").pop()?.toLowerCase() || ""
      if (!ALLOWED_EXT.includes(ext)) {
        nextErrors.files = `${st(language, "inquiry.err.fileType")}: ${file.name}`
        continue
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        nextErrors.files = `${MAX_FILE_MB}${st(language, "inquiry.err.fileSize")}`
        continue
      }
      accepted.push(file)
    }
    const merged = [...files, ...accepted].slice(0, MAX_FILES)
    if (files.length + accepted.length > MAX_FILES) {
      nextErrors.files = st(language, "inquiry.err.fileMax").replace("{n}", String(MAX_FILES))
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
      ;(document.querySelector(`[data-field="${firstKey}"]`) as HTMLElement | null)?.focus()
      return
    }

    if (siteSettings.demoMode) {
      setSubmitError(st(language, "inquiry.err.demo"))
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
              reader.onerror = () => reject(new Error(st(language, "inquiry.err.fileRead")))
              reader.readAsDataURL(file)
            })
        )
      )

      const payload = {
        idempotencyKey,
        companyName: company || st(language, "inquiry.payload.blankCompany"),
        contactName,
        email,
        phone: phone || "",
        website: "",
        country: "KR",
        industry: purpose,
        customIndustry: "",
        existingProducts: "",
        bojagiType: selectedWork ? `ref:${selectedWork.slug}` : "",
        material: selectedMaterialLabel,
        sizeWidth: "",
        sizeHeight: "",
        sizeDepth: "",
        calculatedBojagiSize: "",
        quantity: qtyUndecided ? st(language, "inquiry.payload.qtyTbd") : quantity,
        deadline: deadlineFlexible ? "" : deadline,
        orderSizeWidth: "",
        orderSizeHeight: "",
        details: [
          `${st(language, "inquiry.payload.material")}: ${selectedMaterialLabel}`,
          requestText,
          selectedWork
            ? `${st(language, "inquiry.draft.ref")}: ${displayWork?.title || selectedWork.title} (${selectedWork.slug})`
            : "",
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
      if (!res.ok) throw new Error(data.details || data.error || st(language, "inquiry.err.submit"))

      setDone(true)
      onSubmitted?.()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : st(language, "inquiry.err.generic")
      setSubmitError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="px-5 py-8 md:px-6">
        <h2 className="text-[16px] font-bold text-black">{st(language, "inquiry.done.title")}</h2>
        <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{st(language, "inquiry.done.body")}</p>
        <p className="mt-4 text-[12px] text-neutral-500">{email}</p>
        <button
          type="button"
          className="mt-6 text-[13px] font-bold text-black underline"
          onClick={() => {
            setDone(false)
            setRequestText("")
            setPurpose("")
            setMaterialId("")
            setFiles([])
            setPrivacyConsent(false)
            onClearWork()
          }}
        >
          {st(language, "inquiry.done.new")}
        </button>
      </div>
    )
  }

  return (
    <div ref={panelTopRef} className="px-5 py-6 md:px-6 md:py-7">
      <div className="md:hidden">
        <h2 className="text-[16px] font-bold text-black">{st(language, "inquiry.title")}</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
          {displayWork ? st(language, "inquiry.leadSelected") : st(language, "inquiry.lead")}
        </p>
      </div>

      {displayWork && (
        <div className="mt-4 border border-black bg-neutral-50 p-3 md:mt-0">
          <div className="flex items-start gap-3">
            <img src={displayWork.heroImage} alt="" className="h-16 w-16 shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold tracking-wide text-neutral-400">{st(language, "inquiry.selected")}</p>
              <p className="mt-0.5 text-[13px] font-bold text-black">{displayWork.title}</p>
              <p className="mt-0.5 text-[11px] text-neutral-500">
                {displayWork.year} / {displayWork.categoryLabel}
              </p>
              <p className="mt-2 text-[12px] leading-snug text-neutral-600">{displayWork.shortIntro}</p>
            </div>
            <button type="button" className="shrink-0 text-[11px] text-neutral-500 underline" onClick={onClearWork}>
              {st(language, "inquiry.clear")}
            </button>
          </div>
        </div>
      )}

      {siteSettings.demoMode && (
        <p className="mt-4 border border-neutral-200 bg-neutral-50 px-3 py-2 text-[11px] text-neutral-500 md:mt-0">
          {st(language, "inquiry.demo")}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className={`space-y-4 ${displayWork || siteSettings.demoMode ? "mt-5" : "mt-5 md:mt-0"}`}
        noValidate
      >
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

        <div>
          <label className={labelClass} htmlFor="panel-purpose">
            {st(language, "inquiry.purpose")} <span className="text-red-600">*</span>
          </label>
          <select
            id="panel-purpose"
            data-field="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className={inputClass}
          >
            <option value="">{st(language, "inquiry.purpose.placeholder")}</option>
            <option value="product_packaging">{st(language, "inquiry.purpose.product")}</option>
            <option value="corporate_gift">{st(language, "inquiry.purpose.gift")}</option>
            <option value="event">{st(language, "inquiry.purpose.event")}</option>
            <option value="other">{st(language, "inquiry.purpose.other")}</option>
          </select>
          {fieldError("purpose")}
        </div>

        <div>
          <p className={labelClass} id="panel-material-label">
            {st(language, "inquiry.material")} <span className="text-red-600">*</span>
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">{st(language, "inquiry.material.hint")}</p>
          <div
            className="mt-2.5 grid grid-cols-2 gap-2"
            role="radiogroup"
            aria-labelledby="panel-material-label"
            data-field="materialId"
          >
            {materialOptions.map((opt) => {
              const selected = materialId === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setMaterialId(opt.id)}
                  className={`overflow-hidden border text-left transition-colors ${
                    selected ? "border-black bg-neutral-50" : "border-neutral-300 bg-white hover:border-neutral-500"
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                    <img src={opt.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="px-2 py-2">
                    <p className="text-[12px] font-bold text-black">{opt.name}</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-neutral-500">{opt.hint}</p>
                  </div>
                </button>
              )
            })}
          </div>
          {fieldError("materialId")}
        </div>

        <div>
          <label className={labelClass} htmlFor="panel-request">
            {st(language, "inquiry.request")} <span className="text-red-600">*</span>
          </label>
          <textarea
            id="panel-request"
            data-field="requestText"
            rows={displayWork ? 6 : 4}
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
            className={`${inputClass} resize-y`}
            placeholder={st(language, "inquiry.request.ph")}
          />
          {fieldError("requestText")}
        </div>

        <div>
          <p className={labelClass}>
            {st(language, "inquiry.qty")} <span className="text-red-600">*</span>
          </p>
          <div className="mt-1.5 flex items-center gap-3">
            <input
              type="number"
              min={1}
              data-field="quantity"
              disabled={qtyUndecided}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={`${inputClass} mt-0`}
              placeholder={st(language, "inquiry.qty.ph")}
            />
            <label className="flex shrink-0 items-center gap-1.5 text-[12px] text-neutral-600">
              <input type="checkbox" checked={qtyUndecided} onChange={(e) => setQtyUndecided(e.target.checked)} />
              {st(language, "inquiry.qty.undecided")}
            </label>
          </div>
          {fieldError("quantity")}
        </div>

        <div>
          <p className={labelClass}>
            {st(language, "inquiry.deadline")} <span className="text-red-600">*</span>
          </p>
          <div className="mt-1.5 flex items-center gap-3">
            <input
              type="date"
              data-field="deadline"
              min={minDate}
              disabled={deadlineFlexible}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`${inputClass} mt-0`}
            />
            <label className="flex shrink-0 items-center gap-1.5 text-[12px] text-neutral-600">
              <input
                type="checkbox"
                checked={deadlineFlexible}
                onChange={(e) => setDeadlineFlexible(e.target.checked)}
              />
              {st(language, "inquiry.deadline.flex")}
            </label>
          </div>
          {fieldError("deadline")}
        </div>

        <div>
          <label className={labelClass} htmlFor="panel-name">
            {st(language, "inquiry.name")} <span className="text-red-600">*</span>
          </label>
          <input
            id="panel-name"
            data-field="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className={inputClass}
          />
          {fieldError("contactName")}
        </div>

        <div>
          <label className={labelClass} htmlFor="panel-company">
            {st(language, "inquiry.company")}
          </label>
          <input
            id="panel-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="panel-email">
            {st(language, "inquiry.email")} <span className="text-red-600">*</span>
          </label>
          <input
            id="panel-email"
            type="email"
            data-field="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          {fieldError("email")}
        </div>

        <div>
          <label className={labelClass} htmlFor="panel-phone">
            {st(language, "inquiry.phone")}
          </label>
          <input
            id="panel-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="panel-files">
            {st(language, "inquiry.files")}
          </label>
          <input
            id="panel-files"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp,.pdf"
            onChange={(e) => onFiles(e.target.files)}
            className="mt-1.5 block w-full text-[12px] text-neutral-600"
          />
          <p className="mt-1 text-[11px] text-neutral-400">{st(language, "inquiry.files.hint")}</p>
          {files.length > 0 && (
            <ul className="mt-1.5 space-y-0.5 text-[11px] text-neutral-600">
              {files.map((f) => (
                <li key={f.name + f.size}>{f.name}</li>
              ))}
            </ul>
          )}
          {fieldError("files")}
        </div>

        <label className="flex items-start gap-2 text-[12px] text-neutral-700" data-field="privacyConsent">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            {st(language, "inquiry.privacyCheck")}{" "}
            <Link to="/privacy" className="underline">
              {st(language, "inquiry.privacyLink")}
            </Link>
          </span>
        </label>
        {fieldError("privacyConsent")}

        {submitError && (
          <p className="border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-800" role="alert">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full border border-black bg-black px-4 py-3 text-[13px] font-bold text-white hover:bg-neutral-800 disabled:opacity-60"
        >
          {submitting ? st(language, "inquiry.submitting") : st(language, "inquiry.submit")}
        </button>
      </form>
    </div>
  )
}
