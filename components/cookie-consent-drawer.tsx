'use client'

import { useState, useEffect } from 'react'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
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
      <DrawerContent className="bg-background border-t border-border rounded-t-2xl">
        <div className="w-full max-w-md mx-auto px-4 py-6">
          {/* Header */}
          <div className="space-y-3 mb-6">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto"></div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">
                Cookie Policy
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                We use cookies to enhance your experience and analyze our traffic. Your privacy is important to us.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-8">
            <div className="bg-muted rounded-lg p-3 space-y-2">
              <p className="text-xs font-medium text-foreground">
                ✓ Essential cookies (required for functionality)
              </p>
              <p className="text-xs font-medium text-foreground">
                ✓ Analytics cookies (help us improve)
              </p>
              <p className="text-xs font-medium text-foreground">
                ✓ Performance cookies (optimize experience)
              </p>
            </div>
            
            <p className="text-xs text-muted-foreground">
              By clicking "Accept", you consent to the use of cookies. You can change your preferences anytime.
            </p>
          </div>

          {/* Buttons - iOS Style */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleAccept}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-colors"
            >
              Accept Cookies
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="w-full bg-muted hover:bg-muted/80 text-foreground border-border font-semibold py-3 rounded-lg transition-colors"
            >
              Reject Cookies
            </Button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            <a href="#" className="text-primary hover:opacity-80">
              Learn more about our privacy policy
            </a>
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
