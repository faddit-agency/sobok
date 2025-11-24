import { Hero } from "../components/Hero"
import { ImageSlider } from "../components/ImageSlider"
import { WhoWeAreSection } from "../components/WhoWeAreSection"
import { ServicesFeatureSection } from "../components/ServicesFeatureSection"
import { ProcessSection } from "../components/ProcessSection"
import { WorksSummarySection } from "../components/WorksSummarySection"
import { CTASection } from "../components/CTASection"
import { useMetaTags } from "../hooks/useMetaTags"
import { useLanguage } from "../contexts/LanguageContext"

export function Home() {
  const { t } = useLanguage()
  
  useMetaTags({
    title: "SOBOK | 브랜드 맞춤형 보자기 제작 서비스",
    description: "브랜드를 위한 맞춤형 보자기 제작 서비스. 슬라브·오간자·크리스탈부터 직조 패턴 보자기까지, 디자인 파일만 전달하면 목업 제작부터 납품까지 전 과정을 책임집니다.",
    image: "/og-home.jpg",
    url: "/",
    type: "website"
  })
  const images = [
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512568/05-004_%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A6%E1%86%B8_sevqcw.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512568/06-007_Concept_ae7yt8.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512567/02-004_%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A6%E1%86%B8_wx5f5x.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512570/05-002_%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A6%E1%86%B8_1_o8nmnn.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512570/05-009_Concept_a04gsa.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512570/06-001_%E1%84%86%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%AF2_epgofq.png"
  ]

  return (
    <main>
      <Hero />
      <ImageSlider images={images} visibleCount={5} autoPlay={false} />
      <WhoWeAreSection />
      <ServicesFeatureSection />
      <ProcessSection />
      <WorksSummarySection />
      <CTASection />
    </main>
  )
}

