import EncryptText from '@/Components/encryptText';
import { NextResponse } from 'next/server';

export function GET(request) {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const Username = url.searchParams.get('Username');
    const Email = url.searchParams.get('Email');
    const Color = url.searchParams.get('Color');
    const response = NextResponse.json({ message: 'Cookies have been set!' });
    if (status) {
        const encryptedStatus = EncryptText.set(status)
        response.headers.append(
            'Set-Cookie',
            `status=${encryptedStatus}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 365 * 10}`
        );
    } if (Username) {
        const encryptedUsername = EncryptText.set(Username)
        response.headers.append(
            'Set-Cookie',
            `Username=${encryptedUsername}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 365 * 10}`
        );
    }
    if (Email) {
        const encryptedEmail = EncryptText.set(Email)
        response.headers.append(
            'Set-Cookie',
            `Email=${encryptedEmail}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 365 * 10}`
        );
    }
    if (Color) {
     const encryptedColor = EncryptText.set(Color)
        response.headers.append(
            'Set-Cookie',
            `Color=${encryptedColor}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 365 * 10}`
        );   
    }
    return response;
}
