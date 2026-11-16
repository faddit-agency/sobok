export type MaterialItem = {
  id: string
  name: string
  texture: string
  thickness: string
  sheer: string
  gloss: string
  customerTraits: string[]
  suitedFor: string[]
  methods: string[]
  image: string
  detailImage?: string
  published: boolean
  order: number
  notes?: string
}

export const materialsCatalog: MaterialItem[] = [
  {
    id: "m1",
    name: "슬라브",
    texture: "자연스러운 결",
    thickness: "중간",
    sheer: "거의 비치지 않음",
    gloss: "무광에 가까움",
    customerTraits: ["형태감이 있는", "부드럽게 감싸지는"],
    suitedFor: ["기업 선물", "제품 포장"],
    methods: ["기존 원단 활용", "컬러 선택", "인쇄 검토"],
    image: "/brand/concept-tea-slab.jpg",
    detailImage: "/brand/fabrics/fabric-slab.jpg",
    published: true,
    order: 1,
    notes: "실제 적용 가능 여부와 최소 수량·납기는 상담 후 확정됩니다.",
  },
  {
    id: "m2",
    name: "오간자",
    texture: "가벼운 손맛",
    thickness: "얇음",
    sheer: "은은하게 비침",
    gloss: "부드러운 광택",
    customerTraits: ["은은하게 비치는", "부드럽게 감싸지는"],
    suitedFor: ["제품 포장", "행사·기념"],
    methods: ["기존 원단 활용", "크기·비율 변경"],
    image: "/brand/concept-beauty-organza.jpg",
    detailImage: "/brand/fabrics/fabric-organza.jpg",
    published: true,
    order: 2,
    notes: "확정 사양은 소재 샘플 확인 후 결정됩니다.",
  },
  {
    id: "m3",
    name: "크리스탈",
    texture: "매끄러운 표면",
    thickness: "얇음~중간",
    sheer: "소재에 따라 다름",
    gloss: "광택이 있는",
    customerTraits: ["광택이 있는", "형태감이 있는"],
    suitedFor: ["행사·기념", "기업 선물"],
    methods: ["기존 원단 활용", "마감·포장 방식 검토"],
    image: "/brand/concept-premium-crystal.jpg",
    detailImage: "/brand/fabrics/fabric-crystal.jpg",
    published: true,
    order: 3,
  },
]

export function getPublishedMaterials() {
  return materialsCatalog
    .filter((m) => m.published)
    .sort((a, b) => a.order - b.order)
}
