"use client"

import Link from "next/link"
import { useLanguage } from "@/components/site/LanguageProvider"
import { site } from "@/data/site"

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer id="footer" className="border-t border-black/10 bg-white text-black">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-[13px] tracking-[0.08em]">{site.brandName}</p>
          <p className="sentence mt-2 max-w-xl text-[12px] leading-relaxed text-black/60">
            {t("footer.blurb")}
          </p>
          <p className="mt-5 text-[11px] text-black/45">
            © {new Date().getFullYear()} {site.brandName}. All Rights Reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.14em]">
          <Link href="/about" className="hover:opacity-60">
            {t("nav.about")}
          </Link>
          <Link href="/studio" className="hover:opacity-60">
            {t("nav.studio")}
          </Link>
          <Link href="/inquiries" className="hover:opacity-60">
            {t("nav.inquiries")}
          </Link>
          <Link href="/login" className="hover:opacity-60">
            {t("nav.login")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
