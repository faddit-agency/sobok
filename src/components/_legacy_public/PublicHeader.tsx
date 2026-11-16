import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const navLinks = [
  { to: "/process", label: "소개" },
  { to: "/works", label: "작업" },
  { to: "/inquiry", label: "문의" },
]

export function PublicHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`)

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-[1400px] items-start justify-between px-5 pb-6 pt-7 md:px-10 md:pt-9">
        <Link to="/" className="block" aria-label="소복 홈" onClick={() => setOpen(false)}>
          <img src="/Sobok_black.svg" alt="소복" className="h-[22px] w-auto md:h-6" width={120} height={24} />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="주요 메뉴">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[16px] font-bold tracking-tight text-black transition-opacity hover:opacity-55 md:text-[17px] ${
                isActive(link.to) ? "opacity-100" : "opacity-90"
              }`}
              aria-current={isActive(link.to) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden p-1 text-black"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-neutral-200 px-5 py-4 md:hidden" aria-label="모바일 메뉴">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-[17px] font-bold tracking-tight text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
