import { NextResponse } from 'next/server'

const recipient = 'razamuhammadali205@gmail.com'

export async function GET() {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) return NextResponse.json({ error: 'Web3Forms access key is not configured.' }, { status: 500 })
  return NextResponse.json({ accessKey })
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) return NextResponse.json({ error: 'Form service is not configured' }, { status: 500 })

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })

  const entries = Object.entries(body as Record<string, unknown>)
    .filter(([, value]) => typeof value === 'string' && value.trim())
    .map(([key, value]) => [key, String(value).trim()] as const)

  if (!entries.length) return NextResponse.json({ error: 'Please complete at least one field.' }, { status: 400 })

  const formData = new URLSearchParams({
    access_key: accessKey,
    subject: 'New BM-Technologist Website Request',
    from_name: 'BM-Technologist Website',
    to: recipient,
    botcheck: '',
  })
  for (const [key, value] of entries) formData.append(key, value)

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: formData.toString(),
  })
  const result = await response.json().catch(() => null)
  if (!response.ok || !result?.success) {
    const serviceMessage = typeof result?.message === 'string' ? result.message : 'Web3Forms could not deliver the request.'
    return NextResponse.json({ error: serviceMessage }, { status: 502 })
  }
  return NextResponse.json({ success: true })
}

export const runtime = 'nodejs'
