import { Link } from "react-router-dom"
import { siteSettings } from "../../data/siteSettings"

const steps = [
  {
    n: "01",
    title: "문의",
    body: "용도·수량·일정·참고 이미지를 남겨 주시면 방향을 잡습니다.",
  },
  {
    n: "02",
    title: "샘플·제안",
    body: "크기·소재·연출을 샘플과 제안으로 맞춰 갑니다.",
  },
  {
    n: "03",
    title: "제작",
    body: "확정 스펙으로 제작합니다. 필요 시 중간 확인을 진행합니다.",
  },
  {
    n: "04",
    title: "납품",
    body: "납품 후 포장 이후의 쓰임까지 이어질 수 있도록 안내합니다.",
  },
]

export function ProcessPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-2 md:px-10 md:pb-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[32px]">소개</h1>
            <p className="mt-6 max-w-[36ch] text-[20px] font-bold leading-[1.4] text-black md:text-[24px]">
              {siteSettings.brandName}은 보자기로 포장하고,
              그 이후에도 쓸 수 있는 방향을 제안합니다.
            </p>
            <p className="mt-5 max-w-[40ch] text-[14px] leading-relaxed text-neutral-600">
              제품 포장, 기업 선물, 행사·기념용까지. 맞춤 제작을 중심으로
              샘플과 제안으로 크기·소재·매듭·연출을 맞춥니다.
            </p>
            <Link
              to="/inquiry"
              className="mt-8 inline-block text-[14px] font-bold tracking-tight text-black hover:opacity-55"
            >
              문의하기 →
            </Link>
          </div>

          <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
            <img
              src="/brand/bojagi-hero-v2.png"
              alt="소복 보자기"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <section className="mt-20 border-t border-neutral-200 pt-12">
          <h2 className="text-[18px] font-bold text-black">진행 과정</h2>
          <ol className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n}>
                <p className="text-[12px] font-bold tracking-[0.06em] text-neutral-400">{s.n}</p>
                <h3 className="mt-2 text-[16px] font-bold text-black">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <Link
            to="/materials"
            className="text-[14px] font-bold tracking-tight text-black hover:opacity-55"
          >
            소재 보기 →
          </Link>
        </section>
      </div>
    </div>
  )
}
