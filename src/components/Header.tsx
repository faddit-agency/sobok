import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"
import { LanguageToggle } from "./LanguageToggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  const navLinks = [
    { path: "/", key: "nav.home", anchor: null },
    { path: "/", key: "nav.about", anchor: "#who-we-are" },
    { path: "/", key: "nav.works", anchor: "#works" },
    { path: "/faq", key: "nav.faq", anchor: null },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string | null, path: string) => {
    // HOME 링크 클릭 시 최상단으로 스크롤
    if (path === "/" && !anchor) {
      e.preventDefault()
      if (location.pathname !== "/") {
        window.location.href = "/"
        return
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      setIsMenuOpen(false)
      return
    }
    
    if (anchor) {
      e.preventDefault()
      
      // 홈페이지가 아니면 먼저 홈페이지로 이동
      if (location.pathname !== "/") {
        window.location.href = `/${anchor}`
        return
      }
      
      // 홈페이지에 있으면 스크롤
      const element = document.querySelector(anchor)
      if (element) {
        const headerOffset = 64 // header height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://res.cloudinary.com/dsg01xpat/image/upload/v1766393707/%E7%B4%A0%E7%B5%86_rwuenu.png" 
              alt="SOBIN" 
              className="h-7 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.path + (link.anchor || "")}
                to={link.anchor ? `${link.path}${link.anchor}` : link.path}
                onClick={(e) => handleNavClick(e, link.anchor, link.path)}
                className={`text-sm hover:text-gray-600 transition-colors ${
                  isActive(link.path) ? "font-semibold text-gray-900" : ""
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right Side - Inquiry Button & Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <Link to="/inquiry">
              <button className="text-white px-6 py-2 rounded-md text-sm font-medium transition-colors" style={{ backgroundColor: '#222222' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#222222'}>
                {t("nav.inquiry")}
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path + (link.anchor || "")}
                  to={link.anchor ? `${link.path}${link.anchor}` : link.path}
                  onClick={(e) => {
                    handleNavClick(e, link.anchor, link.path)
                    if (!link.anchor && link.path !== "/") setIsMenuOpen(false)
                  }}
                  className={`text-sm hover:text-gray-600 transition-colors ${
                    isActive(link.path) ? "font-semibold text-gray-900" : ""
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                to="/inquiry"
                onClick={() => setIsMenuOpen(false)}
                className="text-white px-6 py-2 rounded-md text-sm font-medium text-center transition-colors" style={{ backgroundColor: '#222222' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#222222'}
              >
                {t("nav.inquiry")}
              </Link>
              <div className="pt-2">
                <LanguageToggle />
              </div>
            </nav>
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
