import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProjectDetail } from "@/components/site/ProjectDetail"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SiteHeader } from "@/components/site/SiteHeader"
import {
  getAdjacentProjects,
  getProjectById,
  projectWorks,
} from "@/data/projects"

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return projectWorks.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const work = getProjectById(id)
  if (!work) return { title: "Project" }
  return {
    title: work.title,
    description: work.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const work = getProjectById(id)
  if (!work) notFound()

  const { prev, next, index } = getAdjacentProjects(id)

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="relative">
        <SiteHeader tone="dark" />
        <div className="pt-0">
          <ProjectDetail
            work={work}
            prev={prev}
            next={next}
            index={index}
            total={projectWorks.length}
          />
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
