import EncryptText from '@/Components/encryptText';
import { NextResponse } from 'next/server';

export function GET(request) {
    const getvalue = request.cookies.get('Color')?.value || null;
    const decryptedStatus = EncryptText.get(getvalue);
    return NextResponse.json({ Color: decryptedStatus });
}
