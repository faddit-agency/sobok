import { Link } from "react-router-dom"
import type { WorkItem } from "../../data/worksCatalog"

type Props = {
  work: WorkItem
  priority?: boolean
  onClick?: () => void
}

export function WorkCard({ work, priority, onClick }: Props) {
  const body = (
    <>
      <div className="aspect-square overflow-hidden bg-[#ebebeb]">
        <img
          src={work.heroImage}
          alt={work.title}
          className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
      <div className="mt-2.5">
        <p className="text-[13px] font-normal leading-snug text-black md:text-[14px]">{work.title}</p>
        <p className="mt-0.5 text-[13px] font-normal leading-snug text-black md:text-[14px]">
          {work.year} / {work.categoryLabel}
        </p>
      </div>
    </>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="group block w-full text-left">
        {body}
      </button>
    )
  }

  return (
    <Link to={`/works/${work.slug}`} className="group block">
      {body}
    </Link>
  )
}
