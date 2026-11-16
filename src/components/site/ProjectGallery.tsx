"use client"

import Link from "next/link"
import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import {
  getDetailSpec,
  getGalleryItems,
  getHoverLines,
  gallerySections,
  GALLERY_ACCENTS,
  type BojagiGalleryItem,
  type GallerySection,
} from "@/data/bojagiGallery"
import "./bojagi-gallery.css"

type FlyState = {
  src: string
  x: number
  y: number
  scale: number
  w: number
  h: number
}

/** download index.html과 동일한 FLIP 목적지 */
function detailFlyTarget(from: DOMRect) {
  const mobile = window.innerWidth < 760
  const H = mobile ? window.innerHeight * 0.46 : window.innerHeight * 0.78
  const W = H * (from.width / from.height)
  const x = mobile ? (window.innerWidth - W) / 2 : window.innerWidth * 0.3 - W / 2
  const y = mobile ? window.innerHeight * 0.08 : (window.innerHeight - H) / 2
  return { x, y, scale: H / from.height }
}

/**
 * `/Downloads/bojagi-gallery-site 2` 포팅 — Project 페이지용
 */
export function ProjectGallery() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scalerRef = useRef<HTMLDivElement>(null)
  const shelfRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  const targetRef = useRef(0)
  const curRef = useRef(0)
  const maxXRef = useRef(0)
  const rowsRef = useRef(1)
  const dragRef = useRef<{
    x: number
    t: number
    v: number
    lx: number
    lt: number
  } | null>(null)
  const movedRef = useRef(0)
  const rafRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, cx: 0, cy: 0 })
  const detailOpenRef = useRef(false)
  const flyFromRef = useRef<DOMRect | null>(null)
  const switchingRef = useRef(false)
  const firstSwitchRef = useRef(true)
  const hoverElRef = useRef<HTMLElement | null>(null)

  const [section, setSection] = useState<GallerySection>("bojagi")
  const items = getGalleryItems(section)
  const itemsRef = useRef(items)
  itemsRef.current = items

  const [rows, setRowsState] = useState(1)
  const [rowPlan, setRowPlan] = useState<number[][]>([items.map((_, i) => i)])
  const [leaving, setLeaving] = useState(false)
  const [swingIds, setSwingIds] = useState<Set<number>>(() => new Set())
  const [counter, setCounter] = useState(
    `01 — ${String(items.length).padStart(2, "0")}`,
  )
  const [hoverTip, setHoverTip] = useState<{
    name: string
    cat: string
    x: number
    y: number
  } | null>(null)
  const [crsrClass, setCrsrClass] = useState("")
  const [isTouch, setIsTouch] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [mcap, setMcap] = useState({ name: "", cat: "", opacity: 1 })
  const [detail, setDetail] = useState<{
    open: boolean
    show: boolean
    index: number
  } | null>(null)
  const [fly, setFly] = useState<FlyState | null>(null)
  const [imgHidden, setImgHidden] = useState<number | null>(null)

  const [accent, setAccent] = useState<string>(GALLERY_ACCENTS[0])

  useEffect(() => {
    setAccent(GALLERY_ACCENTS[Math.floor(Math.random() * GALLERY_ACCENTS.length)])
  }, [])

  // preload both categories
  useEffect(() => {
    ;(["bojagi", "poster"] as GallerySection[]).forEach((id) => {
      getGalleryItems(id).forEach((it) => {
        const im = new Image()
        im.src = it.src
      })
    })
  }, [])

  const layout = useCallback(() => {
    const track = trackRef.current
    const scaler = scalerRef.current
    const shelf = shelfRef.current
    if (!track || !scaler || !shelf) return

    const n = rowsRef.current
    const vw = window.innerWidth

    const widths = itemRefs.current.map((el) => el?.offsetWidth ?? 0)
    const total = widths.reduce((a, b) => a + b, 0) || 1
    const per = total / n

    const plan: number[][] = []
    let acc = 0
    let row: number[] = []
    itemsRef.current.forEach((_, i) => {
      if (
        row.length &&
        plan.length < n - 1 &&
        acc + widths[i] / 2 > per * (plan.length + 1)
      ) {
        plan.push(row)
        row = []
      }
      row.push(i)
      acc += widths[i]
    })
    if (row.length) plan.push(row)
    while (plan.length < n) plan.push([])
    setRowPlan(plan)

    requestAnimationFrame(() => {
      const rowW =
        Math.max(
          ...[...track.querySelectorAll(".bg-gal__row")].map(
            (x) => (x as HTMLElement).scrollWidth,
          ),
          0,
        ) +
        parseFloat(getComputedStyle(track).paddingLeft) * 2

      const sc = 1 / n
      scaler.style.transform = `scale(${sc})`
      shelf.style.backgroundSize = `100% ${100 / n}%`
      maxXRef.current = Math.max(0, rowW * sc - vw)
      targetRef.current = Math.min(targetRef.current, maxXRef.current)
    })
  }, [])

  const setRows = useCallback(
    (n: number) => {
      const next = Math.min(3, Math.max(1, n))
      if (next === rowsRef.current && trackRef.current?.children.length) return
      rowsRef.current = next
      setRowsState(next)
      setTimeout(() => layout(), 40)
    },
    [layout],
  )

  useLayoutEffect(() => {
    const touch =
      window.matchMedia("(hover: none)").matches ||
      ("ontouchstart" in window && window.innerWidth < 760)
    setIsTouch(touch)
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      cx: window.innerWidth / 2,
      cy: window.innerHeight / 2,
    }
    setRows(1)
  }, [setRows])

  useEffect(() => {
    layout()
    const onResize = () => {
      clearTimeout((onResize as unknown as { t?: number }).t)
      ;(onResize as unknown as { t?: number }).t = window.setTimeout(() => {
        layout()
        if (!detailOpenRef.current || !flyFromRef.current) return
        const dest = detailFlyTarget(flyFromRef.current)
        setFly((f) =>
          f ? { ...f, x: dest.x, y: dest.y, scale: dest.scale } : f,
        )
      }, 150)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [layout, rows, section])

  // intro: rise (bojagi) or drop+swing (poster)
  useEffect(() => {
    if (leaving) return
    const timers: number[] = []
    setSwingIds(new Set())
    const kick = window.requestAnimationFrame(() => {
      imgRefs.current.forEach((im, i) => {
        if (!im) return
        im.classList.remove("swing")
        im.style.transition = "none"
        im.style.transform =
          section === "poster" ? "translate3d(0,-5%,0)" : "translate3d(0,8%,0)"
        im.style.opacity = "0"
        timers.push(
          window.setTimeout(() => {
            im.style.transition =
              "opacity 1.2s ease, transform 1.4s cubic-bezier(.2,.8,.2,1), filter .5s"
            im.style.transform = ""
            im.style.opacity = "1"
            if (section === "poster") {
              timers.push(
                window.setTimeout(() => {
                  setSwingIds((prev) => new Set(prev).add(i))
                }, 250),
              )
            }
          }, 120 + i * 90),
        )
      })
    })
    return () => {
      window.cancelAnimationFrame(kick)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [section, leaving])

  // raf loop
  useEffect(() => {
    const crsr = rootRef.current?.querySelector(
      ".bg-gal__crsr",
    ) as HTMLElement | null
    const ctxt = rootRef.current?.querySelector(
      ".bg-gal__ctxt",
    ) as HTMLElement | null
    let lastC = -1

    const tick = () => {
      const touch = isTouch
      const rowsN = rowsRef.current
      curRef.current += (targetRef.current - curRef.current) / (touch ? 8 : 14)
      if (Math.abs(targetRef.current - curRef.current) < 0.05) {
        curRef.current = targetRef.current
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-curRef.current / (1 / rowsN)}px,0,0)`
      }

      const m = mouseRef.current
      m.cx += (m.x - m.cx) * 0.35
      m.cy += (m.y - m.cy) * 0.35
      if (crsr) {
        crsr.style.transform = `translate(${m.cx}px,${m.cy}px) translate(-50%,-50%)`
      }
      // 호버 캡션: 작품 이미지 바로 아래(스크롤 중에도 추적)
      if (ctxt?.dataset.anchored && hoverElRef.current) {
        const img =
          hoverElRef.current.querySelector("img") ?? hoverElRef.current
        const r = img.getBoundingClientRect()
        ctxt.style.transform = `translate(${r.left + r.width / 2}px,${r.bottom + 14}px) translate(-50%,0)`
      } else if (ctxt && !ctxt.dataset.anchored) {
        ctxt.style.transform = `translate(${m.cx + 22}px,${m.cy}px) translate(0,-50%)`
      }

      let best = 0
      let bd = 1e9
      const vw = window.innerWidth
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d =
          Math.abs(r.left + r.width / 2 - vw / 2) +
          Math.abs(r.top + r.height / 2 - window.innerHeight / 2) * 0.2
        if (d < bd) {
          bd = d
          best = i
        }
      })
      if (best !== lastC) {
        lastC = best
        const list = itemsRef.current
        const it = list[best]
        if (!it) {
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        setCounter(
          `${String(best + 1).padStart(2, "0")} — ${String(list.length).padStart(2, "0")}`,
        )
        setMcap({ name: it.name, cat: it.cat.join(" · "), opacity: 0 })
        window.setTimeout(() => {
          setMcap({ name: it.name, cat: it.cat.join(" · "), opacity: 1 })
        }, 180)
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isTouch])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (detailOpenRef.current) return
      e.preventDefault()
      let d =
        (Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX) / 1.5
      d = Math.max(-500, Math.min(500, d))
      targetRef.current = Math.max(
        0,
        Math.min(maxXRef.current, targetRef.current + d),
      )
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [])

  useEffect(() => {
    const stage = rootRef.current?.querySelector(
      ".bg-gal__stage",
    ) as HTMLElement | null
    if (!stage) return

    const down = (e: PointerEvent) => {
      if (detailOpenRef.current) return
      if (
        (e.target as HTMLElement).closest(
          ".bg-gal__zoom, .bg-gal__close, .bg-gal__info a, .bg-gal__cats",
        )
      )
        return
      dragRef.current = {
        x: e.clientX,
        t: targetRef.current,
        v: 0,
        lx: e.clientX,
        lt: performance.now(),
      }
      movedRef.current = 0
      setDragging(true)
      setCrsrClass((c) => `${c} s`.trim())
    }
    const move = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      const drag = dragRef.current
      if (!drag) return
      const dx = e.clientX - drag.x
      movedRef.current = Math.max(movedRef.current, Math.abs(dx))
      const now = performance.now()
      drag.v = (e.clientX - drag.lx) / Math.max(1, now - drag.lt)
      drag.lx = e.clientX
      drag.lt = now
      targetRef.current = Math.max(
        0,
        Math.min(maxXRef.current, drag.t - dx * 1.4),
      )
    }
    const up = () => {
      const drag = dragRef.current
      if (drag) {
        targetRef.current = Math.max(
          0,
          Math.min(maxXRef.current, targetRef.current - drag.v * 320),
        )
        dragRef.current = null
      }
      setDragging(false)
      setCrsrClass((c) => c.replace(/\bs\b/g, "").trim())
    }

    stage.addEventListener("pointerdown", down)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    return () => {
      stage.removeEventListener("pointerdown", down)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
  }, [])

  const openDetail = (i: number) => {
    const img = imgRefs.current[i]
    const it = itemsRef.current[i]
    if (!img || !it) return
    const r = img.getBoundingClientRect()
    detailOpenRef.current = true
    flyFromRef.current = r
    setImgHidden(i)
    setHoverTip(null)
    setCrsrClass("")

    const dest = detailFlyTarget(r)

    setFly({
      src: it.src,
      x: r.left,
      y: r.top,
      scale: 1,
      w: r.width,
      h: r.height,
    })
    setDetail({ open: true, show: false, index: i })

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFly({
          src: it.src,
          x: dest.x,
          y: dest.y,
          scale: dest.scale,
          w: r.width,
          h: r.height,
        })
      })
    })
    window.setTimeout(() => {
      setDetail((d) => (d ? { ...d, show: true } : d))
    }, 450)
  }

  const closeDetail = useCallback(() => {
    setDetail((prev) => {
      if (!prev) return prev
      const img = imgRefs.current[prev.index]
      const r = img?.getBoundingClientRect()
      const from = flyFromRef.current
      if (r && from) {
        setFly((f) =>
          f
            ? {
                ...f,
                x: r.left,
                y: r.top,
                scale: r.height / from.height,
              }
            : f,
        )
      }
      return { ...prev, show: false }
    })
    window.setTimeout(() => {
      setDetail((prev) => (prev ? { ...prev, open: false } : prev))
    }, 200)
    window.setTimeout(() => {
      setFly(null)
      setImgHidden(null)
      setDetail(null)
      detailOpenRef.current = false
    }, 1100)
  }, [])

  const switchSection = useCallback(
    async (next: GallerySection) => {
      if (next === section && !firstSwitchRef.current) return
      if (switchingRef.current) return
      switchingRef.current = true

      if (detailOpenRef.current) {
        setDetail(null)
        setFly(null)
        setImgHidden(null)
        detailOpenRef.current = false
      }

      if (!firstSwitchRef.current) {
        setLeaving(true)
        await new Promise((r) => setTimeout(r, 650))
      }

      setSection(next)
      targetRef.current = 0
      curRef.current = 0
      itemRefs.current = []
      imgRefs.current = []
      const nextItems = getGalleryItems(next)
      setRowPlan([nextItems.map((_, i) => i)])
      setCounter(`01 — ${String(nextItems.length).padStart(2, "0")}`)
      setMcap({ name: "", cat: "", opacity: 0 })
      setSwingIds(new Set())
      rowsRef.current = 1
      setRowsState(1)
      setLeaving(false)
      firstSwitchRef.current = false

      window.setTimeout(() => {
        layout()
        switchingRef.current = false
      }, 40)
    },
    [section, layout],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && detailOpenRef.current) {
        closeDetail()
        return
      }
      if (detailOpenRef.current) return
      const vw = window.innerWidth
      if (e.key === "ArrowRight") {
        targetRef.current = Math.min(
          maxXRef.current,
          targetRef.current + vw * 0.35,
        )
      }
      if (e.key === "ArrowLeft") {
        targetRef.current = Math.max(0, targetRef.current - vw * 0.35)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [closeDetail])

  const onItemEnter = (it: BojagiGalleryItem, el: HTMLElement) => {
    if (isTouch || detailOpenRef.current) return
    hoverElRef.current = el
    const img = el.querySelector("img") ?? el
    const r = img.getBoundingClientRect()
    // 포스터/보자기 이미지 바로 아래 — 작품 속 글자와 겹치지 않음
    setHoverTip({
      name: it.name,
      cat: getHoverLines(it).join("\n"),
      x: r.left + r.width / 2,
      y: r.bottom + 14,
    })
    setCrsrClass("s tint")
  }
  const onItemLeave = () => {
    if (isTouch) return
    hoverElRef.current = null
    setHoverTip(null)
    setCrsrClass("")
  }

  const onItemClick = (i: number) => {
    if (movedRef.current > 6) return
    openDetail(i)
  }

  const onScrub = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const n = Math.min(
      3,
      Math.max(1, Math.round(((e.clientY - rect.top) / rect.height) * 2) + 1),
    )
    setRows(n)
  }

  const thumbTop = ["0%", "50%", "100%"][rows - 1]
  const thumbScale = [1.4, 1, 0.65][rows - 1]
  const activeItem = detail ? items[detail.index] : null
  const sectionMeta = gallerySections.find((s) => s.id === section)
  const isWall = section === "poster"
  const detailSpec = activeItem ? getDetailSpec(activeItem) : []

  return (
    <div
      ref={rootRef}
      className={`bg-gal${isTouch ? " is-touch" : ""}${detail?.open ? " is-detail" : ""}${isWall ? " is-wall" : ""}`}
      style={{ ["--bg-accent" as string]: accent }}
    >
      <nav className="bg-gal__cats" aria-label="작품 구분">
        {gallerySections.map((s, i) => (
          <span key={s.id} className="bg-gal__cats-wrap">
            {i > 0 && <span className="sep">/</span>}
            <button
              type="button"
              className={`bg-gal__cat${section === s.id ? " on" : ""}`}
              onClick={() => switchSection(s.id)}
            >
              {s.label}
            </button>
          </span>
        ))}
      </nav>

      <div className="bg-gal__counter">{counter}</div>

      <div className="bg-gal__zoom" aria-label="보기 크기">
        <button
          type="button"
          className="pm"
          aria-label="크게"
          onClick={(e) => {
            e.stopPropagation()
            setRows(rows - 1)
          }}
        >
          +
        </button>
        <div className="rail" onPointerDown={onScrub}>
          <div
            className="thumb"
            style={{ top: thumbTop, ["--ts" as string]: String(thumbScale) }}
          />
        </div>
        <button
          type="button"
          className="pm"
          aria-label="작게"
          onClick={(e) => {
            e.stopPropagation()
            setRows(rows + 1)
          }}
        >
          −
        </button>
      </div>

      <div
        className={`bg-gal__stage${dragging ? " is-dragging" : ""}${isWall ? " wall" : ""}`}
      >
        <div
          ref={shelfRef}
          className={`bg-gal__shelf${isWall ? " wall" : ""}`}
          aria-hidden
        />
        <div ref={scalerRef} className="bg-gal__scaler">
          <div ref={trackRef} className="bg-gal__track">
            {rowPlan.map((indices, ri) => (
              <div
                key={`${section}-row-${ri}-${indices.join("-")}`}
                className={`bg-gal__row${leaving ? " leave" : ""}`}
              >
                {indices.map((i) => {
                  const it = items[i]
                  if (!it) return null
                  return (
                    <button
                      key={`${section}-${it.src}`}
                      type="button"
                      className="bg-gal__item"
                      style={{ ["--s" as string]: String(it.s) }}
                      ref={(el) => {
                        itemRefs.current[i] = el
                      }}
                      onMouseEnter={(e) => onItemEnter(it, e.currentTarget)}
                      onMouseLeave={onItemLeave}
                      onClick={() => onItemClick(i)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        ref={(el) => {
                          imgRefs.current[i] = el
                        }}
                        src={it.src}
                        alt={it.name}
                        draggable={false}
                        className={swingIds.has(i) ? "swing" : undefined}
                        style={{
                          opacity: imgHidden === i ? 0 : undefined,
                        }}
                      />
                      <span className="idx">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gal__mcap">
        <div style={{ opacity: mcap.opacity }}>
          <div className="n">{mcap.name}</div>
          <div className="c">{mcap.cat}</div>
        </div>
      </div>

      {!isTouch && (
        <>
          <div className={`bg-gal__crsr ${crsrClass}`.trim()} />
          <div
            className="bg-gal__ctxt"
            data-anchored={hoverTip ? "1" : undefined}
            style={
              hoverTip
                ? {
                    transform: `translate(${hoverTip.x}px,${hoverTip.y}px) translate(-50%,0)`,
                  }
                : undefined
            }
          >
            {hoverTip && (
              <>
                <div className="n">{hoverTip.name}</div>
                <div className="c">
                  {hoverTip.cat.split("\n").map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      <p className="bg-gal__hint">SCROLL · DRAG</p>

      {fly && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="bg-gal__fly"
          src={fly.src}
          alt=""
          style={{
            width: fly.w,
            height: fly.h,
            transform: `translate(${fly.x}px,${fly.y}px) scale(${fly.scale})`,
          }}
        />
      )}

      {detail?.open && (
        <section className={`bg-gal__detail on${detail.show ? " show" : ""}`}>
          <div className="veil" onClick={closeDetail} />
          {activeItem && (
            <div className="bg-gal__info">
              <div className="no">
                {String(detail.index + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </div>
              <h2>{activeItem.name}</h2>
              <div className="en">{activeItem.en}</div>
              <p className="sentence">{activeItem.desc}</p>
              <dl>
                {detailSpec.map(([label, value]) => (
                  <Fragment key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </Fragment>
                ))}
              </dl>
              <Link href="/studio" className="cta">
                {sectionMeta?.cta ?? "맞춤 제작"}
              </Link>
            </div>
          )}
          <button type="button" className="bg-gal__close" onClick={closeDetail}>
            닫기 ✕
          </button>
        </section>
      )}
    </div>
  )
}
