import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { OptimizedImage } from "./OptimizedImage"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

interface ImageSliderProps {
  images: string[]
  autoPlay?: boolean
  interval?: number
  visibleCount?: number
}

export function ImageSlider({ images, autoPlay = true, interval = 5000, visibleCount = 4 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responsiveVisibleCount, setResponsiveVisibleCount] = useState(visibleCount)
  const { ref, isVisible } = useScrollAnimation()

  // 반응형 visibleCount 설정
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width < 640) {
        setResponsiveVisibleCount(1) // 모바일: 1개
      } else if (width < 768) {
        setResponsiveVisibleCount(2) // 작은 태블릿: 2개
      } else if (width < 1024) {
        setResponsiveVisibleCount(3) // 태블릿: 3개
      } else if (width < 1280) {
        setResponsiveVisibleCount(4) // 큰 태블릿/작은 데스크톱: 4개
      } else {
        setResponsiveVisibleCount(visibleCount) // 데스크톱: 지정된 개수
      }
    }

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [visibleCount])

  useEffect(() => {
    if (!autoPlay || images.length <= responsiveVisibleCount) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, images.length - responsiveVisibleCount)
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, images.length, responsiveVisibleCount])

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, images.length - responsiveVisibleCount)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, images.length - responsiveVisibleCount)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, images.length - responsiveVisibleCount)
    setCurrentIndex(Math.min(index, maxIndex))
  }

  if (images.length === 0) return null

  const maxIndex = Math.max(0, images.length - responsiveVisibleCount)
  const displayImages = images.slice(currentIndex, currentIndex + responsiveVisibleCount)

  return (
    <section 
      ref={ref}
      className={`relative w-full pt-4 pb-12 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8">
        {/* 이미지 그리드 */}
        <div 
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {displayImages.map((image, index) => (
            <div
              key={currentIndex + index}
              className="relative w-full aspect-[3/4] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] overflow-hidden"
            >
              <OptimizedImage
                src={image}
                alt={`Slide ${currentIndex + index + 1}`}
                className="w-full h-full object-cover"
                sizes={responsiveVisibleCount === 1 ? "100vw" : responsiveVisibleCount === 2 ? "50vw" : responsiveVisibleCount === 3 ? "33vw" : responsiveVisibleCount === 4 ? "25vw" : "20vw"}
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      {images.length > responsiveVisibleCount && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 shadow-lg transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 shadow-lg transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* 인디케이터 */}
      {images.length > responsiveVisibleCount && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8"
                  : "w-2"
              }`}
              style={{
                backgroundColor: index === currentIndex ? '#222222' : '#d1d5db'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

