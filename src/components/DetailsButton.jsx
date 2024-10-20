import React from 'react'
import { useNavigate } from 'react-router-dom';

const DetailsButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('');
  };

  return (
    <button
      className='bg-orange text-white py-1.5 px-5 m-0.5 font-semibold rounded-lg hover:opacity-90'
      onClick={() => {handleRedirect()}}
    >
      Details
    </button>
  )
}

export default DetailsButton