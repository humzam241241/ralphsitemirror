import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  message: string
  page_url: string
  created_at: string
}

async function getLeads(siteId: string): Promise<Lead[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/leads/${siteId}`, {
      headers: { Authorization: `Bearer ${process.env.ADMIN_SECRET}` },
      cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function LeadsPage({ params }: { params: Promise<{ site_id: string }> }) {
  const { site_id } = await params
  const leads = await getLeads(site_id)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ marginBottom: 0 }}>Leads</h1>
        <Link href={`/sites/${site_id}`} className="btn btn-secondary">Back to Site</Link>
      </div>

      {leads.length === 0 ? (
        <div className="card">
          <p style={{ color: '#888' }}>No leads captured yet for this site.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Page URL</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name || '—'}</td>
                <td>{lead.email || '—'}</td>
                <td>{lead.phone || '—'}</td>
                <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {lead.message || '—'}
                </td>
                <td style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {lead.page_url || '—'}
                </td>
                <td>{new Date(lead.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
