import "@/styles/globals.css"

import React, { Suspense } from "react"
import { type Metadata } from "next"
import { Toaster } from "@ui/toaster"

import { siteConfig } from "@/config/site"
import { fontSans, fontSerif } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { NavigationEvents } from "@/hooks/use-router-history"
import EmailVerifyBanner from "@/components/auth/email-verify-banner"
import AuthModal from "@/components/auth/modal/auth-modal"
import { Footer } from "@/components/footer"
import Navbar from "@/components/navbar/navbar"
import SessionProvider from "@/components/session-provider"
import FingerPrintLayout from "@/components/shells/fingerprint-layout"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  // authModal: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            fontSerif.variable,
            "min-h-screen bg-background font-serif antialiased  "
          )}
        >
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
          <ThemeProvider attribute="class" defaultTheme="light">
            <SessionProvider>
              <div className="relative min-h-screen flex flex-col justify-between">
                <>
                  <Navbar />
                  <div className="flex flex-col items-stretch flex-1">
                    <Suspense fallback={null}>
                      <EmailVerifyBanner />
                    </Suspense>
                    <FingerPrintLayout>{children}</FingerPrintLayout>
                    <Suspense fallback={null}>
                      <AuthModal />
                    </Suspense>
                  </div>
                  <Footer />
                </>
              </div>
            </SessionProvider>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
