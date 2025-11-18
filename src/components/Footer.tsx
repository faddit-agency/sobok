import { Instagram, Facebook, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="text-white py-12 px-4" style={{ backgroundColor: '#222222' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img 
                src="/Sobok_white.svg" 
                alt="SOBOK" 
                className="h-6 w-auto"
              />
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{t("footer.company")} | {t("footer.ceo")}</p>
              <p>{t("footer.businessNumber")}</p>
              <p>{t("footer.address")}</p>
              <p>{t("footer.inquiry")}</p>
            </div>
          </div>
          
          <div>
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="#" className="text-sm text-gray-300 hover:text-white">{t("footer.privacy")}</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">{t("footer.terms")}</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">{t("footer.notice")}</a>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Mail size={16} className="text-gray-300" />
              <a href="mailto:contact@faddit.co.kr" className="text-sm text-gray-300 hover:text-white">
                contact@faddit.co.kr
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

