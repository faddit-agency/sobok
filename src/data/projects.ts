export type ProjectKind = "bojagi" | "fabric-poster"

export type ProjectWork = {
  id: string
  title: string
  kind: ProjectKind
  kindLabel: string
  image: string
  year: string
  client: string
  material: string
  size: string
  description: string
  /** 상세 에디토리얼 */
  headline: string
  story: string[]
  approach: string[]
  gallery: string[]
}

export const projectWorks: ProjectWork[] = [
  {
    id: "beauty-wrap",
    title: "뷰티 브랜드 선물 보자기",
    kind: "bojagi",
    kindLabel: "보자기",
    image: "/brand/samples/bojagi-beauty-wrap.jpg",
    year: "2025",
    client: "Private brand",
    material: "오간자 · 디지털 인쇄",
    size: "중형",
    description:
      "화장품 세트를 감싸는 가벼운 오간자 보자기. 매듭과 주름이 선물의 첫인상을 만듭니다.",
    headline: "가벼운 원단 위에, 첫인상을 묶다",
    story: [
      "뷰티 제품은 이미 완성된 오브제입니다. 포장은 그 위에 한 겹을 더하는 일이지, 제품을 가리는 일이 아니어야 했습니다.",
      "오간자의 투명함으로 안의 실루엣을 남기고, 매듭의 실루엣으로 브랜드의 손맛을 남겼습니다.",
    ],
    approach: [
      "원단: 가벼운 오간자, 디지털 인쇄로 브랜드 톤 맞춤",
      "형태: 중형 보자기, 세트 박스를 안정적으로 감싸는 비율",
      "디테일: 매듭·주름이 선물 개봉의 리듬이 되도록 설계",
    ],
    gallery: [
      "/brand/samples/bojagi-beauty-wrap.jpg",
      "/brand/concept-beauty-organza.jpg",
      "/brand/fabrics/fabric-organza.jpg",
    ],
  },
  {
    id: "fabric-poster-park",
    title: "공간 패브릭 포스터",
    kind: "fabric-poster",
    kindLabel: "패브릭 포스터",
    image: "/brand/fabric-poster-artwork.png",
    year: "2025",
    client: "Artist collaboration",
    material: "면 혼방 · 풀컬러 인쇄",
    size: "1200 × 1800 mm",
    description:
      "작가 작품을 패브릭 포스터로 옮긴 작업. 갤러리 벽에 걸린 그래픽이 원단 위에서 다시 펼쳐집니다.",
    headline: "벽에 걸린 그래픽이, 원단으로 다시 펼쳐지다",
    story: [
      "인쇄된 종이 포스터가 아니라, 공간의 공기와 함께 흔들리는 패브릭이어야 했습니다.",
      "작가의 선과 면이 원단 결 위에서 조금 더 부드럽게, 그러나 또렷하게 읽히도록 인쇄와 마감을 맞췄습니다.",
    ],
    approach: [
      "원단: 면 혼방, 풀컬러 인쇄",
      "규격: 1200 × 1800 mm, 걸개형 마감",
      "연출: 쇼룸·갤러리 벽에 수직으로 걸리는 비율 유지",
    ],
    gallery: [
      "/brand/fabric-poster-artwork.png",
      "/brand/samples/bojagi-panel-scarf.jpg",
      "/brand/fabrics/fabric-jacquard.jpg",
    ],
  },
  {
    id: "tea-slab",
    title: "티 브랜드 슬라브 보자기",
    kind: "bojagi",
    kindLabel: "보자기",
    image: "/brand/concept-tea-slab.jpg",
    year: "2024",
    client: "Tea house",
    material: "슬라브 · 단색 염색",
    size: "소형–중형",
    description:
      "차분한 결의 슬라브 원단으로 차 선물을 감쌌습니다. 일상에서 다시 쓰이는 포장을 의도했습니다.",
    headline: "차의 리듬에 맞춘, 다시 쓰이는 포장",
    story: [
      "차는 천천히 우려내는 물건입니다. 포장도 그 속도를 방해하지 않아야 했습니다.",
      "슬라브의 결이 손끝에 먼저 닿고, 매듭을 풀면 바로 티 매트나 작은 깔개로 이어지도록 설계했습니다.",
    ],
    approach: [
      "원단: 슬라브, 단색 염색으로 차분한 톤",
      "쓰임: 선물 포장 → 일상 매트로 재사용",
      "사이즈: 소형–중형, 다기·티백 세트에 맞춤",
    ],
    gallery: [
      "/brand/concept-tea-slab.jpg",
      "/brand/samples/bojagi-tea-wrap.jpg",
      "/brand/reuse-tea-mat.jpg",
      "/brand/fabrics/fabric-slab.jpg",
    ],
  },
  {
    id: "panel-scarf",
    title: "패널 스카프형 포스터",
    kind: "fabric-poster",
    kindLabel: "패브릭 포스터",
    image: "/brand/samples/bojagi-panel-scarf.jpg",
    year: "2024",
    client: "Lifestyle brand",
    material: "실크 혼방",
    size: "맞춤",
    description:
      "벽에 걸거나 스카프로 쓸 수 있는 이중 쓰임. 브랜드 그래픽이 공간과 사람 사이를 오갑니다.",
    headline: "공간과 사람 사이를 오가는 그래픽",
    story: [
      "벽에 걸리면 포스터, 몸에 걸치면 스카프. 하나의 패널이 두 장면을 갖는 작업입니다.",
      "실크 혼방의 드레이프가 그래픽의 가장자리를 부드럽게 접어, ‘걸린 그림’과 ‘입은 브랜드’ 사이를 연결합니다.",
    ],
    approach: [
      "원단: 실크 혼방",
      "형태: 패널형, 걸개·착용 겸용",
      "그래픽: 브랜드 모티프를 전면에 배치",
    ],
    gallery: [
      "/brand/samples/bojagi-panel-scarf.jpg",
      "/brand/reuse-bag-scarf.jpg",
      "/brand/samples/bojagi-bag.jpg",
    ],
  },
  {
    id: "jacquard-wrap",
    title: "자카드 직조 보자기",
    kind: "bojagi",
    kindLabel: "보자기",
    image: "/brand/samples/bojagi-jacquard-wrap.jpg",
    year: "2025",
    client: "Corporate gift",
    material: "자카드 직조",
    size: "중형",
    description:
      "로고와 패턴을 원단 자체에 짜 넣은 직조 커스텀. 인쇄 대신 조직으로 브랜드를 남깁니다.",
    headline: "인쇄가 아닌, 조직으로 남기는 로고",
    story: [
      "기업 선물은 오래 남아야 합니다. 잉크보다 실의 구조가 더 오래 기억된다고 봤습니다.",
      "자카드 직조로 로고와 패턴을 원단 안에 심어, 펼칠 때마다 브랜드가 결로 드러나게 했습니다.",
    ],
    approach: [
      "원단: 자카드 직조 커스텀",
      "표현: 인쇄 대신 조직·요철로 브랜드 마크",
      "용도: 코퍼레이트 기프트, 중형",
    ],
    gallery: [
      "/brand/samples/bojagi-jacquard-wrap.jpg",
      "/brand/fabrics/fabric-jacquard.jpg",
      "/brand/samples/bojagi-embroidered-wrap.jpg",
    ],
  },
  {
    id: "premium-crystal",
    title: "크리스탈 보자기",
    kind: "bojagi",
    kindLabel: "보자기",
    image: "/brand/concept-premium-crystal.jpg",
    year: "2024",
    client: "Seasonal gift",
    material: "크리스탈 · 매듭 연출",
    size: "대형",
    description:
      "광택 있는 크리스탈 원단과 풍성한 매듭. 행사·기념 선물에 맞춘 한 폭입니다.",
    headline: "광택과 매듭으로 만드는 기념의 한 폭",
    story: [
      "시즌 기프트는 사진에 남을 순간이 필요합니다. 원단의 광택이 그 순간을 받아줍니다.",
      "대형 폭과 풍성한 매듭으로, 풀기 전부터 이미 ‘기념’이 보이게 설계했습니다.",
    ],
    approach: [
      "원단: 크리스탈, 광택 강조",
      "연출: 대형 매듭·드레이프",
      "장면: 행사·시즌 기프트 촬영에 맞춤",
    ],
    gallery: [
      "/brand/concept-premium-crystal.jpg",
      "/brand/fabrics/fabric-crystal.jpg",
      "/brand/samples/bojagi-bottle-wrap.jpg",
    ],
  },
  {
    id: "book-wrap",
    title: "북 보자기",
    kind: "bojagi",
    kindLabel: "보자기",
    image: "/brand/samples/bojagi-book-wrap.jpg",
    year: "2023",
    client: "Publisher",
    material: "슬라브 · 자수",
    size: "소형",
    description: "책을 감싸는 간결한 보자기. 펼치면 책갈피처럼, 묶으면 선물처럼 쓰입니다.",
    headline: "묶으면 선물, 펼치면 책의 옆",
    story: [
      "책의 두께와 무게에 맞는 작은 비율이 필요했습니다. 과하지 않은 포장이 본문을 방해하지 않습니다.",
      "자수 포인트 하나로 출판사의 손글을 남기고, 펼치면 책갈피처럼 곁에 머물게 했습니다.",
    ],
    approach: [
      "원단: 슬라브 + 자수 포인트",
      "사이즈: 소형, 단행본 기준",
      "쓰임: 포장 ↔ 책갈피/커버",
    ],
    gallery: [
      "/brand/samples/bojagi-book-wrap.jpg",
      "/brand/fabrics/fabric-slab.jpg",
      "/brand/samples/bojagi-pouch.jpg",
    ],
  },
  {
    id: "indigo-wrap",
    title: "인디고 보자기",
    kind: "bojagi",
    kindLabel: "보자기",
    image: "/brand/samples/bojagi-indigo-wrap.jpg",
    year: "2023",
    client: "Craft studio",
    material: "천연 염색 · 면",
    size: "중형",
    description: "인디고 톤의 깊은 색. 손끝 마감이 드러나는 담백한 보자기입니다.",
    headline: "깊은 인디고, 담백한 손끝",
    story: [
      "색이 먼저 말하고, 형태는 조용히 받치는 작업입니다. 천연 염색의 깊이가 주인공입니다.",
      "면 원단의 결을 살리고, 봉제와 매듭만으로 마감해 공예 스튜디오의 태도를 그대로 옮겼습니다.",
    ],
    approach: [
      "원단: 면, 천연 인디고 염색",
      "마감: 최소 봉제, 손매듭",
      "톤: 흑백 화면에 가까운 깊은 단색",
    ],
    gallery: [
      "/brand/samples/bojagi-indigo-wrap.jpg",
      "/brand/hero-bojagi-bw.jpg",
      "/brand/fabrics/fabric-slab.jpg",
    ],
  },
]

export function getProjectById(id: string) {
  return projectWorks.find((p) => p.id === id)
}

export function getAdjacentProjects(id: string) {
  const i = projectWorks.findIndex((p) => p.id === id)
  if (i < 0) return { prev: null, next: null, index: -1 }
  const len = projectWorks.length
  return {
    index: i,
    prev: projectWorks[(i - 1 + len) % len],
    next: projectWorks[(i + 1) % len],
  }
}
