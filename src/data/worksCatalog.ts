import type { ProductId } from "./products"

export type WorkType = "proposal_sample" | "development_sample" | "delivered_project"
export type WorkUsage = "product_packaging" | "corporate_gift" | "event" | "other"
export type CaseKind = "real" | "example"

export type WorkItem = {
  id: string
  slug: string
  title: string
  type: WorkType
  usage: WorkUsage
  year: number
  categoryLabel: string
  published: boolean
  featured: boolean
  featuredOrder?: number
  shortIntro: string
  intent: string
  /** 고객이 해결하려던 과제·사용 목적 */
  challenge?: string
  /** 샘플에서 확인·수정한 내용 */
  sampleChanges?: string[]
  points: string[]
  productIds?: ProductId[]
  caseKind?: CaseKind
  /** 그리드 썸네일 — 단일 컷 보자기 제품 이미지만 */
  heroImage: string
  images: { src: string; alt: string }[]
  specs: {
    material?: string
    finishedSize?: string
    method?: string
    finish?: string
    purpose?: string
    quantityPublic?: string
    changeable?: string
  }
  /** 견적 참고용 안내 (확정 견적·납기는 상담 후) */
  commercial: {
    unitPrice: string
    moq: string
    leadTime: string
  }
  relatedSlugs: string[]
  logoPermissionStatus: "unknown" | "approved" | "denied" | "n/a"
  isPlaceholderVisual: boolean
}

export function getCaseKindLabel(kind: CaseKind) {
  return kind === "real" ? "실제 제작 사례" : "제작 예시"
}

export function resolveWork(work: WorkItem): WorkItem & {
  caseKind: CaseKind
  productIds: ProductId[]
  challenge: string
  sampleChanges: string[]
} {
  const caseKind: CaseKind = work.caseKind ?? (work.type === "delivered_project" ? "real" : "example")
  return {
    ...work,
    caseKind,
    productIds: work.productIds ?? ["bojagi"],
    challenge: work.challenge ?? work.intent,
    sampleChanges:
      work.sampleChanges ??
      (work.points.length
        ? work.points.map((p) => `샘플에서 ${p} 방향을 확인했습니다.`)
        : ["샘플로 발색·촉감·마감을 확인한 뒤 본생산 사양을 확정합니다."]),
  }
}

export const workTypeLabel: Record<WorkType, string> = {
  proposal_sample: "제작 제안 샘플",
  development_sample: "샘플 개발",
  delivered_project: "납품 사례",
}

export const workUsageLabel: Record<WorkUsage, string> = {
  product_packaging: "제품 포장",
  corporate_gift: "기업 선물",
  event: "행사·기념",
  other: "가방·소품",
}

