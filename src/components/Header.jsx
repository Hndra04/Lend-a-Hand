import React, { useState } from 'react'
import LoginButton from './LoginButton'
import RegisButton from './RegisButton'
import { useNavigate } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './componentsStyle/header.css'

const Header = ({login}) => {
  const navigate = useNavigate();

  const handleRedirect = (userId) => {
    navigate('/', {state : {userId}});
  };

  const[hide, setHide] = useState(true)

  return (
    <>
      <header className='bg-white flex justify-between items-center fixed z-30 top-0 right-0 left-0 raleway px-10 py-3'>
        <button className='flex gap-5 items-center' onClick={() => {handleRedirect(login)}}>
          <img className='w-10' src="./assets/Icons/Logo_Blue.png" alt="" />
          <h1 className='font-bold blue text-2xl'>Lend-a-Hand</h1>
        </button>
        {
          !login ?
            <div className='flex gap-5 items-center'>
              <LoginButton />
              <RegisButton />
            </div>
          :
            <div className='flex gap-5 items-center'>
              <ProfileButton />

              <button onClick={() => {setHide(false)}}>
                <img src="./assets/Icons/Burger_Menu.svg" alt="" />
              </button>
            </div>
        }
      </header>
      
      <div className={`side-panel ${hide ? '' : 'open'} bg-white blue raleway flex flex-col font-bold text-xl z-50`}>
        <div className='flex justify-end'>
          <button onClick={() => {setHide(true)}}>
            <img className='w-5' src="./assets/Icons/X.png" alt="" />
          </button>
        </div>
        <button>Dashboard</button>
        <button>Dashboard</button>
      </div>

      <div className={`fixed top-0 left-0 right-0 bottom-0 bg-slate-600 z-50 opacity-80 ${hide ? 'hidden' : ''} transition-all ease-in-out`}></div>

      <div className='h-16'></div>
    </>
  )
}

Header.defaulrProps = {
  login: false
}

export default Header
