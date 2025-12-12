export type WorkCaseStudy = {
  slug: string
  titleKey: string
  categoryKey: string
  descriptionKey: string
  statusKey: "works.launchable" | "works.preparing"
  imageClass: string
  heroImage: string
  heroSummary: string
  overview: string
  deliverables: string[]
  highlights: { title: string; description: string }[]
  palette: string[]
  metrics: { label: string; value: string }[]
  company?: string
  products?: string[]
  images?: string[]
}

export const worksData: WorkCaseStudy[] = [
  {
    slug: "milkdive",
    titleKey: "works.brand.milkdive",
    categoryKey: "works.category.derma",
    descriptionKey: "works.desc.milkdive",
    statusKey: "works.launchable",
    imageClass: "bg-gradient-to-br from-blue-100 to-purple-100",
    heroImage: "https://res.cloudinary.com/dsg01xpat/image/upload/v1765504060/KakaoTalk_20251211_194019890_01_x3csk9.jpg",
    heroSummary: "부모님의 청춘을 되찾아 줄 3세대 침향환, 연유침향환 포장 프로젝트",
    company: "설아래",
    products: ["3세대 침향환", "연유침향환"],
    overview:
      "효도선물끝판왕 프로젝트를 위한 맞춤형 보자기 제작입니다. 전통적인 침향환에 연유를 더해 흡수율과 맛을 개선한 제품의 고급스러운 이미지를 포장에 담아냈습니다. 부모님께 드리는 선물이라는 특별한 의미를 고려하여 정성스러운 디자인과 소재를 선택했고, 와디즈 펀딩을 통해 성공적으로 출시된 제품의 포장을 담당했습니다.",
    deliverables: [
      "효도선물 맞춤 보자기 제작",
      "전통과 현대가 조화된 디자인",
      "고급스러운 포장 솔루션",
      "와디즈 펀딩 출시 지원"
    ],
    highlights: [
      {
        title: "전통과 현대의 조화",
        description: "전통적인 침향환의 가치를 현대적인 포장 디자인으로 표현하여 부모님께 드리는 선물의 의미를 강조했습니다."
      },
      {
        title: "고품질 원료 반영",
        description: "엄선된 침향과 천연 재료를 사용한 제품의 품격을 포장 디자인에 반영하여 신뢰감을 높였습니다."
      },
      {
        title: "효도선물 특화 디자인",
        description: "부모님의 건강과 활력을 되찾아드리겠다는 브랜드 메시지를 포장에 담아 효도선물로 최적화된 디자인을 완성했습니다."
      }
    ],
    palette: ["#F5D7E8", "#E8B4C8", "#DC143C", "#B22222"],
    metrics: [
      { label: "제작 기간", value: "5 Weeks" },
      { label: "포장 수량", value: "12,000ea" },
      { label: "펀딩 성공률", value: "100%" }
    ],
    images: [
      "https://res.cloudinary.com/dsg01xpat/image/upload/v1765504060/KakaoTalk_20251211_194019890_vt3up9.jpg",
      "https://res.cloudinary.com/dsg01xpat/image/upload/v1765504060/KakaoTalk_20251211_194019890_01_x3csk9.jpg",
      "https://res.cloudinary.com/dsg01xpat/image/upload/v1765504061/24%E1%84%82%E1%85%A7%E1%86%AB7%E1%84%8B%E1%85%AF%E1%86%AF_%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%85%E1%85%A2_%E1%84%8A%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AA%E1%84%92%E1%85%AA%E1%86%AB-116_w8l7qc.jpg"
    ]
  },
  {
    slug: "puresource",
    titleKey: "works.brand.puresource",
    categoryKey: "works.category.derma",
    descriptionKey: "works.desc.puresource",
    statusKey: "works.launchable",
    imageClass: "bg-gradient-to-br from-green-100 to-teal-100",
    heroImage: "https://res.cloudinary.com/dsg01xpat/image/upload/v1765504060/KakaoTalk_20251211_194019890_03_yeaizp.jpg",
    heroSummary: "1억 천종산삼과 DNA 98.8% 동일, 백년 산삼배양근 포장 프로젝트",
    company: "설아래",
    products: ["백년 산삼배양근"],
    overview:
      "설선물끝판왕 프로젝트를 위한 맞춤형 보자기 제작입니다. 1억 원 상당의 천종산삼과 DNA가 98.8% 동일한 백년 산삼배양근이라는 고품질 제품의 가치를 포장에 담아냈습니다. 합리적인 가격으로 산삼의 효능을 제공한다는 브랜드 메시지를 반영하여 설 선물로 적합한 고급스러우면서도 접근 가능한 포장 디자인을 완성했습니다. 와디즈 펀딩을 통해 성공적으로 출시된 제품의 포장을 담당했습니다.",
    deliverables: [
      "설선물 맞춤 보자기 제작",
      "고품질 산삼 이미지 반영",
      "설 선물 특화 디자인",
      "와디즈 펀딩 출시 지원"
    ],
    highlights: [
      {
        title: "고품질 산삼 이미지",
        description: "천종산삼과 유사한 DNA를 가진 배양근의 가치를 포장 디자인에 반영하여 제품의 품격을 높였습니다."
      },
      {
        title: "설 선물 최적화",
        description: "설 명절에 부모님께 드리는 선물이라는 특별한 의미를 고려하여 정성스럽고 고급스러운 포장 디자인을 완성했습니다."
      },
      {
        title: "안전성과 신뢰감 강조",
        description: "청정 지역에서 철저한 관리하에 재배된 안전한 제품임을 포장을 통해 전달하여 신뢰감을 높였습니다."
      }
    ],
    palette: ["#B8A9C9", "#6B5B95", "#4A4A5C", "#E8E4E8"],
    metrics: [
      { label: "제작 기간", value: "4 Weeks" },
      { label: "포장 세트", value: "8,500ea" },
      { label: "펀딩 성공률", value: "100%" }
    ],
    images: [
      "https://res.cloudinary.com/dsg01xpat/image/upload/v1765504061/24%E1%84%82%E1%85%A7%E1%86%AB7%E1%84%8B%E1%85%AF%E1%86%AF_%E1%84%89%E1%85%A5%E1%86%AF%E1%84%8B%E1%85%A1%E1%84%85%E1%85%A2_%E1%84%8A%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AA%E1%84%92%E1%85%AA%E1%86%AB-116_w8l7qc.jpg",
      "https://res.cloudinary.com/dsg01xpat/image/upload/v1765504060/KakaoTalk_20251211_194019890_02_zj8bh8.jpg"
    ]
  },
  {
    slug: "blankpalette",
    titleKey: "works.brand.blankpalette",
    categoryKey: "works.category.makeup",
    descriptionKey: "works.desc.blankpalette",
    statusKey: "works.preparing",
    imageClass: "bg-gradient-to-br from-pink-100 to-rose-100",
    heroImage: "https://images.unsplash.com/photo-1512499617640-c2f999098c01?w=1200&h=800&fit=crop",
    heroSummary: "립 팔레트 런칭을 위한 모듈형 패키지 컨셉.",
    overview:
      "컬러 스와치가 강조되도록 크리스탈 소재에 무광 박을 조합했습니다. 체험 공간에서 쉽게 접었다 펼칠 수 있는 구조로 설계했고, 소량 제작이 가능한 공정을 도입하여 캠페인 단위의 운영이 가능하도록 했습니다.",
    deliverables: [
      "크리스탈 모듈 보자기",
      "캠페인 키트 & 리플렛",
      "쇼룸 디스플레이 패널",
      "언박싱 영상용 프로토타입"
    ],
    highlights: [
      {
        title: "모듈 설계",
        description: "사이즈가 다른 3종 제품을 하나의 패턴으로 감쌀 수 있도록 설계해 재고를 단순화."
      },
      {
        title: "콘텐츠 지원",
        description: "언박싱 영상 촬영을 위한 별도 촬영 샘플과 동선 스토리보드를 제공."
      },
      {
        title: "캠페인 확장",
        description: "이벤트 기간에 맞춰 쇼룸 그래픽, 프린트, 사인물까지 동일 톤으로 제작."
      }
    ],
    palette: ["#FCE3EC", "#F9C8D8", "#F3A7C2", "#EB7FA7"],
    metrics: [
      { label: "런칭 예정", value: "2025 Q1" },
      { label: "디자인 수", value: "3 Concepts" },
      { label: "커스텀 소재", value: "2 Types" }
    ]
  },
  {
    slug: "wanderlust",
    titleKey: "works.brand.wanderlust",
    categoryKey: "works.category.bodycare",
    descriptionKey: "works.desc.wanderlust",
    statusKey: "works.preparing",
    imageClass: "bg-gradient-to-br from-yellow-100 to-orange-100",
    heroImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=800&fit=crop",
    heroSummary: "리조트 바디케어 브랜드의 감각적인 여행 키트.",
    overview:
      "트래블 사이즈 제품을 한 번에 담을 수 있는 패키지로, 방수 처리된 소재를 사용했습니다. 시즌 컬러의 태슬과 파우치 형태로 변형 가능한 패턴을 제안해 여행지에서도 자연스럽게 사용할 수 있습니다.",
    deliverables: [
      "방수 코팅 보자기",
      "태슬 & 메탈 로고 참",
      "리조트 전용 웰컴 키트",
      "포장 매뉴얼 & 촬영 세트"
    ],
    highlights: [
      {
        title: "듀얼 사용",
        description: "포장 후 파우치로 활용할 수 있는 패턴을 개발해 사용성 향상."
      },
      {
        title: "리조트 협업",
        description: "각 리조트 룸 타입에 맞는 컬러 세트를 제안해 프리미엄 경험을 구축."
      },
      {
        title: "내구성 테스트",
        description: "습도 90% 환경에서도 형태가 유지되는지 반복 테스트 진행."
      }
    ],
    palette: ["#FFEAC1", "#FFD797", "#FFC06B", "#F9A948"],
    metrics: [
      { label: "프로토타입", value: "4 Rounds" },
      { label: "협업 리조트", value: "3 Resorts" },
      { label: "런칭", value: "2025 Summer" }
    ]
  },
  {
    slug: "phaserush",
    titleKey: "works.brand.phaserush",
    categoryKey: "works.category.skincare",
    descriptionKey: "works.desc.phaserush",
    statusKey: "works.preparing",
    imageClass: "bg-gradient-to-br from-indigo-100 to-blue-100",
    heroImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=800&fit=crop",
    heroSummary: "남성 스킨케어 라인을 위한 모던 & 테크 무드 패키지.",
    overview:
      "메탈릭 포일과 매트 소재를 혼합해 절제된 분위기를 표현했습니다. IoT 단말기와 연동된 인증 태그를 함께 제작하여 멤버십 고객에게는 고유 일련번호를 제공했습니다.",
    deliverables: [
      "메탈릭 포일 보자기",
      "RFID 태그 & 카드",
      "프리미엄 멤버십 키트",
      "프로모션 촬영 소품"
    ],
    highlights: [
      {
        title: "보안 강화",
        description: "멤버십 고객 전용으로 RFID를 삽입하여 정품 인증 플로우를 연동."
      },
      {
        title: "소재 믹스",
        description: "메탈릭과 매트 소재의 대비로 제품군을 직관적으로 구분."
      },
      {
        title: "콘텐츠 패키지",
        description: "런칭 프로모션에 사용할 그래픽 템플릿과 영상 컷 가이드를 제공."
      }
    ],
    palette: ["#E7ECFF", "#C9D5FF", "#A8B8F0", "#7D91D1"],
    metrics: [
      { label: "테스트 수량", value: "1,500ea" },
      { label: "런칭 일정", value: "2025 Q2" },
      { label: "특허 신청", value: "1 Filed" }
    ]
  },
  {
    slug: "squeelzy",
    titleKey: "works.brand.squeelzy",
    categoryKey: "works.category.makeup",
    descriptionKey: "works.desc.squeelzy",
    statusKey: "works.preparing",
    imageClass: "bg-gradient-to-br from-purple-100 to-pink-100",
    heroImage: "https://images.unsplash.com/photo-1512499617640-c2f999098c01?w=1200&h=800&fit=crop",
    heroSummary: "Z세대 타깃 틴트 라인을 위한 팝 컬러 패키지.",
    overview:
      "팝업 스토어나 SNS 콘텐츠에서 눈에 띄도록 네온 컬러를 적용했습니다. QR 코드를 통해 AR 필터와 연결되는 경험을 설계해 언박싱 이후에도 브랜드 콘텐츠를 즐길 수 있습니다.",
    deliverables: [
      "네온 컬러 나일론 보자기",
      "홀로그램 태그 & 스티커",
      "AR 필터 QR 카드",
      "캠페인 촬영 세트"
    ],
    highlights: [
      {
        title: "AR 연동",
        description: "포장 태그를 스캔하면 틴트 컬러를 가상으로 테스트할 수 있는 필터로 연결."
      },
      {
        title: "모듈형 패턴",
        description: "길이에 따라 자르면 액세서리 파우치로도 사용 가능."
      },
      {
        title: "SNS 확산",
        description: "UGC 제작을 위한 촬영 배경과 해시태그 가이드를 함께 설계."
      }
    ],
    palette: ["#FDE7FF", "#F9C4FF", "#F291FF", "#DB6BFF"],
    metrics: [
      { label: "UGC 생성", value: "3.2K+" },
      { label: "런칭 일정", value: "2025 Spring" },
      { label: "협업 크리에이터", value: "18 teams" }
    ]
  }
]

