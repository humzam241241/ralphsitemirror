import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useChat } from '../../hooks/useChat'
import type { Message } from '../../hooks/useChat'

const INTRO_MESSAGE: Message = {
  id: 'intro',
  sender: 'raffy',
  text: "Hi! I'm Raffy, Ryan's Roofing AI assistant. How can I help you today?",
  timestamp: new Date(),
}

const QUICK_REPLIES = ['Book Inspection', 'Get a Quote', 'Emergency Help']

interface ChatPanelProps {
  onClose: () => void
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, sendMessage, canSend, maxMessages } = useChat()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const displayMessages = [INTRO_MESSAGE, ...messages]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayMessages.length])

  const handleSend = () => {
    const trimmed = inputValue.trim()
    if (!trimmed || !canSend) return
    sendMessage(trimmed)
    setInputValue('')
  }

  const handleQuickReply = (text: string) => {
    if (!canSend) return
    sendMessage(text)
  }

  return (
    <div className="flex h-[420px] w-[360px] flex-col overflow-hidden rounded-t-2xl border border-dark/10 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-dark/10 bg-dark px-4 py-3">
        <h2 className="text-base font-semibold text-gold">Raffy - AI Assistant</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close chat"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayMessages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick reply chips */}
      <div className="flex flex-wrap gap-2 px-4 pb-2">
        {QUICK_REPLIES.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => handleQuickReply(label)}
            disabled={!canSend}
            className="rounded-full border border-gold bg-gold/10 px-3 py-1.5 text-xs font-medium text-dark transition-colors hover:bg-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t border-dark/10 p-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          disabled={!canSend}
          className="flex-1 rounded-lg border border-dark/20 px-3 py-2 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputValue.trim() || !canSend}
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

      {!canSend && (
        <p className="px-4 pb-2 text-center text-xs text-dark/50">
          Message limit reached ({maxMessages}). Refresh to continue.
        </p>
      )}
    </div>
  )
}
