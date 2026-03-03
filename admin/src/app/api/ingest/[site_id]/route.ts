import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/api'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ site_id: string }> }
) {
  const { site_id } = await params
  const res = await backendFetch(`/ingest/${site_id}`, { method: 'POST' })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
