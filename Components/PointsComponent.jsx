'use client'
import React, { useEffect } from 'react'
import './PointsComponent.css'
import ViewLink from './ViewLink';
export default function PointsComponent() {
    function autoResizeFont(element, minSize = 10, maxSize = 60) {
        const parentWidth = element.clientWidth;
        let fontSize = maxSize;

        element.style.fontSize = fontSize + "px";

        while (element.scrollWidth > parentWidth && fontSize > minSize) {
            fontSize--;
            element.style.fontSize = fontSize + "px";
        }
    }
    function formatToIndianNumber(num) {
        const str = num.toString();
        const lastThree = str.slice(-3);
        const otherNumbers = str.slice(0, -3);

        if (!otherNumbers) return lastThree;
        const el = document.querySelector('.Points')
        el.innerHTML = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
        autoResizeFont(el)
    }
    useEffect(() => {
        const el = document.querySelector('.Points')

        formatToIndianNumber(6250)
        window.addEventListener("resize", () => autoResizeFont(el));
    }, [])
    return (
        <div className='Points-container'>
            <div className="heading">Points</div>
            <div className="image"></div>
            <div className="Points"></div>
            <ViewLink href={'/Affiliate'}>
                <button>Earn More</button>
            </ViewLink>
        </div>
    )
}
