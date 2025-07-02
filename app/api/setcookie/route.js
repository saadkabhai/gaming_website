import { WebsiteURL } from '@/Components/BASEURL';
import EncryptText from '@/Components/encryptText';
import { NextResponse } from 'next/server';
const allowedOrigin = WebsiteURL; // or your frontend domain

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}
export async function POST(request) {
    const { Email, status, Username, Color, Password } = await request.json();
    const response = new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Credentials': 'true',
        },
    });
    const setCookie = (key, value) => {
        const encrypted = EncryptText.set(value);
        response.cookies.set(key, encrypted, {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 365 * 10,
        });
    };
    if (status) setCookie('status', status);
    if (Username) setCookie('Username', Username);
    if (Email) setCookie('Email', Email);
    if (Color) setCookie('Color', Color);
    if (Password) setCookie('Password', Password);
    return response;
}
