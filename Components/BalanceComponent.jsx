'use client'
import React from 'react'
import './BalanceComponent.css'
import LayeredButton from './LayeredButton'
export default function BalanceComponent(Data) {
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
        } else if (Data.Balance < 5) {
            error_container.classList.add('active')
            error_text.innerHTML = '<b>Hey!</b>, The minimum withdrawal amount is <b>$5</b>.'

        }
    }
    return (
        <div className='Balance-conatiner'>
            <div className="error"><div className="text"></div> <button onClick={closeerror}>&#10006;</button></div>
            <div className="logo"></div>
            <div className="Heading">Balance</div>
            <div className="available-balance">
                <p>Available:</p>
                <b>${Data.Balance.toFixed(2)}</b>
            </div>
            <div className="form">
                <div className="inputs">
                    <input type="text" placeholder='Bitcoin Wallet Address' id='address' autoComplete='off' />
                    <input type="number" placeholder='Amount to Widraw' id='amount' autoComplete='off' />
                </div>
                <LayeredButton onClick={sendWithdrawRequest}>Withdraw</LayeredButton>
            </div>
        </div>
    )
}
