import type { Metadata } from "next"
import { ProjectGallery } from "@/components/site/ProjectGallery"
import { SiteHeader } from "@/components/site/SiteHeader"

export const metadata: Metadata = {
  title: "Project",
  description: "보자기 작품 갤러리",
}

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <SiteHeader tone="dark" />
        <div className="pt-20 sm:pt-24">
          <ProjectGallery />
        </div>
      </div>
    </div>
  )
}
