import { Link } from "react-router-dom"
import { getPublishedMaterials } from "../../data/materials"
import { useMetaTags } from "../../hooks/useMetaTags"

export function MaterialsPage() {
  const materials = getPublishedMaterials()

  useMetaTags({
    title: "소재 | 소복",
    description: "소재의 질감과 맞춤 제작 범위를 고객 관점으로 비교합니다.",
    image: "/brand/concept-tea-slab.jpg",
    url: "/materials",
    type: "website",
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-2 md:px-10 md:pb-24">
        <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[32px]">소재</h1>
        <p className="mt-3 max-w-xl text-[14px] text-neutral-500">
          어려운 생산 용어 없이도 비교할 수 있도록 정리했습니다. 확정 사양은 상담과 샘플 확인 후 결정됩니다.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => (
            <article key={m.id} className="block">
              <div className="aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={m.image}
                  alt={`${m.name} 포장 연출`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h2 className="mt-3 text-[15px] font-bold text-black">{m.name}</h2>
              <p className="mt-1 text-[13px] text-neutral-500">
                {m.texture} · {m.thickness}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">
                {m.suitedFor.join(" · ")}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-20 border-t border-neutral-200 pt-12">
          <h2 className="text-[18px] font-bold text-black">맞춤 범위</h2>
          <ul className="mt-6 grid gap-3 text-[14px] text-neutral-600 sm:grid-cols-2">
            {[
              "기존 원단 활용",
              "원단·직조 개발 검토",
              "크기·비율 변경",
              "로고·그래픽 인쇄",
              "패턴 개발",
              "매듭·연출 커스텀",
            ].map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
          <Link
            to="/inquiry"
            className="mt-8 inline-block text-[14px] font-bold tracking-tight text-black hover:opacity-55"
          >
            문의하기 →
          </Link>
        </section>
      </div>
    </div>
  )
}
