import OTPComponent from '@/Components/OTPComponent'
import React from 'react'
export const metadata = {
  title: "OTP"
};

export const revalidate = 86400;

export default function page() {
    return (
        <div>
            <OTPComponent />
        </div>
    )
}
