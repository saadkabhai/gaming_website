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
      <div className="Games">
        <ViewLink href={'/G/Chess'} className="Game active" ref={(game) => {
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
            <img src="/Gameschess.png" alt="Chess game thumbnail" />
          </div>
          <div className="name">Chess</div>
        </ViewLink>
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
            <img src="/Gamestic-tac.png" alt="Tic Tac Toe game thumbnail" />
          </div>
          <div className="name">Tic-Tac-Toe</div>
        </ViewLink>
      </div>
      <div className="Note">
        <div className="Heading"><h1>Why Play Our Games?</h1></div>
        <p style={{ fontSize: 18, marginTop: 10 }}>Our games are thoughtfully designed to be simple, fun, and accessible on any device, whether you enjoy deep strategic thinking or quick, casual gameplay. Challenge yourself with Chess, a timeless strategy game that has engaged players for centuries, offering endless possibilities to improve your skills. Or dive into fast-paced matches of Tic-Tac-Toe, perfect for sharpening your tactical thinking in quick rounds.</p>
        <p style={{ fontSize: 18, marginTop: 10 }}>At Play2Win, we believe skill and fair competition should be at the heart of gaming. That’s why all our games are completely free to play — but sign-up is required to track your progress and participate in monthly cash prize competitions. As you compete and win games, you earn points and compete against other players to secure a spot in the top 3 every month, winning real cash prizes. This competitive system rewards dedication and talent, giving you a chance to earn while having fun.</p>
        <p style={{ fontSize: 18, marginTop: 10 }}>Join a growing community of gamers who value fairness, transparency, and real rewards. Whether you are a casual player looking for entertainment or a competitive gamer aiming to dominate the leaderboard, Play2Win offers a safe and engaging platform to test your skills and enjoy thrilling competition.</p>
        <p style={{ fontSize: 18, marginTop: 10 }}>With easy access on any device, you can play anytime, anywhere. Sign up today, improve your strategies, and aim for the top to become one of Play2Win’s monthly cash prize winners. Every move counts on your path to victory and rewards!</p>
      </div>
    </div>
  )
}
