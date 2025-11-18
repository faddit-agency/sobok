import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [query, setQuery] = useState("")

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") }
  ].map((faq, index) => ({ ...faq, index }))

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs
    const lower = query.toLowerCase()
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lower) ||
        faq.answer.toLowerCase().includes(lower)
    )
  }, [faqs, query])

  const categories = [
    { label: "FAQ", active: true },
    { label: "SERVICE", active: false },
    { label: "ETC", active: false }
  ]
  const placeholderText = t("faq.searchPlaceholder") || "검색어를 입력해주세요."
  const noResultText = t("faq.noResult") || "일치하는 결과가 없습니다."

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto px-4">
        <section className="flex flex-col md:flex-row gap-12">
          {/* Left Intro / Categories */}
          <div className="md:w-1/3 space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6">
                {t("faq.subtitle")}
              </p>
              <h1 className="text-[80px] leading-none font-extrabold tracking-tight text-black">
                FAQ
              </h1>
            </div>

            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.label}
                  className={`text-4xl font-extrabold tracking-wide ${
                    category.active ? "text-black" : "text-gray-300"
                  }`}
                >
                  {category.label}
                  {category.active && <sup className="text-lg ml-1">°</sup>}
                </div>
              ))}
            </div>
          </div>

          {/* Right FAQ Content */}
          <div className="md:w-2/3 space-y-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholderText}
                className="w-full border border-gray-200 rounded-full py-4 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-black/30 transition"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2" />
            </div>

            <div className="space-y-2">
              {filteredFaqs.length === 0 && (
                <div className="text-gray-500 py-10 text-center border rounded-2xl">
                  {noResultText}
                </div>
              )}
              {filteredFaqs.map((faq) => {
                const isOpen = openIndex === faq.index
                return (
                  <div
                    key={faq.question}
                    className="border-b border-gray-200"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.index)}
                      className="w-full py-5 text-left flex items-center justify-between"
                    >
                      <span className="text-lg font-medium">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("faq.contact.title")}</h2>
          <p className="text-gray-600 mb-6">
            {t("faq.contact.desc")}
          </p>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>{t("faq.contact.email")}</strong>{" "}
              <a href="mailto:info@sobok.com" className="text-blue-600 hover:underline">
                info@sobok.com
              </a>
            </p>
            <p className="text-sm text-gray-500">
              {t("faq.contact.hours")}
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

