import BalanceComponent from '@/Components/BalanceComponent'
import { WebsiteURL } from '@/Components/BASEURL';
import EncryptText from '@/Components/encryptText';
import { cookies } from 'next/headers';
import React from 'react'
export const metadata = {
  title: "Balance"
};
async function fetchBalance(Status, Username) {
  if (Status == 'LoggedIn') {
    const response = await fetch(`${WebsiteURL}/api/getBalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: Username
      })
    });
    const res = await response.json()
    return res.User.Money
  }
  else {
    return 0.00
  }
}
export default async function page() {
  const cookieStore = cookies();
  const Username = EncryptText.get(cookieStore.get('Username')?.value || null);
  const status = EncryptText.get(cookieStore.get('status')?.value || null);
  const Balance = await fetchBalance(status, Username)
  return (
    <div><BalanceComponent Balance={Balance} Status={status} /></div>
  )
}