/** 홈 그리드용 샘플. 품목·기법이 겹치지 않도록 구성. */
export const worksCatalog: WorkItem[] = [
  {
    id: "w1",
    slug: "gift-box-ratio",
    title: "선물 상자 비율",
    type: "proposal_sample",
    usage: "corporate_gift",
    year: 2025,
    categoryLabel: "기업 선물",
    published: true,
    featured: true,
    featuredOrder: 1,
    shortIntro: "상자 비율에 맞춘 기본 선물 포장",
    intent: "정사각형 상자를 감쌀 때 남는 여백과 매듭 위치를 미리 검토합니다.",
    points: ["완성 비율", "매듭 위치", "선물 연출"],
    heroImage: "/products/slab.png",
    images: [
      { src: "/products/slab.png", alt: "슬라브 상자 포장" },
      { src: "/brand/bojagi-flat-wrapped.png", alt: "포장 연출" },
    ],
    specs: { material: "슬라브", purpose: "기업 선물", changeable: "크기, 소재, 매듭" },
    commercial: { unitPrice: "개당 3,500원~", moq: "100장", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["tea-gift-wrap", "embroidered-wrap"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w2",
    slug: "embroidered-wrap",
    title: "자수 보자기",
    type: "proposal_sample",
    usage: "corporate_gift",
    year: 2025,
    categoryLabel: "자수",
    published: true,
    featured: true,
    featuredOrder: 2,
    shortIntro: "꽃 자수가 들어간 포장",
    intent: "브랜드 포인트나 시즌 모티프를 자수로 더하는 방향을 제안합니다.",
    points: ["자수", "포인트 장식", "프리미엄"],
    heroImage: "/brand/samples/bojagi-embroidered-wrap.jpg",
    images: [
      { src: "/brand/samples/bojagi-embroidered-wrap.jpg", alt: "자수 보자기 포장" },
      { src: "/products/slab.png", alt: "기본 슬라브 포장" },
    ],
    specs: { material: "면·린넨 + 자수", method: "자수 적용", purpose: "기업 선물·기념" },
    commercial: { unitPrice: "개당 5,800원~", moq: "50장", leadTime: "자수 시안 확정 후 약 3~4주" },
    relatedSlugs: ["jacquard-wrap", "gift-box-ratio"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w3",
    slug: "bojagi-bag",
    title: "보자기 가방",
    type: "proposal_sample",
    usage: "other",
    year: 2025,
    categoryLabel: "가방",
    published: true,
    featured: true,
    featuredOrder: 3,
    shortIntro: "포장 이후에도 쓰는 보자기 가방",
    intent: "선물 포장에서 끝나지 않고, 가방으로 이어지는 쓰임을 제안합니다.",
    points: ["재사용", "가방", "손잡이"],
    heroImage: "/brand/samples/bojagi-bag.jpg",
    images: [
      { src: "/brand/samples/bojagi-bag.jpg", alt: "보자기 가방" },
      { src: "/brand/reuse-bag-scarf.jpg", alt: "가방 연출" },
    ],
    specs: { material: "슬라브·린넨", purpose: "가방·소품", changeable: "크기, 손잡이, 안감" },
    commercial: { unitPrice: "개당 12,000원~", moq: "30개", leadTime: "발주 확정 후 약 3~4주" },
    relatedSlugs: ["panel-scarf", "organza-pouch"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w4",
    slug: "sheer-beauty",
    title: "뷰티 세트 포장",
    type: "proposal_sample",
    usage: "product_packaging",
    year: 2025,
    categoryLabel: "제품 포장",
    published: true,
    featured: true,
    featuredOrder: 4,
    shortIntro: "비치는 소재의 뷰티·소품 포장",
    intent: "제품 실루엣이 은은히 드러나는 가벼운 포장 방향을 제안합니다.",
    points: ["비침", "뷰티", "가벼운 포장감"],
    heroImage: "/brand/samples/bojagi-beauty-wrap.jpg",
    images: [
      { src: "/brand/samples/bojagi-beauty-wrap.jpg", alt: "뷰티 세트 오간자 포장" },
      { src: "/products/organza.png", alt: "오간자 포장" },
    ],
    specs: { material: "오간자", purpose: "제품 포장" },
    commercial: { unitPrice: "개당 2,800원~", moq: "200장", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["organza-pouch", "crystal-knot"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w5",
    slug: "bottle-wrap",
    title: "병 포장",
    type: "proposal_sample",
    usage: "event",
    year: 2025,
    categoryLabel: "병·주류",
    published: true,
    featured: true,
    featuredOrder: 5,
    shortIntro: "와인·주류 병용 세로형 포장",
    intent: "세로로 긴 형태에 맞춘 보자기 매듭과 여유분을 검토합니다.",
    points: ["병 형태", "세로 매듭", "행사·선물"],
    heroImage: "/brand/samples/bojagi-bottle-wrap.jpg",
    images: [
      { src: "/brand/samples/bojagi-bottle-wrap.jpg", alt: "병 보자기 포장" },
      { src: "/brand/samples/bojagi-indigo-wrap.jpg", alt: "쪽빛 포장" },
    ],
    specs: { purpose: "행사·기념", changeable: "색상, 리본, 태그", material: "슬라브·컬러원단" },
    commercial: { unitPrice: "개당 4,200원~", moq: "100장", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["indigo-wrap", "crystal-knot"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w6",
    slug: "organza-pouch",
    title: "복조리 파우치",
    type: "proposal_sample",
    usage: "product_packaging",
    year: 2025,
    categoryLabel: "파우치",
    published: true,
    featured: true,
    featuredOrder: 6,
    shortIntro: "끈으로 조이는 소프트 파우치",
    intent: "상자 없이 부드럽게 담는 복조리형 보자기 방향을 제안합니다.",
    points: ["파우치", "조임끈", "소품"],
    heroImage: "/brand/samples/bojagi-pouch.jpg",
    images: [
      { src: "/brand/samples/bojagi-pouch.jpg", alt: "보자기 파우치" },
      { src: "/products/organza.png", alt: "오간자 포장" },
    ],
    specs: { material: "오간자·실크", purpose: "제품·소품 포장" },
    commercial: { unitPrice: "개당 3,200원~", moq: "150개", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["sheer-beauty", "bojagi-bag"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w7",
    slug: "jacquard-wrap",
    title: "자카드 직조",
    type: "development_sample",
    usage: "product_packaging",
    year: 2025,
    categoryLabel: "직조",
    published: true,
    featured: true,
    featuredOrder: 7,
    shortIntro: "패턴이 직조된 보자기",
    intent: "로고·패턴을 인쇄가 아닌 직조로 넣는 방향을 보여주는 샘플입니다.",
    points: ["자카드", "직조 패턴", "브랜드"],
    heroImage: "/brand/samples/bojagi-jacquard-wrap.jpg",
    images: [
      { src: "/brand/samples/bojagi-jacquard-wrap.jpg", alt: "자카드 보자기" },
      { src: "/brand/bojagi-hero-logo.png", alt: "브랜드 마크 연출" },
    ],
    specs: { material: "자카드", method: "직조 패턴 개발", purpose: "브랜드 포장" },
    commercial: { unitPrice: "개당 8,500원~", moq: "300장", leadTime: "직조 개발 포함 약 5~7주" },
    relatedSlugs: ["embroidered-wrap", "gift-box-ratio"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w8",
    slug: "book-wrap",
    title: "책·노트 포장",
    type: "proposal_sample",
    usage: "corporate_gift",
    year: 2025,
    categoryLabel: "출판·문구",
    published: true,
    featured: true,
    featuredOrder: 8,
    shortIntro: "얇고 긴 형태에 맞춘 포장",
    intent: "책·노트처럼 납작한 형태에 맞는 접힘과 매듭을 제안합니다.",
    points: ["납작한 형태", "문구·출판", "기업 선물"],
    heroImage: "/brand/samples/bojagi-book-wrap.jpg",
    images: [
      { src: "/brand/samples/bojagi-book-wrap.jpg", alt: "책 보자기 포장" },
      { src: "/products/slab.png", alt: "슬라브 포장" },
    ],
    specs: { purpose: "기업 선물·출판", changeable: "색상, 띠지, 매듭", material: "슬라브" },
    commercial: { unitPrice: "개당 3,000원~", moq: "100장", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["gift-box-ratio", "panel-scarf"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w9",
    slug: "tea-gift-wrap",
    title: "차 선물 세트",
    type: "proposal_sample",
    usage: "corporate_gift",
    year: 2025,
    categoryLabel: "푸드·티",
    published: true,
    featured: true,
    featuredOrder: 9,
    shortIntro: "양면 배색의 차분한 차 선물 포장",
    intent: "자연스러운 결감과 배색으로 차분한 선물 인상을 제안합니다.",
    points: ["배색", "차 선물", "슬라브"],
    heroImage: "/brand/samples/bojagi-tea-wrap.jpg",
    images: [
      { src: "/brand/samples/bojagi-tea-wrap.jpg", alt: "차 선물 보자기" },
      { src: "/brand/concept-tea-slab.jpg", alt: "차 선물 연출" },
      { src: "/brand/reuse-tea-mat.jpg", alt: "찻상 매트 활용" },
    ],
    specs: { material: "슬라브 양면", purpose: "기업 선물" },
    commercial: { unitPrice: "개당 3,800원~", moq: "100장", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["gift-box-ratio", "panel-scarf"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w10",
    slug: "indigo-wrap",
    title: "쪽빛 보자기",
    type: "proposal_sample",
    usage: "event",
    year: 2025,
    categoryLabel: "컬러",
    published: true,
    featured: true,
    featuredOrder: 10,
    shortIntro: "진한 색감의 행사·기념 포장",
    intent: "밝은 톤뿐 아니라 진한 색으로도 브랜드 톤을 맞출 수 있음을 보여줍니다.",
    points: ["컬러", "행사", "대비"],
    heroImage: "/brand/samples/bojagi-indigo-wrap.jpg",
    images: [
      { src: "/brand/samples/bojagi-indigo-wrap.jpg", alt: "쪽빛 보자기 포장" },
      { src: "/brand/samples/bojagi-bottle-wrap.jpg", alt: "병 포장" },
    ],
    specs: { purpose: "행사·기념", changeable: "색상, 스티치 컬러", material: "컬러 원단" },
    commercial: { unitPrice: "개당 3,600원~", moq: "100장", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["bottle-wrap", "crystal-knot"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w11",
    slug: "crystal-knot",
    title: "광택 매듭",
    type: "proposal_sample",
    usage: "event",
    year: 2025,
    categoryLabel: "광택",
    published: true,
    featured: true,
    featuredOrder: 11,
    shortIntro: "광택 소재와 풍성한 매듭",
    intent: "행사·기념용으로 매듭의 볼륨과 광택감을 강조하는 방향입니다.",
    points: ["광택", "매듭 볼륨", "기념"],
    heroImage: "/products/crystal.png",
    images: [
      { src: "/products/crystal.png", alt: "크리스탈 보자기" },
      { src: "/brand/concept-premium-crystal.jpg", alt: "크리스탈 연출" },
    ],
    specs: { material: "크리스탈·실크", purpose: "행사·기념" },
    commercial: { unitPrice: "개당 4,500원~", moq: "100장", leadTime: "발주 확정 후 약 2~3주" },
    relatedSlugs: ["sheer-beauty", "indigo-wrap"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
  {
    id: "w12",
    slug: "panel-scarf",
    title: "보자기 스카프",
    type: "proposal_sample",
    usage: "other",
    year: 2024,
    categoryLabel: "스카프·패널",
    published: true,
    featured: true,
    featuredOrder: 12,
    productIds: ["bojagi", "fabric-poster"],
    caseKind: "example",
    shortIntro: "펼치면 스카프·패널로 쓰는 보자기",
    intent: "포장용 원단이 그대로 스카프·테이블 패널로 이어지는 방향을 제안합니다.",
    points: ["재사용", "스카프", "패널"],
    heroImage: "/brand/samples/bojagi-panel-scarf.jpg",
    images: [
      { src: "/brand/samples/bojagi-panel-scarf.jpg", alt: "보자기 스카프" },
      { src: "/brand/reuse-tea-mat.jpg", alt: "패널 활용" },
    ],
    specs: { material: "린넨·패치워크", purpose: "가방·소품·재사용" },
    commercial: { unitPrice: "개당 9,800원~", moq: "50장", leadTime: "발주 확정 후 약 3~4주" },
    relatedSlugs: ["bojagi-bag", "tea-gift-wrap"],
    logoPermissionStatus: "n/a",
    isPlaceholderVisual: false,
  },
]

export function getPublishedWorks() {
  return worksCatalog.filter((w) => w.published)
}

export function getFeaturedWorks() {
  return getPublishedWorks()
    .filter((w) => w.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))
}

export function getWorkBySlug(slug: string) {
  return getPublishedWorks().find((w) => w.slug === slug)
}

export function getAvailableUsages() {
  return Array.from(new Set(getPublishedWorks().map((w) => w.usage)))
}
