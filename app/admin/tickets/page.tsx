"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Send, X, MessageSquare, Clock, CheckCircle } from "lucide-react"

interface Ticket {
  id: string
  guest_name: string
  guest_email: string
  subject: string
  status: "open" | "closed"
  created_at: string
  closed_at: string | null
}

interface Message {
  id: string
  ticket_id: string
  sender_type: "guest" | "admin"
  message: string
  created_at: string
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const fetchTickets = async () => {
    try {
      const res = await fetch("/api/tickets")
      if (res.status === 401) {
        router.push("/admin/login")
        return
      }
      const data = await res.json()
      setTickets(data || [])
    } catch (error) {
      console.error("Failed to fetch tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (ticketId: string) => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    }
  }

  useEffect(() => {
    fetchTickets()
    const interval = setInterval(fetchTickets, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedTicket) {
      fetchMessages(selectedTicket.id)
      const interval = setInterval(() => fetchMessages(selectedTicket.id), 3000)
      return () => clearInterval(interval)
    }
  }, [selectedTicket])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedTicket || sendingMessage) return

    setSendingMessage(true)
    try {
      await fetch(`/api/tickets/${selectedTicket.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage, sender_type: "admin" }),
      })
      setNewMessage("")
      fetchMessages(selectedTicket.id)
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setSendingMessage(false)
    }
  }

  const handleCloseTicket = async () => {
    if (!selectedTicket) return
    if (!confirm("Apakah Anda yakin ingin menutup tiket ini?")) return

    try {
      await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" }),
      })
      setSelectedTicket({ ...selectedTicket, status: "closed" })
      fetchTickets()
    } catch (error) {
      console.error("Failed to close ticket:", error)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredTickets = tickets.filter((t) => {
    if (filter === "all") return true
    return t.status === filter
  })

  const openCount = tickets.filter((t) => t.status === "open").length

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Support Tickets
            </h1>
            {openCount > 0 && (
              <span className="bg-foreground text-background text-xs font-bold px-2 py-1 rounded-full">
                {openCount} open
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              View Site
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Tickets List */}
          <div className="lg:col-span-1 bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    filter === "all"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Semua ({tickets.length})
                </button>
                <button
                  onClick={() => setFilter("open")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    filter === "open"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Open ({openCount})
                </button>
                <button
                  onClick={() => setFilter("closed")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    filter === "closed"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Closed ({tickets.length - openCount})
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {filteredTickets.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  Tidak ada tiket
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`w-full text-left p-4 hover:bg-accent/50 transition-colors ${
                      selectedTicket?.id === ticket.id ? "bg-accent/50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-foreground font-medium text-sm truncate">
                        {ticket.guest_name}
                      </span>
                      <span
                        className={`shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                          ticket.status === "open"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs truncate mb-1">
                      {ticket.guest_email}
                    </p>
                    <p className="text-foreground/80 text-xs font-medium truncate">
                      {ticket.subject}
                    </p>
                    <p className="text-muted-foreground text-[10px] mt-2">
                      {formatDate(ticket.created_at)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
            {selectedTicket ? (
              <>
                {/* Ticket Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-sm">
                      {selectedTicket.guest_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {selectedTicket.guest_name}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        {selectedTicket.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedTicket.status === "open" && (
                      <button
                        onClick={handleCloseTicket}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-medium rounded-lg transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Tutup Tiket
                      </button>
                    )}
                    {selectedTicket.status === "closed" && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Tiket Ditutup
                      </span>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender_type === "admin" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                          msg.sender_type === "admin"
                            ? "bg-foreground text-background rounded-tr-sm"
                            : "bg-accent text-foreground rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                        <p
                          className={`text-[10px] mt-1 ${
                            msg.sender_type === "admin"
                              ? "text-background/60"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatDate(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                {selectedTicket.status === "open" ? (
                  <div className="p-4 border-t border-border">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                      <div className="flex-1 flex items-center bg-accent rounded-xl px-4 py-2.5">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Ketik balasan..."
                          className="flex-1 bg-transparent text-foreground placeholder-muted-foreground text-sm focus:outline-none"
                          disabled={sendingMessage}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sendingMessage || !newMessage.trim()}
                        className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="p-4 border-t border-border text-center text-muted-foreground text-sm">
                    Tiket ini sudah ditutup
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Pilih tiket untuk melihat percakapan
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
