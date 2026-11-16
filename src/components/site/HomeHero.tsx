"use client"

import Image from "next/image"
import { useLanguage } from "@/components/site/LanguageProvider"
import { site } from "@/data/site"

export function HomeHero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden bg-black text-white">
      <Image
        src={site.heroImage}
        alt="흑백 보자기 포장"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-10 sm:pb-12">
        <p className="sentence sentence-nowrap px-6 text-center text-[13px] leading-relaxed text-white/85 sm:text-[14px]">
          {t("tagline")}
        </p>
      </div>
    </section>
  )
}
