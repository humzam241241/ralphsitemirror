import { useState, useCallback } from 'react'

export type MessageSender = 'raffy' | 'user'

export interface Message {
  id: string
  sender: MessageSender
  text: string
  timestamp: Date
}

const MAX_MESSAGES_PER_SESSION = 20

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [messageCount, setMessageCount] = useState(0)

  const sendMessage = useCallback((text: string) => {
    if (messageCount >= MAX_MESSAGES_PER_SESSION) {
      return
    }

    const userMessage: Message = {
      id: generateId(),
      sender: 'user',
      text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setMessageCount((c) => c + 1)

    // Placeholder: echo back for now
    const raffyMessage: Message = {
      id: generateId(),
      sender: 'raffy',
      text: `Thanks for your message! You said: "${text}". I'm a placeholder for now—real AI coming soon!`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, raffyMessage])
  }, [messageCount])

  const resetChat = useCallback(() => {
    setMessages([])
    setMessageCount(0)
  }, [])

  const canSend = messageCount < MAX_MESSAGES_PER_SESSION

  return { messages, sendMessage, resetChat, canSend, messageCount, maxMessages: MAX_MESSAGES_PER_SESSION }
}
