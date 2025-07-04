'use client'
import React, { useEffect, useMemo, useState } from 'react'
import './NavbarComponent.css'
import { usePathname, useRouter } from 'next/navigation'
import ViewLink from './ViewLink'
import { useAuth } from './authContext'
import secureStorage from './secureStorage'
import { WebsiteURL } from './BASEURL'
import EncryptText from './encryptText'
export default function NavbarComponent(data) {
    const { isLoggedIn, setIsLoggedIn, PointsToAdd, setPointsToAdd } = useAuth(),
        [isloaggedIn, setisloaggedIn] = useState(false),
        [CSRisloaggedIn, setCSRisloaggedIn] = useState(false),
        [Username, setUsername] = useState(),
        [Email, setEmail] = useState(),
        [Color, setColor] = useState(),
        [Points, setPoints] = useState(),
        [CSRPoints, setCSRPoints] = useState(false),
        pathname = usePathname(),
        router = useRouter()
    const menuopenclose = (e) => {
        const slash_container = document.querySelector('.slash-container'),
            menu_container = document.querySelector('.menu-container'),
            body = document.querySelector('body'),
            firstClass = e.target.className.split(' ')[0];
        if (firstClass == 'menu-slash' || firstClass == 'linktext' || firstClass == 'menu-container') {
            if (!menu_container.classList.contains('active')) {
                slash_container.classList.add('halfactive')
                menu_container.classList.add('active')
                body.style.overflow = 'hidden'
                setTimeout(() => {
                    slash_container.classList.add('active')
                }, 100);
            } else {
                slash_container.classList.remove('active')
                menu_container.classList.remove('active')
                body.style.overflowY = 'auto'
                setTimeout(() => {
                    slash_container.classList.remove('halfactive')
                }, 100);
            }
        }
    }
    const user_panel_open_close = (e) => {
        const user_panel_container = document.querySelector('.User-panel-conatiner'),
            firstClass = e.target.className.split(' ')[0],
            body = document.querySelector('body')
        if (firstClass == 'open-user-panel') {
            user_panel_container.classList.add('active')
            body.style.overflow = 'hidden'
        } else if (firstClass == 'close-user-panel') {
            user_panel_container.classList.remove('active')
            body.style.overflowY = 'auto'
        }
    }
    const formatToShortNumber = (num) => {
        return new Intl.NumberFormat('en-IN').format(num);
    }
    const isSingleLine = (element) => {
        const style = window.getComputedStyle(element);
        const lineHeight = parseFloat(style.lineHeight);
        return (
            element.scrollWidth <= element.clientWidth
        );
    };
    const autoResizeFont = (element, minSize, maxSize) => {
        if (!element) return;
        const diffrence = maxSize - minSize
        let optimizesize = minSize
        element.style.fontSize = minSize + 'px';
        for (let index = 1; index < diffrence; index++) {
            const fontSize = parseInt(element.style.fontSize);
            element.style.fontSize = fontSize + 1 + 'px';
            if (isSingleLine(element)) {
                optimizesize = fontSize + 1
            } else {
                element.style.fontSize = optimizesize + 'px';
                return
            }
        }
    };
    const checkLogin = async () => {
        try {
            const response = await fetch(`${WebsiteURL}/api/getStatus`),
                res = await response.json(),
                EncryptedStatus = res.Status,
                Status = EncryptText.get(EncryptedStatus)
            if (Status == 'LoggedIn') {
                const Userinfo = await fetch(`${WebsiteURL}/api/getUserinfo`),
                    DecryptedUsername = EncryptText.get(Userinfo.Username),
                    DecryptedEmail = EncryptText.get(Userinfo.Email),
                    DecrytedColor = EncryptText.get(Userinfo.Color)
                setUsername(DecryptedUsername)
                setEmail(DecryptedEmail)
                setColor(DecrytedColor)
                setisloaggedIn(true);
                fetchPoints()
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        router.push('/');
                    });
                } else {
                    router.push('/');
                }
            }
        } catch (err) {
            console.error('Failed to fetch login status:', err);
        }
    };
    const fetchPoints = async () => {
        const Pointsres = await fetch(`${WebsiteURL}/api/getPoints?Email=${secureStorage.get('Email')}`),
            User = await Pointsres.json()
        setPoints(User.Points)
        setCSRPoints(true)
    }
    const logout = () => {
        const User_panel = document.querySelector('.User-panel-conatiner')
        User_panel.classList.remove('active')
        setTimeout(async () => {
            setIsLoggedIn(false)
            await fetch(`${WebsiteURL}/api/setcookie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'None' })
            });
            router.refresh()
            setCSRisloaggedIn(true)
            setisloaggedIn(false);
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    router.push('/Login');
                });
            } else {
                router.push('/Login');
            }
        }, 500);
    }
    const addPoints = async (Points) => {
        await fetch(`${WebsiteURL}/api/addPoints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: Username ? Username : data.Username,
                Points: Points
            })
        });
        fetchPoints()
    }
    const setcookie = async () => {
        await fetch(`${WebsiteURL}/api/setcookie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'None' })
        });
        secureStorage.set('Loginmessage', '<b>Hey</b>, Password changed. Please log in again.')
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                router.push('/Login');
            });
        } else {
            router.push('/Login');
        }
    }
    useEffect(() => {
        if (data.Status == 'PasswordChange') {
            setcookie()
        }
        const Gems = document.querySelector('.User-panel .Gems')
        if (Gems) {
            autoResizeFont(Gems, 1, 20)
            window.addEventListener('resize', () => autoResizeFont(Gems, 1, 20));
        }
    }, [])
    useMemo(() => {
        if (typeof window !== 'undefined') {
            document.body.style.overflowY = 'auto';
        }
    }, [pathname])
    useMemo(async () => {
        if (isLoggedIn) {
            setCSRisloaggedIn(true)
            checkLogin()
        }
    }, [isLoggedIn])
    useMemo(() => {
        if (PointsToAdd > 0) {
            const status = CSRisloaggedIn == false ? data.Status == 'LoggedIn' : isloaggedIn
            if (status) {
                addPoints(PointsToAdd)
            }
            setTimeout(() => {
                setPointsToAdd(0)
            }, 500);
        }
    }, [PointsToAdd])
    return (
        <div className="navbar-container">
            <div className='navbar'>
                <div className="logo">
                    <div className="image">
                    </div>
                    <div className="name">
                        PLAY2WIN
                    </div>
                </div>
                <div className="links">
                    <div className={`link ${pathname == '/' ? 'active' : ''}`}>
                        <ViewLink href={'/'}>
                            <p>Home</p>
                            <div className="slash"></div>
                        </ViewLink>
                    </div>
                    <div className={`link ${pathname == '/Games' ? 'active' : ''}`}>
                        <ViewLink href={'/Games'}>
                            <p>Games</p>
                            <div className="slash"></div>
                        </ViewLink>
                    </div>
                    {CSRisloaggedIn == false ? (
                        data.Status == 'LoggedIn' ? (
                            <div className={`link ${pathname == '/Affiliate' ? 'active' : ''}`}>
                                <ViewLink href={'/Affiliate'}>
                                    <p>Affiliate</p>
                                    <div className="slash"></div>
                                </ViewLink>
                            </div>
                        ) : ''
                    ) : isloaggedIn ? (
                        <div className={`link ${pathname == '/Affiliate' ? 'active' : ''}`}>
                            <ViewLink href={'/Affiliate'}>
                                <p>Affiliate</p>
                                <div className="slash"></div>
                            </ViewLink>
                        </div>
                    ) : ''}
                    {CSRisloaggedIn == false ? (
                        data.Status == 'LoggedIn' ? (
                            <div className={`link ${pathname == '/Leaderboard' ? 'active' : ''}`}>
                                <ViewLink href={'/Leaderboard'}>
                                    <p>Leaderboard</p>
                                    <div className="slash"></div>
                                </ViewLink>
                            </div>
                        ) : ''
                    ) : isloaggedIn ? (
                        <div className={`link ${pathname == '/Leaderboard' ? 'active' : ''}`}>
                            <ViewLink href={'/Leaderboard'}>
                                <p>Leaderboard</p>
                                <div className="slash"></div>
                            </ViewLink>
                        </div>
                    ) : ''}
                    <div className={`link ${pathname == '/Help' ? 'active' : ''}`}>
                        <ViewLink href={'/Help'}>
                            <p>Help</p>
                            <div className="slash"></div>
                        </ViewLink>
                    </div>
                    <div className={`link ${pathname == '/PrivacyPolicy' ? 'active' : ''}`}>
                        <ViewLink href={'/PrivacyPolicy'}>
                            <p>Privacy Policy</p>
                            <div className="slash"></div>
                        </ViewLink>
                    </div>
                    <div className={`link ${pathname == '/ContactUs' ? 'active' : ''}`}>
                        <ViewLink href={'/ContactUs'}>
                            <p>Contact Us</p>
                            <div className="slash"></div>
                        </ViewLink>
                    </div>
                    <div className={`link ${pathname == '/AboutUs' ? 'active' : ''}`}>
                        <ViewLink href={'/AboutUs'}>
                            <p>About Us</p>
                            <div className="slash"></div>
                        </ViewLink>
                    </div>
                    {CSRisloaggedIn == false ? (
                        data.Status !== 'LoggedIn' ? (
                            <div className="link">
                                <ViewLink href="/SignUp">
                                    <button className="join-now-button">Join Now</button>
                                </ViewLink>
                            </div>
                        ) : (
                            <div className="link">
                                <button
                                    style={{ backgroundColor: Color || data.Color }}
                                    onClick={user_panel_open_close}
                                    className="open-user-panel Profile-avatar"
                                >
                                    {(Username || data.Username)[0].toUpperCase()}
                                </button>
                            </div>
                        )
                    ) : !isloaggedIn ? (
                        <div className="link">
                            <ViewLink href="/SignUp">
                                <button className="join-now-button">Join Now</button>
                            </ViewLink>
                        </div>
                    ) : (
                        <div className="link">
                            <button
                                style={{ backgroundColor: Color || data.Color }}
                                onClick={user_panel_open_close}
                                className="open-user-panel Profile-avatar"
                            >
                                {(Username || data.Username)[0].toUpperCase()}
                            </button>
                        </div>
                    )}
                </div>
                <div className="mobile-navbar">
                    {CSRisloaggedIn == false ? (
                        data.Status == 'LoggedIn' ? (
                            <button style={{ backgroundColor: Color ? Color : data.Color }} onClick={user_panel_open_close} className='open-user-panel Profile-avatar'>{Username ? Username[0].toUpperCase() : data.Username[0].toUpperCase()}</button>
                        ) : ''
                    ) : isloaggedIn ? (
                        <button style={{ backgroundColor: Color ? Color : data.Color }} onClick={user_panel_open_close} className='open-user-panel Profile-avatar'>{Username ? Username[0].toUpperCase() : data.Username[0].toUpperCase()}</button>
                    ) : ''}
                    <div className="menu-button">
                        <div onClick={menuopenclose} className="slash-container">
                            <div className="menu-slash slash-one"></div>
                            <div className="menu-slash slash-two"></div>
                            <div className="menu-slash slash-three"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={menuopenclose} className="menu-container">
                <div className="menu">
                    <div className="links">
                        <div className={`link ${pathname == '/' ? 'active' : ''}`}>
                            <ViewLink href={'/'}>
                                <p className='linktext'>Home</p>
                            </ViewLink>
                        </div>
                        <div className={`link ${pathname == '/Games' ? 'active' : ''}`}>
                            <ViewLink href={'/Games'}>
                                <p className='linktext'>Games</p>
                            </ViewLink>
                        </div>
                        {CSRisloaggedIn == false ? (
                            data.Status == 'LoggedIn' ? (
                                <div className={`link ${pathname == '/Affiliate' ? 'active' : ''}`}>
                                    <ViewLink href={'/Affiliate'}>
                                        <p className='linktext'>Affiliate</p>
                                    </ViewLink>
                                </div>
                            ) : ''
                        ) : isloaggedIn ? (
                            <div className={`link ${pathname == '/Affiliate' ? 'active' : ''}`}>
                                <ViewLink href={'/Affiliate'}>
                                    <p className='linktext'>Affiliate</p>
                                </ViewLink>
                            </div>
                        ) : ''}
                        {CSRisloaggedIn == false ? (
                            data.Status == 'LoggedIn' ? (
                                <div className={`link ${pathname == '/Leaderboard' ? 'active' : ''}`}>
                                    <ViewLink href={'/Leaderboard'}>
                                        <p className='linktext'>Leaderboard</p>
                                    </ViewLink>
                                </div>
                            ) : ''
                        ) : isloaggedIn ? (
                            <div className={`link ${pathname == '/Leaderboard' ? 'active' : ''}`}>
                                <ViewLink href={'/Leaderboard'}>
                                    <p className='linktext'>Leaderboard</p>
                                </ViewLink>
                            </div>
                        ) : ''}

                        <div className={`link ${pathname == '/Help' ? 'active' : ''}`}>
                            <ViewLink href={'/Help'}>
                                <p className='linktext'>Help</p>
                            </ViewLink>
                        </div>
                        <div className={`link ${pathname == '/PrivacyPolicy' ? 'active' : ''}`} style={{ marginBottom: 5 }}>
                            <ViewLink href={'/PrivacyPolicy'}>
                                <p className='linktext'>Privacy Policy</p>
                            </ViewLink>
                        </div>
                        <div className={`link ${pathname == '/ContactUs' ? 'active' : ''}`} style={{ marginBottom: 5 }}>
                            <ViewLink href={'/ContactUs'}>
                                <p className='linktext'>Contact Us</p>
                            </ViewLink>
                        </div>
                        <div className={`link ${pathname == '/AboutUs' ? 'active' : ''}`} style={{ marginBottom: 5 }}>
                            <ViewLink href={'/AboutUs'}>
                                <p className='linktext'>About Us</p>
                            </ViewLink>
                        </div>
                        {CSRisloaggedIn == false ? (
                            data.Status !== 'LoggedIn' ? (
                                <div className="link">
                                    <ViewLink href={'/SignUp'}>
                                        <button className='linktext'>Join Now</button>
                                    </ViewLink>
                                </div>
                            ) : ''
                        ) : !isloaggedIn ? (
                            <div className="link">
                                <ViewLink href={'/SignUp'}>
                                    <button className='linktext'>Join Now</button>
                                </ViewLink>
                            </div>
                        ) : ''}
                    </div>
                </div>
            </div>
            {isloaggedIn == true || data.Status == 'LoggedIn' ? (
                <div className="close-user-panel User-panel-conatiner" onClick={user_panel_open_close}>
                    <div className="User-panel">
                        <div className="close-user-panel Cross">&#10006;</div>
                        <div className="email">{Email ? Email : data.Email}</div>
                        <div className="Gems">
                            <img src="https://raw.githubusercontent.com/saadkabhai/gaming_website/0321813/public/Gems.png" alt="" />
                            <p className="score">{formatToShortNumber(CSRPoints == false ? data.Points : Points)}</p>
                        </div>
                        <div style={{ backgroundColor: Color ? Color : data.Color }} className="profile-avatar">{Username ? Username[0].toUpperCase() : data.Username[0].toUpperCase()}</div>
                        <div className="Username">Hi, {Username ? Username : data.Username}</div>
                        <div className="buttons">
                            <button className='logout-button' onClick={logout}>Logout</button>
                            <ViewLink delay={500} href={'/Balance'} className='balance-button'>
                                <button onClick={user_panel_open_close} className='close-user-panel'>Balance</button>
                            </ViewLink>
                        </div>
                    </div>
                </div>
            ) : ''}
        </div>
    )
}