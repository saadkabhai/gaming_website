import { WebsiteURL } from '@/Components/BASEURL';
import EncryptText from '@/Components/encryptText';
import { connectDB } from '@/Components/lib/dbConnect';
import { User } from '@/Components/models/User';
import { NextResponse } from 'next/server';
const allowedOrigin = WebsiteURL;
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
export async function POST(req) {
    const { Email, Password } = await req.json();
    await connectDB();
    const getUser = await User.find({ Email: Email })
    if (EncryptText.get(getUser[0].Password) == Password) {
        return new NextResponse(JSON.stringify({
            message: 'Correct Password',
            Points: getUser[0].Points
        }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
            },
        });
    } else {
        const encrypted = EncryptText.set('None');
        response.cookies.set('status', encrypted, {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 365 * 10,
        });
        return new NextResponse(JSON.stringify({
            message: 'Incorrect Password',
        }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin,
            },
        });

    }
}