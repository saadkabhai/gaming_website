'use client'
import React, { useEffect } from 'react'
import './LeaderboadrComponent.css'
export default function LeaderboadrComponent(Serverleaderboard) {
  function formatToShortNumber(num) {
    const truncate = (n, digits) => {
      const factor = 10 ** digits;
      return Math.floor(n * factor) / factor;
    };
    if (num >= 1_000_000_000) return truncate(num / 1_000_000_000, 1).toString().replace(/\.0$/, '') + 'B';
    if (num >= 1_000_000) return truncate(num / 1_000_000, 1).toString().replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return truncate(num / 1_000, 1).toString().replace(/\.0$/, '') + 'K';
    return num.toString();
  }

  const isSingleLine = (element) => {
    const style = window.getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    return (
      element.scrollWidth <= element.clientWidth
    );
  };
  const autoResizeFont = (parentelement, element, minSize, maxSize) => {
    if (!element) return;
    const diffrence = maxSize - minSize
    let optimizesize = minSize
    element.style.fontSize = minSize + 'px';
    for (let index = 0; index < diffrence; index++) {
      const fontSize = parseInt(element.style.fontSize);
      element.style.fontSize = fontSize + 1 + 'px';
      if (isSingleLine(parentelement)) {
        optimizesize = fontSize + 1
      } else {
        element.style.fontSize = optimizesize + 'px';
        return
      }
    }
  };
  const adjustfontsize = () => {
    const player = document.querySelectorAll('.player')
    player.forEach((player) => {
      const name = player.querySelector('.UserName')
      autoResizeFont(player, name, 1, 30)
    })
  }
  useEffect(() => {
    adjustfontsize()
    setTimeout(() => {
      const current_player_div = document.querySelector('.current-player')
      if (current_player_div) {
        const distanceFromTop = current_player_div.getBoundingClientRect().top + window.pageYOffset - 85;
        window.scrollTo({
          top: distanceFromTop,
          behavior: 'smooth'
        });
      }
    }, 500);
    window.addEventListener('resize', adjustfontsize);
  }, [])
  return (
    <div className='Leader-board-container'>
      <div className="Heading">Leaderboard</div>
      <div className="image"></div>
      <div className="players">
        {Serverleaderboard.Leaderboard &&
          Serverleaderboard.Leaderboard.map((user, index) => {
            return (
              // <motion.div key={index} whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.3 }} className={`player ${Username == user.Username && 'current-player'} `}>
              <div key={index} className={`player ${Serverleaderboard.Status == 'LoggedIn' && user.Username == Serverleaderboard.Username && 'current-player'}`}>
                <div className="first-sec">
                  <div className="Position">{index + 1}</div>
                  <div className="UserName">{user.Username}</div>
                </div>
                <div className="Points">{formatToShortNumber(user.Points)}</div>
              </div>
              // {/* </motion.div> */ }
            )
          })}
      </div>
    </div>
  )
}
