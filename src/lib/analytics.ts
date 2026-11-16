type AnalyticsPayload = Record<string, string | number | boolean | undefined>

/** 개인정보 없이 행동만 추적 */
export function track(name: string, data?: AnalyticsPayload) {
  if (typeof window === "undefined") return
  try {
    const va = (window as unknown as { va?: (event: string, properties?: unknown) => void }).va
    va?.("event", { name, data })
  } catch {
    // no-op
  }
}

export const analyticsEvents = {
  productView: (productId: string) => track("product_view", { productId }),
  workView: (slug: string) => track("work_view", { slug }),
  consultClick: (from: string) => track("consult_click", { from }),
  consultStart: (product?: string) => track("consult_start", { product }),
  consultSuccess: (product?: string) => track("consult_success", { product }),
}
