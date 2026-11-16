import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export function Footer() {
  const { t, language } = useLanguage()
  return <footer className="brand-footer">
    <div className="footer-top">
      <Link to="/" aria-label="SOBOK"><img src="/Sobok_black.svg" alt="소복" width="100" /></Link>
      <Link to="/inquiry" className="footer-contact">{language === 'ko' ? '함께 만들고 싶은 선물이 있나요?' : 'Have a thoughtful gift in mind?'}<ArrowUpRight size={22}/></Link>
    </div>
    <div className="footer-content">
      <div className="footer-company"><p>{t('footer.company')} · {t('footer.ceo')}</p><p>{t('footer.businessNumber')}</p><p>{t('footer.address')}</p><p>{t('footer.inquiry')}</p></div>
      <div className="footer-links"><Link to="/design">{language === 'ko' ? '프롬프트로 디자인하기' : 'Design with a prompt'}</Link><Link to="/works">{language === 'ko' ? '제작 사례' : 'Our work'}</Link><Link to="/faq">FAQ</Link><Link to="/notice">{t('footer.notice')}</Link><a href="mailto:contact@faddit.co.kr">contact@faddit.co.kr <ArrowUpRight size={14}/></a></div>
    </div>
    <div className="footer-bottom"><span>{t('footer.copyright')}</span><Link to="/privacy">{t('footer.privacy')}</Link></div>
  </footer>
}
