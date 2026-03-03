const API_URL = process.env.API_URL || 'http://localhost:8000/api'
const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

export async function backendFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${path}`
  const headers = new Headers(options.headers)
  headers.set('Authorization', `Bearer ${ADMIN_SECRET}`)
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json')
  }
  return fetch(url, { ...options, headers })
}
