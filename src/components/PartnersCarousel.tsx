export function PartnersCarousel() {
  const partnerLogos = [
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763513046/image_529_jv63hp.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763513047/image_530_jmwayb.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763513047/image_528_xej7xa.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763513047/image_527_tvkjqt.png",
    "https://res.cloudinary.com/dsg01xpat/image/upload/v1763513047/image_497_pm0ov5.png"
  ]

  // 무한 스크롤을 위해 로고를 3번 복제
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos]

  return (
    <div className="w-full py-8">
      {/* 제목 */}
      <div className="text-center px-4 mb-6">
        <p className="text-lg font-semibold text-gray-900 opacity-80">
          소복과 함께 브랜드의 마음을 정해온 기업입니다.
        </p>
      </div>

      {/* 무한 스크롤 캐러셀 */}
      <div className="relative w-full overflow-hidden">
        {/* 왼쪽 블러 그라데이션 */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
        
        {/* 오른쪽 블러 그라데이션 */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

        {/* 스크롤 컨테이너 */}
        <div className="flex scroll-container" style={{ width: 'calc(100% * 3)' }}>
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-16 h-24 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scroll-container {
          animation: scroll 50s linear infinite;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </div>
  )
}

