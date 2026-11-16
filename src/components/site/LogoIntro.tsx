"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/site/LanguageProvider"
import { cn } from "@/lib/utils"

type LogoIntroProps = {
  onDone: () => void
}

const LOGO_DONE_MS = 2800
const TYPE_MS = 72
const HOLD_AFTER_TYPE_MS = 2200
const FADE_MS = 700

/**
 * 사각 프레임은 채움 도형으로 고정.
 * 로고 완료 후 아래에 타이핑 카피.
 */
export function LogoIntro({ onDone }: LogoIntroProps) {
  const { t } = useLanguage()
  const fullText = t("intro.line")
  const [typed, setTyped] = useState("")
  const [typing, setTyping] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setTyped(fullText)
      onDone()
      return
    }

    const timers: number[] = []
    let cancelled = false

    timers.push(
      window.setTimeout(() => {
        if (cancelled) return
        setTyping(true)
        let i = 0
        const tick = () => {
          if (cancelled) return
          i += 1
          setTyped(fullText.slice(0, i))
          if (i < fullText.length) {
            timers.push(window.setTimeout(tick, TYPE_MS))
          } else {
            setTyping(false)
            timers.push(
              window.setTimeout(() => {
                if (cancelled) return
                setFadeOut(true)
                timers.push(window.setTimeout(() => onDone(), FADE_MS))
              }, HOLD_AFTER_TYPE_MS),
            )
          }
        }
        tick()
      }, LOGO_DONE_MS),
    )

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [fullText, onDone])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-black px-6 transition-opacity duration-700 sm:gap-10",
        fadeOut && "pointer-events-none opacity-0",
      )}
      aria-hidden={fadeOut}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.33 130.33"
        className="h-[min(28vw,140px)] w-[min(28vw,140px)] sm:h-[160px] sm:w-[160px]"
      >
        <defs>
          <mask id="arcMask" maskUnits="userSpaceOnUse" x="-5" y="-5" width="140" height="140">
            <path
              d="M89.9,-3 C89.9,48 50,84.5 -3,84.5"
              fill="none"
              stroke="#fff"
              strokeWidth="14"
              strokeLinecap="butt"
              pathLength="1"
              strokeDasharray="1 1"
              strokeDashoffset="1"
            >
              <animate
                id="arc"
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                begin="0.2s"
                dur="1.05s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.45 0 0.25 1"
              />
            </path>
          </mask>
          <mask id="triMask" maskUnits="userSpaceOnUse" x="-5" y="-5" width="140" height="140">
            <path
              d="M134,43.95 H54.2 L106,134"
              fill="none"
              stroke="#fff"
              strokeWidth="11"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              pathLength="1"
              strokeDasharray="1 1"
              strokeDashoffset="1"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                begin="arc.end+0.15s"
                dur="1.35s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.4 0 0.2 1"
              />
            </path>
          </mask>
        </defs>

        <path
          fill="#fff"
          fillRule="evenodd"
          shapeRendering="crispEdges"
          d="M121.9,121.9H8.43V8.43h113.48v113.48ZM12.04,118.3h106.26V12.04H12.04v106.26Z"
        />

        <path
          fill="#fff"
          mask="url(#arcMask)"
          d="M91.67,5.48c0,.98-.02,1.970-.06,2.94-.04,1.21-.11,2.42-.22,3.61-.89,10.81-3.97,21-8.81,30.12-.64,1.22-1.320,2.43-2.03,3.61-3.71,6.21-8.26,11.86-13.48,16.8-.89.85-1.81,1.67-2.74,2.470-13.78,11.89-31.72,19.09-51.31,19.09-.33,0-.65,0-.98-.01-1.21-.01-2.41-.05-3.61-.13-2.86-.16-5.67-.48-8.43-.94v-3.66c2.76.49,5.58.82,8.43.98,1.2.08,2.4.13,3.61.14.32.01.65.01.98.01,18.93,0,36.25-7.04,49.47-18.67.93-.8,1.84-1.64,2.72-2.5,4.2-4.07,7.93-8.630,11.1-13.58.76-1.18,1.48-2.38,2.16-3.61,5.1-9.05,8.36-19.26,9.3-30.12.11-1.2.19-2.4.23-3.61.04-.97.06-1.96.06-2.94,0-1.84-.07-3.67-.2-5.48h3.62c.13,1.81.19,3.64.19,5.48Z"
        />

        <polygon
          fill="#fff"
          mask="url(#triMask)"
          points="130.33 42.15 130.33 45.76 57.37 45.76 65.21 59.34 67.07 62.56 99.25 118.29 101.33 121.9 106.2 130.33 102.03 130.33 97.17 121.9 95.08 118.29 64.33 65.03 62.49 61.840 51.12 42.15 130.33 42.15"
        />
      </svg>

      <p
        className="min-h-[1.5em] text-center text-[14px] font-medium tracking-[-0.01em] text-white/90 sm:text-[16px]"
        aria-live="polite"
      >
        {typed}
        <span
          className={cn(
            "ml-0.5 inline-block h-[1em] w-[1px] translate-y-[0.12em] bg-white/80 align-baseline",
            typing ? "animate-pulse" : typed ? "opacity-0" : "opacity-0",
          )}
          aria-hidden
        />
      </p>
    </div>
  )
}
