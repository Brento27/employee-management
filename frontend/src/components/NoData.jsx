import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

function NoData() {
  return (
    <div className='card w-full bg-base-100 shadow-xl'>
      <div className='card-body'>
        <div className='flex justify-between'>
          <h2 className='card-title text-error'>No Matches!</h2>
          <BiErrorCircle className='text-error' size={30} />
        </div>
        <p>
          It seems our servers have no records mathcing your query, please try
          another filter or create a user that mathces your query.
        </p>
      </div>
    </div>
  );
}

export default NoData;
