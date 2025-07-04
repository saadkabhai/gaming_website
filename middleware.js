import { NextResponse } from 'next/server';

export async function middleware(request) {
    const response = NextResponse.next();
    response.headers.set('x-pathname', request.nextUrl.pathname); // 🔥 custom header
    return response;
}
export const config = {
    matcher: [
        '/Balance/:path*',
        '/Affiliate/:path*',
        '/Leaderboard/:path*',
    ],
};