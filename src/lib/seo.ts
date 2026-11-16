import type { Metadata } from "next"
import { siteSettings } from "@/data/siteSettings"

type MetaInput = {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/brand/bojagi-flat-wrapped.png",
  noIndex,
}: MetaInput): Metadata {
  const url = `${siteSettings.siteUrl}${path}`
  const absoluteImage = image.startsWith("http") ? image : `${siteSettings.siteUrl}${image}`

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      siteName: `${siteSettings.brandName} ${siteSettings.brandNameEn}`,
      title,
      description,
      images: [{ url: absoluteImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  }
}

export function organizationJsonLd() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${siteSettings.brandName} ${siteSettings.brandNameEn}`,
    url: siteSettings.siteUrl,
    description: siteSettings.description,
    email: siteSettings.contactEmail,
    logo: `${siteSettings.siteUrl}/Sobok_black.svg`,
  }
  if (siteSettings.phone) org.telephone = siteSettings.phone
  if (siteSettings.address) {
    org.address = {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address,
      addressCountry: "KR",
    }
  }
  return org
}
