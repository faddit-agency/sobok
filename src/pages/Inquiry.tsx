import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useLanguage } from "../contexts/LanguageContext"
import { Textarea } from "../components/ui/textarea"
import { X } from "lucide-react"

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 구글 시트 연동 및 이메일 발송 로직 구현
    // 미리보기 URL 정리
    imagePreviews.forEach(url => {
      if (url) {
        URL.revokeObjectURL(url)
      }
    })
    setIsSubmitted(true)
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

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto px-4">
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
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, bojagiType: e.target.value, designFiles: [] }))
                      // 다른 보자기 타입 선택 시 이미지 초기화
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
                        
                        {/* 이미지 미리보기 */}
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
                                          // 이미지 로드 실패 시 에러 상태에 추가
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

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  className="w-4 h-4"
                  required
                />
                <span className="text-gray-900">
                  (필수) 개인정보 수집 및 이용안내
                </span>
              </label>
              <Link
                to="/privacy"
                target="_blank"
                className="text-gray-600 underline hover:text-gray-900"
              >
                보기
              </Link>
            </div>
            <div className="text-center">
              <Button type="submit" size="lg" className="px-12" disabled={!formData.privacyConsent}>
                {t("inquiry.submit")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

