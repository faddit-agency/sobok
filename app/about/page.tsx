import type { Metadata } from "next"
import { AboutPageClient } from "@/components/site/AboutPageClient"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SiteHeader } from "@/components/site/SiteHeader"
import { site } from "@/data/site"

export const metadata: Metadata = {
  title: "About",
  description: site.description,
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="relative">
        <SiteHeader tone="light" />
        <div className="pt-20 sm:pt-24">
          <AboutPageClient />
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
