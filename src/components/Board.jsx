import React from 'react';
import { Box } from './Box';
import './Board.css';
import { motion } from 'framer-motion';

const Board = ({ board, onClick }) => {
  const containerVariants = {
    hidden: { opacity: 1 },
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
      className="board"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {board.map((value, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          <Box value={value} onClick={() => value === null && onClick(idx)} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Board;
