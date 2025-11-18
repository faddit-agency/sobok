import { useLanguage } from "../contexts/LanguageContext"

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs font-medium">
        <span className={language === "ko" ? "text-gray-900 font-semibold" : "text-gray-400"}>
          KO
        </span>
        <span className="text-gray-300">|</span>
        <span className={language === "en" ? "text-gray-900 font-semibold" : "text-gray-400"}>
          EN
        </span>
      </div>
      <button
        onClick={toggleLanguage}
        className="relative inline-flex h-7 w-12 items-center rounded-full bg-gray-200 transition-colors duration-200 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        role="switch"
        aria-checked={language === "en"}
        aria-label="Toggle language"
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
            language === "en" ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}

