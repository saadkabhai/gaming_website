import ContactUsComponent from '@/Components/ContactUsComponent'
import React from 'react'
import Head from '../AdsenseMetaTags';
export const metadata = {
    title: "Contact Us"
};

export default function page() {
    return (
        <div>
            <Head/>
            <ContactUsComponent />
        </div>
    )
}
