'use client'
import React, { useEffect, useState } from 'react'
import './BalanceComponent.css'
import LayeredButton from './LayeredButton'
import secureStorage from './secureStorage'
import { WebsiteURL } from './BASEURL'
export default function BalanceComponent() {
    const [Balance, setBalance] = useState(0),
        [isloading, setisloading] = useState(true)
    const closeerror = () => {
        const error_container = document.querySelector('.error')
        error_container.classList.remove('active')
    }
    const sendWithdrawRequest = async () => {
        const address = document.getElementById('address'),
            amount = document.getElementById('amount'),
            error_container = document.querySelector('.error'),
            error_text = error_container.querySelector('.text')
        error_container.classList.remove('active')
        if (!amount.value || !address.value) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey!</b>, All fields are required'
        }else if(Balance < 5){
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey!</b>, The minimum withdrawal amount is <b>$5</b>.'

        }
    }
    const fetchBalance = async () => {
        const response = await fetch(`${WebsiteURL}/api/getBalance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: secureStorage.get('Username')
            })
        });
        const res = await response.json()
        setBalance(parseFloat(res.User.Money).toFixed(2));
    }
    useEffect(() => {
        fetchBalance()
        setisloading(false)
    }, [])
    if (isloading == true) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
            </div>
        )
    }
    return (
        <div className='Balance-conatiner'>
            <div className="error"><div className="text"></div> <button onClick={closeerror}>&#10006;</button></div>
            <div className="logo"></div>
            <div className="Heading">Balance</div>
            <div className="available-balance">
                <p>Available:</p>
                <b>${Balance}</b>
            </div>
            <div className="form">
                <div className="inputs">
                    <input type="text" placeholder='Bitcoin Wallet Address' id='address' autoComplete='off'/>
                    <input type="number" placeholder='Amount to Widraw' id='amount' autoComplete='off'/>
                </div>
                <LayeredButton onClick={sendWithdrawRequest}>Withdraw</LayeredButton>
            </div>
        </div>
    )
}
