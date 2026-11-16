"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogoMark } from "@/components/site/LogoMark"
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher"
import { useAuth } from "@/components/site/AuthProvider"
import { useLanguage } from "@/components/site/LanguageProvider"
import { locales } from "@/lib/i18n"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  tone?: "light" | "dark"
}

const navKeys: Record<string, string> = {
  "/about": "nav.about",
  "/studio": "nav.studio",
  "/project": "nav.project",
  "/inquiries": "nav.inquiries",
}

function NavLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="inline-flex items-baseline">
      <span
        aria-hidden
        className={cn(
          "transition-opacity",
          active ? "opacity-100" : "opacity-0 group-hover/nav:opacity-100",
        )}
      >
        [
      </span>
      <span>{label}</span>
      <span
        aria-hidden
        className={cn(
          "transition-opacity",
          active ? "opacity-100" : "opacity-0 group-hover/nav:opacity-100",
        )}
      >
        ]
      </span>
    </span>
  )
}

export function SiteHeader({ tone = "dark" }: SiteHeaderProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { t, locale, setLocale } = useLanguage()
  const [open, setOpen] = useState(false)
  const light = tone === "light"

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-40",
        light ? "text-black" : "text-white",
      )}
    >
      <div className="relative z-50 mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-7">
        <div className="relative z-10 flex items-center">
          <LogoMark size={40} invert={!light} />
        </div>

        <nav
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center lg:flex"
          aria-label="주 메뉴"
        >
          <div className="pointer-events-auto flex items-center gap-7">
            {site.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              const label = t(navKeys[item.href] || item.label)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group/nav text-[11px] tracking-[0.18em] transition-opacity",
                    active ? "opacity-100" : "opacity-90 hover:opacity-100",
                  )}
                >
                  <NavLabel label={label} active={active} />
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="relative z-10 hidden items-center gap-5 lg:flex">
          {user ? (
            <button
              type="button"
              onClick={logout}
              className={cn(
                "border px-4 py-2 text-[10px] tracking-[0.18em] transition-opacity hover:opacity-80",
                light ? "border-black text-black" : "border-white text-white",
              )}
            >
              {t("nav.logout")}
            </button>
          ) : (
            <Link
              href="/login"
              className={cn(
                "border px-4 py-2 text-[10px] tracking-[0.18em] transition-opacity hover:opacity-80",
                light
                  ? "border-black bg-black text-white"
                  : "border-white bg-white text-black",
              )}
            >
              {t("nav.login")}
            </Link>
          )}

          <LanguageSwitcher tone={tone} align="right" />
        </div>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={open ? t("nav.close") : t("nav.menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? t("nav.close") : t("nav.menu")}</span>
          {open ? (
            <span className="text-[13px] tracking-[0.12em]">✕</span>
          ) : (
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={cn("h-px w-full", light ? "bg-black" : "bg-white")}
              />
              <span
                className={cn("h-px w-full", light ? "bg-black" : "bg-white")}
              />
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "fixed inset-0 z-40 flex flex-col px-8 pb-10 pt-24 lg:hidden",
            light ? "bg-white text-black" : "bg-black text-white",
          )}
        >
          <nav className="flex flex-col gap-6">
            {site.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              const label = t(navKeys[item.href] || item.label)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group/nav text-[13px] tracking-[0.2em]"
                >
                  <NavLabel label={label} active={active} />
                </Link>
              )
            })}
            <Link
              href={user ? "/inquiries" : "/login"}
              onClick={() => setOpen(false)}
              className={cn(
                "mt-2 inline-flex w-fit border px-4 py-2 text-[11px] tracking-[0.18em]",
                light
                  ? "border-black bg-black text-white"
                  : "border-white bg-white text-black",
              )}
            >
              {user ? t("nav.myInquiries") : t("nav.login")}
            </Link>
          </nav>

          <div className="mt-auto border-t pt-6" style={{ borderColor: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)" }}>
            <p
              className={cn(
                "mb-3 text-[10px] tracking-[0.2em]",
                light ? "text-black/45" : "text-white/45",
              )}
            >
              {t("lang.label")}
            </p>
            <div className="flex flex-wrap gap-2">
              {locales.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLocale(item.id)}
                  className={cn(
                    "border px-3.5 py-2 text-[12px] tracking-wide transition-opacity",
                    locale === item.id
                      ? light
                        ? "border-black bg-black text-white"
                        : "border-white bg-white text-black"
                      : light
                        ? "border-black/20 text-black/70 hover:opacity-80"
                        : "border-white/25 text-white/70 hover:opacity-80",
                  )}
                >
                  {item.native}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
