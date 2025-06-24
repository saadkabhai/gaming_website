'use client'
import React, { useEffect, useMemo, useState } from 'react'
import './TictactoeComponent.css'
import ViewLink from '../ViewLink'
import secureStorage from '../secureStorage'
import { useAuth } from '../authContext'
import { WebsiteURL } from '../BASEURL'
export default function TictactoeComponent() {
    const [gameState, setgameState] = useState(['', '', '', '', '', '', '', '', ''])
    const { setPointsToAdd } = useAuth()
    const [gameActive, setgameActive] = useState(true)
    const [currentPlayer, setcurrentPlayer] = useState('X')
    const [result, setresult] = useState(null)
    const [Gems, setGems] = useState(null)
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    function handleClick(e) {
        const index = e.target.dataset.index;
        if (!gameActive) {
            const result_container = document.querySelector('.result-container'),
                body = document.querySelector('body')
            result_container.classList.add('active')
            body.style.overflow = 'hidden'
        }
        if (gameState[index] !== '' || !gameActive || currentPlayer !== 'X') return;
        const updatedState = [...gameState];
        updatedState[index] = 'X';
        setgameState(updatedState);
        const img = document.createElement('img');
        img.style.transition = '0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        img.style.transform = 'scale(0)';
        img.src = `/cross.png`;
        e.target.appendChild(img);
        setTimeout(() => {
            img.style.transform = 'scale(1)';
        }, 10);

        if (checkWinner('X', updatedState)) {
            setgameActive(false);
        } else if (!updatedState.includes('')) {
            setgameActive(false);
            restartGame(true)
        } else {
            setcurrentPlayer('O')
            setTimeout(() => computerMove(updatedState), 500);
        }
    }
    function checkWinner(player, state) {
        for (const combo of winningCombos) {
            if (combo.every(i => state[i] === player)) {
                showStrike(combo);
                setTimeout(async () => {
                    const result_container = document.querySelector('.result-container'),
                        body = document.querySelector('body')
                        result_container.classList.add('active')
                        body.style.overflow = 'hidden'
                    if (player == 'X') {
                        setresult('You Won')
                        setPointsToAdd(250)
                        setGems(250)
                    } else {
                        setresult('You Lose')
                        setGems(0)
                    }
                }, 1000);
                return true;
            }
        }
        return false;
    }
    function computerMove(updatedgamestate, forcefullymove) {
        if (!gameActive && !forcefullymove) return;
        const cells = document.querySelectorAll('.cell');
        const emptyCells = updatedgamestate
            .map((val, idx) => val === '' ? idx : null)
            .filter(val => val !== null);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (randomIndex > -1) {
            const updatedState = [...updatedgamestate];
            updatedState[randomIndex] = 'O';
            setgameState(updatedState);
            const img = document.createElement('img');
            img.style.transition = '0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            img.style.transform = 'scale(0)';
            img.src = `/Circle.png`;
            cells[randomIndex].append(img)
            setTimeout(() => {
                img.style.transform = 'scale(1)';
            }, 50);
            if (checkWinner('O', updatedState)) {
                setgameActive(false);
                return;
            }

            if (!updatedState.includes('')) {
                setgameActive(false);
                restartGame(true)
                return;
            }
            setcurrentPlayer('X')
        }
    }
    function restartGame(draw) {
        setgameActive(true);
        setTimeout(() => {
            const cells = document.querySelectorAll('.cell'),
                strike = document.getElementById('strike');
            cells.forEach((cell) => {
                const img = cell.querySelector('img')
                if (img) {
                    img.style.transform = 'scale(0)';
                }
            })
            strike.style.width = '0%'
            setTimeout(() => {
                setgameState(['', '', '', '', '', '', '', '', '']);
                cells.forEach(cell => cell.innerHTML = '');
                if (currentPlayer == 'X') {
                    setcurrentPlayer('O')
                    setTimeout(() => {
                        computerMove(['', '', '', '', '', '', '', '', ''], true)
                    }, 500);
                } else {
                    setcurrentPlayer('X')
                }
            }, 600);
        }, draw == true ? 600 : 100);
    }
    function showStrike(combo) {
        const strike = document.getElementById('strike');
        strike.style.display = 'block';
        const styles = {
            '0,1,2': { top: '15.5%', left: '0%', width: '100%', transform: 'rotate(0deg)' }, // top row
            '3,4,5': { top: '49%', left: '0%', width: '100%', transform: 'rotate(0deg)' },   // middle row
            '6,7,8': { top: '83%', left: '0%', width: '100%', transform: 'rotate(0deg)' },   // bottom row
            '0,3,6': { top: '0%', left: '16%', width: '100%', transform: 'rotate(90deg)' },  // firt row
            '1,4,7': { top: '0%', left: '50%', width: '100%', transform: 'rotate(90deg)' },  // second row
            '2,5,8': { top: '0%', left: '84%', width: '100%', transform: 'rotate(90deg)' },  // third row
            '0,4,8': { top: '48.5%', left: '48.5%', width: '100%', transform: 'translate(-50%, -50%) rotate(45deg)' }, // let to right
            '2,4,6': { top: '51.5%', left: '48.5%', width: '100%', transform: 'translate(-50%, -50%) rotate(-45deg)' },// right to left
        };
        const key = combo.sort((a, b) => a - b).join(',');
        const style = styles[key];
        if (key == '0,3,6' || key == '1,4,7' || key == '2,5,8') {
            strike.style.transformOrigin = 'left center';
        } else {
            strike.style.transformOrigin = '';
        }
        if (style) {
            setTimeout(() => {
                Object.assign(strike.style, {
                    top: style.top,
                    left: style.left,
                    width: style.width,
                    transform: style.transform
                });
            }, 400);
        }

    }

    const scaleboard = () => {
        setTimeout(() => {
            const container = document.querySelector('.tictactoe-board-container')
            if (container) {
                const board = document.querySelector('.tictactoe-board'),
                    width = container?.clientWidth,
                    height = container?.clientHeight,
                    shortestvalue = height < width ? height : width
                board.style.opacity = 0
                board.style.width = `${shortestvalue - 20}px`
                board.style.height = `${shortestvalue - 20}px`
                setTimeout(() => {
                    board.style.opacity = 1
                }, 500);
            }
        }, 500);
    }
    useEffect(() => {
        scaleboard()
        window.addEventListener('resize', scaleboard);
    }, [])
    return (
        <div className='tic-tac-toe-game-container'>
            <div className="result-container">
                <div className="result">
                    <div className="Win-lose">{result}</div>
                    <div className="Gems-gained">+{Gems} Gems</div>
                    <div className="buttons">
                        <button className='button' onClick={() => {
                            const result_container = document.querySelector('.result-container'),
                                body = document.querySelector('body')
                            result_container.classList.remove('active')
                            body.style.overflowY = 'auto'
                            restartGame(false)
                        }}>Play Again</button>
                        <ViewLink className='button' href={'/'}>
                            <button>Go to Home</button>
                        </ViewLink>
                        <button onClick={() => {
                            const result_container = document.querySelector('.result-container'),
                                body = document.querySelector('body')
                            result_container.classList.remove('active')
                            body.style.overflowY = 'auto'
                        }} className='button'>Preview Game</button>
                    </div>
                </div>
            </div>
            <div className="tictactoe-board-container">
                <div className="tictactoe-board">
                    <div className="lines-container">
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                        <div className="line line4"></div>
                    </div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="0"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="1"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="2"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="3"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="4"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="5"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="6"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="7"></div>
                    <div onClick={(e) => handleClick(e)} className="cell" data-index="8"></div>
                    <div id="strike"></div>
                </div>
            </div>
        </div>
    )
}
