'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateSitePage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const body = {
      company_name: form.get('company_name'),
      domain: form.get('domain'),
      primary_color: form.get('primary_color') || '#2563eb',
      tone: form.get('tone') || 'friendly',
      custom_prompt: form.get('custom_prompt') || '',
      welcome_message: form.get('welcome_message') || 'Hi! How can I help you today?',
    }

    try {
      const res = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Failed to create site')
      }

      router.push('/sites')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Create New Site</h1>

      {error && <div className="error-msg">{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company_name">Company Name *</label>
            <input id="company_name" name="company_name" required />
          </div>

          <div className="form-group">
            <label htmlFor="domain">Domain *</label>
            <input id="domain" name="domain" placeholder="example.com" required />
          </div>

          <div className="form-group">
            <label htmlFor="primary_color">Primary Color</label>
            <input id="primary_color" name="primary_color" defaultValue="#2563eb" type="color" />
          </div>

          <div className="form-group">
            <label htmlFor="tone">Tone</label>
            <input id="tone" name="tone" defaultValue="friendly" placeholder="friendly, professional, casual..." />
          </div>

          <div className="form-group">
            <label htmlFor="custom_prompt">Custom Prompt</label>
            <textarea id="custom_prompt" name="custom_prompt" placeholder="Optional system prompt override..." />
          </div>

          <div className="form-group">
            <label htmlFor="welcome_message">Welcome Message</label>
            <input id="welcome_message" name="welcome_message" defaultValue="Hi! How can I help you today?" />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Site'}
          </button>
        </form>
      </div>
    </div>
  )
}
