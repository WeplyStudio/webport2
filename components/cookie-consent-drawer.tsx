'use client'

import { useState, useEffect } from 'react'
import { Shield, CheckCircle2, BarChart3 } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted'

export function CookieConsentDrawer() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [cookies, setCookies] = useState({
    essential: true,
    analytics: false,
    personalization: false,
  })

  useEffect(() => {
    setMounted(true)
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!hasConsent) {
      setOpen(true)
    }
  }, [])

  const handleToggle = (key: keyof typeof cookies) => {
    if (key === 'essential') return
    setCookies(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleAccept = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
      setOpen(false)
      setIsClosing(false)
    }, 300)
  }

  const handleReject = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
      setOpen(false)
      setIsClosing(false)
    }, 300)
  }

  if (!mounted || !open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleReject}
        style={{
          animation: isClosing ? 'fadeOut 0.3s ease-in forwards' : 'fadeIn 0.3s ease-out',
        }}
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 py-6"
        style={{
          animation: isClosing ? 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="w-full max-w-md">
          {/* Glass Morphism Container */}
          <div className="bg-background/80 backdrop-blur-xl border border-border/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted rounded-full" />
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              {/* Header with Icon */}
              <div className="flex items-center gap-4 mb-7">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Privasi Anda</h2>
                  <p className="text-xs text-muted-foreground">Pilih bagaimana kami mengelola data Anda.</p>
                </div>
              </div>

              {/* Cookie Options */}
              <div className="space-y-0.5 mb-8">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <p className="text-sm font-semibold text-foreground">Cookie Esensial</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 ml-6">Diperlukan agar situs tetap berjalan.</p>
                  </div>
                  <div className="ml-3">
                    <IOSSwitch checked={true} disabled />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm font-semibold text-foreground">Analitik & Performa</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 ml-6">Membantu kami memahami pengunjung.</p>
                  </div>
                  <div className="ml-3">
                    <IOSSwitch 
                      checked={cookies.analytics} 
                      onChange={() => handleToggle('analytics')}
                    />
                  </div>
                </div>

                {/* Personalization */}
                <div className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <p className="text-sm font-semibold text-foreground">Personalisasi Iklan</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 ml-6">Menampilkan konten yang relevan.</p>
                  </div>
                  <div className="ml-3">
                    <IOSSwitch 
                      checked={cookies.personalization} 
                      onChange={() => handleToggle('personalization')}
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAccept}
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20"
                >
                  Izinkan Semua
                </button>
                <button
                  onClick={handleReject}
                  className="w-full py-3.5 bg-muted/60 hover:bg-muted text-foreground font-semibold rounded-2xl transition-all duration-200 active:scale-95"
                >
                  Simpan Preferensi
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-xs text-muted-foreground mt-5">
                <a href="#" className="text-primary hover:opacity-80 transition-opacity">
                  Kebijakan privasi lengkap
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

// iOS-style Toggle Switch Component
function IOSSwitch({ 
  checked, 
  onChange, 
  disabled = false 
}: { 
  checked: boolean
  onChange?: () => void
  disabled?: boolean
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
        checked ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
      } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}`}
      style={{
        backgroundColor: checked ? '#34C759' : undefined,
      }}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}
