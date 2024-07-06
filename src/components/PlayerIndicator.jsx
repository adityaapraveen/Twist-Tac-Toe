import React from 'react';
import './PlayerIndicator.css';

const PlayerIndicator = ({ xPlaying }) => {
  return (
    <div className='player-indicator'>
      {xPlaying ? "X's Turn" : "O's Turn"}
    </div>
  );
};

export default PlayerIndicator;