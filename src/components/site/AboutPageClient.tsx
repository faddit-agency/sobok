"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Droplets, Hand, Layers } from "lucide-react"
import { site } from "@/data/site"

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    icon: Droplets,
    n: "01",
    title: "원단에 색을 입히기",
    sentences: [
      "원단 인쇄와 다양한 프린팅, 염색으로 원하는 컬러와 패턴을 그대로 구현합니다.",
      "브랜드와 소통을 통해 원단 위에 한 끗 다른 표정을 더합니다.",
    ],
  },
  {
    icon: Hand,
    n: "02",
    title: "손끝으로 완성하기",
    sentences: [
      "봉제, 자수, 매듭까지 마지막 디테일을 손끝으로 마무리합니다.",
      "펼치는 순간, 묶는 순간 차이가 드러나는 완성도를 만듭니다.",
    ],
  },
  {
    icon: Layers,
    n: "03",
    title: "여러 개의 수",
    sentences: [
      "여러 디자인을 가져와도, 적은 수량이어도 괜찮습니다.",
      "다품종 소량생산으로 브랜드마다, 선물마다 다른 보자기를 만듭니다.",
    ],
  },
]

/** Studio—BA / Bruno Arizio Info 톤: 큰 타이포 · 인덱스 번호 · 흑백 교차 · 여백 */
export function AboutPageClient() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 })
        return
      }

      gsap.from("[data-hero-line]", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      })

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        })
      })

      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="bg-white text-black">
      {/* Hero — 헤더와 동일한 max-w + 안쪽 패딩 → 로고 왼쪽면 정렬 */}
      <section className="relative overflow-hidden border-b border-black/10 pb-20 pt-10 sm:pb-28 sm:pt-14">
        <div className="mx-auto max-w-[1600px] px-5 text-left sm:px-8">
          <p className="text-[11px] tracking-[0.22em] text-black/40">ABOUT / 01</p>
          <div className="mt-8 overflow-hidden sm:mt-12">
            <h1 className="font-display text-left text-[clamp(2.4rem,7.5vw,5.5rem)] font-semibold leading-[0.95] tracking-tight">
              <span className="block overflow-hidden text-black/35">
                <span data-hero-line className="block">
                  Not rock,
                </span>
              </span>
              <span className="block overflow-hidden text-black/35">
                <span data-hero-line className="block">
                  not scissors.
                </span>
              </span>
              <span className="block overflow-hidden text-black">
                <span data-hero-line className="block">
                  We play Bojagi.
                </span>
              </span>
            </h1>
          </div>
          <div
            data-reveal
            className="mt-10 space-y-2 text-left text-[14px] leading-relaxed text-black/60 sm:mt-14 sm:text-[15px]"
          >
            <p className="sentence">가위바위보자기는 가위도, 바위도 아닌 보자기를 택했습니다.</p>
            <p className="sentence">
              모두가 좋은 제품을 만드는 시대, 승부는 마지막 한 끗에서 갈립니다.
            </p>
          </div>
          <p
            data-reveal
            className="sentence sentence-nowrap mt-4 text-left text-[14px] font-medium tracking-tight sm:text-[15px]"
          >
            이기는 보자기, 가위바위보자기.
          </p>
        </div>
      </section>

      {/* Why — split with image */}
      <section className="border-b border-black/10">
        <div className="mx-auto grid max-w-[1600px] px-5 sm:px-8 lg:grid-cols-12 lg:px-8">
          <div className="relative aspect-[4/5] bg-black lg:col-span-5 lg:aspect-auto lg:min-h-[72vh]">
            <Image
              src={site.heroImage}
              alt=""
              fill
              className="object-cover opacity-90 grayscale"
              sizes="(max-width:1024px) 100vw, 42vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-between gap-12 py-14 sm:py-20 lg:col-span-7 lg:pl-14">
            <div data-reveal className="text-left">
              <p className="text-[11px] tracking-[0.22em] text-black/40">WHY / 02</p>
              <h2 className="mt-4 font-display text-[28px] font-semibold tracking-tight sm:text-[36px]">
                왜 만드는가
              </h2>
              <p className="sentence mt-3 text-[14px] font-medium text-black/80 lg:whitespace-nowrap">
                브랜드의 마지막 승부를 함께 디자인하는 커스텀 보자기 스튜디오
              </p>
            </div>
            <div data-reveal className="space-y-2 text-left text-[14px] leading-relaxed text-black/65 sm:text-[15px]">
              <p className="sentence">
                가위바위보자기는 원단, 컬러, 사이즈, 디자인까지 고객이 직접 고르는 커스터마이징
                보자기를 만듭니다.
              </p>
              <p className="sentence">
                제품이 고객의 손에 닿는 마지막 순간, 포장이 곧 브랜드의 첫인상이 되도록{" "}
                <span className="text-black">한 끗 다른 디테일을 더합니다.</span>
              </p>
              <p className="sentence text-black">마지막 한 수를 제안합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How — dark canvas like BA */}
      <section className="bg-black py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1600px] px-5 text-left sm:px-8">
          <div data-reveal>
            <p className="text-[11px] tracking-[0.22em] text-white/40">HOW / 03</p>
            <h2 className="mt-4 font-display text-[28px] font-semibold tracking-tight sm:text-[36px]">
              어떻게 만드는가
            </h2>
            <div className="mt-5 space-y-2 text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
              <p className="sentence">
                원단과 컬러, 사이즈, 디자인 하나하나 고를 수 있는 커스터마이징 보자기를 제작합니다.
              </p>
              <p className="sentence">
                어떤 디자인을 내밀어도, 우리만의 기술로 받아내 세상에 하나뿐인 보자기로 완성합니다.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-10 border-t border-white/15 pt-12 md:grid-cols-3 md:gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <article key={step.title} data-step className="relative text-left">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-[40px] font-semibold leading-none tracking-tight text-white/20 sm:text-[48px]">
                      {step.n}
                    </span>
                    <Icon size={18} strokeWidth={1.4} className="text-white/50" aria-hidden />
                  </div>
                  <h3 className="mt-6 text-[15px] font-medium tracking-tight">{step.title}</h3>
                  <div className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-white/55">
                    {step.sentences.map((s) => (
                      <p key={s} className="sentence">
                        {s}
                      </p>
                    ))}
                  </div>
                  {index < processSteps.length - 1 && (
                    <ArrowRight
                      size={14}
                      strokeWidth={1.4}
                      className="mt-6 text-white/25 md:absolute md:-right-5 md:top-4 md:mt-0"
                      aria-hidden
                    />
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reuse */}
      <section className="border-b border-black/10 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 text-left sm:grid-cols-12 sm:gap-12 sm:px-8">
          <div data-reveal className="sm:col-span-4">
            <p className="text-[11px] tracking-[0.22em] text-black/40">REUSE / 04</p>
            <h2 className="mt-4 font-display text-[28px] font-semibold tracking-tight sm:text-[36px]">
              다시 쓰이는
              <br />
              포장
            </h2>
          </div>
          <div
            data-reveal
            className="space-y-2 text-[14px] leading-relaxed text-black/65 sm:col-span-7 sm:col-start-6 sm:text-[15px]"
          >
            <p className="sentence">
              한 번 쓰고 버려지는 포장이 아닌, 계속해서 쓰이는 보자기를 만듭니다.
            </p>
            <p className="sentence">
              일상 속에서 다시 펼쳐질 때마다, 당신의 브랜드도 함께 다시 펼쳐집니다.
            </p>
            <Link
              href="/studio"
              className="mt-4 inline-flex items-center gap-2 border-b border-black pb-0.5 text-[12px] tracking-[0.14em] transition-opacity hover:opacity-55"
            >
              START IN STUDIO
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
