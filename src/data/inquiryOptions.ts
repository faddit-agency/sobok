export const productKinds = [
  {
    id: "bojagi" as const,
    label: "일반 보자기",
    description: "인쇄·염색·봉제 중심의 커스텀 보자기",
  },
  {
    id: "weave" as const,
    label: "직조 커스텀",
    description: "원단에 패턴·로고를 짜 넣는 직조 방식",
  },
]

export const fabricOptions = [
  { id: "slab", label: "슬라브" },
  { id: "organza", label: "오간자" },
  { id: "crystal", label: "크리스탈" },
  { id: "jacquard", label: "자카드 직조" },
  { id: "undecided", label: "상담 후 결정" },
]

export const sizeOptions = [
  { id: "s", label: "소형" },
  { id: "m", label: "중형" },
  { id: "l", label: "대형" },
  { id: "custom", label: "맞춤 사이즈" },
]

export const quantityOptions = [
  { id: "1-10", label: "1–10장" },
  { id: "11-50", label: "11–50장" },
  { id: "51-100", label: "51–100장" },
  { id: "100+", label: "100장 이상" },
  { id: "sample", label: "샘플만" },
]
