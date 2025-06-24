'use client'
import React, { useEffect, useState } from 'react'
import './SignUpComponent.css'
import LayeredButton from './LayeredButton'
import secureStorage from './secureStorage'
import EncryptText from './encryptText'
import { useRouter } from 'next/navigation'
import { ServerURL } from './BASEURL'

export default function SignUpComponent() {
    const [showPassword, setshowPassword] = useState(false)
    const [buttonisloading, setbuttonisloading] = useState(false)
    const router = useRouter()
    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()._+=-])[A-Za-z\d!@#$%^&*()._+=-]{8,}$/;
        return regex.test(password);
    };
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
    const sendpasswordchangerequest = async () => {
        setbuttonisloading(true)
        const password = document.getElementById('newpassword'),
            cpassword = document.getElementById('cnewpassword'),
            code = document.getElementById('code'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text'),
            Email = secureStorage.get('Email')
        error_container.classList.remove('active')
        let should_request = true
        if (!password.value || !cpassword.value || !code.value) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey</b>, All feilds are required.'
            should_request = false
        } else if (password.value !== cpassword.value) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey</b>, Password does not match.'
            should_request = false
        } else if (!isStrongPassword(password.value)) {
            error_text.innerHTML = '<b>Hey</b>, Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
            error_container.classList.add('active')
            should_request = false
        } else if (code.value.length < 6) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey</b>, Code should be <b>6 characters long</b>.'
            should_request = false
        }
        if (should_request == true) {
            const res = await fetchWithRetry(`${ServerURL}/ChangePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: Email,
                    Code: code.value,
                    Password: EncryptText.set(password.value)
                })
            })
            if (res.message == 'A new OTP has been sent because the previous one expired.') {
                error_container.classList.add('active')
                error_text.innerHTML = `<b>Hey</b>, We've sent a new OTP to <b>${res.Email}</b>. Check your inbox and Spam folder. The previous code has expired.`
            } else if (res.message == 'Invalid.') {
                error_container.classList.add('active')
                error_text.innerHTML = `<b>Hey</b>, The code you entered is invalid. Please check and try again.`
            } else if (res.message == 'Login to continue.') {
                secureStorage.set('Loginmessage', '<b>Hey</b>, Login to continue.')
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
    const closeerror = () => {
        const error_container = document.querySelector('.error')
        error_container.classList.remove('active')
    }
    useEffect(() => {
        const OTPmessage = secureStorage.get('CPmessage'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text')
        if (OTPmessage) {
            error_container.classList.add('active')
            error_text.innerHTML = OTPmessage
            secureStorage.remove('CPmessage')
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
                    <img src="/logo.png" alt="" />
                    <div className="name">PLAY2WIN</div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-lock-keyhole" style={{ color: '#24282d', marginTop: 4 }}></i>
                        </div>
                        <input style={{ fontSize: 18 }} type={showPassword ? 'text' : 'password'} placeholder='NEW PASSWORD' id='newpassword' autoComplete='off' />
                        <div className="show-password" onClick={() => {
                            if (!showPassword) {
                                setshowPassword(true)
                            } else {
                                setshowPassword(false)
                            }
                        }}>{showPassword ? 'HIDE' : 'SHOW'}</div>
                    </div>
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-lock-keyhole" style={{ color: '#24282d', marginTop: 4 }}></i>
                        </div>
                        <input type={showPassword ? 'text' : 'password'} placeholder='CONFIRM PASSWORD' id='cnewpassword' autoComplete='off' />
                    </div>
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-lock-keyhole" style={{ color: '#24282d' }}></i>
                        </div>
                        <input type="number" placeholder='CODE' id='code' autoComplete='off' />
                    </div>
                </div>
                <div className="button" onClick={sendpasswordchangerequest}>
                    <LayeredButton className={`${buttonisloading && 'disabled'} layered-button`}>
                        {buttonisloading ? <div className="loader"></div> : 'Change'}
                    </LayeredButton>
                </div>
            </div>
        </div>
    )
}
