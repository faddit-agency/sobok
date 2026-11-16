import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SiteHeader } from "@/components/site/SiteHeader"

type PageShellProps = {
  children: ReactNode
  tone?: "light" | "dark"
  darkHero?: boolean
}

export function PageShell({ children, tone = "light" }: PageShellProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="relative">
        <SiteHeader tone={tone} />
        <div className={tone === "dark" ? "bg-black pt-24" : "pt-24"}>{children}</div>
      </div>
      <SiteFooter />
    </div>
  )
}
