"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type BojagiPreviewProps = {
  colorHex: string
  patternImage?: string | null
  logoImage?: string | null
  className?: string
}

export function BojagiPreview({
  colorHex,
  patternImage,
  logoImage,
  className,
}: BojagiPreviewProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)]",
        className,
      )}
      style={{ backgroundColor: colorHex }}
    >
      {patternImage ? (
        <Image
          src={patternImage}
          alt="보자기에 올린 그래픽"
          fill
          unoptimized
          className="object-cover opacity-90 mix-blend-multiply"
        />
      ) : (
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0, transparent 48%, #000 49%, #000 51%, transparent 52%), linear-gradient(0deg, transparent 0, transparent 48%, #000 49%, #000 51%, transparent 52%)",
          backgroundSize: "40px 40px",
        }} />
      )}

      {/* 매듭 실루엣 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[18%] w-[18%] rounded-full border border-black/20 bg-black/10 backdrop-blur-[1px]"
          style={{ boxShadow: `0 0 0 10px ${colorHex}55` }}
        />
      </div>

      {logoImage && (
        <div className="absolute bottom-5 right-5 h-14 w-14 overflow-hidden rounded-sm bg-white/90 p-1.5 shadow-sm">
          <Image
            src={logoImage}
            alt="로고"
            width={56}
            height={56}
            unoptimized
            className="h-full w-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
