'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, Maximize2, MessageCircle, Bot, Send, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type ChatMode = 'faq' | 'ticket-form' | 'ticket-chat'

interface Message {
  id: string
  role: 'assistant' | 'user'
  content: string
}

interface TicketData {
  id: string
  guest_name: string
  guest_email: string
  subject: string
  status: 'open' | 'closed'
}

const FAQ_ITEMS = [
  {
    question: 'Layanan apa saja yang tersedia?',
    answer: 'Kami menyediakan berbagai layanan termasuk pembuatan website, aplikasi mobile, desain UI/UX, dan konsultasi digital. Setiap layanan dirancang untuk memenuhi kebutuhan bisnis Anda.'
  },
  {
    question: 'Berapa harga layanan?',
    answer: 'Harga layanan kami bervariasi tergantung kompleksitas proyek. Untuk website sederhana mulai dari Rp 5 juta, dan untuk aplikasi custom mulai dari Rp 15 juta. Hubungi admin untuk penawaran khusus.'
  },
  {
    question: 'Bagaimana cara order?',
    answer: 'Proses order sangat mudah: 1) Hubungi admin melalui chat ini, 2) Diskusikan kebutuhan proyek Anda, 3) Terima penawaran dan timeline, 4) Lakukan pembayaran DP, 5) Proyek dimulai!'
  },
  {
    question: 'Jam operasional?',
    answer: 'Kami beroperasi Senin - Jumat pukul 09:00 - 18:00 WIB, dan Sabtu pukul 09:00 - 15:00 WIB. Untuk pertanyaan di luar jam kerja, silakan buat tiket dan admin akan membalas saat jam kerja.'
  },
]

