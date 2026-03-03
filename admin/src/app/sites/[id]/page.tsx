'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Site {
  id: string
  company_name: string
  domain: string
  primary_color: string
  tone: string
  custom_prompt: string
  welcome_message: string
}

export default function EditSitePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [site, setSite] = useState<Site | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [ingesting, setIngesting] = useState(false)

  useEffect(() => {
    fetch(`/api/sites/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load site')
        return res.json()
      })
      .then(setSite)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)

    const form = new FormData(e.currentTarget)
    const body = {
      company_name: form.get('company_name'),
      domain: form.get('domain'),
      primary_color: form.get('primary_color'),
      tone: form.get('tone'),
      custom_prompt: form.get('custom_prompt'),
      welcome_message: form.get('welcome_message'),
    }

    try {
      const res = await fetch(`/api/sites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Failed to update site')
      }

      const updated = await res.json()
      setSite(updated)
      setSuccess('Site updated successfully')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  async function handleIngest() {
    setError('')
    setSuccess('')
    setIngesting(true)

    try {
      const res = await fetch(`/api/ingest/${id}`, { method: 'POST' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Ingest failed')
      }
      setSuccess('Ingest triggered successfully! Content will be processed shortly.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIngesting(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this site? This cannot be undone.')) return
    setError('')

    try {
      const res = await fetch(`/api/sites/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || data.error || 'Failed to delete site')
      }
      router.push('/sites')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (loading) return <div><h1>Loading...</h1></div>
  if (!site && error) return <div><h1>Error</h1><div className="error-msg">{error}</div></div>
  if (!site) return null

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ marginBottom: 0 }}>Edit: {site.company_name}</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleIngest} className="btn btn-secondary" disabled={ingesting}>
            {ingesting ? 'Ingesting...' : 'Trigger Ingest'}
          </button>
          <Link href={`/leads/${id}`} className="btn btn-secondary">View Leads</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company_name">Company Name *</label>
            <input id="company_name" name="company_name" defaultValue={site.company_name} required />
          </div>

          <div className="form-group">
            <label htmlFor="domain">Domain *</label>
            <input id="domain" name="domain" defaultValue={site.domain} required />
          </div>

          <div className="form-group">
            <label htmlFor="primary_color">Primary Color</label>
            <input id="primary_color" name="primary_color" defaultValue={site.primary_color || '#2563eb'} type="color" />
          </div>

          <div className="form-group">
            <label htmlFor="tone">Tone</label>
            <input id="tone" name="tone" defaultValue={site.tone || 'friendly'} />
          </div>

          <div className="form-group">
            <label htmlFor="custom_prompt">Custom Prompt</label>
            <textarea id="custom_prompt" name="custom_prompt" defaultValue={site.custom_prompt || ''} />
          </div>

          <div className="form-group">
            <label htmlFor="welcome_message">Welcome Message</label>
            <input id="welcome_message" name="welcome_message" defaultValue={site.welcome_message || ''} />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
