import { useLanguage } from '../contexts/LanguageContext'

const brands = [
  { name: '설아래', nameEn: 'Seolarae', logo: '/brand/partners/seolarae.svg', height: 26 },
  { name: '그라운드 시소', nameEn: 'Ground Seesaw', logo: '/brand/partners/groundseesaw.svg', height: 15 },
  { name: '은정한과', nameEn: 'Eunjeong Hangwa', logo: '/brand/partners/eunjeong-hangwa.png', height: 21 },
]

// Each half of the track must be wider than the widest viewport for the loop to stay seamless.
const REPEAT = 4
const group = Array.from({ length: REPEAT }, () => brands).flat()

export function BrandLogos() {
  const { language } = useLanguage()
  const ko = language === 'ko'
  const label = ko ? '소복과 함께하는 브랜드' : 'Brands we work with'

  return (
    <section className="brand-logos" aria-label={label}>
      <p className="brand-logos-label">{label}</p>
      <div className="brand-logos-marquee">
        <div className="brand-logos-track">
          {[0, 1].map(copy => (
            <ul key={copy} className="brand-logos-list" aria-hidden={copy === 1 || undefined}>
              {group.map((brand, index) => (
                <li key={`${brand.name}-${index}`}>
                  <img
                    src={brand.logo}
                    alt={copy === 0 && index < brands.length ? (ko ? brand.name : brand.nameEn) : ''}
                    style={{ height: brand.height }}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
