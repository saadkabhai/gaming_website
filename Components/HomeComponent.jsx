'use client'
import React, { useEffect, useState } from 'react'
import './HomeComponent.css'
import ViewLink from './ViewLink'
import LayeredButton from './LayeredButton'
import { WebsiteURL } from './BASEURL'
export default function HomeComponent() {
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
    const fetchtop3players = async () => {
        const viewportWidth = window.innerWidth;
        if (viewportWidth > 989) {
            const Top3playersres = await fetch(`${WebsiteURL}/api/getTop3users`),
                Top3players = await Top3playersres.json()
            settop3players(Top3players.Top3)

        }
    }
    useEffect(() => {
        adjustfontsize()
        fetchtop3players()
        window.addEventListener('resize', adjustfontsize);
    }, [])
    return (
        <div className='HomePageContainer'>
            <div className="section-one">
                <div className="Landing-Heading">
                    <h1>Play Games</h1>
                    <h1>& Earn Money</h1>
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
                        <ViewLink href={'/G/Chess'} className="Game" ref={(game) => {
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
                        </ViewLink>
                        <ViewLink href={'/G/Tic-Tac-Toe'} className="Game" ref={(game) => {
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
                {top3players && (
                    <div className="Top-3-players">
                        <div className="container" ref={(container) => {
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
                            <div className="Heading">Top {top3players.length} Players</div>
                            <div className="players">
                                {top3players.map((player, index) => {
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

                )
                }
            </div>
        </div>
    )
}
