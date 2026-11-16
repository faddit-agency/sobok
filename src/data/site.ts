export const site = {
  brandName: "가위바위보자기",
  brandNameEn: "Gawi Bawi Bojagi",
  tagline: "Not rock, not scissors. We play Bojagi.",
  description:
    "브랜드의 마지막 승부를 함께 디자인하는 커스텀 보자기 스튜디오. 원단·컬러·사이즈·디자인을 직접 고르고, 담당자와 채팅으로 상담하세요.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  heroImage: "/brand/hero-bojagi-bw.jpg",
  logo: "/brand/logo.png",
  nav: [
    { label: "ABOUT", href: "/about" },
    { label: "PROJECT", href: "/project" },
    { label: "STUDIO", href: "/studio" },
    { label: "INQUIRIES", href: "/inquiries" },
  ],
  social: {
    instagram: "#",
    kakao: "#",
  },
} as const

export const fabricColors = [
  { id: "ivory", label: "아이보리", hex: "#F4F0E6" },
  { id: "charcoal", label: "차콜", hex: "#2B2B2B" },
  { id: "ink", label: "잉크", hex: "#121212" },
  { id: "blush", label: "블러시", hex: "#E8C9C4" },
  { id: "sage", label: "세이지", hex: "#9AA892" },
  { id: "indigo", label: "인디고", hex: "#2F3E6B" },
  { id: "wine", label: "와인", hex: "#6B2E3A" },
  { id: "gold", label: "골드", hex: "#C4A574" },
] as const
