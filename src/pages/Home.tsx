import { Hero } from "../components/Hero"
import { ImageSlider } from "../components/ImageSlider"
import { WhoWeAreSection } from "../components/WhoWeAreSection"
import { ServicesFeatureSection } from "../components/ServicesFeatureSection"
import { ProcessSection } from "../components/ProcessSection"
import { CTASection } from "../components/CTASection"

export function Home() {
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
      <CTASection />
    </main>
  )
}

