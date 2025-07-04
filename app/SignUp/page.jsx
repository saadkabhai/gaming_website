import SignUpComponent from '@/Components/SignUpComponent'
import React from 'react'
export const metadata = {
  title: "Sign Up"
};

export const revalidate = 86400;

export default function page() {
  return (
    <div>
      <SignUpComponent />
    </div>
  )
}
