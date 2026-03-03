import { NextRequest, NextResponse } from 'next/server'
import { backendFetch } from '@/lib/api'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ site_id: string }> }
) {
  const { site_id } = await params
  const res = await backendFetch(`/leads/${site_id}`)
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
