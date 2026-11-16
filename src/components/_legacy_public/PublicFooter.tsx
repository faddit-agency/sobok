import { Link } from "react-router-dom"
import { siteSettings } from "../../data/siteSettings"

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-10 text-[12px] leading-relaxed text-neutral-500 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <p>
              {siteSettings.brandName}
              {siteSettings.ceo ? ` / ${siteSettings.ceo}` : ""}
            </p>
            {siteSettings.businessNumber && <p>사업자등록번호 {siteSettings.businessNumber}</p>}
            {siteSettings.address && <p>{siteSettings.address}</p>}
            {!siteSettings.address && !siteSettings.businessNumber && (
              <p>회사·사업자 정보는 확정 후 반영됩니다.</p>
            )}
          </div>
          <div className="space-y-1 md:text-right">
            {siteSettings.contactEmail && (
              <p>
                <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-black">
                  {siteSettings.contactEmail}
                </a>
              </p>
            )}
            <p>
              <Link to="/privacy" className="hover:text-black">
                개인정보
              </Link>
              {" · "}
              <Link to="/inquiry" className="hover:text-black">
                문의
              </Link>
            </p>
            <p>© {siteSettings.brandName}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
