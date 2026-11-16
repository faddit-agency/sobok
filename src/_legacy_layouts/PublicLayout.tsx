import { Outlet, useLocation } from "react-router-dom"

export function PublicLayout() {
  const { pathname } = useLocation()
  const isStudio = pathname === "/"

  return (
    <div className={isStudio ? "bg-white text-black" : "min-h-screen bg-white text-black"}>
      <Outlet />
    </div>
  )
}
