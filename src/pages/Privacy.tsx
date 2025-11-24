import { useLanguage } from "../contexts/LanguageContext"
import { useMetaTags } from "../hooks/useMetaTags"

export function Privacy() {
  const { t } = useLanguage()
  
  useMetaTags({
    title: `${t("privacy.title")} | SOBOK`,
    description: "SOBOK 개인정보처리방침을 확인하세요.",
    image: "/og-privacy.jpg",
    url: "/privacy",
    type: "website"
  })
  
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8">{t("privacy.title")}</h1>
          
          <p className="text-gray-600 mb-8">
            {t("privacy.effectiveDate")}
          </p>

          <p className="mb-8 leading-relaxed">
            {t("privacy.intro1")}
          </p>

          <p className="mb-12 text-gray-600">
            {t("privacy.intro2")}
          </p>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section1.title")}</h2>
            <p className="mb-4">{t("privacy.section1.intro")}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("privacy.section1.required.title")}</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>{t("privacy.section1.required.item1")}</li>
                <li>{t("privacy.section1.required.item2")}</li>
                <li>{t("privacy.section1.required.item3")}</li>
                <li>{t("privacy.section1.required.item4")}</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("privacy.section1.optional.title")}</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>{t("privacy.section1.optional.item1")}</li>
                <li>{t("privacy.section1.optional.item2")}</li>
                <li>{t("privacy.section1.optional.item3")}</li>
                <li>{t("privacy.section1.optional.item4")}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t("privacy.section1.auto.title")}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("privacy.section1.auto.item1")}</li>
              </ul>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section2.title")}</h2>
            <p className="mb-4">{t("privacy.section2.intro")}</p>
            
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong>{t("privacy.section2.purpose1.title")}</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>{t("privacy.section2.purpose1.item1")}</li>
                  <li>{t("privacy.section2.purpose1.item2")}</li>
                  <li>{t("privacy.section2.purpose1.item3")}</li>
                </ul>
              </li>
              <li>
                <strong>{t("privacy.section2.purpose2.title")}</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>{t("privacy.section2.purpose2.item1")}</li>
                  <li>{t("privacy.section2.purpose2.item2")}</li>
                </ul>
              </li>
              <li>
                <strong>{t("privacy.section2.purpose3.title")}</strong>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>{t("privacy.section2.purpose3.item1")}</li>
                  <li>{t("privacy.section2.purpose3.item2")}</li>
                </ul>
              </li>
              <li><strong>{t("privacy.section2.purpose4.title")}</strong></li>
            </ol>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section3.title")}</h2>
            <p className="mb-4">{t("privacy.section3.intro")}</p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{t("privacy.section3.item1")}</li>
              <li>{t("privacy.section3.item2")}</li>
              <li>{t("privacy.section3.item3")}</li>
            </ul>

            <p className="text-gray-600">{t("privacy.section3.note")}</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section4.title")}</h2>
            <p className="mb-4">{t("privacy.section4.content1")}</p>
            <p className="text-gray-600">{t("privacy.section4.content2")}</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section5.title")}</h2>
            <p className="mb-4">{t("privacy.section5.content1")}</p>
            <p className="mb-4">{t("privacy.section5.content2")}</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section6.title")}</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{t("privacy.section6.procedure.title")}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("privacy.section6.procedure.item1")}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t("privacy.section6.method.title")}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t("privacy.section6.method.item1")}</li>
                <li>{t("privacy.section6.method.item2")}</li>
              </ul>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section7.title")}</h2>
            <p className="mb-4">{t("privacy.section7.intro")}</p>
            
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>{t("privacy.section7.item1")}</li>
              <li>{t("privacy.section7.item2")}</li>
              <li>{t("privacy.section7.item3")}</li>
            </ul>

            <p className="text-gray-600">{t("privacy.section7.note")}</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section8.title")}</h2>
            <p className="mb-4">{t("privacy.section8.intro")}</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("privacy.section8.item1")}</li>
              <li>{t("privacy.section8.item2")}</li>
              <li>{t("privacy.section8.item3")}</li>
              <li>{t("privacy.section8.item4")}</li>
            </ul>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section9.title")}</h2>
            <p className="mb-4">{t("privacy.section9.content1")}</p>
            <p className="text-gray-600">{t("privacy.section9.content2")}</p>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section10.title")}</h2>
            <p className="mb-4">{t("privacy.section10.intro")}</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("privacy.section10.officer")}</li>
              <li>{t("privacy.section10.email")} <a href="mailto:jay@faddit.co.kr" className="text-blue-600 hover:underline">jay@faddit.co.kr</a></li>
              <li>{t("privacy.section10.phone")} <a href="tel:010-5662-0796" className="text-blue-600 hover:underline">010-5662-0796</a></li>
            </ul>
          </section>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("privacy.section11.title")}</h2>
            <p className="mb-4">{t("privacy.section11.content1")}</p>
            <p className="text-gray-600">{t("privacy.section11.content2")}</p>
          </section>
        </div>
      </div>
    </main>
  )
}

