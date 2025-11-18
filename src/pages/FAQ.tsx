import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("faq.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </section>

        {/* FAQ List */}
        <section className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
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

