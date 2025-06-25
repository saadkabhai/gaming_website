import EncryptText from '@/Components/encryptText';
import { NextResponse } from 'next/server';

export function GET(request) {
  const getvalue = request.cookies.get('status')?.value || null;
  const decryptedStatus = EncryptText.get(getvalue);
  return NextResponse.json({ Status: decryptedStatus });
}
