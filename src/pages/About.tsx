import { ImageSlider } from "../components/ImageSlider"

export function About() {

  const sketchImages = [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop"
  ]

  return (
    <main>
      {/* Top Section */}
      <section 
        className="min-h-[45vh] flex items-center pt-16 mt-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dsg01xpat/image/upload/v1763523615/Untitled-1_ergimk.svg')`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Text */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
                Three Generations Under One Belief
              </h1>
              <p className="text-lg md:text-xl text-white">
                3대째 이어온 믿음, 철학을 이어가겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="min-h-[30vh] w-full flex items-center">
        <div className="w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full min-h-[30vh]">
            {/* Left: Sketch Image */}
            <div className="relative w-full h-full min-h-[30vh]">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop"
                alt="Design sketches"
                className="w-full h-full object-cover min-h-[30vh]"
              />
            </div>

            {/* Right: Text Content */}
            <div className="bg-black text-white flex items-center p-8 md:p-12 min-h-[30vh]">
              <div className="flex gap-6 md:gap-8 w-full max-w-2xl">
                {/* Left border line */}
                <div className="w-0.5 bg-white flex-shrink-0 h-full"></div>
                
                {/* Text content */}
                <div className="flex-1 space-y-3 md:space-y-4 relative pl-4">
                  {/* Additional left line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-white/50"></div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    SOBOK
                  </h2>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    소복은 3대째 이어오던 가업을 글로벌 브랜드로 성장시키기 위해 설립되었습니다.
                  </p>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-300 leading-relaxed">
                    <p>
                      창업주께서 강조하시던 "고객에게 신뢰를 얻고 만족을 드리라"는 핵심 가치 아래 더욱 만족스러운 디자인, 더욱 만족스러운 가격을 제공하여 보자기의 아름다움을 착용한 사람, 보는 사람 모두 즐길 수 있도록 하고 있습니다.
                    </p>
                    <p>
                      흔들리지 않는 철학을 가지고 한발 한발 나아가 세계인들이 하이퀄리티, 굿디자인의 소복을 함께 누릴 수 있도록 노력하겠습니다.
                    </p>
                  </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-2 drop-shadow-lg">Design Laboratory</h2>
            <p className="text-base md:text-lg text-white/90 drop-shadow-md">SOBOK</p>
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
              <p className="text-lg md:text-xl text-gray-700 mb-4">
                소복 보자기 디자인 연구소
              </p>
              <p className="text-gray-600 leading-relaxed">
                디자인 연구소를 통해 소복만의 감성과 스토리를 담은 보자기 및 다양한 제품을 연구하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Sketches Slider */}
      <section className="py-20 bg-gray-50">
        <ImageSlider images={sketchImages} visibleCount={4} autoPlay={false} />
      </section>
    </main>
  )
}

