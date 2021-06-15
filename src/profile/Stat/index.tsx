import React from 'react';
import './style.scss';

export interface StatProps {
  number: number;
  text: string;
}

const Stat: React.FC<StatProps> = ({ number, text }) => {
  return (
    <div className='stat'>
      <span className='stat__number'>{number}</span> {text}
    </div>
  );
};

export default Stat;
