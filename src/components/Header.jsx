import React, { useEffect, useState } from 'react'
import LoginButton from './LoginButton'
import RegisButton from './RegisButton'
import { useNavigate } from 'react-router-dom';
import './componentsStyle/header.css'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const Header = ({login}) => {
  const[hide, setHide] = useState(true)
  const[userData, setUserData] = useState([])

  const navigate = useNavigate();

  const handleRedirect = (userData) => {
    navigate('/', {state : {userData}});
  };

  const goToDashboard = (userData) => {
    navigate('/activities', {state : {userData}});
  };

  const goToUserProfile = (userData) => {
    navigate('/user', {state : {userData}});
  };

  const getDocumentById = async (collectionName, docId) => {
    try {
      // Create a reference to the document
      const docRef = doc(db, collectionName, docId);
      
      // Fetch the document data
      const docSnap = await getDoc(docRef);
      
      // Check if the document exists
      if (docSnap.exists()) {
        // Return the document data along with its ID
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (login) {
        const data = await getDocumentById('users', login);
        setUserData(data); // Update the state with fetched data, including the document ID
      }
    };
  
    fetchData(); // Call async function to fetch user data
  }, [login]);

  return (
    <>
      <header className='bg-white flex justify-between items-center fixed z-30 top-0 right-0 left-0 raleway px-10 py-3'>
        <button className='flex gap-5 items-center' onClick={() => {handleRedirect(userData)}}>
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
              <button className='p-1'>
                <img className='w-8' src="./assets/Icons/Profile.png" alt="" onClick={() => {goToUserProfile(userData)}}/>
              </button>

              <button onClick={() => {setHide(false)}}>
                <img src="./assets/Icons/Burger_Menu.svg" alt="" />
              </button>
            </div>
        }
      </header>
      
      <div className={`side-panel ${hide ? '' : 'open'} bg-white blue raleway flex flex-col font-bold text-xl z-50 items-start gap-3`}>
        <div className='w-full flex justify-end'>
          <button onClick={() => {setHide(true)}}>
            <img className='w-5' src="./assets/Icons/X.png" alt="" />
          </button>
        </div>
        
        <div className='flex flex-col items-start'>
          <h1>Hello<span className='orange'>, {userData['firstName']}!</span></h1>
          <button className='text-sm text-blue-500'>Edit Profile</button>
        </div>

        <div className='flex flex-col items-start bg-orange w-full px-3 py-3 rounded-xl font-semibold text-white gap-3 text-lg'>
          <button onClick={() => {goToDashboard(userData)}}>Dashboard</button>
          <button onClick={() => {goToUserProfile(userData)}}>Profile Page</button>
        </div>

        <div className='flex flex-col items-start text-black font-semibold text-sm mt-5'>
          <button>About Us</button>
          <button>Contact Us</button>
        </div>
      </div>

      <div className={`fixed top-0 left-0 right-0 bottom-0 bg-slate-600 z-50 opacity-80 ${hide ? 'hidden' : ''} transition-all ease-in-out`}></div>

      <div className='h-16'></div>
    </>
  )
}

Header.defaultProps = {
  login: false
}

export default Header
