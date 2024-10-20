import React, { useEffect, useState } from 'react'
import LoginButton from './LoginButton'
import RegisButton from './RegisButton'
import { useNavigate } from 'react-router-dom';
import './componentsStyle/header.css'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const HeaderOrganizer = ({login}) => {
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
        const data = await getDocumentById('organizers', login);
        setUserData(data); // Update the state with fetched data, including the document ID
      }
    };
  
    fetchData(); // Call async function to fetch user data
  }, [login]);

  return (
    <>
      <header className='bg-white flex justify-between items-center fixed z-30 top-0 right-0 left-0 raleway px-10 py-3'>
        <button className='flex gap-5 items-center'>
          <img className='w-10' src="./assets/Icons/Logo_Blue.png" alt="" />
          <h1 className='font-bold blue text-2xl'>Lend-a-Hand</h1>
        </button>
      </header>

      <div className='h-16'></div>
    </>
  )
}

HeaderOrganizer.defaultProps = {
  login: false
}

export default HeaderOrganizer
