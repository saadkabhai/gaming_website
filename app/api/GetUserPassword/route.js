import { WebsiteURL } from '@/Components/BASEURL';
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
    const { Email } = await req.json();
    await connectDB();
    const getUser = await User.find({ Email: Email })
    return new NextResponse(JSON.stringify({
        Password: getUser[0].Password,
    }), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': allowedOrigin,
        },
    });
}