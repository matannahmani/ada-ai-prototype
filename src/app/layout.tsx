import "@/styles/globals.css"

import { type Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans, fontSerif } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import AuthModal from "@/components/auth/modal/auth-modal"
import { Footer } from "@/components/footer"
import Navbar from "@/components/navbar/navbar"
import SessionProvider from "@/components/session-provider"
import FingerPrintLayout from "@/components/shells/fingerprint-layout"
import Sidebar from "@/components/sidebar"
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
  authModal: React.ReactNode
}

export default function RootLayout({ children, authModal }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            fontSerif.variable,
            "min-h-screen bg-background font-serif antialiased "
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light">
            <SessionProvider>
              <div className="relative min-h-screen">
                <>
                  <Navbar />
                  <FingerPrintLayout>{children}</FingerPrintLayout>
                  <AuthModal>{authModal}</AuthModal>
                  <Footer />
                </>
              </div>
            </SessionProvider>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
