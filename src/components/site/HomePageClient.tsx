"use client"

import { useCallback, useState } from "react"
import { LogoIntro } from "@/components/site/LogoIntro"
import { HomeHero } from "@/components/site/HomeHero"
import { SiteHeader } from "@/components/site/SiteHeader"
import { cn } from "@/lib/utils"

export function HomePageClient() {
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!introDone && <LogoIntro onDone={finishIntro} />}
      <div
        className={cn(
          "transition-opacity duration-1000",
          introDone ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="relative">
          <SiteHeader tone="dark" />
          <HomeHero />
        </div>
      </div>
    </>
  )
}
