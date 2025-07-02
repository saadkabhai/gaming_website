import { NextResponse } from 'next/server';

export function GET(request) {
  const getvalue = request.cookies.get('Email')?.value || null;
  return NextResponse.json({ Email: getvalue });
}
