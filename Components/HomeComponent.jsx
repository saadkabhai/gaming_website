'use client'
import React, { useEffect, useState } from 'react'
import './HomeComponent.css'
import ViewLink from './ViewLink'
import LayeredButton from './LayeredButton'
import { WebsiteURL } from './BASEURL'
export default function HomeComponent(ServerData) {
    const [top3players, settop3players] = useState()
    const isSingleLine = (element) => {
        const style = window.getComputedStyle(element);
        return (
            element.scrollWidth <= element.clientWidth
        );
    };
    const autoResizeFont = (element, minSize, maxSize) => {
        if (!element) return;
        const diffrence = maxSize - minSize
        let optimizesize = minSize
        element.style.fontSize = minSize + 'px';
        for (let index = 0; index < diffrence; index++) {
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
    const adjustfontsize = () => {
        const player = document.querySelectorAll('.Top-3-players .player')
        player.forEach((player) => {
            const name = player.querySelector('.name')
            autoResizeFont(name, 1, 20)
        })
    }
    useEffect(() => {
        adjustfontsize()
        window.addEventListener('resize', adjustfontsize);
    }, [])
    return (
        <div className='HomePageContainer'>
            <div className="section-one">
                <div className="Heading">Welcome to Play2Win</div>
                <div className="Landing-Heading">
                    <h1>Play Games</h1>
                    <h1>& Earn Money</h1>
                    <p>Play2Win is a free gaming platform where players compete in skill-based games to earn points and real rewards. Our top 3 players every month win cash prizes!</p>
                    <ViewLink href={'/Help'}>
                        <LayeredButton shadow_color={'#fff'}>How to Earn</LayeredButton>
                    </ViewLink>
                </div>
            </div>
            <div className="main-section">
                <div className="Featured-Games-container">
                    <div className="Featured-Games-Heading">
                        <p>Featured Games</p>
                    </div>
                    <div className="Games">
                        {/* <ViewLink href={'/G/Chess'} className="Game active" ref={(game) => {
                            if (!game) return;
                            const observer = new IntersectionObserver(
                                ([entry], obs) => {
                                    if (entry.isIntersecting) {
                                        game.classList.add('active');
                                        obs.unobserve(game);
                                    }
                                },
                                { threshold: 0.2 }
                            );

                            observer.observe(game);
                        }}>
                            <img src="/Homechess.png" alt="" />
                            <div className="name">Chess</div>
                        </ViewLink> */}
                        <ViewLink href={'/G/Tic-Tac-Toe'} className="Game active" ref={(game) => {
                            if (!game) return;
                            const observer = new IntersectionObserver(
                                ([entry], obs) => {
                                    if (entry.isIntersecting) {
                                        game.classList.add('active');
                                        obs.unobserve(game);
                                    }
                                },
                                { threshold: 0.2 }
                            );

                            observer.observe(game);
                        }}>
                            <img src="/Hometictac.png" alt="" />
                            <div className="name">Tic-Tac-Toe</div>
                        </ViewLink>
                    </div>
                </div>
                <div className="Top-3-players">
                    <div className="container active" ref={(container) => {
                        if (!container) return;
                        const observer = new IntersectionObserver(
                            ([entry], obs) => {
                                if (entry.isIntersecting) {
                                    container.classList.add('active');
                                    obs.unobserve(container);
                                }
                            },
                            { threshold: 0.2 }
                        );

                        observer.observe(container);
                    }}>
                        <div className="Heading">Top {ServerData.Top3players.length} Players</div>
                        <div className="players">
                            {ServerData.Top3players.map((player, index) => {
                                return (
                                    <div key={index} className="player">
                                        <div className="number">{index + 1}.</div>
                                        <div className="name">{player.Username}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
