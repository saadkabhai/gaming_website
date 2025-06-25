'use client'
import React, { useEffect, useState } from 'react'
import './SignUpComponent.css'
import ViewLink from './ViewLink'
import LayeredButton from './LayeredButton'
import secureStorage from './secureStorage'
import { useRouter } from 'next/navigation'
import { useAuth } from './authContext'
import { ServerURL, WebsiteURL } from './BASEURL'

export default function LoginComponent() {
    const [showPassword, setshowPassword] = useState(false)
    const [buttonisloading, setbuttonisloading] = useState(false)
    const { setIsLoggedIn } = useAuth();
    const router = useRouter()
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
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
    const sendloginrequest = async () => {
        setbuttonisloading(true)
        const Email = document.getElementById('Email'),
            Password = document.getElementById('password'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text')
        let should_request = true
        error_container.classList.remove('active')
        if (!Email.value || !Password.value) {
            error_text.innerHTML = '<b>Hey</b>, All feilds are required.'
            error_container.classList.add('active')
            should_request = false
        }
        else if (!isValidEmail(Email.value)) {
            error_text.innerHTML = '<b>Hey</b>, Enter Valid Email.'
            error_container.classList.add('active')
            should_request = false
        } else if (!isStrongPassword(Password.value)) {
            error_text.innerHTML = '<b>Hey</b>, Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
            error_container.classList.add('active')
            should_request = false
        }
        if (should_request == true) {
            const res = await fetchWithRetry(`${ServerURL}/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: Email.value,
                    Password: Password.value
                })
            })
            if (res.message == 'Code send') {
                secureStorage.set('OTPmessage', `<b>Hey</b>, A verification code has been sent to <b>${Email.value}</b>. Enter it below to confirm your address.`)
                secureStorage.set('Email', Email.value)
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        router.push('/OTP');
                    });
                } else {
                    router.push('/OTP');
                }
            } else if (res.message == 'Invalid Credentials.') {
                error_text.innerHTML = '<b>Hey</b>, Invalid Credentials.'
                error_container.classList.add('active')
            } else if (res.message == 'The email you entered is not associated with any account.') {
                error_text.innerHTML = '<b>Hey</b>, The email you entered is not associated with any account.'
                error_container.classList.add('active')

            } else if (res.message == 'Successful.') {
                secureStorage.set('Email', Email.value)
                secureStorage.set('Color', res.Color)
                const params = new URLSearchParams({
                    status: 'LoggedIn',
                    Username: res.Username,
                    Email: Email.value,
                    Color: res.Color
                });
                await fetch(`${WebsiteURL}/api/setcookie?${params.toString()}`);
                setIsLoggedIn(true);
                return
            }
        }
        setbuttonisloading(false)
    }
    const closeerror = () => {
        const error_container = document.querySelector('.error')
        error_container.classList.remove('active')
    }
    useEffect(() => {
        const Loginmessage = secureStorage.get('Loginmessage'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text')
        if (Loginmessage) {
            error_container.classList.add('active')
            error_text.innerHTML = Loginmessage
            secureStorage.remove('Loginmessage')
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
                            <i className="fa-solid fa-envelope" style={{ color: '#24282d', marginTop: 4 }}></i>
                        </div>
                        <input type="email" placeholder='EMAIL' id='Email' autoComplete='off' />
                    </div>
                    <div className="input">
                        <div className="icon">
                            <i className="fa-solid fa-lock-keyhole" style={{ color: '#24282d', marginTop: 4 }}></i>
                        </div>
                        <input type={showPassword ? 'text' : 'password'} placeholder='PASSWORD' id='password' autoComplete='off' />
                        <div className="show-password" onClick={() => {
                            if (!showPassword) {
                                setshowPassword(true)
                            } else {
                                setshowPassword(false)
                            }
                        }}>{showPassword ? 'HIDE' : 'SHOW'}</div>
                    </div>
                </div>
                <div className="button" onClick={sendloginrequest}>
                    <LayeredButton className={`${buttonisloading && 'disabled'} layered-button`}>
                        {buttonisloading ? <div className="loader"></div> : 'Login'}
                    </LayeredButton>
                </div>
                <div className="link">
                    <ViewLink href={'/FPE'}>
                        <p>Forgot Password</p>
                    </ViewLink>
                </div>
                <div style={{ marginTop: 0 }} className="link">
                    <ViewLink href={'/SignUp'}>
                        <p>Sign Up</p>
                    </ViewLink>
                </div>
            </div>
        </div>
    )
}
