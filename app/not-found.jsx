import React from 'react'
import './not-found.css'
import ViewLink from '@/Components/ViewLink'
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
                <img src="/not_found.png" alt="" />
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
