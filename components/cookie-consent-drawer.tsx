'use client'

import { useState, useEffect } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted'

export function CookieConsentDrawer() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user has accepted cookies
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!hasConsent) {
      setOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    setOpen(false)
  }

  const handleReject = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    setOpen(false)
  }

  // Prevent hydration mismatch
  if (!mounted) return null

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 rounded-t-2xl">
        <div className="w-full max-w-md mx-auto px-4 py-6">
          {/* Header */}
          <div className="space-y-3 mb-6">
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto"></div>
            <DrawerHeader className="text-center px-0">
              <DrawerTitle className="text-xl font-semibold text-white">
                Cookie Policy
              </DrawerTitle>
              <DrawerDescription className="text-slate-400 text-sm mt-2">
                We use cookies to enhance your experience and analyze our traffic. Your privacy is important to us.
              </DrawerDescription>
            </DrawerHeader>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-8">
            <div className="bg-slate-800/50 rounded-lg p-3 space-y-2">
              <p className="text-xs font-medium text-slate-300">
                ✓ Essential cookies (required for functionality)
              </p>
              <p className="text-xs font-medium text-slate-300">
                ✓ Analytics cookies (help us improve)
              </p>
              <p className="text-xs font-medium text-slate-300">
                ✓ Performance cookies (optimize experience)
              </p>
            </div>
            
            <p className="text-xs text-slate-400">
              By clicking "Accept", you consent to the use of cookies. You can change your preferences anytime.
            </p>
          </div>

          {/* Buttons - iOS Style */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAccept}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Accept Cookies
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 font-semibold py-3 rounded-lg transition-colors"
            >
              Reject Cookies
            </Button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-slate-500 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-400">
              Learn more about our privacy policy
            </a>
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
