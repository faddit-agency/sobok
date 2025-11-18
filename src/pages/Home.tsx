import { Hero } from "../components/Hero"
import { ImageSlider } from "../components/ImageSlider"
import { WhoWeAreSection } from "../components/WhoWeAreSection"
import { ServicesFeatureSection } from "../components/ServicesFeatureSection"
import { ProcessSection } from "../components/ProcessSection"
import { CTASection } from "../components/CTASection"

export function Home() {
  const images = [
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=60"
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

