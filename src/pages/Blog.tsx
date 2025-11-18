import { Button } from "../components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "../contexts/LanguageContext"

export function Blog() {
  const { t } = useLanguage()
  const posts = [
    {
      id: 1,
      title: t("blog.post1.title"),
      excerpt: t("blog.post1.excerpt"),
      category: t("blog.category.guide"),
      date: "2024.01.15",
      readTime: `5 ${t("blog.readtime")}`,
      image: "bg-gradient-to-br from-purple-100 to-pink-100"
    },
    {
      id: 2,
      title: t("blog.post2.title"),
      excerpt: t("blog.post2.excerpt"),
      category: t("blog.category.trend"),
      date: "2024.01.10",
      readTime: `7 ${t("blog.readtime")}`,
      image: "bg-gradient-to-br from-blue-100 to-cyan-100"
    },
    {
      id: 3,
      title: t("blog.post3.title"),
      excerpt: t("blog.post3.excerpt"),
      category: t("blog.category.manufacturing"),
      date: "2024.01.05",
      readTime: `10 ${t("blog.readtime")}`,
      image: "bg-gradient-to-br from-green-100 to-emerald-100"
    },
    {
      id: 4,
      title: t("blog.post4.title"),
      excerpt: t("blog.post4.excerpt"),
      category: t("blog.category.casestudy"),
      date: "2023.12.28",
      readTime: `8 ${t("blog.readtime")}`,
      image: "bg-gradient-to-br from-yellow-100 to-orange-100"
    },
    {
      id: 5,
      title: t("blog.post5.title"),
      excerpt: t("blog.post5.excerpt"),
      category: t("blog.category.sustainability"),
      date: "2023.12.20",
      readTime: `6 ${t("blog.readtime")}`,
      image: "bg-gradient-to-br from-teal-100 to-green-100"
    },
    {
      id: 6,
      title: t("blog.post6.title"),
      excerpt: t("blog.post6.excerpt"),
      category: t("blog.category.marketing"),
      date: "2023.12.15",
      readTime: `9 ${t("blog.readtime")}`,
      image: "bg-gradient-to-br from-indigo-100 to-purple-100"
    }
  ]

  const categories = [
    t("blog.all"), 
    t("blog.category.guide"), 
    t("blog.category.trend"), 
    t("blog.category.manufacturing"), 
    t("blog.category.casestudy"), 
    t("blog.category.sustainability"), 
    t("blog.category.marketing")
  ]
  const [selectedCategory, setSelectedCategory] = useState(t("blog.all"))

  const filteredPosts = selectedCategory === t("blog.all") 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t("blog.title")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className={`aspect-video ${post.image} flex items-center justify-center`}>
                <span className="text-lg font-bold text-gray-600">{post.title}</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-900 transition-colors">
                  {t("blog.readMore")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("blog.newsletter.title")}</h2>
          <p className="text-lg text-gray-600 mb-8">
            {t("blog.newsletter.desc")}
          </p>
          <Button size="lg">{t("blog.newsletter.button")}</Button>
        </section>
      </div>
    </main>
  )
}
