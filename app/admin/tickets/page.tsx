"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Send, X, Search, RefreshCw, LogOut } from "lucide-react"

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
  const [searchQuery, setSearchQuery] = useState("")
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

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket || sendingMessage) return

    setSendingMessage(true)
    try {
      const res = await fetch(`/api/tickets/${selectedTicket.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage, senderType: "admin" }),
      })

      if (!res.ok) throw new Error("Failed to send message")
      setNewMessage("")
      fetchMessages(selectedTicket.id)
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSendingMessage(false)
    }
  }

  const handleCloseTicket = async () => {
    if (!selectedTicket) return

    try {
      const res = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" }),
      })

      if (!res.ok) throw new Error("Failed to close ticket")
      fetchTickets()
      setSelectedTicket(null)
    } catch (error) {
      console.error("Error closing ticket:", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter = filter === "all" || ticket.status === filter
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.guest_email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const openCount = tickets.filter((t) => t.status === "open").length
  const closedCount = tickets.filter((t) => t.status === "closed").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
            <p className="text-sm text-muted-foreground mt-1">{openCount} open, {closedCount} closed</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 flex gap-6 h-[calc(100vh-100px)]">
        {/* Ticket List */}
        <div className="w-80 border border-gray-200 rounded-xl flex flex-col bg-white overflow-hidden">
          {/* Search & Filter */}
          <div className="p-4 border-b border-gray-200 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filter === "all"
                    ? "bg-foreground text-background"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("open")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filter === "open"
                    ? "bg-foreground text-background"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Open ({openCount})
              </button>
              <button
                onClick={() => setFilter("closed")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filter === "closed"
                    ? "bg-foreground text-background"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Closed ({closedCount})
              </button>
            </div>
          </div>

          {/* Tickets */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
            ) : filteredTickets.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No tickets found</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`w-full px-4 py-4 text-left transition-colors ${
                      selectedTicket?.id === ticket.id
                        ? "bg-blue-50 border-l-2 border-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-medium text-sm text-foreground truncate">{ticket.guest_name}</p>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
                          ticket.status === "open"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {ticket.status === "open" ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{ticket.subject}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 border border-gray-200 rounded-xl flex flex-col bg-white overflow-hidden">
          {selectedTicket ? (
            <>
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-foreground">{selectedTicket.guest_name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedTicket.guest_email}</p>
                  <p className="text-sm text-foreground mt-2">{selectedTicket.subject}</p>
                </div>
                {selectedTicket.status === "open" && (
                  <button
                    onClick={handleCloseTicket}
                    className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Close Ticket
                  </button>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_type === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-3 rounded-lg ${
                        msg.sender_type === "admin"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <p
                        className={`text-xs mt-2 ${
                          msg.sender_type === "admin" ? "text-blue-100" : "text-muted-foreground"
                        }`}
                      >
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              {selectedTicket.status === "open" && (
                <div className="border-t border-gray-200 p-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                      disabled={sendingMessage}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={sendingMessage || !newMessage.trim()}
                      className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {selectedTicket.status === "closed" && (
                <div className="border-t border-gray-200 p-4 text-center text-sm text-muted-foreground bg-gray-50">
                  This ticket is closed
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a ticket to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
