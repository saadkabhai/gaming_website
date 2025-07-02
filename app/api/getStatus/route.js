import { NextResponse } from 'next/server';

export function GET(request) {
  const getvalue = request.cookies.get('status')?.value || null;
  return NextResponse.json({ Status: getvalue });
}
