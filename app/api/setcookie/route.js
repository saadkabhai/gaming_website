import EncryptText from '@/Components/encryptText';
import { NextResponse } from 'next/server';

export function GET(request) {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const response = NextResponse.json({ message: 'Cookies have been set!' });
    if (status) {
        const encryptedStatus = EncryptText.set(status)
        response.headers.append(
            'Set-Cookie',
            `status=${encryptedStatus}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 365 * 10}`
        );
    }
    return response;
}
