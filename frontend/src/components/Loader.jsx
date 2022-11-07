import React from 'react';
import roller from './Loader.gif';

const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
      <img src={roller} alt='loader' />
    </div>
  );
};

export default Loader;
