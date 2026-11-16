export type AuthProviderId = "kakao" | "naver" | "google"

export type AuthUser = {
  id: string
  name: string
  email: string
  provider: AuthProviderId
  avatar?: string
}

const STORAGE_KEY = "sobok.auth.v1"

export function readUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function writeUser(user: AuthUser | null) {
  if (typeof window === "undefined") return
  if (!user) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function createDemoUser(provider: AuthProviderId): AuthUser {
  const labels: Record<AuthProviderId, string> = {
    kakao: "카카오",
    naver: "네이버",
    google: "구글",
  }
  return {
    id: `${provider}-${Date.now()}`,
    name: `${labels[provider]} 사용자`,
    email: `demo@${provider}.sobok.kr`,
    provider,
  }
}
