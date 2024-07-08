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
  const [xPlaying, setXPlaying] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [moves, setMoves] = useState({ X: [], O: [] });
  const [winner, setWinner] = useState(null);

  const handleWin = (winner) => {
    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1,
    }));
  };

  const handleBoxClick = (boxIdx) => {
    if (board[boxIdx] || gameOver) return;

    const currentPlayer = xPlaying ? 'X' : 'O';
    const updatedBoard = [...board];
    updatedBoard[boxIdx] = currentPlayer;

    const updatedMoves = { ...moves, [currentPlayer]: [...moves[currentPlayer], boxIdx] };

    if (updatedMoves[currentPlayer].length > 3) {
      const oldestMove = updatedMoves[currentPlayer].shift();
      updatedBoard[oldestMove] = null;
    }

    const detectedWinner = checkWinner(updatedBoard);

    setBoard(updatedBoard);
    setMoves(updatedMoves);

    if (detectedWinner) {
      handleWin(detectedWinner);
      setWinner(detectedWinner);
      setGameOver(true);
      setIsDraw(false);
    } else if (updatedBoard.every((value) => value !== null)) {
      setGameOver(true);
      setIsDraw(true);
    } else {
      setXPlaying(!xPlaying);
    }
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
    setXPlaying(null);
    setIsDraw(false);
    setMoves({ X: [], O: [] });
    setWinner(null);
  };

  const handlePlayerSelect = (player) => {
    setXPlaying(player === 'X');
    setGameOver(false);
    setScores({ X: 0, O: 0 });
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
                rotateY: 10,
                perspective: 800,
                scale: 1.8,
                zIndex: 1,
              }}
            >
              {'Who is playing first?'.split('').map((letter, index) => (
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
          {gameOver && !isDraw && (
            <motion.div
              className='win-message'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              Player {winner} Wins!
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
          {!gameOver && <PlayerIndicator xPlaying={xPlaying} />}
          <Board board={board} onClick={handleBoxClick} />
          <ResetButton resetBoard={resetBoard} />
        </>
      )}
    </div>
  );
}

export default App;
