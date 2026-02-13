import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import TicTacToeGrid from '../assets/tictactoe_grid.png'

function Square({ value, onClick }) {
    return (
        <button className='ttt-square' onClick={onClick}>
            <h1>{value}</h1>
        </button>
    )
}

const TAUNT_MESSAGES = [
    "¿Eso es todo lo que tienes? 😏",
    "Mi abuelita juega mejor que tú 👵",
    "Ni con trampa me ganas 🤷",
    "¿Seguro que sabes jugar? Pregunta honesta...",
    "Luis Ga dice: 'Facilísimo' 😎",
    "Intenta de nuevo... o mejor no 💀",
    "Error 404: Habilidad no encontrada 🔍",
    "¿Quieres que te enseñe a jugar? 📚",
    "Esto fue más fácil que respirar 🥱",
    "¡Otra vez! ¡Otra vez! Me divierte ganarte 🎉",
    "¿Ya te quieres rendir? Yo creo que sí 🏳️",
    "Ni la suerte te salva de esta 🍀",
    "Tal vez el gato tres en raya no es lo tuyo... 🐱",
    "¡GG EZ! ...bueno, ni fue GG la verdad 😂",
    "Le puse dificultad en 'imposible' por algo 🔒",
    "¿Otro round? El resultado será el mismo 🔄",
    "Consejo: prueba con piedra, papel o tijera mejor ✂️",
    "No te sientas mal... bueno, sí, un poquito 😈",
    "¡Jaque mate! ...espera, juego equivocado, pero igual gané 👑",
    "Si esto fuera un examen, repruebas con 0 📝",
];

function TicTacToeGame({ handleTaunt }) {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isPlayerTurn, setIsPlayerTurn] = useState(true)
    const [playerStarted, setPlayerStarted] = useState(true)

    const state_values = {
        X: -10,
        O: 10,
        tie: 0
    }

    function calculateWinner(board) {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winningPatterns.length; i++) {
            const [a, b, c] = winningPatterns[i]
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]
            }
        }

        if (board.every(square => square !== null)) {
            return "tie"
        }
        return null
    }

    function minimax(position, depth, maximizingPlayer) {
        const winner = calculateWinner(position);
        if (winner !== null) {
            if (winner === "O") return 10 + depth;
            if (winner === "X") return -10 - depth;
            return 0;
        }

        if (maximizingPlayer) {
            let maxEval = -Infinity
            for (let i = 0; i < 9; i++) {
                if (position[i] == null) {
                    let copy_board = position.slice()
                    copy_board[i] = "O"
                    let score = minimax(copy_board, depth - 1, false)
                    maxEval = Math.max(maxEval, score)
                }
            }
            return maxEval
        } else {
            let minEval = +Infinity
            for (let i = 0; i < 9; i++) {
                if (position[i] == null) {
                    let copy_board = position.slice()
                    copy_board[i] = "X"
                    let score = minimax(copy_board, depth - 1, true)
                    minEval = Math.min(minEval, score)
                }
            }
            return minEval
        }
    }

    function botMove() {
        let best_move_score = -Infinity
        let selected_move = -1
        for (let i = 0; i < 9; i++) {
            if (squares[i] == null) {
                let copy_squares = squares.slice()
                copy_squares[i] = "O"
                let score_position = minimax(copy_squares, 100, false)
                if (score_position > best_move_score) {
                    best_move_score = score_position
                    selected_move = i
                }
            }
        }

        const newSquares = squares.slice();
        newSquares[selected_move] = 'O'
        setIsPlayerTurn(true)
        setSquares(newSquares)
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

    function handleRestart() {
        setSquares(Array(9).fill(null))
        setPlayerStarted(!playerStarted)
        setIsPlayerTurn(!playerStarted)
    }

    useEffect(() => {
        const winner = calculateWinner(squares);
        let restartTimer, botTimer;
        if (winner) {
            if (winner === "O") {
                const randomTaunt = TAUNT_MESSAGES[Math.floor(Math.random() * TAUNT_MESSAGES.length)];
                handleTaunt(randomTaunt);
            } else if (winner === "tie") {
                handleTaunt("Empate... pero igual no me ganaste 😏");
            }
            restartTimer = setTimeout(() => {
                handleRestart();
            }, 2000);
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

    return (
        <div className='ttt-board' style={backgroundStyle}>
            <div className='board-row'>
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </div>
    )
}

function TicTacToe(props) {
    const [tauntMessage, setTauntMessage] = useState("")

    const handleTaunt = (message) => {
        setTauntMessage(message)
    }

    return (
        <div className='content'>
            <h1>Ok, le tienes que ganar a Luis Ga para aceptar el NO</h1>
            <div className='game-winner'>{tauntMessage ? tauntMessage : "\u00A0"}</div>
            <TicTacToeGame handleTaunt={handleTaunt} />
            <div className='button-section'>
                <Button onClick={props.confirmStage} variant="success">Me rindo</Button>
            </div>
        </div>
    );
}

export default TicTacToe;