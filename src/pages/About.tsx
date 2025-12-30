import { ImageSlider } from "../components/ImageSlider"

export function About() {

  const sketchImages = [
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512568/05-004_%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A6%E1%86%B8_sevqcw.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512568/06-007_Concept_ae7yt8.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512567/02-004_%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A6%E1%86%B8_wx5f5x.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512570/05-002_%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A6%E1%86%B8_1_o8nmnn.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512570/05-009_Concept_a04gsa.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763512570/06-001_%E1%84%86%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%AF2_epgofq.png"
  ]

  return (
    <main>
      {/* Top Section */}
      <section 
        className="min-h-[45vh] flex items-center pt-16 mt-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsg01xpat/image/upload/v1763527778/%E1%84%89%E1%85%A9%E1%84%87%E1%85%A9%E1%86%A8_%E1%84%87%E1%85%A9%E1%84%8C%E1%85%A1%E1%84%80%E1%85%B5_1_n4ovhy.png')`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Text */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black leading-tight">
                Crafted with Care, <br /> Wrapped with Meaning
              </h1>
              <div className="space-y-3 text-lg md:text-xl text-black">
                <p>정성으로 만든 포장, 브랜드의 가치를 담습니다.</p>
                <p>브랜드를 위한 맞춤형 보자기 제작 서비스.</p>
                <p>전통적 감성과 현대적 디자인을 결합해 소복만의 차별화된 포장 솔루션을 제공합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="min-h-[45vh] w-full flex items-center">
        <div className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full min-h-[45vh]">
            {/* Left: Showcase Image */}
            <div className="relative w-full h-full min-h-[45vh] overflow-hidden bg-black">
              <img
                src="https://res.cloudinary.com/dsg01xpat/image/upload/v1763540335/bozhin-karaivanov-p1jldJ9tZ6c-unsplash_3_znx2wx.jpg"
                alt="소복 craftsmanship"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Right: Text Content */}
            <div className="bg-black text-white flex items-center p-8 md:p-12 min-h-[45vh]">
              <div className="w-full max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
                  소복
                </h2>
                <div className="mt-4 space-y-3 md:space-y-4 text-lg md:text-xl text-gray-300 leading-relaxed">
                  <p>
                    소복은 브랜드의 이야기를 '포장'이라는 형태로 담아내는 맞춤형 보자기 제작 전문 브랜드입니다.
                  </p>
                  <p>
                    슬라브·오간자·크리스탈 등 다양한 소재부터 브랜드 패턴을 활용한 직조 보자기 제작까지 지원하며, 디자인 파일 전달만으로 맞춤 목업을 제작해 브랜드가 원하는 분위기와 아이덴티티에 맞춘 결과물을 제공합니다.
                  </p>
                  <p>
                    단순한 포장을 넘어 브랜드 경험을 완성하는 패키지를 만들기 위해 끊임없이 연구하며, 품질과 완성도에 대한 기준을 지켜가고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Laboratory Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&h=800&fit=crop"
            alt="Design process"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-md"></div>
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 drop-shadow-lg">Design Laboratory — 소복</h2>
            <p className="text-base md:text-lg text-white/90 drop-shadow-md max-w-2xl mx-auto px-4">
              소복 보자기 디자인 연구소는 브랜드의 개성과 스토리를 시각적으로 표현할 수 있는 보자기 패턴과 패키지 디자인을 개발하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Design Laboratory Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Desk Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&h=600&fit=crop"
                alt="Design workspace"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right: Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
                Design Laboratory
              </h2>
              <div className="border-t border-gray-300 w-16"></div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  소복 보자기 디자인 연구소는 브랜드가 원하는 분위기, 시즌 무드, 프로젝트 목적에 맞춘 맞춤형 보자기 및 포장 소모품 디자인을 연구합니다.
                </p>
                <p>
                  자재 선택부터 제작 방식까지 브랜드 컨셉과 톤앤매너에 맞추어 브랜드를 가장 잘 표현할 수 있는 포장 솔루션을 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Sketches Slider */}
      <section className="py-20 bg-gray-50">
        <ImageSlider images={sketchImages} visibleCount={5} autoPlay={false} />
      </section>
    </main>
  )
}

