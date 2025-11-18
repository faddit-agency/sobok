import { Hero } from "../components/Hero"
import { ImageSlider } from "../components/ImageSlider"
import { WhoWeAreSection } from "../components/WhoWeAreSection"
import { ServicesFeatureSection } from "../components/ServicesFeatureSection"
import { ProcessSection } from "../components/ProcessSection"
import { CTASection } from "../components/CTASection"

export function Home() {
  // 업로드된 PNG 이미지들
  const images = [
    "/images/02-004 컨셉.png",
    "/images/05-002 컨셉 1.png",
    "/images/05-004 컨셉.png",
    "/images/05-009 Concept.png",
    "/images/06-001 명절2.png",
    "/images/06-007 Concept.png"
  ]

  return (
    <main>
      <Hero />
      <ImageSlider images={images} visibleCount={5} />
      <WhoWeAreSection />
      <ServicesFeatureSection />
      <ProcessSection />
      <CTASection />
    </main>
  )
}

