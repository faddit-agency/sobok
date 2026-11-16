import { Link, useNavigate } from "react-router-dom"
import { StudioHeader, type StudioMenuId } from "../../components/public/StudioHeader"
import { siteSettings } from "../../data/siteSettings"
import { useMetaTags } from "../../hooks/useMetaTags"
import { useLanguage } from "../../contexts/LanguageContext"
import { st } from "../../i18n/studio"

export function PrivacyPage() {
  const navigate = useNavigate()
  const { language } = useLanguage()

  useMetaTags({
    title: st(language, "privacy.metaTitle"),
    description: st(language, "privacy.metaDesc"),
    image: "/brand/bojagi-flat-wrapped.png",
    url: "/privacy",
    type: "website",
  })

  const onSelect = (id: StudioMenuId) => {
    navigate("/", { state: { menu: id } })
  }

  return (
    <div className="min-h-screen bg-white">
      <StudioHeader active="home" onSelect={onSelect} />

      <div className="mx-auto max-w-[720px] px-5 py-10 md:px-10 md:py-14">
        <p className="mb-6">
          <Link to="/" className="text-[13px] font-bold text-black hover:opacity-55">
            {st(language, "privacy.back")}
          </Link>
        </p>
        <h1 className="text-[28px] font-bold tracking-tight text-black md:text-[32px]">
          {st(language, "privacy.title")}
        </h1>
        <p className="mt-4 text-[14px] text-neutral-500">{st(language, "privacy.intro")}</p>
        <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-neutral-600">
          <section>
            <h2 className="font-bold text-black">{st(language, "privacy.items.title")}</h2>
            <p className="mt-2">{st(language, "privacy.items.body")}</p>
          </section>
          <section>
            <h2 className="font-bold text-black">{st(language, "privacy.purpose.title")}</h2>
            <p className="mt-2">{st(language, "privacy.purpose.body")}</p>
          </section>
          <section>
            <h2 className="font-bold text-black">{st(language, "privacy.retain.title")}</h2>
            <p className="mt-2">{st(language, "privacy.retain.body")}</p>
          </section>
          <section>
            <h2 className="font-bold text-black">{st(language, "privacy.contact.title")}</h2>
            <p className="mt-2">
              {st(language, "privacy.contact.body")}{" "}
              <a href={`mailto:${siteSettings.contactEmail}`} className="text-black underline">
                {siteSettings.contactEmail}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
