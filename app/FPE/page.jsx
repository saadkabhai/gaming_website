import FPEComponent from '@/Components/FPEComponent'
import React from 'react'
export const metadata = {
  title: "Forgot Password"
};

export const revalidate = 86400;

export default function page() {
    return (
        <div><FPEComponent /></div>
    )
}
