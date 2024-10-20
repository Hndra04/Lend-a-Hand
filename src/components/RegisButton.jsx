import React from 'react'
import { useNavigate } from 'react-router-dom';

const RegisButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/regis-page');
  };

  return (
    <button
      className='raleway font-bold text-white px-5 py-2 rounded-xl'
      style={{backgroundColor: 'rgba(238,108,77)'}}
      onClick={() => {handleRedirect()}}
    >
      Register
    </button>
  )
}

export default RegisButton