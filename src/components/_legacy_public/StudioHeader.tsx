import { Link } from "react-router-dom"
import { useLanguage } from "../../contexts/LanguageContext"
import { st } from "../../i18n/studio"
import { siteSettings } from "../../data/siteSettings"

export type StudioMenuId = "home" | "about" | "product" | "process"

const menuItems: { id: StudioMenuId; label: string }[] = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "product", label: "product" },
  { id: "process", label: "process" },
]

type Props = {
  active: StudioMenuId
  onSelect: (id: StudioMenuId) => void
  mobileAction?: {
    open: boolean
    onToggle: () => void
    labelOpen: string
    labelClose: string
    controlsId: string
  }
}

export function StudioHeader({ active, onSelect, mobileAction }: Props) {
  const { language, setLanguage } = useLanguage()
  const brandAlt = language === "en" ? siteSettings.brandNameEn : siteSettings.brandName

  return (
    <header className="grid h-12 shrink-0 grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-neutral-200 px-4 md:h-14 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-5">
      <Link
        to="/"
        className="justify-self-start"
        aria-label={st(language, "header.homeAria")}
        onClick={() => onSelect("home")}
      >
        <img src="/Sobok_black.svg" alt={brandAlt} className="h-5 w-auto md:h-[22px]" width={110} height={22} />
      </Link>

      <nav
        className="hidden items-center justify-center gap-6 justify-self-center text-[13px] tracking-wide md:flex md:text-[14px]"
        aria-label={st(language, "header.navAria")}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={active === item.id ? "font-bold text-black" : "text-neutral-400 hover:text-black"}
            aria-current={active === item.id ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <nav
        className="flex min-w-0 items-center gap-4 overflow-x-auto text-[13px] tracking-wide md:hidden"
        aria-label={st(language, "header.navAria")}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`shrink-0 ${active === item.id ? "font-bold text-black" : "text-neutral-400"}`}
            aria-current={active === item.id ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center justify-self-end gap-4 md:gap-5">
        <div className="text-[13px] tracking-wide md:text-[14px]" role="group" aria-label={st(language, "header.langAria")}>
          <button
            type="button"
            onClick={() => setLanguage("ko")}
            className={language === "ko" ? "font-bold text-black" : "text-neutral-400 hover:text-black"}
            aria-pressed={language === "ko"}
          >
            Kor
          </button>
          <span className="mx-1.5 text-neutral-300" aria-hidden>
            /
          </span>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={language === "en" ? "font-bold text-black" : "text-neutral-400 hover:text-black"}
            aria-pressed={language === "en"}
          >
            Eng
          </button>
        </div>

        {mobileAction && (
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center text-[28px] font-light leading-none text-black md:hidden"
            aria-expanded={mobileAction.open}
            aria-controls={mobileAction.controlsId}
            aria-label={mobileAction.open ? mobileAction.labelClose : mobileAction.labelOpen}
            onClick={mobileAction.onToggle}
          >
            <span
              className={`inline-block transition-transform duration-200 ${mobileAction.open ? "rotate-45" : ""}`}
              aria-hidden
            >
              +
            </span>
          </button>
        )}
      </div>
    </header>
  )
}
