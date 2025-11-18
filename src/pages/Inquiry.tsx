import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useLanguage } from "../contexts/LanguageContext"
import { Textarea } from "../components/ui/textarea"

export function Inquiry() {
  const { t } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    bojagiType: "",
    material: "",
    quantity: "",
    deadline: "",
    budget: "",
    contactName: "",
    email: "",
    phone: "",
    details: "",
    designFile: null as File | null
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 구글 시트 연동 및 이메일 발송 로직 구현
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">{t("inquiry.success.title")}</h1>
            <p className="text-lg text-gray-600">{t("inquiry.success.desc")}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("inquiry.title")}</h1>
          <p className="text-lg text-gray-600">{t("inquiry.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* 회사 정보 */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">{t("inquiry.company.title")}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("inquiry.company.name")} <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder={t("inquiry.company.name.placeholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("inquiry.company.website")} <span className="text-gray-400 text-xs">({t("inquiry.company.website.optional")})</span>
                </label>
                <Input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder={t("inquiry.company.website.placeholder")}
                />
              </div>
            </div>
          </section>

          {/* 보자기 종류 */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">{t("inquiry.bojagi.title")}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-4">{t("inquiry.bojagi.regular")}</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="bojagiType"
                      value="slab"
                      checked={formData.bojagiType === "slab"}
                      onChange={(e) => setFormData({ ...formData, bojagiType: e.target.value, material: "slab" })}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">{t("inquiry.bojagi.regular.slab")}</div>
                      <div className="text-sm text-gray-500">{t("inquiry.bojagi.regular.slab.desc")}</div>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="bojagiType"
                      value="organza"
                      checked={formData.bojagiType === "organza"}
                      onChange={(e) => setFormData({ ...formData, bojagiType: e.target.value, material: "organza" })}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">{t("inquiry.bojagi.regular.organza")}</div>
                      <div className="text-sm text-gray-500">{t("inquiry.bojagi.regular.organza.desc")}</div>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="bojagiType"
                      value="crystal"
                      checked={formData.bojagiType === "crystal"}
                      onChange={(e) => setFormData({ ...formData, bojagiType: e.target.value, material: "crystal" })}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">{t("inquiry.bojagi.regular.crystal")}</div>
                      <div className="text-sm text-gray-500">{t("inquiry.bojagi.regular.crystal.desc")}</div>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="bojagiType"
                    value="brand"
                    checked={formData.bojagiType === "brand"}
                    onChange={(e) => setFormData({ ...formData, bojagiType: e.target.value })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium mb-2">{t("inquiry.bojagi.brand")}</div>
                    <div className="text-sm text-gray-600 mb-2">{t("inquiry.bojagi.brand.desc")}</div>
                    <div className="text-sm text-gray-500">{t("inquiry.bojagi.brand.file")}</div>
                    {formData.bojagiType === "brand" && (
                      <input
                        type="file"
                        accept="image/*,.pdf,.ai,.psd"
                        onChange={(e) => setFormData({ ...formData, designFile: e.target.files?.[0] || null })}
                        className="mt-2 text-sm"
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>
          </section>

          {/* 포장 소모품 */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">{t("inquiry.supplies.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t("inquiry.supplies.quantity")}</label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder={t("inquiry.supplies.quantity.placeholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t("inquiry.supplies.deadline")}</label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  placeholder={t("inquiry.supplies.deadline.placeholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t("inquiry.supplies.budget")}</label>
                <Input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder={t("inquiry.supplies.budget.placeholder")}
                />
              </div>
            </div>
          </section>

          {/* 담당자 정보 */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">{t("inquiry.contact.title")}</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("inquiry.contact.name")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("inquiry.contact.email")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("inquiry.contact.phone")} <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t("inquiry.contact.details")}</label>
                <Textarea
                  rows={6}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder={t("inquiry.contact.details.placeholder")}
                />
              </div>
            </div>
          </section>

          <div className="text-center">
            <Button type="submit" size="lg" className="px-12">
              {t("inquiry.submit")}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}

