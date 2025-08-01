import { Suspense } from "react"
import { MobileOptimizedInterface } from "@/components/mobile-optimized-interface"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function HomePage({
  searchParams,
}: {
  searchParams: { table?: string; admin?: string }
}) {
  const isAdmin = searchParams.admin === "true"
  const tableNumber = searchParams.table

  return (
    <div className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-orange-600 font-semibold">Đang tải thực đơn...</p>
            </div>
          </div>
        }
      >
        {isAdmin ? <AdminDashboard /> : <MobileOptimizedInterface tableNumber={tableNumber} />}
      </Suspense>
    </div>
  )
}
