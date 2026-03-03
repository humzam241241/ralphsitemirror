import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/api'

export async function GET() {
  const res = await backendFetch('/sites')
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const res = await backendFetch('/sites', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
