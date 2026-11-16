import { Link, Navigate, useParams } from "react-router-dom"
import { WorkCard } from "../../components/public/WorkCard"
import { getPublishedWorks, getWorkBySlug, workTypeLabel } from "../../data/worksCatalog"

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const work = slug ? getWorkBySlug(slug) : undefined

  if (!work) return <Navigate to="/works" replace />

  const related = getPublishedWorks()
    .filter((w) => work.relatedSlugs.includes(w.slug) && w.slug !== work.slug)
    .slice(0, 3)

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-[1400px] px-5 pb-16 pt-2 md:px-10 md:pb-24">
        <p className="text-[13px] font-bold tracking-tight text-neutral-400">
          <Link to="/works" className="hover:text-black">
            작업
          </Link>
          {" / "}
          {work.title}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            {work.images.map((img) => (
              <div key={img.src} className="aspect-square overflow-hidden bg-neutral-100">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[34px]">{work.title}</h1>
            <p className="mt-1 text-[15px] text-neutral-500">
              {work.year} / {work.categoryLabel}
            </p>
            <p className="mt-2 text-[13px] text-neutral-400">{workTypeLabel[work.type]}</p>

            <p className="mt-8 text-[16px] font-bold leading-relaxed text-black md:text-[17px]">{work.intent}</p>
            <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">{work.shortIntro}</p>

            {work.points.length > 0 && (
              <ul className="mt-6 space-y-1.5 text-[14px] text-neutral-700">
                {work.points.map((p) => (
                  <li key={p}>· {p}</li>
                ))}
              </ul>
            )}

            <dl className="mt-8 space-y-2 border-t border-neutral-200 pt-6 text-[13px]">
              {work.specs.material && (
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-neutral-400">소재</dt>
                  <dd className="text-black">{work.specs.material}</dd>
                </div>
              )}
              {work.specs.purpose && (
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-neutral-400">용도</dt>
                  <dd className="text-black">{work.specs.purpose}</dd>
                </div>
              )}
              {work.specs.method && (
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-neutral-400">방식</dt>
                  <dd className="text-black">{work.specs.method}</dd>
                </div>
              )}
              {work.specs.changeable && (
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-neutral-400">변경 가능</dt>
                  <dd className="text-black">{work.specs.changeable}</dd>
                </div>
              )}
            </dl>

            <div className="mt-10">
              <Link
                to="/inquiry"
                className="inline-block text-[14px] font-bold tracking-tight text-black hover:opacity-55"
              >
                이 방향으로 문의하기 →
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-neutral-200 pt-12">
            <h2 className="text-[18px] font-bold text-black">관련 작업</h2>
            <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5">
              {related.map((w) => (
                <WorkCard key={w.id} work={w} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
