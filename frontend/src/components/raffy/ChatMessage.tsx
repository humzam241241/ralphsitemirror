import type { MessageSender } from '../../hooks/useChat'

interface ChatMessageProps {
  sender: MessageSender
  text: string
  timestamp: Date
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatMessage({ sender, text, timestamp }: ChatMessageProps) {
  const isRaffy = sender === 'raffy'

  return (
    <div
      className={`flex gap-3 ${isRaffy ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          isRaffy
            ? 'bg-gold text-dark'
            : 'bg-dark text-gold'
        }`}
      >
        {isRaffy ? 'R' : 'U'}
      </div>

      {/* Bubble + timestamp */}
      <div className={`flex max-w-[85%] flex-col ${isRaffy ? 'items-start' : 'items-end'}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isRaffy
              ? 'rounded-tl-sm bg-dark/10 text-dark'
              : 'rounded-tr-sm bg-gold text-dark'
          }`}
        >
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <span className="mt-1 text-xs text-dark/50">
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  )
}