export function JoyChat() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<ChatMode>('faq')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [ticketData, setTicketData] = useState<TicketData | null>(null)
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', subject: '' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Poll for new messages and ticket status when in ticket chat mode
  useEffect(() => {
    if (mode !== 'ticket-chat' || !ticketData) return

    const fetchMessagesAndStatus = async () => {
      // Fetch ticket status
      const { data: ticketStatus } = await supabase
        .from('support_tickets')
        .select('status')
        .eq('id', ticketData.id)
        .single()

      if (ticketStatus && ticketStatus.status !== ticketData.status) {
        setTicketData({ ...ticketData, status: ticketStatus.status })
      }

      // Fetch messages
      const { data } = await supabase
        .from('ticket_messages')
        .select('*')
        .eq('ticket_id', ticketData.id)
        .order('created_at', { ascending: true })

      if (data) {
        setMessages(data.map((m) => ({
          id: m.id,
          role: m.sender_type === 'guest' ? 'user' : 'assistant',
          content: m.message
        })))
      }
    }

    fetchMessagesAndStatus()
    const interval = setInterval(fetchMessagesAndStatus, 3000)
    return () => clearInterval(interval)
  }, [mode, ticketData, supabase])

  const handleFAQClick = (faq: typeof FAQ_ITEMS[0]) => {
    setMessages([
      { id: 'q-' + Date.now(), role: 'user', content: faq.question },
      { id: 'a-' + Date.now(), role: 'assistant', content: faq.answer }
    ])
  }

  const handleContactAdmin = () => {
    setMode('ticket-form')
    setMessages([])
  }

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketForm.name || !ticketForm.email || !ticketForm.subject) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          guest_name: ticketForm.name,
          guest_email: ticketForm.email,
          subject: ticketForm.subject
        })
        .select()
        .single()

      if (error) throw error

      setTicketData({ ...data, status: 'open' })
      setMode('ticket-chat')
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: `Halo ${ticketForm.name}! Tiket Anda telah dibuat dengan subjek "${ticketForm.subject}". Admin akan segera membalas pesan Anda.`
      }])
    } catch (error) {
      console.error('Error creating ticket:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !ticketData || loading) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('ticket_messages')
        .insert({
          ticket_id: ticketData.id,
          sender_type: 'guest',
          message: input.trim()
        })

      if (error) throw error
      setInput('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToFAQ = () => {
    setMode('faq')
    setMessages([])
    setTicketData(null)
    setTicketForm({ name: '', email: '', subject: '' })
  }

  if (!mounted) return null

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-background ${
          open ? 'hidden' : ''
        }`}
        aria-label="Chat with Joy"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            style={{
              animation: 'fadeIn 0.3s ease-out',
            }}
          />

          {/* Chat Window */}
          <div
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
            style={{
              animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Header */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={mode === 'faq' ? () => setOpen(false) : handleBackToFAQ}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                  aria-label={mode === 'faq' ? 'Close chat' : 'Back to FAQ'}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Joy Assistant</h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-xs text-gray-500">
                      {mode === 'ticket-chat' ? `Tiket: ${ticketData?.subject}` : 'Online - Ready to help'}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-gray-50/50 to-white">
              {/* Date Separator */}
              <div className="flex justify-center mb-6">
                <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                  Today
                </span>
              </div>

              {mode === 'faq' && (
                <div className="space-y-4">
                  {/* Welcome Message */}
                  <div className="flex justify-start">
                    <div className="max-w-[280px]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-background" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Joy</span>
                      </div>
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Halo! Ada yang bisa saya bantu? Pilih salah satu pertanyaan di bawah atau hubungi admin untuk bantuan lebih lanjut.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Buttons */}
                  <div className="flex flex-col gap-2 mt-4">
                    {FAQ_ITEMS.map((faq, index) => (
                      <button
                        key={index}
                        onClick={() => handleFAQClick(faq)}
                        className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                      >
                        {faq.question}
                      </button>
                    ))}
                    <button
                      onClick={handleContactAdmin}
                      className="w-full text-left px-4 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:opacity-90 transition-all"
                    >
                      Hubungi Admin (Buat Tiket)
                    </button>
                  </div>

                  {/* Display FAQ Answer if selected */}
                  {messages.length > 0 && (
                    <div className="space-y-4 mt-6 pt-4 border-t border-gray-100">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.role === 'assistant' ? (
                            <div className="max-w-[280px]">
                              <div className="flex items-center gap-2 mb-1.5">
                                <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
                                  <Bot className="w-3 h-3 text-background" />
                                </div>
                                <span className="text-xs font-medium text-gray-700">Joy</span>
                              </div>
                              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="max-w-[280px]">
                              <div className="bg-foreground text-background px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
                                <p className="text-sm leading-relaxed">{message.content}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {mode === 'ticket-form' && (
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="max-w-[300px]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-background" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Joy</span>
                      </div>
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Silakan isi data berikut untuk membuat tiket bantuan. Admin akan segera membalas pesan Anda.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleCreateTicket} className="space-y-3 mt-4">
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      value={ticketForm.name}
                      onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Anda"
                      value={ticketForm.email}
                      onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Subjek / Topik pertanyaan"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-4 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                      {loading ? 'Membuat tiket...' : 'Buat Tiket & Mulai Chat'}
                    </button>
                  </form>
                </div>
              )}

              {mode === 'ticket-chat' && (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="max-w-[280px]">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-background" />
                            </div>
                            <span className="text-xs font-medium text-gray-700">Admin</span>
                          </div>
                          <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-[280px]">
                          <div className="bg-foreground text-background px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area - Only show in ticket chat mode */}
            {mode === 'ticket-chat' && ticketData?.status === 'open' && (
              <div className="bg-white border-t border-gray-100 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center bg-gray-50 rounded-xl border border-gray-200 px-4 py-2.5 focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ketik pesan..."
                      className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Closed Ticket Notice */}
            {mode === 'ticket-chat' && ticketData?.status === 'closed' && (
              <div className="bg-gray-50 border-t border-gray-100 p-4">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Tiket ini sudah ditutup oleh admin</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
