import AboutUsComponent from '@/Components/AboutUsComponent'
import React from 'react'
import Head from '../AdsenseMetaTags';
export const metadata = {
    title: "About Us"
};
export default function page() {
  return (
    <div>
      <Head />
      <AboutUsComponent/></div>
  )
}
