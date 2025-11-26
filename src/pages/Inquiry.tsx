import { useState, useEffect, ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useLanguage } from "../contexts/LanguageContext"
import { Textarea } from "../components/ui/textarea"
import { X, ChevronDown } from "lucide-react"
import { useMetaTags } from "../hooks/useMetaTags"

interface SectionCardProps {
  number: string
  title: string
  description?: string
  note?: ReactNode
  children: ReactNode
}

const SectionCard = ({ number, title, description, note, children }: SectionCardProps) => (
  <section className="px-6 py-10 md:px-10 space-y-8">
    <div className="flex flex-col gap-3 border-b border-gray-100 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="flex items-baseline gap-4">
        <span className="text-2xl font-semibold text-gray-300">{number}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
      {note && <div className="text-xs text-gray-400">{note}</div>}
    </div>
    {children}
  </section>
)

export function Inquiry() {
  const { t, language } = useLanguage()
  
  useMetaTags({
    title: "문의하기 | SOBOK",
    description: "맞춤형 보자기 제작 문의를 남겨주세요. 디자인 파일 기반 목업 제작부터 제작·납품까지 원스톱으로 진행합니다.",
    image: "/og-inquiry.jpg",
    url: "/inquiry",
    type: "website"
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    country: "KR",
    industry: "",
    customIndustry: "",
    existingProducts: "",
    bojagiType: "",
    material: "",
    sizeWidth: "",
    sizeHeight: "",
    quantity: "",
    deadline: "",
    budget: "",
    contactName: "",
    email: "",
    phone: "",
    details: "",
    designFiles: [] as File[],
    privacyConsent: false
  })
  
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([])
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set())
  
  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      })
    }
  }, [imagePreviews])

  const isImageFile = (file: File): boolean => {
    // MIME 타입 체크
    if (file.type.startsWith('image/')) {
      return true
    }
    // 확장자 기반 체크 (MIME 타입이 없는 경우 대비)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
    const fileName = file.name.toLowerCase()
    return imageExtensions.some(ext => fileName.endsWith(ext))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      // 이미지 파일만 미리보기 URL 생성
      const newPreviews = files.map(file => {
        if (isImageFile(file)) {
          return URL.createObjectURL(file)
        }
        return null // 이미지가 아닌 파일은 null
      })
      
      // 상태 업데이트 (함수형 업데이트 사용)
      setFormData(prev => ({
        ...prev,
        designFiles: [...prev.designFiles, ...files]
      }))
      
      setImagePreviews(prev => [...prev, ...newPreviews])
    }
    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    e.target.value = ""
  }
  
  const handleRemoveImage = (index: number) => {
    // 미리보기 URL 제거 및 메모리 해제
    setImagePreviews(prev => {
      const previewToRemove = prev[index]
      if (previewToRemove) {
        URL.revokeObjectURL(previewToRemove)
      }
      return prev.filter((_, i) => i !== index)
    })
    
    // 에러 상태에서도 제거
    setImageLoadErrors(prev => {
      const newSet = new Set(prev)
      newSet.delete(index)
      // 인덱스가 변경되므로 이후 항목들의 인덱스 조정
      const adjustedSet = new Set<number>()
      newSet.forEach(errIndex => {
        if (errIndex > index) {
          adjustedSet.add(errIndex - 1)
        } else {
          adjustedSet.add(errIndex)
        }
      })
      return adjustedSet
    })
    
    // 파일 제거
    setFormData(prev => ({
      ...prev,
      designFiles: prev.designFiles.filter((_, i) => i !== index)
    }))
  }
  
  const getFileExtension = (fileName: string): string => {
    const lastDot = fileName.lastIndexOf('.')
    return lastDot > 0 ? fileName.substring(lastDot + 1).toUpperCase() : 'FILE'
  }
  
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // data:image/png;base64, 부분 제거하고 base64만 추출
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // 미리보기 URL 정리
      imagePreviews.forEach(url => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      })

      // 이미지 파일을 base64로 변환
      const designFilesData = await Promise.all(
        formData.designFiles.map(async (file) => {
          const base64 = await fileToBase64(file)
          return {
            name: file.name,
            size: file.size,
            type: file.type,
            base64: base64,
          }
        })
      )

      // API 호출
      const response = await fetch('/api/inquiry/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          designFiles: designFilesData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', errorData)
        throw new Error(errorData.details || errorData.error || 'Failed to submit inquiry')
      }

      const result = await response.json()
      console.log('Success:', result)
      setIsSubmitted(true)
    } catch (error: any) {
      console.error('Error submitting inquiry:', error)
      const errorMessage = error?.message || '문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.'
      alert(errorMessage)
    }
  }

  if (isSubmitted) {
    return (
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{t("inquiry.success.title")}</h1>
            <p className="text-lg text-gray-600">{t("inquiry.success.desc")}</p>
          </div>
        </div>
      </main>
    )
  }

  const countryOptions = [
    { value: "KR", label: language === "ko" ? "대한민국" : "South Korea" },
    { value: "US", label: language === "ko" ? "미국" : "United States" },
    { value: "JP", label: language === "ko" ? "일본" : "Japan" },
    { value: "CN", label: language === "ko" ? "중국" : "China" },
    { value: "EU", label: language === "ko" ? "유럽연합" : "European Union" },
    { value: "OTHER", label: language === "ko" ? "기타" : "Other" },
  ]

  const industryOptions = [
    { value: "beauty", label: language === "ko" ? "뷰티 / 코스메틱" : "Beauty / Cosmetics" },
    { value: "fashion", label: language === "ko" ? "패션 / 라이프스타일" : "Fashion / Lifestyle" },
    { value: "food", label: language === "ko" ? "식품 / F&B" : "Food / F&B" },
    { value: "hospitality", label: language === "ko" ? "호스피탈리티 / 여행" : "Hospitality / Travel" },
    { value: "corporate", label: language === "ko" ? "기업 기념품 / B2B" : "Corporate / B2B" },
    { value: "custom", label: language === "ko" ? "직접 입력" : "Custom Input" },
  ]

  const overviewPoints = [
    t("inquiry.overview.point1"),
    t("inquiry.overview.point2"),
    t("inquiry.overview.point3"),
  ]

  return (
    <main className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="space-y-10 lg:sticky lg:top-32 self-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{t("inquiry.title")}</h1>
              <p className="text-lg text-gray-600 mt-4">{t("inquiry.subtitle")}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">{t("inquiry.overview.title")}</p>
              <ul className="space-y-3 text-sm text-gray-600 list-disc pl-5">
                {overviewPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100"
            >
            <SectionCard
              number="01"
              title={t("inquiry.profile.title")}
              description={t("inquiry.subtitle")}
              note={`* ${t("inquiry.profile.requiredNote")}`}
            >
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {t("inquiry.contact.name")} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder={t("inquiry.contact.name.placeholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("inquiry.contact.email")} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("inquiry.contact.email.placeholder")}
                    />
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
                      placeholder={t("inquiry.contact.phone.placeholder")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("inquiry.company.country")}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className={`w-full appearance-none border border-gray-200 rounded-md px-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          formData.country ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        <option value="">{t("inquiry.company.country.placeholder")}</option>
                        {countryOptions.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("inquiry.company.industry")}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className={`w-full appearance-none border border-gray-200 rounded-md px-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                          formData.industry ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        <option value="">{t("inquiry.company.industry.placeholder")}</option>
                        {industryOptions.map((industry) => (
                          <option key={industry.value} value={industry.value}>
                            {industry.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {formData.industry === "custom" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("inquiry.company.industry.custom")}
                    </label>
                    <Input
                      value={formData.customIndustry}
                      onChange={(e) => setFormData({ ...formData, customIndustry: e.target.value })}
                      placeholder={t("inquiry.company.industry.custom.placeholder")}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t("inquiry.company.products")}
                  </label>
                  <Textarea
                    rows={4}
                    value={formData.existingProducts}
                    onChange={(e) => setFormData({ ...formData, existingProducts: e.target.value })}
                    placeholder={t("inquiry.company.products.placeholder")}
                  />
                </div>

              </div>
              </SectionCard>

            <SectionCard number="02" title={t("inquiry.bojagi.title")} description={t("inquiry.bojagi.brand.file")}>
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
                      <div className="flex-1">
                        <div className="font-medium mb-2">{t("inquiry.bojagi.regular.slab")}</div>
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
                      <div className="flex-1">
                        <div className="font-medium mb-2">{t("inquiry.bojagi.regular.organza")}</div>
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
                      <div className="flex-1">
                        <div className="font-medium mb-2">{t("inquiry.bojagi.regular.crystal")}</div>
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
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, bojagiType: e.target.value, designFiles: [] }))
                        setImagePreviews(prev => {
                          prev.forEach(url => {
                            if (url) {
                              URL.revokeObjectURL(url)
                            }
                          })
                          return []
                        })
                        setImageLoadErrors(new Set())
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium mb-2">{t("inquiry.bojagi.brand")}</div>
                      <div className="text-sm text-gray-600 mb-2">{t("inquiry.bojagi.brand.desc")}</div>
                      <div className="text-sm text-gray-500 mb-3">{t("inquiry.bojagi.brand.file")}</div>
                      {formData.bojagiType === "brand" && (
                        <div className="space-y-4">
                          <label className="block">
                            <input
                              type="file"
                              accept="image/*,.pdf,.ai,.psd"
                              multiple
                              onChange={handleFileChange}
                              className="mt-2 text-sm cursor-pointer"
                            />
                          </label>

                          {formData.designFiles.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                              {formData.designFiles.map((file, index) => {
                                if (!file) return null

                                const preview = imagePreviews[index]
                                const isImage = isImageFile(file)
                                const hasPreview = preview !== null && preview !== undefined

                                return (
                                  <div key={index} className="relative group">
                                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                                      {isImage && hasPreview && !imageLoadErrors.has(index) ? (
                                        <img
                                          src={preview}
                                          alt={`미리보기 ${index + 1}`}
                                          className="w-full h-full object-cover"
                                          onError={() => {
                                            setImageLoadErrors(prev => new Set(prev).add(index))
                                          }}
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                          <div className="text-center p-2">
                                            <div className="text-xs font-medium text-gray-700 truncate px-2">
                                              {file.name}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                              {file.type || getFileExtension(file.name)}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveImage(index)}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                                      aria-label="파일 삭제"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <label className="block text-sm font-medium mb-3">
                  {t("inquiry.bojagi.size.label")}
                </label>
                <p className="text-sm text-gray-500 mb-4">{t("inquiry.bojagi.size.description")}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
                      {t("inquiry.bojagi.size.width")}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder={t("inquiry.bojagi.size.width.placeholder")}
                      value={formData.sizeWidth}
                      onChange={(e) => setFormData({ ...formData, sizeWidth: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">
                      {t("inquiry.bojagi.size.height")}
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder={t("inquiry.bojagi.size.height.placeholder")}
                      value={formData.sizeHeight}
                      onChange={(e) => setFormData({ ...formData, sizeHeight: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              number="03"
              title={t("inquiry.supplies.title")}
              description={t("inquiry.contact.details.placeholder")}
            >
              <div className="space-y-8">
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

                <div>
                  <label className="block text-sm font-medium mb-2">{t("inquiry.contact.details")}</label>
                  <Textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder={t("inquiry.contact.details.placeholder")}
                  />
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        className="w-4 h-4"
                        required
                      />
                      <span className="text-gray-900">
                        {t("inquiry.privacy.label")}
                      </span>
                    </label>
                    <Link
                      to="/privacy"
                      target="_blank"
                      className="text-gray-600 underline hover:text-gray-900"
                    >
                      {t("inquiry.privacy.view")}
                    </Link>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="px-12" disabled={!formData.privacyConsent}>
                      {t("inquiry.submit")}
                    </Button>
                  </div>
                </div>
              </div>
              </SectionCard>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

