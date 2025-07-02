import { NextResponse } from 'next/server';

export function GET(request) {
    const getvalue = request.cookies.get('Username')?.value || null;
    return NextResponse.json({ Username: getvalue });
}
