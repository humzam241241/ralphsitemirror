import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Chatbot Admin',
  description: 'Admin dashboard for managing chatbot sites and leads',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="admin-layout">
          <aside className="sidebar">
            <h2>Chatbot Admin</h2>
            <nav>
              <Link href="/">Dashboard</Link>
              <Link href="/sites">Sites</Link>
            </nav>
          </aside>
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  )
}
