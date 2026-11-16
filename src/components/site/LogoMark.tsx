import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { site } from "@/data/site"

type LogoMarkProps = {
  className?: string
  size?: number
  href?: string
  invert?: boolean
}

export function LogoMark({
  className,
  size = 44,
  href = "/",
  invert = false,
}: LogoMarkProps) {
  const img = (
    <Image
      src={site.logo}
      alt={site.brandName}
      width={size}
      height={size}
      className={cn("block", invert && "invert", className)}
      priority
    />
  )
  if (!href) return img
  return (
    <Link href={href} aria-label={site.brandName} className="inline-block">
      {img}
    </Link>
  )
}
