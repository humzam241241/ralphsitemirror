const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export interface HealthResponse {
  status: string
  timestamp?: string
}

export interface ChatResponse {
  message?: string
  reply?: string
  error?: string
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE_URL}/health`)
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`)
  return res.json()
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`)
  return res.json()
}
