'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ChevronLeft, Maximize2, Smile, Paperclip, MessageCircle, Bot } from 'lucide-react'

export function JoyChat() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!mounted) return null

  const today = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-white ${
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
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                  aria-label="Close chat"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Joy Assistant</h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-xs text-gray-500">Online - Ready to help</p>
                  </div>
                </div>
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                aria-label="Expand chat"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 bg-gradient-to-b from-gray-50/50 to-white">
              {/* Date Separator */}
              <div className="flex justify-center mb-6">
                <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                  Today
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="space-y-4">
                  {/* Welcome Message */}
                  <div className="flex justify-start">
                    <div className="max-w-[280px]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700">Joy AI</span>
                      </div>
                      <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Hi there! 👋
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed mt-1">
                          I&apos;m Joy, your personal assistant. What can I help you with today?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <div className="max-w-[280px]">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-medium text-gray-700">Joy AI</span>
                          </div>
                          <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {message.parts
                                ?.filter((p) => p.type === 'text')
                                .map((p) => (p as { type: 'text'; text: string }).text)
                                .join('') || message.content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="max-w-[280px]">
                          <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
                            <p className="text-sm leading-relaxed">
                              {message.parts
                                ?.filter((p) => p.type === 'text')
                                .map((p) => (p as { type: 'text'; text: string }).text)
                                .join('') || message.content}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {status === 'streaming' && (
                    <div className="flex justify-start">
                      <div className="max-w-[280px]">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-medium text-gray-700">Joy AI</span>
                        </div>
                        <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-100 p-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="flex-1 flex items-center bg-gray-50 rounded-xl border border-gray-200 px-4 py-2.5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-100 transition-all">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask question..."
                    className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                    disabled={status === 'streaming'}
                  />
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                      aria-label="Add emoji"
                    >
                      <Smile className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                      aria-label="Attach file"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
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
