import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieConsentDrawer } from '@/components/cookie-consent-drawer'
import { JoyChat } from '@/components/joy-chat'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Jason | Digital Architect',
  description: 'Creating harmony between complex code and pristine interfaces.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#FF6B35',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <CookieConsentDrawer />
        <JoyChat />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script src="https://js.puter.com/v2/" async></script>
      </body>
    </html>
  )
}
