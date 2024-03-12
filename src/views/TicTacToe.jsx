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
    const [isPlayerTurn, setIsPlayerTurn] = useState(true)
    const [playerStarted, setPlayerStarted] = useState(true)

    function botMove() {
        //Este es el codigo para un movimiento aleatorio del bot
        // const posible_moves = []
        // for (let i = 0; i < squares.length; i++) {
        //     if (squares[i] == null){
        //         posible_moves.push(i)
        //     }
        // }
        // let selected_move = posible_moves[Math.floor(Math.random() * posible_moves.length)]

        //Implementacion de minimax
        console.log("Turno del bot")
        let best_move_score = -Infinity
        let selected_move = -1
        let all_scores = []
        for (let i = 0; i < 9; i++) {
            if (squares[i] == null) {
                let copy_squares = squares.slice()
                copy_squares[i] = "O"
                let score_position = minimax(copy_squares, 100, false)
                if (score_position > best_move_score) {
                    console.log("Ahora la mejor posicion es ", i)
                    best_move_score = score_position
                    selected_move = i
                }
                all_scores.push(score_position)
            } else {
                all_scores.push(null)
            }
        }
        
        const newSquares = squares.slice();
        newSquares[selected_move] = 'O'
        setIsPlayerTurn(true)
        setSquares(newSquares)
        console.log("Se termina el turno: ", all_scores)
    }

    const state_values = {
        X: -10,
        O: 10,
        tie: 0
    }

    function minimax(position, maximizingPlayer) {
        const winner = calculateWinner(squares);
        if (winner !== null) {
            console.log("TERMINA EL CICLO DE ESTE MODULO")
            return (state_values[winner]);
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity
            for(let i = 0; i < 9; i++){
                if (position[i] == null) {
                    let copy_board = position.slice()
                    copy_board[i] = "O"
                    let score = minimax(copy_board, false)
                    maxEval = Math.max(maxEval, score)
                }
            }
            return maxEval
        } else {
            let minEval = +Infinity
            for(let i = 0; i < 9; i++) {
                if (position[i] == null) {
                    let copy_board = position.slice()
                    copy_board[i] = "X"
                    let score = minimax(copy_board, true)
                    minEval = Math.min(minEval, score)
                }
            }
            return minEval
        }
    }
    
    const handleClick = (i) => {
        if (calculateWinner(squares) || squares[i] || !isPlayerTurn) {
            return
        }
        const newSquares = squares.slice();
        newSquares[i] = 'X'
        setIsPlayerTurn(false)
        setSquares(newSquares)
        
    }
    
    useEffect(() => {
        const winner = calculateWinner(squares);
        let restartTimer, botTimer;
        if (winner) {
            restartTimer = setTimeout(() => {
                handleRestart();
            }, 500);
        }
        if (!isPlayerTurn && winner == null) {
            botTimer = setTimeout(() => {
                botMove();
            }, 200);
        }
        return (() => {
            if (restartTimer) clearTimeout(restartTimer)
            if (botTimer) clearTimeout(botTimer)
        })
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
                //props.handleWinner(`Ha ganado ${squares[a]}`)
                return squares[a]
            }
        }

        if (squares.every(square => square !== null)) {
            return "tie"
        }
        return null
    }
    
    function handleRestart() {
        setSquares(Array(9).fill(null))
        setPlayerStarted(!playerStarted)
        setIsPlayerTurn(!playerStarted)
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