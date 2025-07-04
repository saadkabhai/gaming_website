import PrivacyPolicyComponenet from '@/Components/PrivacyPolicyComponenet'
import React from 'react'
import Head from '../AdsenseMetaTags';
export const metadata = {
  title: "Privacy Policy"
};

export const revalidate = 86400;

export default function page() {
    return (
        <div>
            <Head />
            <PrivacyPolicyComponenet />
        </div>
    )
}
