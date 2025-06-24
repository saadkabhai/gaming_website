import TictactoeComponent from '@/Components/Games/TictactoeComponent'
import React from 'react'
export const metadata = {
  title: "Tic Tac Toe"
};
export default function page() {
    return (
        <div>
            <TictactoeComponent />
        </div>
    )
}
