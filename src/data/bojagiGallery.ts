export type GallerySection = "bojagi" | "poster"

export type BojagiGalleryItem = {
  section: GallerySection
  src: string
  s: number
  name: string
  en: string
  cat: string[]
  size?: string
  /** 패브릭 포스터 상세 스펙 [라벨, 값][] */
  spec?: [string, string][]
  desc: string
}

export const gallerySections: {
  id: GallerySection
  label: string
  cta: string
}[] = [
  { id: "bojagi", label: "보자기", cta: "이 보자기로 맞춤 제작" },
  { id: "poster", label: "패브릭 포스터", cta: "이 포스터 맞춤 제작" },
]

const bojagi: BojagiGalleryItem[] = [
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b2.webp",
    s: 0.8,
    name: "쪽빛 명주 병보자기",
    en: "Indigo silk bottle wrap",
    cat: ["명주", "병 포장", "외매듭"],
    size: "70 × 70 cm",
    desc: "와인과 전통주를 위한 길쭉한 병 보자기. 병목에서 한 번 묶고 끝자락은 길게 흘려 두어 받는 순간 바로 풀 수 있어요.",
  },
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b1.webp",
    s: 0.56,
    name: "광목 민무늬 보자기",
    en: "Plain gwangmok wrap",
    cat: ["광목", "선물 포장", "귀매듭"],
    size: "90 × 90 cm",
    desc: "표백하지 않은 광목을 재단해 네 변을 감침질하고 다려 완성했어요. 두 귀가 쫑긋 서는 가장 기본의 매듭.",
  },
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b6.webp",
    s: 0.7,
    name: "연옥 모시 다관 보자기",
    en: "Ramie tea tin wrap",
    cat: ["모시", "차 선물", "토끼귀매듭"],
    size: "60 × 60 cm",
    desc: "속이 은은히 비치는 모시로 차 통을 감쌌어요. 여름 선물에 어울리는 서늘한 결.",
  },
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b3.webp",
    s: 0.62,
    name: "홍색 명주 예단 보자기",
    en: "Crimson silk wedding wrap",
    cat: ["명주", "예단", "꽃매듭"],
    size: "110 × 110 cm",
    desc: "혼례 예단함을 위한 큰 보자기. 붉은 명주의 윤기가 매듭의 날개에서 가장 아름답게 살아나요.",
  },
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b7.webp",
    s: 0.8,
    name: "치자 노방 쌍병 보자기",
    en: "Gardenia organza double wrap",
    cat: ["노방", "2병 포장", "나비매듭"],
    size: "80 × 80 cm",
    desc: "치자 빛 노방으로 두 병을 한 번에. 얇고 빳빳한 결이라 매듭이 오래도록 형태를 지켜요.",
  },
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b4.webp",
    s: 0.42,
    name: "먹색 삼베 꽃보자기",
    en: "Charcoal hemp flower wrap",
    cat: ["삼베", "소품 포장", "꽃잎매듭"],
    size: "50 × 50 cm",
    desc: "거친 삼베의 결을 그대로 살린 작은 꽃보자기. 네 귀를 펼쳐 꽃잎처럼 둘렀어요.",
  },
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b5.webp",
    s: 0.84,
    name: "광목 손잡이 보자기",
    en: "Gwangmok handle wrap",
    cat: ["광목", "가방형", "고리매듭"],
    size: "100 × 100 cm",
    desc: "마주 보는 두 귀를 길게 이어 손잡이로. 선물을 전한 뒤에는 장바구니로 다시 쓰는 보자기.",
  },
  {
    section: "bojagi",
    src: "/brand/bojagi-gallery/b8.webp",
    s: 0.68,
    name: "분홍 명주 찬합 보자기",
    en: "Pink silk chanhap wrap",
    cat: ["명주", "찬합", "고리매듭"],
    size: "90 × 90 cm",
    desc: "명절 찬합을 들고 가기 좋게 고리 매듭을 지었어요. 고운 분홍이 칠기 찬합의 짙은 색과 대비를 이뤄요.",
  },
]

