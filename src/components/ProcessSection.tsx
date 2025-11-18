import { Fragment } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useScrollAnimation } from "../hooks/useScrollAnimation"

export function ProcessSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  
  const steps = [
    { 
      title: t("home.process.step1.title"), 
      desc: t("home.process.step1.desc"),
      features: t("home.process.step1.features").split('\n')
    },
    { 
      title: t("home.process.step2.title"), 
      desc: t("home.process.step2.desc"),
      features: t("home.process.step2.features").split('\n')
    },
    { 
      title: t("home.process.step3.title"), 
      desc: t("home.process.step3.desc"),
      features: t("home.process.step3.features").split('\n')
    },
    { 
      title: t("home.process.step4.title"), 
      desc: t("home.process.step4.desc"),
      features: t("home.process.step4.features").split('\n')
    },
    { 
      title: t("home.process.step5.title"), 
      desc: t("home.process.step5.desc"),
      features: t("home.process.step5.features").split('\n')
    }
  ]
  
  return (
    <section 
      ref={ref}
      className={`py-16 sm:py-24 md:py-32 px-4 bg-white transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-900 text-sm font-medium rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
            {t("home.process.title")}
          </span>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.3]">{t("home.process.subtitle")}</p>
        </div>
        <div className="flex flex-col items-center gap-8">
          {/* 첫 번째 줄: 1-3번 카드 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full">
            {steps.slice(0, 3).map((step, index) => (
              <Fragment key={index}>
                <div className="bg-gray-50 rounded-lg p-6 sm:p-8 w-full md:w-auto md:min-w-[320px] lg:min-w-[360px] max-w-[400px]">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full text-white flex items-center justify-center font-bold text-lg sm:text-xl mb-4 sm:mb-6" style={{ backgroundColor: '#222222' }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{step.desc}</p>
                  <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-500">
                    {step.features && step.features.map((feature: string, idx: number) => (
                      <div key={idx}>• {feature}</div>
                    ))}
                  </div>
                </div>
                {index < 2 && (
                  <ArrowRight 
                    className="hidden md:block text-gray-400 flex-shrink-0" 
                    size={28} 
                  />
                )}
              </Fragment>
            ))}
          </div>
          
          {/* 두 번째 줄: 4-5번 카드 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full">
            {steps.slice(3).map((step, index) => (
              <Fragment key={index + 3}>
                <div className="bg-gray-50 rounded-lg p-6 sm:p-8 w-full md:w-auto md:min-w-[320px] lg:min-w-[360px] max-w-[400px]">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full text-white flex items-center justify-center font-bold text-lg sm:text-xl mb-4 sm:mb-6" style={{ backgroundColor: '#222222' }}>
                    {String(index + 4).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{step.desc}</p>
                  <div className="space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-500">
                    {step.features && step.features.map((feature: string, idx: number) => (
                      <div key={idx}>• {feature}</div>
                    ))}
                  </div>
                </div>
                {index < 1 && (
                  <ArrowRight 
                    className="hidden md:block text-gray-400 flex-shrink-0" 
                    size={28} 
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

