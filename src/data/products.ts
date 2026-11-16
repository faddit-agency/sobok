export type ProductId = "bojagi" | "fabric-poster"

export type OptionItem = {
  id: string
  name: string
  summary: string
  detail?: string
  image?: string
  editableNote?: string
}

export type ProductDef = {
  id: ProductId
  path: string
  name: string
  sentence: string
  uses: string[]
  intro: string
  heroImage: string
  heroAlt: string
  detailImages: { src: string; alt: string; caption: string }[]
  fabrics: OptionItem[]
  sizes: OptionItem[]
  prints: OptionItem[]
  finishes: OptionItem[]
  pricingFactors: string[]
  sampleNote: string
  faqs: { q: string; a: string }[]
}

export const products: Record<ProductId, ProductDef> = {
  bojagi: {
    id: "bojagi",
    path: "/bojagi",
    name: "소복 보자기",
    sentence: "마음을 감싸는 한 폭.",
    uses: ["브랜드 선물 포장", "명절 패키지", "행사 기념품", "판매용 패브릭 제품"],
    intro:
      "선물의 첫인상에 브랜드의 이야기를 담아보세요. 용도와 예산에 맞는 원단·크기·인쇄·마감을 제안하고, 샘플로 확인한 뒤 제작을 시작합니다.",
    heroImage: "/brand/samples/bojagi-beauty-wrap.jpg",
    heroAlt: "브랜드 선물을 감싼 보자기 제작 예시",
    detailImages: [
      {
        src: "/brand/bojagi-flat-wrapped.png",
        alt: "펼친 보자기 그래픽",
        caption: "펼친 모습 — 그래픽과 색감이 온전히 보이는 정면",
      },
      {
        src: "/brand/samples/bojagi-tea-wrap.jpg",
        alt: "티 선물을 감싼 보자기",
        caption: "쓰이는 모습 — 선물을 감싼 장면",
      },
      {
        src: "/brand/fabrics/fabric-slab.jpg",
        alt: "원단 조직 디테일",
        caption: "가까이 본 모습 — 원단 조직과 마감",
      },
    ],
    fabrics: [
      {
        id: "slab",
        name: "슬라브",
        summary: "자연스러운 결 · 따뜻한 촉감",
        detail: "발색이 차분하고 비침이 적습니다. 선물 포장과 일상 재사용에 잘 맞습니다.",
        image: "/brand/fabrics/fabric-slab.jpg",
      },
      {
        id: "organza",
        name: "오간자",
        summary: "가벼운 손맛 · 부드러운 비침",
        detail: "제품 실루엣이 은은히 비칩니다. 뷰티·소품 포장에 자주 선택됩니다.",
        image: "/brand/fabrics/fabric-organza.jpg",
      },
      {
        id: "crystal",
        name: "크리스탈",
        summary: "매끄러운 표면 · 광택",
        detail: "매듭과 주름이 또렷해 보입니다. 행사·기념 포장에 잘 어울립니다.",
        image: "/brand/fabrics/fabric-crystal.jpg",
      },
      {
        id: "jacquard",
        name: "자카드 직조",
        summary: "패턴·로고 직조",
        detail: "인쇄 대신 원단에 무늬를 짜 넣는 방식입니다. 개발 기간이 더 필요할 수 있습니다.",
        image: "/brand/fabrics/fabric-jacquard.jpg",
        editableNote: "실제 제공 가능 여부는 상담 시 확인합니다.",
      },
    ],
    sizes: [
      { id: "s", name: "소형", summary: "소품·단품 포장용" },
      { id: "m", name: "중형", summary: "박스·세트 포장용" },
      { id: "l", name: "대형", summary: "병·묶음 선물용" },
      { id: "custom", name: "맞춤", summary: "제품 치수에 맞춰 제안" },
    ],
    prints: [
      { id: "digital", name: "디지털 인쇄", summary: "풀컬러 그래픽에 적합" },
      { id: "embroidery", name: "자수", summary: "로고·모티브 포인트" },
      { id: "weave", name: "직조 패턴", summary: "원단 자체에 무늬 표현" },
      { id: "solid", name: "무지·염색", summary: "단색 톤 중심" },
    ],
    finishes: [
      { id: "hem", name: "가장자리 마감", summary: "올풀림 방지 봉제" },
      { id: "knot", name: "매듭·리본 연출", summary: "포장 시연 가이드 포함 가능" },
      { id: "label", name: "라벨·택", summary: "브랜드 택 부착 협의" },
    ],
    pricingFactors: [
      "원단 종류와 폭",
      "크기와 수량",
      "인쇄·자수·직조 방식",
      "마감과 부자재",
      "샘플 제작 여부",
      "납품 일정",
    ],
    sampleNote:
      "화면에서 본 색과 원단 위의 색은 다르게 느껴질 수 있어요. 샘플로 확인한 뒤 제작을 시작합니다. 샘플 제작에는 비용이 발생할 수 있으며, 비용과 조건은 시작 전에 안내합니다.",
    faqs: [
      {
        q: "최소 수량이 있나요?",
        a: "최소수량·단가·납기는 사양과 수량에 따라 상담 후 안내합니다. 대략적인 수량 범위만 알려주셔도 방향을 잡을 수 있습니다.",
      },
      {
        q: "디자인이 완성되지 않아도 상담할 수 있나요?",
        a: "가능합니다. 참고 이미지나 원하는 분위기만 있어도 원단과 마감 제안을 시작할 수 있습니다.",
      },
      {
        q: "재주문이 가능한가요?",
        a: "지난번 확정한 사양으로 다시 제작할 수 있어요. 수량과 희망 납기를 알려주세요.",
      },
    ],
  },
  "fabric-poster": {
    id: "fabric-poster",
    path: "/fabric-poster",
    name: "소복 패브릭 포스터",
    sentence: "취향을 펼치는 한 폭.",
    uses: ["홈 인테리어", "매장 연출", "전시", "일러스트 굿즈", "브랜드 캠페인"],
    intro:
      "브랜드의 이미지를 공간 속 풍경으로 만들어보세요. 하나의 그래픽을 보자기와 패브릭 포스터로 이어 제작할 수도 있습니다.",
    heroImage: "/brand/samples/bojagi-panel-scarf.jpg",
    heroAlt: "공간에 펼친 패브릭 포스터 제작 예시",
    detailImages: [
      {
        src: "/brand/samples/bojagi-jacquard-wrap.jpg",
        alt: "펼친 패브릭 그래픽",
        caption: "펼친 모습 — 그래픽이 온전히 보이는 정면",
      },
      {
        src: "/brand/reuse-bag-scarf.jpg",
        alt: "공간 연출 패브릭",
        caption: "쓰이는 모습 — 공간에 걸린·놓인 장면",
      },
      {
        src: "/brand/fabrics/fabric-organza.jpg",
        alt: "인쇄 경계 디테일",
        caption: "가까이 본 모습 — 인쇄 경계와 원단 결",
      },
    ],
    fabrics: [
      {
        id: "poster-cotton",
        name: "코튼 계열",
        summary: "안정적인 발색 · 매트한 인상",
        detail: "그래픽의 선명함을 살리고 싶을 때 자주 제안합니다.",
        image: "/brand/fabrics/fabric-slab.jpg",
        editableNote: "실제 원단명은 운영 가능 목록으로 교체하세요.",
      },
      {
        id: "poster-linen",
        name: "린넨 믹스",
        summary: "결이 보이는 질감",
        detail: "공간 연출에서 따뜻한 인상을 줄 때 적합합니다.",
        image: "/brand/fabrics/fabric-slab.jpg",
      },
      {
        id: "poster-sheer",
        name: "쉬어 계열",
        summary: "가벼운 비침 · 레이어 연출",
        detail: "창가·조명과 함께 쓰는 연출에 활용됩니다.",
        image: "/brand/fabrics/fabric-organza.jpg",
      },
    ],
    sizes: [
      { id: "a3", name: "소형", summary: "데스크·협탁 스케일" },
      { id: "a2", name: "중형", summary: "벽면 포인트" },
      { id: "a1", name: "대형", summary: "매장·전시 스케일" },
      { id: "custom", name: "맞춤", summary: "공간 치수에 맞춰 제안" },
    ],
    prints: [
      { id: "full", name: "풀컬러 인쇄", summary: "일러스트·사진 그래픽" },
      { id: "limited", name: "제한 컬러", summary: "브랜드 톤에 맞춘 절제된 색" },
    ],
    finishes: [
      { id: "hem-poster", name: "가장자리 봉제", summary: "걸이·접힘에 강한 마감" },
      { id: "rod", name: "봉·탭 마감", summary: "벽걸이 연출용 (협의)" },
      { id: "flat", name: "플랫 마감", summary: "접어 보관·선물하기 쉬운 형태" },
    ],
    pricingFactors: [
      "원단과 크기",
      "인쇄 방식과 컬러 수",
      "마감 방식",
      "수량",
      "샘플 제작 여부",
      "납품 일정",
    ],
    sampleNote:
      "원단마다 발색과 비침, 촉감이 다릅니다. 실물 샘플로 확인한 뒤 본생산 사양을 확정합니다. 샘플 비용과 조건은 시작 전에 안내합니다.",
    faqs: [
      {
        q: "보자기와 같은 디자인으로 만들 수 있나요?",
        a: "가능합니다. 하나의 그래픽을 보자기와 패브릭 포스터 두 가지 쓰임으로 이어 제작할 수 있어요.",
      },
      {
        q: "걸이 부자재도 포함되나요?",
        a: "봉·탭 등 걸이 마감은 사양에 따라 협의합니다. 필요한 연출을 상담 시 알려주세요.",
      },
      {
        q: "가격과 납기는 어떻게 정해지나요?",
        a: "사양과 수량에 따라 상담 후 안내합니다. 확정되지 않은 수치를 임의로 표시하지 않습니다.",
      },
    ],
  },
}

