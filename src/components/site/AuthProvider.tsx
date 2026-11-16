"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  createDemoUser,
  readUser,
  writeUser,
  type AuthProviderId,
  type AuthUser,
} from "@/lib/auth"

type AuthContextValue = {
  user: AuthUser | null
  ready: boolean
  login: (provider: AuthProviderId) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUser(readUser())
    setReady(true)
  }, [])

  const login = useCallback((provider: AuthProviderId) => {
    const next = createDemoUser(provider)
    writeUser(next)
    setUser(next)
  }, [])

  const logout = useCallback(() => {
    writeUser(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, ready, login, logout }),
    [user, ready, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
