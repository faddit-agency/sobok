import { Instagram, Facebook, Linkedin, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="text-white py-12 px-4" style={{ backgroundColor: '#222222' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-8">
          <div className="flex-1">
            <div className="mb-4">
              <img 
                src="/Sobok_white.svg" 
                alt="소복" 
                className="h-6 w-auto"
              />
            </div>
            <div className="space-y-2 text-gray-300">
              <p className="text-base">{t("footer.company")} | {t("footer.ceo")}</p>
              <p className="text-base">{t("footer.businessNumber")}</p>
              <p className="text-base">{t("footer.address")}</p>
              <p className="text-base">{t("footer.inquiry")}</p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-4 mb-6 justify-start md:justify-end">
              <Link to="/privacy" className="text-base text-gray-300 hover:text-white">{t("footer.privacy")}</Link>
              <a href="#" className="text-base text-gray-300 hover:text-white">{t("footer.terms")}</a>
              <Link to="/notice" className="text-base text-gray-300 hover:text-white">{t("footer.notice")}</Link>
            </div>
            
            <div className="flex items-center gap-2 mb-4 justify-start md:justify-end">
              <Mail size={16} className="text-gray-300" />
              <a href="mailto:contact@faddit.co.kr" className="text-base text-gray-300 hover:text-white">
                contact@faddit.co.kr
              </a>
            </div>
            
            <div className="flex items-center gap-4 justify-start md:justify-end">
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
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="text-base">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

