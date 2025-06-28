import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import EncryptText from './Components/encryptText';

export async function middleware(request) {
    const cookieStore = cookies();
    const status = EncryptText.get(cookieStore.get('status')?.value || null);
    if (status !== 'LoggedIn') {
        if (request.nextUrl.pathname.startsWith('/Balance')) {
            return NextResponse.redirect(new URL('/Login', request.url));
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/:path*'],
};