import HelpComponent from '@/Components/HelpComponent'
import React from 'react'
import Head from '../AdsenseMetaTags';
export const metadata = {
  title: "Help"
};
export default function page() {
  return (
    <div>
      <Head />
      <HelpComponent />
    </div>
  )
}
