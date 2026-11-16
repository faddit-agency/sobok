import { useMemo, useState } from "react"
import { WorkCard } from "../../components/public/WorkCard"
import {
  getAvailableUsages,
  getPublishedWorks,
  workUsageLabel,
  type WorkUsage,
} from "../../data/worksCatalog"

type Filter = "all" | WorkUsage

export function WorksPage() {
  const [filter, setFilter] = useState<Filter>("all")
  const usages = getAvailableUsages()

  const works = useMemo(() => {
    const all = getPublishedWorks()
    if (filter === "all") return all
    return all.filter((w) => w.usage === filter)
  }, [filter])

  const chips: { id: Filter; label: string }[] = [
    { id: "all", label: "전체" },
    ...usages.map((u) => ({ id: u as Filter, label: workUsageLabel[u] })),
  ]

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-2 md:px-10 md:pb-24">
        <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[32px]">작업</h1>
        <p className="mt-2 max-w-xl text-[14px] text-neutral-500">
          제작 제안·샘플 방향입니다. 실제 납품 고객사 표기가 아닙니다.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {chips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFilter(chip.id)}
              className={`text-[14px] font-bold tracking-tight ${
                filter === chip.id ? "text-black" : "text-neutral-400 hover:text-black"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} priority={i < 3} />
          ))}
        </div>
      </div>
    </div>
  )
}
