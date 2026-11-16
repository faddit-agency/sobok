import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { HomeVideo } from "../../components/public/HomeVideo"
import { InquiryPanel } from "../../components/public/InquiryPanel"
import { StudioHeader, type StudioMenuId } from "../../components/public/StudioHeader"
import { WorkModal } from "../../components/public/WorkModal"
import { getPublishedWorks, type WorkItem } from "../../data/worksCatalog"
import { siteSettings } from "../../data/siteSettings"
import { useLanguage } from "../../contexts/LanguageContext"
import { localizeWork, st } from "../../i18n/studio"

export function HomePage() {
  const { language } = useLanguage()
  const location = useLocation()
  const initialMenu = (location.state as { menu?: StudioMenuId } | null)?.menu
  const [menu, setMenu] = useState<StudioMenuId>(initialMenu || "home")
  const [activeWork, setActiveWork] = useState<WorkItem | null>(null)
  const [inquiryWork, setInquiryWork] = useState<WorkItem | null>(null)
  const [mobileInquiryOpen, setMobileInquiryOpen] = useState(false)

  useEffect(() => {
    const next = (location.state as { menu?: StudioMenuId } | null)?.menu
    if (next) setMenu(next)
  }, [location.state])

  const works = useMemo(
    () => getPublishedWorks().map((w) => localizeWork(w, language)),
    [language]
  )

  const processSteps = useMemo(
    () => [
      { n: "01", title: st(language, "process.1.title"), body: st(language, "process.1.body") },
      { n: "02", title: st(language, "process.2.title"), body: st(language, "process.2.body") },
      { n: "03", title: st(language, "process.3.title"), body: st(language, "process.3.body") },
      { n: "04", title: st(language, "process.4.title"), body: st(language, "process.4.body") },
    ],
    [language]
  )

  const aboutValues = useMemo(
    () => [
      {
        key: "intent",
        title: st(language, "about.value.intent.title"),
        body: st(language, "about.value.intent.body"),
      },
      {
        key: "sustain",
        title: st(language, "about.value.sustain.title"),
        body: st(language, "about.value.sustain.body"),
      },
      {
        key: "custom",
        title: st(language, "about.value.custom.title"),
        body: st(language, "about.value.custom.body"),
      },
    ],
    [language]
  )

  const openInquire = useCallback((work: WorkItem) => {
    setInquiryWork(work)
    setActiveWork(null)
    setMobileInquiryOpen(true)
    requestAnimationFrame(() => {
      document.getElementById("inquiry-scroll")?.scrollTo({ top: 0, behavior: "smooth" })
    })
  }, [])

  const onSelectMenu = useCallback((id: StudioMenuId) => {
    setMenu(id)
    document.getElementById("studio-main")?.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-white text-black">
      <StudioHeader
        active={menu}
        onSelect={onSelectMenu}
        mobileAction={{
          open: mobileInquiryOpen,
          onToggle: () => setMobileInquiryOpen((v) => !v),
          labelOpen: st(language, "header.inquiryOpen"),
          labelClose: st(language, "header.inquiryClose"),
          controlsId: "inquiry-panel",
        }}
      />

      <div className="relative flex min-h-0 flex-1">
        <section id="studio-main" className="scrollbar-hide min-w-0 flex-1 overflow-y-auto">
          {menu === "about" && (
            <div className="px-5 py-8 md:px-8 md:py-12">
              <p className="max-w-[40ch] text-[22px] font-bold leading-[1.4] tracking-tight text-black md:text-[28px] md:leading-[1.35]">
                {st(language, "about.headline1")}
                <br />
                {st(language, "about.headline2")}
              </p>

              <div className="mt-10 max-w-[52ch] space-y-5 text-[14px] leading-relaxed text-neutral-600 md:text-[15px]">
                <p>{st(language, "about.p1")}</p>
                <p>
                  <span className="font-bold text-black">
                    {language === "en" ? siteSettings.brandNameEn : siteSettings.brandName}
                  </span>
                  {st(language, "about.p2.after")}
                </p>
                <p>{st(language, "about.p3")}</p>
              </div>

              <div className="mt-14 grid gap-10 border-t border-neutral-200 pt-10 sm:grid-cols-3">
                {aboutValues.map((item) => (
                  <div key={item.key}>
                    <h2 className="text-[13px] font-bold tracking-wide text-black">{item.title}</h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-neutral-600">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-14 grid gap-0 border border-neutral-200 md:grid-cols-2">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-100 md:aspect-auto md:min-h-[420px]">
                  <img
                    src="/brand/bojagi-hero-v2.png"
                    alt={st(language, "about.imgAlt")}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
                  <p className="text-[12px] font-bold tracking-wide text-neutral-400">
                    {st(language, "about.nameLabel")}
                  </p>
                  <h2 className="mt-2 text-[20px] font-bold text-black md:text-[22px]">
                    {language === "en" ? siteSettings.brandNameEn : siteSettings.brandName}
                  </h2>
                  <p className="mt-5 text-[14px] leading-relaxed text-neutral-600">
                    {st(language, "about.block1")}
                  </p>
                  <p className="mt-4 text-[14px] leading-relaxed text-neutral-600">
                    {st(language, "about.block2")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {menu === "process" && (
            <div className="px-5 py-8 md:px-8 md:py-10">
              <h1 className="text-[22px] font-bold tracking-tight text-black md:text-[26px]">
                {st(language, "process.title")}
              </h1>
              <ol className="mt-10 grid gap-10 sm:grid-cols-2">
                {processSteps.map((s) => (
                  <li key={s.n}>
                    <p className="text-[12px] font-bold tracking-[0.06em] text-neutral-400">{s.n}</p>
                    <h2 className="mt-2 text-[16px] font-bold text-black">{s.title}</h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {menu === "home" && <HomeVideo />}

          {menu === "product" && (
            <div className="bg-[#f5f5f5] px-3 pb-12 pt-5 md:px-5 md:pb-16 md:pt-6">
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                {works.map((work) => (
                  <button
                    key={work.id}
                    type="button"
                    onClick={() => setActiveWork(getPublishedWorks().find((w) => w.id === work.id) || work)}
                    className="group text-left outline-none ring-0 focus:outline-none focus-visible:outline-none"
                  >
                    <div className="aspect-square overflow-hidden bg-[#ebebeb]">
                      <img
                        src={work.heroImage}
                        alt={work.title}
                        className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-[11px] font-normal leading-snug text-black md:text-[12px]">
                        {work.title}
                      </p>
                      <p className="mt-0.5 text-[11px] font-normal leading-snug text-black md:text-[12px]">
                        {work.year} / {work.categoryLabel}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <footer className="border-t border-neutral-200 px-4 py-6 text-[11px] text-neutral-400 md:px-5 md:hidden">
            <p>© {language === "en" ? siteSettings.brandNameEn : siteSettings.brandName}</p>
          </footer>
        </section>

        <aside
          id="inquiry-panel"
          className={[
            "z-40 flex w-full flex-col border-neutral-200 bg-white",
            "md:relative md:flex md:w-[360px] md:shrink-0 md:border-l lg:w-[400px]",
            "fixed inset-y-0 right-0 max-w-[100vw] border-l shadow-xl transition-transform duration-300 md:static md:max-w-none md:shadow-none",
            "top-12 md:top-auto",
            mobileInquiryOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
          ].join(" ")}
        >
          <div className="hidden border-b border-neutral-200 px-6 py-5 md:block">
            <h2 className="text-[16px] font-bold text-black">{st(language, "inquiry.title")}</h2>
            <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
              {inquiryWork ? st(language, "inquiry.leadSelected") : st(language, "inquiry.lead")}
            </p>
          </div>

          <div id="inquiry-scroll" className="scrollbar-hide min-h-0 flex-1 overflow-y-auto">
            <InquiryPanel
              selectedWork={inquiryWork}
              onClearWork={() => setInquiryWork(null)}
              onSubmitted={() => setMobileInquiryOpen(false)}
            />
          </div>

          <div className="hidden border-t border-neutral-200 px-6 py-3 text-[11px] text-neutral-400 md:block">
            <Link to="/privacy" className="hover:text-black">
              {st(language, "inquiry.privacy")}
            </Link>
            <span className="mx-2">·</span>
            <span>© {language === "en" ? siteSettings.brandNameEn : siteSettings.brandName}</span>
          </div>
        </aside>

        {mobileInquiryOpen && (
          <button
            type="button"
            className="fixed inset-0 top-12 z-30 bg-black/25 md:hidden"
            aria-label={st(language, "header.inquiryClose")}
            onClick={() => setMobileInquiryOpen(false)}
          />
        )}
      </div>

      <WorkModal work={activeWork} onClose={() => setActiveWork(null)} onInquire={openInquire} />
    </div>
  )
}
