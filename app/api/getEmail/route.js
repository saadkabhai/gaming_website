import EncryptText from '@/Components/encryptText';
import { NextResponse } from 'next/server';

export function GET(request) {
  const getvalue = request.cookies.get('Email')?.value || null;
  const decryptedStatus = EncryptText.get(getvalue);
  return NextResponse.json({ Email: decryptedStatus });
}
