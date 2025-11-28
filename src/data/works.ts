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
}

export const worksData: WorkCaseStudy[] = [
  {
    slug: "milkdive",
    titleKey: "works.brand.milkdive",
    categoryKey: "works.category.skincare",
    descriptionKey: "works.desc.milkdive",
    statusKey: "works.launchable",
    imageClass: "bg-gradient-to-br from-blue-100 to-purple-100",
    heroImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop",
    heroSummary: "미백 앰플 라인의 첫 글로벌 런칭을 위한 미니멀 & 크랙 패턴 보자기 패키지.",
    company: "설아래",
    products: ["제품 1", "제품 2"],
    overview:
      "투명 앰플이 돋보이도록 광택감 있는 오간자 소재를 선택하고, 브랜드 로고 패턴을 직조하여 럭셔리한 분위기를 강조했습니다. 디지털 목업을 통해 결정을 빠르게 도와드렸고, 총 6가지 색상으로 시즌 한정 패키지를 구성했습니다.",
    deliverables: [
      "브랜드 로고 패턴 오간자 보자기",
      "제품 박스 맞춤 실크 리본",
      "런칭 키트 안내 카드 & 봉투",
      "포장 매뉴얼 & 인스토어 디스플레이"
    ],
    highlights: [
      {
        title: "패턴 섬세화",
        description: "패턴 반복 간격과 실 두께를 조정하여 광택감을 살리면서도 번짐 없이 로고를 구현."
      },
      {
        title: "프로토타입 3회",
        description: "실제 충진된 제품 무게와 동일한 더미로 여러 번 테스트해 촬영과 인도 상황 모두 안정적으로 유지."
      },
      {
        title: "패키지 매뉴얼",
        description: "리테일 매장에서 바로 사용할 수 있는 6단계 포장 가이드를 제작하여 브랜드 일관성을 확보."
      }
    ],
    palette: ["#E4ECFF", "#C3D4FF", "#A4B9F5", "#8B9FD8"],
    metrics: [
      { label: "제작 기간", value: "5 Weeks" },
      { label: "포장 수량", value: "12,000ea" },
      { label: "재주문율", value: "92%" }
    ]
  },
  {
    slug: "puresource",
    titleKey: "works.brand.puresource",
    categoryKey: "works.category.derma",
    descriptionKey: "works.desc.puresource",
    statusKey: "works.launchable",
    imageClass: "bg-gradient-to-br from-green-100 to-teal-100",
    heroImage: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1200&h=800&fit=crop",
    heroSummary: "피부과 전용 더마 라인을 위한 차분한 무드의 텍스처 보자기.",
    company: "설아래",
    products: ["제품 1", "제품 2"],
    overview:
      "슬라브 면 조직을 활용해 따뜻하면서도 전문적인 인상을 주도록 설계했습니다. FSC 인증지를 사용한 태그와 결합하여 친환경 메시지를 강화하고, 진료실에서 빠르게 포장할 수 있도록 스티치 가이드를 추가했습니다.",
    deliverables: [
      "슬라브 면 맞춤 직조 보자기",
      "FSC 인증지 태그 & 마킹 스티커",
      "시즌별 컬러칩 & 가이드 샘플",
      "클리닉 전용 포장 트레이"
    ],
    highlights: [
      {
        title: "친환경 인증",
        description: "전체 소재에 대해 LCA 리포트를 제공하여 B2B 파트너의 서류 작업까지 지원."
      },
      {
        title: "원스텝 포장",
        description: "스티치 라인을 따라 매듭만 묶으면 형태가 잡히도록 설계해 교육 시간을 60% 절감."
      },
      {
        title: "컬러 시스템",
        description: "클리닉별로 고를 수 있는 4가지 컬러 팔레트를 제안해 브랜드 경험을 확장."
      }
    ],
    palette: ["#E3F2ED", "#C4E0D5", "#A3CABF", "#6FA093"],
    metrics: [
      { label: "제작 기간", value: "4 Weeks" },
      { label: "포장 세트", value: "8,500ea" },
      { label: "교육 방문", value: "6 Sessions" }
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