export const dualUse = {
  title: "하나의 디자인이, 두 가지 쓰임으로.",
  description:
    "브랜드의 그래픽을 선물을 감싸는 보자기와 공간을 채우는 패브릭 포스터로 이어보세요.",
  items: [
    {
      productId: "fabric-poster" as ProductId,
      label: "패브릭 포스터",
      scene: "벽에 걸린 공간 연출",
      image: "/brand/samples/bojagi-panel-scarf.jpg",
    },
    {
      productId: "bojagi" as ProductId,
      label: "보자기",
      scene: "같은 그래픽으로 감싼 선물",
      image: "/brand/samples/bojagi-beauty-wrap.jpg",
    },
  ],
}

export const materialPillars = [
  {
    id: "fabric",
    title: "원단",
    body: "발색·비침·촉감이 원단마다 다릅니다. 용도에 맞는 손맛부터 함께 고릅니다.",
    image: "/brand/fabrics/fabric-slab.jpg",
  },
  {
    id: "print",
    title: "인쇄",
    body: "풀컬러 인쇄, 자수, 직조 등 그래픽 성격에 맞는 표현 방식을 제안합니다.",
    image: "/brand/samples/bojagi-embroidered-wrap.jpg",
  },
  {
    id: "size",
    title: "크기",
    body: "제품 치수와 공간 스케일을 기준으로 여유와 비율을 맞춰 갑니다.",
    image: "/brand/samples/bojagi-book-wrap.jpg",
  },
  {
    id: "finish",
    title: "마감",
    body: "봉제, 매듭 연출, 걸이 마감까지. 실제로 쓰이는 장면을 기준으로 정합니다.",
    image: "/brand/samples/bojagi-bottle-wrap.jpg",
  },
]
