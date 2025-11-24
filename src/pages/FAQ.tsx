import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"SERVICE" | "ETC">("SERVICE")

  const serviceFaqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") }
  ].map((faq, index) => ({ ...faq, index, category: "SERVICE" as const }))

  const etcFaqs = [
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") }
  ].map((faq, index) => ({ ...faq, index: index + serviceFaqs.length, category: "ETC" as const }))

  const currentFaqs = selectedCategory === "SERVICE" ? serviceFaqs : etcFaqs

  const handleCategoryChange = (category: "SERVICE" | "ETC") => {
    setSelectedCategory(category)
    const newFaqs = category === "SERVICE" ? serviceFaqs : etcFaqs
    setOpenIndex(newFaqs.length > 0 ? newFaqs[0].index : null) // 카테고리 변경 시 첫 번째 항목 열기
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return currentFaqs
    const lower = query.toLowerCase()
    return currentFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lower) ||
        faq.answer.toLowerCase().includes(lower)
    )
  }, [currentFaqs, query])


  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto px-4">
        <section className="flex flex-col md:flex-row gap-12">
          {/* Left Intro / Categories */}
          <div className="md:w-1/3 space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-black">
                FAQ
              </h1>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleCategoryChange("SERVICE")}
                className={`text-4xl font-extrabold tracking-wide text-left w-full ${
                  selectedCategory === "SERVICE" ? "text-black" : "text-gray-300"
                } cursor-pointer hover:text-gray-500 transition-colors`}
              >
                SERVICE
                {selectedCategory === "SERVICE" && <sup className="text-lg ml-1">°</sup>}
              </button>
              <button
                onClick={() => handleCategoryChange("ETC")}
                className={`text-4xl font-extrabold tracking-wide text-left w-full ${
                  selectedCategory === "ETC" ? "text-black" : "text-gray-300"
                } cursor-pointer hover:text-gray-500 transition-colors`}
              >
                ETC
                {selectedCategory === "ETC" && <sup className="text-lg ml-1">°</sup>}
              </button>
            </div>
          </div>

          {/* Right FAQ Content */}
          <div className="md:w-2/3 space-y-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("faq.search.placeholder")}
                className="w-full border border-gray-200 rounded-full py-4 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-black/30 transition"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-6 top-1/2 -translate-y-1/2" />
            </div>

            <div className="space-y-2">
              {query.trim() && filteredFaqs.length === 0 && (
                <div className="text-gray-500 py-10 text-center border rounded-2xl">
                  {t("faq.search.noResult")}
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
        <section className="bg-gray-50 rounded-lg p-12 text-center mt-20">
          <h2 className="text-2xl font-bold mb-4">{t("faq.contact.title")}</h2>
          <p className="text-gray-600 mb-6">
            {t("faq.contact.desc")}
          </p>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>{t("faq.contact.email")}</strong>{" "}
              <a href="mailto:contact@faddit.co.kr" className="text-blue-600 hover:underline">
                contact@faddit.co.kr
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

