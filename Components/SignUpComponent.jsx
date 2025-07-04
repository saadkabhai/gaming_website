'use client'
import React, { useEffect, useState } from 'react'
import './SignUpComponent.css'
import ViewLink from './ViewLink'
import LayeredButton from './LayeredButton'
import { usePathname, useRouter } from 'next/navigation'
import secureStorage from './secureStorage'
import EncryptText from './encryptText'
import { WebsiteURL } from './BASEURL'

export default function SignUpComponent() {
    const [showPassword, setshowPassword] = useState(false)
    const [buttonisloading, setbuttonisloading] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    const isStrongPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()._+=-])[A-Za-z\d!@#$%^&*()._+=-]{8,}$/;
        return regex.test(password);
    };
    const SendRegisterRequest = async () => {
        setbuttonisloading(true)
        const Email = document.getElementById('Email'),
            Username = document.getElementById('Username'),
            Password = document.getElementById('Password'),
            CPassword = document.getElementById('Cpassword'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text'),
            ref = secureStorage.get('ref')
        let should_request = true
        error_container.classList.remove('active')
        if (!Email.value || !Username.value || !Password.value || !CPassword.value) {
            error_text.innerHTML = '<b>Hey</b>, All feilds are required.'
            error_container.classList.add('active')
            should_request = false
        } else if (CPassword.value !== Password.value) {
            error_text.innerHTML = '<b>Hey</b>, Password does not match.'
            error_container.classList.add('active')
            should_request = false
        } else if (!isValidEmail(Email.value)) {
            error_text.innerHTML = '<b>Hey</b>, Enter Valid Email.'
            error_container.classList.add('active')
            should_request = false
        } else if (!isStrongPassword(Password.value)) {
            error_text.innerHTML = '<b>Hey</b>, Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
            error_container.classList.add('active')
            should_request = false
        }
        if (should_request == true) {
            const response = await fetch(`${WebsiteURL}/api/UserRegister`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: Email.value,
                    Username: Username.value,
                    Password: EncryptText.set(Password.value),
                    Ref: ref
                })
            })
            const res = await response.json()
            if (res.message == 'Username is already taken.') {
                error_text.innerHTML = '<b>Hey</b>, Username is already taken.'
                error_container.classList.add('active')
            } else if (res.message == 'Email is already taken.') {
                error_text.innerHTML = '<b>Hey</b>, Email is already taken.'
                error_container.classList.add('active')
            } else if (res.message == 'User registered') {
                secureStorage.set('Username', Username.value)
                secureStorage.set('Email', Email.value)
                secureStorage.set('OTPmessage', `<b>Hey</b>, A code has been sent to <b>${Email.value}</b>. It expires in <b>10 minutes</b>. Check your inbox and spam folder.`)
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        router.push('/OTP');
                    });
                } else {
                    router.push('/OTP');
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
        const parts = pathname.split('/');
        const lastSegment = parts[parts.length - 1];
        if (lastSegment !== 'SignUp') {
            const ref = secureStorage.get('ref')
            if (!ref) {
                secureStorage.set('ref', lastSegment)
            }
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    router.push('/SignUp');
                });
            } else {
                router.push('/SignUp');
            }
        }
    }, [pathname])

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
                            <i className="fa-solid fa-user" style={{ color: '#24282d' }}></i>
                        </div>
                        <input type="text" placeholder='USERNAME' id='Username' autoComplete='off' />
                    </div>
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
                        <input style={{ marginRight: 5 }} type={showPassword ? 'text' : 'password'} placeholder='PASSWORD' id='Password' autoComplete='off' />
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
                        <input type={showPassword ? 'text' : 'password'} placeholder='CONFIRM PASSWORD' id='Cpassword' autoComplete='off' />
                    </div>
                </div>
                <div onClick={SendRegisterRequest} className="button">
                    <LayeredButton className={`${buttonisloading && 'disabled'} layered-button`}>
                        {buttonisloading ? <div className="loader"></div> : 'Sign Up'}
                    </LayeredButton>
                </div>
                <div className="link">
                    <ViewLink href={'/Login'}>
                        <p>Login</p>
                    </ViewLink>
                </div>
            </div>
        </div>
    )
}
