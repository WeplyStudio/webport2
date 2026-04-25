"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed")
        return
      }

      router.refresh()
      window.location.href = "/admin"
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Admin Login</h1>
          <p className="text-neutral-500 text-sm">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-neutral-500 hover:text-white text-sm transition-colors">
            &larr; Back to website
          </a>
        </div>
      </div>
    </div>
  )
}
