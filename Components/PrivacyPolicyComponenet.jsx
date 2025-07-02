import React from 'react'
import './PrivacyPolicyComponenet.css'
export default function PrivacyPolicyComponenet() {
    return (
        <div className='PrivacyPolicy-container' style={{ width: '90%', marginLeft: '5%' }}>
            <div className="Heading">
                <i className="fa-duotone fa-regular fa-lock-keyhole"></i>
                Privacy Policy
            </div>
            <p className='date'>Last updated: June 27, 2025</p>
            <p className='Description'>At <b>PLAY2WIN</b>, accessible from <b>play2win.cc</b>, we take your privacy seriously. This Privacy Policy explains what information we collect and how we use it.</p>
            <div className="Policies">
                <div className="Policy">
                    <div className="icon" style={{ backgroundColor: '#fed99e' }}>
                        <i className="fa-light fa-user"></i>
                    </div>
                    <div className="Text">
                        <h2><b>Information We Collect</b></h2>
                        <p>We may collect personal information such as your name, email address, username, and game activity when you sign up and use our platform.</p>
                    </div>
                </div>
                <div className="Policy">
                    <div className="icon" style={{ backgroundColor: '#ffc79b' }}>
                        <i className="fa-regular fa-memo-circle-info"></i>
                    </div>
                    <div className="Text">
                        <h2><b>How We Use Your Information</b></h2>
                        <p>We use your data to create your account, track your points and progress, provide support, and improve the gaming experience.</p>
                    </div>
                </div>
                <div className="Policy">
                    <div className="icon" style={{ backgroundColor: '#cde7c1' }}>
                        <i className="fa-regular fa-light-emergency-on"></i>
                    </div>
                    <div className="Text">
                        <h2><b>Google AdSense</b></h2>
                        <p>We use Google AdSense to display ads. Tou can opt of personalized ads by visiting <a href="https://www.google.com/settings/ads" target="_blank">Google Ads Settings</a></p>
                    </div>
                </div>
                <div className="Policy">
                    <div className="icon" style={{ backgroundColor: '#ffdba1' }}>
                        <i className="fa-regular fa-cookie-bite"></i>
                    </div>
                    <div className="Text">
                        <h2><b>Cookies</b></h2>
                        <p>We use cookies to personalize your experience and analyze how our site is used. You can control or disable cookies through your browser settings.</p>
                    </div>
                </div>
                <div className="Policy">
                    <div className="icon" style={{ backgroundColor: '#e1cedb' }}>
                        <i className="fa-regular fa-circle-check"></i>
                    </div>
                    <div className="Text">
                        <h2><b>Your Consent</b></h2>
                        <p>By using our website, you consent to this Privacy Policy.</p>
                    </div>
                </div>
                <div className="Policy">
                    <div className="icon" style={{ backgroundColor: '#c1e4d6' }}>
                        <i className="fa-solid fa-file-contract"></i>
                    </div>
                    <div className="Text">
                        <h2> <b>Changes to This Policy</b></h2>
                        <p>We may update this policy from time to time. Changes will be posted on this page.</p>
                    </div>
                </div>
                <div className="Policy">
                    <div className="icon" style={{ backgroundColor: '#ffdba0' }}>
                        <i className="fa-regular fa-envelope"></i>
                    </div>
                    <div className="Text">
                        <h2> <b>Contact Us</b></h2>
                        <p>If you have questions about this Privacy Policy, you can contact us at:</p>
                        <p><strong>Email:</strong> <a href="mailto:support@play2win.cc">support@play2win.cc</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
