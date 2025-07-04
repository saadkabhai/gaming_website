import GamesComponent from '@/Components/GamesComponent'
import React from 'react'
import Head from '../AdsenseMetaTags';
export const metadata = {
  title: "Games"
};

export const revalidate = 86400;

export default function page() {
  return (
    <div>
      <Head />
      <GamesComponent/>
    </div>
  )
}
