import React from 'react';
import './Box.css';
import { motion } from 'framer-motion';

export const Box = ({ value, onClick }) => {
  return (
    <motion.div
      className="box"
      onClick={onClick}
      whileHover={{ scale: 1.1, rotateY: 10, boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.3)' }}
      whileTap={{ scale: 0.9, rotateY: -10, rotateZ: 200, boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <span className={value === 'O' ? 'sky-blue' : ''}>{value}</span>
    </motion.div>
  );
};
