import Head from '@/app/AdsenseMetaTags';
import ChessComponent from '@/Components/Games/ChessComponent'
import React from 'react'
export const metadata = {
  title: "Chess"
};
export default function page() {
    return (
        <div>
            <Head />
            <ChessComponent />
        </div>
    )
}
