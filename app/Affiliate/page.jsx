import AffiliateComponent from '@/Components/AffiliateComponent'
import { WebsiteURL } from '@/Components/BASEURL';
import EncryptText from '@/Components/encryptText';
import { cookies } from 'next/headers';
import React from 'react'
export const metadata = {
    title: "Referrals"
};
async function FetchRefferrals(Username) {
    const Refferralsres = await fetch(`${WebsiteURL}/api/getrefferrals?Username=${Username}`),
        Refferrals = await Refferralsres.json()
    return Refferrals
}

export default async function page() {
    const cookieStore = cookies();
    const Username = EncryptText.get(cookieStore.get('Username')?.value || null);
    const status = EncryptText.get(cookieStore.get('status')?.value || null);
    const Refferrals = await FetchRefferrals(Username)
    return (
        <div>
            <AffiliateComponent Status={status} Username={Username} Refferrals={Refferrals} />
        </div>
    )
}
