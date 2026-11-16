const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000"

export const siteSettings = {
  brandName: "소복",
  brandNameEn: "SOBOK",
  slogan: "브랜드의 이야기를, 한 폭에.",
  classification: "브랜드를 위한 패브릭 제작 스튜디오",
  tagline: "보자기와 패브릭 포스터 주문제작",
  eyebrow: "보자기 · 패브릭 포스터 주문제작",
  description:
    "소복은 보자기와 패브릭 포스터를 만드는 패브릭 제작 스튜디오입니다. 원단을 고르고, 샘플을 확인하고, 마지막 마감을 살피며 당신의 한 폭을 함께 완성합니다.",
  nameMeaning: "생각과 정성을 차곡차곡 쌓아 하나의 제품으로 완성한다.",
  promise: "디자인의 의도를 완성품까지 이어간다.",
  contactEmail: "contact@faddit.co.kr",
  inquiryEmail: "sunny@faddit.co.kr",
  phone: null as string | null,
  address: null as string | null,
  businessNumber: null as string | null,
  ceo: null as string | null,
  siteUrl,
  consultFallback: "사양과 수량에 따라 상담 후 안내",
  privacyNote:
    "개인정보 수집·이용 목적과 보유기간은 문의 응대 목적에 한하며, 운영자가 확정한 정책을 따릅니다.",
  demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
}

export type SiteSettings = typeof siteSettings
