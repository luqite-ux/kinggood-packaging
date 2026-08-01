import { NextResponse, type NextRequest } from 'next/server'
import { buildUnprefixedEnglishPath } from '@/lib/i18n/config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const destination = request.nextUrl.clone()
  destination.pathname = buildUnprefixedEnglishPath((await params).path)
  return NextResponse.redirect(destination, 308)
}

export { GET as HEAD }
