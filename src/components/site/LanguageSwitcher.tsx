"use client"

import { useEffect, useRef, useState } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/components/site/LanguageProvider"
import { locales } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type LanguageSwitcherProps = {
  tone?: "light" | "dark"
  align?: "left" | "right"
}

export function LanguageSwitcher({
  tone = "dark",
  align = "left",
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const light = tone === "light"

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("mousedown", onPointer)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("mousedown", onPointer)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={t("lang.label")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-70",
          light ? "text-black" : "text-white",
        )}
      >
        <Globe size={18} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-2 min-w-[148px] border py-2 shadow-lg",
            align === "right" ? "right-0" : "left-0",
            light
              ? "border-black/10 bg-white text-black"
              : "border-white/15 bg-black text-white",
          )}
        >
          {locales.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setLocale(item.id)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center justify-between px-3.5 py-2 text-left text-[12px] tracking-wide transition-colors",
                light ? "hover:bg-black/[0.04]" : "hover:bg-white/10",
                locale === item.id && "font-medium",
              )}
            >
              <span>{item.native}</span>
              {locale === item.id && <span aria-hidden>•</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
