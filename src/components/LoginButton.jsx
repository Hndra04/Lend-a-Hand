import React from 'react'
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login-page');
  };

  return (
    <button
      className='raleway font-bold text-white px-5 py-2 rounded-xl'
      style={{backgroundColor: 'rgba(238,108,77,0.8)', boxShadow: 'inset 0 0 0 5px #EE6C4D'}}
      onClick={() => {handleRedirect()}}
    >
      Login
    </button>
  )
}

export default LoginButton