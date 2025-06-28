'use client'
import React, { useEffect } from 'react'
import './GamesComponent.css'
import ViewLink from './ViewLink';
import ServerURL from './BASEURL';
export default function GamesComponent() {
  const isSingleLine = (element) => {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    return (
      element.scrollHeight <= lineHeight * 1.2 &&
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
    const Games = document.querySelectorAll('.Game')
    Games.forEach((Game) => {
      const name = Game.querySelector('.name')
      autoResizeFont(name, 15, 20)
    })
  }
  useEffect(() => {

    adjustfontsize()
    window.addEventListener('resize', adjustfontsize);
  }, [])
  return (
    <div className='Games-container'>
      <div className="Heading">Games</div>
      <div className="Heading" style={{fontSize:18}}>Welcome to Play2Win Games! Below are a selection of casual games designed to entertain and challenge your brain. Click on any game to start playing instantly.</div>
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
          <div className="image">
            <img src="/Gameschess.png" alt="" />
          </div>
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
          <div className="image">
            <img src="/Gamestic-tac.png" alt="" />
          </div>
          <div className="name">Tic-Tac-Toe</div>
        </ViewLink>
      </div>
    </div>
  )
}
