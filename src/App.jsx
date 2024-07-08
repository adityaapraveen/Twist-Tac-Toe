import React, { useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import ScoreBoard from './components/ScoreBoard';
import Board from './components/Board';
import ResetButton from './components/ResetButton';
import PlayerIndicator from './components/PlayerIndicator';

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
  const [xWins, setXWins] = useState(0); // Track number of wins for X
  const [oWins, setOWins] = useState(0); // Track number of wins for O
  
  const handleWin = (winner) => {
    if (winner === 'X') {
      setXWins(xWins + 1);
    } else if (winner === 'O') {
      setOWins(oWins + 1);
    }
  };

  const handleBoxClick = (boxIdx) => {
    if (board[boxIdx] || gameOver) return;

    const xCount = board.filter((value) => value === 'X').length;
    const oCount = board.filter((value) => value === 'O').length;

    // If more than 3 Xs or Os, remove the oldest ones
    if ((xPlaying && xCount >= 3) || (!xPlaying && oCount >= 3)) {
      let updatedBoard = [...board];

      // Find the index of the oldest X or O
      const oldestIndex = updatedBoard.findIndex(
        (value, idx) => value === (xPlaying ? 'X' : 'O')
      );

      // Remove the oldest X or O from the board
      updatedBoard[oldestIndex] = null;

      // Reset opacity for the remaining Xs or Os
      updatedBoard = updatedBoard.map((value) => {
        if (value === 'X' || value === 'O') {
          return 'semi-transparent'; // You can define a class for semi-transparent style
        } else {
          return value;
        }
      });

      setBoard(updatedBoard);
    }

    const updatedBoard = [...board];
    updatedBoard[boxIdx] = xPlaying ? 'X' : 'O';

    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === 'O') {
        setScores((prevScores) => ({
          ...prevScores,
          oScore: prevScores.oScore + 1,
        }));
        setOWins(oWins + 1); // Increment O wins count
      } else {
        setScores((prevScores) => ({
          ...prevScores,
          xScore: prevScores.xScore + 1,
        }));
        setXWins(xWins + 1); // Increment X wins count
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
    setGameOver(false); // Reset game over state
    setXWins(0); // Reset X wins count
    setOWins(0); // Reset O wins count
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='App'>
      {xPlaying === null ? (
        <motion.div
          className='centered-container'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatePresence>
            <motion.h2
              variants={textVariants}
              initial='hidden'
              animate='visible'
              whileHover={{
        rotateY: 10, // Rotate along the Y axis
        perspective: 800, // Apply perspective to create depth
        scale: 1.8, // Scale up a bit on hover
        zIndex: 1, // Ensure it's above other elements
      }}
            >
              {'?Who is playing first?'.split('').map((letter, index) => (
                <motion.span key={index} variants={letterVariants}>{letter}</motion.span>
              ))}
            </motion.h2>
          </AnimatePresence>
          <div className='player-select-buttons'>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className='player-select-button'
              onClick={() => handlePlayerSelect('X')}
            >
              X
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className='player-select-button'
              onClick={() => handlePlayerSelect('O')}
            >
              O
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <>
          <ScoreBoard scores={scores} xPlaying={xPlaying} />
          {xWins > 0 && !isDraw && (
            <motion.div
              className='win-message'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              Player X Wins!
            </motion.div>
          )}
          {oWins > 0 && !isDraw && (
            <motion.div
              className='win-message'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              Player O Wins!
            </motion.div>
          )}
          {isDraw && (
            <motion.div
              className='draw-message'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              It's a draw!
            </motion.div>
          )}
          {!isDraw && !xWins && !oWins && <PlayerIndicator xPlaying={xPlaying} />}
          <Board board={board} onClick={handleBoxClick} />
          <ResetButton resetBoard={resetBoard} />
        </>
      )}
    </div>
  );
}

export default App;
