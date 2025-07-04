import { NextResponse } from 'next/server';

export function GET(request) {
    const Username = request.cookies.get('Username')?.value || null;
    const Email = request.cookies.get('Email')?.value || null;
    const Color = request.cookies.get('Color')?.value || null;
    return NextResponse.json({ Username: Username, Email: Email, Color: Color });
}
