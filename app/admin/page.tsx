"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Message {
  id: number
  name: string
  email: string
  services: string[]
  message: string
  created_at: string
  is_read: boolean
}

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const router = useRouter()

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages")
      
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }

      const data = await res.json()
      setMessages(data.messages || [])
    } catch {
      setError("Failed to fetch messages")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, is_read: true }),
      })
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
      )
    } catch {
      console.error("Failed to mark as read")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" })
      setMessages((prev) => prev.filter((m) => m.id !== id))
      if (selectedMessage?.id === id) setSelectedMessage(null)
    } catch {
      console.error("Failed to delete message")
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter((m) => !m.is_read).length

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white tracking-tight">Admin Dashboard</h1>
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-neutral-500 hover:text-white text-sm transition-colors"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="text-neutral-500 hover:text-red-400 text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                Messages ({messages.length})
              </h2>
            </div>
            <div className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-6 text-center text-neutral-500 text-sm">
                  No messages yet
                </div>
              ) : (
                messages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg)
                      if (!msg.is_read) handleMarkAsRead(msg.id)
                    }}
                    className={`w-full text-left p-4 hover:bg-white/5 transition-colors ${
                      selectedMessage?.id === msg.id ? "bg-white/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!msg.is_read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                      )}
                      <div className={`flex-1 ${msg.is_read ? "ml-5" : ""}`}>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-white font-medium text-sm truncate">
                            {msg.name}
                          </span>
                          <span className="text-neutral-600 text-[10px] shrink-0">
                            {formatDate(msg.created_at).split(",")[0]}
                          </span>
                        </div>
                        <p className="text-neutral-500 text-xs truncate">{msg.email}</p>
                        <p className="text-neutral-600 text-xs truncate mt-1">
                          {msg.message.slice(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-neutral-900/50 border border-white/5 rounded-2xl">
            {selectedMessage ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {selectedMessage.name}
                    </h3>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="text-neutral-500 hover:text-red-400 text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>

                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">
                    Received
                  </span>
                  <p className="text-neutral-300 text-sm">
                    {formatDate(selectedMessage.created_at)}
                  </p>
                </div>

                {selectedMessage.services && selectedMessage.services.length > 0 && (
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">
                      Services Requested
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedMessage.services.map((service) => (
                        <span
                          key={service}
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">
                    Message
                  </span>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                    <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out...`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-widest px-6 py-3 rounded-xl transition-colors"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-neutral-700 text-6xl mb-4">📬</div>
                  <p className="text-neutral-500 text-sm">
                    Select a message to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
