import React, { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import TicTacToeGrid from '../assets/tictactoe_grid.png'

function Square({value, onClick})
 {
    return (
        <button className='ttt-square' onClick={onClick}>
            <h1>{value}</h1>
        </button>
    )
}

function TicTacToeGame(props) {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isX, setIsX] = useState(true)

    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        const newSquares = squares.slice();
        newSquares[i] = isX ? 'X' : "O"
        setSquares(newSquares)
        setIsX(!isX)
    }

    useEffect(() => {
        const winner = calculateWinner(squares);
        const isBoardFull = squares.every(square => square !== null);
        if (winner || isBoardFull) {
            const timer = setTimeout(() => {
                handleRestart();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [squares]);

    const backgroundStyle = {
        backgroundImage: `url(${TicTacToeGrid})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    function calculateWinner(squares) {
        const winningPatterns = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [1,4,6]
        ]

        for (let i = 0; i<winningPatterns.length; i++){
            const [a,b,c] = winningPatterns[i]

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                props.handleWinner(`Ha ganado ${squares[a]}`)
                return squares[a]
            }
        }

        return null
    }

    function handleRestart() {
        setIsX(true)
        setSquares(Array(9).fill(null))
    }

    return(
        <div className='ttt-board' style={backgroundStyle}>
            <div className='board-row'>
                <Square value={squares[0]} onClick={() => handleClick(0)}/>
                <Square value={squares[1]} onClick={() => handleClick(1)}/>
                <Square value={squares[2]} onClick={() => handleClick(2)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onClick={() => handleClick(3)}/>
                <Square value={squares[4]} onClick={() => handleClick(4)}/>
                <Square value={squares[5]} onClick={() => handleClick(5)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onClick={() => handleClick(6)}/>
                <Square value={squares[7]} onClick={() => handleClick(7)}/>
                <Square value={squares[8]} onClick={() => handleClick(8)}/>
            </div>
        </div>
    )
}

function TicTacToe(props) {
    const [winner, setWinner] = useState(null)

    const handleWinner = (winner) => {
        setWinner(winner)
    }
    return (
        <div className='content'>
            <h1>Ok, le tienes que ganar a Luis Ga para aceptar el NO</h1>
            <div className='game-winner'>{winner? winner : "  "}</div>
            <TicTacToeGame handleWinner={handleWinner}/>
            <div className='button-section'>
                <Button onClick={props.confirmStage} variant="success">Me rindo</Button>
            </div>
        </div>
    );
}

export default TicTacToe;