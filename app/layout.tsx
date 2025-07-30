import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cơm Tấm LU - Hệ thống gọi món QR Code",
  description:
    "Hệ thống gọi món hiện đại cho nhà hàng Cơm Tấm LU với giao diện sang trọng và trải nghiệm người dùng tối ưu",
  keywords: "cơm tấm, nhà hàng, gọi món, QR code, Lu food",
  authors: [{ name: "Cơm Tấm LU" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}
