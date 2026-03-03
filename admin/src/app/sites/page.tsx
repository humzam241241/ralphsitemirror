import Link from 'next/link'

interface Site {
  id: string
  company_name: string
  domain: string
  created_at: string
}

async function getSites(): Promise<Site[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/sites`, {
      headers: { Authorization: `Bearer ${process.env.ADMIN_SECRET}` },
      cache: 'no-store',
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function SitesPage() {
  const sites = await getSites()

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ marginBottom: 0 }}>Sites</h1>
        <Link href="/sites/new" className="btn btn-primary">Create New Site</Link>
      </div>

      {sites.length === 0 ? (
        <div className="card">
          <p style={{ color: '#888' }}>No sites yet. Create your first site to get started.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Domain</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id}>
                <td>{site.company_name}</td>
                <td>{site.domain}</td>
                <td>{new Date(site.created_at).toLocaleDateString()}</td>
                <td className="actions">
                  <Link href={`/sites/${site.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                  <Link href={`/leads/${site.id}`} className="btn btn-secondary btn-sm">Leads</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
