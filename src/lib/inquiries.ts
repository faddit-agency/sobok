export type InquiryMessage = {
  id: string
  role: "user" | "staff"
  text: string
  createdAt: string
  imageUrl?: string
  linkUrl?: string
  quoteAmount?: number
}

export type InquiryKind = "studio" | "general"
export type ProductKind = "bojagi" | "weave"

export type BojagiDraft = {
  colorId: string
  colorHex: string
  patternImage?: string | null
  logoImage?: string | null
  note: string
}

export type GeneralInquiryForm = {
  productKind: ProductKind
  fabric: string
  size: string
  quantity: string
  deliveryDate: string
  company?: string
  contactName?: string
  note: string
}

export type Inquiry = {
  id: string
  kind: InquiryKind
  title: string
  status: "open" | "quoted" | "closed"
  createdAt: string
  updatedAt: string
  userId: string
  draft?: BojagiDraft
  form?: GeneralInquiryForm
  messages: InquiryMessage[]
}

const STORAGE_KEY = "sobok.inquiries.v2"

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export function readInquiries(): Inquiry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Inquiry[]
    // migrate v1 if present
    const legacy = localStorage.getItem("sobok.inquiries.v1")
    if (!legacy) return []
    const old = JSON.parse(legacy) as Inquiry[]
    const migrated = old.map((item) => ({
      ...item,
      kind: item.kind || ("studio" as InquiryKind),
    }))
    writeInquiries(migrated)
    return migrated
  } catch {
    return []
  }
}

export function writeInquiries(list: Inquiry[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function getInquiry(id: string): Inquiry | null {
  return readInquiries().find((item) => item.id === id) ?? null
}

export function createStudioInquiry(input: {
  userId: string
  draft: BojagiDraft
  title?: string
}): Inquiry {
  const now = new Date().toISOString()
  const inquiry: Inquiry = {
    id: uid("inq"),
    kind: "studio",
    title: input.title || "스튜디오 시안 문의",
    status: "open",
    createdAt: now,
    updatedAt: now,
    userId: input.userId,
    draft: input.draft,
    messages: [
      {
        id: uid("msg"),
        role: "user",
        text:
          input.draft.note.trim() ||
          "보자기 시안을 첨부해 문의드립니다. 색상·그래픽·로고 반영 부탁드립니다.",
        createdAt: now,
        imageUrl: input.draft.patternImage || undefined,
      },
      {
        id: uid("msg"),
        role: "staff",
        text: "스튜디오 문의 확인했습니다. 시안을 검토한 뒤 견적과 일정을 안내드릴게요.",
        createdAt: now,
      },
    ],
  }
  writeInquiries([inquiry, ...readInquiries()])
  return inquiry
}

/** @deprecated use createStudioInquiry */
export function createInquiry(input: {
  userId: string
  draft: BojagiDraft
  title?: string
}): Inquiry {
  return createStudioInquiry(input)
}

export function createGeneralInquiry(input: {
  userId: string
  form: GeneralInquiryForm
}): Inquiry {
  const now = new Date().toISOString()
  const productLabel =
    input.form.productKind === "weave" ? "직조 커스텀" : "일반 보자기"
  const summary = [
    `종류: ${productLabel}`,
    `원단: ${input.form.fabric}`,
    `사이즈: ${input.form.size}`,
    `수량: ${input.form.quantity}`,
    `납품일: ${input.form.deliveryDate || "협의"}`,
    input.form.company ? `회사/브랜드: ${input.form.company}` : null,
    input.form.contactName ? `담당자: ${input.form.contactName}` : null,
    input.form.note.trim() ? `메모: ${input.form.note.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  const inquiry: Inquiry = {
    id: uid("inq"),
    kind: "general",
    title: `${productLabel} 견적 문의`,
    status: "open",
    createdAt: now,
    updatedAt: now,
    userId: input.userId,
    form: input.form,
    messages: [
      {
        id: uid("msg"),
        role: "user",
        text: summary,
        createdAt: now,
      },
      {
        id: uid("msg"),
        role: "staff",
        text: "일반 문의 확인했습니다. 조건에 맞는 견적과 제작 가능 일정을 채팅으로 안내드릴게요.",
        createdAt: now,
      },
    ],
  }
  writeInquiries([inquiry, ...readInquiries()])
  return inquiry
}

export function appendMessage(
  inquiryId: string,
  message: Omit<InquiryMessage, "id" | "createdAt"> & { createdAt?: string },
): Inquiry | null {
  const list = readInquiries()
  const idx = list.findIndex((item) => item.id === inquiryId)
  if (idx < 0) return null
  const now = message.createdAt || new Date().toISOString()
  const next: Inquiry = {
    ...list[idx],
    updatedAt: now,
    status: message.quoteAmount ? "quoted" : list[idx].status,
    messages: [
      ...list[idx].messages,
      {
        id: uid("msg"),
        createdAt: now,
        ...message,
      },
    ],
  }
  list[idx] = next
  writeInquiries(list)
  return next
}
