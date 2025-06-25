'use client'
import React, { useEffect} from 'react'
import './AffiliateComponent.css'
export default function AffiliateComponent(Data) {
  function copyText(e) {
    const text = `http://localhost:3000/SignUp/${Data.Status == 'LoggedIn' ? Data.Username : 'None'}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          e.target.innerHTML = "Copied";
          setTimeout(() => {
            e.target.innerHTML = "Copy";
          }, 1500);
        })
        .catch(err => {
          console.error("Clipboard error:", err);
          fallbackCopy(text);
        });
    } else {
      const status = fallbackCopy(text);
      if (status == true) {
        e.target.innerHTML = "Copied";
        setTimeout(() => {
          e.target.innerHTML = "Copy";
        }, 1500);
      }
    }
  }
  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let status
    try {
      document.execCommand("copy");
      status = true
    } catch (err) {
      status = false
    }
    document.body.removeChild(textarea);
    if (status == true) {
      return true
    } else {
      return false
    }
  }
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
    const Users = document.querySelectorAll('.referral')
    Users.forEach((User) => {
      const name = User.querySelector('.name')
      autoResizeFont(name, 1, 18)
    })
  }
  useEffect(() => {
    adjustfontsize()
    window.addEventListener('resize', adjustfontsize);
  }, [])
  return (
    <div className='affiliate-container'>
      <div className="Heading">Affiliate Dashbord</div>
      <div className="info">
        <div className="code-container">
          <div className="code">http://localhost:3000/SignUp/{Data.Status == 'LoggedIn' ? Data.Username : 'None'}</div>
          <button onClick={(e) => copyText(e)}>Copy</button>
        </div>
        <div className="note">
          <p>You’ll earn 50% of the points your referred users earn.</p>
        </div>
        <div className="Referrals-conatiner">
          <div className="ref-heading">Your Referrals</div>
          <div className="Referrals">
            {Data.Refferrals.Reffrerrals.length > 0 ? (
              Data.Refferrals.Reffrerrals.map((Refferral, index) => {
                return (
                  < div className="referral" key={index}>
                    <div className="first-sec">
                      <div style={{ backgroundColor: Refferral.Color }} className="Profile-avatar">{Refferral.Username[0].toUpperCase()}</div>
                      <div className="name"><p>{Refferral.Username}</p></div>
                    </div>
                    <div className="second-sec">
                      <div className="date">{Refferral.CreatedAt}</div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="not-found">You don’t have any referrals yet.</div>
            )}
          </div>
        </div>
      </div>
    </div >
  )
}
