import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { useLocation } from 'react-router-dom'
import { collection } from 'firebase/firestore'
import { db } from '../config/firebase'

const User = () => {
  // Accept user credential
  const location = useLocation();
  const { userData } = location.state || {}; // Safely access userId

  // Use to filter actions
  const [filter, setFilter] = useState('All');

  // Setup action variable & GET function
  const[actionList, setActionList] = useState([])
  const actionCollection = collection(db, "actions")

  return (

    <div className='raleway'>
      <Header login={userData['id']}/>

      <div style={{backgroundColor: '#EEF7FF'}} className='flex gap-20 px-20 py-10 mb-10'>
        <div className='text-4xl font-bold flex items-center'>Hi {userData['firstName']}</div>
        <div className='font-bold text-xl flex flex-col gap-4'>
          <div className='flex gap-5'>
            <div className='bg-blue text-white px-4 py-2 rounded-full'>
              You have donated
            </div>
            <div className='bg-white px-4 py-2 rounded-full'>
              Rp. xx
            </div>
            <div className='bg-white px-4 py-2 rounded-full'>
             to {userData['donationsID'].length} donations
            </div>
          </div>
          
          <div className='flex gap-5'>
            <div className='bg-blue text-white px-4 py-2 rounded-full'>
              You have contribute
            </div>
            <div className='bg-white px-4 py-2 rounded-full'>
             to {userData['activitiesID'].length} activity
            </div>
          </div>

          <div className='flex gap-5'>
            <div className='bg-blue text-white px-4 py-2 rounded-full'>
              You have help spread
            </div>
            <div className='bg-white px-4 py-2 rounded-full'>
            to {userData['campaignsID'].length} campaign
            </div>
          </div>
        </div>
      </div>

      <div className='mb-10'>
        <SearchBar filter={filter} setFilter={setFilter}/>
      </div>
      
      

      <Footer />
    </div>
  )
}

export default User