import Link from 'next/link'

interface Site {
  id: string
  company_name: string
  domain: string
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

export default async function DashboardPage() {
  const sites = await getSites()

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Total Sites</div>
          <div className="value">{sites.length}</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16, marginBottom: 12 }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/sites" className="btn btn-primary">Manage Sites</Link>
          <Link href="/sites/new" className="btn btn-secondary">Create New Site</Link>
        </div>
      </div>

      {sites.length > 0 && (
        <div className="card">
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Recent Sites</h2>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Domain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sites.slice(0, 5).map((site) => (
                <tr key={site.id}>
                  <td>{site.company_name}</td>
                  <td>{site.domain}</td>
                  <td className="actions">
                    <Link href={`/sites/${site.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                    <Link href={`/leads/${site.id}`} className="btn btn-secondary btn-sm">Leads</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
