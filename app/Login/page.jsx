import LoginComponent from '@/Components/LoginComponent'
import React from 'react'
export const metadata = {
  title: "Login"
};

export const revalidate = 86400;

export default function page() {
    return (
        <div>
            <LoginComponent />
        </div>
    )
}
