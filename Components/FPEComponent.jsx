'use client'
import React, { useState } from 'react'
import './SignUpComponent.css'
import LayeredButton from './LayeredButton'
import secureStorage from './secureStorage'
import { useRouter } from 'next/navigation'
import {  WebsiteURL } from './BASEURL'

export default function LoginComponent() {
    const [buttonisloading, setbuttonisloading] = useState(false)
    const router = useRouter()
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const sendrequestofForgotPassword = async () => {
        setbuttonisloading(true)
        const email = document.getElementById('Email'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text')
        let should_request = true
        error_container.classList.remove('active')
        if (!email.value) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey</b>, All feilds are required.'
            should_request = false
        } else if (!isValidEmail(email.value)) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey</b>, Enter Valid Email.'
            should_request = false
        }
        if (should_request == true) {
            const response = await fetch(`${WebsiteURL}/api/ForgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: email.value
                })
            })
            const res = await response.json()
            if (res.message == 'The email you entered is not associated with any account.') {
                error_container.classList.add('active')
                error_text.innerHTML = '<b>Hey</b>, The email you entered is not associated with any account.'
            } else if (res.message == 'Sent') {
                secureStorage.set('CPmessage', `<b>Hey</b>, A code has been sent to <b>${email.value}</b>. It expires in <b>10 minutes</b>. Check your inbox and spam folder.`)
                secureStorage.set('Email', email.value)
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        router.push('/CP');
                    });
                } else {
                    router.push('/CP');
                }
            }
        }
        setbuttonisloading(false)
    }
    const closeerror = () => {
        const error_container = document.querySelector('.error')
        error_container.classList.remove('active')
    }
    return (
        <div className='user-form-container'>
            <div className="error">
                <div className="text"></div>
                <button onClick={closeerror}>&#10006;</button>
            </div>
            <div className="form">
                <div className="logo">
                    <img src="https://raw.githubusercontent.com/saadkabhai/gaming_website/0321813/public/logo.png" alt="" />
                    <div className="name">PLAY2WIN</div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-envelope" style={{ color: '#24282d', marginTop: 4 }}></i>
                        </div>
                        <input type="email" placeholder='EMAIL' id='Email' autoComplete='off' />
                    </div>
                </div>
                <div className="button" onClick={sendrequestofForgotPassword}>
                    <LayeredButton className={`${buttonisloading && 'disabled'} layered-button`}>
                        {buttonisloading ? <div className="loader"></div> : 'Send Code'}
                    </LayeredButton>
                </div>
            </div>
        </div>
    )
}
