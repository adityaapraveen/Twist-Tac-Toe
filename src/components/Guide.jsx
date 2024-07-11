import React from 'react';
import { motion } from 'framer-motion';
import './Guide.css';

const Guide = () => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5, // Delay before animating children
        staggerChildren: 0.1, // Time between each letter animation
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Duration of each letter animation
        ease: 'easeOut', // Easing function
      },
    },
  };

  return (
    <motion.div
      className='guide-container'
      initial='hidden'
      animate='visible'
      variants={textVariants}
    >
      <motion.h2
        className='how-to-play'
        variants={textVariants}
        initial='hidden'
        animate='visible'
      >
        {'?How To Play?'.split('').map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>{letter}</motion.span>
        ))}
      </motion.h2>
      <p>1. Choose who goes first: <span className='xPlayer'>X</span> or <span className=''>O</span>. </p>
      <p>2. Take turns clicking on the boxes to place your mark. Pretend you're Joey strategizing his next date.</p>
      <p>3. Connect three marks—horizontally, vertically, or diagonally—to win! (It's like getting a Dundies award.)</p>
      <p>4. <span>Warning:</span> At a time only three moves are possible on the board. Attempt a fourth, and your oldest move disappears like Voldemort's nose after Harry's second year at Hogwarts.</p>
    </motion.div>
  );
};

export default Guide;
