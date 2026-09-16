import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import { useMetaTags } from "../hooks/useMetaTags"

export function Products() {
  const { t } = useLanguage()
  
  useMetaTags({
    title: `${t("products.title")} | 소복`,
    description: t("products.subtitle"),
    image: "/og-products.jpg",
    url: "/products",
    type: "website"
  })

  const products = [
    {
      id: "slab",
      titleKey: "products.slab.title",
      descKey: "products.slab.desc",
      image: "/products/slab.png",
      category: "regular"
    },
    {
      id: "organza",
      titleKey: "products.organza.title",
      descKey: "products.organza.desc",
      image: "/products/organza.png",
      category: "regular"
    },
    {
      id: "crystal",
      titleKey: "products.crystal.title",
      descKey: "products.crystal.desc",
      image: "/products/crystal.png",
      category: "regular"
    },
    {
      id: "woven",
      titleKey: "products.woven.title",
      descKey: "products.woven.desc",
      image: "https://res.cloudinary.com/dsg01xpat/image/upload/v1763540335/bozhin-karaivanov-p1jldJ9tZ6c-unsplash_3_znx2wx.jpg",
      category: "brand"
    }
  ]

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("products.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("products.subtitle")}
          </p>
        </section>

        {/* Regular Bojagi Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{t("products.regular.title")}</h2>
            <p className="text-gray-600">{t("products.regular.desc")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.category === "regular").map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={t(product.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t(product.titleKey)}</h3>
                  <p className="text-gray-600 text-sm">{t(product.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Woven Bojagi Section */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{t("products.brand.title")}</h2>
            <p className="text-gray-600">{t("products.brand.desc")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.filter(p => p.category === "brand").map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={t(product.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{t(product.titleKey)}</h3>
                  <p className="text-gray-600 text-sm">{t(product.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            브랜드에 맞는 보자기를 찾고 계신가요?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            소복 전문가가 브랜드에 최적화된 보자기를 제안해 드립니다.
          </p>
          <Link
            to="/inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            {t("products.cta")}
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </main>
  )
}

