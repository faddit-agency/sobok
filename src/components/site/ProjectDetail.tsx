"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { ProjectWork } from "@/data/projects"

gsap.registerPlugin(ScrollTrigger)

type ProjectDetailProps = {
  work: ProjectWork
  prev: ProjectWork | null
  next: ProjectWork | null
  index: number
  total: number
}

export function ProjectDetail({ work, prev, next, index, total }: ProjectDetailProps) {
  const [hero, ...rest] = work.gallery
  const side = rest[0] ?? work.image
  const more = rest.slice(1)
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-copy]", {
        y: 28,
        opacity: 0,
        duration: reduce ? 0 : 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      })

      if (reduce) return

      gsap.from("[data-hero-img]", {
        scale: 1.08,
        duration: 1.4,
        ease: "power2.out",
      })

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        })
      })

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [work.id])

  return (
    <article ref={rootRef} className="bg-white text-black">
      {/* Hero — image-led, B&W editorial */}
      <header className="relative min-h-[72vh] overflow-hidden bg-black sm:min-h-[78vh]">
        <div data-hero-img className="absolute inset-0">
          <Image
            src={hero ?? work.image}
            alt={work.title}
            fill
            priority
            className="object-cover opacity-90 grayscale"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 pt-24 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-[1100px]">
            <Link
              data-hero-copy
              href="/project"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              SHOWROOM
            </Link>
            <p data-hero-copy className="mt-6 text-[11px] tracking-[0.2em] text-white/55">
              {work.kindLabel} · {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
            <h1
              data-hero-copy
              className="mt-3 max-w-[18ch] font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-white sm:text-[48px]"
            >
              {work.title}
            </h1>
            <p
              data-hero-copy
              className="mt-4 max-w-[36ch] text-[14px] leading-relaxed text-white/75 sm:text-[15px]"
            >
              {work.headline}
            </p>
          </div>
        </div>
      </header>

      {/* Meta strip */}
      <div data-reveal className="border-b border-black/10 bg-[#f6f5f2]">
        <dl className="mx-auto grid max-w-[1100px] grid-cols-2 gap-px sm:grid-cols-4">
          {[
            ["YEAR", work.year],
            ["CLIENT", work.client],
            ["MATERIAL", work.material],
            ["SIZE", work.size],
          ].map(([label, value]) => (
            <div key={label} className="bg-[#f6f5f2] px-5 py-6 sm:px-8">
              <dt className="text-[10px] tracking-[0.16em] text-black/40">{label}</dt>
              <dd className="mt-2 text-[13px] text-black/85">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Story — Casamance-ish 1/3–2/3 */}
      <section
        data-reveal
        className="mx-auto grid max-w-[1100px] gap-10 px-5 py-16 sm:grid-cols-12 sm:gap-12 sm:px-8 sm:py-24"
      >
        <div className="sm:col-span-4">
          <p className="text-[11px] tracking-[0.16em] text-black/40">STORY</p>
          <h2 className="mt-3 font-display text-[22px] font-semibold tracking-tight sm:text-[26px]">
            {work.headline}
          </h2>
        </div>
        <div className="space-y-2 text-[14px] leading-relaxed text-black/70 sm:col-span-8 sm:text-[15px]">
          {work.story.map((p) => (
            <p key={p.slice(0, 24)} className="sentence">
              {p}
            </p>
          ))}
          <p className="sentence text-black/55">{work.description}</p>
        </div>
      </section>

      {/* Split visual — portrait / landscape */}
      <section className="border-y border-black/10 bg-[#f6f5f2]">
        <div className="mx-auto grid max-w-[1400px] sm:grid-cols-12">
          <div className="relative aspect-[3/4] overflow-hidden sm:col-span-5 sm:aspect-auto sm:min-h-[70vh]">
            <div data-parallax className="absolute inset-[-8%]">
              <Image
                src={side}
                alt=""
                fill
                className="object-cover grayscale"
                sizes="(max-width:768px) 100vw, 42vw"
              />
            </div>
          </div>
          <div
            data-reveal
            className="flex flex-col justify-between gap-10 px-5 py-12 sm:col-span-7 sm:px-12 sm:py-16"
          >
            <div>
              <p className="text-[11px] tracking-[0.16em] text-black/40">APPROACH</p>
              <ul className="mt-6 space-y-4">
                {work.approach.map((line) => (
                  <li
                    key={line}
                    className="border-t border-black/10 pt-4 text-[14px] leading-relaxed text-black/75"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
              <Image
                src={more[0] ?? work.image}
                alt=""
                fill
                className="object-cover grayscale"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Extra frames */}
      {more.length > 1 && (
        <section data-reveal className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-[11px] tracking-[0.16em] text-black/40">FRAMES</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {more.slice(1).map((src) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden bg-black/5 sm:aspect-[3/4]">
                <Image src={src} alt="" fill className="object-cover grayscale" sizes="50vw" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        data-reveal
        className="border-t border-black/10 px-5 py-16 text-center sm:px-8 sm:py-20"
      >
        <p className="text-[11px] tracking-[0.16em] text-black/40">INQUIRE</p>
        <p className="sentence mx-auto mt-4 font-display text-[22px] font-semibold tracking-tight sm:text-[28px] lg:whitespace-nowrap">
          비슷한 보자기·패브릭 포스터를 만들고 싶다면
        </p>
        <Link
          href="/studio"
          className="mt-8 inline-flex items-center gap-2 border border-black bg-black px-6 py-3 text-[12px] tracking-[0.14em] text-white transition-colors hover:bg-transparent hover:text-black"
        >
          STUDIO
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </section>

      {/* Prev / Next */}
      <nav className="grid border-t border-black/10 sm:grid-cols-2">
        {prev && (
          <Link
            href={`/project/${prev.id}`}
            className="group flex items-end justify-between gap-4 border-b border-black/10 px-5 py-10 transition-colors hover:bg-[#f6f5f2] sm:border-b-0 sm:border-r sm:px-8"
          >
            <div>
              <p className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-black/40">
                <ArrowLeft size={14} strokeWidth={1.5} />
                PREV
              </p>
              <p className="mt-3 font-display text-[18px] font-semibold tracking-tight group-hover:underline sm:text-[20px]">
                {prev.title}
              </p>
              <p className="mt-1 text-[12px] text-black/45">{prev.kindLabel}</p>
            </div>
            <div className="relative hidden h-20 w-14 shrink-0 overflow-hidden bg-black/5 sm:block">
              <Image src={prev.image} alt="" fill className="object-cover grayscale" sizes="56px" />
            </div>
          </Link>
        )}
        {next && (
          <Link
            href={`/project/${next.id}`}
            className="group flex items-end justify-between gap-4 px-5 py-10 text-right transition-colors hover:bg-[#f6f5f2] sm:px-8 sm:text-left"
          >
            <div className="relative hidden h-20 w-14 shrink-0 overflow-hidden bg-black/5 sm:block">
              <Image src={next.image} alt="" fill className="object-cover grayscale" sizes="56px" />
            </div>
            <div className="ml-auto sm:ml-0 sm:text-right">
              <p className="flex items-center justify-end gap-2 text-[11px] tracking-[0.16em] text-black/40">
                NEXT
                <ArrowRight size={14} strokeWidth={1.5} />
              </p>
              <p className="mt-3 font-display text-[18px] font-semibold tracking-tight group-hover:underline sm:text-[20px]">
                {next.title}
              </p>
              <p className="mt-1 text-[12px] text-black/45">{next.kindLabel}</p>
            </div>
          </Link>
        )}
      </nav>
    </article>
  )
}
