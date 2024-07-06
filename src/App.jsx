import React, { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import ScoreBoard from './components/ScoreBoard';
import Board from './components/Board';
import ResetButton from './components/ResetButton';
import PlayerIndicator from './components/PlayerIndicator';
import AnimatedCharacters from './components/AnimatedCharacters';

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(null); // Track which player starts first
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isDraw, setIsDraw] = useState(false); // State to track if the game is a draw

  const handleBoxClick = (boxIdx) => {
    if (board[boxIdx] || gameOver) return;

    // Check number of Xs and Os on the board
    const xCount = board.filter((value) => value === 'X').length;
    const oCount = board.filter((value) => value === 'O').length;

    // If 3 Xs or Os are on the board, make previous ones semi-transparent
    if ((xPlaying && xCount === 3) || (!xPlaying && oCount === 3)) {
      const updatedBoard = board.map((value, idx) => {
        if (value === (xPlaying ? 'X' : 'O')) {
          return 'semi-transparent';
        } else {
          return value;
        }
      });
      setBoard(updatedBoard);
    }

    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? 'X' : 'O';
      } else {
        return value;
      }
    });

    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === 'O') {
        setScores((prevScores) => ({
          ...prevScores,
          oScore: prevScores.oScore + 1,
        }));
      } else {
        setScores((prevScores) => ({
          ...prevScores,
          xScore: prevScores.xScore + 1,
        }));
      }
      setGameOver(true);
      setIsDraw(false); // Game is not a draw
    } else if (updatedBoard.every((value) => value !== null)) {
      setGameOver(true);
      setIsDraw(true); // Game is a draw
    }

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setXPlaying(null); // Reset player choice
    setIsDraw(false); // Reset draw state
  };

  const handlePlayerSelect = (player) => {
    setXPlaying(player === 'X');
  };

  // Render player selection screen if xPlaying is null
  if (xPlaying === null) {
    return (
      <div className='App'>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.7 }}
        >
          Choose which player starts first:
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.3 }}
          onClick={() => handlePlayerSelect('X')}
        >
          X
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.3 }}
          onClick={() => handlePlayerSelect('O')}
        >
          O
        </motion.button>
      </div>
    );
  }

  return (
    <div className='App'>
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <PlayerIndicator xPlaying={xPlaying} />
      {isDraw && (
        <motion.div
          className='draw-message'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AnimatedCharacters type='paragraph' text='Its a draw!' />
        </motion.div>
      )}
      <Board board={board} onClick={handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
