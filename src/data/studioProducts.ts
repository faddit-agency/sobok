export type StudioProduct = {
  id: string
  title: string
  titleEn: string
  material: string
  size: string
  image: string
  /** relative visual height in the row (0.7–1) */
  scale: number
}

export const studioProducts: StudioProduct[] = [
  {
    id: "beauty",
    title: "뷰티 선물 보자기",
    titleEn: "Beauty Wrap",
    material: "오간자",
    size: "중형",
    image: "/brand/samples/bojagi-beauty-wrap.jpg",
    scale: 1,
  },
  {
    id: "indigo",
    title: "인디고 보자기",
    titleEn: "Indigo Wrap",
    material: "천연 염색 · 면",
    size: "중형",
    image: "/brand/samples/bojagi-indigo-wrap.jpg",
    scale: 0.92,
  },
  {
    id: "jacquard",
    title: "자카드 직조 보자기",
    titleEn: "Jacquard Wrap",
    material: "자카드 직조",
    size: "중형",
    image: "/brand/samples/bojagi-jacquard-wrap.jpg",
    scale: 0.88,
  },
  {
    id: "tea",
    title: "티 보자기",
    titleEn: "Tea Wrap",
    material: "슬라브",
    size: "소형–중형",
    image: "/brand/samples/bojagi-tea-wrap.jpg",
    scale: 0.85,
  },
  {
    id: "book",
    title: "북 보자기",
    titleEn: "Book Wrap",
    material: "슬라브 · 자수",
    size: "소형",
    image: "/brand/samples/bojagi-book-wrap.jpg",
    scale: 0.78,
  },
  {
    id: "bottle",
    title: "보틀 보자기",
    titleEn: "Bottle Wrap",
    material: "면 · 매듭",
    size: "중형",
    image: "/brand/samples/bojagi-bottle-wrap.jpg",
    scale: 0.95,
  },
  {
    id: "embroidered",
    title: "자수 보자기",
    titleEn: "Embroidered Wrap",
    material: "면 · 자수",
    size: "중형",
    image: "/brand/samples/bojagi-embroidered-wrap.jpg",
    scale: 0.9,
  },
  {
    id: "panel",
    title: "패널 스카프",
    titleEn: "Panel Scarf",
    material: "실크 혼방",
    size: "맞춤",
    image: "/brand/samples/bojagi-panel-scarf.jpg",
    scale: 1,
  },
  {
    id: "bag",
    title: "보자기 백",
    titleEn: "Bojagi Bag",
    material: "면 혼방",
    size: "중형",
    image: "/brand/samples/bojagi-bag.jpg",
    scale: 0.82,
  },
  {
    id: "pouch",
    title: "보자기 파우치",
    titleEn: "Pouch",
    material: "면",
    size: "소형",
    image: "/brand/samples/bojagi-pouch.jpg",
    scale: 0.72,
  },
  {
    id: "crystal",
    title: "크리스탈 보자기",
    titleEn: "Crystal Wrap",
    material: "크리스탈",
    size: "대형",
    image: "/brand/concept-premium-crystal.jpg",
    scale: 0.98,
  },
  {
    id: "slab",
    title: "슬라브 보자기",
    titleEn: "Slab Wrap",
    material: "슬라브 · 단색",
    size: "중형",
    image: "/brand/concept-tea-slab.jpg",
    scale: 0.86,
  },
]
