'use client'
import React, { useEffect, useMemo, useState } from 'react'
import './AffiliateComponent.css'
import secureStorage from './secureStorage';
import { WebsiteURL } from './BASEURL';
export default function AffiliateComponent() {
  const [Username, setUsername] = useState(),
    [isloading, setisloading] = useState(true),
    [Refferrals, setRefferrals] = useState([])
  function copyText(e) {
    const text = `http://localhost:3000/SignUp/${Username}`;
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
          fallbackCopy(text); // fallback method
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
    textarea.style.position = "fixed"; // prevent scroll
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
    setUsername(secureStorage.get('Username'))
    const fetchrefferrals = async () => {
      const Refferralsres = await fetch(`${WebsiteURL}/api/getrefferrals?Username=${secureStorage.get('Username')}`),
        Refferrals = await Refferralsres.json()
      setRefferrals(Refferrals.Reffrerrals)
    }
    fetchrefferrals()
    setisloading(false)
    window.addEventListener('resize', adjustfontsize);
  }, [])
  useMemo(() => {
    if (isloading == false) {
      setTimeout(() => {
        adjustfontsize()
      }, 10);
    }
  }, [isloading, Refferrals])
  if (isloading == true) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    )
  }
  return (
    <div className='affiliate-container'>
      <div className="Heading">Affiliate Dashbord</div>
      <div className="info">
        <div className="code-container">
          <div className="code">http://localhost:3000/SignUp/{Username}</div>
          <button onClick={(e) => copyText(e)}>Copy</button>
        </div>
        <div className="note">
          <p>You’ll earn 50% of the points your referred users earn.</p>
        </div>
        <div className="Referrals-conatiner">
          <div className="ref-heading">Your Referrals</div>
          <div className="Referrals">
            {Refferrals.length > 0 ? (
              Refferrals.map((Refferral, index) => {
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
