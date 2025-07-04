import Head from '@/app/AdsenseMetaTags';
import TictactoeComponent from '@/Components/Games/TictactoeComponent'
import React from 'react'
export const metadata = {
  title: "Tic Tac Toe"
};

export const revalidate = 86400;

export default function page() {
    return (
        <div>
            <Head />
            <TictactoeComponent />
        </div>
    )
}
