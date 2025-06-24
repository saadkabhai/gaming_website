import EncryptText from '@/Components/encryptText';
import { NextResponse } from 'next/server';

export function GET(request) {
  const status = request.cookies.get('status')?.value || 'not logged in',
  decryptedStatus = EncryptText.get(status)
  return NextResponse.json({ Status:decryptedStatus });
}
