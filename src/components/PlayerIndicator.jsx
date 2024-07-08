import React from 'react';
import { motion } from 'framer-motion';
import './PlayerIndicator.css';

const PlayerIndicator = ({ xPlaying }) => {
  const indicatorVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={`player-indicator ${xPlaying ? 'x-turn' : 'o-turn'}`}
      variants={indicatorVariants}
      initial="hidden"
      animate="visible"
    >
      {xPlaying ? "X's Turn" : "O's Turn"}
    </motion.div>
  );
};

export default PlayerIndicator;
