import React from 'react'
import './not-found.css'
import ViewLink from '@/Components/ViewLink'
export const revalidate = 86400;
export default function notfound() {
    return (
        <div className='not-found-error-container'>
            <div className="error-number">
                404
            </div>
            <div className="error-text">
                ERROR
            </div>
            <div className="image">
                <img src="https://raw.githubusercontent.com/saadkabhai/gaming_website/0321813/public/not_found.png" alt="" />
            </div>
            <div className="error-text" style={{marginTop:10}}>
                PAGE NOT FOUND
            </div>
            <div className="button">
                <ViewLink href={'/'}>
                <button>Back to Home</button>
                </ViewLink>
            </div>
        </div>
    )
}
