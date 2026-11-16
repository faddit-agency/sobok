import type { WorkItem } from "../data/worksCatalog"
import type { MaterialItem } from "../data/materials"

export type Lang = "ko" | "en"

type WorkEn = {
  title: string
  categoryLabel: string
  shortIntro: string
  intent: string
  points: string[]
  specs?: Partial<WorkItem["specs"]>
  commercial: WorkItem["commercial"]
}

const workEn: Record<string, WorkEn> = {
  "gift-box-ratio": {
    title: "Gift Box Ratio",
    categoryLabel: "Corporate Gift",
    shortIntro: "Gift wrap tailored to box proportions",
    intent: "We review leftover margin and knot placement when wrapping a square box.",
    points: ["Finished ratio", "Knot position", "Gift styling"],
    specs: { material: "Slub", purpose: "Corporate gift", changeable: "Size, fabric, knot" },
    commercial: {
      unitPrice: "From KRW 3,500 / pc",
      moq: "100 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "embroidered-wrap": {
    title: "Embroidered Bojagi",
    categoryLabel: "Embroidery",
    shortIntro: "Wrap with floral embroidery accents",
    intent: "We propose adding brand or seasonal motifs through embroidery.",
    points: ["Embroidery", "Accent detail", "Premium"],
    specs: {
      material: "Cotton/linen + embroidery",
      method: "Embroidery",
      purpose: "Corporate gift / commemorative",
    },
    commercial: {
      unitPrice: "From KRW 5,800 / pc",
      moq: "50 pcs",
      leadTime: "Approx. 3–4 weeks after embroidery artwork approval",
    },
  },
  "bojagi-bag": {
    title: "Bojagi Bag",
    categoryLabel: "Bag",
    shortIntro: "A bojagi bag that lives on after wrapping",
    intent: "We propose a direction that continues as a bag beyond gift wrap.",
    points: ["Reuse", "Bag", "Handle"],
    specs: {
      material: "Slub / linen",
      purpose: "Bag & accessories",
      changeable: "Size, handle, lining",
    },
    commercial: {
      unitPrice: "From KRW 12,000 / pc",
      moq: "30 pcs",
      leadTime: "Approx. 3–4 weeks after order confirmation",
    },
  },
  "sheer-beauty": {
    title: "Beauty Set Wrap",
    categoryLabel: "Product Packaging",
    shortIntro: "Sheer fabric wrap for beauty & small goods",
    intent: "A light wrap direction where the product silhouette softly shows through.",
    points: ["Sheer", "Beauty", "Light wrap feel"],
    specs: { material: "Organza", purpose: "Product packaging" },
    commercial: {
      unitPrice: "From KRW 2,800 / pc",
      moq: "200 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "bottle-wrap": {
    title: "Bottle Wrap",
    categoryLabel: "Bottle / Spirits",
    shortIntro: "Vertical wrap for wine and bottle gifts",
    intent: "We review knot and allowance for tall bottle forms.",
    points: ["Bottle form", "Vertical knot", "Event / gift"],
    specs: {
      material: "Slub / colored fabric",
      purpose: "Event / commemorative",
      changeable: "Color, ribbon, tag",
    },
    commercial: {
      unitPrice: "From KRW 4,200 / pc",
      moq: "100 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "organza-pouch": {
    title: "Drawstring Pouch",
    categoryLabel: "Pouch",
    shortIntro: "Soft drawstring bojagi pouch",
    intent: "A soft pouch direction without a rigid box.",
    points: ["Pouch", "Drawstring", "Small goods"],
    specs: { material: "Organza / silk", purpose: "Product & accessory packaging" },
    commercial: {
      unitPrice: "From KRW 3,200 / pc",
      moq: "150 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "jacquard-wrap": {
    title: "Jacquard Weave",
    categoryLabel: "Weave",
    shortIntro: "Bojagi with woven pattern",
    intent: "A sample direction that weaves logos and patterns into the fabric—not print.",
    points: ["Jacquard", "Woven pattern", "Brand"],
    specs: {
      material: "Jacquard",
      method: "Custom weave development",
      purpose: "Brand packaging",
    },
    commercial: {
      unitPrice: "From KRW 8,500 / pc",
      moq: "300 pcs",
      leadTime: "Approx. 5–7 weeks including weave development",
    },
  },
  "book-wrap": {
    title: "Book & Notebook Wrap",
    categoryLabel: "Publishing / Stationery",
    shortIntro: "Wrap for slim, flat forms",
    intent: "We propose folds and knots suited to books and notebooks.",
    points: ["Flat form", "Stationery / publishing", "Corporate gift"],
    specs: {
      material: "Slub",
      purpose: "Corporate gift / publishing",
      changeable: "Color, band, knot",
    },
    commercial: {
      unitPrice: "From KRW 3,000 / pc",
      moq: "100 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "tea-gift-wrap": {
    title: "Tea Gift Set",
    categoryLabel: "Food / Tea",
    shortIntro: "Quiet dual-tone tea gift wrap",
    intent: "A calm gift impression with natural grain and reversible color.",
    points: ["Two-tone", "Tea gift", "Slub"],
    specs: { material: "Reversible slub", purpose: "Corporate gift" },
    commercial: {
      unitPrice: "From KRW 3,800 / pc",
      moq: "100 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "indigo-wrap": {
    title: "Indigo Bojagi",
    categoryLabel: "Color",
    shortIntro: "Deep-tone wrap for events",
    intent: "Shows brand tone can be matched in deep colors as well as light ones.",
    points: ["Color", "Event", "Contrast"],
    specs: {
      material: "Colored fabric",
      purpose: "Event / commemorative",
      changeable: "Color, stitch color",
    },
    commercial: {
      unitPrice: "From KRW 3,600 / pc",
      moq: "100 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "crystal-knot": {
    title: "Gloss Knot",
    categoryLabel: "Gloss",
    shortIntro: "Gloss fabric with a full knot",
    intent: "Emphasizes knot volume and sheen for commemorative wrapping.",
    points: ["Gloss", "Knot volume", "Commemorative"],
    specs: { material: "Crystal / silk", purpose: "Event / commemorative" },
    commercial: {
      unitPrice: "From KRW 4,500 / pc",
      moq: "100 pcs",
      leadTime: "Approx. 2–3 weeks after order confirmation",
    },
  },
  "panel-scarf": {
    title: "Bojagi Scarf",
    categoryLabel: "Scarf / Panel",
    shortIntro: "Bojagi that opens into a scarf or panel",
    intent: "A direction where wrapping fabric continues as a scarf or table panel.",
    points: ["Reuse", "Scarf", "Panel"],
    specs: { material: "Linen / patchwork", purpose: "Bag, accessories, reuse" },
    commercial: {
      unitPrice: "From KRW 9,800 / pc",
      moq: "50 pcs",
      leadTime: "Approx. 3–4 weeks after order confirmation",
    },
  },
}

const materialEn: Record<string, { name: string; hint: string }> = {
  m1: { name: "Slub", hint: "Natural grain · Near-matte" },
  m2: { name: "Organza", hint: "Light hand · Soft sheen" },
  m3: { name: "Crystal", hint: "Smooth surface · Glossy" },
  jacquard: { name: "Jacquard weave", hint: "Pattern / logo weaving" },
  undecided: { name: "Undecided · Consult", hint: "Decide after samples" },
}

export const studioCopy = {
  ko: {
    "header.homeAria": "소복 홈",
    "header.navAria": "주요 메뉴",
    "header.langAria": "언어 선택",
    "header.inquiryOpen": "문의 열기",
    "header.inquiryClose": "문의 닫기",
    "video.aria": "보자기가 만들어지는 과정",
    "video.title": "브랜드에 맞는 보자기 포장을 만듭니다.",
    "video.sub": "풀고 나서도 이어지는 쓰임을 함께 생각합니다.",
    "about.headline1": "상품을 포장하지 않습니다.",
    "about.headline2": "브랜드를 포장합니다.",
    "about.p1":
      "포장은 단순한 포장지가 아닙니다. 존중의 표현이자, 배려의 몸짓이며, 감정을 전하는 방식입니다. 한국의 전통에서 보자기는 천 이상의 의미를 지닙니다. 선물하는 이의 정성과 마음가짐을 담고, 매 접힘과 매듭마다 의도가 깃듭니다.",
    "about.p2.before": "",
    "about.p2.after":
      "은 작지만 확실한 축복을 뜻하며, 눈처럼 조용히 쌓입니다. 우리의 일하는 방식도 같습니다. 은은하지만, 의도적이며, 오래 남습니다.",
    "about.p3":
      "정성으로 만든 포장으로 브랜드의 가치를 담습니다. 전통의 감성과 오늘날의 디자인을 겹쳐, 브랜드 톤에 맞는 맞춤형 보자기와 그 이후의 쓰임까지 함께 생각합니다.",
    "about.value.intent.title": "의도",
    "about.value.intent.body":
      "접힘과 매듭, 여백의 비율까지. 보이는 인상보다 브랜드가 전하고 싶은 태도를 먼저 맞춥니다.",
    "about.value.sustain.title": "지속",
    "about.value.sustain.body":
      "풀고 나서 끝나는 포장이 아니라, 가방·스카프·패널처럼 이어질 수 있는 쓰임을 제안합니다.",
    "about.value.custom.title": "맞춤",
    "about.value.custom.body":
      "소재·크기·자수·직조까지. 샘플과 제안으로 브랜드만의 보자기 방향을 만듭니다.",
    "about.nameLabel": "이름",
    "about.block1":
      "브랜드의 이야기를 포장이라는 형태로 담아내는 맞춤형 보자기 제작입니다. 슬라브·오간자·크리스탈부터 자수와 직조 패턴까지, 단순한 포장을 넘어 브랜드 경험을 완성하는 패키지를 만듭니다.",
    "about.block2":
      "제품 포장, 기업 선물, 행사·기념용부터 가방·파우치·스카프 같은 소품까지. 크기·소재·매듭·연출을 샘플과 제안으로 맞춰 갑니다.",
    "about.imgAlt": "소복 보자기",
    "process.title": "process",
    "process.1.title": "문의",
    "process.1.body": "용도·수량·일정·참고 이미지를 남겨 주시면 방향을 잡습니다.",
    "process.2.title": "샘플·제안",
    "process.2.body": "크기·소재·연출을 샘플과 제안으로 맞춰 갑니다.",
    "process.3.title": "제작",
    "process.3.body": "확정 스펙으로 제작합니다. 필요 시 중간 확인을 진행합니다.",
    "process.4.title": "납품",
    "process.4.body": "납품 후 포장 이후의 쓰임까지 이어질 수 있도록 안내합니다.",
    "inquiry.sideIntro": "제품 포장, 기업 선물, 행사·기념용까지. 샘플과 제안으로 크기·소재·연출을 맞춥니다.",
    "inquiry.privacy": "개인정보 안내",
    "inquiry.title": "제작 문의",
    "inquiry.lead":
      "회원가입 없이 문의할 수 있습니다. 희망 납품일은 보장된 납기가 아니며, 상담 후 일정이 확정됩니다.",
    "inquiry.leadSelected": "선택한 방향을 아래 내용으로 미리 채워 두었습니다. 확인·수정 후 문의해 주세요.",
    "inquiry.selected": "선택한 방향",
    "inquiry.clear": "해제",
    "inquiry.demo": "데모 모드: 실제 접수가 완료되지 않습니다.",
    "inquiry.purpose": "사용 목적",
    "inquiry.purpose.product": "제품 포장",
    "inquiry.purpose.gift": "기업 선물",
    "inquiry.purpose.event": "행사·기념",
    "inquiry.purpose.other": "기타",
    "inquiry.purpose.placeholder": "선택해 주세요",
    "inquiry.material": "원단 선택",
    "inquiry.material.hint": "견적 산정에 사용됩니다. 확정은 상담·샘플 후 가능합니다.",
    "inquiry.request": "요청 내용",
    "inquiry.request.ph": "용도, 참고 이미지, 원하는 분위기 등을 적어 주세요.",
    "inquiry.qty": "희망 수량",
    "inquiry.qty.ph": "수량",
    "inquiry.qty.undecided": "미정",
    "inquiry.deadline": "희망 납품일",
    "inquiry.deadline.flex": "협의",
    "inquiry.name": "담당자명",
    "inquiry.company": "회사·브랜드",
    "inquiry.email": "이메일",
    "inquiry.phone": "전화번호",
    "inquiry.files": "참고 자료",
    "inquiry.files.hint": "jpg, png, webp, pdf / 최대 5개 · 10MB",
    "inquiry.privacyCheck": "개인정보 수집·이용에 동의합니다. (필수)",
    "inquiry.privacyLink": "안내",
    "inquiry.submit": "확인 후 문의 제출",
    "inquiry.submitting": "접수 중…",
    "inquiry.done.title": "문의가 접수되었습니다",
    "inquiry.done.body":
      "담당자가 내용을 검토한 뒤 연락드립니다. 확정되지 않은 답변 기한을 약속하지 않습니다.",
    "inquiry.done.new": "새 문의 작성",
    "inquiry.required": "*",
    "inquiry.err.purpose": "사용 목적을 선택해 주세요.",
    "inquiry.err.material": "원단을 선택해 주세요. 견적에 필요합니다.",
    "inquiry.err.request": "요청 내용을 입력해 주세요.",
    "inquiry.err.quantity": "희망 수량을 입력해 주세요.",
    "inquiry.err.deadline": "희망 납품일을 선택해 주세요.",
    "inquiry.err.deadlinePast": "과거 날짜는 선택할 수 없습니다.",
    "inquiry.err.name": "담당자명을 입력해 주세요.",
    "inquiry.err.email": "올바른 이메일을 입력해 주세요.",
    "inquiry.err.privacy": "개인정보 수집·이용에 동의해 주세요.",
    "inquiry.err.fileType": "지원하지 않는 형식입니다",
    "inquiry.err.fileSize": "MB를 초과한 파일이 있습니다.",
    "inquiry.err.fileMax": "파일은 최대 {n}개까지 가능합니다.",
    "inquiry.err.demo": "현재 데모 모드입니다. 실제 문의 접수는 설정되지 않았습니다.",
    "inquiry.err.submit": "문의 접수에 실패했습니다.",
    "inquiry.err.generic": "문의 접수 중 오류가 발생했습니다.",
    "inquiry.err.fileRead": "파일 읽기 실패",
    "inquiry.draft.ref": "참고 샘플",
    "inquiry.draft.category": "카테고리",
    "inquiry.draft.points": "포인트",
    "inquiry.payload.material": "희망 원단",
    "inquiry.payload.blankCompany": "(미입력)",
    "inquiry.payload.qtyTbd": "미정",
    "modal.type.proposal_sample": "제작 제안 샘플",
    "modal.type.development_sample": "샘플 개발",
    "modal.type.delivered_project": "납품 사례",
    "modal.material": "소재",
    "modal.purpose": "용도",
    "modal.method": "방식",
    "modal.unitPrice": "개당 단가",
    "modal.moq": "MOQ",
    "modal.leadTime": "소요시간",
    "modal.changeable": "변경",
    "modal.note":
      "기준 안내입니다. 원단·수량·자수/직조·마감에 따라 단가와 납기가 달라질 수 있으며, 확정 견적은 문의 후 전달합니다.",
    "modal.cta": "이 방향으로 진행하기",
    "modal.close": "닫기",
    "privacy.metaTitle": "개인정보 안내 | 소복",
    "privacy.metaDesc": "제작 문의와 관련한 개인정보 처리 안내입니다.",
    "privacy.back": "← home",
    "privacy.title": "개인정보 안내",
    "privacy.intro":
      "본 안내는 제작 문의 접수와 응대에 필요한 범위의 개인정보 처리에 관한 안내입니다. 세부 보유기간·위탁·파기 절차는 운영자가 확정한 정책으로 업데이트됩니다.",
    "privacy.items.title": "수집 항목",
    "privacy.items.body":
      "담당자명, 이메일(필수). 회사·브랜드명, 전화번호, 문의 내용, 첨부파일(선택).",
    "privacy.purpose.title": "수집 목적",
    "privacy.purpose.body": "제작 문의 응대, 사양·견적 협의, 상담 기록.",
    "privacy.retain.title": "보유 및 이용",
    "privacy.retain.body":
      "개인정보 수집·이용 목적과 보유기간은 문의 응대 목적에 한하며, 운영자가 확정한 정책을 따릅니다.",
    "privacy.contact.title": "문의",
    "privacy.contact.body": "개인정보 관련 문의:",
  },
  en: {
    "header.homeAria": "SOBOK home",
    "header.navAria": "Primary",
    "header.langAria": "Language",
    "header.inquiryOpen": "Open inquiry",
    "header.inquiryClose": "Close inquiry",
    "video.aria": "Bojagi being made",
    "video.title": "Custom bojagi packaging for your brand.",
    "video.sub": "We think about use that continues after unwrapping.",
    "about.headline1": "We don’t wrap products.",
    "about.headline2": "We wrap brands.",
    "about.p1":
      "Packaging is more than wrapping paper. It is respect, care, and a way to carry feeling. In Korean tradition, bojagi means more than cloth. It holds the giver’s sincerity—and intention lives in every fold and knot.",
    "about.p2.before": "",
    "about.p2.after":
      " means a small but sure blessing, quietly gathering like snow. Our way of working is the same: subtle, intentional, lasting.",
    "about.p3":
      "We wrap brand value with care. Blending traditional sensibility with today’s design, we craft custom bojagi—and think about what comes after.",
    "about.value.intent.title": "Intent",
    "about.value.intent.body":
      "From folds and knots to proportion of space—we align the attitude your brand wants to convey before the look.",
    "about.value.sustain.title": "Continue",
    "about.value.sustain.body":
      "Not wrap-and-done. We propose use that continues as bags, scarves, or panels.",
    "about.value.custom.title": "Custom",
    "about.value.custom.body":
      "Fabric, size, embroidery, weave—we shape your bojagi direction through samples and proposals.",
    "about.nameLabel": "Name",
    "about.block1":
      "Custom bojagi that holds a brand story in the form of packaging. From slub, organza, and crystal to embroidery and woven pattern—we build packages that complete the brand experience.",
    "about.block2":
      "Product packaging, corporate gifts, events—and bags, pouches, scarves. We align size, fabric, knot, and styling through samples and proposals.",
    "about.imgAlt": "SOBOK bojagi",
    "process.title": "process",
    "process.1.title": "Inquiry",
    "process.1.body": "Share purpose, quantity, timeline, and references—we set the direction.",
    "process.2.title": "Sample & proposal",
    "process.2.body": "We align size, fabric, and styling through samples and proposals.",
    "process.3.title": "Production",
    "process.3.body": "We produce to confirmed specs, with mid-checks when needed.",
    "process.4.title": "Delivery",
    "process.4.body": "After delivery, we guide uses that can continue beyond wrapping.",
    "inquiry.sideIntro":
      "From product packaging to corporate gifts and events. We align size, fabric, and styling through samples and proposals.",
    "inquiry.privacy": "Privacy",
    "inquiry.title": "Inquiry",
    "inquiry.lead":
      "No sign-up needed. Preferred delivery dates are not guaranteed; schedules are confirmed after consultation.",
    "inquiry.leadSelected":
      "We’ve prefilled this direction below. Please review, edit if needed, then submit.",
    "inquiry.selected": "Selected direction",
    "inquiry.clear": "Clear",
    "inquiry.demo": "Demo mode: inquiries are not actually submitted.",
    "inquiry.purpose": "Purpose",
    "inquiry.purpose.product": "Product packaging",
    "inquiry.purpose.gift": "Corporate gift",
    "inquiry.purpose.event": "Event / commemorative",
    "inquiry.purpose.other": "Other",
    "inquiry.purpose.placeholder": "Please select",
    "inquiry.material": "Fabric",
    "inquiry.material.hint": "Used for quoting. Final choice after consultation and samples.",
    "inquiry.request": "Request details",
    "inquiry.request.ph": "Purpose, references, desired mood, etc.",
    "inquiry.qty": "Quantity",
    "inquiry.qty.ph": "Qty",
    "inquiry.qty.undecided": "TBD",
    "inquiry.deadline": "Preferred delivery",
    "inquiry.deadline.flex": "Flexible",
    "inquiry.name": "Contact name",
    "inquiry.company": "Company / brand",
    "inquiry.email": "Email",
    "inquiry.phone": "Phone",
    "inquiry.files": "Attachments",
    "inquiry.files.hint": "jpg, png, webp, pdf / max 5 · 10MB",
    "inquiry.privacyCheck": "I agree to the collection and use of personal information. (Required)",
    "inquiry.privacyLink": "Policy",
    "inquiry.submit": "Review & submit",
    "inquiry.submitting": "Submitting…",
    "inquiry.done.title": "Inquiry received",
    "inquiry.done.body":
      "Our team will review and get back to you. We don’t promise a fixed response time.",
    "inquiry.done.new": "New inquiry",
    "inquiry.required": "*",
    "inquiry.err.purpose": "Please select a purpose.",
    "inquiry.err.material": "Please select a fabric. Required for quoting.",
    "inquiry.err.request": "Please enter request details.",
    "inquiry.err.quantity": "Please enter a quantity.",
    "inquiry.err.deadline": "Please select a preferred delivery date.",
    "inquiry.err.deadlinePast": "Past dates cannot be selected.",
    "inquiry.err.name": "Please enter a contact name.",
    "inquiry.err.email": "Please enter a valid email.",
    "inquiry.err.privacy": "Please agree to the privacy policy.",
    "inquiry.err.fileType": "Unsupported file type",
    "inquiry.err.fileSize": "MB limit exceeded for a file.",
    "inquiry.err.fileMax": "Up to {n} files allowed.",
    "inquiry.err.demo": "Demo mode is on. Inquiries are not actually submitted.",
    "inquiry.err.submit": "Failed to submit inquiry.",
    "inquiry.err.generic": "An error occurred while submitting.",
    "inquiry.err.fileRead": "Failed to read file",
    "inquiry.draft.ref": "Reference sample",
    "inquiry.draft.category": "Category",
    "inquiry.draft.points": "Points",
    "inquiry.payload.material": "Preferred fabric",
    "inquiry.payload.blankCompany": "(not provided)",
    "inquiry.payload.qtyTbd": "TBD",
    "modal.type.proposal_sample": "Proposal sample",
    "modal.type.development_sample": "Development sample",
    "modal.type.delivered_project": "Delivered project",
    "modal.material": "Material",
    "modal.purpose": "Purpose",
    "modal.method": "Method",
    "modal.unitPrice": "Unit price",
    "modal.moq": "MOQ",
    "modal.leadTime": "Lead time",
    "modal.changeable": "Flexible",
    "modal.note":
      "Guide only. Price and lead time vary by fabric, quantity, embroidery/weave, and finish. Final quote after inquiry.",
    "modal.cta": "Proceed with this direction",
    "modal.close": "Close",
    "privacy.metaTitle": "Privacy | SOBOK",
    "privacy.metaDesc": "How we handle personal information for production inquiries.",
    "privacy.back": "← home",
    "privacy.title": "Privacy",
    "privacy.intro":
      "This notice covers personal information collected to receive and respond to production inquiries. Retention, outsourcing, and disposal details will be updated once the operator finalizes policy.",
    "privacy.items.title": "What we collect",
    "privacy.items.body":
      "Contact name and email (required). Company/brand, phone, inquiry details, and attachments (optional).",
    "privacy.purpose.title": "Purpose",
    "privacy.purpose.body": "Responding to production inquiries, discussing specs and quotes, consultation records.",
    "privacy.retain.title": "Retention",
    "privacy.retain.body":
      "Personal information is collected and retained only for responding to inquiries, per the operator’s confirmed policy.",
    "privacy.contact.title": "Contact",
    "privacy.contact.body": "Privacy inquiries:",
  },
} as const

export type StudioKey = keyof typeof studioCopy.ko

export function st(lang: Lang, key: StudioKey): string {
  return studioCopy[lang][key] || studioCopy.ko[key] || key
}

export function localizeWork(work: WorkItem, lang: Lang): WorkItem {
  if (lang === "ko") return work
  const en = workEn[work.slug]
  if (!en) return work
  return {
    ...work,
    title: en.title,
    categoryLabel: en.categoryLabel,
    shortIntro: en.shortIntro,
    intent: en.intent,
    points: en.points,
    specs: { ...work.specs, ...en.specs },
    commercial: en.commercial,
  }
}

export function materialLabel(id: string, lang: Lang, fallbackName: string, fallbackHint: string) {
  if (lang === "ko") return { name: fallbackName, hint: fallbackHint }
  return materialEn[id] || { name: fallbackName, hint: fallbackHint }
}

export function materialHintKo(m: MaterialItem) {
  return `${m.texture} · ${m.gloss}`
}
