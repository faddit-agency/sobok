import { useEffect, useMemo } from "react"
import { X } from "lucide-react"
import type { WorkItem } from "../../data/worksCatalog"
import { useLanguage } from "../../contexts/LanguageContext"
import { localizeWork, st, type StudioKey } from "../../i18n/studio"

type Props = {
  work: WorkItem | null
  onClose: () => void
  onInquire: (work: WorkItem) => void
}

export function WorkModal({ work, onClose, onInquire }: Props) {
  const { language } = useLanguage()
  const display = useMemo(() => (work ? localizeWork(work, language) : null), [work, language])

  useEffect(() => {
    if (!work) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [work, onClose])

  if (!work || !display) return null

  const typeKey = `modal.type.${work.type}` as StudioKey

  return (
    <div
      className="fixed inset-0 z-[80] flex items-stretch justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={display.title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/35"
        aria-label={st(language, "modal.close")}
        onClick={onClose}
      />
      <div className="relative z-[81] m-0 flex h-full w-full max-w-[960px] flex-col bg-white shadow-xl md:m-8 md:h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4rem)]">
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 md:hidden">
          <div className="min-w-0">
            <h2 className="truncate text-[16px] font-bold text-black">{display.title}</h2>
            <p className="text-[12px] text-neutral-500">
              {display.year} / {display.categoryLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 flex h-9 w-9 items-center justify-center text-black hover:bg-neutral-100"
            aria-label={st(language, "modal.close")}
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 md:grid-cols-2">
          <div className="scrollbar-hide min-h-0 overflow-y-auto overscroll-contain bg-neutral-50">
            {display.images.map((img) => (
              <div
                key={img.src}
                className="aspect-square overflow-hidden border-b border-neutral-200 last:border-b-0"
              >
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex min-h-0 flex-col border-t border-neutral-200 md:border-l md:border-t-0">
            <div className="hidden items-start justify-between border-b border-neutral-200 px-7 py-5 md:flex">
              <div className="min-w-0 pr-3">
                <h2 className="text-[18px] font-bold text-black">{display.title}</h2>
                <p className="mt-0.5 text-[12px] text-neutral-500">
                  {display.year} / {display.categoryLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center text-black hover:bg-neutral-100"
                aria-label={st(language, "modal.close")}
              >
                <X size={20} />
              </button>
            </div>

            <div className="scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6 md:overflow-hidden md:px-7 md:py-8">
              <p className="text-[12px] text-neutral-400">{st(language, typeKey)}</p>
              <p className="mt-4 text-[15px] font-bold leading-relaxed text-black">{display.intent}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">{display.shortIntro}</p>

              {display.points.length > 0 && (
                <ul className="mt-5 space-y-1 text-[13px] text-neutral-700">
                  {display.points.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              )}

              <dl className="mt-6 space-y-2.5 border-t border-neutral-200 pt-5 text-[12px]">
                {display.specs.material && (
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-neutral-400">{st(language, "modal.material")}</dt>
                    <dd className="text-black">{display.specs.material}</dd>
                  </div>
                )}
                {display.specs.purpose && (
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-neutral-400">{st(language, "modal.purpose")}</dt>
                    <dd className="text-black">{display.specs.purpose}</dd>
                  </div>
                )}
                {display.specs.method && (
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-neutral-400">{st(language, "modal.method")}</dt>
                    <dd className="text-black">{display.specs.method}</dd>
                  </div>
                )}
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-neutral-400">{st(language, "modal.unitPrice")}</dt>
                  <dd className="font-medium text-black">{display.commercial.unitPrice}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-neutral-400">{st(language, "modal.moq")}</dt>
                  <dd className="text-black">{display.commercial.moq}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-neutral-400">{st(language, "modal.leadTime")}</dt>
                  <dd className="text-black">{display.commercial.leadTime}</dd>
                </div>
                {display.specs.changeable && (
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 text-neutral-400">{st(language, "modal.changeable")}</dt>
                    <dd className="text-black">{display.specs.changeable}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-3 text-[11px] leading-relaxed text-neutral-400">{st(language, "modal.note")}</p>

              <div className="mt-auto pt-8">
                <button
                  type="button"
                  onClick={() => onInquire(work)}
                  className="w-full border border-black bg-black px-4 py-3 text-[13px] font-bold text-white hover:bg-neutral-800"
                >
                  {st(language, "modal.cta")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
