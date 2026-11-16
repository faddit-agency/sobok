import type { Metadata } from "next"
import { Syne } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "@/components/site/AuthProvider"
import { LanguageProvider } from "@/components/site/LanguageProvider"
import { site } from "@/data/site"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${site.brandName} | 커스텀 보자기 스튜디오`,
    template: `%s | ${site.brandName}`,
  },
  description: site.description,
  metadataBase: new URL(site.siteUrl),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={syne.variable}>
      <body className="min-h-screen font-sans">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
