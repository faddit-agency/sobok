"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type TouchEvent } from "react"
import gsap from "gsap"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { projectWorks, type ProjectWork } from "@/data/projects"
import { cn } from "@/lib/utils"

/** freestanding poster frame width / gap — gallery stand look */
const FRAME_W = 200
const GAP = 48

function railX(index: number, viewportW: number) {
  return viewportW / 2 - FRAME_W / 2 - index * (FRAME_W + GAP)
}

export function ShowroomGallery() {
  const [index, setIndex] = useState(0)
  const touchX = useRef<number | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLElement[]>([])
  const reduceMotion = useRef(false)
  const active = projectWorks[index]

  const go = useCallback((next: number) => {
    const len = projectWorks.length
    setIndex(((next % len) + len) % len)
  }, [])

  const prev = useCallback(() => go(index - 1), [go, index])
  const next = useCallback(() => go(index + 1), [go, index])

  const syncRail = useCallback((i: number, animate: boolean) => {
    const rail = railRef.current
    const stage = stageRef.current
    if (!rail || !stage) return
    const x = railX(i, stage.clientWidth)
    if (!animate || reduceMotion.current) gsap.set(rail, { x })
    else gsap.to(rail, { x, duration: 0.9, ease: "power3.inOut", overwrite: "auto" })
  }, [])

  useLayoutEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const frames = framesRef.current.filter(Boolean)
    syncRail(0, false)

    const ctx = gsap.context(() => {
      if (reduceMotion.current || !frames.length) return
      gsap.from(frames, {
        y: -72,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.06,
        ease: "power3.out",
      })
      gsap.from("[data-hang-wire]", {
        scaleY: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: "power2.out",
      })
    })

    return () => ctx.revert()
  }, [syncRail])

  useEffect(() => {
    syncRail(index, true)
    if (infoRef.current && !reduceMotion.current) {
      gsap.fromTo(
        infoRef.current,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      )
    }
  }, [index, syncRail])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next])

  useEffect(() => {
    const onResize = () => syncRail(index, false)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [index, syncRail])

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
    touchX.current = null
    if (Math.abs(dx) < 40) return
    if (dx > 0) prev()
    else next()
  }

  return (
    <div className="flex min-h-[calc(100dvh-6rem)] flex-col">
      {/* white-box gallery */}
      <div
        ref={stageRef}
        className="relative flex-1 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #ffffff 0%, #f2f2f0 55%, #e8e8e4 100%)",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* floor plane */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[28%]"
          style={{
            background:
              "linear-gradient(180deg, #d9d9d6 0%, #c8c8c4 40%, #bdbdb8 100%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[28%] z-0 h-px bg-black/10"
          aria-hidden
        />
        {/* floor reflection wash */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[18%] opacity-40"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.35) 100%)",
          }}
          aria-hidden
        />

        {/* ceiling track */}
        <div className="absolute inset-x-0 top-0 z-20 h-px bg-black/20" aria-hidden />

        {/* hung row — from ceiling, floating above floor */}
        <div className="absolute inset-x-0 bottom-[30%] top-0 z-[1] flex items-start overflow-visible">
          <div
            ref={railRef}
            className="flex items-start will-change-transform"
            style={{ gap: GAP }}
          >
            {projectWorks.map((work, i) => (
              <PosterStand
                key={work.id}
                work={work}
                index={i}
                active={i === index}
                offset={i - index}
                onSelect={() => setIndex(i)}
                setRef={(el) => {
                  if (el) framesRef.current[i] = el
                }}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-[42%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/15 bg-white/85 backdrop-blur-sm hover:bg-white sm:left-6"
          aria-label="이전 작품"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-[42%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/15 bg-white/85 backdrop-blur-sm hover:bg-white sm:right-6"
          aria-label="다음 작품"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>

      <div className="border-t border-black/10 bg-white px-5 py-8 sm:px-8 sm:py-10">
        <div ref={infoRef} className="mx-auto grid max-w-[1100px] gap-8 sm:grid-cols-12 sm:gap-10">
          <div className="sm:col-span-7">
            <p className="text-[11px] tracking-[0.16em] text-black/45">
              {String(index + 1).padStart(2, "0")} · {active.kindLabel}
            </p>
            <h1 className="mt-2 font-display text-[22px] font-semibold tracking-tight sm:text-[28px]">
              {active.title}
            </h1>
            <p className="sentence mt-3 text-[13px] leading-relaxed text-black/65 sm:text-[14px]">
              {active.description}
            </p>
            <Link
              href={`/project/${active.id}`}
              className="mt-5 inline-flex items-center gap-2 border-b border-black pb-0.5 text-[12px] tracking-[0.12em] transition-opacity hover:opacity-60"
            >
              VIEW DETAIL
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-[12px] sm:col-span-5 sm:gap-y-5">
            <div>
              <dt className="tracking-[0.12em] text-black/40">YEAR</dt>
              <dd className="mt-1 text-black/80">{active.year}</dd>
            </div>
            <div>
              <dt className="tracking-[0.12em] text-black/40">CLIENT</dt>
              <dd className="mt-1 text-black/80">{active.client}</dd>
            </div>
            <div>
              <dt className="tracking-[0.12em] text-black/40">MATERIAL</dt>
              <dd className="mt-1 text-black/80">{active.material}</dd>
            </div>
            <div>
              <dt className="tracking-[0.12em] text-black/40">SIZE</dt>
              <dd className="mt-1 text-black/80">{active.size}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

function PosterStand({
  work,
  index,
  active,
  offset,
  onSelect,
  setRef,
}: {
  work: ProjectWork
  index: number
  active: boolean
  offset: number
  onSelect: () => void
  setRef: (el: HTMLElement | null) => void
}) {
  // hang drop length from ceiling — slightly varied
  const drop = active ? 28 : 36 + (index % 3) * 8

  const body = (
    <div className="relative w-full origin-top" style={{ paddingTop: drop }}>
      {/* twin wires from ceiling */}
      <div
        data-hang-wire
        className="absolute left-0 top-0 w-[2px] origin-top bg-[#141414]"
        style={{ height: drop }}
        aria-hidden
      />
      <div
        data-hang-wire
        className="absolute right-0 top-0 w-[2px] origin-top bg-[#141414]"
        style={{ height: drop }}
        aria-hidden
      />

      {/* hanging frame */}
      <div className="relative" style={{ height: "min(52vh, 380px)" }}>
        {/* side posts of the suspended frame */}
        <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#141414]" aria-hidden />
        <div className="absolute bottom-0 right-0 top-0 w-[3px] bg-[#141414]" aria-hidden />

        {/* fabric poster */}
        <div className="absolute bottom-[3%] left-[3px] right-[3px] top-[3%] overflow-hidden bg-[#0d0d0d]">
          <span className="absolute left-[18%] top-0 z-20 h-2 w-3.5 -translate-y-1/2 bg-[#141414]" aria-hidden />
          <span className="absolute right-[18%] top-0 z-20 h-2 w-3.5 -translate-y-1/2 bg-[#141414]" aria-hidden />
          <span className="absolute bottom-0 left-[18%] z-20 h-2 w-3.5 translate-y-1/2 bg-[#141414]" aria-hidden />
          <span className="absolute bottom-0 right-[18%] z-20 h-2 w-3.5 translate-y-1/2 bg-[#141414]" aria-hidden />

          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover"
            sizes="200px"
            priority={Math.abs(offset) <= 1}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 28px rgba(0,0,0,0.18)" }}
          />
        </div>
      </div>

      {/* cast shadow on floor below (not standing on it) */}
      <div
        className={cn(
          "pointer-events-none mx-auto mt-6 h-2 rounded-[100%] bg-black/25 blur-[6px] transition-opacity duration-500",
          active ? "w-[70%] opacity-50" : "w-[55%] opacity-30",
        )}
        aria-hidden
      />
    </div>
  )

  return (
    <div
      ref={setRef}
      className={cn(
        "relative shrink-0 origin-top transition-[opacity,transform] duration-500",
        active ? "z-10 scale-100 opacity-100" : "z-0 scale-[0.97] opacity-80 hover:opacity-95",
        Math.abs(offset) > 2 && "opacity-50",
      )}
      style={{ width: FRAME_W }}
    >
      {active ? (
        <Link href={`/project/${work.id}`} className="block" aria-current="true">
          {body}
        </Link>
      ) : (
        <button type="button" onClick={onSelect} className="block w-full text-left">
          {body}
        </button>
      )}
    </div>
  )
}
