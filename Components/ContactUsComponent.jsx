import React from 'react'
import './ContactUsComponent.css'
export default function ContactUsComponent() {
    return (
        <div className='Contactus-container'>
            <div className="Heading">Contact Us</div>
            <p style={{textAlign:'center'}}>For any questions or support, feel free to email us directly:</p>
            <p style={{textAlign:'center'}}><a href="mailto:support@play2win.cc">support@play2win.cc</a></p>
        </div>
    )
}
