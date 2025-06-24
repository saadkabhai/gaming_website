'use client'
import { useRouter } from 'next/navigation'
import LayeredButton from './LayeredButton'
import secureStorage from './secureStorage'
import './SignUpComponent.css'
import React, { useEffect, useState } from 'react'
import { ServerURL } from './BASEURL'

export default function OTPComponent() {
    const [buttonisloading, setbuttonisloading] = useState(false)
    const router = useRouter()
    const closeerror = () => {
        const error_container = document.querySelector('.error')
        error_container.classList.remove('active')
    }
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchWithRetry = async (url, options, delay = 1000) => {
        while (true) {
            try {
                const response = await fetch(url, options);
                if (response.status >= 500) {
                    console.warn(`⚠️ Server error (${response.status}). Retrying in ${delay}ms...`);
                } else {
                    return await response.json();
                }
            } catch (err) {
                console.warn(`❌ Fetch failed: ${err.message}. Retrying in ${delay}ms...`);
            }
            await wait(delay);
        }
    };
    const sendOTPrequest = async () => {
        setbuttonisloading(true)
        const otp = document.getElementById('otp'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text'),
            Email = secureStorage.get('Email'),
            Username = secureStorage.get('Username')
        let should_request = true
        error_container.classList.remove('active')
        if (!otp.value) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey</b>, All feilds are required.'
            should_request = false
        } else if (otp.value.length < 6) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey</b>, Code should be <b>6 characters long</b>.'
            should_request = false
        }
        if (should_request) {
            const res = await fetchWithRetry(`${ServerURL}/OTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: Email,
                    Username: Username,
                    Code: otp.value
                })
            })
            if (res.message == 'Invalid Code.') {
                error_container.classList.add('active')
                error_text.innerHTML = '<b>Hey</b>, The code you entered is invalid. Please check and try again.'
            } else if (res.message == 'A new OTP has been sent because the previous one expired.') {
                error_container.classList.add('active')
                error_text.innerHTML = `<b>Hey</b>, We've sent a new OTP to <b>${res.Email}</b>. Check your inbox and Spam folder. The previous code has expired.`
            } else if (res.message == 'login to continue.') {
                secureStorage.set('Loginmessage', '<b>Hey</b>, Login to continue')
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        router.push('/Login');
                    });
                } else {
                    router.push('/Login');
                }
            }
        }
        setbuttonisloading(false)
    }
    useEffect(() => {
        const OTPmessage = secureStorage.get('OTPmessage'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text')
        if (OTPmessage) {
            error_container.classList.add('active')
            error_text.innerHTML = OTPmessage
            secureStorage.remove('OTPmessage')
        }
    }, [])
    return (
        <div className='user-form-container'>
            <div className="error">
                <div className="text"></div>
                <button onClick={closeerror}>&#10006;</button>
            </div>
            <div className="form">
                <div className="logo">
                    <img src="./logo.png" alt="" />
                    <div className="name">PLAY2WIN</div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-lock-keyhole" style={{ color: '#24282d', marginTop: 4 }} ></i>
                        </div>
                        <input type="number" placeholder='OTP' id='otp' autoComplete='off' />
                    </div>
                </div>
                <div onClick={sendOTPrequest} className="button">
                    <LayeredButton className={`${buttonisloading && 'disabled'} layered-button`}>
                        {buttonisloading ? <div className="loader"></div> : 'Verify OTP'}
                    </LayeredButton>
                </div>
            </div>
        </div>
    )
}
