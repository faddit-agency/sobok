import { useLanguage } from "../../contexts/LanguageContext"
import { st } from "../../i18n/studio"

type Props = {
  src?: string
  poster?: string
}

/** 홈 히어로 — 제작 영상 + 살짝 어두운 오버레이 */
export function HomeVideo({
  src = "/brand/home-bojagi-making.mp4",
  poster = "/products/slab.png",
}: Props) {
  const { language } = useLanguage()

  return (
    <div className="relative min-h-[min(70vh,640px)] w-full overflow-hidden bg-black md:min-h-[calc(100dvh-3.5rem)]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={st(language, "video.aria")}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
        aria-hidden
      />

      <div className="relative z-[1] flex h-full min-h-[min(70vh,640px)] items-end px-5 pb-10 pt-16 md:min-h-[calc(100dvh-3.5rem)] md:px-8 md:pb-14">
        <p className="max-w-[34ch] text-[18px] font-bold leading-snug tracking-tight text-white md:max-w-[40ch] md:text-[24px] md:leading-[1.35]">
          {st(language, "video.title")}
          <span className="mt-2 block text-[13px] font-normal text-white/75 md:text-[15px]">
            {st(language, "video.sub")}
          </span>
        </p>
      </div>
    </div>
  )
}
