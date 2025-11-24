const API_BASE_URL = (import.meta.env?.VITE_API_URL as string) || '/api'

export interface NoticeViewsResponse {
  noticeId: number
  views: number
}

export interface AllViewsResponse {
  [noticeId: number]: number
}

// 공지사항 조회수 조회
export async function getNoticeViews(noticeId: number): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/notice-views/${noticeId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch views')
    }
    const data: NoticeViewsResponse = await response.json()
    return data.views
  } catch (error) {
    console.error('Error fetching notice views:', error)
    return 0
  }
}

// 공지사항 조회수 증가
export async function incrementNoticeViews(noticeId: number): Promise<number> {
  try {
    const response = await fetch(`${API_BASE_URL}/notice-views/${noticeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Failed to increment views')
    }
    const data: NoticeViewsResponse = await response.json()
    return data.views
  } catch (error) {
    console.error('Error incrementing notice views:', error)
    return 0
  }
}

// 모든 공지사항 조회수 조회
export async function getAllNoticeViews(): Promise<Record<number, number>> {
  try {
    const response = await fetch(`${API_BASE_URL}/notice-views`)
    if (!response.ok) {
      throw new Error('Failed to fetch all views')
    }
    const data: AllViewsResponse = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching all notice views:', error)
    return {}
  }
}

