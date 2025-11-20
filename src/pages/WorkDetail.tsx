import { useEffect, useMemo } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { worksData } from "../data/works"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { useLanguage } from "../contexts/LanguageContext"

export function WorkDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const work = useMemo(() => worksData.find((item) => item.slug === slug), [slug])

  useEffect(() => {
    if (!work) {
      navigate("/works", { replace: true })
    }
  }, [work, navigate])

  if (!work) return null

  const title = t(work.titleKey)
  const category = t(work.categoryKey)
  const status = t(work.statusKey)

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={work.heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container mx-auto px-4 py-32 sm:py-40 text-white">
          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/80">
              {category}
              <span className="w-1 h-1 rounded-full bg-white/60" />
              {status}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              {work.heroSummary}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-white/90"
                onClick={() => navigate("/inquiry")}
              >
                프로젝트 문의하기
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10"
                onClick={() => navigate("/works")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            {work.overview}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {work.metrics.map((metric) => (
              <div key={metric.label} className="bg-gray-50 rounded-2xl p-6">
                <p className="text-sm text-gray-500">{metric.label}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900">Deliverables</h3>
          <ul className="space-y-3 text-gray-600">
            {work.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gray-900" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Highlights</p>
            <h2 className="text-3xl font-semibold">프로젝트 핵심</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {work.highlights.map((highlight) => (
              <div key={highlight.title} className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                <p className="text-white/80 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Palette */}
      <section className="container mx-auto px-4 py-16 space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Palette</p>
          <h2 className="text-3xl font-semibold text-gray-900">Color Direction</h2>
          <p className="text-gray-600 max-w-2xl">
            브랜드가 원하는 톤앤매너를 유지하기 위해 선정한 핵심 컬러입니다. 모든 패키지 소모품과 시각 자료는 동일한 팔레트를 기준으로 제작합니다.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {work.palette.map((color) => (
            <div key={color} className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-24" style={{ backgroundColor: color }} />
              <div className="p-3 text-center text-sm font-medium text-gray-700">{color}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 flex flex-col gap-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Next Project</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            브랜드가 원하는 분위기를<br className="hidden sm:block" />패키지로 구현해 드립니다.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            소재 제안, 직조, 패턴 개발, 목업까지 한 번에 진행해보세요. 미팅 예약 또는 메일 문의로 프로젝트를 빠르게 시작할 수 있습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/inquiry">
                프로젝트 상담하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/works">
                다른 작업 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

