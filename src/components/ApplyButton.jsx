import React from 'react'
import { useNavigate } from 'react-router-dom';

const ApplyButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('');
  };

  return (
    <button
      className='bg-orange-500 text-white py-1.5 px-5 m-0.5'
      style={{backgroundColor: '#EE6C4D', borderRadius: '12px'}}
      onClick={() => {handleRedirect()}}
    >
      Apply
    </button>
  )
}

export default ApplyButton