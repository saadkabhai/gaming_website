import { NextResponse } from 'next/server';

export function GET(request) {
    const getvalue = request.cookies.get('Color')?.value || null;
    return NextResponse.json({ Color: getvalue });
}
