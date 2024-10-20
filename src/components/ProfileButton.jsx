import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/user');
  };

  return (
    <button className='p-1'>
      <img className='w-8' src="./assets/Icons/Profile.png" alt="" onClick={() => {handleRedirect()}}/>
    </button>
  )
}

export default ProfileButton