'use client'
import React, { useEffect, useRef, useState } from 'react'
import './ChessComponent.css'
import { Chess } from 'chess.js';
import ViewLink from '../ViewLink';
import { useAuth } from '../authContext';

export default function ChessComponent() {
    const game = useRef(new Chess());
    const [board, setBoard] = useState(game.current.board())
    const { setPointsToAdd } = useAuth()
    const [draggedPiece, setdraggedPiece] = useState(null)
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [PieceSize, setPieceSize] = useState(null)
    const [legalmoves, setlegalmoves] = useState(null)
    const [result, setresult] = useState(null)
    const [Gems, setGems] = useState(null)
    const [GameOver, setGameOver] = useState(false)
    const pieceClasses = {
        wk: '/WhiteKing.png',
        wq: '/WhiteQueen.png',
        wr: '/WhiteCastle.png',
        wb: '/WhiteBishop.png',
        wn: '/WhiteKnite.png',
        wp: '/WhitePawn.png',
        bk: '/BlackKing.png',
        bq: '/BlackQueen.png',
        br: '/BlackCastle.png',
        bb: '/BlackBishop.png',
        bn: '/BlackKnight.png',
        bp: '/BlackPawn.png',
    }
    const getLegalMoves = (row, col) => {
        const files = 'abcdefgh';
        const square = files[col] + (8 - row);
        const moves = game.current.moves({ square, verbose: true });
        setlegalmoves(moves.map(move => move.to));
    };

    const handlePointerStart = (e, row, col) => {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        setdraggedPiece({ row, col });
        setDragPosition({ x, y });
        getLegalMoves(row, col)

    };

    const handlePointerhMove = (e) => {
        if (!draggedPiece) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        setDragPosition({ x: x, y: y });
    };
    const checkGameEnd = async () => {
        const result_container = document.querySelector('.result-container'),
            body = document.querySelector('body')
        if (game.current.isGameOver()) {
            setGameOver(true)
            const winner = game.current.turn == 'w' ? 'Black' : 'White';
            result_container.classList.add('active')
            body.style.overflow = 'hidden'
            if (game.current.isCheckmate() || game.current.isDraw() || game.current.isStalemate()) {
                if (winner == 'White') {
                    result_container.classList.add('active')
                    body.style.overflow = 'hidden'
                    setPointsToAdd(40)
                    setresult('You Won')
                    setGems(40)
                } else {
                    result_container.classList.add('active')
                    body.style.overflow = 'hidden'
                    setresult('You Lose')
                    setGems(0)
                }
            } else if (game.current.isInsufficientMaterial() || game.current.isThreefoldRepetition()) {
                setPointsToAdd(20)
                setresult('Draw')
                setGems(20)
            }
        }

    }
    const isPromotion = (from, to) => {
        const piece = game.current.get(from)?.type;
        return (
            piece === 'p' &&
            (to[1] === '8' || to[1] === '1') // rank 8 for white, 1 for black
        );
    };
    const handleDragEnd = (e, FromRow, FromCol) => {
        if (!draggedPiece) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        const element = document.elementFromPoint(x, y);
        if (element.classList.contains('square')) {
            try {
                const [row, col] = element.getAttribute('data-coords').split('-').map(Number);
                const files = 'abcdefgh';
                const from = files[FromCol] + (8 - FromRow);
                const to = files[col] + (8 - row);
                const move = game.current.move({ from, to, promotion: isPromotion(from, to) ? 'q' : undefined });
                if (move) {
                    setBoard(game.current.board());
                    checkGameEnd()
                    setTimeout(() => {
                        const moves = game.current.moves({ verbose: true });
                        if (moves.length > 0) {
                            const randomMove = moves[Math.floor(Math.random() * moves.length)];
                            game.current.move(randomMove);
                            setBoard(game.current.board());
                        }
                    }, 500);
                    checkGameEnd()
                } else {
                    alert('Invalid move!');
                }
            } catch (error) {
            }
        }
        setdraggedPiece(null);
        setlegalmoves(null);
    };
    const scaleboard = () => {
        const container = document.querySelector('.chess-container')
        if (container) {
            const board = document.querySelector('.chessboard'),
                width = container?.clientWidth,
                height = container?.clientHeight - 100,
                shortestvalue = height < width ? height : width
            board.style.width = `${shortestvalue}px`
            board.style.height = `${shortestvalue - 0.2}px`
            const piece_width = 90 / 100 * (shortestvalue / 8 - 0.4)
            setPieceSize(piece_width)
        }
    }
    useEffect(() => {
        scaleboard()
        window.addEventListener('resize', scaleboard);
    }, [])
    return (
        <div className="chess-game-container" style={{ cursor: draggedPiece && 'not-allowed' }}>
            <div className="result-container">
                <div className="result">
                    <div className="Win-lose">{result}</div>
                    <div className="Gems-gained">+{Gems} Gems</div>
                    <div className="buttons">
                        <button className='button' onClick={() => {
                            const result_container = document.querySelector('.result-container'),
                                body = document.querySelector('body')
                            setGameOver(false)
                            result_container.classList.remove('active')
                            body.style.overflowY = 'auto'
                            game.current.reset(); // reset the game
                            setBoard(game.current.board());
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
            <div className="Text">
                <h1 className="game-heading" style={{ textAlign: 'center', fontSize: 30, fontWeight: 700 }}>Chess</h1>
                <p className="game-description" style={{ textAlign: 'center', fontSize: 18 }}>
                    Challenge your mind with a classic game of Chess. Play against friends or sharpen your strategy solo — no downloads or registration needed!
                </p>
                <p className="game-info" style={{ maxWidth: '90%', margin: '2px auto', fontSize: 16, lineHeight: 1.5 }}>
                    Chess is one of the oldest and most popular strategy board games in the world. Played by millions across the globe, it challenges players to think critically, plan ahead, and outwit their opponents.
                </p>
                <p className="game-info" style={{ maxWidth: '90%', margin: '2px auto', fontSize: 16, lineHeight: 1.5 }}>
                    Whether you are a beginner learning the rules or an experienced player honing your tactics, this chess game offers an enjoyable and intuitive experience. Our interactive board allows you to move pieces easily with drag-and-drop or touch controls.
                </p>
                <p className="game-info" style={{ maxWidth: '90%', margin: '2px auto', fontSize: 16, lineHeight: 1.5 }}>
                    Try to checkmate your opponent while defending your own king! You can also practice against the computer's random moves to improve your skills. Have fun and enjoy the timeless challenge of chess!
                </p>
            </div>
            <div className="chess-container">
                <div className="Ad"></div>
                <div className="chessboard" onClick={() => {
                    if (GameOver) {
                        const result_container = document.querySelector('.result-container'),
                            body = document.querySelector('body')
                        result_container.classList.add('active')
                        body.style.overflow = 'hidden'
                    }
                }}>
                    {board?.map((row, rowIndex) =>
                        row.map((square, colIndex) => {
                            const isLight = (rowIndex + colIndex) % 2 === 0,
                                squareColor = isLight ? 'light' : 'dark',
                                piece = square ? `${square.color}${square.type}` : null,
                                files = 'abcdefgh',
                                squarenumber = files[colIndex] + (8 - rowIndex);

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    id={squarenumber}
                                    className={`square ${squareColor}`}
                                    onMouseMove={handlePointerhMove}
                                    onPointerUp={(e) => handleDragEnd(e, draggedPiece?.row, draggedPiece?.col)}
                                    onTouchEnd={(e) => handleDragEnd(e, rowIndex, colIndex)}
                                    data-coords={`${rowIndex}-${colIndex}`}
                                    style={{ cursor: draggedPiece && 'grabbing' }}
                                >
                                    {legalmoves && legalmoves.includes(squarenumber) && (
                                        <div className={`indicator`}></div>

                                    )}
                                    {piece && (
                                        <img
                                            style={{ position: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && 'fixed', left: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && dragPosition.x, top: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && dragPosition.y, transform: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && 'translate(-50%, -50%)', pointerEvents: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && 'none', width: PieceSize, height: PieceSize, maxWidth: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && PieceSize, maxHeight: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && PieceSize, zIndex: draggedPiece?.col == colIndex && draggedPiece?.row == rowIndex && 21 }}
                                            onTouchStart={(e) => handlePointerStart(e, rowIndex, colIndex)}
                                            onTouchMove={handlePointerhMove}
                                            onPointerDown={(e) => handlePointerStart(e, rowIndex, colIndex)}
                                            src={pieceClasses[piece]}
                                            alt={pieceClasses[piece]}
                                            className={`chess-peice ${piece.startsWith('w') ? 'white-piece' : 'black-piece'}`} />
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
