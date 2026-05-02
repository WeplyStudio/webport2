"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Send, 
  X, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Inbox,
  TrendingUp,
  Users,
  ArrowLeft,
  MoreVertical,
  Search,
  Filter,
  RefreshCw
} from "lucide-react"

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
  const [refreshing, setRefreshing] = useState(false)
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
      setRefreshing(false)
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

  const handleRefresh = () => {
    setRefreshing(true)
    fetchTickets()
  }

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

  const formatTimeAgo = (dateStr: string) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Baru saja"
    if (diffMins < 60) return `${diffMins} menit lalu`
    if (diffHours < 24) return `${diffHours} jam lalu`
    return `${diffDays} hari lalu`
  }

  const filteredTickets = tickets
    .filter((t) => {
      if (filter === "all") return true
      return t.status === filter
    })
    .filter((t) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        t.guest_name.toLowerCase().includes(query) ||
        t.guest_email.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query)
      )
    })

  const openCount = tickets.filter((t) => t.status === "open").length
  const closedCount = tickets.filter((t) => t.status === "closed").length
  const avgResponseTime = "~5 min"

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-gray-400" />
          <span className="text-gray-500">Memuat tiket...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 z-20 hidden lg:flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Support</h1>
              <p className="text-xs text-gray-400">Ticket Management</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <a 
              href="/admin" 
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </a>
            <div className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-900 bg-gray-50 rounded-xl">
              <Inbox className="w-4 h-4" />
              Semua Tiket
              <span className="ml-auto bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {tickets.length}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="px-4 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Filter</p>
            <div className="space-y-1">
              <button 
                onClick={() => setFilter("open")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-colors ${
                  filter === "open" ? "bg-green-50 text-green-600" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Clock className="w-4 h-4" />
                Open
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                  filter === "open" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                }`}>
                  {openCount}
                </span>
              </button>
              <button 
                onClick={() => setFilter("closed")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-colors ${
                  filter === "closed" ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Closed
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
                  filter === "closed" ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-gray-500"
                }`}>
                  {closedCount}
                </span>
              </button>
              <button 
                onClick={() => setFilter("all")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-colors ${
                  filter === "all" ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-4 h-4" />
                Semua
              </button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <a 
            href="/" 
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
          >
            View Website
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Stats Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
                <p className="text-sm text-gray-500 mt-1">Kelola tiket bantuan dari pengunjung</p>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Inbox className="w-5 h-5 text-gray-400" />
                  <span className="text-xs text-gray-400">Total</span>
                </div>
                <p className="text-3xl font-bold">{tickets.length}</p>
                <p className="text-sm text-gray-400 mt-1">Total tiket</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded-full font-medium">Active</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{openCount}</p>
                <p className="text-sm text-gray-500 mt-1">Tiket open</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="w-5 h-5 text-gray-400" />
                  <span className="text-xs text-gray-500">Resolved</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{closedCount}</p>
                <p className="text-sm text-gray-500 mt-1">Tiket closed</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-xs text-blue-500">Avg</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{avgResponseTime}</p>
                <p className="text-sm text-gray-500 mt-1">Response time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-320px)]">
            {/* Tickets List */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari tiket..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {filteredTickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                      <Inbox className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-sm">Tidak ada tiket</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {filteredTickets.map((ticket) => (
                      <button
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                          selectedTicket?.id === ticket.id ? "bg-gray-50 border-l-2 border-black" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                            ticket.status === "open" 
                              ? "bg-green-100 text-green-600" 
                              : "bg-gray-100 text-gray-500"
                          }`}>
                            {ticket.guest_name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="font-semibold text-gray-900 text-sm truncate">
                                {ticket.guest_name}
                              </span>
                              <span className="text-xs text-gray-400 shrink-0">
                                {formatTimeAgo(ticket.created_at)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 truncate mb-1">
                              {ticket.guest_email}
                            </p>
                            <p className="text-sm text-gray-700 truncate font-medium">
                              {ticket.subject}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
              {selectedTicket ? (
                <>
                  {/* Chat Header */}
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        selectedTicket.status === "open" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {selectedTicket.guest_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900">
                            {selectedTicket.guest_name}
                          </h3>
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                            selectedTicket.status === "open"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}>
                            {selectedTicket.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {selectedTicket.subject}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedTicket.status === "open" && (
                        <button
                          onClick={handleCloseTicket}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-100 text-sm font-medium rounded-xl transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Tutup Tiket
                        </button>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                    {/* Ticket Info */}
                    <div className="flex justify-center mb-6">
                      <div className="bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                        <p className="text-xs text-gray-500">
                          Tiket dibuat pada {formatDate(selectedTicket.created_at)}
                        </p>
                      </div>
                    </div>

                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender_type === "admin" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className={`max-w-[75%] ${
                          msg.sender_type === "admin" ? "order-2" : ""
                        }`}>
                          {msg.sender_type === "guest" && (
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                {selectedTicket.guest_name.charAt(0).toUpperCase()}
                              </div>
                              <span className="text-xs font-medium text-gray-600">
                                {selectedTicket.guest_name}
                              </span>
                            </div>
                          )}
                          {msg.sender_type === "admin" && (
                            <div className="flex items-center justify-end gap-2 mb-1.5">
                              <span className="text-xs font-medium text-gray-600">Admin</span>
                              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
                                A
                              </div>
                            </div>
                          )}
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              msg.sender_type === "admin"
                                ? "bg-black text-white rounded-tr-sm"
                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                          </div>
                          <p
                            className={`text-[10px] mt-1.5 ${
                              msg.sender_type === "admin" ? "text-right" : ""
                            } text-gray-400`}
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
                    <div className="p-4 border-t border-gray-100 bg-white">
                      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-gray-200 transition-all">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Ketik balasan untuk guest..."
                            className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                            disabled={sendingMessage}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={sendingMessage || !newMessage.trim()}
                          className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <div className="flex items-center justify-center gap-2 text-gray-500 py-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Tiket ini sudah ditutup</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Pilih Tiket
                    </h3>
                    <p className="text-sm text-gray-500">
                      Pilih tiket dari daftar untuk melihat percakapan
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 z-20">
        <div className="flex items-center justify-around">
          <a href="/admin" className="flex flex-col items-center gap-1 text-gray-400">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </a>
          <button className="flex flex-col items-center gap-1 text-gray-900">
            <Inbox className="w-5 h-5" />
            <span className="text-xs font-medium">Tiket</span>
          </button>
          <a href="/" className="flex flex-col items-center gap-1 text-gray-400">
            <Users className="w-5 h-5" />
            <span className="text-xs">Website</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
