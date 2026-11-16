const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export interface NoticeViewsResponse {
  noticeId: number
  views: number
}

export async function getNoticeViews(noticeId: number): Promise<NoticeViewsResponse> {
  const res = await fetch(`${API_BASE_URL}/notice-views/${noticeId}`)
  if (!res.ok) throw new Error("Failed to fetch notice views")
  return res.json()
}