const posters: BojagiGalleryItem[] = [
  {
    section: "poster",
    src: "/brand/bojagi-gallery/p1.webp",
    s: 0.8,
    name: "쪽빛 해 광목 포스터",
    en: "Indigo sun gwangmok poster",
    cat: ["광목", "실크스크린"],
    spec: [
      ["원단", "광목 면 100%"],
      ["방식", "실크스크린 인쇄 · 쪽빛 1도"],
      ["크기", "50 × 80 cm"],
      ["거치", "원목 봉 + 면끈 걸이"],
    ],
    desc: "광목 위에 쪽빛 원 하나와 작은 글자 하나. 가장 단순한 형태로 보자기의 마음을 벽에 걸었어요.",
  },
  {
    section: "poster",
    src: "/brand/bojagi-gallery/p2.webp",
    s: 0.7,
    name: "조각보 색면 포스터",
    en: "Jogakbo colour block poster",
    cat: ["광목·모시", "조각 이음"],
    spec: [
      ["원단", "광목 · 모시 조각"],
      ["방식", "조각 이음 바느질 (쌈솔)"],
      ["크기", "60 × 80 cm"],
      ["거치", "호두나무 봉 + 마끈 걸이"],
    ],
    desc: "남은 천을 이어 붙이던 조각보의 지혜를 색면 구성으로 옮겼어요. 조각마다 바느질 선이 그대로 드러나요.",
  },
  {
    section: "poster",
    src: "/brand/bojagi-gallery/p3.webp",
    s: 0.88,
    name: "매화 자수 족자",
    en: "Plum blossom embroidered scroll",
    cat: ["리넨", "손자수"],
    spec: [
      ["원단", "리넨 면 혼방"],
      ["방식", "손자수 · 2색 실"],
      ["크기", "35 × 110 cm"],
      ["거치", "원목 봉 + 면끈 걸이"],
    ],
    desc: "민화 속 매화 한 가지를 세로로 길게 수놓은 족자형 포스터. 좁은 벽이나 현관에 어울려요.",
  },
  {
    section: "poster",
    src: "/brand/bojagi-gallery/p4.webp",
    s: 0.74,
    name: "결 타이포 포스터",
    en: "Gyeol typography poster",
    cat: ["광목", "실크스크린"],
    spec: [
      ["원단", "광목 면 100%"],
      ["방식", "실크스크린 인쇄 · 먹색 · 주홍 2도"],
      ["크기", "60 × 80 cm"],
      ["거치", "먹색 원목 봉 + 면끈 걸이"],
    ],
    desc: "천의 결, 사람의 결. 한 글자를 크게 찍어 광목의 결과 함께 보이도록 했어요. 원하는 글자로 바꿔 제작할 수 있어요.",
  },
  {
    section: "poster",
    src: "/brand/bojagi-gallery/p5.webp",
    s: 0.78,
    name: "오방색 줄 포스터",
    en: "Obangsaek stripe poster",
    cat: ["리넨", "날염"],
    spec: [
      ["원단", "내추럴 리넨"],
      ["방식", "디지털 날염"],
      ["크기", "50 × 80 cm"],
      ["거치", "원목 봉 + 마끈 걸이"],
    ],
    desc: "청·적·황·백·흑, 다섯 가지 오방색을 가로줄로 단정하게 나눴어요. 공간에 밝은 기운을 더해요.",
  },
  {
    section: "poster",
    src: "/brand/bojagi-gallery/p6.webp",
    s: 0.56,
    name: "산수 먹그림 포스터",
    en: "Ink landscape hemp poster",
    cat: ["삼베", "먹 날염"],
    spec: [
      ["원단", "삼베"],
      ["방식", "먹 농담 날염 · 낙관 1도"],
      ["크기", "90 × 60 cm"],
      ["거치", "호두나무 봉 + 마끈 걸이"],
    ],
    desc: "거친 삼베 결 위에 번지는 먹빛 산수. 가로로 길어 소파나 침대 위 벽에 잘 어울려요.",
  },
  {
    section: "poster",
    src: "/brand/bojagi-gallery/p7.webp",
    s: 0.74,
    name: "창살 자수 포스터",
    en: "Lattice embroidered poster",
    cat: ["면", "기계 자수"],
    spec: [
      ["원단", "홍색 면 캔버스"],
      ["방식", "기계 자수 · 흰 실"],
      ["크기", "50 × 70 cm"],
      ["거치", "원목 봉 + 면끈 걸이"],
    ],
    desc: "한옥 창살의 기하 무늬를 흰 실로 도톰하게 수놓았어요. 아래 문구는 원하는 글귀로 바꿀 수 있어요.",
  },
]

export const bojagiGalleryItems: BojagiGalleryItem[] = [...bojagi, ...posters]

export function getGalleryItems(section: GallerySection) {
  return bojagiGalleryItems.filter((item) => item.section === section)
}

/** 상세 dl 행 — download CATS.spec 과 동일 */
export function getDetailSpec(item: BojagiGalleryItem): [string, string][] {
  if (item.section === "poster" && item.spec) {
    return item.spec.map((row, i) => {
      const label =
        row[0] === "방식" ? "인쇄/자수" : row[0] === "거치" ? "거치 방식" : row[0]
      const value = i === 2 ? `${row[1]} · 맞춤 가능` : row[1]
      return [label, value]
    })
  }
  return [
    ["원단", item.cat[0] ?? ""],
    ["용도", item.cat[1] ?? ""],
    ["매듭", item.cat[2] ?? ""],
    ["크기", `${item.size ?? ""} · 맞춤 가능`],
  ]
}

export function getHoverLines(item: BojagiGalleryItem): string[] {
  if (item.spec?.[2]) return [...item.cat, item.spec[2][1]]
  return item.cat
}

export const GALLERY_ACCENTS = ["#2f5bff", "#e3342f", "#f2b705", "#1aa37a"] as const
