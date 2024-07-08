import React, { useState, useEffect } from 'react';
import './ScoreBoard.css';
import { motion } from 'framer-motion';

const ScoreBoard = ({ scores, xPlaying }) => {
  const { X: xScore, O: oScore } = scores;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: '100vh', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
      },
    },
  };

  return (
    <motion.div
      className={`scoreboard ${isVisible ? 'show' : ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className={`score x-score ${!xPlaying && 'inactive'}`}
        variants={itemVariants}
      >
        X - {xScore}
      </motion.span>
      <motion.span
        className={`score o-score ${xPlaying && 'inactive'}`}
        variants={itemVariants}
      >
        O - {oScore}
      </motion.span>
    </motion.div>
  );
};

export default ScoreBoard;
